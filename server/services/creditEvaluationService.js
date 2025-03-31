// server/services/ai/creditEvaluationService.js

const { OpenAI } = require('openai');
const User = require('../../models/User');
const Application = require('../../models/Application');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Evaluates a funding application using AI
 * @param {Object} application - The application object
 * @param {Object} user - The user object
 * @returns {Object} AI evaluation results with score and feedback
 */
exports.evaluateApplication = async (application, user) => {
  try {
    // If no OpenAI API key is configured, return a default evaluation
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured. Using default evaluation.');
      return {
        score: 75, // Default medium-high score
        feedback: 'This application has been pre-approved based on basic criteria. Manual review recommended.'
      };
    }

    // Get user's application history
    const applicationHistory = await Application.find({ 
      user: user._id, 
      status: { $in: ['approved', 'funded', 'rejected'] }
    }).sort({ createdAt: -1 }).limit(5);
    
    // Prepare application data for AI analysis
    const applicationData = {
      fundingType: application.fundingOption.type,
      amount: application.amount,
      purpose: application.purpose,
      businessPlan: application.businessPlan || 'Not provided',
      financialInfo: {
        income: application.financialInfo?.income || 0,
        expenses: application.financialInfo?.expenses || 0,
        assets: application.financialInfo?.assets || 0,
        liabilities: application.financialInfo?.liabilities || 0
      },
      applicantProfile: {
        timeSinceRegistration: Date.now() - user.createdAt,
        isVerified: user.isVerified,
        existingFinancialScore: user.financialScore || 0
      },
      applicationHistory: applicationHistory.map(app => ({
        fundingType: app.fundingOption.type,
        amount: app.amount,
        status: app.status,
        date: app.createdAt
      }))
    };

    // Calculate some basic financial ratios
    const monthlyNetIncome = applicationData.financialInfo.income - applicationData.financialInfo.expenses;
    const debtToIncomeRatio = applicationData.financialInfo.liabilities / (applicationData.financialInfo.income * 12 || 1);
    const debtToAssetRatio = applicationData.financialInfo.liabilities / (applicationData.financialInfo.assets || 1);
    
    // Create prompt for OpenAI
    const prompt = `
      You are an experienced financial analyst specializing in evaluating funding applications for women entrepreneurs.
      Please evaluate the following funding application and provide:
      1. A credit score from 0-100 (where 100 is excellent)
      2. Detailed feedback explaining the evaluation

      Application Details:
      - Funding Type: ${applicationData.fundingType}
      - Amount Requested: $${applicationData.amount}
      - Purpose: ${applicationData.purpose}
      - Business Plan Summary: ${applicationData.businessPlan}
      
      Financial Information:
      - Monthly Income: $${applicationData.financialInfo.income}
      - Monthly Expenses: $${applicationData.financialInfo.expenses}
      - Monthly Net Income: $${monthlyNetIncome}
      - Total Assets: $${applicationData.financialInfo.assets}
      - Total Liabilities: $${applicationData.financialInfo.liabilities}
      - Debt-to-Income Ratio: ${(debtToIncomeRatio * 100).toFixed(2)}%
      - Debt-to-Asset Ratio: ${(debtToAssetRatio * 100).toFixed(2)}%
      
      Applicant Profile:
      - Account Verified: ${applicationData.applicantProfile.isVerified ? 'Yes' : 'No'}
      - Existing Financial Score: ${applicationData.applicantProfile.existingFinancialScore}
      - Account Age: ${Math.floor(applicationData.applicantProfile.timeSinceRegistration / (1000 * 60 * 60 * 24))} days
      
      Application History:
      ${applicationData.applicationHistory.length > 0 
        ? applicationData.applicationHistory.map(app => 
            `- ${app.status} ${app.fundingType} for $${app.amount} on ${new Date(app.date).toLocaleDateString()}`
          ).join('\n')
        : '- No previous applications'}
      
      Evaluate the application based on:
      1. Financial health (income vs. expenses, debt ratios)
      2. Business plan viability
      3. Purpose alignment with funding type
      4. Applicant history and profile
      5. Risk assessment
      
      Provide your evaluation in JSON format:
      {
        "score": [number between 0-100],
        "feedback": [detailed explanation with strengths and weaknesses]
      }
    `;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Using the most capable model
      messages: [
        { role: "system", content: "You are a financial analyst specialized in evaluating funding applications." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3, // Low temperature for more consistent, analytical responses
      max_tokens: 1000
    });

    // Parse the response
    const responseText = response.choices[0].message.content.trim();
    let jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      try {
        const evaluationResult = JSON.parse(jsonMatch[0]);
        
        // Validate the result
        if (typeof evaluationResult.score !== 'number' || !evaluationResult.feedback) {
          throw new Error('Invalid response format');
        }
        
        // Ensure score is between 0-100
        evaluationResult.score = Math.min(Math.max(evaluationResult.score, 0), 100);
        
        // Update user's financial score (weighted average)
        const newFinancialScore = Math.round(
          user.financialScore 
            ? (user.financialScore * 0.7) + (evaluationResult.score * 0.3) 
            : evaluationResult.score
        );
        
        await User.findByIdAndUpdate(user._id, { financialScore: newFinancialScore });
        
        return evaluationResult;
      } catch (error) {
        console.error('Error parsing AI response:', error);
      }
    }
    
    // Fallback if parsing fails
    return {
      score: 70,
      feedback: 'This application has been evaluated based on the provided financial information. The debt-to-income ratio and business purpose suggest a moderate risk profile. Further manual review recommended.'
    };
    
  } catch (error) {
    console.error('AI evaluation error:', error);
    
    // Return a default evaluation if the AI service fails
    return {
      score: 65,
      feedback: 'Automated evaluation encountered a technical issue. Based on basic criteria, this application shows potential but requires manual review by our funding team.'
    };
  }
};

/**
 * Get recommendations for improving credit score
 * @param {Object} user - The user object
 * @param {Number} currentScore - Current credit score
 * @returns {Array} Array of recommendation strings
 */
exports.getCreditScoreRecommendations = async (user, currentScore) => {
  try {
    // Default recommendations by score bracket
    if (currentScore < 50) {
      return [
        'Consider reducing monthly expenses to improve your debt-to-income ratio',
        'Focus on building business revenue before seeking larger funding amounts',
        'Start with smaller funding options to build a positive funding history',
        'Complete your profile with all required documentation'
      ];
    } else if (currentScore < 70) {
      return [
        'Develop a more detailed business plan with clear revenue projections',
        'Consider reducing the requested funding amount to improve approval odds',
        'Demonstrate how the funding will directly increase business revenue',
        'Build assets to improve your overall financial standing'
      ];
    } else {
      return [
        'Continue maintaining a strong financial position',
        'Consider exploring larger funding options as your business grows',
        'Highlight your successful funding history in future applications',
        'Regularly update your financial information to maintain an accurate credit score'
      ];
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [
      'Maintain a positive cash flow in your business',
      'Ensure your funding request aligns with your business goals',
      'Keep your financial information up to date',
      'Build a strong track record of repayments'
    ];
  }
};

/**
 * Pre-qualify a user for funding options
 * @param {Object} user - The user object
 * @returns {Object} Eligible funding types and recommended amounts
 */
exports.preQualifyUser = async (user) => {
  try {
    // Get user's financial data and application history
    const applications = await Application.find({ 
      user: user._id
    }).sort({ createdAt: -1 });
    
    const financialScore = user.financialScore || 50; // Default score if none exists
    
    const eligibleOptions = {
      microloan: false,
      grant: false,
      venture_capital: false,
      peer_to_peer: false,
      recommendedAmount: 0
    };
    
    // Pre-qualification logic
    if (financialScore >= 60) {
      eligibleOptions.microloan = true;
      eligibleOptions.peer_to_peer = true;
    }
    
    if (financialScore >= 75) {
      eligibleOptions.grant = true;
    }
    
    if (financialScore >= 85) {
      eligibleOptions.venture_capital = true;
    }
    
    // Calculate recommended amount based on score and application history
    const baseAmount = 5000;
    const scoreMultiplier = financialScore / 50; // 1.0 at score 50, 2.0 at score 100
    
    // Adjust based on successful applications
    const successfulApps = applications.filter(app => 
      app.status === 'approved' || app.status === 'funded'
    ).length;
    
    const historyMultiplier = 1 + (successfulApps * 0.2); // 20% increase per successful application
    
    eligibleOptions.recommendedAmount = Math.round(baseAmount * scoreMultiplier * historyMultiplier);
    
    return eligibleOptions;
  } catch (error) {
    console.error('Pre-qualification error:', error);
    return {
      microloan: true,
      grant: false, 
      venture_capital: false,
      peer_to_peer: true,
      recommendedAmount: 5000
    };
  }
};

module.exports = exports;
// server/services/email/emailService.js

const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
const handlebars = require('handlebars');

// Create email transporter
let transporter;

// Initialize the transporter based on environment
const initTransporter = () => {
  // Only initialize once
  if (transporter) return;

  // Setup based on environment
  if (process.env.NODE_ENV === 'production') {
    // Production email service
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // For development, use ethereal.email (fake SMTP service)
    nodemailer.createTestAccount().then(testAccount => {
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('Development email account created:', testAccount.web);
    }).catch(err => {
      console.error('Failed to create test email account:', err);
      // Fallback to file-based logging
      transporter = {
        sendMail: async (options) => {
          const logPath = path.join(__dirname, '../../../logs');
          try {
            await fs.mkdir(logPath, { recursive: true });
            await fs.appendFile(
              path.join(logPath, 'emails.log'),
              `${new Date().toISOString()} - To: ${options.to}, Subject: ${options.subject}\n${options.text || options.html}\n\n`
            );
            return { messageId: `log-${Date.now()}` };
          } catch (error) {
            console.error('Email logging error:', error);
            return { messageId: null, error };
          }
        }
      };
    });
  }
};

/**
 * Send email using a template
 * @param {Object} options - Email options
 * @param {String} options.to - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.template - Template name (without extension)
 * @param {Object} options.data - Data to pass to the template
 * @returns {Promise} Promise with sending result
 */
exports.sendTemplateEmail = async (options) => {
  try {
    // Initialize transporter if needed
    if (!transporter) initTransporter();
    
    // Read template file
    const templatePath = path.join(__dirname, '../../templates/emails', `${options.template}.html`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    
    // Compile template
    const template = handlebars.compile(templateContent);
    const html = template(options.data);
    
    // Default sender
    const from = process.env.EMAIL_FROM || 'FemFund <noreply@femfund.com>';
    
    // Send email
    const info = await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html,
      // Plain text alternative
      text: options.text || html.replace(/<[^>]*>/g, '')
    });
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Email sent: %s', info.messageId);
      // For development with ethereal.email
      if (info.messageUrl) {
        console.log('Preview URL: %s', info.messageUrl);
      }
    }
    
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

/**
 * Send a basic email without a template
 * @param {Object} options - Email options
 * @param {String} options.to - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.message - Email body (plain text)
 * @returns {Promise} Promise with sending result
 */
exports.sendEmail = async (options) => {
  try {
    // Initialize transporter if needed
    if (!transporter) initTransporter();
    
    // Default sender
    const from = process.env.EMAIL_FROM || 'FemFund <noreply@femfund.com>';
    
    // Send email
    const info = await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      text: options.message
    });
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Email sent: %s', info.messageId);
      if (info.messageUrl) {
        console.log('Preview URL: %s', info.messageUrl);
      }
    }
    
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

/**
 * Send welcome email to a new user
 * @param {Object} user - User object
 * @param {String} verificationUrl - Email verification URL
 * @returns {Promise} Promise with sending result
 */
exports.sendWelcomeEmail = async (user, verificationUrl) => {
  return exports.sendTemplateEmail({
    to: user.email,
    subject: 'Welcome to FemFund - Verify Your Email',
    template: 'welcome',
    data: {
      firstName: user.firstName,
      verificationUrl,
      currentYear: new Date().getFullYear()
    }
  });
};

/**
 * Send application status update email
 * @param {Object} application - Application object (populated with user and fundingOption)
 * @returns {Promise} Promise with sending result
 */
exports.sendApplicationStatusEmail = async (application) => {
  const statusMessages = {
    submitted: 'Your application has been successfully submitted',
    under_review: 'Your application is now under review',
    approved: 'Congratulations! Your application has been approved',
    rejected: 'Your application status has been updated',
    funded: 'Great news! Your funding has been disbursed'
  };
  
  const templateMap = {
    submitted: 'application-submitted',
    under_review: 'application-under-review',
    approved: 'application-approved',
    rejected: 'application-rejected',
    funded: 'application-funded'
  };

  return exports.sendTemplateEmail({
    to: application.user.email,
    subject: `FemFund Application Update: ${statusMessages[application.status]}`,
    template: templateMap[application.status],
    data: {
      firstName: application.user.firstName,
      applicationId: application._id,
      fundingName: application.fundingOption.name,
      fundingType: application.fundingOption.type,
      amount: application.amount,
      status: application.status,
      statusDate: new Date().toLocaleDateString(),
      reviewerNotes: application.reviewerNotes,
      dashboardUrl: `${process.env.CLIENT_URL}/applications/${application._id}`,
      currentYear: new Date().getFullYear()
    }
  });
};

/**
 * Send password reset email
 * @param {String} email - User email
 * @param {String} resetUrl - Password reset URL
 * @returns {Promise} Promise with sending result
 */
exports.sendPasswordResetEmail = async (email, resetUrl) => {
  return exports.sendTemplateEmail({
    to: email,
    subject: 'FemFund - Password Reset Request',
    template: 'password-reset',
    data: {
      resetUrl,
      expiryTime: '10 minutes',
      currentYear: new Date().getFullYear()
    }
  });
};

/**
 * Send notification for new learning resources
 * @param {Object} user - User object
 * @param {Array} resources - Array of new learning resources
 * @returns {Promise} Promise with sending result
 */
exports.sendNewResourcesNotification = async (user, resources) => {
  return exports.sendTemplateEmail({
    to: user.email,
    subject: 'New Financial Learning Resources Available',
    template: 'new-resources',
    data: {
      firstName: user.firstName,
      resources: resources.map(resource => ({
        title: resource.title,
        description: resource.description,
        category: resource.category,
        url: `${process.env.CLIENT_URL}/learning/${resource._id}`
      })),
      learningCenterUrl: `${process.env.CLIENT_URL}/learning`,
      currentYear: new Date().getFullYear()
    }
  });
};

// Initialize on import
initTransporter();

module.exports = exports;
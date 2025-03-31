const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
const handlebars = require('handlebars');

/**
 * Send email using template
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.template - Template name
 * @param {Object} options.data - Template data
 * @returns {Promise<Object>} - Nodemailer info object
 */
const sendTemplateEmail = async (options) => {
  try {
    // Get test SMTP service account for development
    let transporter;
    
    if (process.env.NODE_ENV === 'production') {
      // Production email configuration
      transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Development email configuration (ethereal.email)
      const testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }
    
    // Read template file
    const templatePath = path.join(__dirname, '../templates/emails', `${options.template}.html`);
    const template = await fs.readFile(templatePath, 'utf8');
    
    // Compile template with Handlebars
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(options.data);
    
    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"FemFund" <noreply@femfund.com>',
      to: options.email,
      subject: options.subject,
      html
    });
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

/**
 * Send plain text email
 * @param {Object} options - Email options
 * @param {String} options.email - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.message - Email body
 * @returns {Promise<Object>} - Nodemailer info object
 */
const sendEmail = async (options) => {
  try {
    // Get test SMTP service account for development
    let transporter;
    
    if (process.env.NODE_ENV === 'production') {
      // Production email configuration
      transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Development email configuration (ethereal.email)
      const testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }
    
    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"FemFund" <noreply@femfund.com>',
      to: options.email,
      subject: options.subject,
      text: options.message
    });
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

module.exports = { sendEmail, sendTemplateEmail };

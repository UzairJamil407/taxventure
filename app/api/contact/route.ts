// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

// Create transporter with better error handling
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000,   // 30 seconds
    socketTimeout: 60000,     // 60 seconds
    debug: true, // Enable debug mode
    logger: true, // Enable logging
  });
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Missing SMTP configuration');
      return NextResponse.json(
        { message: 'Email service configuration error' },
        { status: 500 }
      );
    }

    const transporter = createTransporter();

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json(
        { message: 'Email service temporarily unavailable' },
        { status: 503 }
      );
    }

    const fullName = `${firstName} ${lastName}`;
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const companyEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #1f2937;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #dc2626;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e5e7eb;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: #f9fafb;
              border-radius: 6px;
              border-left: 4px solid #dc2626;
            }
            .label {
              font-weight: 600;
              color: #374151;
              margin-bottom: 5px;
            }
            .value {
              color: #1f2937;
            }
            .message-box {
              background: #f3f4f6;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #dc2626;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Taxventure - Digital Invoice Management</p>
          </div>
          
          <div class="content">
            <p>You have received a new contact form submission from your website.</p>
            
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${fullName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${phone || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">Submitted:</div>
              <div class="value">${currentDate}</div>
            </div>
            
            <div class="message-box">
              <div class="label">Message:</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from the Taxventure contact form.</p>
            <p>© ${new Date().getFullYear()} Taxventure. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    // Confirmation email to user
    const userEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting Taxventure</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #1f2937;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #dc2626;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e5e7eb;
              border-radius: 0 0 8px 8px;
            }
            .highlight {
              background: #fef2f2;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #dc2626;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .contact-info {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thank You for Contacting Us!</h1>
            <p>Taxventure - Digital Invoice Management</p>
          </div>
          
          <div class="content">
            <p>Dear ${firstName},</p>
            
            <p>Thank you for reaching out to Taxventure! We have successfully received your message and appreciate your interest in our FBR-integrated digital invoice management solutions.</p>
            
            <div class="highlight">
              <h3>What happens next?</h3>
              <ul>
                <li>Our team will review your inquiry within 24 hours</li>
                <li>A representative will contact you via email or phone</li>
                <li>We'll provide detailed information about our solutions</li>
                <li>Schedule a demo if you're interested</li>
              </ul>
            </div>
            
            <p>Your message was submitted on <strong>${currentDate}</strong></p>
            
            <div class="contact-info">
              <h3>Contact Information</h3>
              <p><strong>Email:</strong> info@taxventure.net</p>
              <p><strong>Phone:</strong> +92 334 5450600</p>
              <p><strong>Website:</strong> taxventure.net</p>
              <p><strong>Business Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM</p>
            </div>
            
            <p>If you have any urgent questions, please don't hesitate to call us directly.</p>
            
            <p>Best regards,<br>
            <strong>The Taxventure Team</strong></p>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email.</p>
            <p>© ${new Date().getFullYear()} Taxventure. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    const adminEmail = process.env.ADMIN_EMAIL;
    
    await transporter.sendMail({
      from: `"Taxventure Contact Form" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Contact Form Submission from ${fullName}`,
      html: companyEmailHTML,
      text: `
        New Contact Form Submission
        
        Name: ${fullName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Submitted: ${currentDate}
        
        Message:
        ${message}
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Taxventure" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Taxventure - We\'ll be in touch soon!',
      html: userEmailHTML,
      text: `
        Dear ${firstName},
        
        Thank you for reaching out to Taxventure! We have successfully received your message and appreciate your interest in our FBR-integrated digital invoice management solutions.
        
        What happens next?
        - Our team will review your inquiry within 24 hours
        - A representative will contact you via email or phone
        - We'll provide detailed information about our solutions
        - Schedule a demo if you're interested
        
        Your message was submitted on ${currentDate}
        
        Contact Information:
        Email: info@taxventure.net
        Phone: +92 334 5450600
        Website: taxventure.net
        Business Hours: Monday - Friday: 9:00 AM - 6:00 PM
        
        If you have any urgent questions, please don't hesitate to call us directly.
        
        Best regards,
        The Taxventure Team
      `,
    });

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending emails:', error);
    
    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('ETIMEDOUT') || error.message.includes('Greeting never received')) {
        return NextResponse.json(
          { message: 'Email service timeout. Please try again later.' },
          { status: 503 }
        );
      }
      if (error.message.includes('Invalid login')) {
        return NextResponse.json(
          { message: 'Email service authentication failed.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { message: 'Failed to send emails. Please try again later.' },
      { status: 500 }
    );
  }
}
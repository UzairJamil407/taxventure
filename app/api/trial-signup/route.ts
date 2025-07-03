// app/api/trial-signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface TrialSignupData {
  name: string;
  companyName: string;
  contactNumber: string;
  email: string;
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
    const body: TrialSignupData = await request.json();
    const { name, companyName, contactNumber, email } = body;

    // Validation
    if (!name || !companyName || !contactNumber || !email) {
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

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Trial Signup</title>
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
            .demo-info {
              background: #fef3c7;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #f59e0b;
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
            <h1>New Trial Signup</h1>
            <p>Taxventure - Digital Invoice Management</p>
          </div>
          
          <div class="content">
            <p>A new user has signed up for a free trial of Taxventure.</p>
            
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Company Name:</div>
              <div class="value">${companyName}</div>
            </div>
            
            <div class="field">
              <div class="label">Contact Number:</div>
              <div class="value">${contactNumber}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label">Signup Date:</div>
              <div class="value">${currentDate}</div>
            </div>
            
            <div class="demo-info">
              <div class="label">Demo Credentials Provided:</div>
              <div class="value">
                <strong>Username:</strong> demo@taxventure.net<br>
                <strong>Password:</strong> welcome123<br>
                <strong>Demo URL:</strong> https://demo.taxventure.net/
              </div>
            </div>
            
            <p><strong>Action Required:</strong> Please follow up with this potential customer within 24 hours to provide personalized assistance and answer any questions.</p>
          </div>
          
          <div class="footer">
            <p>This email was sent from the Taxventure trial signup form.</p>
            <p>© ${new Date().getFullYear()} Taxventure. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    
    await transporter.sendMail({
      from: `"Taxventure Trial Signup" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Trial Signup: ${name} from ${companyName}`,
      html: adminEmailHTML,
      text: `
        New Trial Signup
        
        Name: ${name}
        Company: ${companyName}
        Contact: ${contactNumber}
        Email: ${email}
        Signup Date: ${currentDate}
        
        Demo Credentials Provided:
        Username: demo@taxventure.net
        Password: welcome123
        Demo URL: https://demo.taxventure.net/
        
        Action Required: Please follow up with this potential customer within 24 hours.
      `,
    });

    return NextResponse.json(
      { message: 'Trial signup processed successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing trial signup:', error);
    
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
      { message: 'Failed to process trial signup. Please try again later.' },
      { status: 500 }
    );
  }
}
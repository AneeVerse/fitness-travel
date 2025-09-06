import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      pdfLink, 
      formType, 
      name, 
      subject, 
      message,
      fullName 
    } = body;

    // Handle different form types
    let finalFirstName = firstName;
    let finalLastName = lastName;
    
    // If we have a single name field (from itinerary form), split it
    if (!firstName && (name || fullName)) {
      const fullNameValue = name || fullName;
      const nameParts = fullNameValue.trim().split(' ');
      finalFirstName = nameParts[0] || fullNameValue;
      finalLastName = nameParts.slice(1).join(' ') || '';
    }

    // Validate required fields
    if (!finalFirstName || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      console.error('Missing email credentials in environment variables');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter with proper Gmail configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be an App Password, not regular password
      },
      secure: true,
      port: 465,
    });

    // 1. Send confirmation email to the user
    const userMailOptions = {
      from: `"Tiger Terrain" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Tiger Terrain - Your Ibiza Adventure Awaits!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ef4a25, #d16d1f); padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your adventure request has been received</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 15px 15px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${finalFirstName}!</h2>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Thank you for contacting Tiger Terrain about your Ibiza adventure! We're excited to help you plan the perfect fitness retreat.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ef4a25;">
              <h3 style="color: #ef4a25; margin-top: 0;">What happens next?</h3>
              <ul style="color: #555; line-height: 1.6;">
                <li>Our team will review your request within 24 hours</li>
                <li>You'll receive personalized pricing information</li>
                <li>We'll contact you to discuss your adventure details</li>
              </ul>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ef4a25;">
              <h3 style="color: #ef4a25; margin-top: 0;">Your Itinerary PDF</h3>
              <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
                Access your complete Ibiza itinerary and pricing details:
              </p>
              <a href="${pdfLink}" style="display: inline-block; background: #ef4a25; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Download Itinerary PDF</a>
            </div>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              If you have any immediate questions, feel free to reply to this email or call us directly.
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #888; font-size: 14px; margin: 0;">
                <strong>Tiger Terrain</strong><br>
                Your fitness adventure awaits! 🏃‍♂️🏝️
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // 2. Send notification email to company (EMAIL_RECEIVER)
    const companyMailOptions = {
      from: `"Tiger Terrain Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Booking Request from ${finalFirstName} ${finalLastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #ef4a25; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Booking Request</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333;">Contact Details:</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <div style="background: #ef4a25; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" style="color: white; text-decoration: none; font-weight: bold;">Reply to ${firstName}</a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px; text-align: center;">
              This is an automated message from your Tiger Terrain website.
            </p>
          </div>
        </div>
      `,
    };

    // 3. Send notification email to website owner
    const ownerMailOptions = {
      from: `"Tiger Terrain Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Booking Request from ${finalFirstName} ${finalLastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #ef4a25; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Booking Request</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333;">Contact Details:</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <div style="background: #ef4a25; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" style="color: white; text-decoration: none; font-weight: bold;">Reply to ${firstName}</a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px; text-align: center;">
              This is an automated message from your Tiger Terrain website.
            </p>
          </div>
        </div>
      `,
    };

    // Send all three emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(ownerMailOptions)
    ]);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

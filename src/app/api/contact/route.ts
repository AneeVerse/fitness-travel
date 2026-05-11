import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import env from '@/config/env';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      name, 
      fullName,
      tripDate,
      numberOfPeople,
      accommodationType,
      formType,
      message
    } = body;

    // Get the site URL for any future use
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tigerterrain.in';

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
      subject: 'Thank you for contacting Tiger Terrain - Your  Adventure Awaits!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ef4a25, #d16d1f); padding: 30px; text-align: center; border-radius: 15px 15px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your adventure request has been received</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 15px 15px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${finalFirstName}!</h2>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Thank you for contacting Tiger Terrain about your  adventure! We're excited to help you plan the perfect fitness retreat.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ef4a25;">
              <h3 style="color: #ef4a25; margin-top: 0;">What happens next?</h3>
              <ul style="color: #555; line-height: 1.6;">
                <li>Our team will review your request within 24 hours</li>
                <li>You'll receive personalized pricing information</li>
                <li>We'll contact you to discuss your adventure details</li>
              </ul>
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

    // Function to get IST date and time
    const getISTDate = () => {
      const now = new Date();
      const utcTime = now.getTime();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
      const istTime = new Date(utcTime + istOffset);
      const day = String(istTime.getUTCDate()).padStart(2, '0');
      const month = String(istTime.getUTCMonth() + 1).padStart(2, '0');
      const year = istTime.getUTCFullYear();
      return `${day}/${month}/${year}`;
    };

    // Function to get IST timestamp with time
    const getIndianTime = () => {
      const now = new Date();
      const utcTime = now.getTime();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST offset (5.5 hours in milliseconds)
      const istTime = new Date(utcTime + istOffset);
      
      const year = istTime.getUTCFullYear();
      const month = String(istTime.getUTCMonth() + 1).padStart(2, '0');
      const day = String(istTime.getUTCDate()).padStart(2, '0');
      let hours = istTime.getUTCHours();
      const minutes = String(istTime.getUTCMinutes()).padStart(2, '0');
      const seconds = String(istTime.getUTCSeconds()).padStart(2, '0');
      
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const displayHours = String(hours).padStart(2, '0');
      
      return `${day}/${month}/${year}, ${displayHours}:${minutes}:${seconds} ${ampm} (IST)`;
    };

    const indianDate = getISTDate();
    const indianTime = getIndianTime();

    // 2. Send notification email to company (EMAIL_RECEIVER)
    const companyMailOptions = {
      from: `"Tiger Terrain Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Booking Request from ${finalFirstName} ${finalLastName}${tripDate ? ` - ${tripDate}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #ef4a25; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🎉 New Booking Request</h1>
            ${formType ? `<p style="color: white; margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Form Type: ${formType}</p>` : ''}
          </div>
          
          <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333;">👤 Contact Details:</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 8px 0;"><strong>Name:</strong> ${finalFirstName} ${finalLastName}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ef4a25;">${email}</a></p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #ef4a25;">${phone}</a></p>
              <p style="margin: 8px 0;"><strong>Submitted On:</strong> ${indianDate}</p>
            </div>
            
            ${tripDate || numberOfPeople || accommodationType ? `
            <h2 style="color: #333;">📋 Booking Details:</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ef4a25;">
              ${tripDate ? `<p style="margin: 8px 0;"><strong>🗓️ Trip Date:</strong> ${tripDate}</p>` : ''}
              ${numberOfPeople ? `<p style="margin: 8px 0;"><strong>👥 Number of People:</strong> ${numberOfPeople}</p>` : ''}
              ${accommodationType ? `<p style="margin: 8px 0;"><strong>🏠 Accommodation Type:</strong> ${accommodationType}</p>` : ''}
            </div>
            ` : ''}
            
            ${message ? `
            <h2 style="color: #333;">💬 Additional Message:</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="color: #555; white-space: pre-line; margin: 0;">${message}</p>
            </div>
            ` : ''}
            
            <div style="background: #ef4a25; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" style="color: white; text-decoration: none; font-weight: bold; font-size: 16px;">📧 Reply to ${finalFirstName}</a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px; text-align: center;">
              This is an automated message from your Tiger Terrain website.
            </p>
          </div>
        </div>
      `,
    };

    // Send only two emails: confirmation to user and notification to company owner
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(companyMailOptions)
    ]);

    // Send to Google Sheets (non-blocking - don't fail if this fails)
    try {
      const googleAppsScriptUrl = env.GOOGLE_APPS_SCRIPT_URL;
      
      if (googleAppsScriptUrl) {
        // Determine page source based on form type
        let pageSource = 'Contact Page';
        if (formType === 'itinerary-booking') {
          pageSource = body.location ? `Itinerary Page - ${body.location}` : 'Itinerary Page';
        } else if (formType === 'general-contact') {
          pageSource = 'Contact Page';
        }

        // Prepare extra info with all booking details
        const extraInfoParts = [];
        if (tripDate) extraInfoParts.push(`Trip Date: ${tripDate}`);
        if (numberOfPeople) extraInfoParts.push(`Number of People: ${numberOfPeople}`);
        if (accommodationType) extraInfoParts.push(`Accommodation: ${accommodationType}`);
        if (body.location) extraInfoParts.push(`Location: ${body.location}`);
        if (body.subject) extraInfoParts.push(`Subject: ${body.subject}`);
        const extraInfo = extraInfoParts.length > 0 
          ? extraInfoParts.join(' | ') 
          : `Submitted at ${indianTime}`;

        await fetch(googleAppsScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pageSource: pageSource,
            formType: formType || 'Contact Form',
            name: `${finalFirstName} ${finalLastName}`.trim(),
            email: email || '',
            phone: phone || '',
            message: message || '',
            trip: tripDate || body.location || '',
            numberOfPeople: numberOfPeople || '',
            accommodation: accommodationType || '',
            extraInfo: extraInfo
          }),
        });
        console.log('Form data sent to Google Sheets successfully');
      } else {
        console.warn('Google Apps Script URL not configured. Skipping Google Sheets submission.');
      }
    } catch (sheetError) {
      console.error('Error sending form data to Google Sheets:', sheetError);
      // Don't fail the entire request if Google Sheets fails
    }

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

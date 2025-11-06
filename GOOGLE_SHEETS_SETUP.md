# Google Sheets Integration Setup Guide for Tiger Terrain

This guide will help you set up Google Sheets integration for all contact forms on your website.

## Overview

When users submit forms (Contact Page or Itinerary Booking forms), the data will be:
1. ✅ Sent via email (already working)
2. ✅ Saved to Google Sheets (new feature)

## Prerequisites

- Google account
- Gmail account (for email sending)
- Basic knowledge of Google Sheets

---

## Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **"+"** to create a new blank spreadsheet
3. Name it **"Tiger Terrain Form Submissions"** or similar
4. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```
   Example: If your URL is `https://docs.google.com/spreadsheets/d/1eZWf6RKW2WEPvLpeUlQTYIevjGHgjWwpu844UTO3Jpg/edit`
   Then your Sheet ID is: `1eZWf6RKW2WEPvLpeUlQTYIevjGHgjWwpu844UTO3Jpg`

---

## Step 2: Set Up Google Apps Script

### 2.1 Create Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Click **"New Project"**
3. Name your project **"Tiger Terrain Form Handler"**

### 2.2 Add the Code

1. Open the file `google-apps-script.js` in this project (it's in the root directory)
2. Copy all the code from that file
3. In Apps Script editor, replace the default `myFunction` code with the copied code
4. **IMPORTANT**: Find `YOUR_SHEET_ID_HERE` and replace it with your actual Sheet ID from Step 1

### 2.3 Set Up Sheet Headers

1. In Apps Script editor, select `setupSheetHeaders` function from the function dropdown (top right)
2. Click **"Run"** button (▶️)
3. If prompted, click **"Review Permissions"** and authorize access
4. Check your Google Sheet - you should see formatted headers in Row 1:
   - Timestamp | Page Source | Form Type | Name | Email | Phone | Message | Extra Info

### 2.4 Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon (⚙️) next to "Select type" and choose **"Web app"**
3. Set configuration:
   - **Description**: "Tiger Terrain Form Handler v1"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
4. Click **"Deploy"**
5. **Copy the Web App URL** - you'll need this for your `.env.local` file
   - It will look like: `https://script.google.com/macros/s/ABC123xyz/exec`
6. Click **"Authorize access"** and grant permissions

---

## Step 3: Configure Environment Variables

1. Create or update `.env.local` file in your project root
2. Add the Google Apps Script URL:

```env
# Email Configuration (already configured)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_RECEIVER=receiver@gmail.com

# Google Sheets Integration (NEW)
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual URL you copied from Step 2.4

---

## Step 4: Test the Integration

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Submit a test form**:
   - Go to your contact page or itinerary page
   - Fill out and submit a form

3. **Verify the data**:
   - Check your email (should receive notification)
   - Check your Google Sheet (should have a new row with the form data)

---

## Troubleshooting

### Google Sheets not updating?

1. **Check Apps Script URL**: Verify the URL in `.env.local` is correct
2. **Test Apps Script directly**: Open the Web App URL in your browser
   - Should show: "Google Apps Script is working!"
3. **Check Apps Script permissions**: Make sure you authorized access
4. **Check browser console**: Look for any error messages
5. **Check Apps Script execution logs**: 
   - In Apps Script editor, go to "Executions" (left sidebar)
   - Check for any errors

### Form submission errors?

1. **Check environment variables**: Make sure `GOOGLE_APPS_SCRIPT_URL` is set
2. **Check API route logs**: Look at your terminal/console for error messages
3. **Verify Sheet ID**: Make sure the Sheet ID in Apps Script matches your actual sheet

### Email works but Sheets doesn't?

- This is expected behavior! The code is designed to not fail if Google Sheets has issues
- Check the server console logs for specific error messages
- The form will still work and send emails even if Sheets fails

---

## What Data Gets Saved?

Each form submission saves:
- **Timestamp**: When the form was submitted (IST timezone)
- **Page Source**: Which page the form came from (e.g., "Contact Page", "Itinerary Page - phuket")
- **Form Type**: Type of form (e.g., "itinerary-booking", "general-contact")
- **Name**: User's full name
- **Email**: User's email address
- **Phone**: User's phone number
- **Message**: Any message or additional notes
- **Extra Info**: Additional details like trip date, number of people, accommodation type, etc.

---

## Multiple Forms Supported

The integration automatically handles:
- ✅ Contact Page form (`general-contact`)
- ✅ Itinerary Booking form (`itinerary-booking`)
- ✅ Any future forms you add

All forms will save to the same Google Sheet with appropriate labels.

---

## Security Notes

- The Google Apps Script Web App URL should be kept private (in `.env.local`)
- Never commit `.env.local` to version control
- The Web App is set to "Anyone" access, but it only accepts POST requests with valid data
- Consider adding rate limiting or CAPTCHA for production use

---

## Need Help?

If you encounter issues:
1. Check the server console logs
2. Check Apps Script execution logs
3. Verify all environment variables are set correctly
4. Test the Apps Script URL directly in browser

---

## Summary

✅ Google Sheet created with proper headers
✅ Apps Script deployed and configured
✅ Environment variables set
✅ Forms automatically saving to Google Sheets
✅ Email notifications still working

Your forms are now fully integrated with Google Sheets! 🎉


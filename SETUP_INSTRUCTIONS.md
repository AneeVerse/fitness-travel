# Tiger Terrain - Email Setup Instructions

## 🚀 What's Been Implemented

1. **Book Now Button**: The "Book Now" button in the BookNowSection now opens a pricing/booking modal
2. **Nodemailer Integration**: Form submissions are sent to your email via the API
3. **Success Message**: Shows "Thank you! Our team will contact you within 24 hours"

## 📧 Email Configuration Setup

### Step 1: Create Environment File
Create a `.env.local` file in your project root with:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Step 2: Gmail App Password Setup
For Gmail, you need to use an App Password:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Step Verification** if not already enabled
3. Go to **Security** → **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "Tiger Terrain" as the name
6. Copy the generated 16-character password
7. Use this password in your `.env.local` file

### Step 3: Restart Development Server
After creating the `.env.local` file, restart your development server:

```bash
npm run dev
```

## 🔧 How It Works

1. **User clicks "Book Now"** → Opens pricing modal
2. **User fills form** → Name, email, phone
3. **Form submission** → Sends data to `/api/contact`
4. **Email sent** → You receive notification with user details
5. **Success message** → Shows "Our team will contact you"
6. **PDF download** → Simulated PDF download (you can replace with real PDF)

## 📱 Features

- ✅ **Responsive Design**: Works on all devices
- ✅ **Form Validation**: Required fields validation
- ✅ **Loading States**: Shows loading spinner during submission
- ✅ **Error Handling**: Graceful error handling with user feedback
- ✅ **Auto-close**: Modal closes automatically after 5 seconds
- ✅ **Email Notifications**: You get instant email notifications

## 🎯 Next Steps

1. **Replace PDF**: Update the PDF download link with your actual pricing PDF
2. **Customize Email**: Modify the email template in `/src/app/api/contact/route.ts`
3. **Add Fields**: Add more form fields if needed (dates, room preferences, etc.)
4. **Email Service**: Consider using services like SendGrid for production

## 🚨 Important Notes

- **Never commit** `.env.local` to version control
- **App passwords** are more secure than regular passwords
- **Test thoroughly** before going live
- **Monitor emails** to ensure they're being received

## 🆘 Troubleshooting

**Email not sending?**
- Check your `.env.local` file exists
- Verify email and app password are correct
- Check browser console for errors
- Ensure development server is restarted

**Form not submitting?**
- Check browser console for API errors
- Verify the API route is working
- Check network tab for failed requests

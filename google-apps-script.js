/**
 * Google Apps Script for Tiger Terrain Contact Form Integration
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Name it "Tiger Terrain Form Handler"
 * 4. Replace the default code with this code
 * 5. Update the SHEET_ID with your actual Google Sheet ID
 * 6. Deploy as Web App (see guide for details)
 */

function doPost(e) {
  try {
    // IMPORTANT: Replace with your actual Google Sheet ID
    // Get this from your Google Sheet URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
    const SHEET_ID = '1hZQRYj7PUJr_nENLUC31fVZ6OXRkEnQDNEZQ-_FBhqw';
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get current timestamp in IST (Indian Standard Time)
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
    
    // Prepare row data matching the column structure
    const rowData = [
      getIndianTime(),                           // A: Timestamp
      data.pageSource || 'Contact Page',         // B: Page Source
      data.formType || 'Contact Form',           // C: Form Type
      data.name || '',                           // D: Name
      data.email || '',                          // E: Email
      data.phone || '',                          // F: Phone
      data.message || '',                        // G: Message
      data.trip || '',                           // H: Trip
      data.numberOfPeople || '',                 // I: Number of People
      data.accommodation || '',                  // J: Accommodation
      data.extraInfo || ''                       // K: Extra Info
    ];
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error saving data: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Function to set up sheet headers (run this once manually)
 * 
 * INSTRUCTIONS:
 * 1. In Apps Script editor, select 'setupSheetHeaders' function from dropdown
 * 2. Click "Run" button
 * 3. Authorize permissions if prompted
 * 4. Check your Google Sheet to verify headers are added
 */
function setupSheetHeaders() {
  const SHEET_ID = '1hZQRYj7PUJr_nENLUC31fVZ6OXRkEnQDNEZQ-_FBhqw';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  
  const headers = [
    'Timestamp',        // A
    'Page Source',      // B
    'Form Type',        // C
    'Name',             // D
    'Email',            // E
    'Phone',            // F
    'Message',          // G
    'Trip',             // H
    'Number of People', // I
    'Accommodation',    // J
    'Extra Info'        // K
  ];
  
  // Clear existing headers and add new ones
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#ef4a25')  // Tiger Terrain brand color
    .setFontColor('#ffffff')
    .setFontWeight('bold');
}


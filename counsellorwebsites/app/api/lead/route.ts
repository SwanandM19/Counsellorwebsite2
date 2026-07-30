// import { NextRequest, NextResponse } from 'next/server'
// import nodemailer from 'nodemailer'
// import { google } from 'googleapis'

// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

// async function appendToGoogleSheet(lead: {
//   name: string
//   email: string
//   phone: string
//   interest: string
//   message: string
//   submittedAt: string
// }) {
//   const interestLabels: Record<string, string> = {
//     general:  'General Counselling',
//     career:   'Career Guidance',
//     academic: 'Academic Advice',
//     personal: 'Personal Development',
//     other:    'Other',
//   }

//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//       private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     },
//     scopes: SCOPES,
//   })

//   const sheets = google.sheets({ version: 'v4', auth })
//   const sheetId = process.env.GOOGLE_SHEET_ID!

//   // ── Check if header row exists, if not create it ──
//   const existing = await sheets.spreadsheets.values.get({
//     spreadsheetId: sheetId,
//     range: 'Sheet1!A1:G1',
//   })

//   if (!existing.data.values || existing.data.values.length === 0) {
//     // First ever lead — write header row first
//     await sheets.spreadsheets.values.update({
//       spreadsheetId: sheetId,
//       range: 'Sheet1!A1:G1',
//       valueInputOption: 'RAW',
//       requestBody: {
//         values: [['#', 'Name', 'Email', 'Phone', 'Interested In', 'Message', 'Submitted At']],
//       },
//     })

//     // Style the header row — bold + orange background + white text
//     await sheets.spreadsheets.batchUpdate({
//       spreadsheetId: sheetId,
//       requestBody: {
//         requests: [
//           {
//             repeatCell: {
//               range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
//               cell: {
//                 userEnteredFormat: {
//                   backgroundColor:    { red: 0.91, green: 0.34, blue: 0.23 },
//                   horizontalAlignment: 'CENTER',
//                   textFormat: {
//                     foregroundColor: { red: 1, green: 1, blue: 1 },
//                     bold: true,
//                     fontSize: 11,
//                   },
//                 },
//               },
//               fields: 'userEnteredFormat(backgroundColor,horizontalAlignment,textFormat)',
//             },
//           },
//           // Freeze header row
//           {
//             updateSheetProperties: {
//               properties: { sheetId: 0, gridProperties: { frozenRowCount: 1 } },
//               fields: 'gridProperties.frozenRowCount',
//             },
//           },
//           // Set column widths
//           { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 45  }, fields: 'pixelSize' } },
//           { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
//           { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 2, endIndex: 3 }, properties: { pixelSize: 240 }, fields: 'pixelSize' } },
//           { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 3, endIndex: 4 }, properties: { pixelSize: 150 }, fields: 'pixelSize' } },
//           { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 4, endIndex: 5 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
//           { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 5, endIndex: 6 }, properties: { pixelSize: 320 }, fields: 'pixelSize' } },
//           { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 6, endIndex: 7 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },
//         ],
//       },
//     })
//   }

//   // ── Get current row count to calculate lead number ──
//   const countRes = await sheets.spreadsheets.values.get({
//     spreadsheetId: sheetId,
//     range: 'Sheet1!A:A',
//   })
//   const leadNumber = (countRes.data.values?.length ?? 1)  // subtract header row

//   // ── Append the new lead row ──
//   await sheets.spreadsheets.values.append({
//     spreadsheetId: sheetId,
//     range: 'Sheet1!A:G',
//     valueInputOption: 'RAW',
//     insertDataOption: 'INSERT_ROWS',
//     requestBody: {
//       values: [[
//         leadNumber,
//         lead.name,
//         lead.email,
//         lead.phone || '—',
//         interestLabels[lead.interest] ?? lead.interest,
//         lead.message || '—',
//         lead.submittedAt,
//       ]],
//     },
//   })
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const { name, email, phone, interest, message } = body

//     if (!name || !email || !interest) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
//     }

//     const interestLabels: Record<string, string> = {
//       general:  'General Counselling',
//       career:   'Career Guidance',
//       academic: 'Academic Advice',
//       personal: 'Personal Development',
//       other:    'Other',
//     }

//     const submittedAt = new Date().toLocaleString('en-US', {
//       timeZone: 'Asia/Kolkata',
//       dateStyle: 'full',
//       timeStyle: 'short',
//     })

//     // ── 1. Append to Google Sheet ──
//     await appendToGoogleSheet({ name, email, phone, interest, message, submittedAt })

//     // ── 2. Send Email ──
//     const html = `
// <!DOCTYPE html>
// <html lang="en">
// <head><meta charset="UTF-8"/></head>
// <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
//     <tr><td align="center">
//       <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

//         <tr>
//           <td style="background:#E8573A;border-radius:16px 16px 0 0;padding:32px 40px 28px;">
//             <p style="margin:0 0 4px;font-size:11px;font-family:monospace;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.7);">New Lead — Counsellor Website</p>
//             <h1 style="margin:0;font-size:28px;font-weight:300;color:#fff;letter-spacing:-0.02em;line-height:1.15;">
//               ${name}<br/>
//               <span style="font-size:16px;opacity:0.8;font-weight:300;">just filled out the enquiry form</span>
//             </h1>
//           </td>
//         </tr>

//         <tr>
//           <td style="background:#fff;padding:32px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
//             <p style="margin:0 0 20px;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;">Contact Details</p>
//             <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
//               <tr>
//                 <td width="40%" style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Full Name</span></td>
//                 <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:15px;color:#111827;font-weight:500;">${name}</span></td>
//               </tr>
//               <tr>
//                 <td width="40%" style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Email</span></td>
//                 <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="mailto:${email}" style="font-size:15px;color:#E8573A;text-decoration:none;">${email}</a></td>
//               </tr>
//               <tr>
//                 <td width="40%" style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Phone</span></td>
//                 <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:15px;color:#111827;">${phone || '—'}</span></td>
//               </tr>
//               <tr>
//                 <td width="40%" style="padding:10px 0;"><span style="font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Interested In</span></td>
//                 <td style="padding:10px 0;"><span style="display:inline-block;background:#FEF0EC;color:#E8573A;font-size:12px;font-family:monospace;letter-spacing:0.08em;text-transform:uppercase;padding:4px 12px;border-radius:999px;">${interestLabels[interest] ?? interest}</span></td>
//               </tr>
//             </table>

//             ${message ? `
//             <p style="margin:0 0 10px;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;">Their Message</p>
//             <div style="background:#f9fafb;border-left:3px solid #E8573A;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
//               <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;font-style:italic;">"${message}"</p>
//             </div>
//             ` : ''}

//             <table cellpadding="0" cellspacing="0" style="margin-top:8px;">
//               <tr>
//                 <td style="padding-right:12px;">
//                   <a href="mailto:${email}?subject=Re: Your Counselling Enquiry" style="display:inline-block;background:#E8573A;color:#fff;text-decoration:none;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;padding:12px 24px;border-radius:999px;">Reply via Email</a>
//                 </td>
//                 ${phone ? `<td><a href="tel:${phone}" style="display:inline-block;background:#fff;color:#E8573A;text-decoration:none;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;padding:12px 24px;border-radius:999px;border:1px solid #E8573A;">Call Now</a></td>` : ''}
//               </tr>
//             </table>
//           </td>
//         </tr>

//         <tr>
//           <td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:20px 40px;">
//             <p style="margin:0;font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Submitted on ${submittedAt} IST</p>
//           </td>
//         </tr>

//       </table>
//     </td></tr>
//   </table>
// </body>
// </html>`

//     const transporter = nodemailer.createTransport({
//       host:   process.env.SMTP_HOST,
//       port:   Number(process.env.SMTP_PORT) || 587,
//       secure: process.env.SMTP_SECURE === 'true',
//       auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//     })

//     await transporter.sendMail({
//       from:    `"Website Lead" <${process.env.SMTP_USER}>`,
//       to:      process.env.ADMIN_EMAIL,
//       replyTo: email,
//       subject: `New Lead: ${name} — ${interestLabels[interest] ?? interest}`,
//       html,
//     })

//     return NextResponse.json({ success: true })

//   } catch (err) {
//     console.error('[/api/lead] Error:', err)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }
// app/api/lead/route.ts

import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

async function appendToGoogleSheet(lead: {
  name: string
  email: string
  phone: string
  interest: string
  message: string
  submittedAt: string
}) {
  const interestLabels: Record<string, string> = {
    general:  'General Counselling',
    career:   'Career Guidance',
    academic: 'Academic Advice',
    personal: 'Personal Development',
    other:    'Other',
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const sheetId = process.env.GOOGLE_SHEET_ID!

  // ── Check if header row exists, if not create it ──
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Sheet1!A1:G1',
  })

  if (!existing.data.values || existing.data.values.length === 0) {
    // First ever lead — write header row first
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1:G1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [['#', 'Name', 'Email', 'Phone', 'Interested In', 'Message', 'Submitted At']],
      },
    })

    // Style the header row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
              cell: {
                userEnteredFormat: {
                  backgroundColor:    { red: 0.91, green: 0.34, blue: 0.23 },
                  horizontalAlignment: 'CENTER',
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    bold: true,
                    fontSize: 11,
                  },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,horizontalAlignment,textFormat)',
            },
          },
          {
            updateSheetProperties: {
              properties: { sheetId: 0, gridProperties: { frozenRowCount: 1 } },
              fields: 'gridProperties.frozenRowCount',
            },
          },
          { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 45  }, fields: 'pixelSize' } },
          { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
          { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 2, endIndex: 3 }, properties: { pixelSize: 240 }, fields: 'pixelSize' } },
          { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 3, endIndex: 4 }, properties: { pixelSize: 150 }, fields: 'pixelSize' } },
          { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 4, endIndex: 5 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
          { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 5, endIndex: 6 }, properties: { pixelSize: 320 }, fields: 'pixelSize' } },
          { updateDimensionProperties: { range: { sheetId: 0, dimension: 'COLUMNS', startIndex: 6, endIndex: 7 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },
        ],
      },
    })
  }

  // ── Get current row count to calculate lead number ──
  const countRes = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:A',
  })
  const leadNumber = (countRes.data.values?.length ?? 1)

  // ── Append the new lead row ──
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:G',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[
        leadNumber,
        lead.name,
        lead.email,
        lead.phone || '—',
        interestLabels[lead.interest] ?? lead.interest,
        lead.message || '—',
        lead.submittedAt,
      ]],
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.ADMIN_EMAIL) {
      console.error('Missing email configuration in .env')
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { name, email, phone, interest, message } = body

    if (!name || !email || !interest) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const interestLabels: Record<string, string> = {
      general:  'General Counselling',
      career:   'Career Guidance',
      academic: 'Academic Advice',
      personal: 'Personal Development',
      other:    'Other',
    }

    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    // ── 1. Append to Google Sheet ──
    await appendToGoogleSheet({ name, email, phone, interest, message, submittedAt })

    // ── 2. Send Email ──
    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <tr>
          <td style="background:#E8573A;border-radius:16px 16px 0 0;padding:32px 40px 28px;">
            <p style="margin:0 0 4px;font-size:11px;font-family:monospace;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.7);">New Lead — Counsellor Website</p>
            <h1 style="margin:0;font-size:28px;font-weight:300;color:#fff;letter-spacing:-0.02em;line-height:1.15;">
              ${name}<br/>
              <span style="font-size:16px;opacity:0.8;font-weight:300;">just filled out the enquiry form</span>
            </h1>
          </td>
        </tr>

        <tr>
          <td style="background:#fff;padding:32px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
            <p style="margin:0 0 20px;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;">Contact Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td width="40%" style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Full Name</span></td>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:15px;color:#111827;font-weight:500;">${name}</span></td>
              </tr>
              <tr>
                <td width="40%" style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Email</span></td>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="mailto:${email}" style="font-size:15px;color:#E8573A;text-decoration:none;">${email}</a></td>
              </tr>
              <tr>
                <td width="40%" style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Phone</span></td>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="font-size:15px;color:#111827;">${phone || '—'}</span></td>
              </tr>
              <tr>
                <td width="40%" style="padding:10px 0;"><span style="font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Interested In</span></td>
                <td style="padding:10px 0;"><span style="display:inline-block;background:#FEF0EC;color:#E8573A;font-size:12px;font-family:monospace;letter-spacing:0.08em;text-transform:uppercase;padding:4px 12px;border-radius:999px;">${interestLabels[interest] ?? interest}</span></td>
              </tr>
            </table>

            ${message ? `
            <p style="margin:0 0 10px;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;">Their Message</p>
            <div style="background:#f9fafb;border-left:3px solid #E8573A;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
              <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;font-style:italic;">"${message}"</p>
            </div>
            ` : ''}

            <table cellpadding="0" cellspacing="0" style="margin-top:8px;">
              <tr>
                <td style="padding-right:12px;">
                  <a href="mailto:${email}?subject=Re: Your Counselling Enquiry" style="display:inline-block;background:#E8573A;color:#fff;text-decoration:none;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;padding:12px 24px;border-radius:999px;">Reply via Email</a>
                </td>
                ${phone ? `<td><a href="tel:${phone}" style="display:inline-block;background:#fff;color:#E8573A;text-decoration:none;font-size:11px;font-family:monospace;letter-spacing:0.12em;text-transform:uppercase;padding:12px 24px;border-radius:999px;border:1px solid #E8573A;">Call Now</a></td>` : ''}
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:20px 40px;">
            <p style="margin:0;font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;">Submitted on ${submittedAt} IST</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // Create transporter with updated credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,  // Now: servexai.2025@gmail.com
        pass: process.env.SMTP_PASS   // App password for servexai.2025@gmail.com
      },
    })

    // Verify SMTP connection before sending
    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      )
    }

    // Send the email
    const mailOptions = {
      from: `"Neuro Nest Counseling" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,  // Now: rama8805@gmail.com
      replyTo: email,
      subject: `New Lead: ${name} — ${interestLabels[interest] ?? interest}`,
      html,
    }

    console.log('Sending email from:', process.env.SMTP_USER)
    console.log('Sending email to:', process.env.ADMIN_EMAIL)

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')

    return NextResponse.json({ 
      success: true,
      message: 'Lead submitted successfully'
    })

  } catch (err) {
    console.error('[/api/lead] Error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
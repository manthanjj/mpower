import { Resend } from "resend";

export async function sendBookingConfirmationEmails({
  clientName,
  clientEmail,
  serviceTitle,
  sessionTimeFormattedIST,
  meetLink,
  amountPaidDisplay,
  intakeNotes,
}: {
  clientName: string;
  clientEmail: string;
  serviceTitle: string;
  sessionTimeFormattedIST: string;
  meetLink: string;
  amountPaidDisplay: string;
  intakeNotes?: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "care@mpowercounselling.in";
  const counsellorEmail = process.env.ADMIN_EMAIL || "counsellor@mpowercounselling.in";

  if (!apiKey || apiKey.includes("placeholder")) {
    return { success: true };
  }

  try {
    const resend = new Resend(apiKey);

    // 1. Email to Client
    await resend.emails.send({
      from: `Bhagyashree Counselling <${fromEmail}>`,
      to: [clientEmail],
      subject: `Confirmed: Your Session for ${serviceTitle} (${sessionTimeFormattedIST})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9F5; color: #1A2421; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E7E3; padding: 32px; }
            .header { text-align: center; border-bottom: 1px solid #E2E7E3; padding-bottom: 20px; margin-bottom: 24px; }
            .logo { font-size: 22px; font-weight: bold; color: #2D4A3E; }
            .badge { background: #E7EFE9; color: #2D4A3E; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-top: 8px; }
            .card { background: #F8F9F5; border: 1px solid #E2E7E3; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
            .btn { display: block; width: 80%; margin: 24px auto; background-color: #2D4A3E; color: #FBFBF9 !important; text-align: center; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px; }
            .crisis { background: #FEF2F2; border: 1px solid #FEE2E2; color: #991B1B; padding: 14px; border-radius: 8px; font-size: 12px; margin-top: 24px; line-height: 1.5; }
            .footer { text-align: center; font-size: 12px; color: #5C6B64; margin-top: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Bhagyashree Counselling</div>
              <div class="badge">Booking Confirmed ✓</div>
            </div>

            <p>Dear <strong>${clientName}</strong>,</p>
            <p>Your therapy appointment has been confirmed. Below are your consultation details:</p>

            <div class="card">
              <div class="row"><strong>Service:</strong> <span>${serviceTitle}</span></div>
              <div class="row"><strong>Scheduled Time:</strong> <span>${sessionTimeFormattedIST}</span></div>
              <div class="row"><strong>Format:</strong> <span>Online (Google Meet)</span></div>
              <div class="row"><strong>Amount Paid:</strong> <span>${amountPaidDisplay}</span></div>
            </div>

            <a href="${meetLink}" class="btn" target="_blank">Join Google Meet Session</a>

            <p style="font-size: 13px; color: #5C6B64;">
              * Tip: Please ensure you are in a quiet, private space with headphones and stable internet. You can reschedule or cancel up to 24 hours prior to the session from your Client Dashboard.
            </p>

            <div class="crisis">
              <strong>Immediate Crisis Support Notice:</strong><br>
              This platform is not equipped for emergency psychiatric crisis interventions. If you are experiencing thoughts of self-harm or urgent distress, please immediately call India's 24/7 free Tele-MANAS helpline at <strong>14416</strong> or KIRAN at <strong>1800-599-0019</strong>.
            </div>

            <div class="footer">
              © ${new Date().getFullYear()} Bhagyashree Mental Wellness & Counselling. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // 2. Email to Counsellor
    await resend.emails.send({
      from: `MPower Alerts <${fromEmail}>`,
      to: [counsellorEmail],
      subject: `New Booking: ${clientName} - ${serviceTitle} (${sessionTimeFormattedIST})`,
      html: `
        <h2>New Client Appointment Scheduled</h2>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        <p><strong>Service:</strong> ${serviceTitle}</p>
        <p><strong>Time:</strong> ${sessionTimeFormattedIST}</p>
        <p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
        <hr />
        <h3>Intake Responses:</h3>
        <pre style="background: #f4f4f4; padding: 12px; border-radius: 8px;">${intakeNotes || "None provided"}</pre>
      `,
    });

    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to dispatch email",
    };
  }
}

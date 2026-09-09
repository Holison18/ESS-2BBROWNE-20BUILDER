export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  try {
    // In Vercel, req.body is already parsed if JSON was sent, but handle string fallback
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // use as is
      }
    }

    const {
      firstName,
      lastName,
      email,
      countryCode = "+233",
      phone,
      subject,
      message,
    } = body || {};

    // Basic validation
    if (!firstName || !lastName || !email || !message || !subject) {
      res.status(400).json({
        success: false,
        error: "Missing required contact fields.",
      });
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not defined in environment variables.");
      res.status(500).json({
        success: false,
        error: "Email service is not configured. Please ensure RESEND_API_KEY is added to Vercel environment variables.",
      });
      return;
    }

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "info@essandbrowne.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "ESS + BROWNE <info@essandbrowne.com>";

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #EA580C; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="color: #111827; margin: 0 0 4px 0; font-size: 22px; letter-spacing: 0.5px;">ESS + BROWNE</h2>
          <p style="color: #6b7280; margin: 0; font-size: 14px;">New Contact Website Inquiry</p>
        </div>

        <div style="margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600; width: 130px; font-size: 14px;">Client Name:</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600; font-size: 14px;">Client Email:</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                <a href="mailto:${email}" style="color: #EA580C; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600; font-size: 14px;">Phone:</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${countryCode} ${phone || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563; font-weight: 600; font-size: 14px;">Subject:</td>
              <td style="padding: 8px 0; color: #111827; font-size: 14px;">${subject}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f9fafb; padding: 18px; border-radius: 6px; border-left: 4px solid #EA580C; margin-bottom: 24px;">
          <h4 style="margin: 0 0 10px 0; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</h4>
          <p style="margin: 0; color: #1f2937; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${message}</p>
        </div>

        <div style="font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 16px;">
          <p style="margin: 0;">💡 <strong>Tip:</strong> Click "Reply" in your email client to directly reply to ${firstName} (${email}).</p>
        </div>
      </div>
    `;

    const textContent = `
New Contact Inquiry from ESS + BROWNE Website

Client Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${countryCode} ${phone || "N/A"}
Subject: ${subject}

Message:
${message}
    `.trim();

    const sendWithResend = async (from: string) => {
      return await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [receiverEmail],
          reply_to: email,
          subject: `[Website Inquiry] ${subject} - ${firstName} ${lastName}`,
          html: htmlContent,
          text: textContent,
        }),
      });
    };

    let resendResponse = await sendWithResend(fromEmail);
    let resendData = (await resendResponse.json()) as any;

    if (!resendResponse.ok && !fromEmail.includes("onboarding@resend.dev")) {
      console.warn(
        `Resend send with "${fromEmail}" failed (${resendData.message || resendResponse.statusText}). Retrying with onboarding@resend.dev...`
      );
      const fallbackFrom = "ESS + BROWNE Contact Form <onboarding@resend.dev>";
      const fallbackResponse = await sendWithResend(fallbackFrom);
      if (fallbackResponse.ok) {
        resendResponse = fallbackResponse;
        resendData = (await fallbackResponse.json()) as any;
      }
    }

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      res.status(resendResponse.status).json({
        success: false,
        error:
          resendData.message ||
          "Failed to send email through Resend. Please verify your domain or API key.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
      id: resendData.id,
    });
  } catch (error: any) {
    console.error("Unhandled error in /api/contact:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An unexpected error occurred.",
    });
  }
}

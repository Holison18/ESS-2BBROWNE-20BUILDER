import { RequestHandler } from "express";

export const handleCareer: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, message, portfolioUrl } = req.body;
    const file = req.file;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not set.");
      res.status(500).json({ success: false, message: "Email service is not configured. Please set RESEND_API_KEY." });
      return;
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@essandbrowne.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "ESS + BROWNE Careers <info@essandbrowne.com>";

    const attachments = [];
    if (file) {
      attachments.push({
        filename: file.originalname,
        content: file.buffer.toString('base64'),
      });
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Portfolio URL:</strong> ${portfolioUrl || 'N/A'}</p>
        <hr/>
        <h3>Cover Letter / Message:</h3>
        <p style="white-space: pre-wrap;">${message || 'N/A'}</p>
      </div>
    `;

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
          subject: `New Career Application from ${name}`,
          html: htmlContent,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPortfolio URL: ${portfolioUrl || 'N/A'}\n\nMessage:\n${message || 'N/A'}`,
          attachments: attachments.length > 0 ? attachments : undefined
        }),
      });
    };

    let resendResponse = await sendWithResend(fromEmail);
    let resendData = (await resendResponse.json()) as any;

    if (!resendResponse.ok && !fromEmail.includes("onboarding@resend.dev")) {
      const fallbackFrom = "ESS + BROWNE <onboarding@resend.dev>";
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
        message: resendData.message || "Failed to send email.",
      });
      return;
    }

    res.status(200).json({ success: true, message: 'Application submitted successfully.' });
  } catch (error) {
    console.error('Error handling career application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application.' });
  }
};

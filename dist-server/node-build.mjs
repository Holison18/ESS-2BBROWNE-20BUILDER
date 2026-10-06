import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import multer from "multer";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const handleContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      countryCode = "+233",
      phone,
      subject,
      message
    } = req.body;
    if (!firstName || !lastName || !email || !message || !subject) {
      res.status(400).json({
        success: false,
        error: "Missing required contact fields."
      });
      return;
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not set.");
      res.status(500).json({
        success: false,
        error: "Email service is not configured. Please set RESEND_API_KEY."
      });
      return;
    }
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@essandbrowne.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "ESS + BROWNE <info@essandbrowne.com>";
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
    const sendWithResend = async (from) => {
      return await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from,
          to: [receiverEmail],
          reply_to: email,
          subject: `[Website Inquiry] ${subject} - ${firstName} ${lastName}`,
          html: htmlContent,
          text: textContent
        })
      });
    };
    let resendResponse = await sendWithResend(fromEmail);
    let resendData = await resendResponse.json();
    if (!resendResponse.ok && !fromEmail.includes("onboarding@resend.dev")) {
      console.warn(
        `Resend send with "${fromEmail}" failed (${resendData.message || resendResponse.statusText}). Retrying with onboarding@resend.dev...`
      );
      const fallbackFrom = "ESS + BROWNE Contact Form <onboarding@resend.dev>";
      const fallbackResponse = await sendWithResend(fallbackFrom);
      if (fallbackResponse.ok) {
        resendResponse = fallbackResponse;
        resendData = await fallbackResponse.json();
      }
    }
    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      res.status(resendResponse.status).json({
        success: false,
        error: resendData.message || "Failed to send email through Resend. Please check your domain verification or email settings."
      });
      return;
    }
    res.json({
      success: true,
      message: "Your message has been sent successfully!",
      id: resendData.id
    });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An unexpected error occurred while sending message."
    });
  }
};
const handleInternship = async (req, res) => {
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
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "ESS + BROWNE Internships <info@essandbrowne.com>";
    const attachments = [];
    if (file) {
      attachments.push({
        filename: file.originalname,
        content: file.buffer.toString("base64")
      });
    }
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2>New Internship Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Portfolio URL:</strong> ${portfolioUrl || "N/A"}</p>
        <hr/>
        <h3>Cover Letter / Message:</h3>
        <p style="white-space: pre-wrap;">${message || "N/A"}</p>
      </div>
    `;
    const sendWithResend = async (from) => {
      return await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from,
          to: [receiverEmail],
          reply_to: email,
          subject: `New Internship Application from ${name}`,
          html: htmlContent,
          text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Portfolio URL: ${portfolioUrl || "N/A"}

Message:
${message || "N/A"}`,
          attachments: attachments.length > 0 ? attachments : void 0
        })
      });
    };
    let resendResponse = await sendWithResend(fromEmail);
    let resendData = await resendResponse.json();
    if (!resendResponse.ok && !fromEmail.includes("onboarding@resend.dev")) {
      const fallbackFrom = "ESS + BROWNE <onboarding@resend.dev>";
      const fallbackResponse = await sendWithResend(fallbackFrom);
      if (fallbackResponse.ok) {
        resendResponse = fallbackResponse;
        resendData = await fallbackResponse.json();
      }
    }
    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      res.status(resendResponse.status).json({
        success: false,
        message: resendData.message || "Failed to send email."
      });
      return;
    }
    res.status(200).json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error handling internship application:", error);
    res.status(500).json({ success: false, message: "Failed to submit application." });
  }
};
const handleCareer = async (req, res) => {
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
        content: file.buffer.toString("base64")
      });
    }
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Portfolio URL:</strong> ${portfolioUrl || "N/A"}</p>
        <hr/>
        <h3>Cover Letter / Message:</h3>
        <p style="white-space: pre-wrap;">${message || "N/A"}</p>
      </div>
    `;
    const sendWithResend = async (from) => {
      return await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from,
          to: [receiverEmail],
          reply_to: email,
          subject: `New Career Application from ${name}`,
          html: htmlContent,
          text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Portfolio URL: ${portfolioUrl || "N/A"}

Message:
${message || "N/A"}`,
          attachments: attachments.length > 0 ? attachments : void 0
        })
      });
    };
    let resendResponse = await sendWithResend(fromEmail);
    let resendData = await resendResponse.json();
    if (!resendResponse.ok && !fromEmail.includes("onboarding@resend.dev")) {
      const fallbackFrom = "ESS + BROWNE <onboarding@resend.dev>";
      const fallbackResponse = await sendWithResend(fallbackFrom);
      if (fallbackResponse.ok) {
        resendResponse = fallbackResponse;
        resendData = await fallbackResponse.json();
      }
    }
    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      res.status(resendResponse.status).json({
        success: false,
        message: resendData.message || "Failed to send email."
      });
      return;
    }
    res.status(200).json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error handling career application:", error);
    res.status(500).json({ success: false, message: "Failed to submit application." });
  }
};
function createServer() {
  const app2 = express__default();
  const upload = multer({ storage: multer.memoryStorage() });
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.post("/api/contact", handleContact);
  app2.post("/api/internship", upload.single("portfolioFile"), handleInternship);
  app2.post("/api/career", upload.single("portfolioFile"), handleCareer);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname$1 = import.meta.dirname;
const distPath = path.join(__dirname$1, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map

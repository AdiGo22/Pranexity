import prisma from "../config/prisma.js";
import { validationResult } from "express-validator";
import { sendContactEmail } from "../utils/SendEmail.js";

export const createContact = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array().map(e => e.msg).join(". "),
    });
  }

  const { name, email, phone, message, preferredTime } = req.body;

  try {
    console.log("Saving contact:", { name, email, phone, message, preferredTime });

    //  Save to database 
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        preferredTime: preferredTime || null,
      },
    });

    //  Respond immediately
    res.status(200).json({
      success: true,
      message: "Thank you! Your request has been sent successfully. We'll get back to you soon!",
      id: contact.id,
    });

    // Sending email in background 
    sendContactEmail({ name, email, phone, message, preferredTime })
      .then(() => console.log("Email sent in background"))
      .catch(err => console.error("Background email sending error:", err));

  } catch (error) {
    console.error("Error saving contact or sending email:", error);

    //   DB fails 
    return res.status(500).json({
      error: "Unable to process your request right now. Try again later.",
    });
  }
};

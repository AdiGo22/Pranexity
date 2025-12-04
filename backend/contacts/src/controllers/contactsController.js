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

    // Save to DATABASE
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        preferredTime: preferredTime || null,
      },
    });

    // Send Email
    await sendContactEmail({ name, email, phone, message, preferredTime });

    return res.status(200).json({
      success: true,
      message: "Thank you! Your request has been sent successfully. We'll get back to you soon!",
      id: contact.id,
    });

  } catch (error) {
    console.error("Error saving contact or sending email:", error);
    return res.status(500).json({
      error: "Unable to process your request right now. Try again later.",
    });
  }
};

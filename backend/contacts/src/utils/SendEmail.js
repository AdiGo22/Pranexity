import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async ({ name, email, phone, message, preferredTime }) => {
  try {
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL,   
      to: process.env.SEND_TO,     
      subject: "New Contact Form Submission",
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime || "Not specified"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Email Sent Successfully:", response);
    return response;
  } catch (error) {
    console.error("Resend Email Error:", error);
    throw error;
  }
};

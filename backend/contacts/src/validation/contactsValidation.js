import { body } from "express-validator";

export const contactValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("message").notEmpty().withMessage("Message is required"),
  body("phone").optional().isString(),
  body("preferredTime")
    .optional()
    .isIn(["", "morning", "afternoon", "evening"])
    .withMessage("Invalid preferred time")
];

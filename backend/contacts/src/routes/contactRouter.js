import express from "express";
import { createContact } from "../controllers/contactsController.js";
import { contactValidator } from "../validation/contactsValidation.js";

const router = express.Router();

router.post("/contact", contactValidator, createContact);

export default router;

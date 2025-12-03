import { ZodError } from "zod";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: "validation_failed",
      errors: error.errors,
    });
  }

  console.error("SERVER ERROR:", error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  frontend origins
const allowedOrigins = [
  "https://pranexity.com",
  "https://www.pranexity.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];


const corsOptions = {
  origin: (origin, callback) => {
    console.log("CORS Request From:", origin);

    // Allow server-to-server (no origin)
    if (!origin) return callback(null, true);

    // Allow only listed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);

    // Reject silently (avoid preflight crash)
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: false 
};

// Apply CORS globally
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Routes
app.use("/api", contactRoutes);

// Root check route
app.get("/", (req, res) => {
  res.status(200).send("Pranexity Contact API is running");
});


const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

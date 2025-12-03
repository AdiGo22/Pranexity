import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://pranexity.com",
  "https://www.pranexity.com",
  "http://localhost:3000", 
  "http://127.0.0.1:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));


app.options("*", cors());

app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("Pranexity Contact API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

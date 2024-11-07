import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

// CORS middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is Healthy and Running");
});

app.post("/", (req, res) => {
  try {
    const { username, age, gender } = req.body;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const accessToken = jwt.sign({ username, age, gender }, secret, {
      expiresIn: "1d",
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export { app };

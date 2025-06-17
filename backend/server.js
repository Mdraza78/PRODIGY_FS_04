import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

// Load ENV variables and connect to DB
dotenv.config();
connectToMongoDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  origin: "http://localhost:3000", // Update with your frontend URL
  credentials: true 
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes); 

// Test endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Debug env variables
console.log("[ENV] JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Missing");
console.log("[ENV] MONGO_DB_URI:", process.env.MONGO_DB_URI ? "Loaded" : "Missing");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
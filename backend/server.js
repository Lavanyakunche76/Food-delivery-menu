import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

// Route Imports
import foodRouter from "./routes/foodRoute.js";
import adminFoodRouter from "./routes/AdminFoodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminAuthRouter from "./routes/adminAuthRoute.js";

// Middleware Imports
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 4000;

// 1. Middlewares
app.use(express.json());
app.use(
  cors({
    // Allow both local development and your deployed frontend
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// 2. Database Connection
connectDB();

// 3. Routes Mounting
app.use("/api/food", foodRouter);
app.use("/api/admin/food", adminFoodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin/auth", adminAuthRouter);
app.use("/images", express.static("uploads"));
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// 4. Error Handlers (Must be after routes)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});

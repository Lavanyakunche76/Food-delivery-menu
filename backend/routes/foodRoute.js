import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
import { protect, adminOnly } from "../middleware/auth.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

foodRouter.post("/add", protect, adminOnly, upload.single("image"), addFood);

foodRouter.get("/list", listFood);

foodRouter.post("/remove", protect, adminOnly, removeFood);

export default foodRouter;

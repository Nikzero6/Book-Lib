import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  addBooktoUser,
  deleteBookfromUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/rent/:id").put(addBooktoUser);
router.route("/return/:id").put(deleteBookfromUser);

export default router;

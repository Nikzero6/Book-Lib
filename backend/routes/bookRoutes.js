import express from "express";
import {
  getBookById,
  getAllBooks,
  CreateBook,
  DeleteBook,
  UpdateBook,
  getRentBooks,
} from "../controllers/BooksController.js";
const router = express.Router();
import { protect, protectAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getAllBooks);
router.route("/rent/:id").get(protect, getRentBooks);
router.route("/create").post(protectAdmin, CreateBook);
router
  .route("/:id")
  .get(getBookById)
  .delete(protectAdmin, DeleteBook)
  .put(protectAdmin, UpdateBook);

export default router;

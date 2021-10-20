import Book from "../models/bookModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all books for admin
// @route   GET /api/admin_books
// @access  Private
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

// @desc    Get rent books for user
// @route   GET /api/books/rent/:id
// @access  Private
const getRentBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ _id: { $in: req.user.books } });
  res.json(books);
});

//@description     Create single Book for admin only
//@route           GET /api/books/create
//@access          Private
const CreateBook = asyncHandler(async (req, res) => {
  const { title, short_desc, category, count } = req.body;

  if (!title || !short_desc || !category || !count) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const book = new Book({ title, short_desc, category, count });

    const createdBook = await book.save();

    res.status(201).json(createdBook);
  }
});

//@description     Fetch single Book
//@route           GET /api/books/:id
//@access          Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

//@description     Delete single Book
//@route           GET /api/books/:id
//@access          Private
const DeleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  // if (Book.user.toString() !== "admin") {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (book) {
    await book.remove();
    res.json({ message: "Book Removed" });
  } else {
    res.status(404);
    throw new Error("Book not Found");
  }
});

// @desc    Update a Book
// @route   PUT /api/books/:id
// @access  Private
const UpdateBook = asyncHandler(async (req, res) => {
  const { title, short_desc, category, count } = req.body;

  const book = await Book.findById(req.params.id);

  // if (Book.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (book) {
    book.title = title;
    book.short_desc = short_desc;
    book.category = category;
    book.count = count;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

export {
  getBookById,
  getAllBooks,
  getRentBooks,
  CreateBook,
  DeleteBook,
  UpdateBook,
};

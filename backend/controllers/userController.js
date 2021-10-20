import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    POST user profile
// @route   POST /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log(req);
  const user = await User.findById(req["user"]._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    PUT user books
// @route   PUT /api/users/rent/:id
// @access  Private
const addBooktoUser = asyncHandler(async (req, res) => {
  let token = req.body.headers.Authorization.split(" ")[1];
  // console.log(token);
  //decodes token id
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  const book = await Book.findById(req.params.id);

  if (book.count > 0) {
    if (user) {
      user.books.push(book._id);
      book.count--;
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        books: updatedUser.books,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  } else {
    res.status(404);
    throw new Error("Book Not Available");
  }
});

const deleteBookfromUser = asyncHandler(async (req, res) => {
  // console.log(req);
  let token = req.body.headers.Authorization.split(" ")[1];
  // console.log(token);
  //decodes token id
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  const book = await Book.findById(req.params.id);

  if (book) {
    if (user) {
      user.books.pop(book._id);
      book.count++;
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        books: updatedUser.books,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  } else {
    res.status(404);
    throw new Error("Book Not found");
  }
});

export {
  authUser,
  updateUserProfile,
  registerUser,
  addBooktoUser,
  deleteBookfromUser,
};

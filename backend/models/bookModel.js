import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    short_desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;

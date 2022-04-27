const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/test")
  .then(() => console.log("Mongodbga ulanish hosil qilindi..."))
  .catch((err) => console.error("Ulanishda hatolik yuz berdi", err));

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Book = mongoose.model("Books", bookSchema);
async function createBook() {
  const book = new Book({
    name: "ExpressJS",
    author: "Nozim",
    tags: ["node", "dasturlash"],
    isPublished: false,
  });

  const saveBook = await book.save();
  console.log(saveBook);
}

async function getBooks() {
  const books = await Book.find({
    author: "Nozim",
  })
    .limit(2)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(books);
}
getBooks();

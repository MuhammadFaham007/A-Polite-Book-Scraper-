const { bookSchema } = require("./src/schema");

const invalidBook = {
  title: "",
  price: "£51.77",
  availability: "In stock",
  rating: "Six",
  productUrl: "not-a-url",
};

const result = bookSchema.safeParse(invalidBook);

if (!result.success) {
  console.log("Invalid book correctly rejected!");

  console.log(
    result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }))
  );
}
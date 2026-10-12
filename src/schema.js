const { z } = require("zod");

const bookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  price: z.number().finite().nonnegative(),

  availability: z.string().trim().min(1, "Availability is required"),

  rating: z.enum(["One", "Two", "Three", "Four", "Five"]),

  productUrl: z.string().url(),
});

module.exports = { bookSchema };
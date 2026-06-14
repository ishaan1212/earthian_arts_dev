import "dotenv/config";
import { connectDb } from "./config/db.js";
import { products } from "./data/products.js";
import { Product } from "./models/Product.js";

await connectDb();

const operations = products.map((product) => ({
  updateOne: {
    filter: { slug: product.slug },
    update: { $set: product },
    upsert: true
  }
}));

const result = await Product.bulkWrite(operations);

console.log(
  `Seeded products. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}, matched: ${result.matchedCount}`
);
process.exit(0);

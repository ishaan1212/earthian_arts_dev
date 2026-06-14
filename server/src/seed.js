import "dotenv/config";
import { connectDb } from "./config/db.js";
import { products } from "./data/products.js";
import { Product } from "./models/Product.js";
import { User } from "./models/User.js";

await connectDb();

await Product.deleteMany({});
await User.deleteMany({});

await Product.insertMany(products);
await User.create({
  name: "Earthian Admin",
  email: "admin@earthianarts.test",
  password: "Admin12345",
  role: "admin"
});

console.log("Seeded products and admin user");
process.exit(0);

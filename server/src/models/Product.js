import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    category: { type: String, enum: ["earrings", "bracelet", "necklace", "ring"], required: true },
    audience: { type: String, enum: ["women", "men", "unisex"], required: true },
    material: [{ type: String, trim: true }],
    images: [
      {
        url: String,
        publicId: String,
        alt: String
      }
    ],
    stock: { type: Number, required: true, min: 0, default: 0 },
    featured: { type: Boolean, default: false },
    newlyLaunched: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    stripePriceId: String
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", material: "text" });
productSchema.index({ category: 1, audience: 1, active: 1 });

export const Product = mongoose.model("Product", productSchema);

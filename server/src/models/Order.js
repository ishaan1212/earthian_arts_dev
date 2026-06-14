import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      phone: String,
      line1: String,
      line2: String,
      city: String,
      province: String,
      postalCode: String,
      country: String
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending"
    },
    paymentProvider: { type: String, default: "stripe" },
    paymentIntentId: String,
    checkoutSessionId: String,
    paidAt: Date
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

import Stripe from "stripe";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { items, customerEmail, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const ids = items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: ids }, active: true });

  const orderItems = items.map((item) => {
    const product = products.find((candidate) => candidate._id.toString() === item.productId);
    if (!product) throw new Error("Product in cart is no longer available");
    if (product.stock < item.quantity) throw new Error(`${product.name} does not have enough stock`);

    return {
      product: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[0]?.url,
      price: product.price,
      quantity: item.quantity
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 75 ? 0 : 8;
  const tax = Math.round(subtotal * 0.13 * 100) / 100;
  const total = subtotal + shipping + tax;

  const order = await Order.create({
    user: req.user?._id,
    email: customerEmail || req.user?.email,
    items: orderItems,
    shippingAddress,
    subtotal,
    shipping,
    tax,
    total
  });

  if (!stripe) {
    return res.status(201).json({
      order,
      checkoutUrl: `${process.env.CLIENT_URL}/checkout/success?orderId=${order._id}`,
      message: "Stripe is not configured. Created a pending order for local development."
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail || req.user?.email,
    success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: { orderId: order._id.toString() },
    shipping_address_collection: { allowed_countries: ["CA", "US"] },
    line_items: orderItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "cad",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          images: item.image?.startsWith("http") ? [item.image] : undefined
        }
      }
    }))
  });

  order.checkoutSessionId = session.id;
  await order.save();

  res.status(201).json({ order, checkoutUrl: session.url });
});

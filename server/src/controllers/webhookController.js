import Stripe from "stripe";
import { Order } from "../models/Order.js";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function stripeWebhook(req, res) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(200).json({ received: true, skipped: true });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const order = await Order.findById(session.metadata.orderId);

    if (order && order.status === "pending") {
      order.status = "paid";
      order.paidAt = new Date();
      order.paymentIntentId = session.payment_intent;
      order.checkoutSessionId = session.id;
      await order.save();
    }
  }

  res.json({ received: true });
}

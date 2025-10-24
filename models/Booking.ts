
import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    mode: { type: String, enum: ["Online", "In-Clinic"], default: "Online" },
    date: String,
    time: String,
    orderId: String,
    paymentId: String,
    amount: Number,
    code: { type: String, index: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;

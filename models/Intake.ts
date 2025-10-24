import mongoose, { Schema, models } from "mongoose";

const IntakeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    mode: { type: String },
    date: { type: String },
    time: { type: String },
    notes: { type: String },
    reports: [{ type: String }], // public file paths like /reports/abc.pdf
  },
  { timestamps: true }
);

const Intake = models.Intake || mongoose.model("Intake", IntakeSchema);
export default Intake;

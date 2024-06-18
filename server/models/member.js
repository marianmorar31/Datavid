import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String },
  profilePicture: { type: String },
});

memberSchema.index(
  { firstName: 1, lastName: 1, country: 1, city: 1 },
  { unique: true }
);

const Member = mongoose.model("Member", memberSchema, "members");

export default Member;

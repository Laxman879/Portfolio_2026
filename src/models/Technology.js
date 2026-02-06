import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    iconType: { type: String, enum: ["library", "image"], default: "library" },
    iconIdentifier: String,
    iconImage: String,
  },
  { timestamps: true }
);

const Technology =
  mongoose.models.Technology || mongoose.model("Technology", TechnologySchema);

export default Technology;

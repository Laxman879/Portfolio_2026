import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    website: String,
    technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Technology" }],
    github: String,
    category: { type: String, default: "all" },
    image: String,
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;

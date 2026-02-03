import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    aboutme: String,
    noofprojects: String,
    yearofexperience: String,
    noofclients: String,
    skills: String,
    highlights: String,
    skillsDescription: String,
  },
  { timestamps: true }
);

const About = mongoose.models.About || mongoose.model("About", AboutSchema);

export default About;
"use client";

import { useRef, useState, useEffect } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from "framer-motion";
import { HiExternalLink, HiCode, HiGlobe, HiChevronDown } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import TechnologyChip from "@/components/ui/TechnologyChip";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="card h-full overflow-hidden hover:shadow-strong transition-all duration-500 hover:-translate-y-2">
        {/* Project Image */}
        {project?.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image src={project.image} alt={project.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
        )}

        {/* Project Content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-secondary-100 group-hover:text-primary-600 transition-colors">
              {project?.name || `Project ${index + 1}`}
            </h3>
            <motion.div
              className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors flex-shrink-0 ml-2"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <HiCode className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
            </motion.div>
          </div>

          {/* Project Description */}
          {project?.description && (
            <p className="text-secondary-300 mb-4 text-sm sm:text-base line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(project?.technologies) && project.technologies.map((tech, idx) => (
              <TechnologyChip key={idx} technology={tech} />
            ))}
          </div>

          {/* Action Links */}
          <div className="flex gap-3">
            {project?.website && (
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                <HiGlobe className="w-4 h-4" />
                Live Demo
                <HiExternalLink className="w-3 h-3" />
              </a>
            )}
            {project?.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-secondary-400 hover:text-white transition-colors">
                <FaGithub className="w-4 h-4" />
                Code
                <HiExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
    </motion.div>
  );
};

export default function ClientProjectView({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mainCategories, setMainCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const mainRes = await fetch("/api/category/get?type=main");
        const mainResult = await mainRes.json();
        if (mainResult.success) {
          setMainCategories([{ name: "all", label: "All" }, ...mainResult.data]);
        }

        const allRes = await fetch("/api/category/get");
        const allResult = await allRes.json();
        if (allResult.success) {
          setAllCategories([{ name: "all", label: "All" }, ...allResult.data]);
        }
      } catch (error) {
        console.error("Failed to fetch categories");
      }
    }
    fetchCategories();
  }, []);

  const projects = data && data.length ? data : [];
  const filteredProjects = selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory);

  const displayCategories = showAllCategories ? allCategories : mainCategories;
  const hasMoreCategories = allCategories.length > mainCategories.length;

  return (
    <section className="section-padding" id="project">
      <div className="container-custom">
        {/* Header */}
        <AnimationWrapper className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-100 mb-4">
              My <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-secondary-300 max-w-2xl mx-auto">Recent projects showcasing skills and experience.</p>
          </motion.div>
        </AnimationWrapper>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex justify-center gap-3 mb-4 flex-wrap">
            {displayCategories.map((cat) => (
              <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.name ? "bg-primary-500 text-white shadow-lg" : "bg-secondary-800 text-secondary-300 hover:bg-secondary-700"}`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Load More Categories Button */}
          {hasMoreCategories && !showAllCategories && (
            <div className="flex justify-center">
              <button onClick={() => setShowAllCategories(true)} className="flex items-center gap-2 px-4 py-2 bg-secondary-800 text-secondary-300 hover:bg-secondary-700 rounded-full transition-all">
                <span>More Categories</span>
                <HiChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <AnimationWrapper stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => <ProjectCard key={index} project={project} index={index} />)
            ) : (
              <div className="col-span-full">
                <div className="card p-8 text-center">
                  <HiCode className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-secondary-300 mb-2">No Projects Yet</h3>
                  <p className="text-secondary-400">Projects will appear here once added from the admin panel.</p>
                </div>
              </div>
            )}
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}

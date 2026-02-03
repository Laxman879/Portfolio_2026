"use client";

import { useRef, useState } from "react";
import AnimationWrapper, { staggerVariants } from "../animation-wrapper";
import { motion, useScroll } from "framer-motion";
import { HiExternalLink, HiCode, HiCalendar, HiEye, HiGlobe } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

const projectVariants = {
  offscreen: { y: 50, opacity: 0, scale: 0.9 },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const technologies = project?.technologies ? project.technologies.split(",").map(t => t.trim()) : [];
  const date = project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Recent";

  return (
    <motion.div
      variants={projectVariants}
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="card h-full overflow-hidden hover:shadow-strong transition-all duration-500 hover:-translate-y-2">
        {/* Project Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-100 mb-2 group-hover:text-primary-600 transition-colors truncate">
                {project?.name || `Project ${index + 1}`}
              </h3>
              <div className="flex items-center gap-2 text-secondary-500 text-xs sm:text-sm">
                <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{date}</span>
              </div>
            </div>
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors flex-shrink-0 ml-2"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <HiCode className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 group-hover:text-white transition-colors" />
            </motion.div>
          </div>

          {/* Project Description */}
          <p className="text-secondary-300 mb-4 sm:mb-6 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
            {project?.description || "A modern web application built with cutting-edge technologies and best practices."}
          </p>
        </div>

        {/* Technologies */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {technologies.slice(0, 3).map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-2 py-1 sm:px-3 bg-background border border-white/5 text-secondary-300 rounded-full text-xs sm:text-sm font-medium hover:bg-primary-500/20 hover:text-primary-400 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
            {technologies.length > 3 && (
              <span className="px-2 py-1 sm:px-3 bg-secondary-800 text-secondary-400 rounded-full text-xs sm:text-sm font-medium">
                +{technologies.length - 3}
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex gap-3">
            {project?.website && (
              <a 
                href={project.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <HiGlobe className="w-4 h-4" />
                Live Demo
                <HiExternalLink className="w-3 h-3" />
              </a>
            )}
            {project?.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-secondary-400 hover:text-white transition-colors"
              >
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
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  // Default projects if no data
  const defaultProjects = [
    {
      name: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with modern UI/UX",
      technologies: "React, Node.js, MongoDB, Stripe",
      website: "#",
      github: "#",
      createdAt: new Date().toISOString()
    },
    {
      name: "Task Management App",
      description: "Collaborative task management with real-time updates",
      technologies: "Next.js, TypeScript, PostgreSQL, Socket.io",
      website: "#",
      github: "#",
      createdAt: new Date().toISOString()
    },
    {
      name: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      technologies: "React, API Integration, Chart.js, Tailwind",
      website: "#",
      github: "#",
      createdAt: new Date().toISOString()
    }
  ];

  const projects = data && data.length ? data : defaultProjects;

  return (
    <section className="section-padding" id="project">
      <div className="container-custom">
        {/* Header */}
        <AnimationWrapper className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-100 mb-4">
              My <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-xl text-secondary-300 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience in web development.
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-secondary-200"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className="text-primary-500"
                  style={{
                    pathLength: scrollXProgress,
                    strokeDasharray: "251.2",
                    strokeDashoffset: "251.2"
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <HiEye className="w-6 h-6 text-primary-500" />
              </div>
            </div>
          </motion.div>
        </AnimationWrapper>

        {/* Projects Grid */}
        <AnimationWrapper stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
}

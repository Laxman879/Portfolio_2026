"use client";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import AnimationWrapper, { staggerVariants } from "../animation-wrapper";
import { motion } from "framer-motion";
import { HiBriefcase, HiAcademicCap, HiCalendar, HiLocationMarker } from "react-icons/hi";

const timelineItemVariants = {
  offscreen: { x: -50, opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const ExperienceCard = ({ item, index }) => (
  <motion.div
    variants={timelineItemVariants}
    className="group"
  >
    <div className="card p-4 sm:p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-primary-500">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors flex-shrink-0">
          <HiBriefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 group-hover:text-white transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary-500 mb-2">
            <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{item.duration}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-secondary-100 mb-1 group-hover:text-primary-600 transition-colors">
            {item.position}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base text-secondary-400 mb-3">
            <span className="font-semibold">{item.company}</span>
            <span className="hidden sm:inline text-secondary-600">•</span>
            <div className="flex items-center gap-1">
              <HiLocationMarker className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-sm">{item.location}</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-secondary-300 leading-relaxed">
            {item.jobprofile}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const EducationCard = ({ item, index }) => (
  <motion.div
    variants={timelineItemVariants}
    className="group"
  >
    <div className="card p-4 sm:p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors flex-shrink-0">
          <HiAcademicCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 group-hover:text-white transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-secondary-500 mb-2">
            <HiCalendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{item.year}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-secondary-100 mb-1 group-hover:text-blue-600 transition-colors">
            {item.degree}
          </h3>
          <p className="text-sm sm:text-base text-secondary-300 font-medium">
            {item.college}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function ClientExperienceAndEducationView({
  educationData,
  experienceData,
}) {
  const experience = experienceData && experienceData.length ? experienceData : [];
  const education = educationData && educationData.length ? educationData : [];

  return (
    <section className="section-padding" id="experience">
      <div className="container-custom">
        {/* Header */}
        <AnimationWrapper className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-100 mb-4">
              My <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-secondary-300 max-w-2xl mx-auto">
              Professional experience and educational background.
            </p>
          </motion.div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Experience Section */}
          <div>
            <AnimationWrapper>
              <motion.div
                className="mb-6 lg:mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-100">
                    Professional <span className="text-gradient">Experience</span>
                  </h3>
                </div>
              </motion.div>
            </AnimationWrapper>

            <AnimationWrapper stagger>
              <div className="space-y-4 sm:space-y-6">
                {experience.length > 0 ? experience.map((item, index) => (
                  <ExperienceCard key={index} item={item} index={index} />
                )) : (
                  <div className="card p-6 text-center">
                    <p className="text-secondary-400">No experience data available. Please add from admin panel.</p>
                  </div>
                )}
              </div>
            </AnimationWrapper>
          </div>

          {/* Education Section */}
          <div className="mt-8 lg:mt-0">
            <AnimationWrapper>
              <motion.div
                className="mb-6 lg:mb-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiAcademicCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-100">
                    Educational <span className="text-gradient">Background</span>
                  </h3>
                </div>
              </motion.div>
            </AnimationWrapper>

            <AnimationWrapper stagger>
              <div className="space-y-4 sm:space-y-6">
                {education.length > 0 ? education.map((item, index) => (
                  <EducationCard key={index} item={item} index={index} />
                )) : (
                  <div className="card p-6 text-center">
                    <p className="text-secondary-400">No education data available. Please add from admin panel.</p>
                  </div>
                )}
              </div>
            </AnimationWrapper>
          </div>
        </div>

      
      </div>
    </section>
  );
}

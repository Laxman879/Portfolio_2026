"use client";

import AnimationWrapper, { staggerVariants } from "../animation-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiCheckCircle, HiUsers, HiBriefcase, HiClock } from "react-icons/hi";
import aboutMeImage from "../../../assets/about-image.png";

const statsVariants = {
  offscreen: { scale: 0.8, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const skillVariants = {
  offscreen: { y: 20, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.6,
    },
  },
};

export default function ClientAboutView({ data }) {
  const aboutDataInfo = [
    {
      label: "Happy Clients",
      value: data?.noofclients || "0",
      icon: HiUsers,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Projects Done",
      value: data?.noofprojects || "0",
      icon: HiBriefcase,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Years Experience",
      value: data?.yearofexperience || "0",
      icon: HiClock,
      color: "text-primary-500",
      bgColor: "bg-primary-500/10",
    },
  ];

  const skills = data?.skills ? data.skills.split(",").map(s => s.trim()) : [];

  return (
    <section className="section-padding" id="about">
      <div className="container-custom">
        {/* Stats Section */}
        <AnimationWrapper stagger className="mb-12 sm:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {aboutDataInfo.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  className="card p-4 sm:p-6 lg:p-8 text-center group hover:shadow-strong transition-all duration-300"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                  </div>
                  <motion.h3 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-100 mb-1 sm:mb-2"
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {stat.value}+
                  </motion.h3>
                  <p className="text-sm sm:text-base text-secondary-300 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </AnimationWrapper>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <AnimationWrapper>
            <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-100 leading-tight">
                  Why Hire Me For Your{" "}
                  <span className="text-gradient">Next Project?</span>
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-sm sm:text-base lg:text-lg text-secondary-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {data?.aboutme || "Please update your about information from the admin panel."}
              </motion.p>

              <motion.div
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {data?.highlights ? data.highlights.split(',').map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <HiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-secondary-300 font-medium">{item.trim()}</span>
                  </motion.div>
                )) : (
                  <p className="text-sm text-secondary-400">Please add highlights from admin panel</p>
                )}
              </motion.div>
            </div>
          </AnimationWrapper>

          {/* Image */}
          <AnimationWrapper>
            <motion.div 
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden rounded-4xl shadow-strong">
                <Image
                  src={aboutMeImage}
                  alt="About Me"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary-500 rounded-2xl shadow-green-glow flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white font-bold text-lg">{data?.yearofexperience || "0"}+</span>
              </motion.div>
            </motion.div>
          </AnimationWrapper>
        </div>

        {/* Skills Section */}
        <AnimationWrapper className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-secondary-100 mb-3 sm:mb-4 px-4 sm:px-0">
              Technologies I <span className="text-gradient">Work With</span>
            </h3>
            <p className="text-sm sm:text-base text-secondary-300 max-w-2xl mx-auto px-4 sm:px-0">
              {data?.skillsDescription || "Please add skills description from admin panel."}
            </p>
          </div>
          
          <div className="relative w-full overflow-hidden mask-gradient-x space-y-6">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>

            {/* Row 1 - Scroll Left */}
            <div className="flex gap-6 animate-scroll-left hover:pause-animation">
              {[...skills.slice(0, Math.ceil(skills.length / 2)), ...skills.slice(0, Math.ceil(skills.length / 2)), ...skills.slice(0, Math.ceil(skills.length / 2))].map((skill, index) => (
                <div
                  key={`row1-${skill}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="card px-8 py-4 text-center hover:shadow-glow hover:border-primary-500/50 transition-all duration-300 group-hover:scale-105 min-w-[140px] flex items-center justify-center bg-surface/50 backdrop-blur-sm">
                    <span className="font-semibold text-sm sm:text-base text-secondary-300 group-hover:text-primary-400 transition-colors whitespace-nowrap">
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 - Scroll Right */}
            <div className="flex gap-6 animate-scroll-right hover:pause-animation">
              {[...skills.slice(Math.ceil(skills.length / 2)), ...skills.slice(Math.ceil(skills.length / 2)), ...skills.slice(Math.ceil(skills.length / 2))].map((skill, index) => (
                <div
                  key={`row2-${skill}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="card px-8 py-4 text-center hover:shadow-glow hover:border-primary-500/50 transition-all duration-300 group-hover:scale-105 min-w-[140px] flex items-center justify-center bg-surface/50 backdrop-blur-sm">
                    <span className="font-semibold text-sm sm:text-base text-secondary-300 group-hover:text-primary-400 transition-colors whitespace-nowrap">
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimationWrapper>
        
        <style jsx global>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-33.33%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
          }
          .hover\:pause-animation:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}

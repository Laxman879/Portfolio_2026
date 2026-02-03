'use client';

import { useRef } from 'react';
import AnimationWrapper from '../animation-wrapper';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { HiDownload, HiArrowDown } from 'react-icons/hi';
import Image from 'next/image';
import aiImage from '../../../assets/Lucky.png';

const textVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const imageVariants = {
  offscreen: { scale: 0.8, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 1,
      delay: 0.2,
    },
  },
};

export default function ClientHomeView({ data }) {
  const containerRef = useRef(null);

  const socialIcons = [
    {
      id: 'github',
      icon: FaGithub,
      href: data && data.length ? data[0]?.githubUrl || '#' : '#',
      label: 'GitHub',
    },
    {
      id: 'linkedin',
      icon: FaLinkedinIn,
      href: data && data.length ? data[0]?.linkedinUrl || '#' : '#',
      label: 'LinkedIn',
    },
    {
      id: 'twitter',
      icon: FaTwitter,
      href: data && data.length ? data[0]?.twitterUrl || '#' : '#',
      label: 'Twitter',
    },
    {
      id: 'instagram',
      icon: FaInstagram,
      href: data && data.length ? data[0]?.instagramUrl || '#' : '#',
      label: 'Instagram',
    },
  ];

  const renderHeading = () => {
    if (!data || !data.length) {
      return (
        <h1 className="mb-6 text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight">
          <span className="text-secondary-100">Loading...</span>
        </h1>
      );
    }

    return (
      <h1 className="mb-6 text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight">
        {data[0]?.heading.split(' ').map((word, index) => (
          <motion.span
            key={index}
            className={`${index === 2 || index === 3 ? 'text-gradient' : 'text-secondary-100'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </h1>
    );
  };

  return (
    <section className="min-h-screen flex items-center section-padding pt-32" id="home">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <AnimationWrapper variants={textVariants}>
            <div className="space-y-6">
              {renderHeading()}

              <motion.p
                className="text-xl text-secondary-400 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {data && data.length
                  ? data[0]?.summary
                  : 'Loading...'}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href="/cv/Laxman-Resume.pdf"
                  download="Laxman-Resume.pdf"
                  className="btn-primary flex items-center gap-2 no-underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: 'resume_download',
                    });
                  }}
                >
                  <HiDownload className="w-5 h-5" />
                  Download CV
                </motion.a>
                <motion.button
                  className="btn-secondary"
                  onClick={() => {
                    const projectSection = document.getElementById('project');
                    if (projectSection) {
                      projectSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 bg-surface text-secondary-300 hover:bg-primary-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-glow"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.9 + index * 0.1,
                        type: 'spring',
                        bounce: 0.6,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </AnimationWrapper>

          {/* Image */}
          <AnimationWrapper variants={imageVariants}>
            <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
              <motion.div
                ref={containerRef}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl sm:rounded-3xl lg:rounded-4xl transform rotate-6 shadow-strong"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-500 rounded-2xl sm:rounded-3xl lg:rounded-4xl transform -rotate-3 shadow-medium"></div>

                {/* Main Image Container */}
                <motion.div
                  className="relative w-full h-full bg-surface rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-strong overflow-hidden border-2 sm:border-4 border-surface"
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src={aiImage}
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent"></div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary-500 rounded-full shadow-green-glow"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 bg-primary-400 rounded-lg sm:rounded-xl shadow-medium"
                  animate={{
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}

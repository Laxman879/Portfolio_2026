"use client";
import { motion } from "framer-motion";

const defaultVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const staggerVariants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function AnimationWrapper({ 
  children, 
  className, 
  variants = defaultVariants,
  stagger = false,
  delay = 0,
  ...props 
}) {
  const animationVariants = stagger ? staggerVariants : variants;
  
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={animationVariants}
      className={className}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { defaultVariants, staggerVariants };

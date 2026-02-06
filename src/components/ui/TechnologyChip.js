"use client";

import Image from "next/image";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { HiCode } from "react-icons/hi";

const iconLibraries = { ...FaIcons, ...SiIcons };

export default function TechnologyChip({ technology }) {
  const renderIcon = () => {
    // Priority 1: Use uploaded image if exists
    if (technology.iconImage) {
      return (
        <div className="relative w-5 h-5">
          <Image src={technology.iconImage} alt={technology.name} fill className="object-contain" />
        </div>
      );
    }
    
    // Priority 2: Use icon identifier if exists
    if (technology.iconIdentifier) {
      const IconComponent = iconLibraries[technology.iconIdentifier];
      if (IconComponent) {
        return <IconComponent className="w-5 h-5" />;
      }
    }
    
    // Priority 3: Fallback to default icon
    return <HiCode className="w-5 h-5" />;
  };

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-white/5 text-secondary-300 rounded-full text-sm font-medium hover:bg-primary-500/20 hover:text-primary-400 transition-colors">
      <span className="w-6 h-6 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400">
        {renderIcon()}
      </span>
      <span>{technology.name}</span>
    </span>
  );
}

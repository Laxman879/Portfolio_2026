import { Suspense } from "react";
import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";

// Loading component for sections
const SectionSkeleton = () => (
  <div className="section-padding">
    <div className="container-custom">
      <div className="animate-pulse">
        <div className="h-8 bg-secondary-200 rounded-lg w-1/3 mx-auto mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-secondary-200 rounded w-full"></div>
          <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
          <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  // For GitHub Pages static export, we'll pass null data
  // Components will use their default/fallback data
  return (
    <main className="overflow-x-hidden">
      <Suspense fallback={<SectionSkeleton />}>
        <ClientHomeView data={null} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientAboutView data={null} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientExperienceAndEducationView
          educationData={null}
          experienceData={null}
        />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientProjectView data={null} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientContactView />
      </Suspense>
    </main>
  );
}
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

async function extractAllDatas(currentSection) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL
      : 'http://localhost:3000';
      
    const res = await fetch(`${baseUrl}/api/${currentSection}/get`, {
      method: "GET",
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch ${currentSection} data:`, res.status);
      return null;
    }

    const data = await res.json();
    return data && data.data;
  } catch (error) {
    console.warn(`Error fetching ${currentSection} data:`, error);
    return null;
  }
}

export default async function Home() {
  // Fetch all data with error handling
  const [homeSectionData, aboutSectionData, experienceSectionData, educationSectionData, projectSectionData] = await Promise.allSettled([
    extractAllDatas("home"),
    extractAllDatas("about"),
    extractAllDatas("experience"),
    extractAllDatas("education"),
    extractAllDatas("project"),
  ]);

  // Extract successful results
  const homeData = homeSectionData.status === 'fulfilled' ? homeSectionData.value : null;
  const aboutData = aboutSectionData.status === 'fulfilled' ? aboutSectionData.value : null;
  const experienceData = experienceSectionData.status === 'fulfilled' ? experienceSectionData.value : null;
  const educationData = educationSectionData.status === 'fulfilled' ? educationSectionData.value : null;
  const projectData = projectSectionData.status === 'fulfilled' ? projectSectionData.value : null;

  return (
    <main className="overflow-x-hidden">
      <Suspense fallback={<SectionSkeleton />}>
        <ClientHomeView data={homeData} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientAboutView
          data={aboutData && aboutData.length ? aboutData[0] : null}
        />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientExperienceAndEducationView
          educationData={educationData}
          experienceData={experienceData}
        />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientProjectView data={projectData} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientContactView />
      </Suspense>
    </main>
  );
}

"use client";

import { Suspense, useEffect, useState } from "react";
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

async function fetchData(section) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
      : 'http://localhost:3000';
      
    const res = await fetch(`${baseUrl}/api/${section}/get`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.warn(`Error fetching ${section}:`, error);
    return null;
  }
}

export default function Home() {
  const [data, setData] = useState({
    home: null,
    about: null,
    experience: null,
    education: null,
    project: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [homeData, aboutData, experienceData, educationData, projectData] = await Promise.allSettled([
          fetchData("home"),
          fetchData("about"),
          fetchData("experience"),
          fetchData("education"),
          fetchData("project"),
        ]);

        setData({
          home: homeData.status === 'fulfilled' ? homeData.value : null,
          about: aboutData.status === 'fulfilled' ? aboutData.value : null,
          experience: experienceData.status === 'fulfilled' ? experienceData.value : null,
          education: educationData.status === 'fulfilled' ? educationData.value : null,
          project: projectData.status === 'fulfilled' ? projectData.value : null
        });
      } catch (error) {
        console.warn('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Suspense fallback={<SectionSkeleton />}>
        <ClientHomeView data={data.home} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientAboutView data={data.about?.[0] || null} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientExperienceAndEducationView
          educationData={data.education}
          experienceData={data.experience}
        />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientProjectView data={data.project} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ClientContactView />
      </Suspense>
    </main>
  );
}
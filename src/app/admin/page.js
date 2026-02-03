'use client';

import AdminAboutView from '@/components/admin-view/about';
import AdminContactView from '@/components/admin-view/contact';
import AdminEducationView from '@/components/admin-view/education';
import AdminExperienceView from '@/components/admin-view/experience';
import AdminHomeView from '@/components/admin-view/home';
import Login from '@/components/admin-view/login';
import AdminProjectView from '@/components/admin-view/project';
import { addData, getData, login, updateData } from '@/services';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const initialHomeFormData = {
  heading: '',
  summary: '',
};

const initialAboutFormData = {
  aboutme: '',
  noofprojects: '',
  yearofexperience: '',
  noofclients: '',
  skills: '',
};

const initialExperienceFormData = {
  position: '',
  company: '',
  duration: '',
  location: '',
  jobprofile: '',
};

const initialEducationFormData = {
  degree: '',
  year: '',
  college: '',
};

const initialProjectFormData = {
  name: '',
  website: '',
  technologies: '',
  github: '',
};

const initialLoginFormData = {
  username: '',
  password: '',
};

export default function AdminView() {
  const [currentSelectedTab, setCurrentSelectedTab] = useState('home');
  const [homeViewFormData, setHomeViewFormData] = useState(initialHomeFormData);
  const [aboutViewFormData, setAboutViewFormData] = useState(initialAboutFormData);
  const [experienceViewFormData, setExperienceViewFormData] = useState(initialExperienceFormData);
  const [educationViewFormData, setEducationViewFormData] = useState(initialEducationFormData);
  const [projectViewFormData, setProjectViewFormData] = useState(initialProjectFormData);

  const [allData, setAllData] = useState({});
  const [update, setUpdate] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [loginFormData, setLoginFormData] = useState(initialLoginFormData);

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      component: (
        <AdminHomeView
          formData={homeViewFormData}
          setFormData={setHomeViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: 'about',
      label: 'About',
      component: (
        <AdminAboutView
          formData={aboutViewFormData}
          setFormData={setAboutViewFormData}
          handleSaveData={handleSaveData}
        />
      ),
    },
    {
      id: 'experience',
      label: 'Experience',
      component: (
        <AdminExperienceView
          formData={experienceViewFormData}
          handleSaveData={handleSaveData}
          setFormData={setExperienceViewFormData}
          data={allData?.experience}
        />
      ),
    },
    {
      id: 'education',
      label: 'Education',
      component: (
        <AdminEducationView
          formData={educationViewFormData}
          handleSaveData={handleSaveData}
          setFormData={setEducationViewFormData}
          data={allData?.education}
        />
      ),
    },
    {
      id: 'project',
      label: 'Project',
      component: (
        <AdminProjectView
          formData={projectViewFormData}
          handleSaveData={handleSaveData}
          setFormData={setProjectViewFormData}
          data={allData?.project}
          onRefresh={extractAllDatas}
        />
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      component: <AdminContactView data={allData && allData?.contact} onRefresh={extractAllDatas} />,
    },
  ];

  async function extractAllDatas() {
    const response = await getData(currentSelectedTab);

    if (currentSelectedTab === 'home' && response && response.data && response.data.length) {
      setHomeViewFormData(response && response.data[0]);
      setUpdate(true);
    }

    if (currentSelectedTab === 'about' && response && response.data && response.data.length) {
      setAboutViewFormData(response && response.data[0]);
      setUpdate(true);
    }

    if (response?.success) {
      setAllData({
        ...allData,
        [currentSelectedTab]: response && response.data,
      });
    }
  }

  console.log(allData, 'allData');

  async function handleSaveData(currentTab = currentSelectedTab) {
    const dataMap = {
      home: homeViewFormData,
      about: aboutViewFormData,
      education: educationViewFormData,
      experience: experienceViewFormData,
      project: projectViewFormData,
    };

    const response = update || (dataMap[currentTab]._id)
      ? await updateData(currentTab, dataMap[currentTab])
      : await addData(currentTab, dataMap[currentTab]);
    console.log(response, 'response');

    if (response.success) {
      toast.success((update || dataMap[currentTab]._id) ? 'Updated successfully!' : 'Added successfully!');
      resetFormDatas();
      extractAllDatas();
      
      // Revalidate frontend
      fetch('/api/revalidate', { method: 'POST' });
    } else {
      toast.error(response.message || 'Something went wrong!');
    }
  }

  useEffect(() => {
    extractAllDatas();
  }, [currentSelectedTab]);

  function resetFormDatas() {
    setHomeViewFormData(initialHomeFormData);
    setAboutViewFormData(initialAboutFormData);
    setExperienceViewFormData(initialExperienceFormData);
    setEducationViewFormData(initialEducationFormData);
    setProjectViewFormData(initialProjectFormData);
  }

  console.log(allData, homeViewFormData, 'homeViewFormData');

  useEffect(() => {
    setAuthUser(JSON.parse(sessionStorage.getItem('authUser')));
  }, []);

  async function createUser() {
    const res = await fetch('/api/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginFormData)
    });
    const result = await res.json();
    if (result.success) {
      toast.success('Admin created successfully!');
    } else {
      toast.error(result.message || 'Failed to create admin!');
    }
  }

  async function handleLogin() {
    const res = await login(loginFormData);

    console.log(res, 'login');

    if (res?.success) {
      setAuthUser(true);
      sessionStorage.setItem('authUser', JSON.stringify(true));
      toast.success('Login successful!');
    } else {
      toast.error(res?.message || 'Login failed!');
    }
  }

  if (!authUser)
    return (
      <Login formData={loginFormData} handleLogin={handleLogin} setFormData={setLoginFormData} createUser={createUser} />
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Admin</h1>
            </div>
            <button
              onClick={() => {
                setAuthUser(false);
                sessionStorage.removeItem('authUser');
                toast.success('Logged out successfully!');
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-4" role="tablist">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentSelectedTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setCurrentSelectedTab(item.id);
                  resetFormDatas();
                  setUpdate(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
          {menuItems.map((item) => item.id === currentSelectedTab && (
            <div key={item.id} className="animate-fadeIn">
              {item.component}
            </div>
          ))}
        </div>
      </div>
      
      <Toaster position="top-right" />
      
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

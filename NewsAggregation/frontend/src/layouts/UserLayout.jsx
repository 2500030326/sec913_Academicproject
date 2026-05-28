import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ParticleBackground from '../components/ParticleBackground';
import FloatingChatbot from '../components/FloatingChatbot';

const UserLayout = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
    document.documentElement.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <ParticleBackground />
      <Navbar
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode((prev) => !prev)}
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        isMobile={isMobile}
      />
      <div className="flex pt-24 md:pt-28">
        <Sidebar isOpen={sidebarOpen} isMobile={isMobile} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 px-4 pb-32 md:px-6">
          <Outlet />
        </main>
      </div>
      <FloatingChatbot />
    </div>
  );
};

export default UserLayout;

import { useEffect, useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import AppRouter from './Router';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  // Theme state ('light' or 'dark')
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference on initial load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    // return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return 'light'; // Default to light
  });
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Effect to apply the class to <html> and save preference
  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme); // Save preference
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <AppLayout
      toggleTheme={toggleTheme}
      currentTheme={theme}
      isNavOpen={isNavOpen}
      toggleNav={toggleNav}
    >
      <ScrollToTop />
      <AppRouter />
    </AppLayout>
  );
}

export default App;

import React from 'react';
import Header from './Header';
import Nav from './Nav';
import MainContentArea from './MainContentArea';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  currentTheme: string;
  isNavOpen: boolean;
  toggleNav: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  toggleTheme,
  currentTheme,
  isNavOpen,
  toggleNav,
}) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-primary-bg dark:bg-dark-primary-bg">
      <Header
        toggleTheme={toggleTheme}
        currentTheme={currentTheme}
        toggleNav={toggleNav}
      />{' '}
      <div className="flex flex-grow">
        <Nav isNavOpen={isNavOpen} />
        <MainContentArea>{children}</MainContentArea>
      </div>
      <Footer />
      {isNavOpen && (
        <div
          onClick={toggleNav}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default AppLayout;

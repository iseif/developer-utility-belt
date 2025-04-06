import React from 'react';

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
  toggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleTheme,
  currentTheme,
  toggleNav,
}) => {
  return (
    <header className="bg-primary-bg text-primary-text p-4 border-b-4 border-border-color shadow-solid dark:bg-dark-primary-bg dark:text-dark-primary-text dark:border-dark-border-color dark:shadow-dark-solid flex justify-between items-center relative z-10">
      <div className="flex items-center">
        <button
          onClick={toggleNav}
          className="md:hidden p-2 mr-2 border-2 border-border-color dark:border-dark-border-color text-primary-text dark:text-dark-primary-text hover:bg-accent dark:hover:bg-dark-accent"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold">
          Developer Utility Belt
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg"
        aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
};

export default Header;

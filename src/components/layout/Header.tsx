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
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/iseif/developer-utility-belt"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 sm:h-auto sm:w-auto p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-gray-300 flex items-center justify-center sm:justify-start text-sm sm:text-base"
          aria-label="GitHub repository"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="sm:mr-1.5"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">GitHub</span>
        </a>
        <button
          onClick={toggleTheme}
          className="h-10 w-10 sm:h-auto sm:w-auto p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-gray-300 flex items-center justify-center sm:justify-start text-sm sm:text-base"
          aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
        >
          {currentTheme === 'light' ? '🌙' : '☀️'}
          <span className="hidden sm:inline ml-1.5">
            {currentTheme === 'light' ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';

interface NavProps {
  isNavOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ isNavOpen }) => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Code Formatter', path: '/formatter' },
    { name: 'JSON Tools', path: '/json-tools' },
    { name: 'Diff Checker', path: '/diff' },
    { name: 'Timestamp Converter', path: '/timestamp' },
    { name: 'URL Encoder/Decoder', path: '/url-encode-decode' },
    { name: 'Base64 Encoder/Decoder', path: '/base64-encode-decode' },
    { name: 'HTML Entity Encoder/Decoder', path: '/html-entity-encode-decode' },
    { name: 'JWT Debugger', path: '/jwt-debugger' },
  ];

  return (
    <nav
      className={`fixed inset-y-0 left-0 z-30 w-80 p-4 border-r-4 border-border-color flex-shrink-0 shadow-none bg-primary-bg text-primary-text dark:bg-dark-primary-bg dark:text-dark-primary-text dark:border-dark-border-color transform transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:z-auto md:translate-x-0 md:shadow-none`}
    >
      <h2 className="font-bold text-xl mb-4 border-b-2 border-border-color pb-2 dark:border-dark-border-color">
        Tools
      </h2>
      <ul>
        {navItems.map((item) => (
          <li key={item.name} className="mb-1">
            <a
              href={item.path}
              className="block p-2 border-2 border-transparent text-primary-text dark:text-dark-primary-text hover:border-border-color hover:bg-accent hover:font-bold hover:shadow-solid dark:hover:border-dark-border-color dark:hover:bg-dark-accent dark:hover:text-primary-text dark:hover:shadow-dark-solid"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const featuredTools = [
    {
      name: 'Code Formatter',
      path: '/formatter',
      description: 'Tidy up your JS, JSON, and more.',
    },
    {
      name: 'JSON Tools',
      path: '/json-tools',
      description: 'Validate, view, and format JSON data.',
    },
    {
      name: 'Diff Checker',
      path: '/diff',
      description: 'Compare two text blocks and see the differences.',
    },
  ];

  return (
    <div className="space-y-6">
      {' '}
      <div className="p-6 border-4 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid bg-primary-bg dark:bg-dark-primary-bg">
        <h2 className="text-3xl font-bold mb-3 text-primary-text dark:text-dark-primary-text">
          Welcome to the Developer Utility Belt!
        </h2>
        <p className="text-lg text-primary-text dark:text-dark-primary-text">
          Your one-stop collection of handy, client-side tools designed for
          speed and privacy. No data leaves your browser! Select a tool from the
          navigation menu to get started.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4 dark:text-dark-primary-text">
          Featured Tools:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="block p-4 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-dark-accent hover:text-primary-text dark:hover:text-primary-text transition-colors duration-150 ease-in-out"
            >
              <h4 className="text-xl font-bold mb-1 text-primary-text dark:text-dark-primary-text">
                {tool.name}
              </h4>
              <p className="text-sm text-primary-text dark:text-dark-primary-text">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

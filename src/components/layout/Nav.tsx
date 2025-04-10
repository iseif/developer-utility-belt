import React, { useState } from 'react';
import { getNavCategories } from '../../data/toolsData';

interface NavProps {
  isNavOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ isNavOpen }) => {
  // Get nav categories from the centralized data
  const navCategories = getNavCategories();

  // Initialize expandedCategories state dynamically from navCategories
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >(() => {
    // Create an object with all categories set to expanded by default
    const initialState: Record<string, boolean> = {};
    navCategories.forEach((category) => {
      initialState[category.name] = true;
    });
    return initialState;
  });

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <nav
      className={`fixed inset-y-0 left-0 z-30 w-80 p-4 border-r-4 border-border-color flex-shrink-0 shadow-none bg-primary-bg text-primary-text dark:bg-dark-primary-bg dark:text-dark-primary-text dark:border-dark-border-color transform transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:z-auto md:translate-x-0 md:shadow-none overflow-y-auto`}
    >
      <h2 className="font-bold text-xl mb-4 border-b-2 border-border-color pb-2 dark:border-dark-border-color">
        Tools
      </h2>
      <div className="space-y-2">
        {navCategories.map((category) => (
          <div key={category.name} className="mb-3">
            {category.name !== 'General' ? (
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <span>{category.name}</span>
                <span className="transform transition-transform duration-200">
                  {expandedCategories[category.name] ? '−' : '+'}
                </span>
              </button>
            ) : null}

            {/* Show items if category is expanded or if it's General */}
            {(expandedCategories[category.name] ||
              category.name === 'General') && (
              <ul
                className={`${category.name !== 'General' ? 'ml-2 border-l-2 border-gray-200 dark:border-gray-700 pl-2' : ''}`}
              >
                {category.items.map((item) => (
                  <li key={item.name} className="mb-1">
                    <a
                      href={item.path}
                      className="block p-2 border-2 border-transparent text-primary-text dark:text-dark-primary-text hover:border-border-color hover:bg-accent hover:font-bold hover:shadow-solid dark:hover:border-dark-border-color dark:hover:bg-gray-700 dark:hover:shadow-dark-solid"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;

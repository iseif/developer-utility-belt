import React, { useState } from 'react';
import { getNavCategories, toolsByCategory } from '../../data/toolsData';
import { useFavoritesContext } from '../../hooks/useFavoritesContext';
import FavoriteButton from '../common/FavoriteButton';
import { FaStar } from 'react-icons/fa';

interface NavProps {
  isNavOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ isNavOpen }) => {
  // Get nav categories from the centralized data
  const navCategories = getNavCategories();
  const { favorites, toggleFavorite, isFavorite } = useFavoritesContext();

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

  // Get all tools as a flat array
  const allTools = Object.values(toolsByCategory).flat();

  // Get favorite tools
  const favoriteTools = allTools.filter((tool) =>
    favorites.includes(tool.path)
  );

  // Toggle favorites expansion
  const [areFavoritesExpanded, setAreFavoritesExpanded] =
    useState<boolean>(true);
  const toggleFavorites = () => {
    setAreFavoritesExpanded(!areFavoritesExpanded);
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
                {/* Render Home link first for General category */}
                {category.name === 'General' && (
                  <>
                    <li key="home" className="mb-1">
                      <div className="flex items-center">
                        <a
                          href="/"
                          className="flex-grow block p-2 border-2 border-transparent text-primary-text dark:text-dark-primary-text hover:border-border-color hover:bg-accent hover:font-bold hover:shadow-solid dark:hover:border-dark-border-color dark:hover:bg-gray-700 dark:hover:shadow-dark-solid"
                        >
                          Home
                        </a>
                      </div>
                    </li>

                    {/* Favorites Section under Home */}
                    <li className="mb-1">
                      <button
                        onClick={toggleFavorites}
                        className="w-full flex items-center justify-between text-sm font-medium text-primary-text dark:text-dark-primary-text mb-1 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                      >
                        <span className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" /> Favorites
                        </span>
                        <span className="transform transition-transform duration-200">
                          {areFavoritesExpanded ? '−' : '+'}
                        </span>
                      </button>

                      {areFavoritesExpanded && (
                        <ul className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                          {favoriteTools.length > 0 ? (
                            favoriteTools.map((tool) => (
                              <li key={tool.path} className="mb-1">
                                <div className="flex items-center">
                                  <a
                                    href={tool.path}
                                    className="flex-grow block p-2 border-2 border-transparent text-primary-text dark:text-dark-primary-text hover:border-border-color hover:bg-accent hover:font-bold hover:shadow-solid dark:hover:border-dark-border-color dark:hover:bg-gray-700 dark:hover:shadow-dark-solid"
                                  >
                                    {tool.name}
                                  </a>
                                  <FavoriteButton
                                    isFavorite={true}
                                    onClick={() => toggleFavorite(tool.path)}
                                    className="p-1"
                                  />
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-gray-500 dark:text-gray-400 p-2">
                              No favorites yet. Click the star icon next to a
                              tool to add it to your favorites.
                            </li>
                          )}
                        </ul>
                      )}
                    </li>
                  </>
                )}

                {/* Render other items for non-General categories */}
                {category.name !== 'General' &&
                  category.items.map((item) => (
                    <li key={item.name} className="mb-1">
                      <div className="flex items-center">
                        <a
                          href={item.path}
                          className="flex-grow block p-2 border-2 border-transparent text-primary-text dark:text-dark-primary-text hover:border-border-color hover:bg-accent hover:font-bold hover:shadow-solid dark:hover:border-dark-border-color dark:hover:bg-gray-700 dark:hover:shadow-dark-solid"
                        >
                          {item.name}
                        </a>
                        {item.path !== '/' && (
                          <FavoriteButton
                            isFavorite={isFavorite(item.path)}
                            onClick={() => toggleFavorite(item.path)}
                            className="p-1"
                          />
                        )}
                      </div>
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

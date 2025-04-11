import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaRocket, FaStar } from 'react-icons/fa';
import { toolsByCategory } from '../data/toolsData';
import { useFavoritesContext } from '../hooks/useFavoritesContext';
import FavoriteButton from '../components/common/FavoriteButton';

const HomePage: React.FC = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavoritesContext();

  // Get all tools as a flat array
  const allTools = Object.values(toolsByCategory).flat();

  // Get favorite tools
  const favoriteTools = allTools.filter((tool) =>
    favorites.includes(tool.path)
  );

  return (
    <div className="p-4 space-y-8">
      <header>
        <div className="p-6 border-4 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid bg-primary-bg dark:bg-dark-primary-bg">
          <h1 className="text-3xl font-bold mb-3 text-primary-text dark:text-dark-primary-text">
            Developer Utility Belt
          </h1>
          <p className="text-lg text-primary-text dark:text-dark-primary-text">
            Your one-stop collection of handy, client-side developer tools
            designed for speed and privacy. All processing happens in your
            browser — no data is sent to any server!
          </p>
        </div>
      </header>

      {/* Quick Start Guide */}
      <section className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h2 className="text-xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          <FaRocket className="inline-block align-middle mr-2" /> Getting
          Started
        </h2>
        <div className="text-primary-text dark:text-dark-primary-text space-y-2">
          <p>
            The Developer Utility Belt provides a collection of essential tools
            for web developers, programmers, and IT professionals — all
            accessible from your browser with no installation required.
          </p>
          <p>
            <strong>Privacy First:</strong> All tools run entirely in your
            browser. Your data never leaves your device, making these tools safe
            for sensitive information.
          </p>
          <p>
            <strong>How to Use:</strong> Select a tool from the navigation menu
            or from the categories below to get started.
          </p>
        </div>
      </section>

      {/* Favorites Section */}
      {favoriteTools.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 dark:text-dark-primary-text">
            <FaStar className="inline-block align-middle mr-2 text-yellow-400" />{' '}
            Your Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteTools.map((tool) => (
              <div key={tool.path} className="relative group">
                <Link
                  to={tool.path}
                  className="block p-4 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700 hover:text-primary-text dark:hover:text-dark-primary-text transition-colors duration-150 ease-in-out"
                >
                  <div className="flex items-start">
                    <div className="text-2xl mr-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-primary-text dark:text-dark-primary-text">
                        {tool.name}
                      </h4>
                      <p className="text-sm text-primary-text dark:text-dark-primary-text">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="absolute top-2 right-2">
                  <FavoriteButton
                    isFavorite={true}
                    onClick={() => toggleFavorite(tool.path)}
                    className="p-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools by Category */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 dark:text-dark-primary-text">
          <FaInfoCircle className="inline-block align-middle mr-2" /> Available
          Tools
        </h2>

        {Object.entries(toolsByCategory).map(([category, tools]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 dark:text-dark-primary-text">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <div key={tool.path} className="relative group">
                  <Link
                    to={tool.path}
                    className="block p-4 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700 hover:text-primary-text dark:hover:text-dark-primary-text transition-colors duration-150 ease-in-out"
                  >
                    <div className="flex items-start">
                      <div className="text-2xl mr-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
                        {tool.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1 text-primary-text dark:text-dark-primary-text">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-primary-text dark:text-dark-primary-text">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="absolute top-2 right-2">
                    <FavoriteButton
                      isFavorite={isFavorite(tool.path)}
                      onClick={() => toggleFavorite(tool.path)}
                      className="p-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t-2 border-border-color dark:border-dark-border-color text-center text-sm text-secondary-text dark:text-dark-secondary-text">
        <p>
          Developer Utility Belt — All tools run client-side for your privacy.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;

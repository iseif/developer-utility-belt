import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border-4 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid bg-primary-bg dark:bg-dark-primary-bg space-y-6">
      <h2 className="text-4xl font-bold text-red-600 dark:text-red-400">
        Oops! (404)
      </h2>
      <p className="text-xl text-primary-text dark:text-dark-primary-text">
        We couldn't find the page you were looking for.
      </p>
      <p className="text-md text-gray-600 dark:text-gray-400">
        It might have been removed, renamed, or maybe it never existed!
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg transform hover:scale-105 transition-transform duration-150 ease-in-out"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

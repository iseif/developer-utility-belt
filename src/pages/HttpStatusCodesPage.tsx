import React, { useCallback, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HttpStatusCode, httpStatusCodes } from '../data/httpStatusCodesData';

const HttpStatusCodesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(httpStatusCodes.map((code) => code.category))
    );
    return ['all', ...uniqueCategories];
  }, []);

  // Filter codes based on search query and selected category
  const filteredCodes = useMemo(() => {
    if (!searchQuery.trim() && selectedCategory === 'all') {
      return httpStatusCodes;
    }

    return httpStatusCodes.filter((code) => {
      // Filter by category if not "all"
      if (selectedCategory !== 'all' && code.category !== selectedCategory) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          code.code.toString().includes(query) ||
          code.name.toLowerCase().includes(query) ||
          code.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Group filtered codes by category
  const filteredGroupedCodes = useMemo(() => {
    const groups: Record<string, HttpStatusCode[]> = {};

    filteredCodes.forEach((code) => {
      if (!groups[code.category]) {
        groups[code.category] = [];
      }
      groups[code.category].push(code);
    });

    return groups;
  }, [filteredCodes]);

  // Debounced search handler
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  // Category selection handler
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(e.target.value);
    },
    []
  );

  // Get background color based on category
  const getCategoryColor = (category: string): string => {
    if (category.startsWith('1xx')) return 'bg-blue-100 dark:bg-blue-900';
    if (category.startsWith('2xx')) return 'bg-green-100 dark:bg-green-900';
    if (category.startsWith('3xx')) return 'bg-yellow-100 dark:bg-yellow-900';
    if (category.startsWith('4xx')) return 'bg-orange-100 dark:bg-orange-900';
    if (category.startsWith('5xx')) return 'bg-red-100 dark:bg-red-900';
    return 'bg-gray-100 dark:bg-gray-800';
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          HTTP Status Codes Reference
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of HTTP status codes, their meanings, and
          descriptions. Use the search box to filter by code, name, or
          description.
        </p>
      </header>

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by code, name, or description..."
              className="w-full pl-10 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredCodes.length} of {httpStatusCodes.length} status
          codes
        </div>
      </div>

      {/* Status Codes Display */}
      <div className="space-y-6">
        {Object.keys(filteredGroupedCodes).length === 0 ? (
          <div className="p-4 border-2 border-border-color dark:border-dark-border-color text-center">
            No status codes found matching your criteria.
          </div>
        ) : (
          Object.entries(filteredGroupedCodes).map(([category, codes]) => (
            <div key={category} className="space-y-2">
              <h2
                className={`text-lg font-bold p-2 ${getCategoryColor(category)}`}
              >
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {codes.map((code) => (
                  <div
                    key={code.code}
                    className="p-3 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg shadow-solid dark:shadow-dark-solid"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-lg w-12">
                          {code.code}
                        </span>
                        <span className="font-semibold">{code.name}</span>
                      </div>
                      <div className="md:ml-4 text-gray-700 dark:text-gray-300 flex-1">
                        {code.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* About HTTP Status Codes */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About HTTP Status Codes
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            HTTP status codes are standard response codes given by web servers
            on the Internet. They indicate whether a specific HTTP request has
            been successfully completed.
          </p>
          <p>
            <strong>Status code categories:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>1xx (Informational):</strong> The request was received,
              continuing process
            </li>
            <li>
              <strong>2xx (Success):</strong> The request was successfully
              received, understood, and accepted
            </li>
            <li>
              <strong>3xx (Redirection):</strong> Further action needs to be
              taken to complete the request
            </li>
            <li>
              <strong>4xx (Client Error):</strong> The request contains bad
              syntax or cannot be fulfilled
            </li>
            <li>
              <strong>5xx (Server Error):</strong> The server failed to fulfill
              a valid request
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HttpStatusCodesPage;

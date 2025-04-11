import React, { useCallback, useEffect, useState } from 'react';
import { FaExternalLinkAlt, FaFilter, FaSearch } from 'react-icons/fa';
import { HttpHeader, httpHeadersData } from '../data/httpHeadersData';

const HttpHeadersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredHeaders, setFilteredHeaders] =
    useState<HttpHeader[]>(httpHeadersData);
  const [selectedType, setSelectedType] = useState<string>('All');

  // Debounce search to improve performance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T => {
    let timeoutId: NodeJS.Timeout;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    }) as T;
  };

  // Filter headers based on search term and selected type
  const filterHeaders = useCallback((term: string, type: string) => {
    let filtered = [...httpHeadersData];

    // Filter by type if not "All"
    if (type !== 'All') {
      filtered = filtered.filter((header) => header.type === type);
    }

    // Filter by search term
    if (term.trim()) {
      const lowerCaseTerm = term.toLowerCase();
      filtered = filtered.filter(
        (header) =>
          header.name.toLowerCase().includes(lowerCaseTerm) ||
          header.description.toLowerCase().includes(lowerCaseTerm)
      );
    }

    setFilteredHeaders(filtered);
  }, []);

  // Create debounced version of filterHeaders
  const debouncedFilterHeaders = useCallback(
    debounce((term: string, type: string) => filterHeaders(term, type), 300),
    [filterHeaders]
  );

  // Update filtered headers when search term or selected type changes
  useEffect(() => {
    debouncedFilterHeaders(searchTerm, selectedType);
  }, [searchTerm, selectedType, debouncedFilterHeaders]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          HTTP Headers Reference
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A searchable reference for common HTTP request and response headers
          with descriptions and links to documentation.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            HTTP Headers
          </h3>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by header name or description..."
                className="w-full p-2 pl-10 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
              />
            </div>

            <div className="relative min-w-[200px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaFilter className="text-gray-500 dark:text-gray-400" />
              </div>
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full p-2 pl-10 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid appearance-none"
              >
                <option value="All">All Types</option>
                <option value="Request">Request Headers</option>
                <option value="Response">Response Headers</option>
                <option value="General">General Headers</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredHeaders.length} of {httpHeadersData.length} headers
          </div>

          {/* Headers Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-border-color dark:border-dark-border-color">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Header Name
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Type
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Description
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-center dark:text-dark-primary-text">
                    Docs
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHeaders.map((header, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 font-mono font-semibold dark:text-dark-primary-text">
                      {header.name}
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 dark:text-dark-primary-text">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          header.type === 'Request'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : header.type === 'Response'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {header.type}
                      </span>
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 dark:text-dark-primary-text">
                      {header.description}
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 text-center dark:text-dark-primary-text">
                      {header.link && (
                        <a
                          href={header.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View MDN documentation"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredHeaders.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="border-2 border-border-color dark:border-dark-border-color p-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No headers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* About HTTP Headers Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About HTTP Headers
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>HTTP Headers</strong> allow the client and server to pass
            additional information with an HTTP request or response. They define
            the operating parameters of an HTTP transaction.
          </p>
          <p>
            <strong>Header types:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>General Headers:</strong> Apply to both request and
              response messages.
            </li>
            <li>
              <strong>Request Headers:</strong> Contain information about the
              resource to be fetched or about the client requesting the
              resource.
            </li>
            <li>
              <strong>Response Headers:</strong> Hold additional information
              about the response, like its location or about the server
              providing it.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Common uses:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Content negotiation (Accept, Content-Type)</li>
            <li>Authentication (Authorization, WWW-Authenticate)</li>
            <li>Caching directives (Cache-Control, ETag)</li>
            <li>Cross-Origin Resource Sharing (CORS)</li>
            <li>Security policies (Content-Security-Policy)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HttpHeadersPage;

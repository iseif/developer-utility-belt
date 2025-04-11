import React, { useCallback, useEffect, useState } from 'react';
import {
  MimeTypeEntry,
  mimeTypesData,
  searchMimeTypes,
} from '../data/mimeTypesData';
import { FaCode, FaFileAlt, FaSearch } from 'react-icons/fa';

const MimeLookupPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MimeTypeEntry[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: string }>({});

  // Debounced search function
  const debouncedSearch = useCallback((query: string) => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      const results = searchMimeTypes(query);
      setSearchResults(results);
      setIsSearching(false);
    }, 300); // 300ms debounce time

    return () => clearTimeout(timer);
  }, []);

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, debouncedSearch]);

  // Handle copying to clipboard
  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [id]: 'Copied!' });
      setTimeout(() => {
        setCopyStatus((prevStatus) => ({
          ...prevStatus,
          [id]: id.startsWith('ext') ? 'Copy Ext' : 'Copy MIME',
        }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus({ ...copyStatus, [id]: 'Failed to copy' });
      setTimeout(() => {
        setCopyStatus((prevStatus) => ({
          ...prevStatus,
          [id]: id.startsWith('ext') ? 'Copy Ext' : 'Copy MIME',
        }));
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          MIME Type Lookup
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Quickly find MIME types for file extensions or search for file
          extensions by MIME type.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            MIME Type Lookup Tool
          </h3>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by extension (e.g., .js) or MIME type (e.g., application/json)"
              className="w-full p-2 pl-10 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            />
          </div>

          {/* Search Results */}
          <div className="mt-4">
            {isSearching ? (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-400">Searching...</p>
              </div>
            ) : searchQuery && searchResults.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-400">
                  No results found for "{searchQuery}"
                </p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="p-2 text-left border-2 border-border-color dark:border-dark-border-color">
                        <div className="flex items-center">
                          <FaFileAlt className="mr-2" />
                          Extension
                        </div>
                      </th>
                      <th className="p-2 text-left border-2 border-border-color dark:border-dark-border-color">
                        <div className="flex items-center">
                          <FaCode className="mr-2" />
                          MIME Type
                        </div>
                      </th>
                      <th className="p-2 text-left border-2 border-border-color dark:border-dark-border-color">
                        Description
                      </th>
                      <th className="p-2 text-center border-2 border-border-color dark:border-dark-border-color">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((result, index) => (
                      <tr
                        key={`${result.extension}-${index}`}
                        className={
                          index % 2 === 0
                            ? 'bg-white dark:bg-gray-800'
                            : 'bg-gray-50 dark:bg-gray-700'
                        }
                      >
                        <td className="p-2 border-2 border-border-color dark:border-dark-border-color font-mono">
                          {result.extension}
                        </td>
                        <td className="p-2 border-2 border-border-color dark:border-dark-border-color font-mono">
                          {result.mimeType}
                        </td>
                        <td className="p-2 border-2 border-border-color dark:border-dark-border-color">
                          {result.description || '-'}
                        </td>
                        <td className="p-2 border-2 border-border-color dark:border-dark-border-color text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() =>
                                handleCopy(result.extension, `ext-${index}`)
                              }
                              className="px-2 py-1 text-xs border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                              {copyStatus[`ext-${index}`] || 'Copy Ext'}
                            </button>
                            <button
                              onClick={() =>
                                handleCopy(result.mimeType, `mime-${index}`)
                              }
                              className="px-2 py-1 text-xs border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                              {copyStatus[`mime-${index}`] || 'Copy MIME'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Enter a file extension (e.g., .html) or MIME type (e.g.,
                  text/html) to search
                </p>
              </div>
            )}
          </div>
        </section>

        {/* About MIME Types Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About MIME Types
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>
                MIME (Multipurpose Internet Mail Extensions) types
              </strong>{' '}
              are a standard way of classifying file types on the Internet. Web
              servers and browsers use MIME types to determine how to process a
              URL, rather than using the file extension.
            </p>
            <p>
              <strong>Common uses of MIME types:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>HTTP Content-Type headers in web servers</li>
              <li>Email attachments</li>
              <li>API responses</li>
              <li>Browser content handling</li>
              <li>File upload validation</li>
            </ul>
            <p className="mt-2">
              <strong>MIME type format:</strong> MIME types follow the format{' '}
              <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
                type/subtype
              </code>
              , where the type represents the general category (like text,
              image, audio) and the subtype specifies the exact format (like
              html, jpeg, mpeg).
            </p>
            <p className="mt-2">
              This tool contains {mimeTypesData.length} MIME type entries
              covering the most common file formats used on the web and in
              software development. Data is sourced from the comprehensive
              mime-db package.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MimeLookupPage;

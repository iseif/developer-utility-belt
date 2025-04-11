import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaSearch } from 'react-icons/fa';
import { htmlEntitiesData, HtmlEntity } from '../data/htmlEntitiesData';

const HtmlEntitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredEntities, setFilteredEntities] =
    useState<HtmlEntity[]>(htmlEntitiesData);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

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

  // Filter entities based on search term
  const filterEntities = useCallback((term: string) => {
    if (!term.trim()) {
      setFilteredEntities(htmlEntitiesData);
      return;
    }

    const lowerCaseTerm = term.toLowerCase();
    const filtered = htmlEntitiesData.filter(
      (entity) =>
        entity.character.toLowerCase().includes(lowerCaseTerm) ||
        entity.namedCode.toLowerCase().includes(lowerCaseTerm) ||
        entity.numberedCode.toLowerCase().includes(lowerCaseTerm) ||
        entity.description.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredEntities(filtered);
  }, []);

  // Create debounced version of filterEntities
  const debouncedFilterEntities = useCallback(
    debounce((term: string) => filterEntities(term), 300),
    [filterEntities]
  );

  // Update filtered entities when search term changes
  useEffect(() => {
    debouncedFilterEntities(searchTerm);
  }, [searchTerm, debouncedFilterEntities]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle copy button click
  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [id]: '✓' });
      setTimeout(() => {
        setCopyStatus((prevStatus) => {
          const newStatus = { ...prevStatus };
          delete newStatus[id];
          return newStatus;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus({ ...copyStatus, [id]: 'Failed!' });
      setTimeout(() => {
        setCopyStatus((prevStatus) => {
          const newStatus = { ...prevStatus };
          delete newStatus[id];
          return newStatus;
        });
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          HTML Entities Reference
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A searchable reference for common HTML character entities, including
          named and numbered codes.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            HTML Entities
          </h3>

          {/* Search Input */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by character, code, or description..."
              className="w-full p-2 pl-10 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            />
          </div>

          {/* Results Count */}
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredEntities.length} of {htmlEntitiesData.length}{' '}
            entities
          </div>

          {/* Entities Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-border-color dark:border-dark-border-color">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Char
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Named Code
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Numbered Code
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEntities.map((entity, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 text-center dark:text-dark-primary-text text-xl">
                      {entity.character}
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 font-mono dark:text-dark-primary-text">
                      <div className="flex items-center justify-between">
                        <span>{entity.namedCode}</span>
                        <button
                          onClick={() =>
                            handleCopy(entity.namedCode, `named-${index}`)
                          }
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          title="Copy named code"
                        >
                          {copyStatus[`named-${index}`] || <FaCopy size={14} />}
                        </button>
                      </div>
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 font-mono dark:text-dark-primary-text">
                      <div className="flex items-center justify-between">
                        <span>{entity.numberedCode}</span>
                        <button
                          onClick={() =>
                            handleCopy(entity.numberedCode, `numbered-${index}`)
                          }
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          title="Copy numbered code"
                        >
                          {copyStatus[`numbered-${index}`] || (
                            <FaCopy size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 dark:text-dark-primary-text">
                      {entity.description}
                    </td>
                  </tr>
                ))}
                {filteredEntities.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="border-2 border-border-color dark:border-dark-border-color p-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No entities found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* About HTML Entities Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About HTML Entities
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>HTML Entities</strong> are special codes used to represent
            reserved characters, symbols, and other characters that might be
            difficult to type or display in HTML.
          </p>
          <p>
            <strong>Why use HTML entities?</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              To display reserved characters that would otherwise be interpreted
              as HTML code (like &lt; and &gt;)
            </li>
            <li>To represent characters not available on your keyboard</li>
            <li>
              To ensure consistent rendering across different browsers and
              platforms
            </li>
            <li>
              To include special symbols and characters in your web content
            </li>
          </ul>
          <p className="mt-2">
            <strong>Entity formats:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Named entities</strong>: Begin with & and end with ;
              (e.g., &amp;copy;)
            </li>
            <li>
              <strong>Numbered entities</strong>: Begin with &# and end with ;
              (e.g., &amp;#169;)
            </li>
            <li>
              Numbered entities can also be expressed in hexadecimal format with
              &amp;#x prefix (e.g., &amp;#xA9;)
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HtmlEntitiesPage;

import React, { useState } from 'react';
import { FaCopy, FaRedo } from 'react-icons/fa';

const UuidGeneratorPage: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [copyStatus, setCopyStatus] = useState<{ [key: number]: string }>({});

  // Check if crypto.randomUUID is available
  const isRandomUUIDSupported =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto;

  // Generate UUID using Web Crypto API or fallback
  const generateUUID = (): string => {
    if (isRandomUUIDSupported) {
      return crypto.randomUUID();
    } else {
      // Fallback implementation for browsers that don't support crypto.randomUUID()
      // This is a simplified version of UUID v4 generation
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  };

  // Generate the specified number of UUIDs
  const handleGenerateUUIDs = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
    // Reset copy statuses
    setCopyStatus({});
  };

  // Copy UUID to clipboard
  const handleCopyUUID = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid).then(
      () => {
        // Update copy status for this specific UUID
        setCopyStatus((prev) => ({ ...prev, [index]: 'Copied!' }));
        // Reset after 2 seconds
        setTimeout(() => {
          setCopyStatus((prev) => ({ ...prev, [index]: 'Copy' }));
        }, 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
        setCopyStatus((prev) => ({ ...prev, [index]: 'Failed to copy' }));
      }
    );
  };

  // Copy all UUIDs to clipboard
  const handleCopyAllUUIDs = () => {
    if (uuids.length === 0) return;

    const textToCopy = uuids.join('\n');
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        // Update all copy statuses
        const newCopyStatus: { [key: number]: string } = {};
        uuids.forEach((_, index) => {
          newCopyStatus[index] = 'Copied!';
        });
        setCopyStatus(newCopyStatus);

        // Reset after 2 seconds
        setTimeout(() => {
          const resetCopyStatus: { [key: number]: string } = {};
          uuids.forEach((_, index) => {
            resetCopyStatus[index] = 'Copy';
          });
          setCopyStatus(resetCopyStatus);
        }, 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          UUID Generator
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Generate Version 4 (random) UUIDs for use in applications and
          databases. Uses the Web Crypto API for secure generation.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            UUID Generator
          </h3>

          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="uuid-count"
                className="font-semibold dark:text-dark-primary-text"
              >
                Number of UUIDs:
              </label>
              <input
                id="uuid-count"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) =>
                  setCount(
                    Math.min(100, Math.max(1, parseInt(e.target.value) || 1))
                  )
                }
                className="w-20 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
              />
            </div>

            <button
              onClick={handleGenerateUUIDs}
              className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
            >
              <span className="flex items-center">
                <FaRedo className="mr-2" /> Generate
              </span>
            </button>

            {uuids.length > 1 && (
              <button
                onClick={handleCopyAllUUIDs}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                <span className="flex items-center">
                  <FaCopy className="mr-2" /> Copy All
                </span>
              </button>
            )}
          </div>

          {!isRandomUUIDSupported && (
            <div className="mb-4 p-3 bg-yellow-100 border-2 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-400">
              <span className="font-bold">Warning:</span> Your browser doesn't
              support the modern Web Crypto API for UUID generation. Using a
              fallback method that may be less secure.
            </div>
          )}

          {uuids.length > 0 ? (
            <div className="space-y-3">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner"
                >
                  <div className="font-mono text-sm break-all mb-2 sm:mb-0 text-primary-text dark:text-dark-primary-text">
                    {uuid}
                  </div>
                  <button
                    onClick={() => handleCopyUUID(uuid, index)}
                    className="flex items-center px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 ml-auto sm:ml-0"
                  >
                    <FaCopy className="mr-1" /> {copyStatus[index] || 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-center text-gray-500 dark:text-gray-400 shadow-inner">
              Click "Generate UUID" to create new UUIDs
            </div>
          )}
        </section>

        <section className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About UUIDs
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>UUID (Universally Unique Identifier)</strong> is a 128-bit
              identifier that is guaranteed to be unique across space and time.
              This tool generates Version 4 UUIDs, which are randomly generated.
            </p>
            <p>
              <strong>UUID format:</strong>{' '}
              <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">
                xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
              </code>
            </p>
            <p>Where:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">
                  x
                </code>{' '}
                is any hexadecimal digit
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">
                  4
                </code>{' '}
                indicates version 4
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">
                  y
                </code>{' '}
                is one of 8, 9, A, or B
              </li>
            </ul>
            <p className="mt-2">
              <strong>Common uses of UUIDs:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Database primary keys</li>
              <li>Distributed system identifiers</li>
              <li>Session IDs in web applications</li>
              <li>Unique file names</li>
              <li>Transaction IDs</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UuidGeneratorPage;

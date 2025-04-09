import React, { useCallback, useState } from 'react';

const LineToolsPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(true);
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy');

  const handleSortAscending = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    const lines = input.split('\n');
    const sortedLines = [...lines].sort((a, b) => {
      if (!caseSensitive) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }
      return a.localeCompare(b);
    });

    setOutput(sortedLines.join('\n'));
  }, [input, caseSensitive]);

  const handleSortDescending = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    const lines = input.split('\n');
    const sortedLines = [...lines].sort((a, b) => {
      if (!caseSensitive) {
        return b.toLowerCase().localeCompare(a.toLowerCase());
      }
      return b.localeCompare(a);
    });

    setOutput(sortedLines.join('\n'));
  }, [input, caseSensitive]);

  const handleDeduplicate = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    const lines = input.split('\n');

    // Use Set to deduplicate lines
    // If case-insensitive, we need to track which lines we've seen
    if (!caseSensitive) {
      const seen = new Set<string>();
      const uniqueLines = lines.filter((line) => {
        const lowerLine = line.toLowerCase();
        if (seen.has(lowerLine)) {
          return false;
        }
        seen.add(lowerLine);
        return true;
      });
      setOutput(uniqueLines.join('\n'));
    } else {
      // Simple case-sensitive deduplication
      const uniqueLines = [...new Set(lines)];
      setOutput(uniqueLines.join('\n'));
    }
  }, [input, caseSensitive]);

  const handleSortAndDeduplicate = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    const lines = input.split('\n');

    // First deduplicate
    let uniqueLines: string[];
    if (!caseSensitive) {
      const seen = new Set<string>();
      uniqueLines = lines.filter((line) => {
        const lowerLine = line.toLowerCase();
        if (seen.has(lowerLine)) {
          return false;
        }
        seen.add(lowerLine);
        return true;
      });
    } else {
      uniqueLines = [...new Set(lines)];
    }

    // Then sort
    uniqueLines.sort((a, b) => {
      if (!caseSensitive) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }
      return a.localeCompare(b);
    });

    setOutput(uniqueLines.join('\n'));
  }, [input, caseSensitive]);

  const handleCopy = useCallback(() => {
    if (!output) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
      return;
    }

    navigator.clipboard
      .writeText(output)
      .then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
      })
      .catch(() => {
        setCopyButtonText('Failed to Copy');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
      });
  }, [output]);

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Line Sorter and Deduplicator
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Sort lines alphabetically (ascending/descending) and remove duplicate
          lines from your text.
        </p>
      </header>

      <div className="space-y-6">
        {/* Controls Section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Line Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSortAscending}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              Sort Ascending (A-Z)
            </button>
            <button
              onClick={handleSortDescending}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              Sort Descending (Z-A)
            </button>
            <button
              onClick={handleDeduplicate}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              Deduplicate
            </button>
            <button
              onClick={handleSortAndDeduplicate}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              Sort & Deduplicate
            </button>
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="case-sensitive"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            <label
              htmlFor="case-sensitive"
              className="text-sm dark:text-dark-primary-text"
            >
              Case Sensitive
            </label>
          </div>
        </section>

        {/* Input/Output Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-1 min-h-[36px]">
              <label
                htmlFor="input-text"
                className="font-semibold dark:text-dark-primary-text"
              >
                Input:
              </label>
              <span></span>
            </div>
            <textarea
              id="input-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with multiple lines..."
              className="w-full h-64 p-2 font-mono text-sm border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              spellCheck="false"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex justify-between items-center mb-1 min-h-[36px]">
              <label
                htmlFor="output-text"
                className="font-semibold dark:text-dark-primary-text"
              >
                Output:
              </label>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copyButtonText}
              </button>
            </div>
            <textarea
              id="output-text"
              value={output}
              readOnly
              placeholder="Processed text will appear here..."
              className="w-full h-64 p-2 font-mono text-sm border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Information Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About Line Tools
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Available operations:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Sort Ascending (A-Z):</strong> Arranges lines
                alphabetically from A to Z
              </li>
              <li>
                <strong>Sort Descending (Z-A):</strong> Arranges lines
                alphabetically from Z to A
              </li>
              <li>
                <strong>Deduplicate:</strong> Removes duplicate lines while
                preserving the original order
              </li>
              <li>
                <strong>Sort & Deduplicate:</strong> Removes duplicates and
                sorts the remaining lines alphabetically
              </li>
            </ul>
            <p className="mt-2">
              <strong>Case Sensitivity:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                When <strong>Case Sensitive</strong> is checked, "Apple" and
                "apple" are treated as different lines
              </li>
              <li>
                When unchecked, "Apple" and "apple" are treated as the same line
                for sorting and deduplication
              </li>
            </ul>
            <p className="mt-2">
              <strong>Common uses:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Cleaning up lists of data</li>
              <li>Organizing imports in code files</li>
              <li>Removing duplicate entries from logs or data exports</li>
              <li>Alphabetizing references or bibliographies</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LineToolsPage;

import React, { useEffect, useState } from 'react';
import { type Change, diffChars } from 'diff';

const DiffCheckerPage: React.FC = () => {
  const [inputA, setInputA] = useState<string>('');
  const [inputB, setInputB] = useState<string>('');
  const [diffResult, setDiffResult] = useState<Change[]>([]);

  // Calculate diff whenever inputA or inputB changes
  useEffect(() => {
    const differences = diffChars(inputA, inputB);
    setDiffResult(differences);
  }, [inputA, inputB]);

  // Helper function to get background class based on change type
  const getStyle = (part: Change) => {
    const baseStyle = 'px-1 py-0.5 rounded-sm';
    if (part.added) {
      return `${baseStyle} bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100 border border-green-400 dark:border-green-600`;
    }
    if (part.removed) {
      return `${baseStyle} bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-100 border border-red-400 dark:border-red-600 line-through`;
    }

    return `text-primary-text dark:text-dark-primary-text`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-dark-primary-text">
        Diff Checker
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Input A */}
        <div>
          <label
            htmlFor="input-a"
            className="block mb-1 font-semibold dark:text-dark-primary-text"
          >
            Original Text:
          </label>
          <textarea
            id="input-a"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            placeholder="Paste original text here..."
            className="w-full h-64 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
            spellCheck="false"
          />
        </div>

        {/* Input B */}
        <div>
          <label
            htmlFor="input-b"
            className="block mb-1 font-semibold dark:text-dark-primary-text"
          >
            New Text:
          </label>
          <textarea
            id="input-b"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            placeholder="Paste new text here..."
            className="w-full h-64 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
            spellCheck="false"
          />
        </div>
      </div>

      {/* Diff Output Area */}
      <div>
        <label className="block mb-1 font-semibold dark:text-dark-primary-text">
          Differences:
        </label>
        <div
          className="p-4 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner overflow-auto"
          style={{ maxHeight: '60vh' }}
        >
          <pre className="text-sm font-mono whitespace-pre-wrap break-words">
            {diffResult.length === 0 && !inputA && !inputB ? (
              <span className="text-gray-500 dark:text-gray-400">
                Enter text in both fields to see differences.
              </span>
            ) : diffResult.length === 1 &&
              !diffResult[0].added &&
              !diffResult[0].removed ? (
              <span className="text-gray-500 dark:text-gray-400">
                No differences found.
              </span>
            ) : (
              diffResult.map((part, index) => (
                <span key={index} className={getStyle(part)}>
                  {part.value}
                </span>
              ))
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DiffCheckerPage;

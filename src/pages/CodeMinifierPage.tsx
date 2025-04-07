import React, { useState, useCallback } from 'react';
import { minify as terserMinify } from 'terser';
import { minify as cssoMinify } from 'csso';

type Language = 'javascript' | 'css';

const CodeMinifierPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null);

  const handleMinify = useCallback(async () => {
    if (!input.trim()) {
      setError('Please enter some code to minify');
      setOutput('');
      setStats(null);
      return;
    }

    try {
      setError('');
      let minified: string;

      if (language === 'javascript') {
        const result = await terserMinify(input, {
          mangle: true,
          compress: true,
        });
        minified = result.code || '';
      } else {
        const result = cssoMinify(input);
        minified = result.css;
      }

      setOutput(minified);
      
      // Calculate size statistics
      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([minified]).size;
      setStats({
        original: originalSize,
        minified: minifiedSize,
      });
    } catch (err) {
      setError(`Failed to minify ${language.toUpperCase()} code: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
      setStats(null);
    }
  }, [input, language]);

  const handleCopy = useCallback(() => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  }, [output]);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Code Minifier
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Minify JavaScript and CSS code to reduce file size. All processing happens in your browser.
        </p>
      </header>

      <div className="space-y-6">
        {/* Controls Section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Code Minifier
          </h3>
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="language-select"
                className="font-semibold dark:text-dark-primary-text"
              >
                Language:
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
              >
                <option value="javascript">JavaScript</option>
                <option value="css">CSS</option>
              </select>
            </div>

            <button
              onClick={handleMinify}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg"
            >
              Minify
            </button>
          </div>
        </section>

        {/* Input/Output Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <div className="flex justify-between items-center mb-1 min-h-[36px]">
              <label
                htmlFor="input-code"
                className="font-semibold dark:text-dark-primary-text"
              >
                Input:
              </label>
              <span></span>
            </div>
            <textarea
              id="input-code"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter your ${language} code here...`}
              className="w-full h-96 p-2 font-mono text-sm border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              spellCheck="false"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex justify-between items-center mb-1 min-h-[36px]">
              <label
                htmlFor="output-code"
                className="font-semibold dark:text-dark-primary-text"
              >
                Output:
              </label>
              {output && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Copy
                </button>
              )}
            </div>
            {error ? (
              <div className="p-4 border-2 border-red-500 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-100">
                {error}
              </div>
            ) : (
              <>
                <textarea
                  id="output-code"
                  value={output}
                  readOnly
                  placeholder="Minified code will appear here..."
                  className="w-full h-96 p-2 font-mono text-sm border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
                />
                {stats && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-2">
                    <p>Original size: {formatSize(stats.original)}</p>
                    <p>Minified size: {formatSize(stats.minified)}</p>
                    <p>
                      Reduction:{' '}
                      {((1 - stats.minified / stats.original) * 100).toFixed(1)}%
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Information Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About Code Minification
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>What is minification?</strong>
            </p>
            <p>
              Minification is the process of reducing code size by:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Removing unnecessary characters (whitespace, newlines, comments)</li>
              <li>Using shorter variable names</li>
              <li>Combining multiple files into one</li>
              <li>Optimizing and shortening code when possible</li>
            </ul>
            <p className="mt-2">
              <strong>Benefits:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Faster website loading times</li>
              <li>Reduced bandwidth usage</li>
              <li>Lower hosting costs</li>
              <li>Better user experience</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CodeMinifierPage;

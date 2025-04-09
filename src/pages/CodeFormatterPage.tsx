import React, { useState } from 'react';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';

const CodeFormatterPage: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('json');
  const [error, setError] = useState<string>('');
  const [isFormatting, setIsFormatting] = useState<boolean>(false);
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy Output');

  const handleFormat = async () => {
    setError('');
    setOutputCode('');
    setIsFormatting(true);
    setCopyButtonText('Copy Output');

    const fixedIndentation = 2; // Use fixed indentation

    try {
      let formattedCode = '';
      if (language === 'javascript') {
        formattedCode = await prettier.format(inputCode, {
          parser: 'babel',
          plugins: [parserBabel, parserEstree],
          semi: true,
          singleQuote: true,
          tabWidth: fixedIndentation,
          trailingComma: 'es5',
        });
      } else if (language === 'json') {
        const parsedJson = JSON.parse(inputCode);
        formattedCode = JSON.stringify(parsedJson, null, fixedIndentation);
      } else {
        throw new Error(
          `Formatting for language "${language}" is not supported yet.`
        );
      }
      setOutputCode(formattedCode);
    } catch (err) {
      console.error('Formatting error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown formatting error occurred.'
      );
      setOutputCode('');
    } finally {
      setIsFormatting(false);
    }
  };

  const handleCopy = async () => {
    if (!outputCode) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy Output'), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(outputCode);
      setCopyButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => setCopyButtonText('Copy Output'), 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Code Formatter
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Format and beautify your code with proper indentation and consistent
          style. Currently supports JSON and JavaScript formatting.
        </p>
      </header>
      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Code Formatter
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
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isFormatting}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid disabled:opacity-50"
              >
                <option value="json">JSON</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>

            <button
              onClick={handleFormat}
              disabled={isFormatting}
              className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text  font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFormatting ? 'Formatting...' : 'Format Code'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-100 dark:border-red-400">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* Input/Output Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1 min-h-[36px]">
                {' '}
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
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full h-96 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
                disabled={isFormatting}
              />
            </div>

            {/* Output Area */}
            <div>
              <div className="flex justify-between items-center mb-1 min-h-[36px]">
                {' '}
                <label
                  htmlFor="output-code"
                  className="font-semibold dark:text-dark-primary-text"
                >
                  Output:
                </label>
                <button
                  onClick={handleCopy}
                  disabled={!outputCode && copyButtonText !== 'Nothing to Copy'}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copyButtonText}
                </button>
              </div>
              <textarea
                id="output-code"
                value={outputCode}
                readOnly
                placeholder="Formatted code will appear here..."
                className="w-full h-96 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>
          </div>
        </section>
      </div>

      {/* About Code Formatting Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Code Formatting
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Code Formatting</strong> is the process of structuring and
            styling source code to improve readability and maintainability while
            preserving its functionality.
          </p>
          <p>
            <strong>Benefits of code formatting:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Improved code readability</li>
            <li>Easier maintenance and debugging</li>
            <li>Consistent style across projects</li>
            <li>Reduced cognitive load when reading code</li>
            <li>Easier collaboration in team environments</li>
          </ul>
          <p className="mt-2">
            <strong>Supported languages:</strong>
          </p>
          <ul className="list-none space-y-1">
            <li>
              <span className="font-semibold">JSON</span> - Formats JSON data
              with proper indentation and structure
            </li>
            <li>
              <span className="font-semibold">JavaScript</span> - Uses Prettier
              to format JavaScript code with consistent style
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CodeFormatterPage;

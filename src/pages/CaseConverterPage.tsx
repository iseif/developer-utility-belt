import React, { useCallback, useState } from 'react';
import {
  camelCase,
  kebabCase,
  snakeCase,
  startCase,
  upperFirst,
} from 'lodash-es';

type CaseType =
  | 'uppercase'
  | 'lowercase'
  | 'titlecase'
  | 'camelcase'
  | 'pascalcase'
  | 'snakecase'
  | 'kebabcase';

const CaseConverterPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy');

  const convertCase = useCallback((text: string, type: CaseType): string => {
    if (!text.trim()) return '';

    // Split the text by newlines to process each line separately
    const lines = text.split('\n');

    // Process each line individually
    const processedLines = lines.map((line) => {
      if (!line.trim()) return line; // Preserve empty lines

      switch (type) {
        case 'uppercase':
          return line.toUpperCase();
        case 'lowercase':
          return line.toLowerCase();
        case 'titlecase':
          // Title case: capitalize first letter of each word
          return startCase(line);
        case 'camelcase':
          return camelCase(line);
        case 'pascalcase':
          // PascalCase: like camelCase but first letter is also capitalized
          return upperFirst(camelCase(line));
        case 'snakecase':
          return snakeCase(line);
        case 'kebabcase':
          return kebabCase(line);
        default:
          return line;
      }
    });

    // Join the processed lines back together with newlines
    return processedLines.join('\n');
  }, []);

  const handleConvert = useCallback(
    (type: CaseType) => {
      const converted = convertCase(input, type);
      setOutput(converted);
    },
    [input, convertCase]
  );

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
          Text Case Converter
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Convert text between various case formats: UPPERCASE, lowercase, Title
          Case, camelCase, PascalCase, snake_case, kebab-case.
        </p>
      </header>

      <div className="space-y-6">
        {/* Conversion Buttons */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Case Converter
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleConvert('uppercase')}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => handleConvert('lowercase')}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              lowercase
            </button>
            <button
              onClick={() => handleConvert('titlecase')}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              Title Case
            </button>
            <button
              onClick={() => handleConvert('camelcase')}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              camelCase
            </button>
            <button
              onClick={() => handleConvert('pascalcase')}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              PascalCase
            </button>
            <button
              onClick={() => handleConvert('snakecase')}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              snake_case
            </button>
            <button
              onClick={() => handleConvert('kebabcase')}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              kebab-case
            </button>
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
              placeholder="Enter text to convert..."
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
              placeholder="Converted text will appear here..."
              className="w-full h-64 p-2 font-mono text-sm border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Information Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About Text Case Formats
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Common text case formats:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>UPPERCASE:</strong> ALL CHARACTERS ARE CAPITAL LETTERS
              </li>
              <li>
                <strong>lowercase:</strong> all characters are small letters
              </li>
              <li>
                <strong>Title Case:</strong> First Letter Of Each Word Is
                Capitalized
              </li>
              <li>
                <strong>camelCase:</strong> firstWordLowercase,
                subsequentWordsCapitalized, noSpaces
              </li>
              <li>
                <strong>PascalCase:</strong> LikeCamelCase,
                ButFirstWordIsAlsoCapitalized
              </li>
              <li>
                <strong>snake_case:</strong>{' '}
                all_lowercase_with_underscores_between_words
              </li>
              <li>
                <strong>kebab-case:</strong>{' '}
                all-lowercase-with-hyphens-between-words
              </li>
            </ul>
            <p className="mt-2">
              <strong>Common uses:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Variable naming in different programming languages</li>
              <li>File naming conventions</li>
              <li>CSS class naming</li>
              <li>Database field naming</li>
              <li>URL formatting</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseConverterPage;

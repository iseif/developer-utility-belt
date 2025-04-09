import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

const JsonToolsPage: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>('');
  const [parsedJson, setParsedJson] = useState<object | null>(null);
  const [formattedJson, setFormattedJson] = useState<string>('');
  const [validationStatus, setValidationStatus] = useState<{
    valid: boolean | null;
    message: string;
  }>({ valid: null, message: '' });
  const [currentView, setCurrentView] = useState<'text' | 'tree'>('text');
  const [copyButtonText, setCopyButtonText] = useState<string>(
    'Copy Formatted JSON'
  );

  // Validate and format JSON whenever input changes
  useEffect(() => {
    if (inputJson.trim() === '') {
      setValidationStatus({ valid: null, message: '' });
      setParsedJson(null);
      setFormattedJson('');
      setCopyButtonText('Copy Formatted JSON');
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      setParsedJson(parsed); // Store the parsed object for the tree view
      setFormattedJson(JSON.stringify(parsed, null, 2)); // Format with 2 spaces
      setValidationStatus({ valid: true, message: 'Valid JSON' });
      setCopyButtonText('Copy Formatted JSON');
    } catch (error) {
      setParsedJson(null);
      setFormattedJson('');
      setValidationStatus({
        valid: false,
        message:
          error instanceof Error ? error.message : 'Invalid JSON structure',
      });
    }
  }, [inputJson]); // Re-run effect when inputJson changes

  const handleCopy = async () => {
    if (!formattedJson || validationStatus.valid !== true) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy Formatted JSON'), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopyButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => setCopyButtonText('Copy Formatted JSON'), 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          JSON Tools
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Validate, format, and visualize JSON data. This tool allows you to
          check JSON syntax, format with proper indentation, and view in tree or
          text mode.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            JSON Validator / Formatter
          </h3>
          {/* Input Area */}
          <div>
            <label
              htmlFor="input-json"
              className="block mb-1 font-semibold dark:text-dark-primary-text"
            >
              Input JSON:
            </label>
            <textarea
              id="input-json"
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste your JSON data here..."
              className="w-full h-64 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
              spellCheck="false"
            />
          </div>

          {/* Validation Status */}
          <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <span className="font-bold dark:text-dark-primary-text">
              Status:{' '}
            </span>
            {validationStatus.valid === true && (
              <span className="text-green-600 dark:text-green-400">
                {validationStatus.message}
              </span>
            )}
            {validationStatus.valid === false && (
              <span className="text-red-600 dark:text-red-400">
                {validationStatus.message}
              </span>
            )}
            {validationStatus.valid === null && (
              <span className="text-gray-500 dark:text-gray-400">
                Waiting for input...
              </span>
            )}
          </div>

          {/* Output Area with View Toggle */}
          {validationStatus.valid === true && parsedJson && (
            <div>
              <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                {/* View Toggle Buttons */}
                <div className="flex border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
                  <button
                    onClick={() => setCurrentView('text')}
                    className={`p-2 font-semibold ${currentView === 'text' ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg' : 'bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                  >
                    Formatted Text
                  </button>
                  <button
                    onClick={() => setCurrentView('tree')}
                    className={`p-2 font-semibold border-l-2 border-border-color dark:border-dark-border-color ${currentView === 'tree' ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg' : 'bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                  >
                    Tree View
                  </button>
                </div>
                {/* Copy Button (only shown for text view) */}
                {currentView === 'text' && (
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyButtonText}
                  </button>
                )}
              </div>

              {/* Conditional Output: Text or Tree */}
              <div
                className="p-4 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner overflow-auto"
                style={{ maxHeight: '60vh' }}
              >
                {currentView === 'text' ? (
                  <pre className="text-sm font-mono text-primary-text dark:text-dark-primary-text whitespace-pre-wrap break-words">
                    {formattedJson}
                  </pre>
                ) : (
                  <ReactJson
                    src={parsedJson}
                    name={null}
                    theme={
                      document.documentElement.classList.contains('dark')
                        ? 'monokai'
                        : 'rjv-default'
                    }
                    iconStyle="square"
                    collapsed={false} // Expand tree by default
                    enableClipboard={false} // Disable internal copy, use our button
                    displayDataTypes={false}
                    style={{
                      backgroundColor: 'transparent',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* About JSON Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About JSON
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>JSON (JavaScript Object Notation)</strong> is a lightweight
            data-interchange format that is easy for humans to read and write
            and easy for machines to parse and generate.
          </p>
          <p>
            <strong>JSON syntax rules:</strong>
          </p>
          <ul className="list-none space-y-1 font-mono text-xs">
            <li>
              <span className="inline-block w-24">Objects:</span>{' '}
              <span className="text-gray-500">→</span> {'{"key": "value"}'}
            </li>
            <li>
              <span className="inline-block w-24">Arrays:</span>{' '}
              <span className="text-gray-500">→</span> ["value1", "value2"]
            </li>
            <li>
              <span className="inline-block w-24">Strings:</span>{' '}
              <span className="text-gray-500">→</span> "Must be in double
              quotes"
            </li>
            <li>
              <span className="inline-block w-24">Numbers:</span>{' '}
              <span className="text-gray-500">→</span> 42, 3.14159
            </li>
            <li>
              <span className="inline-block w-24">Booleans:</span>{' '}
              <span className="text-gray-500">→</span> true, false
            </li>
            <li>
              <span className="inline-block w-24">Null:</span>{' '}
              <span className="text-gray-500">→</span> null
            </li>
          </ul>
          <p className="mt-2">
            <strong>When to use:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>API responses and requests</li>
            <li>Configuration files</li>
            <li>Data storage in NoSQL databases</li>
            <li>Client-server data exchange</li>
            <li>Storing structured data</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default JsonToolsPage;

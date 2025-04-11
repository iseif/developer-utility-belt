import React, { useState } from 'react';

const TextEscaperPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [context, setContext] = useState<string>('json');
  const [error, setError] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy Output');

  // Escape functions
  const escapeJson = (text: string): string => {
    try {
      // Replace special characters with their escaped versions
      return text
        .replace(/\\/g, '\\\\') // Backslash
        .replace(/"/g, '\\"') // Double quote
        .replace(/\n/g, '\\n') // New line
        .replace(/\r/g, '\\r') // Carriage return
        .replace(/\t/g, '\\t') // Tab
        .replace(/\f/g, '\\f'); // Form feed
      // Removed the backspace replacement as it was causing issues
    } catch (err) {
      setError(
        'Error escaping JSON: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
      return '';
    }
  };

  const escapeXml = (text: string): string => {
    try {
      return text
        .replace(/&/g, '&amp;') // Ampersand
        .replace(/</g, '&lt;') // Less than
        .replace(/>/g, '&gt;') // Greater than
        .replace(/"/g, '&quot;') // Double quote
        .replace(/'/g, '&apos;'); // Single quote
    } catch (err) {
      setError(
        'Error escaping XML: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
      return '';
    }
  };

  const escapeSql = (text: string): string => {
    try {
      // Basic SQL escaping - primarily focused on single quotes
      return text.replace(/'/g, "''");
    } catch (err) {
      setError(
        'Error escaping SQL: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
      return '';
    }
  };

  // Unescape functions
  const unescapeJson = (text: string): string => {
    try {
      // Replace escaped characters with their unescaped versions
      return text
        .replace(/\\"/g, '"') // Double quote
        .replace(/\\n/g, '\n') // New line
        .replace(/\\r/g, '\r') // Carriage return
        .replace(/\\t/g, '\t') // Tab
        .replace(/\\f/g, '\f') // Form feed
        .replace(/\\\\/g, '\\'); // Backslash (must be last)
    } catch (err) {
      setError(
        'Error unescaping JSON: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
      return '';
    }
  };

  const unescapeXml = (text: string): string => {
    try {
      return text
        .replace(/&apos;/g, "'") // Single quote
        .replace(/&quot;/g, '"') // Double quote
        .replace(/&gt;/g, '>') // Greater than
        .replace(/&lt;/g, '<') // Less than
        .replace(/&amp;/g, '&'); // Ampersand (must be last)
    } catch (err) {
      setError(
        'Error unescaping XML: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
      return '';
    }
  };

  const unescapeSql = (text: string): string => {
    try {
      // Basic SQL unescaping - primarily focused on single quotes
      return text.replace(/''/g, "'");
    } catch (err) {
      setError(
        'Error unescaping SQL: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
      return '';
    }
  };

  const handleEscape = () => {
    setError('');
    setCopyButtonText('Copy Output');

    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      switch (context) {
        case 'json':
          setOutputText(escapeJson(inputText));
          break;
        case 'xml':
          setOutputText(escapeXml(inputText));
          break;
        case 'sql':
          setOutputText(escapeSql(inputText));
          break;
        default:
          setError(`Unknown context: ${context}`);
          setOutputText('');
      }
    } catch (err) {
      console.error('Escaping error:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.'
      );
      setOutputText('');
    }
  };

  const handleUnescape = () => {
    setError('');
    setCopyButtonText('Copy Output');

    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      switch (context) {
        case 'json':
          setOutputText(unescapeJson(inputText));
          break;
        case 'xml':
          setOutputText(unescapeXml(inputText));
          break;
        case 'sql':
          setOutputText(unescapeSql(inputText));
          break;
        default:
          setError(`Unknown context: ${context}`);
          setOutputText('');
      }
    } catch (err) {
      console.error('Unescaping error:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.'
      );
      setOutputText('');
    }
  };

  const handleCopy = async () => {
    if (!outputText) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy Output'), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
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
          Text Escaper/Unescaper
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Escape or unescape text for different programming contexts like JSON
          strings, XML content, and SQL literals.
        </p>
      </header>
      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Text Escaper/Unescaper
          </h3>
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="context-select"
                className="font-semibold dark:text-dark-primary-text"
              >
                Context:
              </label>
              <select
                id="context-select"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
              >
                <option value="json">JSON String</option>
                <option value="xml">XML Content</option>
                <option value="sql">SQL Literal</option>
              </select>
            </div>

            <button
              onClick={handleEscape}
              className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
            >
              Escape
            </button>

            <button
              onClick={handleUnescape}
              className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
            >
              Unescape
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
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to escape or unescape..."
                className="w-full h-96 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>

            {/* Output Area */}
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
                  disabled={!outputText && copyButtonText !== 'Nothing to Copy'}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copyButtonText}
                </button>
              </div>
              <textarea
                id="output-text"
                value={outputText}
                readOnly
                placeholder="Escaped or unescaped text will appear here..."
                className="w-full h-96 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>
          </div>
        </section>
      </div>

      {/* About Text Escaping Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Text Escaping
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Text escaping</strong> is the process of converting special
            characters in a string to a format that can be safely used in a
            specific context, such as JSON, XML, or SQL.
          </p>
          <p>
            <strong>When to use text escaping:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>When embedding strings within JSON data</li>
            <li>When including text in XML documents</li>
            <li>When using string literals in SQL queries</li>
            <li>To prevent injection attacks and syntax errors</li>
          </ul>
          <p className="mt-2">
            <strong>Supported contexts:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>JSON String:</strong> Escapes characters like quotes,
              backslashes, and control characters
            </li>
            <li>
              <strong>XML Content:</strong> Escapes &lt;, &gt;, &amp;, &quot;,
              and &apos;
            </li>
            <li>
              <strong>SQL Literal:</strong> Escapes single quotes (Note: This is
              a basic implementation and may not cover all database-specific
              requirements)
            </li>
          </ul>
          <p className="mt-2 text-yellow-600 dark:text-yellow-400">
            <strong>Note:</strong> While this tool provides basic escaping
            functionality, proper security practices should always be followed
            when handling user input in production applications. Consider using
            parameterized queries for SQL and proper encoding libraries for your
            specific language and framework.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TextEscaperPage;

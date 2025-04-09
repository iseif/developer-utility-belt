import React, { useCallback, useState } from 'react';

const UrlEncoderDecoderPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy');

  const handleEncode = () => {
    try {
      setError('');
      const encoded = encodeURIComponent(inputText);
      setOutputText(encoded);
    } catch (err) {
      setError(
        `Encoding Error: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
      setOutputText('');
    }
  };

  const handleDecode = () => {
    try {
      setError('');
      const decoded = decodeURIComponent(inputText);
      setOutputText(decoded);
    } catch (err) {
      setError(
        `Decoding Error: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
      setOutputText('');
    }
  };

  const handleCopyToClipboard = useCallback(async () => {
    if (!outputText) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    } catch (err) {
      setError(
        `Copy Error: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
      setCopyButtonText('Failed to Copy');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    }
  }, [outputText]);

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          URL Encoder/Decoder
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Encode or decode URL components using percent-encoding. This tool uses{' '}
          <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
            encodeURIComponent()
          </code>{' '}
          and{' '}
          <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
            decodeURIComponent()
          </code>{' '}
          which are suitable for encoding parts of a URL like query parameters.
        </p>
      </header>

      {error && (
        <div className="p-3 border-2 border-red-500 bg-red-100 dark:bg-red-900 dark:border-red-700 text-red-700 dark:text-red-100">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Main content sections */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            URL Encoder/Decoder
          </h3>
          <div>
            <label
              htmlFor="input-text"
              className="block mb-1 font-semibold dark:text-dark-primary-text"
            >
              Input:
            </label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to encode or decode"
              className="w-full h-32 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner mb-2"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleEncode}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
              >
                Encode
              </button>
              <button
                onClick={handleDecode}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
              >
                Decode
              </button>
            </div>
          </div>

          {outputText && (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="output-text"
                  className="font-semibold dark:text-dark-primary-text"
                >
                  Output:
                </label>
                <button
                  onClick={handleCopyToClipboard}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copyButtonText}
                </button>
              </div>
              <textarea
                id="output-text"
                value={outputText}
                readOnly
                className="w-full h-32 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
              />
            </div>
          )}
        </section>
      </div>

      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About URL Encoding
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>URL Encoding (Percent Encoding)</strong> is used to convert
            characters that are not allowed in URLs into a format that can be
            transmitted over the Internet.
          </p>
          <p>
            <strong>When to use:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Encoding query parameters in URLs</li>
            <li>Encoding special characters in URL paths</li>
            <li>Preparing data for form submissions</li>
          </ul>
          <p className="mt-2">
            <strong>Examples:</strong>
          </p>
          <ul className="list-none space-y-1 font-mono text-xs">
            <li>
              <span className="inline-block w-24">Space:</span>{' '}
              <span className="text-gray-500">→</span> %20
            </li>
            <li>
              <span className="inline-block w-24">&amp;:</span>{' '}
              <span className="text-gray-500">→</span> %26
            </li>
            <li>
              <span className="inline-block w-24">=:</span>{' '}
              <span className="text-gray-500">→</span> %3D
            </li>
            <li>
              <span className="inline-block w-24">+:</span>{' '}
              <span className="text-gray-500">→</span> %2B
            </li>
            <li>
              <span className="inline-block w-24">/:</span>{' '}
              <span className="text-gray-500">→</span> %2F
            </li>
            <li>
              <span className="inline-block w-24">?:</span>{' '}
              <span className="text-gray-500">→</span> %3F
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UrlEncoderDecoderPage;

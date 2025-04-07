import React, { useState } from 'react';

const Base64EncoderDecoderPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Helper function to handle Unicode characters with btoa
  const utf8ToBase64 = (str: string): string => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  };

  // Helper function to handle Unicode characters with atob
  const base64ToUtf8 = (str: string): string => {
    return decodeURIComponent(
      Array.from(atob(str), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
  };

  const handleEncode = () => {
    try {
      setError('');
      const encoded = utf8ToBase64(inputText);
      setOutputText(encoded);
    } catch (err) {
      setError(`Encoding Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutputText('');
    }
  };

  const handleDecode = () => {
    try {
      setError('');
      const decoded = base64ToUtf8(inputText);
      setOutputText(decoded);
    } catch (err) {
      setError(`Decoding Error: Invalid Base64 string or ${err instanceof Error ? err.message : 'unknown error'}`);
      setOutputText('');
    }
  };

  const handleCopyToClipboard = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
      // Optional: Show a temporary success message
    } catch (err) {
      setError(`Copy Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Base64 Encoder/Decoder
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Encode text to Base64 or decode Base64 back to text. This tool uses enhanced versions of{' '}
          <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">btoa()</code> and{' '}
          <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">atob()</code>{' '}
          with proper Unicode support.
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
            Base64 Encoder/Decoder
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
              placeholder="Enter text to encode or Base64 to decode"
              className="w-full h-32 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner mb-2"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleEncode}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg"
              >
                Encode
              </button>
              <button
                onClick={handleDecode}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg"
              >
                Decode
              </button>
            </div>
          </div>
          
          {outputText && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="output-text"
                  className="font-semibold dark:text-dark-primary-text"
                >
                  Output:
                </label>
                <button
                  onClick={handleCopyToClipboard}
                  className="px-2 py-0.5 text-xs border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Copy
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
          About Base64 Encoding
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Base64</strong> is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation.
          </p>
          <p>
            <strong>When to use Base64:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Embedding binary data in text-based formats (like JSON)</li>
            <li>Encoding images or files for embedding in HTML/CSS</li>
            <li>Sending binary data in email attachments</li>
            <li>Storing binary data in text-based databases</li>
          </ul>
          <p className="mt-2">
            <strong>Examples:</strong>
          </p>
          <ul className="list-none space-y-1 font-mono text-xs">
            <li><span className="inline-block w-24">"Hello"</span> <span className="text-gray-500">→</span> SGVsbG8=</li>
            <li><span className="inline-block w-24">"World!"</span> <span className="text-gray-500">→</span> V29ybGQh</li>
            <li><span className="inline-block w-24">"Base64"</span> <span className="text-gray-500">→</span> QmFzZTY0</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Base64EncoderDecoderPage;

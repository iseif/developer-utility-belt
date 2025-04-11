import React, { useState } from 'react';

// Define types for HMAC algorithms
interface HmacParams extends Algorithm {
  hash: string | Algorithm;
}

interface HmacAlgorithm {
  name: string;
  value: HmacParams;
}

const HmacGeneratorPage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [algorithm, setAlgorithm] = useState<HmacAlgorithm>({
    name: 'SHA-256',
    value: { name: 'HMAC', hash: 'SHA-256' },
  });
  const [hmacSignature, setHmacSignature] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy HMAC');
  const [showKey, setShowKey] = useState<boolean>(false);

  const algorithms: HmacAlgorithm[] = [
    { name: 'SHA-1', value: { name: 'HMAC', hash: 'SHA-1' } },
    { name: 'SHA-256', value: { name: 'HMAC', hash: 'SHA-256' } },
    { name: 'SHA-512', value: { name: 'HMAC', hash: 'SHA-512' } },
  ];

  // Convert ArrayBuffer to hex string
  const bufferToHex = (buffer: ArrayBuffer): string => {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Generate HMAC signature
  const generateHmac = async () => {
    setError('');
    setHmacSignature('');
    setCopyButtonText('Copy HMAC');

    // Validate inputs
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    if (!secretKey.trim()) {
      setError('Secret key cannot be empty');
      return;
    }

    setIsGenerating(true);

    try {
      // Encode the message and key
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secretKey);
      const messageData = encoder.encode(message);

      // Import the key
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        algorithm.value,
        false,
        ['sign']
      );

      // Generate the HMAC
      const signature = await window.crypto.subtle.sign(
        algorithm.value,
        cryptoKey,
        messageData
      );

      // Convert to hex string
      const hmacHex = bufferToHex(signature);
      setHmacSignature(hmacHex);
    } catch (err) {
      console.error('HMAC generation error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown error occurred while generating the HMAC'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle algorithm change
  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAlgorithm = algorithms.find(
      (algo) => algo.name === e.target.value
    );
    if (selectedAlgorithm) {
      setAlgorithm(selectedAlgorithm);
    }
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (!hmacSignature) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy HMAC'), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(hmacSignature);
      setCopyButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => setCopyButtonText('Copy HMAC'), 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          HMAC Generator
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Generate Hash-based Message Authentication Codes (HMAC) using various
          hash algorithms and a secret key.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            HMAC Generator
          </h3>

          <div className="space-y-4">
            {/* Message Input */}
            <div>
              <label
                htmlFor="message-input"
                className="block mb-1 font-semibold dark:text-dark-primary-text"
              >
                Message
              </label>
              <textarea
                id="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter the message to sign..."
                className="w-full h-32 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
                disabled={isGenerating}
              />
            </div>

            {/* Secret Key Input */}
            <div>
              <div className="flex flex-col mb-1">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="key-input"
                    className="font-semibold dark:text-dark-primary-text"
                  >
                    Secret Key
                  </label>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    {showKey ? 'Hide Key' : 'Show Key'}
                  </button>
                </div>
              </div>
              <input
                id="key-input"
                type={showKey ? 'text' : 'password'}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter your secret key..."
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                disabled={isGenerating}
              />
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                Keep this key confidential. The security of HMAC relies on the
                secrecy of this key.
              </p>
            </div>

            {/* Algorithm Selector */}
            <div>
              <label
                htmlFor="algorithm-select"
                className="block mb-1 font-semibold dark:text-dark-primary-text"
              >
                Hash Algorithm
              </label>
              <select
                id="algorithm-select"
                value={algorithm.name}
                onChange={handleAlgorithmChange}
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
                disabled={isGenerating}
              >
                {algorithms.map((algo) => (
                  <option key={algo.name} value={algo.name}>
                    {algo.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <div>
              <button
                onClick={generateHmac}
                disabled={isGenerating}
                className="px-4 py-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate HMAC'}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-100 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-100 dark:border-red-400">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}

            {/* HMAC Output */}
            <div>
              <div className="flex justify-between items-center mb-1 min-h-[36px]">
                <label
                  htmlFor="hmac-output"
                  className="font-semibold dark:text-dark-primary-text"
                >
                  HMAC Signature (Hex)
                </label>
                <button
                  onClick={handleCopy}
                  disabled={!hmacSignature}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copyButtonText}
                </button>
              </div>
              <textarea
                id="hmac-output"
                value={hmacSignature}
                readOnly
                placeholder="HMAC signature will appear here..."
                className="w-full h-20 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>
          </div>
        </section>

        {/* About HMAC Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About HMAC
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>HMAC (Hash-based Message Authentication Code)</strong> is
              a specific type of message authentication code (MAC) involving a
              cryptographic hash function and a secret cryptographic key.
            </p>
            <p>
              <strong>Common uses of HMAC:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Verifying data integrity</li>
              <li>Authentication of messages</li>
              <li>API request signing</li>
              <li>Session token validation</li>
              <li>Secure cookie generation</li>
            </ul>
            <p className="mt-2">
              <strong>Security considerations:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                The security of HMAC depends entirely on keeping the secret key
                confidential
              </li>
              <li>
                SHA-256 and SHA-512 are recommended over SHA-1 for
                security-critical applications
              </li>
              <li>
                HMAC is resistant to length extension attacks that affect plain
                hash functions
              </li>
            </ul>
            <p className="mt-2">
              This tool uses the Web Crypto API to perform HMAC calculations
              securely in your browser. No data is sent to any server.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HmacGeneratorPage;

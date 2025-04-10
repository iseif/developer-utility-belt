import React, { useEffect, useRef, useState } from 'react';
import { md5 } from 'js-md5';

const HashGeneratorPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<{
    md5: boolean;
    sha1: boolean;
    sha256: boolean;
    sha512: boolean;
  }>({
    md5: true,
    sha1: true,
    sha256: true,
    sha512: true,
  });

  const [hashResults, setHashResults] = useState<{
    md5: string;
    sha1: string;
    sha256: string;
    sha512: string;
  }>({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  });

  const [copyStatus, setCopyStatus] = useState<{
    [key: string]: string;
  }>({
    md5: 'Copy',
    sha1: 'Copy',
    sha256: 'Copy',
    sha512: 'Copy',
  });

  // New state variables for enhancements
  const [isRealTimeHashing, setIsRealTimeHashing] = useState<boolean>(true);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [verificationText, setVerificationText] = useState<string>('');
  const [expectedHash, setExpectedHash] = useState<string>('');
  const [verificationAlgorithm, setVerificationAlgorithm] =
    useState<string>('sha256');
  const [verificationResult, setVerificationResult] = useState<{
    isVerified: boolean | null;
    message: string;
    computedHash: string;
  }>({ isVerified: null, message: '', computedHash: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to convert ArrayBuffer to hex string
  const bufferToHex = (buffer: ArrayBuffer): string => {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Function to generate MD5 hash
  const generateMD5 = async (text: string): Promise<string> => {
    return md5(text) as string;
  };

  // Function to generate SHA hashes using Web Crypto API
  const generateSHA = async (
    text: string,
    algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512'
  ): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    return bufferToHex(hashBuffer);
  };

  // Function to generate hash from file content
  const generateFileHash = async (file: File): Promise<void> => {
    if (isProcessingFile) return;

    setIsProcessingFile(true);
    setFileName(file.name);
    setFileSize(file.size);

    try {
      const buffer = await file.arrayBuffer();
      const results = { ...hashResults };

      if (selectedAlgorithms.md5) {
        // For MD5, we need to convert ArrayBuffer to string first
        const uint8Array = new Uint8Array(buffer);
        const binaryString = Array.from(uint8Array)
          .map((byte) => String.fromCharCode(byte))
          .join('');
        results.md5 = md5(binaryString) as string;
      } else {
        results.md5 = '';
      }

      if (selectedAlgorithms.sha1) {
        const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
        results.sha1 = bufferToHex(hashBuffer);
      } else {
        results.sha1 = '';
      }

      if (selectedAlgorithms.sha256) {
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        results.sha256 = bufferToHex(hashBuffer);
      } else {
        results.sha256 = '';
      }

      if (selectedAlgorithms.sha512) {
        const hashBuffer = await crypto.subtle.digest('SHA-512', buffer);
        results.sha512 = bufferToHex(hashBuffer);
      } else {
        results.sha512 = '';
      }

      setHashResults(results);
    } catch (error) {
      console.error('Error generating file hashes:', error);
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Main function to generate all selected hashes for text input
  const generateHashes = async () => {
    // If a file is selected, use that instead of text input
    if (fileName) {
      if (
        fileInputRef.current &&
        fileInputRef.current.files &&
        fileInputRef.current.files.length > 0
      ) {
        await generateFileHash(fileInputRef.current.files[0]);
        return;
      }
    }

    // Otherwise, process text input
    const results = { ...hashResults };

    if (inputText.trim() === '') {
      setHashResults({
        md5: '',
        sha1: '',
        sha256: '',
        sha512: '',
      });
      return;
    }

    try {
      if (selectedAlgorithms.md5) {
        results.md5 = await generateMD5(inputText);
      } else {
        results.md5 = '';
      }

      if (selectedAlgorithms.sha1) {
        results.sha1 = await generateSHA(inputText, 'SHA-1');
      } else {
        results.sha1 = '';
      }

      if (selectedAlgorithms.sha256) {
        results.sha256 = await generateSHA(inputText, 'SHA-256');
      } else {
        results.sha256 = '';
      }

      if (selectedAlgorithms.sha512) {
        results.sha512 = await generateSHA(inputText, 'SHA-512');
      } else {
        results.sha512 = '';
      }

      setHashResults(results);
    } catch (error) {
      console.error('Error generating hashes:', error);
    }
  };

  // Generate hashes whenever input text or selected algorithms change
  useEffect(() => {
    if (isRealTimeHashing && !isProcessingFile && inputText) {
      generateHashes();
    }
  }, [inputText, selectedAlgorithms, isRealTimeHashing]);

  // Handle algorithm selection changes
  const handleAlgorithmChange = (
    algorithm: keyof typeof selectedAlgorithms
  ) => {
    setSelectedAlgorithms((prev) => ({
      ...prev,
      [algorithm]: !prev[algorithm],
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Clear the input text when processing a file
      setInputText('');
      setFileName(files[0].name);
      setFileSize(files[0].size);

      // Only process the file immediately if real-time hashing is enabled
      if (isRealTimeHashing) {
        generateFileHash(files[0]);
      }
    }
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Clear the input text when processing a file
      setInputText('');
      setFileName(e.dataTransfer.files[0].name);
      setFileSize(e.dataTransfer.files[0].size);

      // Only process the file immediately if real-time hashing is enabled
      if (isRealTimeHashing) {
        generateFileHash(e.dataTransfer.files[0]);
      }
    }
  };

  // Verify hash against expected hash
  const verifyHash = async () => {
    if (!expectedHash.trim()) {
      setVerificationResult({
        isVerified: null,
        message: 'Please enter an expected hash to verify against',
        computedHash: '',
      });
      return;
    }

    if (!verificationText.trim()) {
      setVerificationResult({
        isVerified: null,
        message: 'Please enter text to verify',
        computedHash: '',
      });
      return;
    }

    try {
      // Compute hash of the verification text
      let computedHash = '';

      if (verificationAlgorithm === 'md5') {
        computedHash = await generateMD5(verificationText);
      } else if (verificationAlgorithm === 'sha1') {
        computedHash = await generateSHA(verificationText, 'SHA-1');
      } else if (verificationAlgorithm === 'sha256') {
        computedHash = await generateSHA(verificationText, 'SHA-256');
      } else if (verificationAlgorithm === 'sha512') {
        computedHash = await generateSHA(verificationText, 'SHA-512');
      }

      const isMatch = expectedHash.toLowerCase() === computedHash.toLowerCase();

      setVerificationResult({
        isVerified: isMatch,
        message: isMatch
          ? 'Hash verification successful! The computed hash matches the expected hash.'
          : 'Hash verification failed. The computed hash does not match the expected hash.',
        computedHash,
      });
    } catch (error) {
      console.error('Error during hash verification:', error);
      setVerificationResult({
        isVerified: false,
        message: 'An error occurred during hash verification.',
        computedHash: '',
      });
    }
  };

  const copyToClipboard = async (hash: string, algorithm: string) => {
    if (!hash) return;

    try {
      await navigator.clipboard.writeText(hash);
      setCopyStatus((prev) => ({
        ...prev,
        [algorithm]: 'Copied!',
      }));

      // Reset copy button text after 2 seconds
      setTimeout(() => {
        setCopyStatus((prev) => ({
          ...prev,
          [algorithm]: 'Copy',
        }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus((prev) => ({
        ...prev,
        [algorithm]: 'Copy Failed!',
      }));

      // Reset copy button text after 2 seconds
      setTimeout(() => {
        setCopyStatus((prev) => ({
          ...prev,
          [algorithm]: 'Copy',
        }));
      }, 2000);
    }
  };

  const handleClearAll = () => {
    setInputText('');
    setFileName('');
    setFileSize(0);
    setHashResults({
      md5: '',
      sha1: '',
      sha256: '',
      sha512: '',
    });
    setVerificationText('');
    setExpectedHash('');
    setVerificationResult({ isVerified: null, message: '', computedHash: '' });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);

    // Clear file selection if user starts typing
    if (fileName) {
      setFileName('');
      setFileSize(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Hash Generator
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Generate cryptographic hashes for text input or files. Select the hash
          algorithms you want to use and get instant results.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Hash Generator
          </h3>

          {/* Real-time Hashing Toggle */}
          <div className="flex justify-end">
            <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
              <input
                type="checkbox"
                checked={isRealTimeHashing}
                onChange={() => setIsRealTimeHashing(!isRealTimeHashing)}
                className="form-checkbox"
              />
              <span>Real-time Hashing</span>
            </label>
          </div>

          {/* Input Options */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="input-text"
                className="block mb-1 font-semibold dark:text-dark-primary-text"
              >
                Text Input:
              </label>
              <textarea
                id="input-text"
                value={inputText}
                onChange={handleTextChange}
                placeholder="Enter text to hash..."
                className="w-full h-32 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
                disabled={isProcessingFile}
              />
            </div>

            <div className="flex-1">
              <div className="mb-1 font-semibold dark:text-dark-primary-text">
                File Input:
              </div>
              <div
                className="flex flex-col h-32 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {fileName ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-primary-text dark:text-dark-primary-text mb-2">
                      File: <span className="font-semibold">{fileName}</span>
                    </p>
                    <p className="text-primary-text dark:text-dark-primary-text text-sm">
                      Size: {(fileSize / 1024).toFixed(2)} KB
                    </p>
                    {isProcessingFile && (
                      <p className="text-primary-text dark:text-dark-primary-text mt-2 animate-pulse">
                        Processing...
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <button
                      onClick={handleFileButtonClick}
                      className="px-4 py-2 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      Select File
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Or drag and drop a file here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manual Generate Button (only shown when real-time is off) */}
          {!isRealTimeHashing && (
            <div className="flex justify-center my-4">
              <button
                onClick={generateHashes}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessingFile}
              >
                {isProcessingFile ? 'Processing...' : 'Generate Hashes'}
              </button>
            </div>
          )}

          {/* Clear All Button */}
          <div className="flex justify-end my-4">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Clear All
            </button>
          </div>

          {/* Algorithm Selection */}
          <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <h4 className="font-semibold mb-2 dark:text-dark-primary-text">
              Select Hash Algorithms:
            </h4>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.md5}
                  onChange={() => handleAlgorithmChange('md5')}
                  className="form-checkbox"
                />
                <span>MD5</span>
                <span className="text-xs text-red-600 dark:text-red-400">
                  (Not secure for cryptographic purposes)
                </span>
              </label>

              <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.sha1}
                  onChange={() => handleAlgorithmChange('sha1')}
                  className="form-checkbox"
                />
                <span>SHA-1</span>
                <span className="text-xs text-red-600 dark:text-red-400">
                  (Not secure for cryptographic purposes)
                </span>
              </label>

              <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.sha256}
                  onChange={() => handleAlgorithmChange('sha256')}
                  className="form-checkbox"
                />
                <span>SHA-256</span>
              </label>

              <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.sha512}
                  onChange={() => handleAlgorithmChange('sha512')}
                  className="form-checkbox"
                />
                <span>SHA-512</span>
              </label>
            </div>
          </div>

          {/* Hash Results */}
          <div className="space-y-3">
            <h4 className="font-semibold dark:text-dark-primary-text">
              Hash Results:
            </h4>

            {selectedAlgorithms.md5 && (
              <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold dark:text-dark-primary-text">
                    MD5:
                  </span>
                  <button
                    onClick={() => copyToClipboard(hashResults.md5, 'md5')}
                    disabled={!hashResults.md5}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyStatus.md5}
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-primary-text dark:text-dark-primary-text">
                  {hashResults.md5 || 'No hash generated yet'}
                </div>
              </div>
            )}

            {selectedAlgorithms.sha1 && (
              <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold dark:text-dark-primary-text">
                    SHA-1:
                  </span>
                  <button
                    onClick={() => copyToClipboard(hashResults.sha1, 'sha1')}
                    disabled={!hashResults.sha1}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyStatus.sha1}
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-primary-text dark:text-dark-primary-text">
                  {hashResults.sha1 || 'No hash generated yet'}
                </div>
              </div>
            )}

            {selectedAlgorithms.sha256 && (
              <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold dark:text-dark-primary-text">
                    SHA-256:
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(hashResults.sha256, 'sha256')
                    }
                    disabled={!hashResults.sha256}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyStatus.sha256}
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-primary-text dark:text-dark-primary-text">
                  {hashResults.sha256 || 'No hash generated yet'}
                </div>
              </div>
            )}

            {selectedAlgorithms.sha512 && (
              <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold dark:text-dark-primary-text">
                    SHA-512:
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(hashResults.sha512, 'sha512')
                    }
                    disabled={!hashResults.sha512}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyStatus.sha512}
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-primary-text dark:text-dark-primary-text">
                  {hashResults.sha512 || 'No hash generated yet'}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Hash Verification Section - Now as a separate section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Hash Verification
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Enter text and an expected hash to verify if they match. This is
            useful for verifying data integrity.
          </p>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="verification-text"
                className="block mb-1 font-semibold dark:text-dark-primary-text"
              >
                Text to Verify:
              </label>
              <textarea
                id="verification-text"
                value={verificationText}
                onChange={(e) => setVerificationText(e.target.value)}
                placeholder="Enter text to verify..."
                className="w-full h-20 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-48">
                <label
                  htmlFor="verification-algorithm"
                  className="block mb-1 font-semibold dark:text-dark-primary-text"
                >
                  Algorithm:
                </label>
                <select
                  id="verification-algorithm"
                  value={verificationAlgorithm}
                  onChange={(e) => setVerificationAlgorithm(e.target.value)}
                  className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
                >
                  <option value="md5">MD5</option>
                  <option value="sha1">SHA-1</option>
                  <option value="sha256">SHA-256</option>
                  <option value="sha512">SHA-512</option>
                </select>
              </div>

              <div className="flex-1">
                <label
                  htmlFor="expected-hash"
                  className="block mb-1 font-semibold dark:text-dark-primary-text"
                >
                  Expected Hash:
                </label>
                <input
                  type="text"
                  id="expected-hash"
                  value={expectedHash}
                  onChange={(e) => setExpectedHash(e.target.value)}
                  placeholder="Paste expected hash here..."
                  className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={verifyHash}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Hash
              </button>
            </div>

            {verificationResult.isVerified !== null && (
              <div
                className={`p-3 border-2 ${verificationResult.isVerified ? 'border-green-600 bg-green-100 text-green-800 dark:border-green-400 dark:bg-green-900 dark:text-green-100' : 'border-red-600 bg-red-100 text-red-800 dark:border-red-400 dark:bg-red-900 dark:text-red-100'}`}
              >
                <div>{verificationResult.message}</div>
                {verificationResult.computedHash && (
                  <div className="mt-2">
                    <div className="font-semibold">Computed Hash:</div>
                    <div className="font-mono text-sm break-all">
                      {verificationResult.computedHash}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* About Cryptographic Hashes Section - Now as a separate section */}
        <section className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About Cryptographic Hashes
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Cryptographic hash functions</strong> transform data into
              a fixed-size string of characters, typically a hex digest. They
              have several important properties:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The same input will always produce the same output hash</li>
              <li>
                Even a small change in input produces a completely different
                hash
              </li>
              <li>
                It's computationally infeasible to derive the original input
                from the hash
              </li>
              <li>
                It's extremely unlikely for two different inputs to produce the
                same hash (collision resistance)
              </li>
            </ul>
            <p className="mt-2">
              <strong>Security Note:</strong> MD5 and SHA-1 are considered
              cryptographically broken and should not be used for security
              purposes. SHA-256 and SHA-512 are currently recommended for
              security-sensitive applications.
            </p>
            <p>
              <strong>Common Uses:</strong> File integrity verification,
              password storage (with proper salting), digital signatures, and
              data identification.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HashGeneratorPage;

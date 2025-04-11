import React, { useEffect, useState } from 'react';

type InputType = 'text' | 'hex';

const HexViewerPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [inputType, setInputType] = useState<InputType>('text');
  const [bytesPerLine, setBytesPerLine] = useState<number>(16);
  const [hexOutput, setHexOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Process input whenever it changes or options change
  useEffect(() => {
    if (!input.trim()) {
      setHexOutput('');
      setError('');
      return;
    }

    try {
      const bytes = parseInput(input, inputType);
      const formattedOutput = formatHexDump(bytes, bytesPerLine);
      setHexOutput(formattedOutput);
      setError('');
    } catch (err) {
      console.error('Error processing input:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      setHexOutput('');
    }
  }, [input, inputType, bytesPerLine]);

  // Parse input based on type
  const parseInput = (value: string, type: InputType): Uint8Array => {
    if (type === 'text') {
      // Convert text to bytes using TextEncoder
      const encoder = new TextEncoder();
      return encoder.encode(value);
    } else {
      // Parse hex string
      // Remove whitespace, validate, and convert to bytes
      const cleanHex = value.replace(/\s+/g, '');

      // Validate hex string (must be even length and contain only hex chars)
      if (cleanHex.length % 2 !== 0) {
        throw new Error('Hex string must have an even number of characters');
      }

      if (!/^[0-9A-Fa-f]*$/.test(cleanHex)) {
        throw new Error('Invalid hex characters detected');
      }

      // Convert hex string to byte array
      const bytes = new Uint8Array(cleanHex.length / 2);
      for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
      }

      return bytes;
    }
  };

  // Format bytes as hex dump
  const formatHexDump = (bytes: Uint8Array, bytesPerRow: number): string => {
    let result = '';

    for (let i = 0; i < bytes.length; i += bytesPerRow) {
      // Address column (offset)
      const offset = i.toString(16).padStart(8, '0');
      result += `${offset}  `;

      // Hex representation
      const rowBytes = bytes.slice(i, i + bytesPerRow);
      const hexValues: string[] = [];

      for (let j = 0; j < bytesPerRow; j++) {
        if (j < rowBytes.length) {
          hexValues.push(rowBytes[j].toString(16).padStart(2, '0'));
        } else {
          hexValues.push('  '); // Padding for incomplete row
        }
      }

      // Group hex values for better readability
      const groupedHex = [];
      for (let j = 0; j < hexValues.length; j += 8) {
        groupedHex.push(hexValues.slice(j, j + 8).join(' '));
      }
      result += groupedHex.join('  ') + '  ';

      // ASCII representation
      let asciiChars = '';
      for (let j = 0; j < rowBytes.length; j++) {
        const byte = rowBytes[j];
        // Use dots for non-printable characters
        asciiChars +=
          byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.';
      }

      result += asciiChars + '\n';
    }

    return result;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleInputTypeChange = (type: InputType) => {
    setInputType(type);
  };

  const handleBytesPerLineChange = (bytes: number) => {
    setBytesPerLine(bytes);
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Binary/Hex Viewer
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Display text or hexadecimal input as a formatted hex dump, showing
          offset, hex values, and ASCII representation.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Hex Viewer
          </h3>

          {/* Input Type Selection */}
          <div className="mb-4">
            <div className="font-semibold mb-2 dark:text-dark-primary-text">
              Input Type:
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="input-type"
                  checked={inputType === 'text'}
                  onChange={() => handleInputTypeChange('text')}
                  className="form-radio"
                />
                <span className="dark:text-dark-primary-text">Text</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="input-type"
                  checked={inputType === 'hex'}
                  onChange={() => handleInputTypeChange('hex')}
                  className="form-radio"
                />
                <span className="dark:text-dark-primary-text">Hex String</span>
              </label>
            </div>
          </div>

          {/* Bytes Per Line Selection */}
          <div className="mb-4">
            <div className="font-semibold mb-2 dark:text-dark-primary-text">
              Bytes Per Line:
            </div>
            <div className="flex flex-wrap gap-4">
              {[8, 16, 32].map((bytes) => (
                <label
                  key={bytes}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="bytes-per-line"
                    checked={bytesPerLine === bytes}
                    onChange={() => handleBytesPerLineChange(bytes)}
                    className="form-radio"
                  />
                  <span className="dark:text-dark-primary-text">{bytes}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="mb-4">
            <label
              htmlFor="hex-input"
              className="block font-semibold mb-1 dark:text-dark-primary-text"
            >
              Input {inputType === 'text' ? 'Text' : 'Hex String'}:
            </label>
            <textarea
              id="hex-input"
              value={input}
              onChange={handleInputChange}
              placeholder={
                inputType === 'text'
                  ? 'Enter text to view as hex...'
                  : 'Enter hex string (e.g., 48 65 6C 6C 6F)...'
              }
              className="w-full h-32 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
              spellCheck="false"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-100 dark:border-red-400">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* Output Area */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="hex-output"
                className="font-semibold dark:text-dark-primary-text"
              >
                Hex Dump:
              </label>
            </div>
            <pre
              id="hex-output"
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner overflow-auto whitespace-pre-wrap"
              style={{ maxHeight: '400px' }}
            >
              {hexOutput || 'Hex dump will appear here...'}
            </pre>
          </div>
        </section>
      </div>

      {/* About Hex Dumps Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Hex Dumps
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Hex dumps</strong> are a way to visualize binary data in a
            human-readable format. They typically include:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Offset/Address:</strong> The position of the first byte in
              each row (in hexadecimal).
            </li>
            <li>
              <strong>Hexadecimal Values:</strong> The byte values displayed in
              base-16 (00-FF).
            </li>
            <li>
              <strong>ASCII Representation:</strong> The same bytes interpreted
              as ASCII characters, with non-printable characters replaced by
              dots.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Common uses for hex dumps:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Analyzing binary file formats</li>
            <li>Debugging network packets</li>
            <li>Reverse engineering</li>
            <li>Low-level data inspection</li>
          </ul>
          <p className="mt-2">
            <strong>Input types:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Text:</strong> Regular text that will be converted to its
              binary representation.
            </li>
            <li>
              <strong>Hex String:</strong> A string of hexadecimal values (e.g.,
              "48 65 6C 6C 6F" for "Hello").
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HexViewerPage;

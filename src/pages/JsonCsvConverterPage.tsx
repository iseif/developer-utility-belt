import React, { useState } from 'react';
import Papa from 'papaparse';
import { FaCheck, FaClipboard, FaExchangeAlt } from 'react-icons/fa';

const JsonCsvConverterPage: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [outputData, setOutputData] = useState<string>('');
  const [conversionDirection, setConversionDirection] = useState<
    'json-to-csv' | 'csv-to-json'
  >('json-to-csv');
  const [firstRowAsHeader, setFirstRowAsHeader] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [copyButtonText, setCopyButtonText] =
    useState<string>('Copy to Clipboard');
  const [copyIcon, setCopyIcon] = useState<React.ReactNode>(<FaClipboard />);

  const handleConvert = () => {
    setError('');
    setOutputData('');

    if (!inputData.trim()) {
      setError('Please enter some data to convert.');
      return;
    }

    try {
      if (conversionDirection === 'json-to-csv') {
        // JSON to CSV conversion
        const parsedJson = JSON.parse(inputData);

        // Check if the JSON is an array
        if (!Array.isArray(parsedJson)) {
          setError('JSON must be an array of objects for CSV conversion.');
          return;
        }

        // Check if the array is empty
        if (parsedJson.length === 0) {
          setOutputData('');
          return;
        }

        // Check if the array contains objects
        if (typeof parsedJson[0] !== 'object' || parsedJson[0] === null) {
          setError('JSON must contain an array of objects for CSV conversion.');
          return;
        }

        const csvData = Papa.unparse(parsedJson, {
          header: true, // Include header row
          skipEmptyLines: true,
        });

        setOutputData(csvData);
      } else {
        // CSV to JSON conversion
        const results = Papa.parse<any>(inputData, {
          header: firstRowAsHeader,
          skipEmptyLines: true,
        });

        if (results.errors && results.errors.length > 0) {
          setError(`CSV parsing error: ${results.errors[0].message}`);
          return;
        }

        // Format the JSON with indentation for readability
        const formattedJson = JSON.stringify(results.data, null, 2);
        setOutputData(formattedJson);
      }
    } catch (err) {
      setError(
        `Conversion error: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    }
  };

  const handleCopy = async () => {
    if (!outputData) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(outputData);
      setCopyButtonText('Copied!');
      setCopyIcon(<FaCheck />);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => {
        setCopyButtonText('Copy to Clipboard');
        setCopyIcon(<FaClipboard />);
      }, 2000);
    }
  };

  const toggleConversionDirection = () => {
    setConversionDirection((prev) =>
      prev === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv'
    );
    // Clear outputs when changing direction
    setOutputData('');
    setError('');
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          JSON ↔ CSV Converter
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Convert data between JSON and CSV formats. Easily transform JSON
          arrays of objects to CSV tables and vice versa.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-4 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 border-b-2 border-border-color dark:border-dark-border-color pb-3">
            <h3 className="text-lg font-semibold dark:text-dark-primary-text">
              {conversionDirection === 'json-to-csv'
                ? 'JSON to CSV'
                : 'CSV to JSON'}{' '}
              Converter
            </h3>

            <div className="flex items-center space-x-3">
              {/* Direction Toggle */}
              <button
                onClick={toggleConversionDirection}
                className="flex items-center px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                <FaExchangeAlt className="mr-2" />
                Switch Direction
              </button>

              {/* First Row as Header Checkbox (only for CSV to JSON) */}
              {conversionDirection === 'csv-to-json' && (
                <label className="flex items-center text-sm text-primary-text dark:text-dark-primary-text">
                  <input
                    type="checkbox"
                    checked={firstRowAsHeader}
                    onChange={(e) => setFirstRowAsHeader(e.target.checked)}
                    className="mr-2 border-2 border-border-color dark:border-dark-border-color"
                  />
                  First row as header
                </label>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div>
            <label
              htmlFor="input-data"
              className="block mb-1 font-semibold dark:text-dark-primary-text"
            >
              Input {conversionDirection === 'json-to-csv' ? 'JSON' : 'CSV'}:
            </label>
            <textarea
              id="input-data"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={
                conversionDirection === 'json-to-csv'
                  ? 'Paste your JSON array here...\nExample: [{"name":"John","age":30},{"name":"Jane","age":25}]'
                  : 'Paste your CSV data here...\nExample:\nname,age\nJohn,30\nJane,25'
              }
              className="w-full h-64 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
              spellCheck="false"
            />
          </div>

          {/* Conversion Button */}
          <div className="flex justify-center">
            <button
              onClick={handleConvert}
              className="px-4 py-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
            >
              Convert
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 border-2 border-red-500 dark:border-red-400 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Output Area */}
          {outputData && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="output-data"
                  className="block font-semibold dark:text-dark-primary-text"
                >
                  Output{' '}
                  {conversionDirection === 'json-to-csv' ? 'CSV' : 'JSON'}:
                </label>
                <button
                  onClick={handleCopy}
                  className="flex items-center px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  {copyIcon}
                  <span className="ml-2">{copyButtonText}</span>
                </button>
              </div>
              <textarea
                id="output-data"
                value={outputData}
                readOnly
                className="w-full h-64 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>
          )}
        </section>
      </div>

      {/* About JSON and CSV Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About JSON and CSV Conversion
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>JSON (JavaScript Object Notation)</strong> is a lightweight
            data-interchange format that is easy for humans to read and write
            and easy for machines to parse and generate.
          </p>
          <p>
            <strong>CSV (Comma-Separated Values)</strong> is a simple file
            format used to store tabular data, such as a spreadsheet or
            database.
          </p>
          <p className="mt-2">
            <strong>Conversion limitations:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              JSON to CSV works best with flat arrays of objects (no nested
              objects or arrays).
            </li>
            <li>
              CSV to JSON will create an array of objects (when using headers)
              or an array of arrays.
            </li>
            <li>
              Complex nested JSON structures may not convert properly to CSV
              format.
            </li>
            <li>
              CSV files with inconsistent columns may produce unexpected
              results.
            </li>
          </ul>
          <p className="mt-2">
            <strong>When to use:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Converting API responses (JSON) to spreadsheet format (CSV)</li>
            <li>Transforming spreadsheet data for use in web applications</li>
            <li>Data migration between different systems</li>
            <li>Quick data format conversion for analysis or reporting</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default JsonCsvConverterPage;

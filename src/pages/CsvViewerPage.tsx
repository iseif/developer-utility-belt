import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { FaFileUpload, FaTable } from 'react-icons/fa';

const CsvViewerPage: React.FC = () => {
  const [csvText, setCsvText] = useState<string>('');
  const [parsedData, setParsedData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [useFirstRowAsHeader, setUseFirstRowAsHeader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const rowsPerPage = 10;

  useEffect(() => {
    if (csvText.trim() === '') {
      setParsedData([]);
      setHeaders([]);
      setError(null);
      setTotalPages(1);
      setCurrentPage(1);
      return;
    }

    try {
      const result = Papa.parse<string[]>(csvText, {
        delimiter: '', // Auto-detect delimiter
        skipEmptyLines: true,
      });

      if (result.errors && result.errors.length > 0) {
        setError(`Parsing error: ${result.errors[0].message}`);
        setParsedData([]);
        setHeaders([]);
        return;
      }

      const data = result.data;
      
      if (data.length === 0) {
        setError('No data found in the CSV');
        setParsedData([]);
        setHeaders([]);
        return;
      }

      // Calculate total pages
      const dataRows = useFirstRowAsHeader ? data.slice(1) : data;
      setTotalPages(Math.max(1, Math.ceil(dataRows.length / rowsPerPage)));
      
      // Reset to first page when data changes
      setCurrentPage(1);
      
      // Set headers based on first row if useFirstRowAsHeader is true
      if (useFirstRowAsHeader && data.length > 0) {
        setHeaders(data[0]);
        setParsedData(data.slice(1));
      } else {
        // Generate default headers (Column 1, Column 2, etc.)
        if (data.length > 0) {
          const defaultHeaders = Array.from(
            { length: data[0].length },
            (_, i) => `Column ${i + 1}`
          );
          setHeaders(defaultHeaders);
          setParsedData(data);
        }
      }
      
      setError(null);
    } catch (err) {
      setError(`Failed to parse CSV: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setParsedData([]);
      setHeaders([]);
    }
  }, [csvText, useFirstRowAsHeader]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCsvText(content);
    };
    reader.onerror = () => {
      setError('Failed to read the file');
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearData = () => {
    setCsvText('');
    setParsedData([]);
    setHeaders([]);
    setError(null);
    setCurrentPage(1);
    setTotalPages(1);
  };

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return parsedData.slice(startIndex, endIndex);
  };

  // Pagination controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          CSV Viewer
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Parse CSV data and display it in a structured table format. Paste your CSV data or upload a CSV file to visualize it.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            CSV Input
          </h3>
          
          {/* Input Options */}
          <div className="flex flex-wrap gap-4 mb-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="use-header"
                checked={useFirstRowAsHeader}
                onChange={(e) => setUseFirstRowAsHeader(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="use-header" className="dark:text-dark-primary-text">
                Use first row as header
              </label>
            </div>
            
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 inline-flex items-center"
              >
                <FaFileUpload className="mr-2" /> Upload CSV File
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
              </label>
            </div>
            
            {csvText && (
              <button
                onClick={handleClearData}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Clear Data
              </button>
            )}
          </div>
          
          {/* Textarea for CSV input */}
          <div>
            <label
              htmlFor="csv-input"
              className="block mb-1 font-semibold dark:text-dark-primary-text"
            >
              Paste CSV data:
            </label>
            <textarea
              id="csv-input"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Paste your CSV data here..."
              className="w-full h-48 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
              spellCheck="false"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 border-2 border-red-300 dark:border-red-700 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
              {error}
            </div>
          )}
        </section>

        {/* CSV Table Output */}
        {parsedData.length > 0 && (
          <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text flex items-center">
              <FaTable className="mr-2" /> CSV Data
            </h3>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm dark:text-dark-primary-text">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    First
                  </button>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-border-color dark:border-dark-border-color">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    {headers.map((header, index) => (
                      <th
                        key={`header-${index}`}
                        className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageData().map((row, rowIndex) => (
                    <tr
                      key={`row-${rowIndex}`}
                      className={rowIndex % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : ''}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`cell-${rowIndex}-${cellIndex}`}
                          className="border-2 border-border-color dark:border-dark-border-color p-2 dark:text-dark-primary-text"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* About CSV Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About CSV
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>CSV (Comma-Separated Values)</strong> is a simple file format used to store tabular data, such as a spreadsheet or database. Each line of the file is a data record consisting of one or more fields, separated by commas.
          </p>
          <p>
            <strong>CSV format rules:</strong>
          </p>
          <ul className="list-none space-y-1">
            <li>• Fields are separated by commas</li>
            <li>• Records are separated by newlines</li>
            <li>• Fields containing commas, newlines, or double quotes should be enclosed in double quotes</li>
            <li>• A double quote in a field must be represented by two double quotes</li>
          </ul>
          <p className="mt-2">
            <strong>Common uses:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Data exchange between different applications</li>
            <li>Exporting data from spreadsheets and databases</li>
            <li>Importing data into data analysis tools</li>
            <li>Simple data storage for tabular information</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CsvViewerPage;

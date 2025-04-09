import React, { useEffect, useState } from 'react';
import {
  format,
  formatISO,
  fromUnixTime,
  getUnixTime,
  isValid,
  parse,
  parseISO,
} from 'date-fns';

const TimestampConverterPage: React.FC = () => {
  const [timestampInput, setTimestampInput] = useState<string>('');
  const [isMilliseconds, setIsMilliseconds] = useState<boolean>(false);
  const [dateStringInput, setDateStringInput] = useState<string>('');

  const [readableOutput, setReadableOutput] = useState<string>('');
  const [timestampOutput, setTimestampOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [currentTimestamp, setCurrentTimestamp] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
  const [commonFormats, setCommonFormats] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const generateCommonFormats = (dateObject: Date) => {
    if (!isValid(dateObject))
      return {
        iso: '',
        rfc2822: '',
        full: '',
        dateOnly: '',
        timeOnly: '',
      };
    return {
      iso: formatISO(dateObject),
      // Use format with the correct string for RFC 2822 / RFC 1123
      rfc2822: format(dateObject, 'EEE, dd MMM yyyy HH:mm:ss xx'),
      full: format(dateObject, 'EEEE, MMMM d, yyyy HH:mm:ss'),
      dateOnly: format(dateObject, 'MM/dd/yyyy'),
      timeOnly: format(dateObject, 'hh:mm:ss a'),
    };
  };

  const handleGetCurrentTimestamp = () => {
    const nowMs = Date.now();
    const nowSec = Math.floor(nowMs / 1000);
    setTimestampInput(isMilliseconds ? String(nowMs) : String(nowSec));
    setError('');
    setReadableOutput('');
    setTimestampOutput('');
    setCommonFormats({});
  };

  const handleConvertToReadable = () => {
    setError('');
    setReadableOutput('');
    setCommonFormats({});

    try {
      const numTimestamp = Number(timestampInput);
      if (isNaN(numTimestamp) || !Number.isFinite(numTimestamp)) {
        throw new Error('Invalid timestamp number.');
      }

      const timestampInSeconds = isMilliseconds
        ? Math.floor(numTimestamp / 1000)
        : numTimestamp;
      const dateObject = fromUnixTime(timestampInSeconds);

      if (!isValid(dateObject)) {
        throw new Error('Invalid date generated from timestamp.');
      }

      const formattedLocal = format(dateObject, "yyyy-MM-dd HH:mm:ss 'Local'");
      const formattedUtc = format(
        new Date(dateObject.valueOf() + dateObject.getTimezoneOffset() * 60000),
        "yyyy-MM-dd HH:mm:ss 'UTC'"
      );
      setReadableOutput(`Local: ${formattedLocal}\nUTC:   ${formattedUtc}`);

      setCommonFormats(generateCommonFormats(dateObject));
    } catch (err) {
      setError(
        `Timestamp Conversion Error: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
      setReadableOutput('');
      setCommonFormats({});
    }
  };

  const handleConvertToTimestamp = () => {
    setError('');
    setTimestampOutput('');
    setCommonFormats({});

    try {
      let dateObject = parseISO(dateStringInput);
      if (!isValid(dateObject)) {
        dateObject = parse(dateStringInput, 'yyyy-MM-dd HH:mm:ss', new Date());
      }
      if (!isValid(dateObject)) {
        dateObject = parse(dateStringInput, 'MM/dd/yyyy hh:mm a', new Date());
      }

      if (!isValid(dateObject)) {
        throw new Error(
          'Could not parse the date string. Try ISO format (YYYY-MM-DDTHH:mm:ssZ) or yyyy-MM-dd HH:mm:ss.'
        );
      }

      const timestampSec = getUnixTime(dateObject);
      const timestampMs = dateObject.getTime();
      setTimestampOutput(
        `Seconds: ${timestampSec}\nMilliseconds: ${timestampMs}`
      );

      setCommonFormats(generateCommonFormats(dateObject));
    } catch (err) {
      setError(
        `Date String Conversion Error: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
      setTimestampOutput('');
      setCommonFormats({});
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Timestamp Converter
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Convert between Unix timestamps and human-readable date formats.
          Supports both seconds and milliseconds timestamp formats.
        </p>
      </header>

      <div className="space-y-6">
        {/* Current Timestamp Display */}
        <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid text-center">
          <span className="font-semibold dark:text-dark-primary-text">
            Current Unix Timestamp (Seconds):{' '}
          </span>
          <span className="font-mono text-lg text-primary-text dark:text-dark-primary-text">
            {currentTimestamp}
          </span>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-100 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-100 dark:border-red-400">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {/* Conversion Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timestamp -> Readable Date */}
          <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
              Timestamp to Readable Date
            </h3>
            <div>
              <label
                htmlFor="timestamp-input"
                className="block mb-1 font-semibold dark:text-dark-primary-text"
              >
                Unix Timestamp:
              </label>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <input
                  type="text"
                  id="timestamp-input"
                  value={timestampInput}
                  onChange={(e) => setTimestampInput(e.target.value)}
                  placeholder="e.g., 1678886400"
                  className="flex-grow p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner min-w-[150px]"
                />
                <div className="flex items-center gap-2 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid p-1">
                  <label className="flex items-center gap-1 dark:text-dark-primary-text cursor-pointer">
                    <input
                      type="radio"
                      name="unit"
                      value="seconds"
                      checked={!isMilliseconds}
                      onChange={() => setIsMilliseconds(false)}
                    />{' '}
                    Sec
                  </label>
                  <label className="flex items-center gap-1 dark:text-dark-primary-text cursor-pointer">
                    <input
                      type="radio"
                      name="unit"
                      value="milliseconds"
                      checked={isMilliseconds}
                      onChange={() => setIsMilliseconds(true)}
                    />{' '}
                    Ms
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleConvertToReadable}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
                >
                  Convert to Date
                </button>
                <button
                  onClick={handleGetCurrentTimestamp}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Get Current
                </button>
              </div>
            </div>
            {readableOutput && (
              <div>
                <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                  Converted Date:
                </label>
                <pre className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner whitespace-pre-wrap">
                  {readableOutput}
                </pre>
              </div>
            )}
          </section>

          {/* Readable Date -> Timestamp */}
          <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
              Readable Date to Timestamp
            </h3>
            <div>
              <label
                htmlFor="date-string-input"
                className="block mb-1 font-semibold dark:text-dark-primary-text"
              >
                Date String:
              </label>
              <input
                type="text"
                id="date-string-input"
                value={dateStringInput}
                onChange={(e) => setDateStringInput(e.target.value)}
                placeholder="e.g., 2023-03-15 16:00:00"
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner mb-2"
              />
              <button
                onClick={handleConvertToTimestamp}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
              >
                Convert to Timestamp
              </button>
            </div>
            {timestampOutput && (
              <div>
                <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                  Converted Timestamp:
                </label>
                <pre className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner whitespace-pre-wrap">
                  {timestampOutput}
                </pre>
              </div>
            )}
          </section>
        </div>

        {/* Common Formats Display */}
        {Object.keys(commonFormats).length > 0 && (
          <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
              Common Date Formats
            </h3>
            <ul className="space-y-1 list-none">
              {Object.entries(commonFormats).map(([key, value]) => (
                <li
                  key={key}
                  className="font-mono text-sm text-primary-text dark:text-dark-primary-text"
                >
                  {/* Use min-w for consistent label width */}
                  <span className="font-semibold inline-block min-w-[80px] mr-2">
                    {key.toUpperCase()}:
                  </span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* About Timestamps Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Timestamps
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Unix Timestamps</strong> represent time as the number of
            seconds that have elapsed since January 1, 1970, at 00:00:00 UTC
            (the Unix Epoch).
          </p>
          <p>
            <strong>Common timestamp formats:</strong>
          </p>
          <ul className="list-none space-y-1 font-mono text-xs">
            <li>
              <span className="inline-block w-36">
                Unix Timestamp (seconds):
              </span>{' '}
              <span className="text-gray-500">e.g.,</span> 1617184800
            </li>
            <li>
              <span className="inline-block w-36">
                Unix Timestamp (milliseconds):
              </span>{' '}
              <span className="text-gray-500">e.g.,</span> 1617184800000
            </li>
          </ul>
          <p className="mt-2">
            <strong>When to use:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Storing dates in databases</li>
            <li>Calculating time differences</li>
            <li>
              Ensuring consistent time representation across different systems
            </li>
            <li>Working with APIs that use timestamp formats</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TimestampConverterPage;

import React, { useState } from 'react';
import * as UAParserJS from 'ua-parser-js';

const UserAgentParserPage: React.FC = () => {
  const [userAgentString, setUserAgentString] = useState<string>('');
  const [parserResult, setParserResult] = useState<UAParserJS.IResult | null>(
    null
  );
  const [currentUserAgent, setCurrentUserAgent] = useState<string>('');

  // Get the current browser's user agent on component mount
  React.useEffect(() => {
    const currentUA = navigator.userAgent;
    setCurrentUserAgent(currentUA);
  }, []);

  const handleParse = () => {
    if (!userAgentString.trim()) return;

    const parser = new UAParserJS.UAParser(userAgentString);
    const result = parser.getResult();
    setParserResult(result);
  };

  const handleUseCurrentUA = () => {
    setUserAgentString(currentUserAgent);

    const parser = new UAParserJS.UAParser(currentUserAgent);
    const result = parser.getResult();
    setParserResult(result);
  };

  const handleClear = () => {
    setUserAgentString('');
    setParserResult(null);
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          User Agent String Parser
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Parse and analyze User Agent strings to extract browser, operating
          system, and device information.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            User Agent Input
          </h3>
          <div>
            <label
              htmlFor="user-agent-input"
              className="block mb-1 font-semibold dark:text-dark-primary-text"
            >
              Enter User Agent String:
            </label>
            <textarea
              id="user-agent-input"
              value={userAgentString}
              onChange={(e) => setUserAgentString(e.target.value)}
              placeholder="Paste a User Agent string here..."
              className="w-full h-24 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
              spellCheck="false"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleParse}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
            >
              Parse
            </button>
            <button
              onClick={handleUseCurrentUA}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              Use Current Browser UA
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
        </section>

        {parserResult && (
          <section className="space-y-4 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
              Parsed Results
            </h3>

            {/* Browser Information */}
            <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-50 dark:bg-gray-800">
              <h4 className="font-bold text-primary-text dark:text-dark-primary-text mb-2">
                Browser
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-sm">
                <div>
                  <span className="font-semibold">Name: </span>
                  <span>{parserResult.browser.name || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-semibold">Version: </span>
                  <span>{parserResult.browser.version || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-semibold">Major: </span>
                  <span>{parserResult.browser.major || 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* OS Information */}
            <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-50 dark:bg-gray-800">
              <h4 className="font-bold text-primary-text dark:text-dark-primary-text mb-2">
                Operating System
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-sm">
                <div>
                  <span className="font-semibold">Name: </span>
                  <span>{parserResult.os.name || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-semibold">Version: </span>
                  <span>{parserResult.os.version || 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* Device Information */}
            <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-50 dark:bg-gray-800">
              <h4 className="font-bold text-primary-text dark:text-dark-primary-text mb-2">
                Device
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-sm">
                <div>
                  <span className="font-semibold">Model: </span>
                  <span>{parserResult.device.model || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-semibold">Type: </span>
                  <span>{parserResult.device.type || 'Desktop/Laptop'}</span>
                </div>
                <div>
                  <span className="font-semibold">Vendor: </span>
                  <span>{parserResult.device.vendor || 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* Engine Information */}
            <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-50 dark:bg-gray-800">
              <h4 className="font-bold text-primary-text dark:text-dark-primary-text mb-2">
                Engine
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-sm">
                <div>
                  <span className="font-semibold">Name: </span>
                  <span>{parserResult.engine.name || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-semibold">Version: </span>
                  <span>{parserResult.engine.version || 'Unknown'}</span>
                </div>
              </div>
            </div>

            {/* CPU Information */}
            {parserResult.cpu && parserResult.cpu.architecture && (
              <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-50 dark:bg-gray-800">
                <h4 className="font-bold text-primary-text dark:text-dark-primary-text mb-2">
                  CPU
                </h4>
                <div className="font-mono text-sm">
                  <span className="font-semibold">Architecture: </span>
                  <span>{parserResult.cpu.architecture || 'Unknown'}</span>
                </div>
              </div>
            )}

            {/* Raw UA String */}
            <div className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-50 dark:bg-gray-800">
              <h4 className="font-bold text-primary-text dark:text-dark-primary-text mb-2">
                Raw User Agent String
              </h4>
              <div className="font-mono text-xs break-all whitespace-pre-wrap">
                {parserResult.ua}
              </div>
            </div>
          </section>
        )}

        {/* About User Agent Strings Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About User Agent Strings
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>User Agent strings</strong> are identifiers that web
              browsers and other applications send to websites to help identify
              themselves. They typically contain information about:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Browser name and version</li>
              <li>Operating system and version</li>
              <li>Device type and model (especially on mobile devices)</li>
              <li>Rendering engine</li>
            </ul>
            <p className="mt-2">
              <strong>Example User Agent string:</strong>
            </p>
            <pre className="p-2 bg-gray-100 dark:bg-gray-800 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
              Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
              (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
            </pre>
            <p className="mt-2">
              <strong>Common uses:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Browser detection for compatibility</li>
              <li>Analytics and statistics</li>
              <li>Content adaptation for different devices</li>
              <li>Debugging browser-specific issues</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserAgentParserPage;

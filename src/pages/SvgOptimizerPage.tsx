import React, { useState } from 'react';
import { optimize } from 'svgo';

const SvgOptimizerPage: React.FC = () => {
  const [inputSvg, setInputSvg] = useState<string>('');
  const [outputSvg, setOutputSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [copyButtonText, setCopyButtonText] =
    useState<string>('Copy Optimized SVG');
  const [stats, setStats] = useState<{
    original: number;
    optimized: number;
    savings: number;
  } | null>(null);

  const handleOptimize = async () => {
    setError('');
    setOutputSvg('');
    setStats(null);
    setIsOptimizing(true);
    setCopyButtonText('Copy Optimized SVG');

    try {
      if (!inputSvg.trim()) {
        throw new Error('Please enter SVG code to optimize.');
      }

      // Check if input contains SVG
      if (!inputSvg.includes('<svg') && !inputSvg.includes('<?xml')) {
        throw new Error('Input does not appear to be valid SVG code.');
      }

      const originalSize = new Blob([inputSvg]).size;

      const result = optimize(inputSvg, {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                // Keep viewBox attribute
                removeViewBox: false,
              },
            },
          },
          'removeDimensions',
          {
            name: 'convertPathData',
            params: {
              floatPrecision: 2,
            },
          },
        ],
      });

      const optimizedSvg = result.data;
      const optimizedSize = new Blob([optimizedSvg]).size;
      const savings =
        originalSize > 0
          ? ((originalSize - optimizedSize) / originalSize) * 100
          : 0;

      setOutputSvg(optimizedSvg);
      setStats({
        original: originalSize,
        optimized: optimizedSize,
        savings: savings,
      });
    } catch (err) {
      console.error('SVG optimization error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown error occurred during optimization.'
      );
      setOutputSvg('');
      setStats(null);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleCopy = async () => {
    if (!outputSvg) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy Optimized SVG'), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(outputSvg);
      setCopyButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => setCopyButtonText('Copy Optimized SVG'), 2000);
    }
  };

  const handleDownload = () => {
    if (!outputSvg) return;

    const blob = new Blob([outputSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          SVG Optimizer
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Optimize SVG files by removing unnecessary data and reducing file size
          while preserving appearance. Paste your SVG code below to get started.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            SVG Optimizer
          </h3>

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
                  htmlFor="input-svg"
                  className="font-semibold dark:text-dark-primary-text"
                >
                  Input SVG:
                </label>
                <span></span>
              </div>
              <textarea
                id="input-svg"
                value={inputSvg}
                onChange={(e) => setInputSvg(e.target.value)}
                placeholder="Paste your SVG code here..."
                className="w-full h-96 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
                disabled={isOptimizing}
              />
            </div>

            {/* Output Area */}
            <div>
              <div className="flex justify-between items-center mb-1 min-h-[36px]">
                <label
                  htmlFor="output-svg"
                  className="font-semibold dark:text-dark-primary-text"
                >
                  Optimized SVG:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={
                      !outputSvg && copyButtonText !== 'Nothing to Copy'
                    }
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyButtonText}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!outputSvg}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Download
                  </button>
                </div>
              </div>
              <textarea
                id="output-svg"
                value={outputSvg}
                readOnly
                placeholder="Optimized SVG code will appear here..."
                className="w-full h-96 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Optimization Stats */}
          {stats && (
            <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid mt-4">
              <h4 className="font-semibold mb-2 dark:text-dark-primary-text">
                Optimization Results:
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-semibold dark:text-dark-primary-text">
                    Original Size
                  </div>
                  <div className="text-lg font-mono">
                    {formatFileSize(stats.original)}
                  </div>
                </div>
                <div>
                  <div className="font-semibold dark:text-dark-primary-text">
                    Optimized Size
                  </div>
                  <div className="text-lg font-mono">
                    {formatFileSize(stats.optimized)}
                  </div>
                </div>
                <div>
                  <div className="font-semibold dark:text-dark-primary-text">
                    Size Reduction
                  </div>
                  <div className="text-lg font-mono text-green-600 dark:text-green-400">
                    {stats.savings.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleOptimize}
              disabled={isOptimizing || !inputSvg.trim()}
              className="px-6 py-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOptimizing ? 'Optimizing...' : 'Optimize SVG'}
            </button>
          </div>
        </section>
      </div>

      {/* About SVG Optimization Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About SVG Optimization
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>SVG Optimization</strong> is the process of reducing the
            file size of SVG (Scalable Vector Graphics) files while maintaining
            visual quality.
          </p>
          <p>
            <strong>Benefits of SVG optimization:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Reduced file size for faster loading times</li>
            <li>Improved website performance</li>
            <li>Lower bandwidth usage</li>
            <li>Better SEO ranking due to faster page loads</li>
            <li>Cleaner code that's easier to work with</li>
          </ul>
          <p className="mt-2">
            <strong>What gets optimized:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              Removal of unnecessary metadata, comments, and hidden elements
            </li>
            <li>Optimization of path data with reduced precision</li>
            <li>Collapsing of useless groups</li>
            <li>Merging of path commands</li>
            <li>Removal of unused namespaces and IDs</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SvgOptimizerPage;

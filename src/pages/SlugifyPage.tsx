import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaCheck, FaClipboard } from 'react-icons/fa';

const SlugifyPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputSlug, setOutputSlug] = useState<string>('');
  const [separator, setSeparator] = useState<string>('-');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy');
  const [copyIcon, setCopyIcon] = useState<React.ReactNode>(<FaClipboard />);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slugify = useCallback((text: string, sep: string): string => {
    if (!text) return '';

    return text
      .toString()
      .normalize('NFD') // Normalize to decomposed form for handling accents
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics/accents
      .toLowerCase() // Convert to lowercase
      .trim() // Trim whitespace from both ends
      .replace(/\s+/g, sep) // Replace spaces with separator
      .replace(/[^\w-]+/g, '') // Remove all non-word chars except hyphens
      .replace(/--+/g, sep) // Replace multiple separators with single separator
      .replace(new RegExp(`^${sep}+|${sep}+$`, 'g'), ''); // Remove leading/trailing separator
  }, []);

  // Create the debounced function inside useCallback
  const debouncedSlugify = useCallback(
    (text: string, sep: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setOutputSlug(slugify(text, sep));
      }, 300);
    },
    [slugify]
  );

  // Update slug when input or separator changes
  useEffect(() => {
    debouncedSlugify(inputText, separator);

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputText, separator, debouncedSlugify]);

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (!outputSlug) {
      setCopyButtonText('Nothing to copy');
      setCopyIcon(<FaClipboard />);
      setTimeout(() => {
        setCopyButtonText('Copy');
        setCopyIcon(<FaClipboard />);
      }, 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(outputSlug);
      setCopyButtonText('Copied!');
      setCopyIcon(<FaCheck />);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy failed!');
    } finally {
      setTimeout(() => {
        setCopyButtonText('Copy');
        setCopyIcon(<FaClipboard />);
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Slugify Text
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Convert text into URL-friendly slugs by removing special characters,
          replacing spaces with separators, and converting to lowercase.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Slugify Tool
          </h3>

          {/* Separator Selection */}
          <div className="mb-4">
            <label className="font-semibold dark:text-dark-primary-text block mb-2">
              Separator:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="separator"
                  value="-"
                  checked={separator === '-'}
                  onChange={() => setSeparator('-')}
                  className="form-radio"
                />
                <span className="dark:text-dark-primary-text">Hyphen (-)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="separator"
                  value="_"
                  checked={separator === '_'}
                  onChange={() => setSeparator('_')}
                  className="form-radio"
                />
                <span className="dark:text-dark-primary-text">
                  Underscore (_)
                </span>
              </label>
            </div>
          </div>

          {/* Input/Output Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1 min-h-[36px]">
                <label
                  htmlFor="input-text"
                  className="font-semibold dark:text-dark-primary-text"
                >
                  Input Text:
                </label>
                <span></span>
              </div>
              <textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to slugify..."
                className="w-full h-40 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 min-h-[36px]">
                <label
                  htmlFor="output-slug"
                  className="font-semibold dark:text-dark-primary-text"
                >
                  Slug:
                </label>
                <button
                  onClick={handleCopy}
                  disabled={!outputSlug}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <span>{copyIcon}</span>
                  <span>{copyButtonText}</span>
                </button>
              </div>
              <div className="mt-2">
                <textarea
                  id="output-slug"
                  value={outputSlug}
                  readOnly
                  placeholder="Slugified text will appear here..."
                  className="w-full h-40 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Slugs Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Slugs
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Slugs</strong> are URL-friendly versions of strings,
            typically used in web applications for creating clean, readable URLs
            from titles or other text content.
          </p>
          <p>
            <strong>Characteristics of a good slug:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Lowercase letters</li>
            <li>No special characters or spaces</li>
            <li>Words separated by hyphens (-) or underscores (_)</li>
            <li>No accents or diacritical marks</li>
            <li>Human-readable and SEO-friendly</li>
          </ul>
          <p className="mt-2">
            <strong>Common uses for slugs:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Blog post URLs (e.g., "my-awesome-blog-post")</li>
            <li>Product page URLs (e.g., "red-cotton-t-shirt")</li>
            <li>Category and tag URLs</li>
            <li>User profile URLs</li>
          </ul>
          <p className="mt-2">
            <strong>Benefits of using slugs:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Improved SEO as search engines prefer readable URLs</li>
            <li>Better user experience with descriptive URLs</li>
            <li>Easier sharing of links</li>
            <li>Avoids encoding issues with special characters</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SlugifyPage;

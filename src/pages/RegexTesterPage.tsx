import React, { useCallback, useEffect, useState } from 'react';

const RegexTesterPage: React.FC = () => {
  const [pattern, setPattern] = useState<string>('');
  const [flags, setFlags] = useState<string>('g');
  const [testString, setTestString] = useState<string>('');
  const [matches, setMatches] = useState<RegExpExecArray[]>([]);
  const [error, setError] = useState<string>('');
  const [highlightedText, setHighlightedText] = useState<React.ReactNode>(null);
  const [copyButtonTexts, setCopyButtonTexts] = useState<{
    [key: number]: string;
  }>({});

  // Flag checkboxes
  const [flagOptions, setFlagOptions] = useState({
    g: true, // global
    i: false, // case-insensitive
    m: false, // multiline
    s: false, // dotAll
    u: false, // unicode
    y: false, // sticky
  });

  // Debounce function to avoid excessive regex execution
  const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Update flags string when flag options change
  useEffect(() => {
    const newFlags = Object.entries(flagOptions)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, isEnabled]) => isEnabled)
      .map(([flag]) => flag)
      .join('');
    setFlags(newFlags);
  }, [flagOptions]);

  // Toggle individual flag
  const toggleFlag = (flag: keyof typeof flagOptions) => {
    setFlagOptions((prev) => ({
      ...prev,
      [flag]: !prev[flag],
    }));
  };

  // Execute regex and find matches
  const executeRegex = useCallback(() => {
    setError('');
    setMatches([]);
    setHighlightedText(null);
    setCopyButtonTexts({});

    if (!pattern || !testString) {
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpExecArray[] = [];

      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push({ ...match });
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          allMatches.push(match);
        }
      }

      setMatches(allMatches);
      highlightMatches(allMatches);

      // Initialize copy button texts
      const initialCopyTexts: { [key: number]: string } = {};
      allMatches.forEach((_, index) => {
        initialCopyTexts[index] = 'Copy';
      });
      setCopyButtonTexts(initialCopyTexts);
    } catch (err) {
      console.error('Regex error:', err);
      setError(
        err instanceof Error ? err.message : 'Invalid regular expression'
      );
    }
  }, [pattern, flags, testString]);

  // Debounced version of executeRegex
  const debouncedExecuteRegex = useCallback(debounce(executeRegex, 300), [
    executeRegex,
  ]);

  // Run regex when inputs change
  useEffect(() => {
    debouncedExecuteRegex();
  }, [pattern, flags, testString, debouncedExecuteRegex]);

  // Highlight matches in the test string
  const highlightMatches = (matches: RegExpExecArray[]) => {
    if (matches.length === 0 || !testString) {
      setHighlightedText(testString);
      return;
    }

    // Create an array of parts: matched and non-matched
    const parts: { text: string; isMatch: boolean; groupIndex?: number }[] = [];
    let lastIndex = 0;

    // Sort matches by index to ensure correct order
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    sortedMatches.forEach((match) => {
      // Add text before this match
      if (match.index > lastIndex) {
        parts.push({
          text: testString.substring(lastIndex, match.index),
          isMatch: false,
        });
      }

      // Add the matched text
      parts.push({
        text: match[0],
        isMatch: true,
        groupIndex: 0,
      });

      // Update lastIndex to end of this match
      lastIndex = match.index + match[0].length;
    });

    // Add any remaining text after the last match
    if (lastIndex < testString.length) {
      parts.push({
        text: testString.substring(lastIndex),
        isMatch: false,
      });
    }

    // Create React elements with appropriate styling
    const elements = parts.map((part, index) => {
      if (part.isMatch) {
        return (
          <span
            key={index}
            className="bg-yellow-300 dark:bg-yellow-700 rounded px-0.5"
          >
            {part.text}
          </span>
        );
      }
      return <span key={index}>{part.text}</span>;
    });

    setHighlightedText(<>{elements}</>);
  };

  // Copy match to clipboard
  const copyMatch = useCallback((text: string, index: number) => {
    if (!text) {
      setCopyButtonTexts((prev) => ({
        ...prev,
        [index]: 'Nothing to Copy',
      }));
      setTimeout(() => {
        setCopyButtonTexts((prev) => ({
          ...prev,
          [index]: 'Copy',
        }));
      }, 2000);
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyButtonTexts((prev) => ({
          ...prev,
          [index]: 'Copied!',
        }));
        setTimeout(() => {
          setCopyButtonTexts((prev) => ({
            ...prev,
            [index]: 'Copy',
          }));
        }, 2000);
      })
      .catch(() => {
        setCopyButtonTexts((prev) => ({
          ...prev,
          [index]: 'Failed to Copy',
        }));
        setTimeout(() => {
          setCopyButtonTexts((prev) => ({
            ...prev,
            [index]: 'Copy',
          }));
        }, 2000);
      });
  }, []);

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Regex Tester
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Test and debug regular expressions with real-time matching and
          highlighting. Visualize matches, capture groups, and test different
          regex flags.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Regex Tester
          </h3>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-100 dark:border-red-400">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* Pattern Input */}
          <div className="mb-4">
            <label
              htmlFor="pattern-input"
              className="block font-semibold mb-1 dark:text-dark-primary-text"
            >
              Regular Expression Pattern:
            </label>
            <input
              id="pattern-input"
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern (without / /)"
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono shadow-inner"
            />
          </div>

          {/* Flags Selection */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 dark:text-dark-primary-text">
              Flags:
            </label>
            <div className="flex flex-wrap gap-3">
              {Object.entries(flagOptions).map(([flag, isEnabled]) => (
                <label key={flag} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() =>
                      toggleFlag(flag as keyof typeof flagOptions)
                    }
                    className="mr-1"
                  />
                  <span className="font-mono dark:text-dark-primary-text">
                    {flag}
                  </span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400 text-xs">
                    {flag === 'g' && '(global)'}
                    {flag === 'i' && '(case-insensitive)'}
                    {flag === 'm' && '(multiline)'}
                    {flag === 's' && '(dotAll)'}
                    {flag === 'u' && '(unicode)'}
                    {flag === 'y' && '(sticky)'}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Effective flags: /{pattern}/{flags}
            </div>
          </div>

          {/* Test String Input */}
          <div className="mb-4">
            <label
              htmlFor="test-string"
              className="block font-semibold mb-1 dark:text-dark-primary-text"
            >
              Test String:
            </label>
            <textarea
              id="test-string"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test against the regex pattern"
              className="w-full h-40 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono shadow-inner"
              spellCheck="false"
            />
          </div>

          {/* Highlighted Matches Display */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 dark:text-dark-primary-text">
              Highlighted Matches:
            </label>
            <div className="w-full min-h-40 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono shadow-inner whitespace-pre-wrap">
              {highlightedText || (
                <span className="text-gray-400">
                  Matches will be highlighted here
                </span>
              )}
            </div>
          </div>

          {/* Match Results */}
          <div>
            <label className="block font-semibold mb-1 dark:text-dark-primary-text">
              Match Results ({matches.length}{' '}
              {matches.length === 1 ? 'match' : 'matches'} found):
            </label>
            {matches.length > 0 ? (
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <div
                    key={index}
                    className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-50 dark:bg-gray-800 shadow-inner"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold dark:text-dark-primary-text">
                        Match #{index + 1}
                      </span>
                      <button
                        onClick={() => copyMatch(match[0], index)}
                        className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {copyButtonTexts[index] || 'Copy'}
                      </button>
                    </div>
                    <div className="mt-1">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        Index: {match.index}, Length: {match[0].length}
                      </span>
                    </div>
                    <div className="mt-1 font-mono break-all">{match[0]}</div>

                    {/* Capture Groups */}
                    {match.length > 1 && (
                      <div className="mt-2">
                        <span className="text-sm font-semibold dark:text-dark-primary-text">
                          Capture Groups:
                        </span>
                        <div className="ml-2 mt-1 space-y-1">
                          {Array.from(
                            { length: match.length - 1 },
                            (_, i) => i + 1
                          ).map((groupIndex) => (
                            <div key={groupIndex} className="text-sm">
                              <span className="font-mono dark:text-dark-primary-text">
                                Group {groupIndex}:
                              </span>{' '}
                              <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">
                                {match[groupIndex] || '(empty)'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic">
                No matches found
              </div>
            )}
          </div>
        </section>
      </div>

      {/* About Regular Expressions Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Regular Expressions
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Regular Expressions</strong> (regex) are powerful pattern
            matching tools used for searching, validating, and manipulating
            text.
          </p>
          <p>
            <strong>Common regex patterns:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                \d
              </code>{' '}
              - Matches any digit (0-9)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                \w
              </code>{' '}
              - Matches any word character (a-z, A-Z, 0-9, _)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                \s
              </code>{' '}
              - Matches any whitespace character
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                [abc]
              </code>{' '}
              - Matches any character in the set
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                (abc)
              </code>{' '}
              - Creates a capture group
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                a{'{3}'}
              </code>{' '}
              - Matches 'a' exactly 3 times
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                a+
              </code>{' '}
              - Matches 'a' one or more times
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                a*
              </code>{' '}
              - Matches 'a' zero or more times
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                a?
              </code>{' '}
              - Matches 'a' zero or one time
            </li>
          </ul>
          <p className="mt-2">
            <strong>Flags:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                g
              </code>{' '}
              - Global: Find all matches rather than stopping after the first
              match
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                i
              </code>{' '}
              - Case-insensitive: Match regardless of case
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                m
              </code>{' '}
              - Multiline: ^ and $ match the start/end of each line
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                s
              </code>{' '}
              - DotAll: . matches newlines as well
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                u
              </code>{' '}
              - Unicode: Treat pattern as a sequence of Unicode code points
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                y
              </code>{' '}
              - Sticky: Match only from the index indicated by lastIndex
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default RegexTesterPage;

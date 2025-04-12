import React, { useCallback, useEffect, useState } from 'react';
import { FaRegCopy, FaRegFileCode, FaSearch } from 'react-icons/fa';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for regex pattern data
interface RegexPattern {
  pattern: string;
  description: string;
  example?: string;
  output?: string;
}

// Interface for pattern category
interface PatternCategory {
  title: string;
  patterns: RegexPattern[];
}

// Regex patterns organized by category
const regexPatternsData: PatternCategory[] = [
  {
    title: 'Anchors',
    patterns: [
      {
        pattern: '^',
        description: 'Matches the start of a string',
        example: '/^hello/g',
        output: 'Matches "hello" only at the beginning of a string',
      },
      {
        pattern: '$',
        description: 'Matches the end of a string',
        example: '/world$/g',
        output: 'Matches "world" only at the end of a string',
      },
      {
        pattern: '\\b',
        description:
          'Word boundary - matches positions where a word character is followed or preceded by a non-word character',
        example: '/\\bword\\b/g',
        output: 'Matches "word" as a complete word',
      },
      {
        pattern: '\\B',
        description:
          "Non-word boundary - matches positions where \\b doesn't match",
        example: '/\\Bword\\B/g',
        output: 'Matches "word" only when it\'s part of a larger word',
      },
    ],
  },
  {
    title: 'Character Classes',
    patterns: [
      {
        pattern: '.',
        description: 'Matches any character except newline',
        example: '/h.t/g',
        output: 'Matches "hat", "hot", "h t", etc.',
      },
      {
        pattern: '\\d',
        description: 'Matches any digit (0-9)',
        example: '/\\d{3}/g',
        output: 'Matches any three consecutive digits',
      },
      {
        pattern: '\\D',
        description: 'Matches any non-digit character',
        example: '/\\D+/g',
        output: 'Matches one or more non-digit characters',
      },
      {
        pattern: '\\w',
        description: 'Matches any word character (alphanumeric + underscore)',
        example: '/\\w+/g',
        output: 'Matches one or more word characters',
      },
      {
        pattern: '\\W',
        description: 'Matches any non-word character',
        example: '/\\W+/g',
        output: 'Matches one or more non-word characters',
      },
      {
        pattern: '\\s',
        description:
          'Matches any whitespace character (spaces, tabs, line breaks)',
        example: '/\\s+/g',
        output: 'Matches one or more whitespace characters',
      },
      {
        pattern: '\\S',
        description: 'Matches any non-whitespace character',
        example: '/\\S+/g',
        output: 'Matches one or more non-whitespace characters',
      },
      {
        pattern: '[abc]',
        description: 'Character set - matches any character in the brackets',
        example: '/[aeiou]/g',
        output: 'Matches any vowel',
      },
      {
        pattern: '[^abc]',
        description:
          'Negated character set - matches any character not in the brackets',
        example: '/[^aeiou]/g',
        output: 'Matches any character that is not a vowel',
      },
      {
        pattern: '[a-z]',
        description:
          'Character range - matches any character in the specified range',
        example: '/[a-z]/g',
        output: 'Matches any lowercase letter',
      },
      {
        pattern: '[0-9]',
        description: 'Digit range - matches any digit in the specified range',
        example: '/[0-9]/g',
        output: 'Matches any digit (same as \\d)',
      },
    ],
  },
  {
    title: 'Quantifiers',
    patterns: [
      {
        pattern: '*',
        description: 'Matches 0 or more occurrences of the preceding element',
        example: '/a*/g',
        output: 'Matches "", "a", "aa", "aaa", etc.',
      },
      {
        pattern: '+',
        description: 'Matches 1 or more occurrences of the preceding element',
        example: '/a+/g',
        output: 'Matches "a", "aa", "aaa", etc.',
      },
      {
        pattern: '?',
        description: 'Matches 0 or 1 occurrence of the preceding element',
        example: '/colou?r/g',
        output: 'Matches "color" and "colour"',
      },
      {
        pattern: '{n}',
        description: 'Matches exactly n occurrences of the preceding element',
        example: '/a{3}/g',
        output: 'Matches "aaa"',
      },
      {
        pattern: '{n,}',
        description: 'Matches n or more occurrences of the preceding element',
        example: '/a{2,}/g',
        output: 'Matches "aa", "aaa", "aaaa", etc.',
      },
      {
        pattern: '{n,m}',
        description:
          'Matches between n and m occurrences of the preceding element',
        example: '/a{2,4}/g',
        output: 'Matches "aa", "aaa", and "aaaa"',
      },
      {
        pattern: '*?',
        description:
          'Lazy version of * - matches as few occurrences as possible',
        example: '/<.*?>/g',
        output:
          'Matches HTML tags individually rather than all content between first and last tag',
      },
      {
        pattern: '+?',
        description:
          'Lazy version of + - matches as few occurrences as possible',
        example: '/<.+?>/g',
        output:
          'Matches HTML tags individually rather than all content between first and last tag',
      },
      {
        pattern: '??',
        description:
          'Lazy version of ? - matches as few occurrences as possible',
        example: '/colou??r/g',
        output: 'Prefers to match "color" over "colour" if both are possible',
      },
    ],
  },
  {
    title: 'Grouping and Capturing',
    patterns: [
      {
        pattern: '(abc)',
        description:
          'Capturing group - groups multiple tokens together and creates a capture group',
        example: '/(\\w+)@(\\w+)\\.com/g',
        output: 'Captures username and domain in an email address',
      },
      {
        pattern: '(?:abc)',
        description:
          'Non-capturing group - groups multiple tokens together without creating a capture group',
        example: '/(?:https?|ftp):\\/\\//g',
        output:
          'Matches "http://", "https://", or "ftp://" without capturing the protocol',
      },
      {
        pattern: '(?<name>abc)',
        description:
          'Named capturing group - creates a capture group with a specific name',
        example: '/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g',
        output: 'Captures year, month, and day from a date with named groups',
      },
      {
        pattern: '\\1',
        description: 'Backreference - refers to a previous capturing group',
        example: '/(\\w+)\\s+\\1/g',
        output: 'Matches repeated words like "hello hello"',
      },
    ],
  },
  {
    title: 'Alternation',
    patterns: [
      {
        pattern: '|',
        description:
          'Alternation - matches either the expression before or after the |',
        example: '/cat|dog/g',
        output: 'Matches "cat" or "dog"',
      },
      {
        pattern: '(net|com|org)',
        description: 'Alternation within a group',
        example: '/\\w+\\.(net|com|org)/g',
        output: 'Matches domain names ending with .net, .com, or .org',
      },
    ],
  },
  {
    title: 'Lookarounds',
    patterns: [
      {
        pattern: '(?=abc)',
        description:
          'Positive lookahead - matches a position followed by the specified pattern',
        example: '/\\w+(?=ing)/g',
        output:
          'Matches words that are followed by "ing" (without including "ing")',
      },
      {
        pattern: '(?!abc)',
        description:
          'Negative lookahead - matches a position not followed by the specified pattern',
        example: '/\\d+(?!\\.)/g',
        output: 'Matches numbers that are not followed by a decimal point',
      },
      {
        pattern: '(?<=abc)',
        description:
          'Positive lookbehind - matches a position preceded by the specified pattern',
        example: '/(?<=\\$)\\d+/g',
        output:
          'Matches numbers that are preceded by a dollar sign (without including the dollar sign)',
      },
      {
        pattern: '(?<!abc)',
        description:
          'Negative lookbehind - matches a position not preceded by the specified pattern',
        example: '/(?<!\\$)\\d+/g',
        output: 'Matches numbers that are not preceded by a dollar sign',
      },
    ],
  },
  {
    title: 'Flags/Modifiers',
    patterns: [
      {
        pattern: 'g',
        description:
          'Global flag - find all matches rather than stopping after the first match',
        example: '/abc/g',
        output: 'Finds all occurrences of "abc"',
      },
      {
        pattern: 'i',
        description:
          'Case-insensitive flag - makes the pattern case-insensitive',
        example: '/abc/i',
        output: 'Matches "abc", "Abc", "ABC", etc.',
      },
      {
        pattern: 'm',
        description:
          'Multiline flag - makes ^ and $ match the start/end of each line',
        example: '/^abc/m',
        output: 'Matches "abc" at the start of any line',
      },
      {
        pattern: 's',
        description: 'Dotall flag - makes . match newlines as well',
        example: '/a.b/s',
        output:
          'Matches "a" followed by any character (including newline) followed by "b"',
      },
      {
        pattern: 'u',
        description:
          'Unicode flag - treats the pattern as a sequence of Unicode code points',
        example: '/\\u{1F600}/u',
        output: 'Matches the 😀 emoji',
      },
      {
        pattern: 'y',
        description: 'Sticky flag - matches only from the lastIndex position',
        example: '/abc/y',
        output: 'Matches "abc" only at the current position in the string',
      },
    ],
  },
  {
    title: 'Escaping Special Characters',
    patterns: [
      {
        pattern: '\\',
        description: 'Escape character - used to escape special characters',
        example: '/\\*\\+\\?/g',
        output: 'Matches "*+?" literally',
      },
      {
        pattern: '\\.',
        description: 'Escaped period - matches a literal period',
        example: '/example\\.com/g',
        output: 'Matches "example.com" literally',
      },
      {
        pattern: '\\[',
        description: 'Escaped bracket - matches a literal opening bracket',
        example: '/\\[text\\]/g',
        output: 'Matches "[text]" literally',
      },
    ],
  },
  {
    title: 'Common Patterns',
    patterns: [
      {
        pattern: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$',
        description: 'Email validation',
        example: '/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/',
        output: 'Validates email addresses like "user@example.com"',
      },
      {
        pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
        description:
          'Password validation (minimum 8 characters, at least one letter and one number)',
        example: '/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/',
        output: 'Validates passwords that meet the criteria',
      },
      {
        pattern:
          '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
        description: 'URL validation',
        example:
          '/^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$/',
        output: 'Validates URLs like "https://example.com/path"',
      },
      {
        pattern: '^\\d{3}-\\d{3}-\\d{4}$',
        description: 'US phone number validation (XXX-XXX-XXXX format)',
        example: '/^\\d{3}-\\d{3}-\\d{4}$/',
        output: 'Validates phone numbers like "123-456-7890"',
      },
      {
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        description: 'Date validation (YYYY-MM-DD format)',
        example: '/^\\d{4}-\\d{2}-\\d{2}$/',
        output: 'Validates dates like "2023-01-31"',
      },
    ],
  },
];

const RegexCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] =
    useState<PatternCategory[]>(regexPatternsData);
  const [copyStatus, setCopyStatus] = useState<{
    [key: string]: string;
  }>({});

  // Filter patterns based on search query
  const filterPatterns = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(regexPatternsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = regexPatternsData
      .map((category) => {
        const matchedPatterns = category.patterns.filter(
          (pattern) =>
            pattern.pattern.toLowerCase().includes(query) ||
            pattern.description.toLowerCase().includes(query) ||
            (pattern.example &&
              pattern.example.toLowerCase().includes(query)) ||
            (pattern.output && pattern.output.toLowerCase().includes(query))
        );

        return {
          ...category,
          patterns: matchedPatterns,
        };
      })
      .filter((category) => category.patterns.length > 0);

    setFilteredData(filtered);
  }, [searchQuery]);

  // Apply filtering when search query changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      filterPatterns();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterPatterns]);

  // Handle copy to clipboard
  const handleCopy = async (text: string, patternId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [patternId]: '✓' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [patternId]: '' }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus({ ...copyStatus, [patternId]: 'Failed!' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [patternId]: '' }));
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          <FaRegFileCode className="inline-block mr-2" /> Regular Expressions
          (Regex) Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference for regular expression syntax, patterns, and
          examples. Click the copy button to copy any pattern to your clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={regexPatternsData} />

      {/* Search Bar */}
      <div className="mb-6 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patterns, descriptions, or examples..."
              className="w-full p-2 pl-10 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-inner"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="ml-2 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Patterns by Category */}
      <div className="space-y-8">
        {filteredData.length > 0 ? (
          filteredData.map((category) => (
            <section
              key={category.title}
              id={category.title.replace(/\s+/g, '-').toLowerCase()}
              className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid"
            >
              <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.patterns.map((pattern, index) => {
                  const patternId = `${category.title}-${index}`;
                  return (
                    <div
                      key={patternId}
                      className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded flex justify-between items-center">
                            <code className="text-primary-text dark:text-dark-primary-text">
                              {pattern.pattern}
                            </code>
                            <button
                              onClick={() =>
                                handleCopy(pattern.pattern, patternId)
                              }
                              className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                              title="Copy to clipboard"
                            >
                              {copyStatus[patternId] ? (
                                <span className="text-xs">
                                  {copyStatus[patternId]}
                                </span>
                              ) : (
                                <FaRegCopy />
                              )}
                            </button>
                          </div>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            {pattern.description}
                          </p>
                          {pattern.example && (
                            <div className="mt-2 font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-400">
                              Example: {pattern.example}
                            </div>
                          )}
                          {pattern.output && (
                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
                              Result: {pattern.output}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        ) : (
          <div className="p-4 text-center border-2 border-border-color dark:border-dark-border-color">
            <p className="text-gray-700 dark:text-gray-300">
              No patterns found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* About Regex Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Regular Expressions
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Regular expressions (regex)</strong> are powerful patterns
            used to match character combinations in strings. They are widely
            used for string searching, validation, and manipulation in
            programming languages.
          </p>
          <p>
            <strong>Key features of regex:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Pattern matching with metacharacters</li>
            <li>Capturing and non-capturing groups</li>
            <li>Lookahead and lookbehind assertions</li>
            <li>Quantifiers for repetition</li>
            <li>Character classes and ranges</li>
            <li>Flags for modifying pattern behavior</li>
          </ul>
          <p className="mt-2">
            This cheat sheet focuses on JavaScript's implementation of regular
            expressions, but most patterns work similarly across different
            programming languages with minor variations.
          </p>
          <p className="mt-2">
            For more information, visit the{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              MDN Web Docs on Regular Expressions
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegexCheatSheetPage;

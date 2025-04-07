import React, { useState, useCallback, useMemo } from 'react';

interface TextCounts {
  characters: number;
  words: number;
  lines: number;
  tokens: number;
}

const TextCounterPage: React.FC = () => {
  const [text, setText] = useState<string>('');

  // Calculate all counts whenever text changes
  const counts = useMemo<TextCounts>(() => {
    // Character count (simple length)
    const characters = text.length;

    // Line count (split by newlines)
    const lines = text === '' ? 0 : text.split('\n').length;

    // Word count (split by whitespace, filter empty)
    const words = text.trim() === '' 
      ? 0 
      : text.trim().split(/\s+/).length;

    // Rough token estimation for AI models (approx 4 chars per token)
    // This is a simplified approximation, actual tokenization varies by model
    const tokens = Math.ceil(characters / 4);

    return { characters, words, lines, tokens };
  }, [text]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  // Format numbers with thousands separators
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Text Counter
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Count characters, words, lines, and estimate tokens in your text.
        </p>
      </header>

      <div className="space-y-6">
        {/* Input Section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Input Text
          </h3>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here..."
            className="w-full h-96 p-2 font-mono text-sm border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
            spellCheck="false"
          />
        </section>
        
        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid bg-primary-bg dark:bg-dark-primary-bg">
            <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Characters
            </h3>
            <p className="text-2xl font-bold dark:text-dark-primary-text">
              {formatNumber(counts.characters)}
            </p>
          </div>
          
          <div className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid bg-primary-bg dark:bg-dark-primary-bg">
            <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Words
            </h3>
            <p className="text-2xl font-bold dark:text-dark-primary-text">
              {formatNumber(counts.words)}
            </p>
          </div>
          
          <div className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid bg-primary-bg dark:bg-dark-primary-bg">
            <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Lines
            </h3>
            <p className="text-2xl font-bold dark:text-dark-primary-text">
              {formatNumber(counts.lines)}
            </p>
          </div>
          
          <div className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid bg-primary-bg dark:bg-dark-primary-bg">
            <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Est. Tokens
            </h3>
            <p className="text-2xl font-bold dark:text-dark-primary-text">
              {formatNumber(counts.tokens)}
            </p>
          </div>
        </section>

        {/* Information Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About Text Counting
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>How counts are calculated:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Characters:</strong> Total number of characters, including spaces and line breaks</li>
              <li><strong>Words:</strong> Sequences of characters separated by whitespace</li>
              <li><strong>Lines:</strong> Text segments separated by line breaks</li>
              <li><strong>Tokens:</strong> Estimated count for AI language models (approximation based on ~4 characters per token)</li>
            </ul>
            <p className="mt-2">
              <strong>Common uses:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Checking content length for social media posts</li>
              <li>Monitoring word count for essays or articles</li>
              <li>Estimating token usage for AI language models</li>
              <li>Analyzing text statistics for content optimization</li>
            </ul>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Note: Token estimation is approximate and may vary by AI model. Different models use different tokenization methods.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TextCounterPage;

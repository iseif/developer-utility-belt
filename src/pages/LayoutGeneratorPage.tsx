import React, { useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import FlexboxEditor from '../components/layout-generator/FlexboxEditor';
import GridEditor from '../components/layout-generator/GridEditor';

// Define the layout mode type
type LayoutMode = 'flexbox' | 'grid';

const LayoutGeneratorPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<LayoutMode>('flexbox');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy CSS');
  const [generatedCSS, setGeneratedCSS] = useState<string>('');

  // Function to handle copying CSS to clipboard
  const handleCopyCSS = async () => {
    if (!generatedCSS) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy CSS'), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedCSS);
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy CSS'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
      setTimeout(() => setCopyButtonText('Copy CSS'), 2000);
    }
  };

  // Handler for CSS changes from editors
  const handleCSSChange = (css: string) => {
    setGeneratedCSS(css);
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          CSS Layout Generator
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Visually design and generate CSS code for Flexbox and Grid layouts.
        </p>
      </header>

      {/* Mode Tabs */}
      <div className="flex border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <button
          onClick={() => setActiveMode('flexbox')}
          className={`p-2 font-semibold flex-1 ${
            activeMode === 'flexbox'
              ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg'
              : 'bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Flexbox
        </button>
        <button
          onClick={() => setActiveMode('grid')}
          className={`p-2 font-semibold flex-1 border-l-2 border-border-color dark:border-dark-border-color ${
            activeMode === 'grid'
              ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg'
              : 'bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Grid
        </button>
      </div>

      {/* Main Content Area */}
      <section className="space-y-6 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
          {activeMode === 'flexbox' ? 'Flexbox Generator' : 'Grid Generator'}
        </h3>

        {/* Layout Editor Component */}
        {activeMode === 'flexbox' ? (
          <FlexboxEditor onCSSChange={handleCSSChange} />
        ) : (
          <GridEditor onCSSChange={handleCSSChange} />
        )}

        {/* Generated CSS Output */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold dark:text-dark-primary-text">
              Generated CSS:
            </h4>
            <button
              onClick={handleCopyCSS}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center gap-2"
            >
              <FaClipboard className="text-xs" /> {copyButtonText}
            </button>
          </div>
          <textarea
            readOnly
            value={generatedCSS}
            className="w-full h-40 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
          />
        </div>
      </section>

      {/* About CSS Layouts Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About CSS Layouts
        </h3>
        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <h4 className="font-semibold dark:text-dark-primary-text">
              Flexbox:
            </h4>
            <p>
              CSS Flexbox is a one-dimensional layout method designed for laying
              out items in rows or columns. It's ideal for creating responsive
              designs and aligning items within a container.
            </p>
          </div>

          <div>
            <h4 className="font-semibold dark:text-dark-primary-text">Grid:</h4>
            <p>
              CSS Grid is a two-dimensional layout system that allows you to
              create complex grid-based layouts with rows and columns. It's
              perfect for overall page layouts and complex component designs.
            </p>
          </div>

          <p className="italic">
            Use this tool to experiment with different layout properties and
            generate the CSS code for your projects.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LayoutGeneratorPage;

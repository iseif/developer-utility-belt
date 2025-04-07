import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaSearch, FaBalanceScale, FaLink, FaClock, FaLock, FaGlobe, FaRocket, FaInfoCircle, FaPalette } from 'react-icons/fa';

const HomePage: React.FC = () => {
  // Organize tools by category
  const toolsByCategory = {
    'Code & Data': [
      {
        name: 'Code Formatter',
        path: '/formatter',
        description: 'Beautify and format your code with proper indentation and syntax.',
        icon: <FaEdit className="align-middle" />,
      },
      {
        name: 'JSON Tools',
        path: '/json-tools',
        description: 'Validate, view, and format JSON data with tree visualization.',
        icon: <FaSearch className="align-middle" />,
      },
      {
        name: 'Diff Checker',
        path: '/diff',
        description: 'Compare two text blocks and highlight the differences between them.',
        icon: <FaBalanceScale className="align-middle" />,
      },
    ],
    'Encoding & Conversion': [
      {
        name: 'URL Encoder/Decoder',
        path: '/url-encoder-decoder',
        description: 'Encode or decode URLs and query parameters for web applications.',
        icon: <FaLink className="align-middle" />,
      },
      {
        name: 'Timestamp Converter',
        path: '/timestamp',
        description: 'Convert between Unix timestamps and human-readable date formats.',
        icon: <FaClock className="align-middle" />,
      },
      {
        name: 'JWT Debugger',
        path: '/jwt-debugger',
        description: 'Decode and inspect JSON Web Tokens to verify their contents.',
        icon: <FaLock className="align-middle" />,
      },
    ],
    'Network & Info': [
      {
        name: 'IP Address Info',
        path: '/ip-info',
        description: 'Get details about your public IP address and geolocation data.',
        icon: <FaGlobe className="align-middle" />,
      },
      {
        name: 'User Agent Parser',
        path: '/user-agent-parser',
        description: 'Parse and analyze User Agent strings to extract browser and OS information.',
        icon: <FaSearch className="align-middle" />,
      },
    ],
    'Graphics & Design': [
      {
        name: 'Color Tools',
        path: '/color-tools',
        description: 'Color picker, format converter, and contrast checker for web accessibility.',
        icon: <FaPalette className="align-middle" />,
      },
    ],
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <div className="p-6 border-4 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid bg-primary-bg dark:bg-dark-primary-bg">
          <h1 className="text-3xl font-bold mb-3 text-primary-text dark:text-dark-primary-text">
            Developer Utility Belt
          </h1>
          <p className="text-lg text-primary-text dark:text-dark-primary-text">
            Your one-stop collection of handy, client-side developer tools designed for
            speed and privacy. All processing happens in your browser — no data is sent to any server!
          </p>
        </div>
      </header>

      {/* Quick Start Guide */}
      <section className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h2 className="text-xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          <FaRocket className="inline-block align-middle mr-2" /> Getting Started
        </h2>
        <div className="text-primary-text dark:text-dark-primary-text space-y-2">
          <p>
            The Developer Utility Belt provides a collection of essential tools for web developers,
            programmers, and IT professionals — all accessible from your browser with no installation required.
          </p>
          <p>
            <strong>How to use:</strong> Select any tool from the categories below or from the navigation menu.
            Each tool operates entirely in your browser for maximum privacy and speed.
          </p>
        </div>
      </section>

      {/* Tools by Category */}
      <div className="space-y-8">
        {Object.entries(toolsByCategory).map(([category, tools]) => (
          <section key={category} className="space-y-4">
            <h2 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 dark:text-dark-primary-text">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group block p-4 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-dark-accent hover:text-primary-text dark:hover:text-dark-primary-text transition-colors duration-150 ease-in-out"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-150">{tool.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-primary-text dark:text-dark-primary-text">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-primary-text dark:text-dark-primary-text">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* About Section */}
      <section className="p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid mt-8">
        <h2 className="text-xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          <span className="inline-flex items-center"><FaInfoCircle className="inline-block align-middle mr-2" /> About This Project</span>
        </h2>
        <div className="text-primary-text dark:text-dark-primary-text space-y-2">
          <p>
            The Developer Utility Belt is an open-source collection of tools built with React and TypeScript.
            It features a Neo-Brutalist design aesthetic with light and dark mode support.
          </p>
          <p>
            <strong>Privacy First:</strong> All tools process data entirely in your browser. No information is sent to any server,
            making these utilities perfect for working with sensitive data.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

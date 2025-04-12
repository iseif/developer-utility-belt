import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaJava,
  FaJs,
  FaLeaf,
  FaRegFileCode,
  FaTerminal,
} from 'react-icons/fa';
import {
  SiApachemaven,
  SiGit,
  SiNpm,
  SiPython,
  SiReact,
  SiTypescript,
} from 'react-icons/si';

// Interface for cheat sheet data
interface CheatSheet {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

// List of available cheat sheets
const cheatSheets: CheatSheet[] = [
  {
    id: 'git',
    name: 'Git',
    description: 'Common Git commands and workflows',
    icon: <SiGit className="text-2xl" />,
    path: '/cheat-sheets/git',
  },
  {
    id: 'npm-yarn',
    name: 'NPM & Yarn',
    description: 'Common NPM and Yarn commands for package management',
    icon: <SiNpm className="text-2xl" />,
    path: '/cheat-sheets/npm-yarn',
  },
  {
    id: 'maven',
    name: 'Maven',
    description: 'Essential Maven commands for building Java projects',
    icon: <SiApachemaven className="text-2xl" />,
    path: '/cheat-sheets/maven',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Essential TypeScript types, interfaces, and syntax',
    icon: <SiTypescript className="text-2xl" />,
    path: '/cheat-sheets/typescript',
  },
  {
    id: 'react-hooks',
    name: 'React Hooks',
    description: 'Guide to React hooks with examples and best practices',
    icon: <SiReact className="text-2xl" />,
    path: '/cheat-sheets/react-hooks',
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Essential Python syntax, functions, and libraries',
    icon: <SiPython className="text-2xl" />,
    path: '/cheat-sheets/python',
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Core Java syntax, concepts, and examples',
    icon: <FaJava className="text-2xl" />,
    path: '/cheat-sheets/java',
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    description: 'Spring Boot annotations, configurations, and best practices',
    icon: <FaLeaf className="text-2xl text-green-600" />,
    path: '/cheat-sheets/spring-boot',
  },
  {
    id: 'bash',
    name: 'Bash/Linux Commands',
    description:
      'Essential Bash and Linux command-line utilities for file operations, process management, networking, and more.',
    icon: <FaTerminal className="text-2xl" />,
    path: '/cheat-sheets/bash',
  },
  {
    id: 'docker',
    name: 'Docker CLI',
    description:
      'Essential Docker commands for managing containers, images, volumes, networks, and more.',
    icon: <FaDocker className="text-2xl" />,
    path: '/cheat-sheets/docker',
  },
  {
    id: 'sql',
    name: 'SQL',
    description:
      'Common SQL commands and syntax for querying, manipulating, and defining data in relational databases.',
    icon: <FaDatabase className="text-2xl" />,
    path: '/cheat-sheets/sql',
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    description:
      'Modern JavaScript syntax, features, and APIs introduced in ES6 and later versions.',
    icon: <FaJs className="text-2xl" />,
    path: '/cheat-sheets/javascript',
  },
  {
    id: 'css-layout',
    name: 'CSS Flexbox & Grid',
    description:
      'Comprehensive reference for CSS Flexbox and Grid layout properties with visual examples.',
    icon: <FaCss3Alt className="text-2xl" />,
    path: '/cheat-sheets/css-layout',
  },
  {
    id: 'regex',
    name: 'Regular Expressions',
    description:
      'Quick reference for common Regular Expression syntax, metacharacters, quantifiers, and patterns.',
    icon: <FaRegFileCode className="text-2xl" />,
    path: '/cheat-sheets/regex',
  },
  // More cheat sheets can be added here in the future
];

const CheatSheetsIndexPage: React.FC = () => {
  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Developer Cheat Sheets
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Quick reference guides for common developer tools and commands.
          Bookmark your favorites for easy access.
        </p>
      </header>

      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheatSheets.map((sheet) => (
            <Link
              key={sheet.id}
              to={sheet.path}
              className="block p-4 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg shadow-solid dark:shadow-dark-solid hover:bg-accent dark:hover:bg-gray-700 hover:text-primary-text dark:hover:text-dark-primary-text transition-colors duration-150 ease-in-out"
            >
              <div className="flex items-start">
                <div className="text-2xl mr-3 flex items-center justify-center">
                  {sheet.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1 text-primary-text dark:text-dark-primary-text">
                    {sheet.name}
                  </h4>
                  <p className="text-sm text-primary-text dark:text-dark-primary-text">
                    {sheet.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Cheat Sheets Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Developer Cheat Sheets
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Developer Cheat Sheets</strong> provide quick reference
            guides for common commands, syntax, and patterns used in software
            development.
          </p>
          <p>
            <strong>Benefits of using cheat sheets:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Quick access to commonly used commands</li>
            <li>Reduces the need to memorize complex syntax</li>
            <li>Helps with learning new tools and technologies</li>
            <li>
              Improves productivity by reducing time spent searching for
              commands
            </li>
            <li>Serves as a refresher for infrequently used operations</li>
          </ul>
          <p className="mt-2">
            All cheat sheets include copy-to-clipboard functionality for easy
            use in your development environment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CheatSheetsIndexPage;

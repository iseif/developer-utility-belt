import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaSearch } from 'react-icons/fa';
import { SiNpm } from 'react-icons/si';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface PackageManagerCommand {
  command: string;
  description: string;
  yarnEquivalent?: string;
  example?: string;
}

// Interface for command category
interface CommandCategory {
  title: string;
  commands: PackageManagerCommand[];
}

// NPM/Yarn commands organized by category
const packageManagerCommandsData: CommandCategory[] = [
  {
    title: 'Project Initialization',
    commands: [
      {
        command: 'npm init',
        description: 'Initialize a new package.json file',
        yarnEquivalent: 'yarn init',
        example: 'npm init -y # Accept defaults',
      },
      {
        command: 'npm init @name/pkg',
        description: 'Create a package using a specific initializer',
        yarnEquivalent: 'yarn create @name/pkg',
        example: 'npm init @vitejs/app # Create a Vite app',
      },
    ],
  },
  {
    title: 'Package Installation',
    commands: [
      {
        command: 'npm install',
        description: 'Install all dependencies listed in package.json',
        yarnEquivalent: 'yarn',
      },
      {
        command: 'npm install [package]',
        description: 'Install a package and add to dependencies',
        yarnEquivalent: 'yarn add [package]',
        example: 'npm install react',
      },
      {
        command: 'npm install [package]@[version]',
        description: 'Install a specific version of a package',
        yarnEquivalent: 'yarn add [package]@[version]',
        example: 'npm install react@17.0.2',
      },
      {
        command: 'npm install [package] --save-dev',
        description: 'Install a package and add to devDependencies',
        yarnEquivalent: 'yarn add [package] --dev',
        example: 'npm install typescript --save-dev',
      },
      {
        command: 'npm install [package] --global',
        description: 'Install a package globally',
        yarnEquivalent: 'yarn global add [package]',
        example: 'npm install typescript --global',
      },
      {
        command: 'npm install [package] --save-exact',
        description: 'Install a package with exact version (no ^ or ~)',
        yarnEquivalent: 'yarn add [package] --exact',
        example: 'npm install react --save-exact',
      },
      {
        command: 'npm install [package] --save-optional',
        description: 'Install a package and add to optionalDependencies',
        yarnEquivalent: 'yarn add [package] --optional',
        example: 'npm install some-optional-package --save-optional',
      },
      {
        command: 'npm install git+https://github.com/user/project.git',
        description: 'Install a package directly from a Git repository',
        yarnEquivalent: 'yarn add git+https://github.com/user/project.git',
        example: 'npm install git+https://github.com/facebook/react.git',
      },
    ],
  },
  {
    title: 'Package Uninstallation',
    commands: [
      {
        command: 'npm uninstall [package]',
        description: 'Uninstall a package and remove from dependencies',
        yarnEquivalent: 'yarn remove [package]',
        example: 'npm uninstall react',
      },
      {
        command: 'npm uninstall [package] --save-dev',
        description: 'Uninstall a package from devDependencies',
        yarnEquivalent: 'yarn remove [package]',
        example: 'npm uninstall typescript --save-dev',
      },
      {
        command: 'npm uninstall [package] --global',
        description: 'Uninstall a global package',
        yarnEquivalent: 'yarn global remove [package]',
        example: 'npm uninstall typescript --global',
      },
    ],
  },
  {
    title: 'Package Updates',
    commands: [
      {
        command: 'npm update',
        description:
          'Update all packages to the latest version based on specified version range',
        yarnEquivalent: 'yarn upgrade',
      },
      {
        command: 'npm update [package]',
        description: 'Update a specific package',
        yarnEquivalent: 'yarn upgrade [package]',
        example: 'npm update react',
      },
      {
        command: 'npm outdated',
        description: 'Check for outdated packages',
        yarnEquivalent: 'yarn outdated',
      },
    ],
  },
  {
    title: 'Package Information',
    commands: [
      {
        command: 'npm list',
        description: 'List installed packages',
        yarnEquivalent: 'yarn list',
      },
      {
        command: 'npm list --depth=0',
        description: 'List top-level installed packages',
        yarnEquivalent: 'yarn list --depth=0',
      },
      {
        command: 'npm view [package]',
        description: 'View registry information for a package',
        yarnEquivalent: 'yarn info [package]',
        example: 'npm view react',
      },
      {
        command: 'npm view [package] versions',
        description: 'List all available versions of a package',
        yarnEquivalent: 'yarn info [package] versions',
        example: 'npm view react versions',
      },
    ],
  },
  {
    title: 'Scripts & Running',
    commands: [
      {
        command: 'npm run [script]',
        description: 'Run a script defined in package.json',
        yarnEquivalent: 'yarn [script]',
        example: 'npm run build',
      },
      {
        command: 'npm start',
        description: 'Run the start script',
        yarnEquivalent: 'yarn start',
      },
      {
        command: 'npm test',
        description: 'Run the test script',
        yarnEquivalent: 'yarn test',
      },
      {
        command: 'npm run build',
        description: 'Run the build script',
        yarnEquivalent: 'yarn build',
      },
    ],
  },
  {
    title: 'Cache Management',
    commands: [
      {
        command: 'npm cache clean --force',
        description: 'Clear the npm cache',
        yarnEquivalent: 'yarn cache clean',
      },
      {
        command: 'npm cache verify',
        description: 'Verify the npm cache',
        yarnEquivalent: 'yarn cache dir',
      },
    ],
  },
  {
    title: 'Dependency Management',
    commands: [
      {
        command: 'npm ci',
        description:
          'Install dependencies from package-lock.json (faster, for CI environments)',
        yarnEquivalent: 'yarn install --frozen-lockfile',
      },
      {
        command: 'npm dedupe',
        description: 'Reduce duplication in the package tree',
        yarnEquivalent: 'yarn dedupe',
      },
      {
        command: 'npm audit',
        description: 'Run a security audit',
        yarnEquivalent: 'yarn audit',
      },
      {
        command: 'npm audit fix',
        description: 'Fix security vulnerabilities',
        yarnEquivalent: 'yarn audit fix',
      },
      {
        command: 'npm fund',
        description: 'Display funding information for installed packages',
        yarnEquivalent: 'yarn fund',
      },
    ],
  },
  {
    title: 'Publishing',
    commands: [
      {
        command: 'npm login',
        description: 'Login to the npm registry',
        yarnEquivalent: 'yarn login',
      },
      {
        command: 'npm publish',
        description: 'Publish a package to the registry',
        yarnEquivalent: 'yarn publish',
      },
      {
        command: 'npm version [major|minor|patch]',
        description: 'Increment the package version',
        yarnEquivalent: 'yarn version --[major|minor|patch]',
        example: 'npm version patch',
      },
      {
        command: 'npm deprecate [package]@[version] [message]',
        description: 'Deprecate a version of a package',
        yarnEquivalent: 'yarn deprecate [package]@[version] [message]',
        example: 'npm deprecate my-package@1.0.0 "Critical security issue"',
      },
    ],
  },
  {
    title: 'Configuration',
    commands: [
      {
        command: 'npm config list',
        description: 'List all npm configuration settings',
        yarnEquivalent: 'yarn config list',
      },
      {
        command: 'npm config set [key] [value]',
        description: 'Set an npm configuration option',
        yarnEquivalent: 'yarn config set [key] [value]',
        example: 'npm config set init-author-name "Your Name"',
      },
      {
        command: 'npm config get [key]',
        description: 'Get an npm configuration option',
        yarnEquivalent: 'yarn config get [key]',
        example: 'npm config get registry',
      },
    ],
  },
];

const NpmYarnCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CommandCategory[]>(
    packageManagerCommandsData
  );
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter commands based on search query
  const filterCommands = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(packageManagerCommandsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = packageManagerCommandsData
      .map((category) => {
        const matchedCommands = category.commands.filter(
          (cmd) =>
            cmd.command.toLowerCase().includes(query) ||
            cmd.description.toLowerCase().includes(query) ||
            (cmd.yarnEquivalent &&
              cmd.yarnEquivalent.toLowerCase().includes(query)) ||
            (cmd.example && cmd.example.toLowerCase().includes(query))
        );

        return {
          ...category,
          commands: matchedCommands,
        };
      })
      .filter((category) => category.commands.length > 0);

    setFilteredData(filtered);
  }, [searchQuery]);

  // Apply filtering when search query changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      filterCommands();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterCommands]);

  // Handle copy to clipboard
  const handleCopy = async (text: string, commandId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [commandId]: '✓' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [commandId]: '' }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus({ ...copyStatus, [commandId]: 'Failed!' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [commandId]: '' }));
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          <span className="flex items-center">
            <SiNpm className="inline-block mr-2" />
            NPM & Yarn Cheat Sheet
          </span>
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of common NPM and Yarn commands organized by
          functionality. Each NPM command is shown with its Yarn equivalent
          where applicable. Click the copy button to copy any command to your
          clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={packageManagerCommandsData} />

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
              placeholder="Search commands or descriptions..."
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

      {/* Commands by Category */}
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
                {category.commands.map((cmd, index) => {
                  const commandId = `${category.title}-${index}`;
                  return (
                    <div
                      key={commandId}
                      className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                            <div className="flex items-center justify-between">
                              <div className="overflow-hidden max-w-[calc(100%-30px)]">
                                <pre className="text-primary-text dark:text-dark-primary-text whitespace-pre-wrap break-all">
                                  {cmd.command}
                                </pre>
                              </div>
                              <button
                                onClick={() =>
                                  handleCopy(cmd.command, commandId)
                                }
                                className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                                title="Copy to clipboard"
                              >
                                {copyStatus[commandId] ? (
                                  <span className="text-xs">
                                    {copyStatus[commandId]}
                                  </span>
                                ) : (
                                  <FaCopy />
                                )}
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            {cmd.description}
                          </p>
                          {cmd.yarnEquivalent && (
                            <div className="mt-2 font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                              <div className="flex items-center justify-between">
                                <div className="overflow-hidden max-w-[calc(100%-30px)]">
                                  <pre className="text-primary-text dark:text-dark-primary-text whitespace-pre-wrap break-all">
                                    <span className="text-blue-600 dark:text-blue-400 mr-2">
                                      Yarn:
                                    </span>{' '}
                                    {cmd.yarnEquivalent}
                                  </pre>
                                </div>
                                <button
                                  onClick={() =>
                                    handleCopy(
                                      cmd.yarnEquivalent!,
                                      `${commandId}-yarn`
                                    )
                                  }
                                  className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                                  title="Copy to clipboard"
                                >
                                  {copyStatus[`${commandId}-yarn`] ? (
                                    <span className="text-xs">
                                      {copyStatus[`${commandId}-yarn`]}
                                    </span>
                                  ) : (
                                    <FaCopy />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                          {cmd.example && (
                            <div className="mt-2 font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-400">
                              Example: {cmd.example}
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
              No commands found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* About NPM & Yarn Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About NPM & Yarn
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>NPM (Node Package Manager)</strong> is the default package
            manager for Node.js, allowing developers to install, share, and
            manage dependencies in JavaScript projects.
          </p>
          <p>
            <strong>Yarn</strong> is an alternative package manager developed by
            Facebook that aims to address some of NPM's limitations with
            features like faster installation, better security, and more
            reliable dependency resolution.
          </p>
          <p>
            <strong>Key benefits of using package managers:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Simplified dependency management</li>
            <li>Consistent installations across different environments</li>
            <li>Easy sharing and publishing of packages</li>
            <li>Script running and project automation</li>
            <li>Version management and control</li>
          </ul>
          <p className="mt-2">
            For more information, visit the{' '}
            <a
              href="https://docs.npmjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official NPM documentation
            </a>{' '}
            or the{' '}
            <a
              href="https://yarnpkg.com/getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Yarn documentation
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default NpmYarnCheatSheetPage;

import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaSearch } from 'react-icons/fa';
import { SiApachemaven } from 'react-icons/si';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface MavenCommand {
  command: string;
  description: string;
  example?: string;
}

// Interface for command category
interface CommandCategory {
  title: string;
  commands: MavenCommand[];
}

// Maven commands organized by category
const mavenCommandsData: CommandCategory[] = [
  {
    title: 'Project Initialization',
    commands: [
      {
        command: 'mvn archetype:generate',
        description: 'Generate a new project from an archetype interactively',
        example:
          'mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false',
      },
      {
        command:
          'mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-quickstart',
        description: 'Generate a new project using the quickstart archetype',
      },
      {
        command:
          'mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-webapp',
        description: 'Generate a new web application project',
      },
    ],
  },
  {
    title: 'Build Lifecycle',
    commands: [
      {
        command: 'mvn clean',
        description: 'Delete the target directory',
      },
      {
        command: 'mvn compile',
        description: 'Compile the source code',
      },
      {
        command: 'mvn test',
        description: 'Run tests',
      },
      {
        command: 'mvn package',
        description:
          'Package compiled source code into a distributable format (e.g., JAR)',
      },
      {
        command: 'mvn verify',
        description: 'Run any checks to verify the package is valid',
      },
      {
        command: 'mvn install',
        description: 'Install the package into the local repository',
      },
      {
        command: 'mvn deploy',
        description: 'Copy the final package to the remote repository',
      },
      {
        command: 'mvn clean install',
        description: 'Clean the project and install the package',
        example: 'mvn clean install -DskipTests',
      },
      {
        command: 'mvn clean package',
        description: 'Clean the project and create the package',
      },
    ],
  },
  {
    title: 'Dependencies & Plugins',
    commands: [
      {
        command: 'mvn dependency:tree',
        description: 'Display the dependency tree',
      },
      {
        command: 'mvn dependency:analyze',
        description:
          'Analyze project dependencies for unused and undeclared dependencies',
      },
      {
        command: 'mvn dependency:resolve',
        description: 'Resolve project dependencies',
      },
      {
        command: 'mvn dependency:purge-local-repository',
        description:
          'Remove local repository artifacts and re-resolve dependencies',
      },
      {
        command: 'mvn dependency:copy-dependencies',
        description: 'Copy dependencies to a specified directory',
        example:
          'mvn dependency:copy-dependencies -DoutputDirectory=target/lib',
      },
      {
        command: 'mvn versions:display-dependency-updates',
        description: 'Display available dependency updates',
      },
      {
        command: 'mvn versions:use-latest-versions',
        description: 'Update dependencies to their latest versions',
      },
      {
        command: 'mvn help:describe -Dplugin=<plugin-name>',
        description: 'Display information about a plugin',
        example: 'mvn help:describe -Dplugin=compiler',
      },
    ],
  },
  {
    title: 'Running & Debugging',
    commands: [
      {
        command: 'mvn exec:java -Dexec.mainClass="com.example.Main"',
        description: 'Execute a Java class',
        example:
          'mvn exec:java -Dexec.mainClass="com.example.Main" -Dexec.args="arg1 arg2"',
      },
      {
        command: 'mvn spring-boot:run',
        description: 'Run a Spring Boot application',
      },
      {
        command: 'mvn jetty:run',
        description: 'Run a web application with Jetty',
      },
      {
        command: 'mvn tomcat7:run',
        description: 'Run a web application with Tomcat 7',
      },
      {
        command: 'mvn cargo:run',
        description: 'Run a web application with Cargo',
      },
    ],
  },
  {
    title: 'Testing',
    commands: [
      {
        command: 'mvn test',
        description: 'Run all tests',
      },
      {
        command: 'mvn test -Dtest=TestClassName',
        description: 'Run a specific test class',
        example: 'mvn test -Dtest=UserServiceTest',
      },
      {
        command: 'mvn test -Dtest=TestClassName#methodName',
        description: 'Run a specific test method',
        example: 'mvn test -Dtest=UserServiceTest#testCreateUser',
      },
      {
        command: 'mvn test -DfailIfNoTests=false',
        description: 'Do not fail if no tests are found',
      },
      {
        command: 'mvn surefire-report:report',
        description: 'Generate a test report',
      },
      {
        command: 'mvn failsafe:integration-test',
        description: 'Run integration tests',
      },
    ],
  },
  {
    title: 'Profiles & Properties',
    commands: [
      {
        command: 'mvn clean install -P<profile-name>',
        description: 'Activate a specific profile',
        example: 'mvn clean install -Pdev',
      },
      {
        command: 'mvn help:active-profiles',
        description: 'Display active profiles',
      },
      {
        command: 'mvn help:all-profiles',
        description: 'Display all available profiles',
      },
      {
        command: 'mvn clean install -D<property>=<value>',
        description: 'Set a system property',
        example: 'mvn clean install -Dmaven.test.skip=true',
      },
    ],
  },
  {
    title: 'Project Information',
    commands: [
      {
        command: 'mvn help:effective-pom',
        description: 'Display the effective POM',
      },
      {
        command: 'mvn help:effective-settings',
        description: 'Display the effective settings',
      },
      {
        command: 'mvn help:system',
        description: 'Display system and environment variables',
      },
      {
        command: 'mvn help:evaluate -Dexpression=<expression>',
        description: 'Evaluate a Maven expression',
        example:
          'mvn help:evaluate -Dexpression=project.version -q -DforceStdout',
      },
    ],
  },
  {
    title: 'Site & Documentation',
    commands: [
      {
        command: 'mvn site',
        description: 'Generate a site documentation',
      },
      {
        command: 'mvn site:run',
        description: 'Run the site documentation on a local web server',
      },
      {
        command: 'mvn javadoc:javadoc',
        description: 'Generate Javadoc',
      },
      {
        command: 'mvn project-info-reports:dependencies',
        description: 'Generate a dependency report',
      },
    ],
  },
  {
    title: 'Repository Management',
    commands: [
      {
        command:
          'mvn install:install-file -Dfile=<path-to-file> -DgroupId=<group-id> -DartifactId=<artifact-id> -Dversion=<version> -Dpackaging=<packaging>',
        description: 'Install a JAR in the local repository',
        example:
          'mvn install:install-file -Dfile=./lib/example.jar -DgroupId=com.example -DartifactId=example -Dversion=1.0 -Dpackaging=jar',
      },
      {
        command:
          'mvn deploy:deploy-file -Durl=<repository-url> -DrepositoryId=<repository-id> -Dfile=<path-to-file>',
        description: 'Deploy a JAR to a remote repository',
        example:
          'mvn deploy:deploy-file -Durl=http://repo.example.com/maven2 -DrepositoryId=example-repo -Dfile=./target/example-1.0.jar',
      },
    ],
  },
  {
    title: 'Multi-Module Projects',
    commands: [
      {
        command: 'mvn -pl <module-name> clean install',
        description: 'Build a specific module',
        example: 'mvn -pl my-module clean install',
      },
      {
        command: 'mvn -pl <module-name> -am clean install',
        description: 'Build a specific module and all modules it depends on',
        example: 'mvn -pl my-module -am clean install',
      },
      {
        command: 'mvn -pl <module-name> -amd clean install',
        description:
          'Build a specific module and all modules that depend on it',
        example: 'mvn -pl my-module -amd clean install',
      },
      {
        command: 'mvn -N clean install',
        description: 'Build only the parent project, not the modules',
      },
    ],
  },
];

const MavenCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<CommandCategory[]>(mavenCommandsData);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter commands based on search query
  const filterCommands = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(mavenCommandsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = mavenCommandsData
      .map((category) => {
        const matchedCommands = category.commands.filter(
          (cmd) =>
            cmd.command.toLowerCase().includes(query) ||
            cmd.description.toLowerCase().includes(query) ||
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
            <SiApachemaven className="inline-block mr-2" />
            Maven Cheat Sheet
          </span>
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of common Maven commands organized by
          functionality. Click the copy button to copy any command to your
          clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={mavenCommandsData} />

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

      {/* About Maven Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Maven
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Apache Maven</strong> is a build automation and project
            management tool primarily used for Java projects. Maven addresses
            two aspects of building software: it describes how software is
            built, and it describes its dependencies.
          </p>
          <p>
            <strong>Key features of Maven:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Dependency management</li>
            <li>Consistent project structure</li>
            <li>Declarative build process</li>
            <li>Plugin-based architecture</li>
            <li>Repository system for sharing libraries</li>
            <li>Built-in project lifecycle</li>
            <li>Multi-module project support</li>
          </ul>
          <p className="mt-2">
            Maven follows the principle of "Convention over Configuration" -
            providing sensible default behaviors without requiring extensive
            configuration.
          </p>
          <p className="mt-2">
            For more information, visit the{' '}
            <a
              href="https://maven.apache.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official Maven documentation
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default MavenCheatSheetPage;

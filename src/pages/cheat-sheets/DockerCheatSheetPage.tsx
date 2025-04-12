import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaDocker, FaSearch } from 'react-icons/fa';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface DockerCommand {
  command: string;
  description: string;
  example?: string;
}

// Interface for command category
interface CommandCategory {
  title: string;
  commands: DockerCommand[];
}

// Docker commands organized by category
const dockerCommandsData: CommandCategory[] = [
  {
    title: 'Images',
    commands: [
      {
        command: 'docker pull [image]:[tag]',
        description: 'Download an image from a registry',
        example: 'docker pull nginx:latest',
      },
      {
        command: 'docker images',
        description: 'List all locally stored images',
      },
      {
        command: 'docker images -a',
        description: 'List all images (including intermediate images)',
      },
      {
        command: 'docker build -t [name]:[tag] [path]',
        description: 'Build an image from a Dockerfile',
        example: 'docker build -t myapp:1.0 .',
      },
      {
        command: 'docker rmi [image]',
        description: 'Remove an image',
        example: 'docker rmi nginx:latest',
      },
      {
        command: 'docker rmi $(docker images -q)',
        description: 'Remove all images',
      },
      {
        command: 'docker tag [source] [target]',
        description: 'Create a tag that refers to source image',
        example: 'docker tag myapp:latest myapp:1.0',
      },
      {
        command: 'docker save -o [file.tar] [image]',
        description: 'Save an image to a tar archive',
        example: 'docker save -o nginx.tar nginx:latest',
      },
      {
        command: 'docker load -i [file.tar]',
        description: 'Load an image from a tar archive',
        example: 'docker load -i nginx.tar',
      },
      {
        command: 'docker history [image]',
        description: 'Show the history of an image',
        example: 'docker history nginx:latest',
      },
    ],
  },
  {
    title: 'Containers',
    commands: [
      {
        command: 'docker run [options] [image] [command]',
        description: 'Create and start a container',
        example: 'docker run -d -p 8080:80 --name mywebserver nginx',
      },
      {
        command: 'docker run -d [image]',
        description: 'Run container in background (detached mode)',
        example: 'docker run -d nginx',
      },
      {
        command: 'docker run -p [host-port]:[container-port] [image]',
        description: 'Run container with port mapping',
        example: 'docker run -p 8080:80 nginx',
      },
      {
        command: 'docker run -v [host-dir]:[container-dir] [image]',
        description: 'Run container with volume mounted',
        example: 'docker run -v /host/data:/container/data nginx',
      },
      {
        command: 'docker run --name [name] [image]',
        description: 'Run container with a specific name',
        example: 'docker run --name webserver nginx',
      },
      {
        command: 'docker run --rm [image]',
        description: 'Run container and remove it when it exits',
        example: 'docker run --rm alpine echo "Hello World"',
      },
      {
        command: 'docker run -e VARIABLE=value [image]',
        description: 'Run container with environment variables',
        example: 'docker run -e DEBUG=true myapp',
      },
      {
        command: 'docker ps',
        description: 'List running containers',
      },
      {
        command: 'docker ps -a',
        description: 'List all containers (including stopped)',
      },
      {
        command: 'docker stop [container]',
        description: 'Stop a running container',
        example: 'docker stop mywebserver',
      },
      {
        command: 'docker start [container]',
        description: 'Start a stopped container',
        example: 'docker start mywebserver',
      },
      {
        command: 'docker restart [container]',
        description: 'Restart a container',
        example: 'docker restart mywebserver',
      },
      {
        command: 'docker rm [container]',
        description: 'Remove a container',
        example: 'docker rm mywebserver',
      },
      {
        command: 'docker rm -f [container]',
        description: 'Force remove a running container',
        example: 'docker rm -f mywebserver',
      },
      {
        command: 'docker rm $(docker ps -aq)',
        description: 'Remove all containers',
      },
      {
        command: 'docker logs [container]',
        description: 'Fetch the logs of a container',
        example: 'docker logs mywebserver',
      },
      {
        command: 'docker logs -f [container]',
        description: 'Follow the logs of a container',
        example: 'docker logs -f mywebserver',
      },
      {
        command: 'docker exec -it [container] [command]',
        description: 'Execute a command in a running container',
        example: 'docker exec -it mywebserver bash',
      },
      {
        command: 'docker inspect [container]',
        description: 'Display detailed information about a container',
        example: 'docker inspect mywebserver',
      },
      {
        command: 'docker stats',
        description:
          'Display a live stream of container resource usage statistics',
      },
      {
        command: 'docker cp [container]:[src_path] [dest_path]',
        description: 'Copy files/folders from a container to the host',
        example: 'docker cp mywebserver:/var/log/nginx/access.log ./access.log',
      },
      {
        command: 'docker cp [src_path] [container]:[dest_path]',
        description: 'Copy files/folders from the host to a container',
        example: 'docker cp ./config.json mywebserver:/etc/myapp/',
      },
      {
        command: 'docker top [container]',
        description: 'Display the running processes of a container',
        example: 'docker top mywebserver',
      },
    ],
  },
  {
    title: 'Volumes',
    commands: [
      {
        command: 'docker volume create [name]',
        description: 'Create a volume',
        example: 'docker volume create mydata',
      },
      {
        command: 'docker volume ls',
        description: 'List volumes',
      },
      {
        command: 'docker volume inspect [volume]',
        description: 'Display detailed information on a volume',
        example: 'docker volume inspect mydata',
      },
      {
        command: 'docker volume rm [volume]',
        description: 'Remove a volume',
        example: 'docker volume rm mydata',
      },
      {
        command: 'docker volume prune',
        description: 'Remove all unused volumes',
      },
      {
        command: 'docker run -v [volume]:[container-dir] [image]',
        description: 'Run container with a named volume',
        example: 'docker run -v mydata:/data nginx',
      },
    ],
  },
  {
    title: 'Networks',
    commands: [
      {
        command: 'docker network create [options] [name]',
        description: 'Create a network',
        example: 'docker network create --driver bridge mynetwork',
      },
      {
        command: 'docker network ls',
        description: 'List networks',
      },
      {
        command: 'docker network inspect [network]',
        description: 'Display detailed information on a network',
        example: 'docker network inspect mynetwork',
      },
      {
        command: 'docker network connect [network] [container]',
        description: 'Connect a container to a network',
        example: 'docker network connect mynetwork mywebserver',
      },
      {
        command: 'docker network disconnect [network] [container]',
        description: 'Disconnect a container from a network',
        example: 'docker network disconnect mynetwork mywebserver',
      },
      {
        command: 'docker network rm [network]',
        description: 'Remove a network',
        example: 'docker network rm mynetwork',
      },
      {
        command: 'docker network prune',
        description: 'Remove all unused networks',
      },
      {
        command: 'docker run --network [network] [image]',
        description: 'Run container with a specific network',
        example: 'docker run --network mynetwork nginx',
      },
    ],
  },
  {
    title: 'Docker Compose',
    commands: [
      {
        command: 'docker-compose up',
        description:
          'Create and start containers defined in docker-compose.yml',
      },
      {
        command: 'docker-compose up -d',
        description: 'Create and start containers in detached mode',
      },
      {
        command: 'docker-compose down',
        description:
          'Stop and remove containers, networks, images, and volumes defined in docker-compose.yml',
      },
      {
        command: 'docker-compose down --volumes',
        description:
          'Stop and remove containers, networks, images, and volumes',
      },
      {
        command: 'docker-compose ps',
        description: 'List containers managed by docker-compose',
      },
      {
        command: 'docker-compose logs',
        description: 'View output from containers',
      },
      {
        command: 'docker-compose logs -f',
        description: 'Follow log output from containers',
      },
      {
        command: 'docker-compose build',
        description: 'Build or rebuild services defined in docker-compose.yml',
      },
      {
        command: 'docker-compose pull',
        description: 'Pull service images',
      },
      {
        command: 'docker-compose restart',
        description: 'Restart all services',
      },
      {
        command: 'docker-compose stop',
        description: 'Stop services',
      },
      {
        command: 'docker-compose start',
        description: 'Start services',
      },
      {
        command: 'docker-compose exec [service] [command]',
        description: 'Execute a command in a running service container',
        example: 'docker-compose exec web bash',
      },
      {
        command: 'docker-compose run [service] [command]',
        description: 'Run a one-time command against a service',
        example: 'docker-compose run web npm test',
      },
      {
        command: 'docker-compose config',
        description: 'Validate and view the compose file',
      },
    ],
  },
  {
    title: 'System',
    commands: [
      {
        command: 'docker system prune',
        description:
          'Remove all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes',
      },
      {
        command: 'docker system prune -a',
        description:
          'Remove all unused containers, networks, and images (not just dangling ones)',
      },
      {
        command: 'docker system prune --volumes',
        description:
          'Remove all unused containers, networks, images, and volumes',
      },
      {
        command: 'docker system df',
        description: 'Show docker disk usage',
      },
      {
        command: 'docker info',
        description: 'Display system-wide information',
      },
      {
        command: 'docker version',
        description: 'Show the Docker version information',
      },
      {
        command: 'docker events',
        description: 'Get real-time events from the server',
      },
    ],
  },
  {
    title: 'Dockerfile Instructions',
    commands: [
      {
        command: 'FROM [image]:[tag]',
        description: 'Set base image for subsequent instructions',
        example: 'FROM node:14-alpine',
      },
      {
        command: 'WORKDIR [path]',
        description:
          'Set the working directory for any subsequent instructions',
        example: 'WORKDIR /app',
      },
      {
        command: 'COPY [src] [dest]',
        description:
          'Copy files/directories from source to the destination path in the image',
        example: 'COPY package.json .',
      },
      {
        command: 'ADD [src] [dest]',
        description:
          'Similar to COPY but can handle remote URLs and extract tar files',
        example: 'ADD https://example.com/file.tar.gz /tmp/',
      },
      {
        command: 'RUN [command]',
        description: 'Execute commands in a new layer and create a new image',
        example: 'RUN npm install',
      },
      {
        command: 'ENV [key]=[value]',
        description: 'Set environment variables',
        example: 'ENV NODE_ENV=production',
      },
      {
        command: 'EXPOSE [port]',
        description:
          'Inform Docker that the container listens on the specified port at runtime',
        example: 'EXPOSE 3000',
      },
      {
        command: 'CMD ["executable", "param1", "param2"]',
        description: 'Provide defaults for an executing container',
        example: 'CMD ["node", "server.js"]',
      },
      {
        command: 'ENTRYPOINT ["executable", "param1", "param2"]',
        description: 'Configure a container that will run as an executable',
        example: 'ENTRYPOINT ["npm", "start"]',
      },
      {
        command: 'VOLUME ["/path/in/container"]',
        description:
          'Create a mount point and mark it as holding externally mounted volumes',
        example: 'VOLUME ["/data"]',
      },
      {
        command: 'USER [username/UID]',
        description: 'Set the user name or UID to use when running the image',
        example: 'USER node',
      },
      {
        command: 'ARG [name]=[default value]',
        description: 'Define a build-time variable',
        example: 'ARG VERSION=latest',
      },
      {
        command: 'LABEL [key]=[value]',
        description: 'Add metadata to an image',
        example: 'LABEL version="1.0" description="This is my app"',
      },
      {
        command: 'HEALTHCHECK [options] CMD [command]',
        description:
          "Tell Docker how to test a container to check if it's still working",
        example:
          'HEALTHCHECK --interval=5m CMD curl -f http://localhost/ || exit 1',
      },
    ],
  },
];

const DockerCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<CommandCategory[]>(dockerCommandsData);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter commands based on search query
  const filterCommands = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(dockerCommandsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = dockerCommandsData
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
          <FaDocker className="inline-block mr-2" /> Docker CLI Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of common Docker commands organized by
          functionality. Click the copy button to copy any command to your
          clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={dockerCommandsData} />

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
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded flex justify-between items-center">
                            <code className="text-primary-text dark:text-dark-primary-text">
                              {cmd.command}
                            </code>
                            <button
                              onClick={() => handleCopy(cmd.command, commandId)}
                              className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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

      {/* About Docker Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Docker
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Docker</strong> is a platform for developing, shipping, and
            running applications in containers. Containers allow developers to
            package up an application with all of its dependencies and ship it
            as one package.
          </p>
          <p>
            <strong>Key benefits of Docker:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Consistent environments from development to production</li>
            <li>Isolation of applications and their dependencies</li>
            <li>Efficient resource utilization compared to traditional VMs</li>
            <li>Faster application deployment and scaling</li>
            <li>Simplified maintenance and configuration</li>
            <li>Better workflow for development teams</li>
          </ul>
          <p className="mt-2">
            For more information, visit the{' '}
            <a
              href="https://docs.docker.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official Docker documentation
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default DockerCheatSheetPage;

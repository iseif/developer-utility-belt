import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaSearch, FaTerminal } from 'react-icons/fa';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface BashCommand {
  command: string;
  description: string;
  example?: string;
}

// Interface for command category
interface CommandCategory {
  title: string;
  commands: BashCommand[];
}

// Bash/Linux commands organized by category
const bashCommandsData: CommandCategory[] = [
  {
    title: 'File Navigation',
    commands: [
      {
        command: 'pwd',
        description:
          'Print Working Directory: displays the current directory path',
        example: 'pwd  # Output: /home/user/documents',
      },
      {
        command: 'cd [directory]',
        description: 'Change Directory: navigate to the specified directory',
        example: 'cd /home/user/documents',
      },
      {
        command: 'cd ..',
        description: 'Move up one directory level',
      },
      {
        command: 'cd ~',
        description: 'Navigate to the home directory',
      },
      {
        command: 'cd -',
        description: 'Navigate to the previous directory',
      },
      {
        command: 'ls',
        description: 'List files and directories in the current directory',
      },
      {
        command: 'ls -l',
        description:
          'List files in long format with permissions, size, date, etc.',
      },
      {
        command: 'ls -a',
        description:
          'List all files including hidden files (those starting with .)',
      },
      {
        command: 'ls -la',
        description:
          'Combine -l and -a options to list all files in long format',
      },
      {
        command: 'ls -lh',
        description: 'List files in long format with human-readable file sizes',
      },
    ],
  },
  {
    title: 'File Manipulation',
    commands: [
      {
        command: 'cat [file]',
        description: 'Display the contents of a file',
        example: 'cat /etc/hosts',
      },
      {
        command: 'head [file]',
        description: 'Display the first 10 lines of a file',
        example: 'head -n 5 file.txt  # Show first 5 lines',
      },
      {
        command: 'tail [file]',
        description: 'Display the last 10 lines of a file',
        example: 'tail -f log.txt  # Follow the file as it grows',
      },
      {
        command: 'less [file]',
        description:
          'View file contents with pagination (use q to quit, / to search)',
        example: 'less /var/log/syslog',
      },
      {
        command: 'touch [file]',
        description:
          'Create an empty file or update the timestamp of an existing file',
        example: 'touch newfile.txt',
      },
      {
        command: 'mkdir [directory]',
        description: 'Create a new directory',
        example:
          'mkdir -p path/to/nested/directory  # Create parent directories as needed',
      },
      {
        command: 'cp [source] [destination]',
        description: 'Copy files or directories',
        example:
          'cp -r source_dir destination_dir  # Copy directories recursively',
      },
      {
        command: 'mv [source] [destination]',
        description: 'Move or rename files or directories',
        example: 'mv oldname.txt newname.txt  # Rename a file',
      },
      {
        command: 'rm [file]',
        description: 'Remove files',
        example: 'rm -i file.txt  # Prompt before removal',
      },
      {
        command: 'rm -r [directory]',
        description: 'Remove directories and their contents recursively',
        example:
          'rm -rf directory  # Force removal without prompting (use with caution)',
      },
      {
        command: 'rmdir [directory]',
        description: 'Remove empty directories',
      },
    ],
  },
  {
    title: 'Permissions',
    commands: [
      {
        command: 'chmod [permissions] [file]',
        description: 'Change file permissions',
        example: 'chmod 755 script.sh  # rwxr-xr-x',
      },
      {
        command: 'chmod +x [file]',
        description: 'Make a file executable',
        example: 'chmod +x script.sh',
      },
      {
        command: 'chmod -R [permissions] [directory]',
        description: 'Change permissions recursively for a directory',
        example: 'chmod -R 755 directory',
      },
      {
        command: 'chown [user]:[group] [file]',
        description: 'Change file owner and group',
        example: 'chown user:group file.txt',
      },
      {
        command: 'chown -R [user]:[group] [directory]',
        description: 'Change owner and group recursively for a directory',
        example: 'chown -R www-data:www-data /var/www',
      },
    ],
  },
  {
    title: 'Searching',
    commands: [
      {
        command: 'grep [pattern] [file]',
        description: 'Search for a pattern in a file',
        example: 'grep "error" log.txt',
      },
      {
        command: 'grep -i [pattern] [file]',
        description: 'Case-insensitive search',
        example: 'grep -i "warning" log.txt',
      },
      {
        command: 'grep -r [pattern] [directory]',
        description: 'Recursive search in a directory',
        example: 'grep -r "TODO" src/',
      },
      {
        command: 'find [path] -name [pattern]',
        description: 'Find files by name',
        example: 'find /home -name "*.txt"',
      },
      {
        command: 'find [path] -type f -mtime -7',
        description: 'Find files modified in the last 7 days',
        example: 'find /var/log -type f -mtime -2',
      },
      {
        command: 'locate [pattern]',
        description: 'Find files using a pre-built database (faster than find)',
        example: 'locate "*.conf"',
      },
    ],
  },
  {
    title: 'Process Management',
    commands: [
      {
        command: 'ps',
        description: 'Display current processes',
      },
      {
        command: 'ps aux',
        description: 'Display all running processes in BSD format',
      },
      {
        command: 'ps -ef',
        description: 'Display all running processes in full format',
      },
      {
        command: 'top',
        description: 'Display and update sorted information about processes',
      },
      {
        command: 'htop',
        description: 'Interactive process viewer (more user-friendly than top)',
      },
      {
        command: 'kill [pid]',
        description: 'Terminate a process by ID',
        example: 'kill 1234',
      },
      {
        command: 'kill -9 [pid]',
        description: 'Force terminate a process',
        example: 'kill -9 1234',
      },
      {
        command: 'killall [name]',
        description: 'Kill processes by name',
        example: 'killall firefox',
      },
      {
        command: 'bg',
        description: 'Put a suspended job in the background',
      },
      {
        command: 'fg',
        description: 'Bring a background job to the foreground',
      },
      {
        command: 'jobs',
        description: 'List background jobs',
      },
      {
        command: 'nohup [command] &',
        description:
          'Run a command immune to hangups, with output to a non-tty',
        example: 'nohup long_script.sh &',
      },
    ],
  },
  {
    title: 'Networking',
    commands: [
      {
        command: 'ping [host]',
        description: 'Send ICMP echo requests to a host',
        example: 'ping google.com',
      },
      {
        command: 'curl [url]',
        description: 'Transfer data from or to a server',
        example: 'curl -O https://example.com/file.zip',
      },
      {
        command: 'wget [url]',
        description: 'Download files from the web',
        example: 'wget https://example.com/file.zip',
      },
      {
        command: 'ssh [user]@[host]',
        description: 'Securely log into a remote machine',
        example: 'ssh user@192.168.1.100',
      },
      {
        command: 'scp [file] [user]@[host]:[path]',
        description: 'Securely copy files between hosts',
        example: 'scp file.txt user@192.168.1.100:/home/user/',
      },
      {
        command: 'rsync [options] [source] [destination]',
        description: 'Efficiently sync files between locations',
        example: 'rsync -avz /local/dir/ user@remote:/remote/dir/',
      },
      {
        command: 'netstat -tuln',
        description: 'Display network connections, listening ports',
      },
      {
        command: 'ifconfig',
        description: 'Display or configure network interface parameters',
      },
      {
        command: 'ip addr',
        description:
          'Show IP addresses and network interfaces (modern replacement for ifconfig)',
      },
    ],
  },
  {
    title: 'Archives',
    commands: [
      {
        command: 'tar -cvf [archive.tar] [files]',
        description: 'Create a tar archive',
        example: 'tar -cvf archive.tar file1 file2',
      },
      {
        command: 'tar -xvf [archive.tar]',
        description: 'Extract a tar archive',
      },
      {
        command: 'tar -czvf [archive.tar.gz] [files]',
        description: 'Create a compressed tar archive using gzip',
        example: 'tar -czvf archive.tar.gz directory/',
      },
      {
        command: 'tar -xzvf [archive.tar.gz]',
        description: 'Extract a compressed tar archive',
      },
      {
        command: 'gzip [file]',
        description: 'Compress a file using gzip',
        example: 'gzip large_file.txt  # Creates large_file.txt.gz',
      },
      {
        command: 'gunzip [file.gz]',
        description: 'Decompress a gzip file',
      },
      {
        command: 'zip -r [archive.zip] [directory]',
        description: 'Create a zip archive',
        example: 'zip -r archive.zip directory/',
      },
      {
        command: 'unzip [archive.zip]',
        description: 'Extract a zip archive',
      },
    ],
  },
  {
    title: 'Environment Variables',
    commands: [
      {
        command: 'echo $VARIABLE',
        description: 'Display the value of an environment variable',
        example: 'echo $PATH',
      },
      {
        command: 'export VARIABLE=value',
        description: 'Set an environment variable',
        example: 'export DEBUG=true',
      },
      {
        command: 'env',
        description: 'Display all environment variables',
      },
      {
        command: 'set',
        description: 'Display all shell variables and functions',
      },
      {
        command: 'unset VARIABLE',
        description: 'Remove an environment variable',
        example: 'unset DEBUG',
      },
      {
        command: 'echo $PATH',
        description: 'Display the system path',
      },
    ],
  },
  {
    title: 'Piping and Redirection',
    commands: [
      {
        command: 'command > file',
        description: 'Redirect output to a file (overwrite)',
        example: 'ls > files.txt',
      },
      {
        command: 'command >> file',
        description: 'Redirect output to a file (append)',
        example: 'echo "new line" >> file.txt',
      },
      {
        command: 'command < file',
        description: 'Redirect input from a file',
        example: 'sort < unsorted.txt',
      },
      {
        command: 'command1 | command2',
        description: 'Pipe the output of command1 as input to command2',
        example: 'ls -l | grep ".txt"',
      },
      {
        command: 'command 2> file',
        description: 'Redirect error output to a file',
        example: 'find / -name "*.conf" 2> errors.txt',
      },
      {
        command: 'command &> file',
        description: 'Redirect both standard output and error to a file',
        example: 'make &> build_log.txt',
      },
      {
        command: 'command1 | tee file | command2',
        description: 'Redirect output to a file and pass it to command2',
        example: 'ls | tee files.txt | grep ".txt"',
      },
    ],
  },
  {
    title: 'Text Processing',
    commands: [
      {
        command: 'sort [file]',
        description: 'Sort lines in a file',
        example: 'sort names.txt',
      },
      {
        command: 'sort -r [file]',
        description: 'Sort lines in reverse order',
      },
      {
        command: 'sort -n [file]',
        description: 'Sort lines numerically',
      },
      {
        command: 'uniq [file]',
        description: 'Remove duplicate adjacent lines',
        example: 'sort file.txt | uniq',
      },
      {
        command: 'wc [file]',
        description: 'Count lines, words, and characters in a file',
        example: 'wc -l file.txt  # Count lines only',
      },
      {
        command: 'cut -d "," -f 1 [file]',
        description: 'Cut out selected fields from each line',
        example: 'cut -d "," -f 1,3 data.csv  # Extract columns 1 and 3',
      },
      {
        command: 'sed "s/old/new/g" [file]',
        description: 'Stream editor for filtering and transforming text',
        example: 'sed "s/error/warning/g" log.txt',
      },
      {
        command: "awk '{print $1}' [file]",
        description: 'Pattern scanning and processing language',
        example: 'awk -F "," \'{print $1 " - " $3}\' data.csv',
      },
    ],
  },
  {
    title: 'System Information',
    commands: [
      {
        command: 'uname -a',
        description: 'Display system information',
      },
      {
        command: 'df -h',
        description: 'Display disk space usage in human-readable format',
      },
      {
        command: 'du -sh [directory]',
        description:
          'Display disk usage of a directory in human-readable format',
        example: 'du -sh /var/log',
      },
      {
        command: 'free -h',
        description: 'Display memory usage in human-readable format',
      },
      {
        command: 'uptime',
        description: 'Show how long the system has been running',
      },
      {
        command: 'lsblk',
        description: 'List block devices',
      },
      {
        command: 'lsusb',
        description: 'List USB devices',
      },
      {
        command: 'lspci',
        description: 'List PCI devices',
      },
    ],
  },
];

const BashCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<CommandCategory[]>(bashCommandsData);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter commands based on search query
  const filterCommands = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(bashCommandsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = bashCommandsData
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
          <FaTerminal className="inline-block mr-2" /> Bash/Linux Commands Cheat
          Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of common Bash and Linux commands organized
          by functionality. Click the copy button to copy any command to your
          clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={bashCommandsData} />

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

      {/* About Bash/Linux Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Bash and Linux Commands
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Bash</strong> (Bourne Again SHell) is the default
            command-line shell on most Linux distributions and macOS. It
            provides a powerful interface for interacting with the operating
            system.
          </p>
          <p>
            <strong>Key features of the Linux command line:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Powerful text processing capabilities</li>
            <li>Automation through shell scripting</li>
            <li>Efficient system administration</li>
            <li>Flexibility through command combinations (piping)</li>
            <li>Remote system management</li>
          </ul>
          <p className="mt-2">
            For more information, you can refer to the manual pages for any
            command using{' '}
            <code className="font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded">
              man [command]
            </code>{' '}
            on a Linux or macOS system.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BashCheatSheetPage;

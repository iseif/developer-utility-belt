import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaGit, FaSearch } from 'react-icons/fa';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface GitCommand {
  command: string;
  description: string;
  example?: string;
}

// Interface for command category
interface CommandCategory {
  title: string;
  commands: GitCommand[];
}

// Git commands organized by category
const gitCommandsData: CommandCategory[] = [
  {
    title: 'Setup & Configuration',
    commands: [
      {
        command: 'git config --global user.name "[name]"',
        description:
          'Set the name you want attached to your commit transactions',
      },
      {
        command: 'git config --global user.email "[email address]"',
        description:
          'Set the email you want attached to your commit transactions',
      },
      {
        command: 'git config --global color.ui auto',
        description: 'Enable helpful colorization of command line output',
      },
      {
        command: 'git init',
        description: 'Initialize an existing directory as a Git repository',
      },
      {
        command: 'git clone [url]',
        description:
          'Retrieve an entire repository from a hosted location via URL',
        example: 'git clone https://github.com/user/repo.git',
      },
    ],
  },
  {
    title: 'Basic Snapshots',
    commands: [
      {
        command: 'git status',
        description:
          'Show modified files in working directory, staged for your next commit',
      },
      {
        command: 'git add [file]',
        description: 'Add a file to the staging area',
        example: 'git add README.md',
      },
      {
        command: 'git add .',
        description: 'Add all new and changed files to the staging area',
      },
      {
        command: 'git commit -m "[message]"',
        description: 'Commit your staged content as a new commit snapshot',
        example: 'git commit -m "Fix login bug"',
      },
      {
        command: 'git commit --amend',
        description:
          'Modify the most recent commit (add forgotten files, change commit message)',
      },
      {
        command: 'git rm [file]',
        description:
          'Delete the file from project and stage the removal for commit',
      },
      {
        command: 'git mv [file-original] [file-renamed]',
        description: 'Change an existing file path and stage the move',
      },
    ],
  },
  {
    title: 'Branching & Merging',
    commands: [
      {
        command: 'git branch',
        description:
          'List your branches. A * will appear next to the currently active branch',
      },
      {
        command: 'git branch [branch-name]',
        description: 'Create a new branch at the current commit',
        example: 'git branch feature/login',
      },
      {
        command: 'git checkout [branch-name]',
        description:
          'Switch to another branch and check it out into your working directory',
        example: 'git checkout feature/login',
      },
      {
        command: 'git checkout -b [branch-name]',
        description: 'Create a new branch and switch to it',
        example: 'git checkout -b feature/payment',
      },
      {
        command: 'git merge [branch]',
        description:
          "Merge the specified branch's history into the current one",
        example: 'git merge feature/login',
      },
      {
        command: 'git branch -d [branch-name]',
        description: 'Delete a branch',
        example: 'git branch -d feature/login',
      },
      {
        command: 'git branch -D [branch-name]',
        description: 'Force delete a branch, even if it has unmerged changes',
      },
    ],
  },
  {
    title: 'Remote Repositories',
    commands: [
      {
        command: 'git remote -v',
        description: 'Show all remote repositories',
      },
      {
        command: 'git remote add [name] [url]',
        description: 'Add a new remote repository',
        example: 'git remote add origin https://github.com/user/repo.git',
      },
      {
        command: 'git fetch [remote]',
        description:
          "Download all changes from remote, but don't integrate into HEAD",
        example: 'git fetch origin',
      },
      {
        command: 'git pull [remote] [branch]',
        description: 'Download changes and directly merge into HEAD',
        example: 'git pull origin main',
      },
      {
        command: 'git push [remote] [branch]',
        description: 'Publish local changes to a remote',
        example: 'git push origin main',
      },
      {
        command: 'git push -u [remote] [branch]',
        description: 'Push and set upstream for the branch',
        example: 'git push -u origin feature/login',
      },
      {
        command: 'git push [remote] --delete [branch]',
        description: 'Delete a remote branch',
        example: 'git push origin --delete feature/login',
      },
    ],
  },
  {
    title: 'Inspection & Comparison',
    commands: [
      {
        command: 'git log',
        description: 'Show the commit history for the currently active branch',
      },
      {
        command: 'git log --follow [file]',
        description: 'Show the commits that changed a specific file',
        example: 'git log --follow README.md',
      },
      {
        command: 'git diff',
        description: 'Show changes between working directory and staging area',
      },
      {
        command: 'git diff --staged',
        description: 'Show changes between staging area and the last commit',
      },
      {
        command: 'git diff [branch1]...[branch2]',
        description: 'Show the differences between two branches',
        example: 'git diff main...feature/login',
      },
      {
        command: 'git show [commit]',
        description: 'Show metadata and content changes of a specific commit',
        example: 'git show abc1234',
      },
    ],
  },
  {
    title: 'Undoing Changes',
    commands: [
      {
        command: 'git reset [file]',
        description: 'Unstage a file while preserving its contents',
      },
      {
        command: 'git reset [commit]',
        description:
          'Undo all commits after [commit], preserving changes locally',
        example: 'git reset abc1234',
      },
      {
        command: 'git reset --hard [commit]',
        description:
          'Discard all history and changes back to the specified commit',
        example: 'git reset --hard abc1234',
      },
      {
        command: 'git checkout -- [file]',
        description: 'Discard changes to a file in working directory',
        example: 'git checkout -- README.md',
      },
      {
        command: 'git revert [commit]',
        description:
          'Create a new commit that undoes all changes made in [commit]',
        example: 'git revert abc1234',
      },
      {
        command: 'git restore [file]',
        description:
          'Discard changes in working directory (newer alternative to checkout)',
        example: 'git restore README.md',
      },
      {
        command: 'git restore --staged [file]',
        description: 'Unstage a file (newer alternative to reset)',
        example: 'git restore --staged README.md',
      },
    ],
  },
  {
    title: 'Stashing',
    commands: [
      {
        command: 'git stash',
        description: 'Temporarily store all modified tracked files',
      },
      {
        command: 'git stash save "[message]"',
        description: 'Save local modifications with a descriptive message',
        example: 'git stash save "Work in progress for login feature"',
      },
      {
        command: 'git stash list',
        description: 'List all stashed changesets',
      },
      {
        command: 'git stash show',
        description: 'Show the changes recorded in the stash',
      },
      {
        command: 'git stash pop',
        description:
          'Restore the most recently stashed files and delete the stash',
      },
      {
        command: 'git stash apply',
        description:
          'Restore the most recently stashed files but keep the stash',
      },
      {
        command: 'git stash drop',
        description: 'Discard the most recently stashed changeset',
      },
      {
        command: 'git stash clear',
        description: 'Discard all stashed changesets',
      },
    ],
  },
  {
    title: 'Advanced Operations',
    commands: [
      {
        command: 'git rebase [branch]',
        description: 'Reapply commits on top of another base branch',
        example: 'git rebase main',
      },
      {
        command: 'git rebase -i [branch]',
        description:
          'Interactive rebase with options to squash, edit, or drop commits',
        example: 'git rebase -i HEAD~3',
      },
      {
        command: 'git cherry-pick [commit]',
        description: 'Apply the changes introduced by an existing commit',
        example: 'git cherry-pick abc1234',
      },
      {
        command: 'git bisect start',
        description:
          'Start binary search to find the commit that introduced a bug',
      },
      {
        command: 'git bisect good [commit]',
        description: 'Mark a commit as "good" - doesn\'t contain the bug',
      },
      {
        command: 'git bisect bad [commit]',
        description: 'Mark a commit as "bad" - contains the bug',
      },
      {
        command: 'git worktree add [path] [branch]',
        description: 'Create a new working directory for a branch',
        example: 'git worktree add ../feature-branch feature/login',
      },
    ],
  },
];

const GitCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<CommandCategory[]>(gitCommandsData);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter commands based on search query
  const filterCommands = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(gitCommandsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = gitCommandsData
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
          <FaGit className="inline-block mr-2" /> Git Commands Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of common Git commands organized by
          functionality. Click the copy button to copy any command to your
          clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={gitCommandsData} />

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

      {/* About Git Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Git
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Git</strong> is a distributed version control system
            designed to handle everything from small to very large projects with
            speed and efficiency.
          </p>
          <p>
            <strong>Key features of Git:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Distributed development</li>
            <li>Strong support for non-linear development</li>
            <li>Efficient handling of large projects</li>
            <li>Cryptographic authentication of history</li>
            <li>Toolkit-based design</li>
            <li>Pluggable merge strategies</li>
          </ul>
          <p className="mt-2">
            For more information, visit the{' '}
            <a
              href="https://git-scm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official Git website
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default GitCheatSheetPage;

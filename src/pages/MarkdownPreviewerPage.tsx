import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaCopy } from 'react-icons/fa';

const MarkdownPreviewerPage: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy HTML');

  // Sample markdown to show on initial load
  const initialMarkdown = `# Markdown Previewer

## Write your markdown here

This is a **bold** text, and this is an *italic* text.

### Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

### Code

Inline \`code\` example.

\`\`\`javascript
// Code block example
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

### Links and Images

[Visit Developer Utility Belt GitHub page](https://github.com/iseif/developer-utility-belt)

![Placeholder Image](https://github.com/iseif/developer-utility-belt/blob/master/public/android-chrome-192x192.png?raw=true)

### Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |

### Blockquotes

> This is a blockquote.
> It can span multiple lines.

### Task Lists

- [x] Completed task
- [ ] Incomplete task
`;

  // Set initial markdown on component mount
  useEffect(() => {
    setMarkdownText(initialMarkdown);
  }, []);

  // Function to handle copying HTML to clipboard
  const handleCopyHtml = async () => {
    try {
      // Create a temporary div to render the markdown as HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML =
        document.querySelector('.markdown-preview')?.innerHTML || '';

      await navigator.clipboard.writeText(tempDiv.innerHTML);
      setCopyButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy HTML: ', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => setCopyButtonText('Copy HTML'), 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Markdown Previewer
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Write or paste Markdown text and see it rendered in real-time.
          Supports GitHub Flavored Markdown including tables, task lists, and
          more.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Markdown Input */}
        <section className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold dark:text-dark-primary-text">
              Markdown Input
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              GitHub Flavored Markdown
            </div>
          </div>
          <textarea
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            className="w-full h-[calc(100vh-300px)] min-h-[400px] p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner resize-none"
            placeholder="Type your markdown here..."
            spellCheck="false"
          />
        </section>

        {/* Preview */}
        <section className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold dark:text-dark-primary-text">
              Preview
            </h3>
            <button
              onClick={handleCopyHtml}
              className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center gap-1"
            >
              <FaCopy className="text-xs" /> {copyButtonText}
            </button>
          </div>
          <div className="markdown-preview w-full h-[calc(100vh-300px)] min-h-[400px] p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 overflow-auto">
            <div className="prose prose-sm dark:prose-invert prose-headings:border-b prose-headings:border-border-color dark:prose-headings:border-dark-border-color prose-headings:pb-1 prose-headings:mb-2 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg max-w-none text-primary-text dark:text-dark-primary-text">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownText}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      </div>

      {/* Markdown Reference Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          Markdown Reference
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Markdown</strong> is a lightweight markup language that you
            can use to add formatting elements to plaintext text documents.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 className="font-semibold mb-2">Basic Syntax</h4>
              <ul className="space-y-1">
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    # Heading 1
                  </code>{' '}
                  - Heading 1
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    ## Heading 2
                  </code>{' '}
                  - Heading 2
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    **bold**
                  </code>{' '}
                  - <strong>bold</strong>
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    *italic*
                  </code>{' '}
                  - <em>italic</em>
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    [Link](url)
                  </code>{' '}
                  -{' '}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    Link
                  </a>
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    ![Alt text](image-url)
                  </code>{' '}
                  - Image
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    `code`
                  </code>{' '}
                  - Inline code
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Extended Syntax (GFM)</h4>
              <ul className="space-y-1">
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    - [ ] Task
                  </code>{' '}
                  - Unchecked task
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    - [x] Task
                  </code>{' '}
                  - Checked task
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    ~~strikethrough~~
                  </code>{' '}
                  - <del>strikethrough</del>
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    | table | header |
                  </code>{' '}
                  - Tables
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    ```language
                  </code>{' '}
                  - Code blocks
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    &gt; blockquote
                  </code>{' '}
                  - Blockquotes
                </li>
                <li>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    ---
                  </code>{' '}
                  - Horizontal rule
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarkdownPreviewerPage;

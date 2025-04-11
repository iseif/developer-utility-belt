import React from 'react';
import {
  FaBalanceScale,
  FaCalculator,
  FaCalendarAlt,
  FaClock,
  FaCode,
  FaCompress,
  FaDatabase,
  FaEdit,
  FaExchangeAlt,
  FaFingerprint,
  FaFont,
  FaGlobe,
  FaHashtag,
  FaLink,
  FaLock,
  FaMarkdown,
  FaPalette,
  FaQuoteRight,
  FaSearch,
  FaServer,
  FaSortAlphaDown,
  FaTable,
  FaTag,
  FaVectorSquare,
} from 'react-icons/fa';

// Tool interface to define the structure of each tool
export interface Tool {
  name: string;
  path: string;
  description?: string;
  icon?: React.ReactNode;
}

// Category interface to define the structure of each category
export interface ToolCategory {
  name: string;
  items: Tool[];
}

// Centralized tools data organized by category
export const toolsByCategory: Record<string, Tool[]> = {
  'Code & Data': [
    {
      name: 'Code Formatter',
      path: '/formatter',
      description:
        'Beautify and format your code with proper indentation and syntax.',
      icon: <FaEdit className="align-middle" />,
    },
    {
      name: 'Code Minifier',
      path: '/minifier',
      description:
        'Minify JavaScript and CSS code to reduce file size for production.',
      icon: <FaCompress className="align-middle" />,
    },
    {
      name: 'JSON Tools',
      path: '/json-tools',
      description:
        'Validate, view, and format JSON data with tree visualization.',
      icon: <FaSearch className="align-middle" />,
    },
    {
      name: 'CSV Viewer',
      path: '/csv-viewer',
      description:
        'Parse CSV data and display it in a structured table format with pagination.',
      icon: <FaTable className="align-middle" />,
    },
    {
      name: 'JSON <-> CSV Converter',
      path: '/json-csv-converter',
      description:
        'Convert between JSON arrays and CSV data formats with ease.',
      icon: <FaExchangeAlt className="align-middle" />,
    },
    {
      name: 'Mock Data Generator',
      path: '/data-generator',
      description:
        'Generate realistic mock data based on your schema definition in JSON or CSV format.',
      icon: <FaDatabase className="align-middle" />,
    },
    {
      name: 'Diff Checker',
      path: '/diff',
      description:
        'Compare two text blocks and highlight the differences between them.',
      icon: <FaBalanceScale className="align-middle" />,
    },
    {
      name: 'Case Converter',
      path: '/case-converter',
      description:
        'Convert text between various case formats like camelCase, PascalCase, snake_case, etc.',
      icon: <FaFont className="align-middle" />,
    },
    {
      name: 'Line Sorter',
      path: '/line-tools',
      description:
        'Sort lines alphabetically and remove duplicates from multi-line text.',
      icon: <FaSortAlphaDown className="align-middle" />,
    },
    {
      name: 'Text Counter',
      path: '/counter',
      description:
        'Count characters, words, lines, and estimate tokens in your text.',
      icon: <FaCalculator className="align-middle" />,
    },
    {
      name: 'Text Escaper/Unescaper',
      path: '/text-escaper',
      description: 'Escape and unescape text for JSON, XML, and SQL contexts.',
      icon: <FaQuoteRight className="align-middle" />,
    },
    {
      name: 'Slugify Text',
      path: '/slugify',
      description: 'Convert text into URL-friendly slugs for web applications.',
      icon: <FaTag className="align-middle" />,
    },
    {
      name: 'Cron Helper',
      path: '/cron-helper',
      description:
        'Build, test, and understand cron expressions for scheduling jobs.',
      icon: <FaCalendarAlt className="align-middle" />,
    },
    {
      name: 'Markdown Previewer',
      path: '/markdown-previewer',
      description:
        'Write and preview Markdown with real-time rendering and GitHub Flavored Markdown support.',
      icon: <FaMarkdown className="align-middle" />,
    },
  ],
  'Encoding & Conversion': [
    {
      name: 'URL Encoder/Decoder',
      path: '/url-encode-decode',
      description:
        'Encode or decode URLs and query parameters for web applications.',
      icon: <FaLink className="align-middle" />,
    },
    {
      name: 'Base64 Encoder/Decoder',
      path: '/base64-encode-decode',
      description: 'Encode or decode data to and from Base64 format.',
      icon: <FaExchangeAlt className="align-middle" />,
    },
    {
      name: 'HTML Encoder/Decoder',
      path: '/html-entity-encode-decode',
      description: 'Convert special characters to and from HTML entities.',
      icon: <FaCode className="align-middle" />,
    },
    {
      name: 'Timestamp Converter',
      path: '/timestamp',
      description:
        'Convert between Unix timestamps and human-readable date formats.',
      icon: <FaClock className="align-middle" />,
    },
    {
      name: 'JWT Debugger',
      path: '/jwt-debugger',
      description:
        'Decode and inspect JSON Web Tokens to verify their contents.',
      icon: <FaLock className="align-middle" />,
    },
    {
      name: 'Hash Generator',
      path: '/hash-generator',
      description:
        'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) for text input.',
      icon: <FaHashtag className="align-middle" />,
    },
    {
      name: 'Password Generator',
      path: '/password-generator',
      description:
        'Generate strong, random passwords based on configurable criteria.',
      icon: <FaLock className="align-middle" />,
    },
    {
      name: 'UUID Generator',
      path: '/uuid-generator',
      description:
        'Generate Version 4 (random) UUIDs for use in applications and databases.',
      icon: <FaFingerprint className="align-middle" />,
    },
  ],
  'Network & Info': [
    {
      name: 'IP Address Info',
      path: '/ip-info',
      description:
        'Get details about your public IP address and geolocation data.',
      icon: <FaGlobe className="align-middle" />,
    },
    {
      name: 'User Agent Parser',
      path: '/user-agent-parser',
      description:
        'Parse and analyze User Agent strings to extract browser and OS information.',
      icon: <FaSearch className="align-middle" />,
    },
    {
      name: 'HTTP Status Codes',
      path: '/http-status-codes',
      description:
        'Reference for HTTP status codes with descriptions and categories.',
      icon: <FaServer className="align-middle" />,
    },
  ],
  'Graphics & Design': [
    {
      name: 'Color Tools',
      path: '/color-tools',
      description:
        'Color picker, format converter, and contrast checker for web accessibility.',
      icon: <FaPalette className="align-middle" />,
    },
    {
      name: 'Gradient Generator',
      path: '/gradient-generator',
      description:
        'Create beautiful CSS gradients with a visual editor for your web projects.',
      icon: <FaPalette className="align-middle" />,
    },
    {
      name: 'SVG Optimizer',
      path: '/svg-optimizer',
      description:
        'Optimize SVG files by removing unnecessary data and reducing file size.',
      icon: <FaVectorSquare className="align-middle" />,
    },
    {
      name: 'Unit Converter (CSS)',
      path: '/unit-converter',
      description:
        'Convert between CSS units like px, em, rem, pt, vw, and vh with adjustable base font size.',
      icon: <FaExchangeAlt className="align-middle" />,
    },
    {
      name: 'Layout Generator',
      path: '/layout-generator',
      description:
        'Visually design and generate CSS code for Flexbox and Grid layouts.',
      icon: <FaVectorSquare className="align-middle" />,
    },
  ],
};

// Helper function to convert the toolsByCategory object to an array format for Nav component
export const getNavCategories = (): ToolCategory[] => {
  // Add the General category with Home item
  const navCategories: ToolCategory[] = [
    {
      name: 'General',
      items: [{ name: 'Home', path: '/' }],
    },
  ];

  // Add the rest of the categories
  Object.entries(toolsByCategory).forEach(([categoryName, tools]) => {
    navCategories.push({
      name: categoryName,
      items: tools.map((tool) => ({
        name: tool.name,
        path: tool.path,
      })),
    });
  });

  return navCategories;
};

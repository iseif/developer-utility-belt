import React from 'react';
import {
  FaBalanceScale,
  FaCalculator,
  FaCalendarAlt,
  FaClock,
  FaCode,
  FaCompress,
  FaCrop,
  FaCss3Alt,
  FaCube,
  FaDatabase,
  FaDocker,
  FaEdit,
  FaExchangeAlt,
  FaExchangeAlt as FaConvert,
  FaFileAlt,
  FaFileCode,
  FaFingerprint,
  FaFont,
  FaGit,
  FaGlobe,
  FaHashtag,
  FaHtml5,
  FaJava,
  FaJs,
  FaKey,
  FaLeaf,
  FaLink,
  FaList,
  FaLock,
  FaMarkdown,
  FaPalette,
  FaPython,
  FaQuoteRight,
  FaRegFileCode,
  FaSearch,
  FaServer,
  FaSlash,
  FaSortAlphaDown,
  FaTable,
  FaTag,
  FaTerminal,
  FaVectorSquare,
} from 'react-icons/fa';
import { SiApachemaven, SiNpm, SiReact, SiTypescript } from 'react-icons/si';

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
    {
      name: 'Regex Tester',
      path: '/regex-tester',
      description:
        'Test and debug regular expressions with real-time matching and highlighting.',
      icon: <FaSlash className="align-middle" />,
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
      name: 'Number Base Converter',
      path: '/base-converter',
      description:
        'Convert numbers between binary, octal, decimal, and hexadecimal bases.',
      icon: <FaConvert className="align-middle" />,
    },
    {
      name: 'Binary/Hex Viewer',
      path: '/hex-viewer',
      description:
        'Display text or hex input as a formatted binary or hexadecimal view, similar to a hex editor.',
      icon: <FaFileCode className="align-middle" />,
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
      name: 'HMAC Generator',
      path: '/hmac-generator',
      description:
        'Generate Hash-based Message Authentication Codes (HMAC) using various hash algorithms.',
      icon: <FaKey className="align-middle" />,
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
  Network: [
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
      name: 'Box Shadow Generator',
      path: '/box-shadow-generator',
      description:
        'Create and customize CSS box shadows with a visual interface.',
      icon: <FaCube className="align-middle" />,
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
        'Generate CSS grid and flexbox layouts with a visual interface.',
      icon: <FaVectorSquare className="align-middle" />,
    },
    {
      name: 'Image Resizer & Cropper',
      path: '/image-editor',
      description:
        'Resize, crop, and transform images with presets and custom dimensions.',
      icon: <FaCrop className="align-middle" />,
    },
  ],
  Reference: [
    {
      name: 'HTTP Status Codes',
      path: '/http-status-codes',
      description:
        'Reference for HTTP status codes with descriptions and usage.',
      icon: <FaServer className="align-middle" />,
    },
    {
      name: 'HTTP Headers',
      path: '/http-headers',
      description:
        'Reference for HTTP request and response headers with descriptions.',
      icon: <FaServer className="align-middle" />,
    },
    {
      name: 'Network Ports',
      path: '/network-ports',
      description:
        'Reference for common network ports, protocols, and services.',
      icon: <FaServer className="align-middle" />,
    },
    {
      name: 'MIME Type Lookup',
      path: '/mime-lookup',
      description: 'Look up MIME types by file extension or search by type.',
      icon: <FaFileAlt className="align-middle" />,
    },
    {
      name: 'ASCII Table',
      path: '/ascii-table',
      description:
        'Reference table for ASCII character codes (0-127) with decimal, hex, octal, and binary values.',
      icon: <FaList className="align-middle" />,
    },
    {
      name: 'HTML Entities',
      path: '/html-entities',
      description:
        'Searchable reference for HTML character entities with named and numbered codes.',
      icon: <FaHtml5 className="align-middle" />,
    },
  ],
  'Cheat Sheets': [
    {
      name: 'Git Commands',
      path: '/cheat-sheets/git',
      description:
        'Comprehensive reference of common Git commands organized by functionality.',
      icon: <FaGit className="align-middle" />,
    },
    {
      name: 'Bash/Linux Commands',
      path: '/cheat-sheets/bash',
      description:
        'Essential Bash/Linux command-line utilities for file operations, process management, and more.',
      icon: <FaTerminal className="align-middle" />,
    },
    {
      name: 'Docker CLI',
      path: '/cheat-sheets/docker',
      description:
        'Essential Docker commands for managing containers, images, volumes, networks, and more.',
      icon: <FaDocker className="align-middle" />,
    },
    {
      name: 'NPM & Yarn',
      path: '/cheat-sheets/npm-yarn',
      description:
        'Common NPM and Yarn commands for package management, dependencies, scripts, and more.',
      icon: <SiNpm className="align-middle" />,
    },
    {
      name: 'Maven',
      path: '/cheat-sheets/maven',
      description:
        'Essential Maven commands for building, testing, and managing Java projects.',
      icon: <SiApachemaven className="align-middle" />,
    },
    {
      name: 'SQL',
      path: '/cheat-sheets/sql',
      description:
        'Common SQL commands and syntax for working with relational databases.',
      icon: <FaDatabase className="align-middle" />,
    },
    {
      name: 'Python',
      path: '/cheat-sheets/python',
      description:
        'Core Python syntax, data structures, and common operations for quick reference.',
      icon: <FaPython className="align-middle" />,
    },
    {
      name: 'JavaScript (ES6+)',
      path: '/cheat-sheets/javascript',
      description:
        'Modern JavaScript syntax, features, and APIs introduced in ES6 and later versions.',
      icon: <FaJs className="align-middle" />,
    },
    {
      name: 'TypeScript',
      path: '/cheat-sheets/typescript',
      description:
        'Essential TypeScript types, interfaces, and syntax for type-safe JavaScript development.',
      icon: <SiTypescript className="align-middle" />,
    },
    {
      name: 'React Hooks',
      path: '/cheat-sheets/react-hooks',
      description: 'Quick reference for React Hooks.',
      icon: <SiReact className="align-middle" />,
    },
    {
      name: 'Java',
      path: '/cheat-sheets/java',
      description:
        'Core Java syntax, data types, control structures, and object-oriented concepts.',
      icon: <FaJava className="align-middle" />,
    },
    {
      name: 'Spring Boot',
      path: '/cheat-sheets/spring-boot',
      description:
        'Spring Boot annotations, configurations, and best practices',
      icon: <FaLeaf className="align-middle text-green-600" />,
    },
    {
      name: 'CSS Flexbox & Grid',
      path: '/cheat-sheets/css-layout',
      description:
        'Comprehensive reference for CSS Flexbox and Grid layout properties with visual examples.',
      icon: <FaCss3Alt className="align-middle" />,
    },
    {
      name: 'Regular Expressions',
      path: '/cheat-sheets/regex',
      description:
        'Quick reference for common Regular Expression syntax, metacharacters, quantifiers, and patterns.',
      icon: <FaRegFileCode className="align-middle" />,
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

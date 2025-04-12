# Developer Utility Belt

## Overview

A comprehensive, fast, and user-friendly web application featuring a collection of essential utilities commonly needed by software developers. Built with a focus on client-side processing for speed and privacy, presented with a distinct Neo-Brutalist aesthetic.

The goal is to provide a single, reliable online destination for various development tasks like code formatting, data conversion, text manipulation, and more, reducing the need for multiple single-purpose tools.

**Live App**: [https://developer-utility-belt.netlify.app/](https://developer-utility-belt.netlify.app/)  
**GitHub Repository**: [https://github.com/iseif/developer-utility-belt](https://github.com/iseif/developer-utility-belt)

## Features

This application provides a wide range of tools for developers:

### Code & Data

- **Code Formatter:** Format JavaScript and JSON using Prettier/standard methods
- **Code Minifier:** Minify JavaScript and CSS code to reduce file size
- **JSON Tools:** Validate, view, and format JSON data with tree visualization
- **CSV Viewer:** Parse and display CSV data in a structured table format
- **JSON <-> CSV Converter:** Convert between JSON arrays and CSV data formats
- **Mock Data Generator:** Generate realistic mock data in JSON or CSV format
- **Diff Checker:** Compare two text blocks and highlight differences
- **Case Converter:** Convert text between camelCase, PascalCase, snake_case, etc.
- **Line Sorter:** Sort lines alphabetically and remove duplicates
- **Text Counter:** Count characters, words, lines, and estimate tokens
- **Text Escaper/Unescaper:** Escape and unescape text for JSON, XML, and SQL contexts
- **Slugify Text:** Convert text into URL-friendly slugs for web applications
- **Cron Helper:** Build, test, and understand cron expressions with human-readable explanations
- **Markdown Previewer:** Write and preview Markdown with real-time rendering
- **Regex Tester:** Test and debug regular expressions with real-time matching and highlighting

### Encoding & Conversion

- **URL Encoder/Decoder:** Encode or decode URLs and query parameters
- **Base64 Encoder/Decoder:** Encode or decode data to and from Base64 format
- **HTML Encoder/Decoder:** Convert special characters to and from HTML entities
- **Number Base Converter:** Convert numbers between binary, octal, decimal, and hexadecimal bases
- **Binary/Hex Viewer:** Display text or hex input as a formatted binary or hexadecimal view
- **Timestamp Converter:** Convert between Unix timestamps and human-readable dates
- **JWT Debugger:** Decode and inspect JSON Web Tokens
- **Hash Generator:** Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512)
- **HMAC Generator:** Generate Hash-based Message Authentication Codes using various hash algorithms
- **Password Generator:** Generate strong, random passwords
- **UUID Generator:** Generate Version 4 (random) UUIDs for use in applications and databases

### Graphics & Design

- **Color Tools:** Color picker, format converter, and contrast checker
- **Gradient Generator:** Create CSS gradients with a visual editor
- **Box Shadow Generator:** Create and customize CSS box shadows with a visual interface
- **SVG Optimizer:** Optimize SVG files by removing unnecessary data
- **Unit Converter (CSS):** Convert between CSS units (px, em, rem, pt, vw, vh)
- **Layout Generator:** Visually design and generate CSS code for Flexbox and Grid layouts
- **Image Resizer & Cropper:** Resize, crop, and transform images with presets and custom dimensions

### Network & Info

- **IP Address Info:** Get details about your public IP address and geolocation
- **User Agent Parser:** Parse User Agent strings to extract browser and OS information
- **Network Ports:** Reference for common network ports, protocols, and services
- **HTTP Status Codes:** Reference for HTTP status codes with descriptions and categories
- **HTTP Headers:** Reference for HTTP request and response headers with descriptions
- **MIME Type Lookup:** Find MIME types for file extensions and vice versa

### Reference

- **HTTP Status Codes:** Reference for HTTP status codes with descriptions and usage
- **HTTP Headers:** Reference for HTTP request and response headers with descriptions
- **Network Ports:** Reference for common network ports, protocols, and services
- **MIME Type Lookup:** Look up MIME types by file extension or search by type
- **ASCII Table:** Reference table for ASCII character codes with decimal, hex, octal, and binary values
- **HTML Entities:** Searchable reference for HTML character entities with named and numbered codes

### Cheat Sheets

- **Git Commands:** Comprehensive reference of common Git commands organized by functionality
- **Bash/Linux Commands:** Essential Bash/Linux command-line utilities for file operations and more
- **Docker CLI:** Essential Docker commands for managing containers, images, volumes, and networks
- **NPM & Yarn:** Common NPM and Yarn commands for package management and dependencies
- **Maven:** Essential Maven commands for building, testing, and managing Java projects
- **SQL:** Common SQL commands and syntax for working with relational databases
- **Python:** Core Python syntax, data structures, and common operations for quick reference
- **JavaScript (ES6+):** Modern JavaScript syntax, features, and APIs introduced in ES6 and later
- **TypeScript:** Essential TypeScript types, interfaces, and syntax for type-safe JavaScript development
- **React Hooks:** Quick reference for React Hooks
- **Java:** Core Java syntax, data types, control structures, and object-oriented concepts
- **Spring Boot:** Spring Boot annotations, configurations, and best practices
- **CSS Flexbox & Grid:** Comprehensive reference for CSS Flexbox and Grid layout properties
- **Regular Expressions:** Quick reference for common Regular Expression syntax and patterns

## Privacy First

All tools operate entirely in your browser - no data is ever sent to a server. This ensures:

- Complete privacy for sensitive information
- Works offline once loaded
- Fast performance with no network latency

## Technology Stack

- **Framework:** ReactJS with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (with custom Neo-Brutalist theme)
- **Routing:** React Router DOM
- **Code Quality:** ESLint & Prettier
- **Package Manager:** Yarn
- **Core Logic Libraries:**
  - `prettier` (standalone for formatting)
  - `diff` (for text comparison)
  - `react-json-view` (for JSON tree view)
  - `date-fns` (for timestamp/date handling)
  - `cronstrue` and `cron-parser` (for cron expression handling)
  - `crypto-js` (for hash generation)
  - `react-markdown` (for markdown preview)

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/iseif/developer-utility-belt
    cd developer-utility-belt
    ```
2.  **Install dependencies:**
    ```bash
    yarn
    ```
3.  **Run the development server:**
    ```bash
    yarn dev
    ```
    The application should now be running locally, typically at `http://localhost:5173`.

## Available Scripts

- `yarn dev`: Starts the development server with Hot Module Replacement (HMR)
- `yarn build`: Type-checks the code and creates a production-ready build in the `dist` folder
- `yarn lint`: Runs ESLint to check for code quality issues and potential errors
- `yarn format`: Runs Prettier to automatically format the codebase
- `yarn preview`: Serves the production build locally for previewing

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to help improve the Developer Utility Belt.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

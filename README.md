# Developer Utility Belt

## Overview

A comprehensive, fast, and user-friendly web application featuring a collection of essential utilities commonly needed by software developers. Built with a focus on client-side processing for speed and privacy, presented with a distinct Neo-Brutalist aesthetic.

The goal is to provide a single, reliable online destination for various development tasks like code formatting, data conversion, text manipulation, and more, reducing the need for multiple single-purpose tools.

## Features (In Progress)

This application aims to provide a wide range of tools. Currently implemented or in progress:

- **Core:** Responsive UI Shell, Neo-Brutalist Theme, Light/Dark Mode Toggle
- **Code Formatter:** Format JavaScript and JSON using Prettier/standard methods.
- **JSON Tools:** Validate, view formatted JSON text, and browse using an interactive tree view.
- **Diff Checker:** Compare two blocks of text and highlight differences.
- **Timestamp Converter:** Convert between Unix timestamps (s/ms) and various human-readable date formats, using `date-fns`.

## Technology Stack

- **Framework:** ReactJS with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (with custom Neo-Brutalist theme)
- **Routing:** React Router DOM
- **Code Quality:** ESLint & Prettier
- **Package Manager:** Yarn
- **Core Logic Libraries (so far):**
  - `prettier` (standalone for formatting)
  - `diff` (for text comparison)
  - `react-json-view` (for JSON tree view)
  - `date-fns` (for timestamp/date handling)

## Getting Started

1.  **Clone the repository (if applicable):**
    ```bash
    # git clone https://github.com/iseif/developer-utility-belt
    # cd developer-utility-belt
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

- `yarn dev`: Starts the development server with Hot Module Replacement (HMR).
- `yarn build`: Type-checks the code and creates a production-ready build in the `dist` folder.
- `yarn lint`: Runs ESLint to check for code quality issues and potential errors.
- `yarn format`: Runs Prettier to automatically format the codebase.
- `yarn preview`: Serves the production build locally for previewing.

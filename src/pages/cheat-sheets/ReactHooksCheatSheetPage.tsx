import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaSearch } from 'react-icons/fa';
import { SiReact } from 'react-icons/si';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for hook example data
interface HookExample {
  code: string;
  description: string;
  output?: string;
}

// Interface for hook category
interface HookCategory {
  title: string;
  examples: HookExample[];
}

// React Hooks examples organized by category
const reactHooksExamplesData: HookCategory[] = [
  {
    title: 'State Hooks',
    examples: [
      {
        code: '// Basic useState\nimport { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}',
        description:
          'useState hook for managing state in functional components. Returns a stateful value and a function to update it.',
      },
      {
        code: '// useState with object state\nfunction UserForm() {\n  const [user, setUser] = useState({ name: "", email: "" });\n  \n  const handleNameChange = (e) => {\n    // Preserve other state properties when updating one\n    setUser({ ...user, name: e.target.value });\n  };\n  \n  return (\n    <form>\n      <input\n        value={user.name}\n        onChange={handleNameChange}\n        placeholder="Name"\n      />\n    </form>\n  );\n}',
        description:
          'Using useState with object state. Remember to spread the previous state when updating only specific properties.',
      },
      {
        code: '// useState with function update\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  const increment = () => {\n    // Using function form ensures we have the latest state\n    setCount(prevCount => prevCount + 1);\n    \n    // These will work correctly even in rapid succession\n    setCount(prevCount => prevCount + 1);\n    setCount(prevCount => prevCount + 1);\n  };\n  \n  return (\n    <button onClick={increment}>Increment by 3</button>\n  );\n}',
        description:
          'Using the functional form of setState when the new state depends on the previous state.',
      },
      {
        code: '// useState with lazy initialization\nfunction ExpensiveInitialState() {\n  // This function only runs once during initial render\n  const [state, setState] = useState(() => {\n    console.log("Computing initial state");\n    return computeExpensiveValue();\n  });\n  \n  return <div>{state}</div>;\n}',
        description:
          'Lazy initialization of state by passing a function to useState. The function runs only once during initial render.',
      },
      {
        code: '// useReducer for complex state\nimport { useReducer } from "react";\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "increment":\n      return { count: state.count + 1 };\n    case "decrement":\n      return { count: state.count - 1 };\n    default:\n      throw new Error();\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, { count: 0 });\n  \n  return (\n    <div>\n      Count: {state.count}\n      <button onClick={() => dispatch({ type: "increment" })}>\n        +\n      </button>\n      <button onClick={() => dispatch({ type: "decrement" })}>\n        -\n      </button>\n    </div>\n  );\n}',
        description:
          'useReducer for more complex state logic. Similar to Redux, it takes a reducer function and initial state, returning the current state and a dispatch function.',
      },
    ],
  },
  {
    title: 'Effect Hooks',
    examples: [
      {
        code: '// Basic useEffect\nimport { useState, useEffect } from "react";\n\nfunction DataFetcher() {\n  const [data, setData] = useState(null);\n  \n  useEffect(() => {\n    // This runs after every render\n    console.log("Component rendered");\n  });\n  \n  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;\n}',
        description:
          'Basic useEffect that runs after every render. No dependency array means it runs after every render.',
      },
      {
        code: '// useEffect with dependencies\nfunction ProfilePage({ userId }) {\n  const [user, setUser] = useState(null);\n  \n  useEffect(() => {\n    // This effect runs when userId changes\n    fetchUser(userId).then(data => setUser(data));\n  }, [userId]); // Only re-run if userId changes\n  \n  return <div>{user ? user.name : "Loading..."}</div>;\n}',
        description:
          'useEffect with dependency array. The effect only runs when the dependencies (userId) change.',
      },
      {
        code: '// useEffect with empty dependencies\nfunction OnlyOnMount() {\n  useEffect(() => {\n    // This runs only once after initial render (mount)\n    console.log("Component mounted");\n  }, []); // Empty dependency array\n  \n  return <div>Check console for mount message</div>;\n}',
        description:
          'useEffect with empty dependency array runs only once after the initial render (component mount).',
      },
      {
        code: '// useEffect with cleanup\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  \n  useEffect(() => {\n    const timer = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n    \n    // Cleanup function runs before next effect or unmount\n    return () => clearInterval(timer);\n  }, []); // Run once on mount\n  \n  return <div>Seconds: {seconds}</div>;\n}',
        description:
          'useEffect with cleanup function. The cleanup function runs before the component unmounts or before the effect runs again.',
      },
      {
        code: '// Multiple useEffect hooks\nfunction MultipleEffects() {\n  useEffect(() => {\n    // Handle one concern\n    document.title = "Page loaded";\n  }, []);\n  \n  useEffect(() => {\n    // Handle a different concern\n    const handler = () => console.log("clicked");\n    window.addEventListener("click", handler);\n    return () => window.removeEventListener("click", handler);\n  }, []);\n  \n  return <div>Check title and click anywhere</div>;\n}',
        description:
          'Using multiple useEffect hooks to separate concerns. Each effect handles a specific aspect of the component.',
      },
    ],
  },
  {
    title: 'Context Hooks',
    examples: [
      {
        code: '// Creating and using Context\nimport { createContext, useContext, useState } from "react";\n\n// Create a context with default value\nconst ThemeContext = createContext("light");\n\nfunction App() {\n  const [theme, setTheme] = useState("light");\n  \n  return (\n    <ThemeContext.Provider value={theme}>\n      <div>\n        <ThemedButton />\n        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>\n          Toggle Theme\n        </button>\n      </div>\n    </ThemeContext.Provider>\n  );\n}\n\nfunction ThemedButton() {\n  // Consume the context value\n  const theme = useContext(ThemeContext);\n  \n  return (\n    <button style={{ background: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#333" }}>\n      I am styled based on theme context!\n    </button>\n  );\n}',
        description:
          'Creating a context with createContext and consuming it with useContext. Provides a way to share values between components without prop drilling.',
      },
      {
        code: '// Using multiple contexts\nconst UserContext = createContext(null);\nconst ThemeContext = createContext("light");\n\nfunction ProfilePage() {\n  const user = useContext(UserContext);\n  const theme = useContext(ThemeContext);\n  \n  return (\n    <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>\n      {user ? `Welcome, ${user.name}!` : "Please log in"}\n    </div>\n  );\n}',
        description:
          'Using multiple contexts in a component. Each useContext call subscribes to a different context.',
      },
    ],
  },
  {
    title: 'Ref Hooks',
    examples: [
      {
        code: '// Accessing DOM elements\nimport { useRef, useEffect } from "react";\n\nfunction FocusInput() {\n  // Create a ref\n  const inputRef = useRef(null);\n  \n  // Focus the input on mount\n  useEffect(() => {\n    inputRef.current.focus();\n  }, []);\n  \n  return <input ref={inputRef} type="text" />;\n}',
        description:
          'Using useRef to access DOM elements directly. The ref object has a .current property that holds the DOM node.',
      },
      {
        code: '// Storing mutable values\nfunction StopWatch() {\n  const [time, setTime] = useState(0);\n  const intervalRef = useRef(null);\n  \n  const startTimer = () => {\n    intervalRef.current = setInterval(() => {\n      setTime(time => time + 1);\n    }, 1000);\n  };\n  \n  const stopTimer = () => {\n    clearInterval(intervalRef.current);\n  };\n  \n  useEffect(() => {\n    // Cleanup on unmount\n    return () => clearInterval(intervalRef.current);\n  }, []);\n  \n  return (\n    <div>\n      <p>Time: {time}s</p>\n      <button onClick={startTimer}>Start</button>\n      <button onClick={stopTimer}>Stop</button>\n    </div>\n  );\n}',
        description:
          'Using useRef to store mutable values that persist across renders without causing re-renders when changed.',
      },
      {
        code: '// Tracking previous values\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const prevCountRef = useRef();\n  \n  useEffect(() => {\n    // Store current value in ref after render\n    prevCountRef.current = count;\n  });\n  \n  const prevCount = prevCountRef.current;\n  \n  return (\n    <div>\n      <p>Now: {count}, before: {prevCount !== undefined ? prevCount : "N/A"}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}',
        description:
          'Using useRef to keep track of previous values. The ref value persists between renders and can be updated in effects.',
      },
    ],
  },
  {
    title: 'Performance Hooks',
    examples: [
      {
        code: '// useMemo for expensive calculations\nimport { useState, useMemo } from "react";\n\nfunction ExpensiveCalculation({ list, filter }) {\n  // Memoize the filtered list\n  const filteredList = useMemo(() => {\n    console.log("Filtering list...");\n    return list.filter(item => item.includes(filter));\n  }, [list, filter]); // Only recalculate when list or filter changes\n  \n  return (\n    <div>\n      <p>Filtered list has {filteredList.length} items</p>\n      <ul>\n        {filteredList.map((item, index) => (\n          <li key={index}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}',
        description:
          'useMemo memoizes expensive calculations, only recomputing when dependencies change. Useful for optimizing performance.',
      },
      {
        code: '// useCallback for memoizing functions\nimport { useState, useCallback } from "react";\n\nfunction ParentComponent() {\n  const [count, setCount] = useState(0);\n  \n  // Memoize the callback\n  const incrementCount = useCallback(() => {\n    setCount(c => c + 1);\n  }, []); // No dependencies, function never changes\n  \n  return (\n    <div>\n      <ChildComponent onIncrement={incrementCount} />\n      <p>Count: {count}</p>\n    </div>\n  );\n}\n\n// Child component that uses React.memo for optimization\nconst ChildComponent = React.memo(({ onIncrement }) => {\n  console.log("Child rendered");\n  return <button onClick={onIncrement}>Increment</button>;\n});',
        description:
          'useCallback memoizes functions, preventing unnecessary re-renders of child components that receive the function as a prop.',
      },
      {
        code: '// useCallback with dependencies\nfunction SearchComponent({ onSearch }) {\n  const [query, setQuery] = useState("");\n  \n  // This function will be recreated when query changes\n  const handleSearch = useCallback(() => {\n    onSearch(query);\n  }, [query, onSearch]); // Dependencies\n  \n  return (\n    <div>\n      <input\n        value={query}\n        onChange={e => setQuery(e.target.value)}\n        placeholder="Search..."\n      />\n      <button onClick={handleSearch}>Search</button>\n    </div>\n  );\n}',
        description:
          'useCallback with dependencies. The function is recreated only when the dependencies change.',
      },
    ],
  },
  {
    title: 'Custom Hooks',
    examples: [
      {
        code: '// Custom hook for form handling\nimport { useState } from "react";\n\nfunction useForm(initialValues) {\n  const [values, setValues] = useState(initialValues);\n  \n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setValues(prevValues => ({\n      ...prevValues,\n      [name]: value\n    }));\n  };\n  \n  const reset = () => {\n    setValues(initialValues);\n  };\n  \n  return { values, handleChange, reset };\n}\n\n// Using the custom hook\nfunction SignupForm() {\n  const { values, handleChange, reset } = useForm({\n    username: "",\n    email: "",\n    password: ""\n  });\n  \n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log("Form submitted:", values);\n    reset();\n  };\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        name="username"\n        value={values.username}\n        onChange={handleChange}\n        placeholder="Username"\n      />\n      {/* Other inputs */}\n      <button type="submit">Sign Up</button>\n    </form>\n  );\n}',
        description:
          'Creating a custom hook for form handling. Custom hooks let you extract component logic into reusable functions.',
      },
      {
        code: '// Custom hook for data fetching\nimport { useState, useEffect } from "react";\n\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  \n  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        setLoading(true);\n        const response = await fetch(url);\n        if (!response.ok) {\n          throw new Error(`HTTP error! status: ${response.status}`);\n        }\n        const result = await response.json();\n        setData(result);\n        setError(null);\n      } catch (e) {\n        setError(e.message);\n        setData(null);\n      } finally {\n        setLoading(false);\n      }\n    };\n    \n    fetchData();\n  }, [url]);\n  \n  return { data, loading, error };\n}\n\n// Using the custom hook\nfunction UserProfile({ userId }) {\n  const { data, loading, error } = useFetch(\n    `https://api.example.com/users/${userId}`\n  );\n  \n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error}</div>;\n  \n  return (\n    <div>\n      <h1>{data.name}</h1>\n      <p>{data.email}</p>\n    </div>\n  );\n}',
        description:
          'Custom hook for data fetching. Encapsulates loading, error, and data states for reuse across components.',
      },
    ],
  },
];

const ReactHooksCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<HookCategory[]>(
    reactHooksExamplesData
  );
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter examples based on search query
  const filterExamples = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(reactHooksExamplesData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = reactHooksExamplesData
      .map((category) => {
        const matchedExamples = category.examples.filter(
          (example) =>
            example.code.toLowerCase().includes(query) ||
            example.description.toLowerCase().includes(query) ||
            (example.output && example.output.toLowerCase().includes(query))
        );

        return {
          ...category,
          examples: matchedExamples,
        };
      })
      .filter((category) => category.examples.length > 0);

    setFilteredData(filtered);
  }, [searchQuery]);

  // Apply filtering when search query changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      filterExamples();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterExamples]);

  // Handle copy to clipboard
  const handleCopy = async (text: string, exampleId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ ...copyStatus, [exampleId]: '✓' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [exampleId]: '' }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus({ ...copyStatus, [exampleId]: 'Failed!' });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [exampleId]: '' }));
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          <SiReact className="inline-block mr-2" /> React Hooks Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference for React Hooks, including state management,
          effects, context, refs, and performance optimization. Click the copy
          button to copy any code snippet to your clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={reactHooksExamplesData} />

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
              placeholder="Search hooks, examples, or descriptions..."
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

      {/* Examples by Category */}
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
                {category.examples.map((example, index) => {
                  const exampleId = `${category.title}-${index}`;
                  return (
                    <div
                      key={exampleId}
                      className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                            <div className="flex items-center justify-between">
                              <div className="overflow-hidden max-w-[calc(100%-30px)]">
                                <pre className="text-primary-text dark:text-dark-primary-text whitespace-pre-wrap break-all">
                                  {example.code}
                                </pre>
                              </div>
                              <button
                                onClick={() =>
                                  handleCopy(example.code, exampleId)
                                }
                                className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                                title="Copy to clipboard"
                              >
                                {copyStatus[exampleId] ? (
                                  <span className="text-xs">
                                    {copyStatus[exampleId]}
                                  </span>
                                ) : (
                                  <FaCopy />
                                )}
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            {example.description}
                          </p>
                          {example.output && (
                            <div className="mt-2 font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-400">
                              Output: {example.output}
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
              No examples found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* About React Hooks Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About React Hooks
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>React Hooks</strong> were introduced in React 16.8 as a way
            to use state and other React features without writing a class
            component. They enable functional components to manage state, side
            effects, context, and more.
          </p>
          <p>
            <strong>Key benefits of React Hooks:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Reuse stateful logic between components</li>
            <li>Split complex components into smaller functions</li>
            <li>Use React features without classes</li>
            <li>Avoid the confusion of 'this' in JavaScript</li>
            <li>Organize side effects in components by related pieces</li>
            <li>
              Avoid wrapper hell from higher-order components and render props
            </li>
          </ul>
          <p className="mt-2">
            Hooks follow two important rules: only call hooks at the top level
            (not inside loops, conditions, or nested functions), and only call
            hooks from React function components or custom hooks.
          </p>
          <p>
            For more information, visit the{' '}
            <a
              href="https://reactjs.org/docs/hooks-intro.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official React Hooks documentation
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default ReactHooksCheatSheetPage;

import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaPython, FaSearch } from 'react-icons/fa';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface PythonExample {
  code: string;
  description: string;
  output?: string;
}

// Interface for command category
interface CodeCategory {
  title: string;
  examples: PythonExample[];
}

// Python code examples organized by category
const pythonExamplesData: CodeCategory[] = [
  {
    title: 'Basic Syntax',
    examples: [
      {
        code: '# This is a comment',
        description: 'Single line comment',
      },
      {
        code: '"""\nThis is a\nmulti-line comment\n"""',
        description: 'Multi-line comment (docstring)',
      },
      {
        code: 'x = 5',
        description: 'Variable assignment',
      },
      {
        code: 'x, y, z = 1, 2, 3',
        description: 'Multiple assignment',
      },
      {
        code: 'name = "John"\nage = 30\nprint(f"Name: {name}, Age: {age}")',
        description: 'F-string for string interpolation (Python 3.6+)',
        output: 'Name: John, Age: 30',
      },
      {
        code: 'if x > 0:\n    print("Positive")\n    x += 1',
        description: 'Indentation is used to define code blocks',
      },
    ],
  },
  {
    title: 'Data Types',
    examples: [
      {
        code: '# Numbers\nx = 10       # int\ny = 3.14     # float\nz = 1 + 2j   # complex',
        description: 'Numeric data types',
      },
      {
        code: '# Strings\nname = "Python"\nchar = name[0]    # Access character: P\nslice = name[0:2]  # Slice: Py',
        description: 'String data type and operations',
      },
      {
        code: '# String methods\ntext = "  Hello, World!  "\nprint(text.upper())       # HELLO, WORLD!\nprint(text.lower())       # hello, world!\nprint(text.strip())       # Hello, World!\nprint(text.replace("H", "J"))  # Jello, World!',
        description: 'Common string methods',
      },
      {
        code: '# String splitting and joining\nwords = "apple,banana,orange"\nfruit_list = words.split(",")  # ["apple", "banana", "orange"]\njoined = "-".join(fruit_list)  # "apple-banana-orange"',
        description: 'String splitting and joining',
      },
      {
        code: '# Boolean\nis_valid = True\nis_active = False',
        description: 'Boolean data type',
      },
      {
        code: '# None type\nresult = None',
        description: 'None type (represents absence of value)',
      },
    ],
  },
  {
    title: 'Data Structures',
    examples: [
      {
        code: '# Lists (mutable, ordered)\nfruits = ["apple", "banana", "cherry"]\nprint(fruits[0])        # apple\nprint(fruits[-1])       # cherry\nprint(fruits[1:3])      # ["banana", "cherry"]\nfruits.append("orange") # Add to end\nfruits.insert(1, "mango") # Insert at position\nfruits.remove("banana")  # Remove by value\npopped = fruits.pop()    # Remove and return last item\nfruits.sort()           # Sort in place\nlen(fruits)             # Get length',
        description: 'Lists and common list operations',
      },
      {
        code: '# Tuples (immutable, ordered)\ncoordinates = (10, 20)\nx, y = coordinates     # Unpacking\npoint = (1,)           # Single item tuple needs trailing comma',
        description: 'Tuples and operations',
      },
      {
        code: '# Dictionaries (mutable, unordered key-value pairs)\nuser = {\n    "name": "John",\n    "age": 30,\n    "is_admin": False\n}\nprint(user["name"])     # Access by key\nuser["email"] = "john@example.com"  # Add/update\nuser.get("phone", "Not found")  # Safe access with default\nuser.keys()            # Get all keys\nuser.values()          # Get all values\nuser.items()           # Get all key-value pairs as tuples\ndel user["age"]        # Delete a key',
        description: 'Dictionaries and operations',
      },
      {
        code: '# Sets (mutable, unordered, unique items)\ncolors = {"red", "green", "blue"}\ncolors.add("yellow")   # Add item\ncolors.remove("green")  # Remove item (raises error if not found)\ncolors.discard("black") # Remove if present (no error if not found)\n"red" in colors        # Check membership\nset1 = {"a", "b", "c"}\nset2 = {"c", "d", "e"}\nprint(set1 | set2)      # Union: {"a", "b", "c", "d", "e"}\nprint(set1 & set2)      # Intersection: {"c"}\nprint(set1 - set2)      # Difference: {"a", "b"}',
        description: 'Sets and set operations',
      },
    ],
  },
  {
    title: 'Control Flow',
    examples: [
      {
        code: '# If, elif, else\nx = 10\nif x > 0:\n    print("Positive")\nelif x < 0:\n    print("Negative")\nelse:\n    print("Zero")',
        description: 'Conditional statements',
      },
      {
        code: '# For loops\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# For loop with range\nfor i in range(5):  # 0 to 4\n    print(i)\n\n# For loop with enumerate\nfor index, value in enumerate(fruits):\n    print(f"{index}: {value}")',
        description: 'For loops with different iterables',
      },
      {
        code: '# While loops\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1',
        description: 'While loop',
      },
      {
        code: '# Break and continue\nfor i in range(10):\n    if i == 3:\n        continue  # Skip this iteration\n    if i == 7:\n        break     # Exit the loop\n    print(i)',
        description: 'Break and continue statements',
        output: '0 1 2 4 5 6',
      },
    ],
  },
  {
    title: 'Functions',
    examples: [
      {
        code: '# Basic function\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("John"))  # Hello, John!',
        description: 'Defining and calling functions',
      },
      {
        code: '# Default parameters\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("John"))          # Hello, John!\nprint(greet("John", "Hi"))    # Hi, John!',
        description: 'Functions with default parameters',
      },
      {
        code: '# Positional and keyword arguments\ndef describe_person(name, age, city):\n    return f"{name} is {age} years old and lives in {city}"\n\n# Positional arguments\nprint(describe_person("John", 30, "New York"))\n\n# Keyword arguments\nprint(describe_person(age=30, city="New York", name="John"))',
        description: 'Positional and keyword arguments',
      },
      {
        code: '# Variable number of arguments\ndef sum_all(*args):\n    return sum(args)\n\nprint(sum_all(1, 2, 3, 4))  # 10\n\n# Variable number of keyword arguments\ndef user_info(**kwargs):\n    return kwargs\n\nprint(user_info(name="John", age=30, city="New York"))',
        description: 'Variable number of arguments',
      },
      {
        code: '# Lambda functions (anonymous functions)\nsquare = lambda x: x * x\nprint(square(5))  # 25\n\n# Lambda with multiple arguments\nsum_func = lambda x, y: x + y\nprint(sum_func(3, 4))  # 7',
        description: 'Lambda functions',
      },
    ],
  },
  {
    title: 'Modules & Imports',
    examples: [
      {
        code: '# Importing a module\nimport math\nprint(math.sqrt(16))  # 4.0',
        description: 'Importing a module',
      },
      {
        code: '# Importing specific functions\nfrom math import sqrt, pi\nprint(sqrt(16))  # 4.0\nprint(pi)       # 3.141592653589793',
        description: 'Importing specific items from a module',
      },
      {
        code: '# Importing with an alias\nimport math as m\nprint(m.sqrt(16))  # 4.0\n\nfrom math import sqrt as square_root\nprint(square_root(16))  # 4.0',
        description: 'Importing with aliases',
      },
      {
        code: '# Common standard library modules\nimport os               # Operating system interface\nimport sys              # System-specific parameters and functions\nimport datetime         # Date and time manipulation\nimport json             # JSON encoding and decoding\nimport random           # Generate random numbers\nimport re               # Regular expressions\nimport collections      # Specialized container datatypes\nimport itertools        # Functions for efficient looping\nimport functools        # Higher-order functions\nimport pathlib          # Object-oriented filesystem paths',
        description: 'Common standard library modules',
      },
    ],
  },
  {
    title: 'File I/O',
    examples: [
      {
        code: '# Reading a file (basic)\nfile = open("example.txt", "r")\ncontent = file.read()\nfile.close()\nprint(content)',
        description: 'Basic file reading',
      },
      {
        code: '# Reading a file (with context manager - recommended)\nwith open("example.txt", "r") as file:\n    content = file.read()\nprint(content)',
        description:
          'Reading a file with context manager (automatically closes file)',
      },
      {
        code: '# Reading lines\nwith open("example.txt", "r") as file:\n    lines = file.readlines()  # Returns a list of lines\n    \n# Or iterate through lines\nwith open("example.txt", "r") as file:\n    for line in file:\n        print(line.strip())',
        description: 'Reading lines from a file',
      },
      {
        code: '# Writing to a file\nwith open("output.txt", "w") as file:\n    file.write("Hello, World!\\n")\n    file.write("Another line.")',
        description: 'Writing to a file',
      },
      {
        code: '# Appending to a file\nwith open("output.txt", "a") as file:\n    file.write("\\nAppended line.")',
        description: 'Appending to a file',
      },
    ],
  },
  {
    title: 'List Comprehensions',
    examples: [
      {
        code: '# Basic list comprehension\nnumbers = [1, 2, 3, 4, 5]\nsquares = [x * x for x in numbers]\nprint(squares)  # [1, 4, 9, 16, 25]',
        description:
          'Creating a new list by applying an expression to each item',
      },
      {
        code: '# List comprehension with condition\neven_squares = [x * x for x in numbers if x % 2 == 0]\nprint(even_squares)  # [4, 16]',
        description: 'List comprehension with filtering',
      },
      {
        code: '# Nested list comprehension\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflattened = [num for row in matrix for num in row]\nprint(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]',
        description: 'Flattening a nested list',
      },
      {
        code: '# Dictionary comprehension\nnames = ["Alice", "Bob", "Charlie"]\nname_lengths = {name: len(name) for name in names}\nprint(name_lengths)  # {"Alice": 5, "Bob": 3, "Charlie": 7}',
        description: 'Creating a dictionary using comprehension',
      },
      {
        code: '# Set comprehension\nnumbers = [1, 2, 2, 3, 4, 4, 5]\nunique_squares = {x * x for x in numbers}\nprint(unique_squares)  # {1, 4, 9, 16, 25}',
        description: 'Creating a set using comprehension',
      },
    ],
  },
  {
    title: 'Error Handling',
    examples: [
      {
        code: '# Basic try-except\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")',
        description: 'Catching a specific exception',
      },
      {
        code: '# Multiple except blocks\ntry:\n    num = int("abc")\nexcept ValueError:\n    print("Invalid conversion")\nexcept ZeroDivisionError:\n    print("Division by zero")',
        description: 'Handling different exceptions',
      },
      {
        code: '# Catching any exception\ntry:\n    result = 10 / 0\nexcept Exception as e:\n    print(f"An error occurred: {e}")',
        description: 'Catching any exception and accessing the error message',
      },
      {
        code: '# Try-except-else-finally\ntry:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print("Division by zero")\nelse:\n    print(f"Result: {result}")  # Runs if no exception\nfinally:\n    print("This always executes")',
        description: 'Complete try-except structure with else and finally',
      },
      {
        code: '# Raising exceptions\ndef divide(a, b):\n    if b == 0:\n        raise ValueError("Cannot divide by zero")\n    return a / b\n\ntry:\n    result = divide(10, 0)\nexcept ValueError as e:\n    print(e)',
        description: 'Raising custom exceptions',
      },
    ],
  },
  {
    title: 'Classes & Objects',
    examples: [
      {
        code: '# Basic class definition\nclass Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hello, my name is {self.name}"\n\n# Creating an instance\nperson = Person("John", 30)\nprint(person.name)     # John\nprint(person.greet())  # Hello, my name is John',
        description: 'Defining a class and creating objects',
      },
      {
        code: '# Inheritance\nclass Employee(Person):\n    def __init__(self, name, age, employee_id):\n        super().__init__(name, age)  # Call parent constructor\n        self.employee_id = employee_id\n    \n    def get_id(self):\n        return f"Employee ID: {self.employee_id}"\n\nemployee = Employee("Alice", 25, "E12345")\nprint(employee.greet())  # Inherited method\nprint(employee.get_id())',
        description: 'Class inheritance',
      },
      {
        code: '# Class variables vs instance variables\nclass Counter:\n    count = 0  # Class variable shared by all instances\n    \n    def __init__(self, name):\n        self.name = name  # Instance variable unique to each instance\n        Counter.count += 1\n    \nc1 = Counter("First")\nc2 = Counter("Second")\nprint(Counter.count)  # 2\nprint(c1.name)       # First\nprint(c2.name)       # Second',
        description: 'Class variables and instance variables',
      },
      {
        code: '# Special methods\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __str__(self):\n        return f"Point({self.x}, {self.y})"\n    \n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n\np1 = Point(1, 2)\np2 = Point(3, 4)\nprint(p1)        # Point(1, 2)\nprint(p1 + p2)   # Point(4, 6)',
        description: 'Special (magic/dunder) methods',
      },
    ],
  },
  {
    title: 'Advanced Python Features',
    examples: [
      {
        code: '# Generators\ndef count_up_to(max):\n    count = 1\n    while count <= max:\n        yield count\n        count += 1\n\ncounter = count_up_to(5)\nfor num in counter:\n    print(num)  # 1, 2, 3, 4, 5',
        description: 'Generator functions using yield',
      },
      {
        code: '# Decorators\ndef log_function_call(func):\n    def wrapper(*args, **kwargs):\n        print(f"Calling {func.__name__}")\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} returned {result}")\n        return result\n    return wrapper\n\n@log_function_call\ndef add(a, b):\n    return a + b\n\nresult = add(3, 5)',
        description: 'Function decorators',
        output: 'Calling add\nadd returned 8',
      },
      {
        code: '# Context managers\nclass FileManager:\n    def __init__(self, filename, mode):\n        self.filename = filename\n        self.mode = mode\n        self.file = None\n    \n    def __enter__(self):\n        self.file = open(self.filename, self.mode)\n        return self.file\n    \n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.file.close()\n\nwith FileManager("example.txt", "w") as f:\n    f.write("Hello, World!")',
        description: 'Creating a custom context manager',
      },
      {
        code: '# Type hints (Python 3.5+)\nfrom typing import List, Dict, Tuple, Optional\n\ndef greet_all(names: List[str]) -> str:\n    return ", ".join(names)\n\ndef process_data(data: Dict[str, int], flag: Optional[bool] = None) -> Tuple[int, int]:\n    total = sum(data.values())\n    count = len(data)\n    return total, count',
        description: 'Type hints for better code documentation',
      },
    ],
  },
];

const PythonCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<CodeCategory[]>(pythonExamplesData);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter examples based on search query
  const filterExamples = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(pythonExamplesData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = pythonExamplesData
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
          <FaPython className="inline-block mr-2" /> Python Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of Python 3 syntax, data structures, and
          common operations. Click the copy button to copy any code snippet to
          your clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={pythonExamplesData} />

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
              placeholder="Search code examples or descriptions..."
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
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded flex justify-between items-center">
                            <pre className="text-primary-text dark:text-dark-primary-text whitespace-pre-wrap overflow-x-auto">
                              {example.code}
                            </pre>
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

      {/* About Python Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Python
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Python</strong> is a high-level, interpreted programming
            language known for its readability and simplicity. It emphasizes
            code readability with its notable use of significant whitespace.
          </p>
          <p>
            <strong>Key features of Python:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Easy to learn and use with clean, readable syntax</li>
            <li>Dynamically typed and garbage-collected</li>
            <li>
              Supports multiple programming paradigms (procedural,
              object-oriented, functional)
            </li>
            <li>
              Extensive standard library ("batteries included" philosophy)
            </li>
            <li>Large ecosystem of third-party packages</li>
            <li>Cross-platform compatibility</li>
            <li>Strong community support and documentation</li>
          </ul>
          <p className="mt-2">
            Python is widely used in web development, data science, machine
            learning, artificial intelligence, scientific computing, automation,
            and more.
          </p>
          <p>
            For more information, visit the{' '}
            <a
              href="https://www.python.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official Python website
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default PythonCheatSheetPage;

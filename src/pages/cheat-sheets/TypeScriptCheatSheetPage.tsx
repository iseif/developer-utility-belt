import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaSearch } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface TypeScriptExample {
  code: string;
  description: string;
  output?: string;
}

// Interface for command category
interface CodeCategory {
  title: string;
  examples: TypeScriptExample[];
}

// TypeScript code examples organized by category
const typeScriptExamplesData: CodeCategory[] = [
  {
    title: 'Basic Types',
    examples: [
      {
        code: '// Primitive types\nlet str: string = "Hello";\nlet num: number = 42;\nlet bool: boolean = true;\nlet n: null = null;\nlet u: undefined = undefined;',
        description: 'Basic primitive types in TypeScript',
      },
      {
        code: '// Special types\nlet anyType: any = "anything";\nanyType = 100; // No error\n\nlet unknownType: unknown = 4;\n// unknownType.toFixed(); // Error: Object is of type unknown\nif (typeof unknownType === "number") {\n  unknownType.toFixed(); // OK\n}\n\nfunction neverReturns(): never {\n  throw new Error("This function never returns");\n}',
        description: 'Special types: any, unknown, and never',
      },
      {
        code: "// Type inference\nlet inferred = \"TypeScript\"; // Type is inferred as string\n// inferred = 42; // Error: Type 'number' is not assignable to type 'string'",
        description: 'TypeScript can infer types without explicit annotations',
      },
      {
        code: '// Type assertions\nlet someValue: unknown = "this is a string";\nlet strLength1: number = (someValue as string).length;\nlet strLength2: number = (<string>someValue).length; // Alternative syntax',
        description: 'Type assertions to tell the compiler about the type',
      },
    ],
  },
  {
    title: 'Arrays & Tuples',
    examples: [
      {
        code: '// Arrays\nlet list1: number[] = [1, 2, 3];\nlet list2: Array<number> = [1, 2, 3]; // Generic array type\n\n// Mixed type array\nlet mixed: (string | number)[] = ["hello", 42];\n\n// Readonly array\nconst readonlyArray: ReadonlyArray<number> = [1, 2, 3];\n// readonlyArray[0] = 12; // Error: Index signature in type is readonly',
        description: 'Array type declarations and variations',
      },
      {
        code: '// Tuples\nlet tuple: [string, number] = ["hello", 10];\nconsole.log(tuple[0]); // "hello"\nconsole.log(tuple[1]); // 10\n\n// Named tuples\nlet person: [name: string, age: number] = ["Alice", 25];\n\n// Optional tuple elements\nlet optTuple: [string, number?] = ["hello"];\n\n// Readonly tuple\nconst readonlyTuple: readonly [string, number] = ["hello", 42];\n// readonlyTuple[0] = "world"; // Error: Cannot assign to \'0\' because it is a read-only property',
        description:
          'Tuples for fixed-length arrays with specific types at each position',
      },
    ],
  },
  {
    title: 'Interfaces & Type Aliases',
    examples: [
      {
        code: '// Interface definition\ninterface Person {\n  name: string;\n  age: number;\n  email?: string; // Optional property\n  readonly id: number; // Read-only property\n}\n\nconst alice: Person = {\n  name: "Alice",\n  age: 30,\n  id: 1\n};\n// alice.id = 2; // Error: Cannot assign to \'id\' because it is a read-only property',
        description:
          'Interfaces define object shapes with optional and readonly properties',
      },
      {
        code: '// Interface extension\ninterface Animal {\n  name: string;\n}\n\ninterface Dog extends Animal {\n  breed: string;\n}\n\nconst dog: Dog = {\n  name: "Rex",\n  breed: "German Shepherd"\n};',
        description: 'Interfaces can extend other interfaces',
      },
      {
        code: '// Type aliases\ntype ID = string | number;\nlet id: ID = 101;\nid = "A101"; // Both are valid\n\ntype Point = {\n  x: number;\n  y: number;\n};\n\nconst point: Point = { x: 10, y: 20 };',
        description:
          'Type aliases create custom names for types and can represent unions, primitives, or object shapes',
      },
      {
        code: '// Index signatures\ninterface Dictionary {\n  [key: string]: string;\n}\n\nconst colors: Dictionary = {\n  red: "#ff0000",\n  green: "#00ff00",\n  blue: "#0000ff"\n};',
        description: 'Index signatures for objects with dynamic property names',
      },
    ],
  },
  {
    title: 'Union & Intersection Types',
    examples: [
      {
        code: '// Union types\ntype Status = "pending" | "approved" | "rejected";\nlet currentStatus: Status = "pending";\n// currentStatus = "waiting"; // Error: Type \'"waiting"\' is not assignable to type \'Status\'\n\nfunction printId(id: number | string) {\n  console.log(`ID: ${id}`);\n  \n  if (typeof id === "string") {\n    console.log(id.toUpperCase()); // Works with string methods\n  } else {\n    console.log(id.toFixed(2)); // Works with number methods\n  }\n}',
        description: 'Union types allow a value to be one of several types',
      },
      {
        code: '// Intersection types\ntype Employee = {\n  id: number;\n  name: string;\n};\n\ntype Manager = {\n  employees: Employee[];\n  department: string;\n};\n\ntype ManagerWithId = Employee & Manager;\n\nconst manager: ManagerWithId = {\n  id: 1,\n  name: "John",\n  employees: [{ id: 2, name: "Alice" }],\n  department: "Engineering"\n};',
        description: 'Intersection types combine multiple types into one',
      },
      {
        code: '// Type narrowing with discriminated unions\ntype Circle = {\n  kind: "circle";\n  radius: number;\n};\n\ntype Rectangle = {\n  kind: "rectangle";\n  width: number;\n  height: number;\n};\n\ntype Shape = Circle | Rectangle;\n\nfunction getArea(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle":\n      return Math.PI * shape.radius ** 2;\n    case "rectangle":\n      return shape.width * shape.height;\n  }\n}',
        description:
          'Discriminated unions for type-safe handling of different shapes',
      },
    ],
  },
  {
    title: 'Functions',
    examples: [
      {
        code: '// Function type annotations\nfunction add(x: number, y: number): number {\n  return x + y;\n}\n\n// Optional parameters\nfunction greet(name: string, greeting?: string): string {\n  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;\n}\n\n// Default parameters\nfunction createPoint(x = 0, y = 0): [number, number] {\n  return [x, y];\n}',
        description:
          'Function declarations with type annotations, optional and default parameters',
      },
      {
        code: '// Function types\ntype MathFunc = (x: number, y: number) => number;\n\nconst multiply: MathFunc = (x, y) => x * y;\n\n// Function with rest parameters\nfunction sum(...numbers: number[]): number {\n  return numbers.reduce((total, n) => total + n, 0);\n}\n\nconsole.log(sum(1, 2, 3, 4)); // 10',
        description: 'Function type definitions and rest parameters',
      },
      {
        code: '// Function overloads\nfunction makeDate(timestamp: number): Date;\nfunction makeDate(year: number, month: number, day: number): Date;\nfunction makeDate(yearOrTimestamp: number, month?: number, day?: number): Date {\n  if (month !== undefined && day !== undefined) {\n    return new Date(yearOrTimestamp, month - 1, day);\n  } else {\n    return new Date(yearOrTimestamp);\n  }\n}\n\nconst d1 = makeDate(1234567890);\nconst d2 = makeDate(2023, 1, 14);',
        description:
          'Function overloads for functions that can be called in multiple ways',
      },
      {
        code: '// this parameter\ninterface User {\n  id: number;\n  admin: boolean;\n  becomeAdmin: () => void;\n}\n\nconst user: User = {\n  id: 123,\n  admin: false,\n  becomeAdmin() {\n    this.admin = true;\n  },\n};',
        description: 'Typing the "this" parameter in methods',
      },
    ],
  },
  {
    title: 'Generics',
    examples: [
      {
        code: '// Basic generic function\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nconst num = identity<number>(42); // Explicitly specify type\nconst str = identity("hello"); // Type inferred as string',
        description: 'Generic functions allow for reusable, type-safe code',
      },
      {
        code: '// Generic interfaces\ninterface Box<T> {\n  contents: T;\n}\n\nconst box1: Box<string> = { contents: "hello" };\nconst box2: Box<number> = { contents: 42 };',
        description: 'Generic interfaces for reusable component types',
      },
      {
        code: "// Generic constraints\ninterface Lengthwise {\n  length: number;\n}\n\nfunction logLength<T extends Lengthwise>(arg: T): T {\n  console.log(arg.length); // Now we know it has a .length property\n  return arg;\n}\n\nlogLength(\"hello\"); // 5\nlogLength([1, 2, 3]); // 3\n// logLength(123); // Error: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'",
        description:
          'Generic constraints to limit the types that can be used with a generic',
      },
      {
        code: '// Generic classes\nclass Queue<T> {\n  private data: T[] = [];\n  \n  push(item: T): void {\n    this.data.push(item);\n  }\n  \n  pop(): T | undefined {\n    return this.data.shift();\n  }\n}\n\nconst numberQueue = new Queue<number>();\nnumberQueue.push(10);\nnumberQueue.push(20);\nconst item = numberQueue.pop(); // Type is number | undefined',
        description: 'Generic classes for type-safe collections',
      },
    ],
  },
  {
    title: 'Enums',
    examples: [
      {
        code: '// Numeric enums\nenum Direction {\n  Up, // 0\n  Down, // 1\n  Left, // 2\n  Right, // 3\n}\n\nlet dir: Direction = Direction.Up;\nconsole.log(dir); // 0\n\n// Enums with custom values\nenum HttpStatus {\n  OK = 200,\n  BadRequest = 400,\n  Unauthorized = 401,\n  NotFound = 404,\n}\n\nconst status: HttpStatus = HttpStatus.OK;\nconsole.log(status); // 200',
        description: 'Numeric enums with auto-incremented or custom values',
      },
      {
        code: '// String enums\nenum Color {\n  Red = "RED",\n  Green = "GREEN",\n  Blue = "BLUE",\n}\n\nconst color: Color = Color.Green;\nconsole.log(color); // "GREEN"',
        description: 'String enums for better readability and debugging',
      },
      {
        code: '// Const enums (removed during compilation)\nconst enum Features {\n  None = 0,\n  Basic = 1,\n  Premium = 2,\n  Enterprise = 3,\n}\n\nconst feature: Features = Features.Premium;\n// Compiles to: const feature = 2;',
        description:
          'Const enums are inlined during compilation for better performance',
      },
    ],
  },
  {
    title: 'Classes',
    examples: [
      {
        code: '// Basic class\nclass Person {\n  name: string;\n  age: number;\n  \n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  greet(): string {\n    return `Hello, my name is ${this.name}`;\n  }\n}\n\nconst person = new Person("Alice", 30);\nconsole.log(person.greet()); // "Hello, my name is Alice"',
        description: 'Basic class definition with properties and methods',
      },
      {
        code: '// Access modifiers\nclass Employee {\n  private id: number;\n  protected department: string;\n  public name: string;\n  \n  constructor(id: number, name: string, department: string) {\n    this.id = id;\n    this.name = name;\n    this.department = department;\n  }\n  \n  private generateReport(): string {\n    return `Employee ${this.id}: ${this.name}`;\n  }\n  \n  public getReport(): string {\n    return this.generateReport();\n  }\n}\n\nclass Manager extends Employee {\n  constructor(id: number, name: string) {\n    super(id, name, "Management");\n    // this.id = id; // Error: Property \'id\' is private\n    this.department = "Executive"; // OK: \'department\' is protected\n  }\n}',
        description: 'Access modifiers: public, private, and protected',
      },
      {
        code: '// Parameter properties shorthand\nclass User {\n  constructor(\n    public username: string,\n    private password: string,\n    readonly createdAt: Date = new Date()\n  ) {}\n  \n  checkPassword(pwd: string): boolean {\n    return this.password === pwd;\n  }\n}\n\nconst user = new User("john_doe", "secret123");\nconsole.log(user.username); // "john_doe"\n// console.log(user.password); // Error: Property \'password\' is private',
        description:
          'Parameter properties shorthand for declaring and initializing class members',
      },
      {
        code: '// Getters and setters\nclass Circle {\n  private _radius: number = 0;\n  \n  get radius(): number {\n    return this._radius;\n  }\n  \n  set radius(value: number) {\n    if (value >= 0) {\n      this._radius = value;\n    } else {\n      throw new Error("Radius cannot be negative");\n    }\n  }\n  \n  get area(): number {\n    return Math.PI * this._radius ** 2;\n  }\n}\n\nconst circle = new Circle();\ncircle.radius = 5;\nconsole.log(circle.radius); // 5\nconsole.log(circle.area); // ~78.54',
        description: 'Getters and setters for controlled access to properties',
      },
      {
        code: '// Abstract classes\nabstract class Shape {\n  abstract getArea(): number;\n  \n  printArea(): void {\n    console.log(`Area: ${this.getArea()}`);\n  }\n}\n\nclass Square extends Shape {\n  constructor(private side: number) {\n    super();\n  }\n  \n  getArea(): number {\n    return this.side ** 2;\n  }\n}\n\n// const shape = new Shape(); // Error: Cannot create an instance of an abstract class\nconst square = new Square(10);\nsquare.printArea(); // "Area: 100"',
        description:
          'Abstract classes provide a base for subclasses but cannot be instantiated directly',
      },
    ],
  },
  {
    title: 'Utility Types',
    examples: [
      {
        code: '// Partial<T>\ninterface Todo {\n  title: string;\n  description: string;\n  completed: boolean;\n}\n\nfunction updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {\n  return { ...todo, ...fieldsToUpdate };\n}\n\nconst todo: Todo = {\n  title: "Learn TypeScript",\n  description: "Study utility types",\n  completed: false\n};\n\nconst updatedTodo = updateTodo(todo, { completed: true });',
        description: 'Partial<T> makes all properties of T optional',
      },
      {
        code: '// Readonly<T>\ninterface Config {\n  host: string;\n  port: number;\n}\n\nconst config: Readonly<Config> = {\n  host: "localhost",\n  port: 3000\n};\n// config.port = 4000; // Error: Cannot assign to \'port\' because it is a read-only property',
        description: 'Readonly<T> makes all properties of T readonly',
      },
      {
        code: '// Pick<T, K>\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  address: string;\n}\n\ntype UserBasicInfo = Pick<User, "id" | "name">;\n\nconst userInfo: UserBasicInfo = {\n  id: 1,\n  name: "John"\n  // email: "john@example.com" // Error: Object literal may only specify known properties\n};',
        description:
          'Pick<T, K> constructs a type with only the properties K from T',
      },
      {
        code: '// Omit<T, K>\ninterface Product {\n  id: number;\n  name: string;\n  price: number;\n  category: string;\n  stock: number;\n}\n\ntype ProductPreview = Omit<Product, "stock" | "category">;\n\nconst preview: ProductPreview = {\n  id: 1,\n  name: "Laptop",\n  price: 1299\n};',
        description:
          'Omit<T, K> constructs a type without the properties K from T',
      },
      {
        code: '// Record<K, T>\ntype PageInfo = {\n  title: string;\n  url: string;\n};\n\nconst pages: Record<string, PageInfo> = {\n  home: { title: "Home", url: "/" },\n  about: { title: "About", url: "/about" },\n  contact: { title: "Contact", url: "/contact" }\n};',
        description:
          'Record<K, T> constructs an object type with keys of type K and values of type T',
      },
      {
        code: '// Other utility types\ntype T0 = ReturnType<() => string>; // string\ntype T1 = Parameters<(x: number, y: string) => void>; // [number, string]\ntype T2 = Required<{ name?: string }>; // { name: string }\ntype T3 = NonNullable<string | null | undefined>; // string\ntype T4 = Extract<"a" | "b" | "c", "a" | "f">; // "a"\ntype T5 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"',
        description:
          'Other common utility types for working with function types and transforming types',
      },
    ],
  },
];

const TypeScriptCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CodeCategory[]>(
    typeScriptExamplesData
  );
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter examples based on search query
  const filterExamples = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(typeScriptExamplesData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = typeScriptExamplesData
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
          <SiTypescript className="inline-block mr-2" /> TypeScript Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of TypeScript syntax, types, interfaces, and
          common patterns. Click the copy button to copy any code snippet to
          your clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={typeScriptExamplesData} />

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

      {/* About TypeScript Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About TypeScript
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>TypeScript</strong> is a strongly typed programming language
            that builds on JavaScript, giving you better tooling at any scale.
            It adds static types to JavaScript, helping catch errors early
            during development.
          </p>
          <p>
            <strong>Key features of TypeScript:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Static typing with type inference</li>
            <li>Interfaces and type aliases for defining complex types</li>
            <li>Generics for creating reusable components</li>
            <li>Advanced type features like union and intersection types</li>
            <li>Object-oriented features with classes and interfaces</li>
            <li>Compatibility with existing JavaScript code</li>
            <li>Rich IDE support with intelligent code completion</li>
          </ul>
          <p className="mt-2">
            TypeScript is widely used in modern web development, particularly in
            large-scale applications, frameworks like Angular, and with React
            and Node.js.
          </p>
          <p>
            For more information, visit the{' '}
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official TypeScript website
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default TypeScriptCheatSheetPage;

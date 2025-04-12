import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaJava, FaSearch } from 'react-icons/fa';

// Interface for example data
interface JavaExample {
  code: string;
  description: string;
  output?: string;
}

// Interface for category
interface CodeCategory {
  title: string;
  examples: JavaExample[];
}

const javaExamplesData: CodeCategory[] = [
  {
    title: 'Basic Syntax',
    examples: [
      {
        code: '// Main method - entry point of Java application\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        description: 'Java program structure with main method',
        output: 'Hello, World!',
      },
      {
        code: '// Comments in Java\n// This is a single-line comment\n\n/* This is a\n   multi-line comment */\n\n/**\n * This is a documentation comment (Javadoc)\n * @author Developer\n */\npublic class Comments { }',
        description: 'Different types of comments in Java',
      },
      {
        code: '// Package declaration and imports\npackage com.example.myapp;\n\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.io.*; // Wildcard import\n\npublic class MyClass {\n    private List<String> items = new ArrayList<>();\n}',
        description: 'Package declaration and import statements',
      },
    ],
  },
  {
    title: 'Primitive Data Types',
    examples: [
      {
        code: "// Primitive data types\nbyte b = 127;            // 8-bit integer (-128 to 127)\nshort s = 32767;         // 16-bit integer (-32,768 to 32,767)\nint i = 2147483647;      // 32-bit integer (-2^31 to 2^31-1)\nlong l = 9223372036854775807L; // 64-bit integer (-2^63 to 2^63-1)\n\nfloat f = 3.14f;         // 32-bit floating point\ndouble d = 3.14159265359; // 64-bit floating point\n\nchar c = 'A';           // 16-bit Unicode character\nboolean bool = true;     // true or false",
        description: 'Java primitive data types with their sizes and ranges',
      },
      {
        code: '// Wrapper classes for primitives\nInteger intObj = 42;      // Autoboxing\nint primitiveInt = intObj; // Auto-unboxing\n\nDouble doubleObj = Double.valueOf(3.14);\nBoolean boolObj = Boolean.TRUE;\n\n// Useful methods in wrapper classes\nint parsed = Integer.parseInt("42");\ndouble max = Double.MAX_VALUE;\nboolean isDigit = Character.isDigit(\'9\');',
        description:
          'Wrapper classes for primitive types with autoboxing/unboxing and utility methods',
      },
      {
        code: '// Type casting\nint i = 100;\nlong l = i;      // Implicit casting (widening)\n\ndouble d = 3.14;\nint j = (int) d;  // Explicit casting (narrowing)\n// j is now 3 (decimal part is truncated)\n\n// Overflow example\nbyte b = (byte) 130; // Result is -126 due to overflow',
        description: 'Type casting between primitive types',
      },
    ],
  },
  {
    title: 'Variables & Operators',
    examples: [
      {
        code: '// Variable declaration and initialization\nint count;        // Declaration\ncount = 10;       // Assignment\nint total = 100;  // Declaration and initialization\n\n// Constants\nfinal double PI = 3.14159;\n// PI = 3.14; // Error: cannot assign a value to final variable\n\n// Variable scope\npublic void exampleMethod() {\n    int localVar = 5;  // Local variable\n    {\n        int blockVar = 10;  // Block scope\n    }\n    // blockVar is not accessible here\n}',
        description:
          'Variable declaration, initialization, constants, and scope',
      },
      {
        code: '// Arithmetic operators\nint a = 10, b = 3;\nint sum = a + b;       // 13\nint diff = a - b;      // 7\nint product = a * b;   // 30\nint quotient = a / b;  // 3 (integer division)\nint remainder = a % b; // 1\n\n// Compound assignment operators\nint x = 5;\nx += 3;  // x = x + 3 (8)\nx -= 2;  // x = x - 2 (6)\nx *= 4;  // x = x * 4 (24)\nx /= 3;  // x = x / 3 (8)\nx %= 5;  // x = x % 5 (3)',
        description: 'Arithmetic and compound assignment operators',
      },
      {
        code: '// Increment and decrement operators\nint i = 5;\nint j = i++;  // j = 5, i = 6 (post-increment)\nint k = ++i;  // k = 7, i = 7 (pre-increment)\n\nint m = 10;\nint n = m--;  // n = 10, m = 9 (post-decrement)\nint p = --m;  // p = 8, m = 8 (pre-decrement)',
        description: 'Increment and decrement operators',
      },
      {
        code: '// Comparison operators\nint a = 5, b = 10;\nboolean equal = (a == b);       // false\nboolean notEqual = (a != b);     // true\nboolean greater = (a > b);       // false\nboolean less = (a < b);          // true\nboolean greaterEqual = (a >= b); // false\nboolean lessEqual = (a <= b);    // true\n\n// Logical operators\nboolean x = true, y = false;\nboolean andResult = x && y;  // false (logical AND)\nboolean orResult = x || y;   // true (logical OR)\nboolean notResult = !x;      // false (logical NOT)\n\n// Short-circuit evaluation\nboolean result = (a > 0) && (b / a > 1);  // Second condition only evaluated if first is true',
        description: 'Comparison and logical operators',
      },
    ],
  },
  {
    title: 'Strings',
    examples: [
      {
        code: '// String creation and basic operations\nString str1 = "Hello";  // String literal\nString str2 = new String("World");  // Using constructor\n\n// String concatenation\nString combined = str1 + " " + str2;  // "Hello World"\nString concat = str1.concat(" ").concat(str2);  // "Hello World"\n\n// String length\nint length = combined.length();  // 11\n\n// String comparison\nboolean isEqual = str1.equals("Hello");  // true (compares content)\nboolean isSameRef = (str1 == "Hello");  // true (compares references, can be unreliable)\nint comparison = str1.compareTo(str2);  // negative value (lexicographically less)',
        description: 'String creation, concatenation, and basic operations',
      },
      {
        code: '// String methods\nString text = "Java Programming";\n\n// Substrings\nString sub1 = text.substring(5);     // "Programming"\nString sub2 = text.substring(0, 4);  // "Java"\n\n// Case conversion\nString upper = text.toUpperCase();  // "JAVA PROGRAMMING"\nString lower = text.toLowerCase();  // "java programming"\n\n// Searching\nboolean contains = text.contains("Prog");  // true\nint index = text.indexOf("Pro");          // 5\nint lastIndex = text.lastIndexOf("a");    // 3\n\n// Replacing\nString replaced = text.replace("Java", "Python");  // "Python Programming"\n\n// Trimming whitespace\nString withSpaces = "  Hello  ";\nString trimmed = withSpaces.trim();  // "Hello"',
        description: 'Common String methods for manipulation and searching',
      },
      {
        code: '// StringBuilder for efficient string manipulation\nStringBuilder sb = new StringBuilder();\n\n// Appending values\nsb.append("Hello");\nsb.append(" ");\nsb.append("World");\n\n// Other operations\nsb.insert(5, ",");      // "Hello, World"\nsb.replace(0, 5, "Hi");  // "Hi, World"\nsb.delete(2, 4);         // "Hi World"\nsb.reverse();            // "dlroW iH"\n\n// Converting to String\nString result = sb.toString();\n\n// StringBuilder is more efficient than String concatenation in loops\nStringBuilder numbers = new StringBuilder();\nfor (int i = 0; i < 10; i++) {\n    numbers.append(i);\n}\nString numString = numbers.toString();  // "0123456789"',
        description: 'StringBuilder for mutable, efficient string manipulation',
      },
    ],
  },
  {
    title: 'Control Flow',
    examples: [
      {
        code: '// If-else statements\nint score = 85;\n\nif (score >= 90) {\n    System.out.println("A grade");\n} else if (score >= 80) {\n    System.out.println("B grade");\n} else if (score >= 70) {\n    System.out.println("C grade");\n} else {\n    System.out.println("Below C grade");\n}\n\n// Ternary operator (conditional expression)\nString result = (score >= 60) ? "Pass" : "Fail";',
        description: 'If-else statements and ternary operator',
        output: 'B grade',
      },
      {
        code: '// Switch statement\nint day = 3;\nString dayName;\n\nswitch (day) {\n    case 1:\n        dayName = "Monday";\n        break;\n    case 2:\n        dayName = "Tuesday";\n        break;\n    case 3:\n        dayName = "Wednesday";\n        break;\n    case 4:\n        dayName = "Thursday";\n        break;\n    case 5:\n        dayName = "Friday";\n        break;\n    case 6:\n    case 7:\n        dayName = "Weekend";\n        break;\n    default:\n        dayName = "Invalid day";\n}\n\n// Enhanced switch (Java 12+)\nString dayType = switch (day) {\n    case 1, 2, 3, 4, 5 -> "Weekday";\n    case 6, 7 -> "Weekend";\n    default -> "Invalid day";\n};',
        description:
          'Switch statement with traditional and enhanced syntax (Java 12+)',
        output: 'Wednesday',
      },
      {
        code: '// For loop\nfor (int i = 0; i < 5; i++) {\n    System.out.print(i + " ");\n}\n// Output: 0 1 2 3 4\n\n// Enhanced for loop (for-each)\nint[] numbers = {1, 2, 3, 4, 5};\nfor (int num : numbers) {\n    System.out.print(num + " ");\n}\n// Output: 1 2 3 4 5\n\n// While loop\nint count = 0;\nwhile (count < 3) {\n    System.out.print(count + " ");\n    count++;\n}\n// Output: 0 1 2\n\n// Do-while loop (executes at least once)\nint x = 0;\ndo {\n    System.out.print(x + " ");\n    x++;\n} while (x < 3);\n// Output: 0 1 2',
        description:
          'Different types of loops: for, enhanced for, while, and do-while',
      },
      {
        code: '// Break and continue\nfor (int i = 0; i < 10; i++) {\n    if (i == 3) {\n        continue;  // Skip the rest of this iteration\n    }\n    if (i == 7) {\n        break;     // Exit the loop entirely\n    }\n    System.out.print(i + " ");\n}\n// Output: 0 1 2 4 5 6\n\n// Labeled break/continue\nouter: for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i == 1 && j == 1) {\n            break outer;  // Break out of both loops\n        }\n        System.out.print("(" + i + "," + j + ") ");\n    }\n}\n// Output: (0,0) (0,1) (0,2) (1,0)',
        description: 'Break and continue statements with labeled loops',
      },
    ],
  },
  {
    title: 'Arrays',
    examples: [
      {
        code: '// Array declaration and initialization\nint[] numbers;            // Declaration\nnumbers = new int[5];      // Allocation\n\n// Declaration and initialization in one step\nint[] primes = new int[5];  // Creates array of 5 integers with default values (0)\nprimes[0] = 2;\nprimes[1] = 3;\nprimes[2] = 5;\nprimes[3] = 7;\nprimes[4] = 11;\n\n// Array literal syntax\nint[] fibonacci = {0, 1, 1, 2, 3, 5, 8, 13};\n\n// Accessing array elements (zero-based indexing)\nint firstPrime = primes[0];  // 2\nint thirdFib = fibonacci[2]; // 1',
        description:
          'Array declaration, initialization, and accessing elements',
      },
      {
        code: '// Array properties and operations\nint[] scores = {95, 80, 85, 70, 90};\n\n// Array length\nint count = scores.length;  // 5\n\n// Iterating through an array\nfor (int i = 0; i < scores.length; i++) {\n    System.out.print(scores[i] + " ");\n}\n// Output: 95 80 85 70 90\n\n// Enhanced for loop with arrays\nfor (int score : scores) {\n    System.out.print(score + " ");\n}\n// Output: 95 80 85 70 90',
        description: 'Array properties and iteration',
      },
      {
        code: '// Multidimensional arrays\n// 2D array (matrix)\nint[][] matrix = new int[3][3];  // 3x3 matrix\n\n// Initialization with values\nint[][] grid = {\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9}\n};\n\n// Accessing elements\nint center = grid[1][1];  // 5\n\n// Iterating through 2D array\nfor (int i = 0; i < grid.length; i++) {\n    for (int j = 0; j < grid[i].length; j++) {\n        System.out.print(grid[i][j] + " ");\n    }\n    System.out.println();\n}\n\n// Enhanced for loop with 2D array\nfor (int[] row : grid) {\n    for (int cell : row) {\n        System.out.print(cell + " ");\n    }\n    System.out.println();\n}',
        description: 'Multidimensional arrays and iteration',
      },
      {
        code: '// Array utilities\nimport java.util.Arrays;\n\nint[] numbers = {5, 2, 9, 1, 7};\n\n// Sorting\nArrays.sort(numbers);\n// numbers is now {1, 2, 5, 7, 9}\n\n// Binary search (on sorted array)\nint index = Arrays.binarySearch(numbers, 5);  // 2\n\n// Filling an array\nint[] zeros = new int[5];\nArrays.fill(zeros, 0);  // All elements set to 0\n\n// Copying arrays\nint[] copy = Arrays.copyOf(numbers, numbers.length);\nint[] partial = Arrays.copyOfRange(numbers, 1, 4);  // {2, 5, 7}\n\n// Comparing arrays\nboolean isEqual = Arrays.equals(numbers, copy);  // true\n\n// Converting array to string\nString arrayStr = Arrays.toString(numbers);  // "[1, 2, 5, 7, 9]"',
        description: 'Array utilities from java.util.Arrays',
      },
    ],
  },
  {
    title: 'Methods',
    examples: [
      {
        code: '// Basic method definition\npublic class Calculator {\n    // Method with return value\n    public int add(int a, int b) {\n        return a + b;\n    }\n    \n    // Void method (no return value)\n    public void printSum(int a, int b) {\n        System.out.println("Sum: " + (a + b));\n    }\n    \n    // Method with multiple parameters\n    public double average(double... numbers) {\n        double sum = 0;\n        for (double num : numbers) {\n            sum += num;\n        }\n        return numbers.length > 0 ? sum / numbers.length : 0;\n    }\n}',
        description:
          'Method declaration with different return types and parameters',
      },
      {
        code: '// Method overloading\npublic class Printer {\n    // Methods with the same name but different parameters\n    public void print(String message) {\n        System.out.println(message);\n    }\n    \n    public void print(int number) {\n        System.out.println("Number: " + number);\n    }\n    \n    public void print(String message, int repeat) {\n        for (int i = 0; i < repeat; i++) {\n            System.out.println(message);\n        }\n    }\n}\n\n// Usage\nPrinter printer = new Printer();\nprinter.print("Hello");     // Calls first method\nprinter.print(42);          // Calls second method\nprinter.print("Hi", 3);     // Calls third method',
        description:
          'Method overloading with different parameter types or counts',
      },
      {
        code: '// Static vs. instance methods\npublic class MathHelper {\n    // Static method (belongs to the class)\n    public static int square(int number) {\n        return number * number;\n    }\n    \n    // Instance method (belongs to an instance)\n    public int cube(int number) {\n        return number * number * number;\n    }\n}\n\n// Usage\nint squared = MathHelper.square(4);  // Static method called directly on class\n\nMathHelper helper = new MathHelper();\nint cubed = helper.cube(4);          // Instance method called on object',
        description: 'Static methods vs. instance methods',
      },
      {
        code: '// Method parameters\npublic class ParameterDemo {\n    // Pass by value (primitives)\n    public void modifyValue(int x) {\n        x = x * 2;  // Modifies the local copy, not the original\n    }\n    \n    // Pass by reference (objects)\n    public void modifyArray(int[] arr) {\n        if (arr.length > 0) {\n            arr[0] = 99;  // Modifies the actual array\n        }\n    }\n}\n\n// Usage\nint num = 10;\nParameterDemo demo = new ParameterDemo();\ndemo.modifyValue(num);\nSystem.out.println(num);  // Still 10\n\nint[] numbers = {1, 2, 3};\ndemo.modifyArray(numbers);\nSystem.out.println(numbers[0]);  // Now 99',
        description:
          'Method parameters: pass by value for primitives, pass by reference for objects',
      },
    ],
  },
  {
    title: 'Classes & Objects',
    examples: [
      {
        code: '// Basic class definition\npublic class Person {\n    // Instance variables (fields)\n    private String name;\n    private int age;\n    \n    // Constructor\n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    // Default constructor\n    public Person() {\n        this.name = "Unknown";\n        this.age = 0;\n    }\n    \n    // Getters and setters\n    public String getName() {\n        return name;\n    }\n    \n    public void setName(String name) {\n        this.name = name;\n    }\n    \n    public int getAge() {\n        return age;\n    }\n    \n    public void setAge(int age) {\n        if (age >= 0) {\n            this.age = age;\n        }\n    }\n    \n    // Instance method\n    public void introduce() {\n        System.out.println("Hi, I\'m " + name + " and I\'m " + age + " years old.");\n    }\n}',
        description:
          'Basic class definition with fields, constructors, getters/setters, and methods',
      },
      {
        code: '// Creating and using objects\n// Create objects using constructors\nPerson person1 = new Person("Alice", 30);\nPerson person2 = new Person();\n\n// Access methods and properties\nperson1.introduce();  // "Hi, I\'m Alice and I\'m 30 years old."\nperson2.setName("Bob");\nperson2.setAge(25);\nSystem.out.println(person2.getName());  // "Bob"\n\n// Object reference and equality\nPerson p1 = new Person("Charlie", 35);\nPerson p2 = new Person("Charlie", 35);\nPerson p3 = p1;\n\nboolean refEqual = (p1 == p2);     // false (different objects)\nboolean refEqual2 = (p1 == p3);    // true (same reference)\n\n// To compare content, override equals() method in the class',
        description:
          'Creating objects, accessing methods and properties, object references',
      },
      {
        code: '// Access modifiers\npublic class AccessDemo {\n    public String publicField;      // Accessible from anywhere\n    protected String protectedField; // Accessible in same package or subclasses\n    String packageField;            // Package-private (default): accessible in same package\n    private String privateField;    // Accessible only within this class\n    \n    public void publicMethod() { /* accessible from anywhere */ }\n    protected void protectedMethod() { /* accessible in same package or subclasses */ }\n    void packageMethod() { /* accessible in same package */ }\n    private void privateMethod() { /* accessible only within this class */ }\n}',
        description:
          'Access modifiers for controlling visibility of fields and methods',
      },
      {
        code: '// Inheritance\n// Base class (superclass)\npublic class Animal {\n    protected String name;\n    \n    public Animal(String name) {\n        this.name = name;\n    }\n    \n    public void eat() {\n        System.out.println(name + " is eating.");\n    }\n    \n    public void sleep() {\n        System.out.println(name + " is sleeping.");\n    }\n}\n\n// Derived class (subclass)\npublic class Dog extends Animal {\n    private String breed;\n    \n    public Dog(String name, String breed) {\n        super(name);  // Call superclass constructor\n        this.breed = breed;\n    }\n    \n    // Override method\n    @Override\n    public void eat() {\n        System.out.println(name + " the " + breed + " is eating quickly.");\n    }\n    \n    // New method\n    public void bark() {\n        System.out.println(name + " says: Woof!");\n    }\n}\n\n// Usage\nDog dog = new Dog("Rex", "German Shepherd");\ndog.eat();    // "Rex the German Shepherd is eating quickly."\ndog.sleep();  // "Rex is sleeping." (inherited)\ndog.bark();   // "Rex says: Woof!" (new method)',
        description:
          'Inheritance with extends keyword, method overriding, and super keyword',
      },
      {
        code: '// Interfaces\npublic interface Drawable {\n    void draw();  // Abstract method (no implementation)\n    \n    // Default method (Java 8+)\n    default void display() {\n        System.out.println("Displaying drawable object");\n    }\n    \n    // Static method (Java 8+)\n    static String getType() {\n        return "Basic drawable";\n    }\n}\n\n// Implementing an interface\npublic class Circle implements Drawable {\n    private double radius;\n    \n    public Circle(double radius) {\n        this.radius = radius;\n    }\n    \n    // Must implement all abstract methods\n    @Override\n    public void draw() {\n        System.out.println("Drawing a circle with radius " + radius);\n    }\n    \n    // Can override default methods\n    @Override\n    public void display() {\n        System.out.println("Displaying circle");\n    }\n}\n\n// Usage\nDrawable shape = new Circle(5.0);\nshape.draw();     // "Drawing a circle with radius 5.0"\nshape.display();  // "Displaying circle"\nString type = Drawable.getType();  // "Basic drawable" (static method)',
        description: 'Interfaces with abstract, default, and static methods',
      },
    ],
  },
  {
    title: 'Collections',
    examples: [
      {
        code: '// ArrayList (dynamic array)\nimport java.util.ArrayList;\nimport java.util.List;\n\nList<String> names = new ArrayList<>();\n\n// Adding elements\nnames.add("Alice");\nnames.add("Bob");\nnames.add("Charlie");\nnames.add(1, "David");  // Insert at index 1\n\n// Accessing elements\nString first = names.get(0);  // "Alice"\nint size = names.size();     // 4\n\n// Modifying elements\nnames.set(2, "Eve");  // Replace element at index 2\n\n// Removing elements\nnames.remove(3);      // Remove by index\nnames.remove("Alice");  // Remove by value\n\n// Checking if element exists\nboolean hasEve = names.contains("Eve");  // true\n\n// Iterating\nfor (String name : names) {\n    System.out.println(name);\n}\n\n// Clear all elements\nnames.clear();',
        description: 'ArrayList for dynamic arrays with common operations',
      },
      {
        code: '// HashSet (unordered collection with unique elements)\nimport java.util.HashSet;\nimport java.util.Set;\n\nSet<String> fruits = new HashSet<>();\n\n// Adding elements\nfruits.add("Apple");\nfruits.add("Banana");\nfruits.add("Orange");\nfruits.add("Apple");  // Duplicate not added\n\n// Size and contains\nint count = fruits.size();  // 3\nboolean hasApple = fruits.contains("Apple");  // true\n\n// Removing elements\nfruits.remove("Banana");\n\n// Iterating (order not guaranteed)\nfor (String fruit : fruits) {\n    System.out.println(fruit);\n}\n\n// Other set implementations\n// TreeSet - sorted set\n// LinkedHashSet - maintains insertion order',
        description: 'HashSet for collections with unique elements',
      },
      {
        code: '// HashMap (key-value pairs)\nimport java.util.HashMap;\nimport java.util.Map;\n\nMap<String, Integer> ages = new HashMap<>();\n\n// Adding entries\nages.put("Alice", 30);\nages.put("Bob", 25);\nages.put("Charlie", 35);\n\n// Accessing values\nInteger aliceAge = ages.get("Alice");  // 30\nInteger unknownAge = ages.get("Unknown");  // null\nInteger defaultAge = ages.getOrDefault("Unknown", 0);  // 0\n\n// Checking keys and values\nboolean hasKey = ages.containsKey("Bob");  // true\nboolean hasValue = ages.containsValue(40);  // false\n\n// Updating values\nages.put("Alice", 31);  // Overwrites existing value\n\n// Removing entries\nages.remove("Charlie");\n\n// Iterating through a map\nfor (Map.Entry<String, Integer> entry : ages.entrySet()) {\n    System.out.println(entry.getKey() + ": " + entry.getValue());\n}\n\n// Iterating through keys\nfor (String name : ages.keySet()) {\n    System.out.println(name);\n}\n\n// Iterating through values\nfor (Integer age : ages.values()) {\n    System.out.println(age);\n}',
        description: 'HashMap for key-value mappings',
      },
    ],
  },
  {
    title: 'Exception Handling',
    examples: [
      {
        code: '// Basic try-catch\ntry {\n    int result = 10 / 0;  // Throws ArithmeticException\n    System.out.println("Result: " + result);  // This line won\'t execute\n} catch (ArithmeticException e) {\n    System.out.println("Error: " + e.getMessage());  // "Error: / by zero"\n}\n\n// Code after try-catch still executes\nSystem.out.println("Program continues");',
        description: 'Basic try-catch block for handling exceptions',
      },
      {
        code: '// Multiple catch blocks\ntry {\n    String str = null;\n    int length = str.length();  // Throws NullPointerException\n    int[] arr = new int[5];\n    arr[10] = 50;  // Throws ArrayIndexOutOfBoundsException (never reached)\n} catch (NullPointerException e) {\n    System.out.println("Null pointer: " + e.getMessage());\n} catch (ArrayIndexOutOfBoundsException e) {\n    System.out.println("Array index: " + e.getMessage());\n} catch (Exception e) {\n    // Catches any other exception not caught above\n    System.out.println("General exception: " + e.getMessage());\n}',
        description: 'Multiple catch blocks for different exception types',
      },
      {
        code: '// try-catch-finally\ntry {\n    // Code that might throw an exception\n    FileReader file = new FileReader("file.txt");\n    // Process file...\n} catch (FileNotFoundException e) {\n    System.out.println("File not found: " + e.getMessage());\n} finally {\n    // This block always executes, whether exception occurs or not\n    System.out.println("Cleanup code here");\n    // Close resources, etc.\n}',
        description:
          'try-catch-finally block with the finally block for cleanup',
      },
      {
        code: '// try-with-resources (Java 7+)\nimport java.io.*;\n\ntry (FileReader reader = new FileReader("file.txt");\n     BufferedReader br = new BufferedReader(reader)) {\n    // Use the resources\n    String line = br.readLine();\n    System.out.println(line);\n    // Resources automatically closed after try block\n} catch (IOException e) {\n    System.out.println("IO error: " + e.getMessage());\n}',
        description: 'try-with-resources for automatic resource management',
      },
      {
        code: '// Throwing exceptions\npublic void deposit(double amount) throws IllegalArgumentException {\n    if (amount <= 0) {\n        throw new IllegalArgumentException("Amount must be positive");\n    }\n    // Process deposit...\n}\n\n// Checked vs. unchecked exceptions\n// Checked: must be caught or declared (IOException, SQLException...)\n// Unchecked: runtime exceptions (NullPointerException, ArithmeticException...)\n\n// Creating custom exceptions\npublic class InsufficientFundsException extends Exception {\n    private double amount;\n    \n    public InsufficientFundsException(double amount) {\n        super("Insufficient funds: needed $" + amount);\n        this.amount = amount;\n    }\n    \n    public double getAmount() {\n        return amount;\n    }\n}',
        description:
          'Throwing exceptions, checked vs. unchecked exceptions, and custom exceptions',
      },
    ],
  },
];

// Component implementation
const JavaCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<CodeCategory[]>(javaExamplesData);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter examples based on search query
  const filterExamples = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(javaExamplesData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = javaExamplesData
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
          <FaJava className="inline-block mr-2" /> Java Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of Java syntax, data types, control
          structures, and object-oriented concepts. Click the copy button to
          copy any code snippet to your clipboard.
        </p>
      </header>

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

      {/* About Java Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Java
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Java</strong> is a class-based, object-oriented programming
            language designed to be platform-independent through the use of the
            Java Virtual Machine (JVM).
          </p>
          <p>
            <strong>Key features of Java:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Platform independence ("Write Once, Run Anywhere")</li>
            <li>Strong object-oriented programming model</li>
            <li>Automatic memory management with garbage collection</li>
            <li>Strong type system and compile-time checking</li>
            <li>Rich standard library (Java API)</li>
            <li>Multi-threading and concurrent programming support</li>
            <li>Security features built into the language and runtime</li>
          </ul>
          <p className="mt-2">
            Java is widely used for enterprise applications, Android app
            development, web services, financial applications, and more.
          </p>
          <p>
            For more information, visit the{' '}
            <a
              href="https://www.oracle.com/java/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              official Java website
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default JavaCheatSheetPage;

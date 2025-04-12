import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaDatabase, FaSearch } from 'react-icons/fa';
import CheatSheetCategoryIndex from '../../components/cheat-sheets/CheatSheetCategoryIndex';

// Interface for command data
interface SqlCommand {
  command: string;
  description: string;
  example?: string;
}

// Interface for command category
interface CommandCategory {
  title: string;
  commands: SqlCommand[];
}

// SQL commands organized by category
const sqlCommandsData: CommandCategory[] = [
  {
    title: 'Data Query Language (DQL)',
    commands: [
      {
        command: 'SELECT column1, column2 FROM table_name',
        description: 'Retrieve data from a table',
        example: 'SELECT first_name, last_name FROM employees',
      },
      {
        command: 'SELECT * FROM table_name',
        description: 'Retrieve all columns from a table',
        example: 'SELECT * FROM products',
      },
      {
        command: 'SELECT DISTINCT column FROM table_name',
        description: 'Retrieve unique values from a column',
        example: 'SELECT DISTINCT department FROM employees',
      },
      {
        command: 'SELECT column FROM table_name WHERE condition',
        description: 'Filter records based on a condition',
        example: 'SELECT * FROM products WHERE price > 100',
      },
      {
        command: 'SELECT column FROM table_name ORDER BY column [ASC|DESC]',
        description:
          'Sort results by a column in ascending or descending order',
        example: 'SELECT * FROM employees ORDER BY last_name ASC',
      },
      {
        command: 'SELECT column FROM table_name LIMIT number',
        description: 'Limit the number of records returned',
        example: 'SELECT * FROM products LIMIT 10',
      },
      {
        command: 'SELECT column FROM table_name OFFSET number',
        description: 'Skip a number of records before starting to return rows',
        example: 'SELECT * FROM products LIMIT 10 OFFSET 20',
      },
      {
        command: 'SELECT column FROM table_name WHERE column LIKE pattern',
        description: 'Search for a pattern in a column',
        example: "SELECT * FROM employees WHERE last_name LIKE 'S%'",
      },
      {
        command:
          'SELECT column FROM table_name WHERE column IN (value1, value2)',
        description: 'Filter records where a column equals any value in a list',
        example:
          "SELECT * FROM products WHERE category IN ('Electronics', 'Computers')",
      },
      {
        command:
          'SELECT column FROM table_name WHERE column BETWEEN value1 AND value2',
        description: 'Filter records where a column is within a range',
        example: 'SELECT * FROM products WHERE price BETWEEN 50 AND 100',
      },
    ],
  },
  {
    title: 'JOINs',
    commands: [
      {
        command:
          'SELECT columns FROM table1 INNER JOIN table2 ON table1.column = table2.column',
        description: 'Return records that have matching values in both tables',
        example:
          'SELECT orders.order_id, customers.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id',
      },
      {
        command:
          'SELECT columns FROM table1 LEFT JOIN table2 ON table1.column = table2.column',
        description:
          'Return all records from the left table and matched records from the right table',
        example:
          'SELECT customers.name, orders.order_id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id',
      },
      {
        command:
          'SELECT columns FROM table1 RIGHT JOIN table2 ON table1.column = table2.column',
        description:
          'Return all records from the right table and matched records from the left table',
        example:
          'SELECT orders.order_id, customers.name FROM orders RIGHT JOIN customers ON orders.customer_id = customers.id',
      },
      {
        command:
          'SELECT columns FROM table1 FULL OUTER JOIN table2 ON table1.column = table2.column',
        description:
          'Return all records when there is a match in either left or right table',
        example:
          'SELECT customers.name, orders.order_id FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id',
      },
      {
        command: 'SELECT columns FROM table1 CROSS JOIN table2',
        description:
          'Return the Cartesian product of the sets of records from the joined tables',
        example:
          'SELECT products.name, colors.color FROM products CROSS JOIN colors',
      },
    ],
  },
  {
    title: 'Grouping and Aggregation',
    commands: [
      {
        command: 'SELECT column, COUNT(*) FROM table_name GROUP BY column',
        description:
          'Group rows that have the same values in specified columns',
        example:
          'SELECT department, COUNT(*) FROM employees GROUP BY department',
      },
      {
        command:
          'SELECT column, COUNT(*) FROM table_name GROUP BY column HAVING condition',
        description: 'Filter groups based on a condition',
        example:
          'SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5',
      },
      {
        command: 'SELECT COUNT(column) FROM table_name',
        description:
          'Count the number of rows that have a non-NULL value in a column',
        example: 'SELECT COUNT(order_id) FROM orders',
      },
      {
        command: 'SELECT SUM(column) FROM table_name',
        description: 'Calculate the sum of values in a column',
        example: 'SELECT SUM(amount) FROM payments',
      },
      {
        command: 'SELECT AVG(column) FROM table_name',
        description: 'Calculate the average value of a column',
        example: 'SELECT AVG(price) FROM products',
      },
      {
        command: 'SELECT MIN(column) FROM table_name',
        description: 'Find the minimum value in a column',
        example: 'SELECT MIN(price) FROM products',
      },
      {
        command: 'SELECT MAX(column) FROM table_name',
        description: 'Find the maximum value in a column',
        example: 'SELECT MAX(price) FROM products',
      },
    ],
  },
  {
    title: 'Data Manipulation Language (DML)',
    commands: [
      {
        command:
          'INSERT INTO table_name (column1, column2) VALUES (value1, value2)',
        description: 'Insert a new record into a table',
        example:
          "INSERT INTO customers (name, email) VALUES ('John Doe', 'john@example.com')",
      },
      {
        command: 'INSERT INTO table_name VALUES (value1, value2, ...)',
        description: 'Insert a new record with values for all columns',
        example:
          "INSERT INTO customers VALUES (1, 'John Doe', 'john@example.com', '2023-01-01')",
      },
      {
        command:
          'INSERT INTO table_name (column1, column2) SELECT column1, column2 FROM another_table',
        description: 'Insert records from another table',
        example:
          'INSERT INTO customers_backup (id, name) SELECT id, name FROM customers',
      },
      {
        command:
          'UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition',
        description: 'Update existing records in a table',
        example: 'UPDATE products SET price = 29.99 WHERE id = 1',
      },
      {
        command: 'UPDATE table_name SET column = value',
        description: 'Update all records in a table (use with caution)',
        example: 'UPDATE products SET available = true',
      },
      {
        command: 'DELETE FROM table_name WHERE condition',
        description: 'Delete records that match a condition',
        example: "DELETE FROM orders WHERE status = 'cancelled'",
      },
      {
        command: 'DELETE FROM table_name',
        description: 'Delete all records from a table (use with caution)',
        example: 'DELETE FROM temp_logs',
      },
      {
        command: 'TRUNCATE TABLE table_name',
        description:
          'Delete all records from a table (faster than DELETE, resets auto-increment)',
        example: 'TRUNCATE TABLE temp_logs',
      },
    ],
  },
  {
    title: 'Data Definition Language (DDL)',
    commands: [
      {
        command:
          'CREATE TABLE table_name (column1 datatype, column2 datatype, ...)',
        description: 'Create a new table in the database',
        example:
          'CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100), price DECIMAL(10,2))',
      },
      {
        command:
          'CREATE TABLE table_name (column1 datatype PRIMARY KEY, column2 datatype, ...)',
        description: 'Create a new table with a primary key',
        example:
          'CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100))',
      },
      {
        command:
          'CREATE TABLE table_name (column1 datatype, column2 datatype, FOREIGN KEY (column) REFERENCES other_table(column))',
        description: 'Create a new table with a foreign key',
        example:
          'CREATE TABLE orders (id INT PRIMARY KEY, customer_id INT, FOREIGN KEY (customer_id) REFERENCES customers(id))',
      },
      {
        command: 'ALTER TABLE table_name ADD column_name datatype',
        description: 'Add a new column to a table',
        example: 'ALTER TABLE customers ADD phone VARCHAR(20)',
      },
      {
        command: 'ALTER TABLE table_name DROP COLUMN column_name',
        description: 'Remove a column from a table',
        example: 'ALTER TABLE customers DROP COLUMN phone',
      },
      {
        command:
          'ALTER TABLE table_name MODIFY COLUMN column_name new_datatype',
        description: 'Change the data type of a column',
        example: 'ALTER TABLE products MODIFY COLUMN price DECIMAL(12,2)',
      },
      {
        command: 'ALTER TABLE table_name RENAME COLUMN old_name TO new_name',
        description: 'Rename a column',
        example: 'ALTER TABLE customers RENAME COLUMN phone TO contact_number',
      },
      {
        command: 'ALTER TABLE table_name RENAME TO new_table_name',
        description: 'Rename a table',
        example: 'ALTER TABLE customers RENAME TO clients',
      },
      {
        command: 'DROP TABLE table_name',
        description: 'Delete a table from the database',
        example: 'DROP TABLE temp_logs',
      },
      {
        command: 'DROP TABLE IF EXISTS table_name',
        description: 'Delete a table only if it exists',
        example: 'DROP TABLE IF EXISTS temp_logs',
      },
      {
        command: 'CREATE INDEX index_name ON table_name (column)',
        description: 'Create an index on a column to speed up queries',
        example: 'CREATE INDEX idx_customer_email ON customers (email)',
      },
      {
        command: 'CREATE UNIQUE INDEX index_name ON table_name (column)',
        description: 'Create a unique index to enforce uniqueness',
        example: 'CREATE UNIQUE INDEX idx_customer_email ON customers (email)',
      },
      {
        command: 'DROP INDEX index_name',
        description: 'Delete an index',
        example: 'DROP INDEX idx_customer_email',
      },
    ],
  },
  {
    title: 'Data Control Language (DCL)',
    commands: [
      {
        command: 'GRANT privilege ON object TO user',
        description: 'Give a user permission to perform an action on an object',
        example: "GRANT SELECT, INSERT ON customers TO 'app_user'",
      },
      {
        command: 'REVOKE privilege ON object FROM user',
        description: 'Remove a permission from a user',
        example: "REVOKE INSERT ON customers FROM 'app_user'",
      },
      {
        command: 'GRANT ALL PRIVILEGES ON database.* TO user',
        description: 'Give a user all permissions on all tables in a database',
        example: "GRANT ALL PRIVILEGES ON mydb.* TO 'admin'",
      },
      {
        command: 'GRANT privilege ON object TO user WITH GRANT OPTION',
        description: 'Allow a user to grant the same privilege to other users',
        example: "GRANT SELECT ON customers TO 'manager' WITH GRANT OPTION",
      },
    ],
  },
  {
    title: 'Transaction Control',
    commands: [
      {
        command: 'BEGIN TRANSACTION',
        description: 'Start a transaction',
        example: 'BEGIN TRANSACTION',
      },
      {
        command: 'COMMIT',
        description: 'Save changes made during the current transaction',
        example: 'COMMIT',
      },
      {
        command: 'ROLLBACK',
        description: 'Undo changes made during the current transaction',
        example: 'ROLLBACK',
      },
      {
        command: 'SAVEPOINT savepoint_name',
        description:
          'Create a point within a transaction to which you can later roll back',
        example: 'SAVEPOINT before_update',
      },
      {
        command: 'ROLLBACK TO savepoint_name',
        description: 'Roll back to a savepoint within a transaction',
        example: 'ROLLBACK TO before_update',
      },
    ],
  },
  {
    title: 'Common SQL Functions',
    commands: [
      {
        command: 'CONCAT(string1, string2, ...)',
        description: 'Concatenate strings',
        example:
          "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees",
      },
      {
        command: 'UPPER(string)',
        description: 'Convert a string to uppercase',
        example: 'SELECT UPPER(name) FROM products',
      },
      {
        command: 'LOWER(string)',
        description: 'Convert a string to lowercase',
        example: 'SELECT LOWER(email) FROM customers',
      },
      {
        command: 'LENGTH(string)',
        description: 'Get the length of a string',
        example: 'SELECT name, LENGTH(description) FROM products',
      },
      {
        command: 'SUBSTRING(string, start, length)',
        description: 'Extract a substring from a string',
        example: 'SELECT SUBSTRING(phone, 1, 3) AS area_code FROM customers',
      },
      {
        command: 'TRIM(string)',
        description: 'Remove leading and trailing spaces',
        example: 'SELECT TRIM(name) FROM products',
      },
      {
        command: 'CURRENT_DATE',
        description: 'Get the current date',
        example: 'SELECT order_id, CURRENT_DATE AS today FROM orders',
      },
      {
        command: 'CURRENT_TIME',
        description: 'Get the current time',
        example: 'SELECT login_id, CURRENT_TIME AS login_time FROM sessions',
      },
      {
        command: 'CURRENT_TIMESTAMP',
        description: 'Get the current date and time',
        example:
          "INSERT INTO logs (event, timestamp) VALUES ('backup', CURRENT_TIMESTAMP)",
      },
      {
        command: 'DATE_ADD(date, INTERVAL value unit)',
        description: 'Add a time interval to a date',
        example:
          'SELECT DATE_ADD(order_date, INTERVAL 30 DAY) AS due_date FROM orders',
      },
      {
        command: 'DATE_SUB(date, INTERVAL value unit)',
        description: 'Subtract a time interval from a date',
        example: 'SELECT DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) AS last_week',
      },
      {
        command: 'DATEDIFF(date1, date2)',
        description: 'Calculate the difference between two dates',
        example:
          'SELECT DATEDIFF(return_date, checkout_date) AS days_borrowed FROM loans',
      },
      {
        command: 'COALESCE(value1, value2, ...)',
        description: 'Return the first non-NULL value in a list',
        example:
          "SELECT COALESCE(nickname, first_name, 'Unknown') AS display_name FROM users",
      },
      {
        command: 'CASE WHEN condition THEN result ELSE result END',
        description: 'Add conditional logic to a query',
        example:
          "SELECT name, CASE WHEN price > 100 THEN 'Expensive' ELSE 'Affordable' END AS price_category FROM products",
      },
    ],
  },
  {
    title: 'Common SQL Data Types',
    commands: [
      {
        command: 'INT or INTEGER',
        description: 'Whole numbers without decimal places',
        example: 'CREATE TABLE products (id INT, quantity INTEGER)',
      },
      {
        command: 'SMALLINT',
        description: 'Small range integer (-32,768 to 32,767)',
        example: 'CREATE TABLE ratings (score SMALLINT)',
      },
      {
        command: 'BIGINT',
        description: 'Large range integer',
        example: 'CREATE TABLE large_values (amount BIGINT)',
      },
      {
        command: 'DECIMAL(p,s) or NUMERIC(p,s)',
        description: 'Exact numeric with precision (p) and scale (s)',
        example: 'CREATE TABLE products (price DECIMAL(10,2))',
      },
      {
        command: 'FLOAT',
        description: 'Approximate numeric value',
        example: 'CREATE TABLE measurements (value FLOAT)',
      },
      {
        command: 'CHAR(n)',
        description: 'Fixed-length character string',
        example: 'CREATE TABLE states (code CHAR(2))',
      },
      {
        command: 'VARCHAR(n)',
        description: 'Variable-length character string with maximum length n',
        example: 'CREATE TABLE users (username VARCHAR(50))',
      },
      {
        command: 'TEXT',
        description: 'Variable-length character string with large maximum size',
        example: 'CREATE TABLE articles (content TEXT)',
      },
      {
        command: 'DATE',
        description: 'Date (year, month, day)',
        example: 'CREATE TABLE employees (hire_date DATE)',
      },
      {
        command: 'TIME',
        description: 'Time (hour, minute, second)',
        example: 'CREATE TABLE schedules (start_time TIME)',
      },
      {
        command: 'DATETIME or TIMESTAMP',
        description: 'Date and time',
        example: 'CREATE TABLE logs (created_at TIMESTAMP)',
      },
      {
        command: 'BOOLEAN',
        description: 'True/false value',
        example: 'CREATE TABLE products (is_available BOOLEAN)',
      },
      {
        command: 'BLOB',
        description: 'Binary large object for storing binary data',
        example: 'CREATE TABLE documents (file_data BLOB)',
      },
      {
        command: 'JSON',
        description: 'JSON data (supported in modern databases)',
        example: 'CREATE TABLE settings (preferences JSON)',
      },
    ],
  },
  {
    title: 'Database Management',
    commands: [
      {
        command: 'CREATE DATABASE database_name',
        description: 'Create a new database',
        example: 'CREATE DATABASE ecommerce',
      },
      {
        command: 'DROP DATABASE database_name',
        description: 'Delete a database',
        example: 'DROP DATABASE old_system',
      },
      {
        command: 'USE database_name',
        description: 'Switch to a database',
        example: 'USE ecommerce',
      },
      {
        command: 'SHOW DATABASES',
        description: 'List all databases',
      },
      {
        command: 'SHOW TABLES',
        description: 'List all tables in the current database',
      },
      {
        command: 'DESCRIBE table_name',
        description: 'Show the structure of a table',
        example: 'DESCRIBE customers',
      },
    ],
  },
];

const SqlCheatSheetPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<CommandCategory[]>(sqlCommandsData);
  const [copyStatus, setCopyStatus] = useState<Record<string, string>>({});

  // Filter commands based on search query
  const filterCommands = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredData(sqlCommandsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = sqlCommandsData
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
          <FaDatabase className="inline-block mr-2" /> SQL Cheat Sheet
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A comprehensive reference of common SQL commands and syntax organized
          by functionality. Click the copy button to copy any command to your
          clipboard.
        </p>
      </header>

      {/* Category Index */}
      <CheatSheetCategoryIndex categories={sqlCommandsData} />

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

      {/* About SQL Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About SQL
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>SQL (Structured Query Language)</strong> is a standard
            language for storing, manipulating, and retrieving data in
            relational database management systems.
          </p>
          <p>
            <strong>Key components of SQL:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>DQL (Data Query Language)</strong>: Commands like SELECT
              to query data
            </li>
            <li>
              <strong>DML (Data Manipulation Language)</strong>: Commands like
              INSERT, UPDATE, DELETE to modify data
            </li>
            <li>
              <strong>DDL (Data Definition Language)</strong>: Commands like
              CREATE, ALTER, DROP to define database structure
            </li>
            <li>
              <strong>DCL (Data Control Language)</strong>: Commands like GRANT,
              REVOKE to control access
            </li>
            <li>
              <strong>TCL (Transaction Control Language)</strong>: Commands like
              COMMIT, ROLLBACK to manage transactions
            </li>
          </ul>
          <p className="mt-2">
            <strong>Note:</strong> SQL syntax may vary slightly between
            different database systems (MySQL, PostgreSQL, SQL Server, Oracle,
            SQLite). This cheat sheet focuses on standard SQL that works across
            most systems, but check your specific database documentation for
            variations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SqlCheatSheetPage;

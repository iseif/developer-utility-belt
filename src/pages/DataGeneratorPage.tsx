import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import Papa from 'papaparse';
import { FaPlus, FaTrash } from 'react-icons/fa';

// Define the field types available for data generation
type FieldType =
  | 'fullName'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'address'
  | 'city'
  | 'country'
  | 'zipCode'
  | 'company'
  | 'jobTitle'
  | 'uuid'
  | 'id'
  | 'boolean'
  | 'date'
  | 'pastDate'
  | 'futureDate'
  | 'paragraph'
  | 'sentence'
  | 'word'
  | 'number'
  | 'price'
  | 'product'
  | 'imageUrl'
  | 'color'
  | 'username'
  | 'password';

// Define the schema field structure
interface SchemaField {
  id: string;
  name: string;
  type: FieldType;
}

const DataGeneratorPage: React.FC = () => {
  // State for schema fields
  const [fields, setFields] = useState<SchemaField[]>([
    { id: '1', name: 'id', type: 'id' },
    { id: '2', name: 'name', type: 'fullName' },
    { id: '3', name: 'email', type: 'email' },
  ]);
  
  // State for number of records to generate
  const [recordCount, setRecordCount] = useState<number>(10);
  
  // State for output format
  const [outputFormat, setOutputFormat] = useState<'json' | 'csv'>('json');
  
  // State for generated output
  const [output, setOutput] = useState<string>('');
  
  // State for copy button text
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy Output');
  
  // State for error message
  const [error, setError] = useState<string>('');

  // Function to add a new field to the schema
  const addField = () => {
    const newId = (fields.length + 1).toString();
    setFields([...fields, { id: newId, name: `field${newId}`, type: 'fullName' }]);
  };

  // Function to remove a field from the schema
  const removeField = (id: string) => {
    if (fields.length <= 1) {
      setError('You must have at least one field in the schema.');
      return;
    }
    setFields(fields.filter(field => field.id !== id));
    setError('');
  };

  // Function to update a field's name
  const updateFieldName = (id: string, name: string) => {
    setFields(
      fields.map(field => 
        field.id === id ? { ...field, name } : field
      )
    );
  };

  // Function to update a field's type
  const updateFieldType = (id: string, type: FieldType) => {
    setFields(
      fields.map(field => 
        field.id === id ? { ...field, type } : field
      )
    );
  };

  // Function to generate a value based on field type
  const generateValue = (type: FieldType) => {
    switch (type) {
      case 'fullName':
        return faker.person.fullName();
      case 'firstName':
        return faker.person.firstName();
      case 'lastName':
        return faker.person.lastName();
      case 'email':
        return faker.internet.email();
      case 'phone':
        return faker.phone.number();
      case 'address':
        return faker.location.streetAddress();
      case 'city':
        return faker.location.city();
      case 'country':
        return faker.location.country();
      case 'zipCode':
        return faker.location.zipCode();
      case 'company':
        return faker.company.name();
      case 'jobTitle':
        return faker.person.jobTitle();
      case 'uuid':
        return faker.string.uuid();
      case 'id':
        return faker.number.int({ min: 1000, max: 9999 }).toString();
      case 'boolean':
        return faker.datatype.boolean();
      case 'date':
        return faker.date.recent().toISOString().split('T')[0];
      case 'pastDate':
        return faker.date.past().toISOString().split('T')[0];
      case 'futureDate':
        return faker.date.future().toISOString().split('T')[0];
      case 'paragraph':
        return faker.lorem.paragraph();
      case 'sentence':
        return faker.lorem.sentence();
      case 'word':
        return faker.lorem.word();
      case 'number':
        return faker.number.int({ min: 1, max: 1000 });
      case 'price':
        return faker.commerce.price();
      case 'product':
        return faker.commerce.productName();
      case 'imageUrl':
        return faker.image.url();
      case 'color':
        return faker.color.rgb();
      case 'username':
        return faker.internet.userName();
      case 'password':
        return faker.internet.password();
      default:
        return '';
    }
  };

  // Function to generate data based on the schema
  const generateData = () => {
    setError('');
    
    // Validate input
    if (fields.length === 0) {
      setError('You must define at least one field in the schema.');
      return;
    }
    
    if (recordCount <= 0 || recordCount > 1000) {
      setError('Number of records must be between 1 and 1000.');
      return;
    }
    
    // Check for duplicate field names
    const fieldNames = fields.map(field => field.name);
    if (new Set(fieldNames).size !== fieldNames.length) {
      setError('Field names must be unique.');
      return;
    }
    
    try {
      // Generate records
      const records = [];
      for (let i = 0; i < recordCount; i++) {
        const record: Record<string, any> = {};
        fields.forEach(field => {
          record[field.name] = generateValue(field.type);
        });
        records.push(record);
      }
      
      // Format output based on selected format
      if (outputFormat === 'json') {
        setOutput(JSON.stringify(records, null, 2));
      } else {
        // CSV format
        const csv = Papa.unparse(records, {
          header: true,
          quotes: true,
        });
        setOutput(csv);
      }
      
      setCopyButtonText('Copy Output');
    } catch (err) {
      console.error('Error generating data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setOutput('');
    }
  };

  // Function to copy output to clipboard
  const handleCopy = async () => {
    if (!output) {
      setCopyButtonText('Nothing to Copy');
      setTimeout(() => setCopyButtonText('Copy Output'), 2000);
      return;
    }
    
    try {
      await navigator.clipboard.writeText(output);
      setCopyButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy text:', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => setCopyButtonText('Copy Output'), 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Mock Data Generator
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Generate realistic mock data based on your schema definition. Specify field types, number of records, and output format.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Data Schema Definition
          </h3>
          
          {/* Schema Fields */}
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-wrap items-start gap-2">
                <div className="flex-1 min-w-[200px]">
                  <label htmlFor={`field-name-${field.id}`} className="block text-sm font-medium mb-1 dark:text-dark-primary-text">
                    Field Name:
                  </label>
                  <input
                    id={`field-name-${field.id}`}
                    type="text"
                    value={field.name}
                    onChange={(e) => updateFieldName(field.id, e.target.value)}
                    className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
                  />
                </div>
                
                <div className="flex-1 min-w-[200px]">
                  <label htmlFor={`field-type-${field.id}`} className="block text-sm font-medium mb-1 dark:text-dark-primary-text">
                    Field Type:
                  </label>
                  <select
                    id={`field-type-${field.id}`}
                    value={field.type}
                    onChange={(e) => updateFieldType(field.id, e.target.value as FieldType)}
                    className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
                  >
                    <optgroup label="Person">
                      <option value="fullName">Full Name</option>
                      <option value="firstName">First Name</option>
                      <option value="lastName">Last Name</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="username">Username</option>
                      <option value="password">Password</option>
                      <option value="jobTitle">Job Title</option>
                    </optgroup>
                    <optgroup label="Location">
                      <option value="address">Address</option>
                      <option value="city">City</option>
                      <option value="country">Country</option>
                      <option value="zipCode">Zip Code</option>
                    </optgroup>
                    <optgroup label="Business">
                      <option value="company">Company</option>
                      <option value="product">Product</option>
                      <option value="price">Price</option>
                    </optgroup>
                    <optgroup label="IDs & Numbers">
                      <option value="id">ID</option>
                      <option value="uuid">UUID</option>
                      <option value="number">Number</option>
                    </optgroup>
                    <optgroup label="Date & Time">
                      <option value="date">Date (Recent)</option>
                      <option value="pastDate">Date (Past)</option>
                      <option value="futureDate">Date (Future)</option>
                    </optgroup>
                    <optgroup label="Text">
                      <option value="word">Word</option>
                      <option value="sentence">Sentence</option>
                      <option value="paragraph">Paragraph</option>
                    </optgroup>
                    <optgroup label="Misc">
                      <option value="boolean">Boolean</option>
                      <option value="color">Color</option>
                      <option value="imageUrl">Image URL</option>
                    </optgroup>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 invisible">Action</label>
                  <button
                    onClick={() => removeField(field.id)}
                    className="p-2 border-2 border-border-color dark:border-dark-border-color bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 shadow-solid dark:shadow-dark-solid hover:bg-red-200 dark:hover:bg-red-800"
                    title="Remove field"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            
            <button
              onClick={addField}
              className="flex items-center gap-2 px-3 py-2 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              <FaPlus /> Add Field
            </button>
          </div>
          
          {/* Generation Options */}
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold dark:text-dark-primary-text">Generation Options:</h4>
            
            <div className="flex flex-wrap gap-6">
              <div className="min-w-[200px]">
                <label htmlFor="record-count" className="block text-sm font-medium mb-1 dark:text-dark-primary-text">
                  Number of Records:
                </label>
                <input
                  id="record-count"
                  type="number"
                  min="1"
                  max="1000"
                  value={recordCount}
                  onChange={(e) => setRecordCount(Number(e.target.value))}
                  className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Maximum: 1000 records
                </p>
              </div>
              
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium mb-1 dark:text-dark-primary-text">
                  Output Format:
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="output-format"
                      value="json"
                      checked={outputFormat === 'json'}
                      onChange={() => setOutputFormat('json')}
                      className="mr-2"
                    />
                    <span className="dark:text-dark-primary-text">JSON</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="output-format"
                      value="csv"
                      checked={outputFormat === 'csv'}
                      onChange={() => setOutputFormat('csv')}
                      className="mr-2"
                    />
                    <span className="dark:text-dark-primary-text">CSV</span>
                  </label>
                </div>
              </div>
            </div>
            
            <button
              onClick={generateData}
              className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Data
            </button>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="p-3 border-2 border-red-500 dark:border-red-700 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 shadow-solid">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {/* Output Area */}
          {output && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold dark:text-dark-primary-text">Generated Data:</h4>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  {copyButtonText}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                className="w-full h-64 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                spellCheck="false"
              />
            </div>
          )}
        </section>
      </div>
      
      {/* About Data Generation Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Mock Data Generation
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Mock Data Generation</strong> is the process of creating realistic but fictional data for testing, development, and demonstration purposes.
          </p>
          <p>
            <strong>Common use cases:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Testing applications without using real user data</li>
            <li>Populating databases for development environments</li>
            <li>Creating realistic demos and presentations</li>
            <li>Stress testing with large datasets</li>
            <li>Prototyping data-driven features</li>
          </ul>
          <p className="mt-2">
            <strong>Tips for effective data generation:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Define a schema that closely matches your real data structure</li>
            <li>Use appropriate field types to ensure realistic values</li>
            <li>Generate an appropriate volume of data for your testing needs</li>
            <li>Consider relationships between fields (e.g., matching names and emails)</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DataGeneratorPage;

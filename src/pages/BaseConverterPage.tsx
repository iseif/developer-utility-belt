import React, { useState } from 'react';

interface BaseInputProps {
  label: string;
  value: string;
  base: number;
  placeholder: string;
  onChange: (value: string, base: number) => void;
  isInvalid: boolean;
}

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  value,
  base,
  placeholder,
  onChange,
  isInvalid,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, base);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={`base-${base}`}
        className="block font-semibold mb-1 dark:text-dark-primary-text"
      >
        {label}
      </label>
      <input
        id={`base-${base}`}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full p-2 border-2 ${
          isInvalid
            ? 'border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-700'
            : 'border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700'
        } text-primary-text dark:text-dark-primary-text font-mono shadow-inner`}
      />
      {isInvalid && (
        <p className="text-red-600 dark:text-red-400 text-sm mt-1">
          Invalid {label.toLowerCase()} format
        </p>
      )}
    </div>
  );
};

const BaseConverterPage: React.FC = () => {
  // State for each base
  const [binary, setBinary] = useState<string>('');
  const [octal, setOctal] = useState<string>('');
  const [decimal, setDecimal] = useState<string>('');
  const [hexadecimal, setHexadecimal] = useState<string>('');

  // Validation state
  const [invalidInputs, setInvalidInputs] = useState<{
    [key: number]: boolean;
  }>({
    2: false,
    8: false,
    10: false,
    16: false,
  });

  // Regular expressions for validation
  const validationRegex: { [key: number]: RegExp } = {
    2: /^[01]*$/,
    8: /^[0-7]*$/,
    10: /^[0-9]*$/,
    16: /^[0-9A-Fa-f]*$/,
  };

  // Handle input change
  const handleInputChange = (value: string, base: number) => {
    // Check if input is valid for the given base
    const isValid = validationRegex[base].test(value);

    // Update validation state
    setInvalidInputs((prev) => ({
      ...prev,
      [base]: value !== '' && !isValid,
    }));

    // If input is empty, clear all fields
    if (value === '') {
      setBinary('');
      setOctal('');
      setDecimal('');
      setHexadecimal('');
      return;
    }

    // If input is invalid, only update the current field
    if (!isValid) {
      switch (base) {
        case 2:
          setBinary(value);
          break;
        case 8:
          setOctal(value);
          break;
        case 10:
          setDecimal(value);
          break;
        case 16:
          setHexadecimal(value);
          break;
      }
      return;
    }

    // Convert to decimal first
    let decimalValue: number;
    try {
      decimalValue = parseInt(value, base);

      // Check if the number is too large
      if (!Number.isSafeInteger(decimalValue)) {
        throw new Error('Number too large');
      }

      // Update all fields with converted values
      switch (base) {
        case 2:
          setBinary(value);
          setOctal(decimalValue.toString(8));
          setDecimal(decimalValue.toString(10));
          setHexadecimal(decimalValue.toString(16).toLowerCase());
          break;
        case 8:
          setBinary(decimalValue.toString(2));
          setOctal(value);
          setDecimal(decimalValue.toString(10));
          setHexadecimal(decimalValue.toString(16).toLowerCase());
          break;
        case 10:
          setBinary(decimalValue.toString(2));
          setOctal(decimalValue.toString(8));
          setDecimal(value);
          setHexadecimal(decimalValue.toString(16).toLowerCase());
          break;
        case 16:
          setBinary(decimalValue.toString(2));
          setOctal(decimalValue.toString(8));
          setDecimal(decimalValue.toString(10));
          setHexadecimal(value.toLowerCase());
          break;
      }

      // Reset all validation errors
      setInvalidInputs({
        2: false,
        8: false,
        10: false,
        16: false,
      });
    } catch (error) {
      // Handle conversion errors (like overflow)
      console.error('Conversion error:', error);
      setInvalidInputs((prev) => ({
        ...prev,
        [base]: true,
      }));
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Number Base Converter
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Convert numbers between binary (base 2), octal (base 8), decimal (base
          10), and hexadecimal (base 16).
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Base Converter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              label="Binary (Base 2)"
              value={binary}
              base={2}
              placeholder="Enter binary (0-1)"
              onChange={handleInputChange}
              isInvalid={invalidInputs[2]}
            />
            <BaseInput
              label="Octal (Base 8)"
              value={octal}
              base={8}
              placeholder="Enter octal (0-7)"
              onChange={handleInputChange}
              isInvalid={invalidInputs[8]}
            />
            <BaseInput
              label="Decimal (Base 10)"
              value={decimal}
              base={10}
              placeholder="Enter decimal (0-9)"
              onChange={handleInputChange}
              isInvalid={invalidInputs[10]}
            />
            <BaseInput
              label="Hexadecimal (Base 16)"
              value={hexadecimal}
              base={16}
              placeholder="Enter hex (0-9, A-F)"
              onChange={handleInputChange}
              isInvalid={invalidInputs[16]}
            />
          </div>
        </section>
      </div>

      {/* About Number Bases Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Number Bases
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Number bases</strong> (or numeral systems) are ways to
            represent numbers using different sets of symbols. The most common
            bases are:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Binary (Base 2):</strong> Uses only 0 and 1. Common in
              computing as it maps directly to electronic states.
            </li>
            <li>
              <strong>Octal (Base 8):</strong> Uses digits 0-7. Historically
              used in computing as a more compact representation of binary.
            </li>
            <li>
              <strong>Decimal (Base 10):</strong> Uses digits 0-9. The standard
              system used in everyday life.
            </li>
            <li>
              <strong>Hexadecimal (Base 16):</strong> Uses digits 0-9 and
              letters A-F. Commonly used in computing for memory addresses,
              color codes, etc.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Conversion examples:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Decimal 42 = Binary 101010 = Octal 52 = Hex 2A</li>
            <li>Decimal 255 = Binary 11111111 = Octal 377 = Hex FF</li>
          </ul>
          <p className="mt-2 text-yellow-600 dark:text-yellow-400">
            <strong>Note:</strong> JavaScript has built-in limits for integer
            precision (safe integers are between -(2^53-1) and 2^53-1). Very
            large numbers may not convert accurately.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BaseConverterPage;

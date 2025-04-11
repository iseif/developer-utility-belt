import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

// Interface for ASCII character data
interface AsciiCharacter {
  dec: number;
  hex: string;
  oct: string;
  bin: string;
  char: string;
  description: string;
}

// Control character descriptions
const controlCharDescriptions: Record<number, string> = {
  0: 'NUL (Null)',
  1: 'SOH (Start of Heading)',
  2: 'STX (Start of Text)',
  3: 'ETX (End of Text)',
  4: 'EOT (End of Transmission)',
  5: 'ENQ (Enquiry)',
  6: 'ACK (Acknowledge)',
  7: 'BEL (Bell)',
  8: 'BS (Backspace)',
  9: 'HT (Horizontal Tab)',
  10: 'LF (Line Feed)',
  11: 'VT (Vertical Tab)',
  12: 'FF (Form Feed)',
  13: 'CR (Carriage Return)',
  14: 'SO (Shift Out)',
  15: 'SI (Shift In)',
  16: 'DLE (Data Link Escape)',
  17: 'DC1 (Device Control 1)',
  18: 'DC2 (Device Control 2)',
  19: 'DC3 (Device Control 3)',
  20: 'DC4 (Device Control 4)',
  21: 'NAK (Negative Acknowledge)',
  22: 'SYN (Synchronous Idle)',
  23: 'ETB (End of Transmission Block)',
  24: 'CAN (Cancel)',
  25: 'EM (End of Medium)',
  26: 'SUB (Substitute)',
  27: 'ESC (Escape)',
  28: 'FS (File Separator)',
  29: 'GS (Group Separator)',
  30: 'RS (Record Separator)',
  31: 'US (Unit Separator)',
  127: 'DEL (Delete)',
};

// Function to generate ASCII table data
const generateAsciiData = (): AsciiCharacter[] => {
  const data: AsciiCharacter[] = [];

  // Generate data for ASCII codes 0-127
  for (let i = 0; i <= 127; i++) {
    const isControlChar = i < 32 || i === 127;

    // Format values
    const hex = i.toString(16).toUpperCase().padStart(2, '0');
    const oct = i.toString(8).padStart(3, '0');
    const bin = i.toString(2).padStart(8, '0');

    // Handle character representation
    let char = '';
    let description = '';

    if (isControlChar) {
      char = ''; // Non-printable
      description = controlCharDescriptions[i] || '';
    } else {
      char = String.fromCharCode(i);
      description = '';
    }

    data.push({
      dec: i,
      hex: `0x${hex}`,
      oct: `0${oct}`,
      bin,
      char,
      description,
    });
  }

  return data;
};

const AsciiTablePage: React.FC = () => {
  const [asciiData] = useState<AsciiCharacter[]>(generateAsciiData());
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<AsciiCharacter[]>(generateAsciiData());

  // Filter data based on search input
  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredData(asciiData);
      return;
    }

    const searchTerm = searchValue.toLowerCase();
    const filtered = asciiData.filter((item) => {
      return (
        item.dec.toString().includes(searchTerm) ||
        item.hex.toLowerCase().includes(searchTerm) ||
        item.oct.includes(searchTerm) ||
        item.bin.includes(searchTerm) ||
        item.char.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredData(filtered);
  }, [searchValue, asciiData]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          ASCII Table
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A reference table for the standard ASCII character set (0-127),
          showing decimal, hexadecimal, octal, binary, and character
          representations.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            ASCII Character Table
          </h3>

          {/* Search Input */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search by decimal, hex, character, or description..."
              className="w-full p-2 pl-10 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
            />
          </div>

          {/* ASCII Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-border-color dark:border-dark-border-color">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Dec
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Hex
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Oct
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Bin
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Char
                  </th>
                  <th className="border-2 border-border-color dark:border-dark-border-color p-2 text-left dark:text-dark-primary-text">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr
                    key={item.dec}
                    className={`
                      ${item.dec < 32 || item.dec === 127 ? 'bg-gray-50 dark:bg-gray-800' : ''}
                      hover:bg-gray-100 dark:hover:bg-gray-700
                    `}
                  >
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 font-mono dark:text-dark-primary-text">
                      {item.dec}
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 font-mono dark:text-dark-primary-text">
                      {item.hex}
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 font-mono dark:text-dark-primary-text">
                      {item.oct}
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 font-mono dark:text-dark-primary-text">
                      {item.bin}
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 font-mono dark:text-dark-primary-text">
                      {item.char || (
                        <span className="text-gray-400 dark:text-gray-500">
                          -
                        </span>
                      )}
                    </td>
                    <td className="border-2 border-border-color dark:border-dark-border-color p-2 dark:text-dark-primary-text">
                      {item.description || (
                        <span className="text-gray-400 dark:text-gray-500">
                          -
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* About ASCII Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About ASCII
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>ASCII</strong> (American Standard Code for Information
            Interchange) is a character encoding standard for electronic
            communication. ASCII codes represent text in computers,
            telecommunications equipment, and other devices.
          </p>
          <p>
            <strong>Key facts about ASCII:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              ASCII is a 7-bit encoding scheme, representing 128 characters
              (0-127)
            </li>
            <li>Codes 0-31 and 127 are non-printable control characters</li>
            <li>
              Codes 32-126 are printable characters (letters, digits,
              punctuation, etc.)
            </li>
            <li>ASCII was first published as a standard in 1963</li>
            <li>
              It forms the basis for most modern character encodings (e.g.,
              UTF-8)
            </li>
          </ul>
          <p className="mt-2">
            <strong>Common uses:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Text encoding in computing systems</li>
            <li>Data transmission in communication protocols</li>
            <li>Character representation in programming languages</li>
            <li>Reference for understanding binary data</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AsciiTablePage;

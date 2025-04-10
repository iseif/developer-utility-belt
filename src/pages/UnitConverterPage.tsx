import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

// Define the CSS unit types
type CssUnit = 'px' | 'pt' | 'em' | 'rem' | '%' | 'vw' | 'vh';

const UnitConverterPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputUnit, setInputUnit] = useState<CssUnit>('px');
  const [outputUnit, setOutputUnit] = useState<CssUnit>('rem');
  const [baseFontSize, setBaseFontSize] = useState<string>('16');
  const [outputValue, setOutputValue] = useState<string>('');
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight
  );
  const [error, setError] = useState<string>('');

  // Update viewport dimensions when window is resized
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Perform conversion whenever inputs change
  useEffect(() => {
    if (!inputValue.trim()) {
      setOutputValue('');
      setError('');
      return;
    }

    const numValue = parseFloat(inputValue);
    const numBaseFontSize = parseFloat(baseFontSize);

    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      setOutputValue('');
      return;
    }

    if (isNaN(numBaseFontSize) || numBaseFontSize <= 0) {
      setError('Please enter a valid base font size');
      setOutputValue('');
      return;
    }

    setError('');

    // Perform the conversion
    try {
      const result = convertUnits(
        numValue,
        inputUnit,
        outputUnit,
        numBaseFontSize,
        viewportWidth,
        viewportHeight
      );
      setOutputValue(result.toFixed(4).replace(/\.?0+$/, ''));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion error');
      setOutputValue('');
    }
  }, [
    inputValue,
    inputUnit,
    outputUnit,
    baseFontSize,
    viewportWidth,
    viewportHeight,
  ]);

  // Swap input and output units
  const handleSwapUnits = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
  };

  // Conversion function
  const convertUnits = (
    value: number,
    fromUnit: CssUnit,
    toUnit: CssUnit,
    baseFontSize: number,
    vpWidth: number,
    vpHeight: number
  ): number => {
    // First convert from input unit to pixels
    let pixelValue: number;

    switch (fromUnit) {
      case 'px':
        pixelValue = value;
        break;
      case 'pt':
        pixelValue = value * 1.333333; // 1pt = 1.333333px
        break;
      case 'em':
      case 'rem':
        pixelValue = value * baseFontSize;
        break;
      case '%':
        throw new Error(
          "% conversion requires context and isn't fully supported"
        );
      case 'vw':
        pixelValue = (value / 100) * vpWidth;
        break;
      case 'vh':
        pixelValue = (value / 100) * vpHeight;
        break;
      default:
        throw new Error(`Unsupported input unit: ${fromUnit}`);
    }

    // Then convert from pixels to output unit
    switch (toUnit) {
      case 'px':
        return pixelValue;
      case 'pt':
        return pixelValue / 1.333333;
      case 'em':
      case 'rem':
        return pixelValue / baseFontSize;
      case '%':
        throw new Error(
          "% conversion requires context and isn't fully supported"
        );
      case 'vw':
        return (pixelValue / vpWidth) * 100;
      case 'vh':
        return (pixelValue / vpHeight) * 100;
      default:
        throw new Error(`Unsupported output unit: ${toUnit}`);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          CSS Unit Converter
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Convert between different CSS units like pixels (px), points (pt), em,
          rem, viewport width (vw), and viewport height (vh).
        </p>
      </header>

      <section className="space-y-6 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
          Unit Converter
        </h3>

        {/* Base Font Size Input */}
        <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <label
            htmlFor="base-font-size"
            className="block mb-1 font-semibold dark:text-dark-primary-text"
          >
            Base Font Size (px):
          </label>
          <input
            id="base-font-size"
            type="number"
            value={baseFontSize}
            onChange={(e) => setBaseFontSize(e.target.value)}
            className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
            min="1"
            step="0.1"
          />
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Required for conversions involving em/rem units. Default is 16px.
          </p>
        </div>

        {/* Conversion Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Input Value and Unit */}
          <div className="space-y-2">
            <label
              htmlFor="input-value"
              className="block font-semibold dark:text-dark-primary-text"
            >
              Input Value:
            </label>
            <div className="flex">
              <input
                id="input-value"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="flex-grow p-2 border-2 border-r-0 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value as CssUnit)}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              >
                <option value="px">px</option>
                <option value="pt">pt</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapUnits}
              className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
              title="Swap units"
            >
              <FaExchangeAlt className="text-primary-text dark:text-dark-primary-text" />
            </button>
          </div>

          {/* Output Value and Unit */}
          <div className="space-y-2">
            <label
              htmlFor="output-value"
              className="block font-semibold dark:text-dark-primary-text"
            >
              Output Value:
            </label>
            <div className="flex">
              <input
                id="output-value"
                type="text"
                value={outputValue}
                readOnly
                className="flex-grow p-2 border-2 border-r-0 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
              <select
                value={outputUnit}
                onChange={(e) => setOutputUnit(e.target.value as CssUnit)}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              >
                <option value="px">px</option>
                <option value="pt">pt</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 border-2 border-red-500 dark:border-red-700 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Viewport Information */}
        <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h4 className="font-semibold dark:text-dark-primary-text">
            Current Viewport Size:
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Width: {viewportWidth}px, Height: {viewportHeight}px
            <br />
            <span className="italic">
              (Used for vw/vh conversions. Updates automatically when window is
              resized.)
            </span>
          </p>
        </div>
      </section>

      {/* About CSS Units Section - Moved to a separate box at the bottom */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About CSS Units
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>CSS Units</strong> are used to express length values in web
            design and development. They can be absolute or relative.
          </p>

          <h4 className="font-semibold mt-3 dark:text-dark-primary-text">
            Common CSS Units:
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>px (Pixels)</strong> - The most common absolute unit,
              represents a single dot on a screen
            </li>
            <li>
              <strong>pt (Points)</strong> - Traditionally used in print (1pt =
              1.333px)
            </li>
            <li>
              <strong>em</strong> - Relative to the font-size of the element
              (2em = 2 times the font size)
            </li>
            <li>
              <strong>rem</strong> - Relative to the font-size of the root
              element (html)
            </li>
            <li>
              <strong>%</strong> - Percentage relative to the parent element
            </li>
            <li>
              <strong>vw</strong> - Viewport width, 1vw = 1% of viewport width
            </li>
            <li>
              <strong>vh</strong> - Viewport height, 1vh = 1% of viewport height
            </li>
          </ul>

          <h4 className="font-semibold mt-3 dark:text-dark-primary-text">
            When to use different units:
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>px</strong> - Good for precise control, but doesn't scale
              with user preferences
            </li>
            <li>
              <strong>em/rem</strong> - Better for accessibility and responsive
              design
            </li>
            <li>
              <strong>vw/vh</strong> - Useful for layouts that need to scale
              with viewport size
            </li>
          </ul>

          <p className="mt-3 italic">
            Note: Conversions involving % units are context-dependent and may
            not be accurate in all scenarios.
          </p>
        </div>
      </section>
    </div>
  );
};

export default UnitConverterPage;

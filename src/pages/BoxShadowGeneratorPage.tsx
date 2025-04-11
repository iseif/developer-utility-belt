import React, { useCallback, useEffect, useState } from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Chrome } from '@uiw/react-color';

const BoxShadowGeneratorPage: React.FC = () => {
  // Shadow properties state
  const [horizontalOffset, setHorizontalOffset] = useState<number>(5);
  const [verticalOffset, setVerticalOffset] = useState<number>(5);
  const [blurRadius, setBlurRadius] = useState<number>(10);
  const [spreadRadius, setSpreadRadius] = useState<number>(0);
  const [shadowColor, setShadowColor] = useState<TinyColor>(
    new TinyColor('rgba(0, 0, 0, 0.5)')
  );
  const [isInset, setIsInset] = useState<boolean>(false);
  const [boxShadowValue, setBoxShadowValue] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy CSS');

  // Generate box-shadow CSS value
  const generateBoxShadowValue = useCallback(() => {
    const insetValue = isInset ? 'inset ' : '';
    const colorValue = shadowColor.toRgbString();

    return `${insetValue}${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${colorValue}`;
  }, [
    horizontalOffset,
    verticalOffset,
    blurRadius,
    spreadRadius,
    shadowColor,
    isInset,
  ]);

  // Update box-shadow value when any property changes
  useEffect(() => {
    const newBoxShadowValue = generateBoxShadowValue();
    setBoxShadowValue(newBoxShadowValue);
  }, [
    horizontalOffset,
    verticalOffset,
    blurRadius,
    spreadRadius,
    shadowColor,
    isInset,
    generateBoxShadowValue,
  ]);

  // Handle color change from color picker
  const handleColorChange = useCallback((color: { hex: string }) => {
    setShadowColor(new TinyColor(color.hex));
  }, []);

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`box-shadow: ${boxShadowValue};`);
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy CSS'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
      setTimeout(() => setCopyButtonText('Copy CSS'), 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          CSS Box Shadow Generator
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Create and customize CSS box shadows with a visual interface. Adjust
          the controls to see real-time changes.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Box Shadow Generator
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls Column */}
            <div className="space-y-6">
              {/* Shadow Properties Controls */}
              <div className="space-y-4">
                {/* Horizontal Offset */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-semibold dark:text-dark-primary-text">
                      Horizontal Offset
                    </label>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {horizontalOffset}px
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={horizontalOffset}
                      onChange={(e) =>
                        setHorizontalOffset(parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                    <input
                      type="number"
                      value={horizontalOffset}
                      onChange={(e) =>
                        setHorizontalOffset(parseInt(e.target.value))
                      }
                      className="w-16 p-1 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text text-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* Vertical Offset */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-semibold dark:text-dark-primary-text">
                      Vertical Offset
                    </label>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {verticalOffset}px
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={verticalOffset}
                      onChange={(e) =>
                        setVerticalOffset(parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                    <input
                      type="number"
                      value={verticalOffset}
                      onChange={(e) =>
                        setVerticalOffset(parseInt(e.target.value))
                      }
                      className="w-16 p-1 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text text-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* Blur Radius */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-semibold dark:text-dark-primary-text">
                      Blur Radius
                    </label>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {blurRadius}px
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={blurRadius}
                      onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <input
                      type="number"
                      min="0"
                      value={blurRadius}
                      onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                      className="w-16 p-1 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text text-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* Spread Radius */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="font-semibold dark:text-dark-primary-text">
                      Spread Radius
                    </label>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {spreadRadius}px
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="-50"
                      max="100"
                      value={spreadRadius}
                      onChange={(e) =>
                        setSpreadRadius(parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                    <input
                      type="number"
                      value={spreadRadius}
                      onChange={(e) =>
                        setSpreadRadius(parseInt(e.target.value))
                      }
                      className="w-16 p-1 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text text-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* Inset Toggle */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inset-toggle"
                    checked={isInset}
                    onChange={(e) => setIsInset(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="inset-toggle"
                    className="font-semibold dark:text-dark-primary-text"
                  >
                    Inset Shadow
                  </label>
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block mb-2 font-semibold dark:text-dark-primary-text">
                  Shadow Color
                </label>
                <Chrome
                  color={shadowColor.toHexString()}
                  onChange={handleColorChange}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Preview Column */}
            <div className="space-y-6">
              {/* Live Preview */}
              <div>
                <h4 className="font-semibold mb-2 dark:text-dark-primary-text">
                  Preview
                </h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-8 flex items-center justify-center border-2 border-border-color dark:border-dark-border-color">
                  <div
                    className="w-32 h-32 bg-white dark:bg-gray-800 border-2 border-border-color dark:border-dark-border-color"
                    style={{ boxShadow: boxShadowValue }}
                  ></div>
                </div>
              </div>

              {/* CSS Output */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold dark:text-dark-primary-text">
                    CSS Code
                  </h4>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    {copyButtonText}
                  </button>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-border-color dark:border-dark-border-color font-mono text-sm">
                  <code>box-shadow: {boxShadowValue};</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Box Shadows Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About CSS Box Shadows
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>CSS Box Shadow</strong> is a property that adds shadow
              effects around an element's frame. You can set multiple effects
              separated by commas.
            </p>
            <p>
              <strong>Syntax:</strong>{' '}
              <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                box-shadow: h-offset v-offset blur spread color inset;
              </code>
            </p>
            <p>
              <strong>Parameters:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>h-offset</strong> - Horizontal offset. Positive values
                put the shadow on the right, negative on the left.
              </li>
              <li>
                <strong>v-offset</strong> - Vertical offset. Positive values put
                the shadow below, negative above.
              </li>
              <li>
                <strong>blur</strong> - Blur radius. Higher values create a more
                blurred effect.
              </li>
              <li>
                <strong>spread</strong> - Spread radius. Positive values
                increase the size of the shadow, negative values decrease it.
              </li>
              <li>
                <strong>color</strong> - Shadow color, specified using standard
                CSS color formats.
              </li>
              <li>
                <strong>inset</strong> - Optional. Makes the shadow inside the
                frame rather than outside.
              </li>
            </ul>
            <p className="mt-2">
              Box shadows are widely used in web design to create depth,
              elevation, and visual hierarchy in user interfaces.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BoxShadowGeneratorPage;

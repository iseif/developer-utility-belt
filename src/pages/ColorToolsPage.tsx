import React, { useCallback, useState } from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Chrome } from '@uiw/react-color';

const ColorToolsPage: React.FC = () => {
  const [color, setColor] = useState<TinyColor>(new TinyColor('#1890ff'));
  const [backgroundColor, setBackgroundColor] = useState<TinyColor>(
    new TinyColor('#ffffff')
  );

  const calculateContrastRatio = useCallback(
    (foreground: TinyColor, background: TinyColor): number => {
      const fg = foreground.toRgb();
      const bg = background.toRgb();

      // Calculate relative luminance for both colors
      const getLuminance = (r: number, g: number, b: number) => {
        const [rs, gs, bs] = [r, g, b].map((c) => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };

      const l1 = getLuminance(fg.r, fg.g, fg.b);
      const l2 = getLuminance(bg.r, bg.g, bg.b);

      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);

      return (lighter + 0.05) / (darker + 0.05);
    },
    []
  );

  const getWCAGLevel = useCallback(
    (ratio: number): { AA: boolean; AAA: boolean } => {
      return {
        AA: ratio >= 4.5,
        AAA: ratio >= 7,
      };
    },
    []
  );

  const handleColorChange = useCallback((color: { hex: string }) => {
    setColor(new TinyColor(color.hex));
  }, []);

  const handleBackgroundColorChange = useCallback((color: { hex: string }) => {
    setBackgroundColor(new TinyColor(color.hex));
  }, []);

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = new TinyColor(e.target.value);
    if (newColor.isValid) {
      setColor(newColor);
    }
  };

  const handleBackgroundHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = new TinyColor(e.target.value);
    if (newColor.isValid) {
      setBackgroundColor(newColor);
    }
  };

  const contrastRatio = calculateContrastRatio(color, backgroundColor);
  const wcagLevels = getWCAGLevel(contrastRatio);

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Color Tools
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Pick colors, convert between formats, and check contrast ratios for
          accessibility.
        </p>
      </header>

      <div className="space-y-6">
        {/* Color Picker Section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Color Picker
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Chrome
                color={color.toHexString()}
                onChange={handleColorChange}
                className="mx-auto"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                  Preview
                </label>
                <div
                  className="w-full h-20 border-2 border-border-color dark:border-dark-border-color shadow-inner"
                  style={{ backgroundColor: color.toHexString() }}
                />
              </div>

              {/* Color Format Inputs */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-semibold dark:text-dark-primary-text">
                    HEX
                  </label>
                  <input
                    type="text"
                    value={color.toHexString()}
                    onChange={handleHexInput}
                    className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold dark:text-dark-primary-text">
                    RGB
                  </label>
                  <input
                    type="text"
                    value={color.toRgbString()}
                    readOnly
                    className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold dark:text-dark-primary-text">
                    HSL
                  </label>
                  <input
                    type="text"
                    value={color.toHslString()}
                    readOnly
                    className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contrast Checker Section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Contrast Checker
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                Background Color
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Chrome
                    color={backgroundColor.toHexString()}
                    onChange={handleBackgroundColorChange}
                    className="mx-auto"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-semibold dark:text-dark-primary-text">
                      HEX
                    </label>
                    <input
                      type="text"
                      value={backgroundColor.toHexString()}
                      onChange={handleBackgroundHexInput}
                      className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold dark:text-dark-primary-text">
                      RGB
                    </label>
                    <input
                      type="text"
                      value={backgroundColor.toRgbString()}
                      readOnly
                      className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold dark:text-dark-primary-text">
                      HSL
                    </label>
                    <input
                      type="text"
                      value={backgroundColor.toHslString()}
                      readOnly
                      className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                    />
                  </div>
                  <div
                    className="w-full h-20 border-2 border-border-color dark:border-dark-border-color shadow-inner"
                    style={{ backgroundColor: backgroundColor.toHexString() }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                Preview Text
              </label>
              <div
                className="w-full p-4 border-2 border-border-color dark:border-dark-border-color"
                style={{
                  backgroundColor: backgroundColor.toHexString(),
                  color: color.toHexString(),
                }}
              >
                <p className="text-2xl font-bold">Large Text (18pt+)</p>
                <p>Normal body text for testing contrast</p>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                Contrast Ratio: {contrastRatio.toFixed(2)}:1
              </label>
              <div className="space-y-2">
                <div
                  className={`p-2 border-2 ${wcagLevels.AA ? 'border-green-500 bg-green-50 dark:bg-green-900' : 'border-red-500 bg-red-50 dark:bg-red-900'}`}
                >
                  WCAG AA: {wcagLevels.AA ? 'Pass' : 'Fail'}
                </div>
                <div
                  className={`p-2 border-2 ${wcagLevels.AAA ? 'border-green-500 bg-green-50 dark:bg-green-900' : 'border-red-500 bg-red-50 dark:bg-red-900'}`}
                >
                  WCAG AAA: {wcagLevels.AAA ? 'Pass' : 'Fail'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About Color Contrast
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>WCAG Contrast Requirements:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                Level AA requires a contrast ratio of at least 4.5:1 for normal
                text
              </li>
              <li>
                Level AAA requires a contrast ratio of at least 7:1 for normal
                text
              </li>
              <li>
                Large text (18pt or 14pt bold) can have slightly lower ratios
              </li>
            </ul>
            <p className="mt-2">
              <strong>Tips for ensuring good contrast:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                Dark text on light backgrounds typically provides better
                readability
              </li>
              <li>Avoid using colors that are too similar in brightness</li>
              <li>Consider color blindness when choosing color combinations</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColorToolsPage;

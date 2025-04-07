import React, { useState, useEffect } from 'react';
import { Chrome } from '@uiw/react-color';
import { TinyColor } from '@ctrl/tinycolor';

interface ColorStop {
  color: TinyColor;
  position: number;
  id: string;
}

const GradientGeneratorPage: React.FC = () => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState<number>(90);
  const [radialShape, setRadialShape] = useState<'circle' | 'ellipse'>('circle');
  const [radialPosition, setRadialPosition] = useState<string>('center');
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: new TinyColor('#ff5e62'), position: 0, id: 'stop-1' },
    { color: new TinyColor('#ff9966'), position: 100, id: 'stop-2' },
  ]);
  const [activeStopId, setActiveStopId] = useState<string>('stop-1');
  const [cssCode, setCssCode] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy CSS');

  // Generate CSS code whenever gradient properties change
  useEffect(() => {
    generateCssCode();
  }, [gradientType, angle, radialShape, radialPosition, colorStops]);

  // Find the active color stop
  const activeStop = colorStops.find(stop => stop.id === activeStopId) || colorStops[0];

  // Generate the CSS gradient code
  const generateCssCode = () => {
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

    // Create the color stops string
    const stopsString = sortedStops
      .map(stop => `${stop.color.toHexString()} ${stop.position}%`)
      .join(', ');

    let gradientCSS: string;

    if (gradientType === 'linear') {
      gradientCSS = `background-image: linear-gradient(${angle}deg, ${stopsString});`;
    } else {
      gradientCSS = `background-image: radial-gradient(${radialShape} at ${radialPosition}, ${stopsString});`;
    }

    setCssCode(gradientCSS);
  };

  // Handle color change for active stop
  const handleColorChange = (color: { hex: string }) => {
    setColorStops(prevStops => 
      prevStops.map(stop => 
        stop.id === activeStopId 
          ? { ...stop, color: new TinyColor(color.hex) } 
          : stop
      )
    );
  };

  // Handle position change for a stop
  const handlePositionChange = (id: string, newPosition: number) => {
    setColorStops(prevStops => 
      prevStops.map(stop => 
        stop.id === id 
          ? { ...stop, position: Math.max(0, Math.min(100, newPosition)) } 
          : stop
      )
    );
  };

  // Add a new color stop
  const addColorStop = () => {
    // Find middle position between existing stops
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    let newPosition = 50;
    
    if (sortedStops.length >= 2) {
      // Find the largest gap between stops
      let maxGap = 0;
      let gapPosition = 50;
      
      for (let i = 0; i < sortedStops.length - 1; i++) {
        const gap = sortedStops[i + 1].position - sortedStops[i].position;
        if (gap > maxGap) {
          maxGap = gap;
          gapPosition = sortedStops[i].position + gap / 2;
        }
      }
      
      newPosition = gapPosition;
    }
    
    // Blend colors from adjacent stops
    const newColor = new TinyColor('#ffffff');
    
    const newStop: ColorStop = {
      color: newColor,
      position: newPosition,
      id: `stop-${Date.now()}`
    };
    
    setColorStops(prevStops => [...prevStops, newStop]);
    setActiveStopId(newStop.id);
  };

  // Remove a color stop
  const removeColorStop = (id: string) => {
    if (colorStops.length <= 2) {
      return; // Keep at least 2 stops
    }
    
    setColorStops(prevStops => prevStops.filter(stop => stop.id !== id));
    
    // Set a new active stop if the removed one was active
    if (activeStopId === id) {
      setActiveStopId(colorStops[0].id === id ? colorStops[1].id : colorStops[0].id);
    }
  };

  // Copy CSS code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopyButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => setCopyButtonText('Copy CSS'), 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          CSS Gradient Generator
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Create beautiful CSS gradients with a visual editor. Customize colors, positions, angles, and more.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Gradient Editor
          </h3>
          
          {/* Gradient Type Selector */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                Gradient Type:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGradientType('linear')}
                  className={`px-3 py-1 border-2 border-border-color dark:border-dark-border-color ${
                    gradientType === 'linear' 
                      ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-bold' 
                      : 'bg-gray-200 dark:bg-gray-600'
                  } text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setGradientType('radial')}
                  className={`px-3 py-1 border-2 border-border-color dark:border-dark-border-color ${
                    gradientType === 'radial' 
                      ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-bold' 
                      : 'bg-gray-200 dark:bg-gray-600'
                  } text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500`}
                >
                  Radial
                </button>
              </div>
            </div>

            {/* Linear Gradient Controls */}
            {gradientType === 'linear' && (
              <div>
                <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                  Angle: {angle}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-48 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Radial Gradient Controls */}
            {gradientType === 'radial' && (
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                    Shape:
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRadialShape('circle')}
                      className={`px-3 py-1 border-2 border-border-color dark:border-dark-border-color ${
                        radialShape === 'circle' 
                          ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-bold' 
                          : 'bg-gray-200 dark:bg-gray-600'
                      } text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500`}
                    >
                      Circle
                    </button>
                    <button
                      onClick={() => setRadialShape('ellipse')}
                      className={`px-3 py-1 border-2 border-border-color dark:border-dark-border-color ${
                        radialShape === 'ellipse' 
                          ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-bold' 
                          : 'bg-gray-200 dark:bg-gray-600'
                      } text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500`}
                    >
                      Ellipse
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                    Position:
                  </label>
                  <select
                    value={radialPosition}
                    onChange={(e) => setRadialPosition(e.target.value)}
                    className="p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
                  >
                    <option value="center">center</option>
                    <option value="top">top</option>
                    <option value="top right">top right</option>
                    <option value="right">right</option>
                    <option value="bottom right">bottom right</option>
                    <option value="bottom">bottom</option>
                    <option value="bottom left">bottom left</option>
                    <option value="left">left</option>
                    <option value="top left">top left</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Color Stops Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold dark:text-dark-primary-text">
                    Color Stops:
                  </label>
                  <button
                    onClick={addColorStop}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Add Stop
                  </button>
                </div>
                
                {/* Color Stops List */}
                <div className="space-y-2">
                  {colorStops.map((stop) => (
                    <div 
                      key={stop.id} 
                      className={`flex items-center gap-2 p-2 ${
                        stop.id === activeStopId 
                          ? 'border-2 border-black dark:border-white bg-gray-100 dark:bg-gray-700 font-bold' 
                          : 'border border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => setActiveStopId(stop.id)}
                    >
                      <div 
                        className="w-8 h-8 border-2 border-border-color dark:border-dark-border-color shadow-inner"
                        style={{ backgroundColor: stop.color.toHexString() }}
                      />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={stop.color.toHexString()}
                            onChange={(e) => {
                              const newColor = new TinyColor(e.target.value);
                              if (newColor.isValid) {
                                setColorStops(prevStops => 
                                  prevStops.map(s => 
                                    s.id === stop.id 
                                      ? { ...s, color: newColor } 
                                      : s
                                  )
                                );
                              }
                            }}
                            className="w-24 p-1 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={stop.position}
                            onChange={(e) => handlePositionChange(stop.id, parseInt(e.target.value))}
                            className="w-16 p-1 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                          />
                          <span className="text-sm dark:text-dark-primary-text">%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={stop.position}
                          onChange={(e) => handlePositionChange(stop.id, parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      {colorStops.length > 2 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeColorStop(stop.id);
                          }}
                          className="px-2 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Color Picker */}
              <div>
                <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                  Color Picker:
                </label>
                <Chrome 
                  color={activeStop.color.toHexString()} 
                  onChange={handleColorChange}
                  className="mx-auto"
                />
              </div>
            </div>
            
            {/* Preview and CSS Output */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold dark:text-dark-primary-text">
                  Preview:
                </label>
                <div 
                  className="w-full h-48 border-2 border-border-color dark:border-dark-border-color shadow-inner"
                  style={{ 
                    backgroundImage: gradientType === 'linear' 
                      ? `linear-gradient(${angle}deg, ${colorStops.sort((a, b) => a.position - b.position).map(stop => `${stop.color.toHexString()} ${stop.position}%`).join(', ')})` 
                      : `radial-gradient(${radialShape} at ${radialPosition}, ${colorStops.sort((a, b) => a.position - b.position).map(stop => `${stop.color.toHexString()} ${stop.position}%`).join(', ')})`
                  }}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-semibold dark:text-dark-primary-text">
                    CSS Code:
                  </label>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    {copyButtonText}
                  </button>
                </div>
                <textarea
                  value={cssCode}
                  readOnly
                  className="w-full h-24 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* About CSS Gradients Section */}
        <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
            About CSS Gradients
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>CSS Gradients</strong> allow you to display smooth transitions between two or more specified colors.
            </p>
            <p>
              <strong>Types of CSS gradients:</strong>
            </p>
            <ul className="list-none space-y-1 font-mono text-xs">
              <li><span className="inline-block w-24">Linear:</span> <span className="text-gray-500">→</span> Colors flow in a single direction (angle)</li>
              <li><span className="inline-block w-24">Radial:</span> <span className="text-gray-500">→</span> Colors radiate from a center point</li>
              <li><span className="inline-block w-24">Conic:</span> <span className="text-gray-500">→</span> Colors rotate around a center point (not in this tool)</li>
            </ul>
            <p className="mt-2">
              <strong>When to use:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Creating visually appealing backgrounds</li>
              <li>Adding depth to UI elements</li>
              <li>Creating color transitions without images</li>
              <li>Designing buttons, headers, and cards</li>
              <li>Creating modern, vibrant designs</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GradientGeneratorPage;

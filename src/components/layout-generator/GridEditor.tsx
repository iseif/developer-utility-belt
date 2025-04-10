import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

// Define types for grid properties
export type GridTemplateType = 'repeat' | 'custom';
export type JustifyItems = 'start' | 'end' | 'center' | 'stretch';
export type AlignItems = 'start' | 'end' | 'center' | 'stretch';
export type JustifySelf = 'start' | 'end' | 'center' | 'stretch';
export type AlignSelf = 'start' | 'end' | 'center' | 'stretch';

// Define types for grid item properties
export interface GridItem {
  id: string;
  gridColumnStart: number;
  gridColumnEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
  justifySelf: JustifySelf;
  alignSelf: AlignSelf;
  backgroundColor: string;
}

// Define props for the GridEditor component
export interface GridEditorProps {
  onCSSChange: (css: string) => void;
}

// Random color generator for grid items
const getRandomColor = () => {
  const colors = [
    '#F87171', // red-400
    '#FB923C', // orange-400
    '#FBBF24', // amber-400
    '#A3E635', // lime-400
    '#34D399', // emerald-400
    '#22D3EE', // cyan-400
    '#60A5FA', // blue-400
    '#A78BFA', // violet-400
    '#F472B6', // pink-400
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const GridEditor: React.FC<GridEditorProps> = ({ onCSSChange }) => {
  // State for container properties
  const [columns, setColumns] = useState<number>(3);
  const [rows, setRows] = useState<number>(3);
  const [columnType, setColumnType] = useState<GridTemplateType>('repeat');
  const [rowType, setRowType] = useState<GridTemplateType>('repeat');
  const [customColumns, setCustomColumns] = useState<string>('1fr 2fr 1fr');
  const [customRows, setCustomRows] = useState<string>('1fr 1fr 1fr');
  const [gap, setGap] = useState<string>('10');
  const [justifyItems, setJustifyItems] = useState<JustifyItems>('stretch');
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch');

  // State for grid items
  const [gridItems, setGridItems] = useState<GridItem[]>([
    {
      id: '1',
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRowEnd: 2,
      justifySelf: 'stretch',
      alignSelf: 'stretch',
      backgroundColor: getRandomColor(),
    },
    {
      id: '2',
      gridColumnStart: 2,
      gridColumnEnd: 3,
      gridRowStart: 1,
      gridRowEnd: 2,
      justifySelf: 'stretch',
      alignSelf: 'stretch',
      backgroundColor: getRandomColor(),
    },
    {
      id: '3',
      gridColumnStart: 3,
      gridColumnEnd: 4,
      gridRowStart: 1,
      gridRowEnd: 2,
      justifySelf: 'stretch',
      alignSelf: 'stretch',
      backgroundColor: getRandomColor(),
    },
    {
      id: '4',
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 2,
      gridRowEnd: 3,
      justifySelf: 'stretch',
      alignSelf: 'stretch',
      backgroundColor: getRandomColor(),
    },
    {
      id: '5',
      gridColumnStart: 2,
      gridColumnEnd: 4,
      gridRowStart: 2,
      gridRowEnd: 3,
      justifySelf: 'stretch',
      alignSelf: 'stretch',
      backgroundColor: getRandomColor(),
    },
  ]);

  // State for selected item
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Generate CSS for the current grid configuration
  const generateCSS = (): string => {
    // Determine grid template columns
    const gridTemplateColumns =
      columnType === 'repeat' ? `repeat(${columns}, 1fr)` : customColumns;

    // Determine grid template rows
    const gridTemplateRows =
      rowType === 'repeat' ? `repeat(${rows}, 1fr)` : customRows;

    let css = `.container {
  display: grid;
  grid-template-columns: ${gridTemplateColumns};
  grid-template-rows: ${gridTemplateRows};
  gap: ${gap}px;
  justify-items: ${justifyItems};
  align-items: ${alignItems};
}`;

    // Add CSS for each grid item
    gridItems.forEach((item, index) => {
      css += `\n\n.item-${index + 1} {
  grid-column: ${item.gridColumnStart} / ${item.gridColumnEnd};
  grid-row: ${item.gridRowStart} / ${item.gridRowEnd};
  ${item.justifySelf !== 'stretch' ? `justify-self: ${item.justifySelf};` : ''}
  ${item.alignSelf !== 'stretch' ? `align-self: ${item.alignSelf};` : ''}
}`;
    });

    return css;
  };

  // Update CSS when properties change
  useEffect(() => {
    onCSSChange(generateCSS());
  }, [
    columns,
    rows,
    columnType,
    rowType,
    customColumns,
    customRows,
    gap,
    justifyItems,
    alignItems,
    gridItems,
    generateCSS,
    onCSSChange,
  ]);

  // Add a new grid item
  const addGridItem = () => {
    const newItem: GridItem = {
      id: Date.now().toString(),
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRowEnd: 2,
      justifySelf: 'stretch',
      alignSelf: 'stretch',
      backgroundColor: getRandomColor(),
    };
    setGridItems([...gridItems, newItem]);
  };

  // Remove a grid item
  const removeGridItem = (id: string) => {
    if (gridItems.length <= 1) return; // Prevent removing all items
    setGridItems(gridItems.filter((item) => item.id !== id));
    if (selectedItemId === id) {
      setSelectedItemId(null);
    }
  };

  // Update a grid item property
  const updateGridItem = (
    id: string,
    property: keyof GridItem,
    value: string | number
  ) => {
    setGridItems(
      gridItems.map((item) =>
        item.id === id ? { ...item, [property]: value } : item
      )
    );
  };

  // Get the selected item
  const selectedItem = selectedItemId
    ? gridItems.find((item) => item.id === selectedItemId)
    : null;

  // Calculate the actual grid template based on the current settings
  const getGridTemplateColumns = () => {
    return columnType === 'repeat' ? `repeat(${columns}, 1fr)` : customColumns;
  };

  const getGridTemplateRows = () => {
    return rowType === 'repeat' ? `repeat(${rows}, 1fr)` : customRows;
  };

  return (
    <div className="space-y-6">
      {/* Container Properties */}
      <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h4 className="font-semibold dark:text-dark-primary-text mb-3">
          Container Properties
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Grid Template Columns */}
          <div className="space-y-2">
            <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
              grid-template-columns:
            </label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setColumnType('repeat')}
                className={`px-2 py-1 border-2 border-border-color dark:border-dark-border-color text-sm font-semibold shadow-solid dark:shadow-dark-solid ${
                  columnType === 'repeat'
                    ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg'
                    : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                repeat()
              </button>
              <button
                onClick={() => setColumnType('custom')}
                className={`px-2 py-1 border-2 border-border-color dark:border-dark-border-color text-sm font-semibold shadow-solid dark:shadow-dark-solid ${
                  columnType === 'custom'
                    ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg'
                    : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                custom
              </button>
            </div>

            {columnType === 'repeat' ? (
              <div className="flex items-center gap-2">
                <span className="text-sm dark:text-dark-primary-text">
                  repeat(
                </span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={columns}
                  onChange={(e) => setColumns(Number(e.target.value))}
                  className="w-16 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
                />
                <span className="text-sm dark:text-dark-primary-text">
                  , 1fr)
                </span>
              </div>
            ) : (
              <input
                type="text"
                value={customColumns}
                onChange={(e) => setCustomColumns(e.target.value)}
                placeholder="e.g., 1fr 2fr 1fr"
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
            )}
          </div>

          {/* Grid Template Rows */}
          <div className="space-y-2">
            <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
              grid-template-rows:
            </label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setRowType('repeat')}
                className={`px-2 py-1 border-2 border-border-color dark:border-dark-border-color text-sm font-semibold shadow-solid dark:shadow-dark-solid ${
                  rowType === 'repeat'
                    ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg'
                    : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                repeat()
              </button>
              <button
                onClick={() => setRowType('custom')}
                className={`px-2 py-1 border-2 border-border-color dark:border-dark-border-color text-sm font-semibold shadow-solid dark:shadow-dark-solid ${
                  rowType === 'custom'
                    ? 'bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg'
                    : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                custom
              </button>
            </div>

            {rowType === 'repeat' ? (
              <div className="flex items-center gap-2">
                <span className="text-sm dark:text-dark-primary-text">
                  repeat(
                </span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  className="w-16 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
                />
                <span className="text-sm dark:text-dark-primary-text">
                  , 1fr)
                </span>
              </div>
            ) : (
              <input
                type="text"
                value={customRows}
                onChange={(e) => setCustomRows(e.target.value)}
                placeholder="e.g., auto 1fr 2fr"
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
            )}
          </div>

          {/* Gap */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
              gap (px):
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={gap}
              onChange={(e) => setGap(e.target.value)}
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
            />
          </div>

          {/* Justify Items */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
              justify-items:
            </label>
            <select
              value={justifyItems}
              onChange={(e) => setJustifyItems(e.target.value as JustifyItems)}
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
            >
              <option value="stretch">stretch</option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
            </select>
          </div>

          {/* Align Items */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
              align-items:
            </label>
            <select
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as AlignItems)}
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
            >
              <option value="stretch">stretch</option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Preview */}
      <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold dark:text-dark-primary-text">Preview</h4>
          <div className="flex gap-2">
            <button
              onClick={addGridItem}
              className="px-2 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center gap-1"
            >
              <FaPlus className="text-xs" /> Add Item
            </button>
          </div>
        </div>

        <div
          className="p-4 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 min-h-[300px] overflow-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: getGridTemplateColumns(),
            gridTemplateRows: getGridTemplateRows(),
            gap: `${gap}px`,
            justifyItems,
            alignItems,
          }}
        >
          {gridItems.map((item, index) => (
            <div
              key={item.id}
              className={`p-3 border-2 ${selectedItemId === item.id ? 'border-rose-700 dark:border-rose-700' : 'border-border-color dark:border-dark-border-color'} shadow-solid dark:shadow-dark-solid flex items-center justify-center cursor-pointer transition-transform hover:scale-y-105`}
              style={{
                backgroundColor: item.backgroundColor,
                gridColumn: `${item.gridColumnStart} / ${item.gridColumnEnd}`,
                gridRow: `${item.gridRowStart} / ${item.gridRowEnd}`,
                justifySelf: item.justifySelf,
                alignSelf: item.alignSelf,
                minHeight: '60px',
              }}
              onClick={() => setSelectedItemId(item.id)}
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-white text-shadow">
                  Item {index + 1}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeGridItem(item.id);
                  }}
                  className="mt-1 text-white opacity-70 hover:opacity-100"
                  title="Remove item"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Properties */}
      <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h4 className="font-semibold dark:text-dark-primary-text mb-3">
          {selectedItem
            ? `Item ${gridItems.findIndex((item) => item.id === selectedItemId) + 1} Properties`
            : 'Select an item to edit its properties'}
        </h4>

        {selectedItem ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Grid Column Start */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                grid-column-start:
              </label>
              <input
                type="number"
                min="1"
                max={columnType === 'repeat' ? columns + 1 : 12}
                value={selectedItem.gridColumnStart}
                onChange={(e) =>
                  updateGridItem(
                    selectedItem.id,
                    'gridColumnStart',
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
            </div>

            {/* Grid Column End */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                grid-column-end:
              </label>
              <input
                type="number"
                min={selectedItem.gridColumnStart + 1}
                max={columnType === 'repeat' ? columns + 1 : 12}
                value={selectedItem.gridColumnEnd}
                onChange={(e) =>
                  updateGridItem(
                    selectedItem.id,
                    'gridColumnEnd',
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
            </div>

            {/* Grid Row Start */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                grid-row-start:
              </label>
              <input
                type="number"
                min="1"
                max={rowType === 'repeat' ? rows + 1 : 12}
                value={selectedItem.gridRowStart}
                onChange={(e) =>
                  updateGridItem(
                    selectedItem.id,
                    'gridRowStart',
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
            </div>

            {/* Grid Row End */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                grid-row-end:
              </label>
              <input
                type="number"
                min={selectedItem.gridRowStart + 1}
                max={rowType === 'repeat' ? rows + 1 : 12}
                value={selectedItem.gridRowEnd}
                onChange={(e) =>
                  updateGridItem(
                    selectedItem.id,
                    'gridRowEnd',
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
            </div>

            {/* Justify Self */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                justify-self:
              </label>
              <select
                value={selectedItem.justifySelf}
                onChange={(e) =>
                  updateGridItem(
                    selectedItem.id,
                    'justifySelf',
                    e.target.value as JustifySelf
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              >
                <option value="stretch">stretch</option>
                <option value="start">start</option>
                <option value="end">end</option>
                <option value="center">center</option>
              </select>
            </div>

            {/* Align Self */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                align-self:
              </label>
              <select
                value={selectedItem.alignSelf}
                onChange={(e) =>
                  updateGridItem(
                    selectedItem.id,
                    'alignSelf',
                    e.target.value as AlignSelf
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              >
                <option value="stretch">stretch</option>
                <option value="start">start</option>
                <option value="end">end</option>
                <option value="center">center</option>
              </select>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">
            Click on an item in the preview to edit its properties
          </p>
        )}
      </div>
    </div>
  );
};

export default GridEditor;

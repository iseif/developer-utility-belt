import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

// Define types for flexbox properties
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type AlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type AlignSelf =
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

// Define types for flex item properties
export interface FlexItem {
  id: string;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  alignSelf: AlignSelf;
  order: number;
  backgroundColor: string;
}

// Define props for the FlexboxEditor component
export interface FlexboxEditorProps {
  onCSSChange: (css: string) => void;
}

// Random color generator for flex items
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

const FlexboxEditor: React.FC<FlexboxEditorProps> = ({ onCSSChange }) => {
  // State for container properties
  const [flexDirection, setFlexDirection] = useState<FlexDirection>('row');
  const [justifyContent, setJustifyContent] =
    useState<JustifyContent>('flex-start');
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch');
  const [flexWrap, setFlexWrap] = useState<FlexWrap>('nowrap');
  const [gap, setGap] = useState<string>('10');

  // State for flex items
  const [flexItems, setFlexItems] = useState<FlexItem[]>([
    {
      id: '1',
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      order: 0,
      backgroundColor: getRandomColor(),
    },
    {
      id: '2',
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      order: 0,
      backgroundColor: getRandomColor(),
    },
    {
      id: '3',
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      order: 0,
      backgroundColor: getRandomColor(),
    },
  ]);

  // State for selected item
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Generate CSS for the current flexbox configuration
  const generateCSS = (): string => {
    let css = `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`;

    // Add CSS for each flex item
    flexItems.forEach((item, index) => {
      css += `\n\n.item-${index + 1} {
  flex-grow: ${item.flexGrow};
  flex-shrink: ${item.flexShrink};
  flex-basis: ${item.flexBasis};
  align-self: ${item.alignSelf !== 'auto' ? item.alignSelf : 'auto'};
  ${item.order !== 0 ? `order: ${item.order};` : ''}
}`;
    });

    return css;
  };

  // Update CSS when properties change
  React.useEffect(() => {
    onCSSChange(generateCSS());
  }, [
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    gap,
    flexItems,
    generateCSS,
    onCSSChange,
  ]);

  // Add a new flex item
  const addFlexItem = () => {
    const newItem: FlexItem = {
      id: Date.now().toString(),
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      order: 0,
      backgroundColor: getRandomColor(),
    };
    setFlexItems([...flexItems, newItem]);
  };

  // Remove a flex item
  const removeFlexItem = (id: string) => {
    if (flexItems.length <= 1) return; // Prevent removing all items
    setFlexItems(flexItems.filter((item) => item.id !== id));
    if (selectedItemId === id) {
      setSelectedItemId(null);
    }
  };

  // Update a flex item property
  const updateFlexItem = (
    id: string,
    property: keyof FlexItem,
    value: string | number
  ) => {
    setFlexItems(
      flexItems.map((item) =>
        item.id === id ? { ...item, [property]: value } : item
      )
    );
  };

  // Get the selected item
  const selectedItem = selectedItemId
    ? flexItems.find((item) => item.id === selectedItemId)
    : null;

  return (
    <div className="space-y-6">
      {/* Container Properties */}
      <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h4 className="font-semibold dark:text-dark-primary-text mb-3">
          Container Properties
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Flex Direction */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
              flex-direction:
            </label>
            <select
              value={flexDirection}
              onChange={(e) =>
                setFlexDirection(e.target.value as FlexDirection)
              }
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          {/* Justify Content */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
              justify-content:
            </label>
            <select
              value={justifyContent}
              onChange={(e) =>
                setJustifyContent(e.target.value as JustifyContent)
              }
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
            >
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
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
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="stretch">stretch</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          {/* Flex Wrap */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
              flex-wrap:
            </label>
            <select
              value={flexWrap}
              onChange={(e) => setFlexWrap(e.target.value as FlexWrap)}
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
            >
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
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
        </div>
      </div>

      {/* Flexbox Preview */}
      <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold dark:text-dark-primary-text">Preview</h4>
          <div className="flex gap-2">
            <button
              onClick={addFlexItem}
              className="px-2 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center gap-1"
            >
              <FaPlus className="text-xs" /> Add Item
            </button>
          </div>
        </div>

        <div
          className="p-4 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 min-h-[200px] overflow-auto"
          style={{
            display: 'flex',
            flexDirection,
            justifyContent,
            alignItems,
            flexWrap,
            gap: `${gap}px`,
          }}
        >
          {flexItems.map((item, index) => (
            <div
              key={item.id}
              className={`p-3 border-2 ${selectedItemId === item.id ? 'border-rose-700 dark:border-rose-700' : 'border-border-color dark:border-dark-border-color'} shadow-solid dark:shadow-dark-solid flex items-center justify-center cursor-pointer transition-transform hover:scale-y-105`}
              style={{
                backgroundColor: item.backgroundColor,
                flexGrow: item.flexGrow,
                flexShrink: item.flexShrink,
                flexBasis: item.flexBasis,
                alignSelf: item.alignSelf,
                order: item.order,
                minWidth: '60px',
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
                    removeFlexItem(item.id);
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
            ? `Item ${flexItems.findIndex((item) => item.id === selectedItemId) + 1} Properties`
            : 'Select an item to edit its properties'}
        </h4>

        {selectedItem ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Flex Grow */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                flex-grow:
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="1"
                value={selectedItem.flexGrow}
                onChange={(e) =>
                  updateFlexItem(
                    selectedItem.id,
                    'flexGrow',
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
            </div>

            {/* Flex Shrink */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                flex-shrink:
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="1"
                value={selectedItem.flexShrink}
                onChange={(e) =>
                  updateFlexItem(
                    selectedItem.id,
                    'flexShrink',
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
            </div>

            {/* Flex Basis */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                flex-basis:
              </label>
              <select
                value={selectedItem.flexBasis}
                onChange={(e) =>
                  updateFlexItem(selectedItem.id, 'flexBasis', e.target.value)
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              >
                <option value="auto">auto</option>
                <option value="0">0</option>
                <option value="100px">100px</option>
                <option value="200px">200px</option>
                <option value="50%">50%</option>
                <option value="100%">100%</option>
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
                  updateFlexItem(
                    selectedItem.id,
                    'alignSelf',
                    e.target.value as AlignSelf
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              >
                <option value="auto">auto</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="stretch">stretch</option>
                <option value="baseline">baseline</option>
              </select>
            </div>

            {/* Order */}
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-dark-primary-text">
                order:
              </label>
              <input
                type="number"
                min="-10"
                max="10"
                step="1"
                value={selectedItem.order}
                onChange={(e) =>
                  updateFlexItem(
                    selectedItem.id,
                    'order',
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner"
              />
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

export default FlexboxEditor;

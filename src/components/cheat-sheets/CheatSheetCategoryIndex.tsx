import React from 'react';

interface CategoryIndexProps {
  categories: { title: string }[];
}

const CheatSheetCategoryIndex: React.FC<CategoryIndexProps> = ({
  categories,
}) => {
  return (
    <div className="mb-6 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
      <h3 className="text-sm font-semibold mb-2 dark:text-dark-primary-text">
        Jump to Category:
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <a
            key={category.title}
            href={`#${category.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-primary-text dark:text-dark-primary-text transition-colors"
          >
            {category.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CheatSheetCategoryIndex;

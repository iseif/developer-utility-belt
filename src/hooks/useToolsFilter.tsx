import { useState } from 'react';
import { Tool } from '../data/toolsData';

/**
 * Custom hook for filtering tools based on search query
 * This hook extracts the common filtering logic used in Nav and HomePage components
 */
export const useToolsFilter = (allTools: Tool[]) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter tools based on search query with deduplication
  const filteredTools =
    searchQuery.trim() === ''
      ? []
      : allTools
          .filter(
            (tool) =>
              tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (tool.description &&
                tool.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()))
          )
          // Deduplicate tools with the same path
          .filter(
            (tool, index, self) =>
              index === self.findIndex((t) => t.path === tool.path)
          );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Create a unique key that changes when filteredTools changes
  const searchResultsKey = `search-results-${searchQuery}-${filteredTools.length}`;

  return {
    searchQuery,
    setSearchQuery,
    filteredTools,
    handleSearchChange,
    searchResultsKey,
  };
};

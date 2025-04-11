import { useEffect, useState } from 'react';

// Hook to manage favorites
export const useFavorites = () => {
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add a tool path to favorites
  const addFavorite = (path: string) => {
    setFavorites((prev) => {
      if (!prev.includes(path)) {
        return [...prev, path];
      }
      return prev;
    });
  };

  // Remove a tool path from favorites
  const removeFavorite = (path: string) => {
    setFavorites((prev) => prev.filter((favPath) => favPath !== path));
  };

  // Toggle a tool's favorite status
  const toggleFavorite = (path: string) => {
    if (favorites.includes(path)) {
      removeFavorite(path);
    } else {
      addFavorite(path);
    }
  };

  // Check if a tool path is in favorites
  const isFavorite = (path: string) => favorites.includes(path);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};

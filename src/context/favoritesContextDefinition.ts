import { createContext } from 'react';

// Define the context type
export interface FavoritesContextType {
  favorites: string[];
  addFavorite: (path: string) => void;
  removeFavorite: (path: string) => void;
  toggleFavorite: (path: string) => void;
  isFavorite: (path: string) => boolean;
}

// Create the context with a default value
export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

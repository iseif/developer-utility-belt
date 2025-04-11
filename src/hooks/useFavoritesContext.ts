import { useContext } from 'react';
import { FavoritesContext } from '../context/favoritesContextDefinition';

// Custom hook to use the favorites context
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider'
    );
  }
  return context;
};

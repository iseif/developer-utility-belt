import React, { ReactNode } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { FavoritesContext } from './favoritesContextDefinition';

// Provider component
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const favoritesData = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
};

import React from 'react';
import { FaStar } from 'react-icons/fa';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`transition-colors duration-150 ${className}`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <FaStar
        className={`${
          isFavorite ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'
        } hover:text-yellow-400 dark:hover:text-yellow-400`}
      />
    </button>
  );
};

export default FavoriteButton;

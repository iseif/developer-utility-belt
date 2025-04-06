import React from 'react';

interface MainContentAreaProps {
  children: React.ReactNode;
}

const MainContentArea: React.FC<MainContentAreaProps> = ({ children }) => {
  return (
    <main className="flex-grow p-6 bg-primary-bg text-primary-text shadow-none dark:bg-dark-primary-bg dark:text-dark-primary-text">
      {children}
    </main>
  );
};

export default MainContentArea;

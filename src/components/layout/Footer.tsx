import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-bg text-primary-text p-3 text-center border-t-4 border-border-color shadow-[0_-4px_0px_#000000] dark:bg-dark-primary-bg dark:text-dark-primary-text dark:border-dark-border-color dark:shadow-[0_-4px_0px_#e0e0e0]">
      {new Date().getFullYear()} Developer Utility Belt by Seif Ibrahim
    </footer>
  );
};

export default Footer;

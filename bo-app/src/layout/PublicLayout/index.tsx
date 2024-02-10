import { motion } from 'framer-motion';
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = (): JSX.Element => {
  return (
    <motion.main
      style={{
        height: '100%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}>
      <Outlet />
    </motion.main>
  );
};

export default PublicLayout;

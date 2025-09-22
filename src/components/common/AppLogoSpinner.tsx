import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const AppLogoSpinner: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
      >
        <Code className="w-12 h-12 text-white" />
      </motion.div>
    </div>
  );
};

export default AppLogoSpinner;

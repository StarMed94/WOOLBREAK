import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-gray-100">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md"
      >
        <Code className="w-8 h-8 text-white" />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;

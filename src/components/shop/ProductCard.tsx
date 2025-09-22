import React from 'react';
import { motion } from 'framer-motion';
import { Product } from './types';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <motion.div
      className="bg-surface rounded-lg shadow-md overflow-hidden flex flex-col group"
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold font-heading text-text mb-2 truncate">{product.name}</h3>
        <p className="text-sm text-text-secondary mb-4 flex-grow">{product.description.substring(0, 60)}...</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-primary">{product.price.toFixed(2)} €</span>
          <motion.button
            onClick={handleAddToCart}
            className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

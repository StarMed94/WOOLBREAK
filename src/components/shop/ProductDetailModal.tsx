import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { Product } from './types';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { dispatch } = useCart();

  useEffect(() => {
    if (product && product.gallery.length > 0) {
      setSelectedImage(product.gallery[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast.success(`${product.name} a été ajouté au panier !`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-surface text-text rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-lg mb-4 shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {product.gallery.map((imgUrl, index) => (
                      <img
                        key={index}
                        src={imgUrl}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`w-full h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${
                          selectedImage === imgUrl ? 'border-primary' : 'border-transparent hover:border-primary/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold font-heading text-text mb-4">{product.name}</h2>
                  <p className="text-text-secondary mb-6 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-primary">{product.price.toFixed(2)} €</span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 hover:bg-secondary transition-colors"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Ajouter au panier</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;

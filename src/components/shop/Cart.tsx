import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart, CartItem as CartItemType } from '../../contexts/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-surface text-text shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200/10">
              <h2 className="text-2xl font-bold font-heading">Votre Panier</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
                <X className="w-6 h-6" />
              </button>
            </div>

            {state.items.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <p className="text-text-secondary text-lg">Votre panier est vide.</p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Continuer vos achats
                </button>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {state.items.map(item => (
                    <CartItem key={item.id} item={item} dispatch={dispatch} />
                  ))}
                </div>

                <div className="p-6 border-t border-gray-200/10">
                  <div className="flex justify-between items-center mb-4 text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-secondary transition-colors"
                  >
                    Passer la commande
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                    className="w-full mt-2 text-sm text-text-secondary hover:text-red-500"
                  >
                    Vider le panier
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CartItem: React.FC<{ item: CartItemType; dispatch: React.Dispatch<any> }> = ({ item, dispatch }) => {
  const updateQuantity = (newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
  };

  return (
    <div className="flex items-center space-x-4">
      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
      <div className="flex-grow">
        <h3 className="font-semibold text-text">{item.name}</h3>
        <p className="text-sm text-text-secondary">{item.price.toFixed(2)} €</p>
        <div className="flex items-center mt-2">
          <button onClick={() => updateQuantity(item.quantity - 1)} className="p-1 rounded-full bg-white/10"><Minus className="w-4 h-4" /></button>
          <span className="px-3 font-semibold">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.quantity + 1)} className="p-1 rounded-full bg-white/10"><Plus className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
        <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })} className="text-red-500 hover:text-red-400 mt-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Cart;

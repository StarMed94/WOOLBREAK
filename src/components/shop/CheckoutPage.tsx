import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { ThemeProvider } from '../editor/ThemeContext';
import Header from '../Header';
import Footer from '../Footer';
import { Lock, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { state, totalPrice, dispatch } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  if (state.items.length === 0 && !isProcessing) {
    return (
      <ThemeProvider>
        <div className="bg-background text-text min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
              <button
                onClick={() => navigate('/shop')}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold"
              >
                Retour à la boutique
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simule une redirection vers une passerelle de paiement
    setTimeout(() => {
      alert("Vous allez être redirigé vers une passerelle de paiement sécurisée. Ceci est une simulation.");
      dispatch({ type: 'CLEAR_CART' });
      navigate('/');
    }, 2000);
  };

  return (
    <ThemeProvider>
      <div className="bg-background text-text min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold font-heading">Finaliser la commande</h1>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulaire de paiement */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <form onSubmit={handlePayment} className="bg-surface p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 font-heading">Informations de paiement</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Nom sur la carte</label>
                      <input type="text" required className="w-full p-2 border border-gray-300/20 rounded-lg bg-background" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Numéro de carte</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                        <input type="text" placeholder="•••• •••• •••• ••••" required className="w-full pl-10 p-2 border border-gray-300/20 rounded-lg bg-background" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-text-secondary mb-1">Date d'expiration</label>
                        <input type="text" placeholder="MM/AA" required className="w-full p-2 border border-gray-300/20 rounded-lg bg-background" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-text-secondary mb-1">CVC</label>
                        <input type="text" placeholder="•••" required className="w-full p-2 border border-gray-300/20 rounded-lg bg-background" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-8 bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-secondary transition-colors disabled:bg-gray-500"
                  >
                    {isProcessing ? 'Traitement...' : `Payer ${totalPrice.toFixed(2)} €`}
                  </button>
                  <p className="text-xs text-text-secondary mt-4 text-center flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" /> Paiement sécurisé via une passerelle externe.
                  </p>
                </form>
              </motion.div>

              {/* Récapitulatif de la commande */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-surface p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 font-heading">Récapitulatif</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {state.items.map(item => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-text-secondary">Quantité: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200/10 mt-6 pt-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CheckoutPage;

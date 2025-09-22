import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import Header from '../Header';
import Footer from '../Footer';
import Cart from './Cart';
import ProductCard from './ProductCard';
import { Product } from './types';
import { ThemeProvider } from '../editor/ThemeContext';
import { Filter, Search } from 'lucide-react';

const generateProducts = (count: number): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      imageUrl: `https://picsum.photos/seed/${faker.string.uuid()}/400/300`,
      category: faker.commerce.department(),
    });
  }
  return products;
};

const ShopPage: React.FC = () => {
  const [products] = useState<Product[]>(() => generateProducts(24));
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const uniqueCategories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm]);

  return (
    <ThemeProvider>
      <div className="bg-background text-text min-h-screen flex flex-col">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-text mb-4">
                Notre Boutique
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Découvrez notre sélection de produits exclusifs, générés pour cette démo.
              </p>
            </motion.div>

            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300/20 rounded-lg bg-surface focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="relative w-full md:w-64">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300/20 rounded-lg bg-surface appearance-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="capitalize">{cat === 'all' ? 'Toutes les catégories' : cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </div>
        </main>
        <Footer />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </ThemeProvider>
  );
};

export default ShopPage;

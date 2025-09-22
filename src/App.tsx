import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import ApiSection from './components/ApiSection'
import UseCases from './components/UseCases'
import Footer from './components/Footer'
import { ShoppingBag } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import AppLogoSpinner from './components/common/AppLogoSpinner'
import AdminRoute from './components/admin/AdminRoute'
import FloatingHomeButton from './components/common/FloatingHomeButton'

// Lazy load page components
const EditorPage = lazy(() => import('./components/EditorPage'))
const ShopPage = lazy(() => import('./components/shop/ShopPage'))
const CheckoutPage = lazy(() => import('./components/shop/CheckoutPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const DataSourcesPage = lazy(() => import('./pages/DataSourcesPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const ApiDocsPage = lazy(() => import('./pages/ApiDocsPage'))

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <ApiSection />
      <UseCases />
      <Footer />
      
      {/* FABs */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
        <button
          onClick={() => navigate('/shop')}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          title="Ouvrir la boutique"
        >
          <ShoppingBag className="w-8 h-8" />
        </button>
        <button
          onClick={() => navigate('/editor')}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          title="Ouvrir l'éditeur"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <FloatingHomeButton />
        <Suspense fallback={<AppLogoSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/data-sources" element={<DataSourcesPage />} />
            <Route path="/api-docs" element={<ApiDocsPage />} />
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import Landing from './pages/landingpage';
import Login from './pages/login';
import Signup from './pages/signup';
import { AuthProvider } from './context/AuthContext';
import PublicRoutes from './components/PublicRoutes';
import ProtectedRoutes from './components/ProtectedRoutes'
import Products from './pages/products'
import ProductDetails from './pages/productDetails'
import AddProduct from './pages/addProduct'

import Wishlist from './pages/wishlist'

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoutes><Landing /></PublicRoutes>} />
        <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path="/signup" element={<PublicRoutes><Signup /></PublicRoutes>} />
        <Route path="/home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path="/products" element={<ProtectedRoutes><Products /></ProtectedRoutes>} />
        <Route path="/products/new" element={<ProtectedRoutes><AddProduct /></ProtectedRoutes>} />
        <Route path="/products/:id" element={<ProtectedRoutes><ProductDetails /></ProtectedRoutes>} />
        <Route path="/wishlist" element={<ProtectedRoutes><Wishlist /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

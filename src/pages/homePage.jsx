import { Link, Route, Routes } from 'react-router-dom';
import Header from '../components/header';
import LoginPage from './loginPage';
import ProductOverview from './productOverview';
import ProductPage from './home/product';
import Cart from './home/cart';
import ShippingPage from './home/shipping';

export default function HomePage() {
    return (
      <div className="h-screen w-full">
        <Header />
        <div className='w-full h-[calc(100vh-100px)]'>
          <Routes path="/*">
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path='/products' element={<ProductPage/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/productInfo/:id" element={<ProductOverview/>} />
            <Route path='/shipping' element={<ShippingPage />} />
          </Routes>
        </div>
        
        
      </div>
    );
  }
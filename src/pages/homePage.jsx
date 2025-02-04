import { Link, Route, Routes } from 'react-router-dom';
import Header from '../components/header';
import LoginPage from './loginPage';

export default function HomePage() {
    return (
      <div className="h-screen w-full">
        <Header />
        <div className='w-full h-[calc(100vh-100px)]'>
          <Routes path="/*">
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/productInfo" element={<h1>Product Info</h1>} />
          </Routes>
        </div>
        
        
      </div>
    );
  }
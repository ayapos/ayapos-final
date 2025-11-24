import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n/config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

// Pages
import Home from './pages/Home';
import POSSystems from './pages/POSSystems';
import Digital from './pages/Digital';
import AyaPay from './pages/AyaPay';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pos" element={<POSSystems />} />
            <Route path="/digital" element={<Digital />} />
            <Route path="/ayapay" element={<AyaPay />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <Toaster />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

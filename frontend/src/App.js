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
import SelfOrderKiosk from './pages/SelfOrderKiosk';
import OrderSystem from './pages/OrderSystem';
import WaiterTerminal from './pages/WaiterTerminal';
import MobileOrderApp from './pages/MobileOrderApp';
import RobotWaiter from './pages/RobotWaiter';
import DeliveryManagement from './pages/DeliveryManagement';
import WebPortal from './pages/WebPortal';
import MobileReports from './pages/MobileReports';
import StockManagement from './pages/StockManagement';
import CentralizedManagement from './pages/CentralizedManagement';
import RestaurantPOS from './pages/RestaurantPOS';

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
            
            {/* Restaurant & Cafe Solutions */}
            <Route path="/restaurant-pos" element={<RestaurantPOS />} />
            <Route path="/self-order-kiosk" element={<SelfOrderKiosk />} />
            <Route path="/order-system" element={<OrderSystem />} />
            <Route path="/waiter-terminal" element={<WaiterTerminal />} />
            <Route path="/mobile-order-app" element={<MobileOrderApp />} />
            <Route path="/robot-waiter" element={<RobotWaiter />} />
            <Route path="/delivery-management" element={<DeliveryManagement />} />
            
            {/* Management Tools */}
            <Route path="/web-portal" element={<WebPortal />} />
            <Route path="/mobile-reports" element={<MobileReports />} />
            <Route path="/stock-management" element={<StockManagement />} />
            <Route path="/centralized-management" element={<CentralizedManagement />} />
          </Routes>
          <Footer />
          <Toaster />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

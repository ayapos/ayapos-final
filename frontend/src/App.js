import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n/config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CallbackPopup from './components/CallbackPopup';
import ScrollToTop from './components/ScrollToTop';
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
import DeliveryManagementComplete from './pages/DeliveryManagementComplete';
import WebPortal from './pages/WebPortal';
import WebPortalComplete from './pages/WebPortalComplete';
import MobileReports from './pages/MobileReports';
import MobileReportsComplete from './pages/MobileReportsComplete';
import StockManagement from './pages/StockManagement';
import StockManagementComplete from './pages/StockManagementComplete';
import CentralizedManagement from './pages/CentralizedManagement';
import CentralizedManagementComplete from './pages/CentralizedManagementComplete';
import RestaurantPOS from './pages/RestaurantPOS';
import OrderSystemNew from './pages/OrderSystemNew';
import KioskPricing from './pages/KioskPricing';
import OrderSystemPricing from './pages/OrderSystemPricing';
import DeliveryServicePricing from './pages/DeliveryServicePricing';
import WaiterTerminalPricing from './pages/WaiterTerminalPricing';
import HardwareDevices from './pages/HardwareDevices';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost1 from './pages/blog/BlogPost1';
import BlogPost2 from './pages/blog/BlogPost2';
import WaiterTerminalNew from './pages/WaiterTerminalNew';
import MobileOrderAppComplete from './pages/MobileOrderAppComplete';
import RobotWaiterComplete from './pages/RobotWaiterComplete';
import LogoPreview from './pages/LogoPreview';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

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
            <Route path="/kiosk-pricing" element={<KioskPricing />} />
            <Route path="/order-system" element={<OrderSystemNew />} />
            <Route path="/order-system-pricing" element={<OrderSystemPricing />} />
            <Route path="/delivery-service-pricing" element={<DeliveryServicePricing />} />
            <Route path="/waiter-terminal" element={<WaiterTerminalNew />} />
            <Route path="/waiter-terminal-pricing" element={<WaiterTerminalPricing />} />
            <Route path="/mobile-order-app" element={<MobileOrderAppComplete />} />
            <Route path="/robot-waiter" element={<RobotWaiterComplete />} />
            <Route path="/delivery-management" element={<DeliveryManagementComplete />} />
            
            {/* Management Tools */}
            <Route path="/web-portal" element={<WebPortalComplete />} />
            <Route path="/mobile-reports" element={<MobileReportsComplete />} />
            <Route path="/stock-management" element={<StockManagementComplete />} />
            <Route path="/centralized-management" element={<CentralizedManagementComplete />} />
            <Route path="/hardware-devices" element={<HardwareDevices />} />
            
            {/* About & Blog */}
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/post-1" element={<BlogPost1 />} />
            <Route path="/blog/post-2" element={<BlogPost2 />} />
            
            {/* Legal Pages */}
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Logo Preview */}
            <Route path="/logo-preview" element={<LogoPreview />} />
          </Routes>
          <Footer />
          <CallbackPopup />
          <Toaster />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

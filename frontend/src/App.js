import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n/config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CallbackPopup from './components/CallbackPopup';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import POSSystems from './pages/POSSystemsDynamic';
import Digital from './pages/Digital';
import AyaPay from './pages/AyaPay';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import SelfOrderKiosk from './pages/SelfOrderKioskDynamic';
import OrderSystem from './pages/OrderSystemDynamic';
import WaiterTerminal from './pages/WaiterTerminal';
import MobileOrderApp from './pages/MobileOrderAppDynamic';
import RobotWaiter from './pages/RobotWaiterDynamic';
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
import ITServices from './pages/ITServices';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminComplete';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <CallbackPopup />
  </>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes (no navbar/footer) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Public Routes (with navbar/footer) */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/pos" element={<PublicLayout><POSSystems /></PublicLayout>} />
              <Route path="/digital" element={<PublicLayout><Digital /></PublicLayout>} />
              <Route path="/ayapay" element={<PublicLayout><AyaPay /></PublicLayout>} />
              <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              
              {/* Restaurant & Cafe Solutions */}
              <Route path="/restaurant-pos" element={<PublicLayout><RestaurantPOS /></PublicLayout>} />
              <Route path="/self-order-kiosk" element={<PublicLayout><SelfOrderKiosk /></PublicLayout>} />
              <Route path="/kiosk-pricing" element={<PublicLayout><KioskPricing /></PublicLayout>} />
              <Route path="/order-system" element={<PublicLayout><OrderSystemNew /></PublicLayout>} />
              <Route path="/order-system-pricing" element={<PublicLayout><OrderSystemPricing /></PublicLayout>} />
              <Route path="/delivery-service-pricing" element={<PublicLayout><DeliveryServicePricing /></PublicLayout>} />
              <Route path="/waiter-terminal" element={<PublicLayout><WaiterTerminalNew /></PublicLayout>} />
              <Route path="/waiter-terminal-pricing" element={<PublicLayout><WaiterTerminalPricing /></PublicLayout>} />
              <Route path="/mobile-order-app" element={<PublicLayout><MobileOrderAppComplete /></PublicLayout>} />
              <Route path="/robot-waiter" element={<PublicLayout><RobotWaiterComplete /></PublicLayout>} />
              <Route path="/delivery-management" element={<PublicLayout><DeliveryManagementComplete /></PublicLayout>} />
              
              {/* Management Tools */}
              <Route path="/web-portal" element={<PublicLayout><WebPortalComplete /></PublicLayout>} />
              <Route path="/mobile-reports" element={<PublicLayout><MobileReportsComplete /></PublicLayout>} />
              <Route path="/stock-management" element={<PublicLayout><StockManagementComplete /></PublicLayout>} />
              <Route path="/centralized-management" element={<PublicLayout><CentralizedManagementComplete /></PublicLayout>} />
              <Route path="/hardware-devices" element={<PublicLayout><HardwareDevices /></PublicLayout>} />
              
              {/* About & Blog */}
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
              <Route path="/blog/post-1" element={<PublicLayout><BlogPost1 /></PublicLayout>} />
              <Route path="/blog/post-2" element={<PublicLayout><BlogPost2 /></PublicLayout>} />
              
              {/* IT Services */}
              <Route path="/it-services" element={<PublicLayout><ITServices /></PublicLayout>} />
              
              {/* Legal Pages */}
              <Route path="/terms-conditions" element={<PublicLayout><TermsConditions /></PublicLayout>} />
              <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
              
              {/* Logo Preview */}
              <Route path="/logo-preview" element={<PublicLayout><LogoPreview /></PublicLayout>} />
            </Routes>
            <Toaster />
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

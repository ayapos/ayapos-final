import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Home, 
  DollarSign, 
  CreditCard, 
  Code, 
  Mail, 
  FileText,
  Bell,
  Loader2,
  Building2,
  MessageSquare,
  Briefcase,
  HelpCircle,
  Settings,
  Users,
  Package
} from 'lucide-react';
import { Button } from '../components/ui/button';

// Import sub-components
import ContentEditor from '../components/admin/ContentEditor';
import PricingManager from '../components/admin/PricingManager';
import CompanyInfo from '../components/admin/CompanyInfo';
import LeadsManager from '../components/admin/LeadsManager';
import ServicesManager from '../components/admin/ServicesManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import PortfolioManager from '../components/admin/PortfolioManager';
import FAQManager from '../components/admin/FAQManager';
import SettingsManager from '../components/admin/SettingsManager';
import ProductsManager from '../components/admin/ProductsManager';
import BlogManager from '../components/admin/BlogManager';
import HeroManager from '../components/admin/HeroManager';
import TeamManager from '../components/admin/TeamManager';
import NavigationManager from '../components/admin/NavigationManager';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboardNew = () => {
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [selectedSection, setSelectedSection] = useState('content');
  const [selectedPage, setSelectedPage] = useState('home');

  const sections = [
    { 
      id: 'content', 
      name: 'Contenu Pages', 
      icon: FileText,
      component: ContentEditor
    },
    { 
      id: 'products', 
      name: 'Produits/Terminaux', 
      icon: DollarSign,
      component: ProductsManager
    },
    { 
      id: 'pricing', 
      name: 'Plans Tarifaires', 
      icon: DollarSign,
      component: PricingManager
    },
    { 
      id: 'hero', 
      name: 'Hero/Carousel', 
      icon: Home,
      component: HeroManager
    },
    { 
      id: 'blog', 
      name: 'Blog', 
      icon: FileText,
      component: BlogManager
    },
    { 
      id: 'company', 
      name: 'Entreprise', 
      icon: Building2,
      component: CompanyInfo
    },
    { 
      id: 'team', 
      name: 'Équipe', 
      icon: Users,
      component: TeamManager
    },
    { 
      id: 'leads', 
      name: 'Leads/Contacts', 
      icon: Users,
      component: LeadsManager
    },
    { 
      id: 'services', 
      name: 'Services', 
      icon: Code,
      component: ServicesManager
    },
    { 
      id: 'testimonials', 
      name: 'Témoignages', 
      icon: MessageSquare,
      component: TestimonialsManager
    },
    { 
      id: 'portfolio', 
      name: 'Portfolio', 
      icon: Briefcase,
      component: PortfolioManager
    },
    { 
      id: 'faq', 
      name: 'FAQ', 
      icon: HelpCircle,
      component: FAQManager
    },
    { 
      id: 'navigation', 
      name: 'Navigation/Footer', 
      icon: Settings,
      component: NavigationManager
    },
    { 
      id: 'settings', 
      name: 'Paramètres', 
      icon: Settings,
      component: SettingsManager
    },
  ];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const ActiveComponent = sections.find(s => s.id === selectedSection)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-black text-[#1e3a8a]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                AyaPos
              </h1>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4">Sections</h2>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        selectedSection === section.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{section.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {ActiveComponent && <ActiveComponent selectedPage={selectedPage} setSelectedPage={setSelectedPage} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardNew;

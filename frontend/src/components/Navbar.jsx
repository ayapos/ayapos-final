import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t('nav.home'), path: '/' },
    { 
      name: t('nav.pos'), 
      path: '/pos',
      hasDropdown: true,
      dropdown: {
        sections: [
          {
            title: 'Restaurant & Café',
            items: [
              { name: 'Système POS Restaurant', path: '/restaurant-pos', icon: 'Store' },
              { name: 'Self-Order Kiosk', path: '/self-order-kiosk', icon: 'Smartphone' },
              { name: 'Système Commande', path: '/order-system', icon: 'Package' },
              { name: 'Terminal Serveur', path: '/waiter-terminal', icon: 'Tablet' },
              { name: 'App Mobile Commande', path: '/mobile-order-app', icon: 'ShoppingBag' },
              { name: 'Serveur Robot', path: '/robot-waiter', icon: 'Bot' },
              { name: 'Gestion Livraison', path: '/delivery-management', icon: 'Truck' }
            ]
          },
          {
            title: 'Outils de Gestion',
            items: [
              { name: 'Portail Web', path: '/web-portal', icon: 'Globe' },
              { name: 'Rapport Mobile', path: '/mobile-reports', icon: 'BarChart3' },
              { name: 'Gestion Stock', path: '/stock-management', icon: 'Package' },
              { name: 'Gestion Centralisée', path: '/centralized-management', icon: 'Building2' },
              { name: 'Matériel Appareils', path: '/hardware-devices', icon: 'Laptop' }
            ]
          }
        ]
      }
    },
    { name: t('nav.digital'), path: '/digital' },
    { name: t('nav.ayapay'), path: '/ayapay' },
    { 
      name: 'Développement IT', 
      path: '/it-services',
      hasDropdown: true,
      dropdown: {
        sections: [
          {
            title: 'Nos Services',
            items: [
              { name: 'Services IT', path: '/it-services', icon: 'Code' },
              { name: 'Portfolio', path: '/it-services#portfolio', icon: 'Briefcase' }
            ]
          }
        ]
      }
    },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'es', name: 'Español' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'ar', name: 'العربية' },
    { code: 'sr', name: 'Српски' },
    { code: 'sq', name: 'Shqip' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-5xl font-black text-[#1e3a8a] tracking-tighter" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              AyaPos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.hasDropdown ? (
                <DropdownMenu 
                  key={item.path} 
                  open={openDropdown === item.path} 
                  onOpenChange={(isOpen) => setOpenDropdown(isOpen ? item.path : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-600 text-gray-700"
                      onMouseEnter={() => setOpenDropdown(item.path)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start" 
                    className="w-[600px] p-6"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="grid grid-cols-2 gap-8">
                      {item.dropdown.sections.map((section, idx) => (
                        <div key={idx}>
                          <h3 className="font-semibold text-gray-900 mb-3 pb-2 border-b">
                            {section.title}
                          </h3>
                          <div className="space-y-2">
                            {section.items.map((subItem, subIdx) => {
                              const Icon = LucideIcons[subItem.icon];
                              return (
                                <Link
                                  key={subIdx}
                                  to={subItem.path}
                                  className="flex items-center space-x-2 px-2 py-2 rounded hover:bg-blue-50 transition-colors group"
                                >
                                  {Icon && <Icon className="h-4 w-4 text-blue-600" />}
                                  <span className="text-sm text-gray-700 group-hover:text-blue-600">
                                    {subItem.name}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location.pathname === item.path
                      ? 'text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className="cursor-pointer"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/admin/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1 rounded text-sm ${
                      i18n.language === lang.code
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

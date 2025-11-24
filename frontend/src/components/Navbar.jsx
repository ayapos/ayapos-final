import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const navigation = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.pos'), path: '/pos' },
    { name: t('nav.digital'), path: '/digital' },
    { name: t('nav.ayapay'), path: '/ayapay' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://customer-assets.emergentagent.com/job_44c9e62f-ed87-400a-b2ba-96fdcf0ee385/artifacts/813w235y_AYAPOS%20Logo.png" 
              alt="AyaPos Logo" 
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
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

            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                {t('nav.demo')}
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
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {t('nav.demo')}
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

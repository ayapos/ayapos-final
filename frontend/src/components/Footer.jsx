import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useCompanyInfo } from '../hooks/useCompanyInfo';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const { companyInfo } = useCompanyInfo();
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/navigation/footer`);
        if (response.data.success && response.data.footer) {
          setFooterData(response.data.footer);
        }
      } catch (error) {
        console.error('Error fetching footer:', error);
      }
    };
    fetchFooter();
  }, []);

  const footerSections = [
    {
      title: t('footer.products'),
      links: [
        { name: 'Premium POS', path: '/restaurant-pos' },
        { name: 'Tablet POS', path: '/restaurant-pos' },
        { name: 'Web POS', path: '/web-portal' },
        { name: 'Mobile POS', path: '/mobile-reports' },
        { name: 'AyaPay', path: '/ayapay' },
      ],
    },
    {
      title: t('nav.digital'),
      links: [
        { name: 'Self Order Kiosk', path: '/self-order-kiosk' },
        { name: 'Digital Menu', path: '/mobile-order-app' },
        { name: 'Mobile App', path: '/mobile-order-app' },
        { name: 'Digital Menuboard', path: '/self-order-kiosk' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { name: t('nav.about'), path: '/about' },
        { name: t('nav.pricing'), path: '/pricing' },
        { name: t('nav.contact'), path: '/contact' },
        { name: 'Blog', path: '/blog' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-white p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">AyaPos</span>
              </div>
            </Link>
            <p className="text-sm mb-4">
              {t('footer.tagline')}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+41 (0) 800 123 456</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@ayapos.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Zurich, Switzerland</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-sm">
                © {currentYear} AyaPos. {t('footer.rights')}.
              </p>
              <div className="flex space-x-4 text-sm">
                <Link to="/terms-conditions" className="hover:text-white transition-colors">
                  Conditions Générales
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Politique de Confidentialité
                </Link>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

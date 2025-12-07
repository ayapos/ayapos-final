import React, { useState, useEffect } from 'react';
import { X, Mail, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { Button } from './ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPopupConfig();
  }, []);

  const loadPopupConfig = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/popup/config`);
      if (response.data.success) {
        const popupConfig = response.data.config;
        setConfig(popupConfig);
        
        // Afficher le popup si enabled et sur la bonne page
        const currentPage = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
        const shouldShow = popupConfig.enabled && popupConfig.show_on_pages.includes('home') && currentPage === 'home';
        
        if (shouldShow) {
          // Vérifier si déjà vu aujourd'hui
          const lastSeen = localStorage.getItem('popup_last_seen');
          const today = new Date().toDateString();
          
          if (lastSeen !== today) {
            setTimeout(() => {
              setIsOpen(true);
              localStorage.setItem('popup_last_seen', today);
            }, 500);
          }
        }
      }
    } catch (error) {
      console.error('Erreur chargement popup:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleContact = () => {
    if (config?.contact_email) {
      window.location.href = `mailto:${config.contact_email}?subject=Demande d'information - Promotion`;
    }
  };

  const handleWhatsApp = () => {
    if (config?.whatsapp_number) {
      const cleanNumber = config.whatsapp_number.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${cleanNumber}?text=Bonjour, je suis intéressé par votre promotion`, '_blank');
    }
  };

  if (loading || !config || !isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton Fermer */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>

          {/* Contenu */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image à gauche */}
            {config.image && (
              <div className="relative h-64 md:h-full min-h-[400px]">
                <img
                  src={config.image}
                  alt={config.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
              </div>
            )}

            {/* Texte à droite */}
            <div className={`p-8 md:p-12 flex flex-col justify-center ${!config.image ? 'md:col-span-2' : ''}`}>
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                    🎉 OFFRE SPÉCIALE
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {config.title}
                </h2>

                {/* Description */}
                <p className="text-xl text-gray-600 leading-relaxed">
                  {config.description}
                </p>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {/* Bouton Email */}
                  <Button
                    onClick={handleContact}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    {config.button_text}
                  </Button>

                  {/* Bouton WhatsApp */}
                  {config.whatsapp_number && (
                    <Button
                      onClick={handleWhatsApp}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      WhatsApp
                    </Button>
                  )}
                </div>

                {/* Petite note */}
                <p className="text-sm text-gray-400 italic">
                  Offre valable dans la limite des stocks disponibles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default PromoPopup;

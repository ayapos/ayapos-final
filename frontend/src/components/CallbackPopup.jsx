import React, { useState, useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CallbackPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/callbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la demande');
      }

      const data = await response.json();
      setIsSuccess(true);
      
      // Close popup after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Callback error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Popup - positioned at right side */}
      <div className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto ${isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'}`}>
        <div className="relative bg-white rounded-l-2xl shadow-2xl max-w-md w-full overflow-hidden"
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {isSuccess ? (
          // Success message
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Merci !
            </h3>
            <p className="text-gray-600">
              Nous vous rappellerons très bientôt.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2 animate-fadeIn">
                Recevez une offre avantageuse
              </h2>
              <p className="text-indigo-100 text-sm animate-fadeIn delay-100">
                Ou laissez votre numéro de téléphone et nous vous appellerons aujourd'hui
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="animate-slideInLeft">
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Nom de l'entreprise"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                  />
                </div>

                <div className="animate-slideInLeft delay-100">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Numéro de téléphone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-shake">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  'APPELEZ-MOI'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Vous trouverez des informations sur le traitement de vos données personnelles dans notre{' '}
                <a href="/privacy" className="text-indigo-600 hover:underline">
                  déclaration de protection des données
                </a>
                .
              </p>
            </form>

            {/* Agent Avatar */}
            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white">
                  EA
                </div>
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out; }
        .animate-slideOutRight { animation: slideOutRight 0.4s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.5s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .delay-100 { animation-delay: 0.1s; }
      `}</style>
      </div>
    </div>
  );
};

export default CallbackPopup;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LogoPreview = () => {
  const logoOptions = [
    {
      id: 1,
      name: "Option 1 : Moderne & Tech",
      description: "Style épuré, innovation technologique",
      style: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontWeight: '700',
        fontSize: '3rem',
        color: '#1e3a8a',
        letterSpacing: '-0.02em'
      },
      impression: "Innovation • Startup Fintech • Moderne"
    },
    {
      id: 2,
      name: "Option 2 : Corporate & Sécurisé",
      description: "Classique, fiabilité et confiance bancaire",
      style: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: '700',
        fontSize: '3rem',
        color: '#1e3a8a',
        letterSpacing: '-0.01em'
      },
      impression: "Fiabilité • Sécurité • Confiance"
    },
    {
      id: 3,
      name: "Option 3 : Premium & Élégant",
      description: "Haut de gamme, géométrique et impactant",
      style: {
        fontFamily: '"Montserrat", "Poppins", sans-serif',
        fontWeight: '800',
        fontSize: '3rem',
        color: '#1e3a8a',
        letterSpacing: '-0.03em'
      },
      impression: "Premium • Haut de gamme • Élégant"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choisissez votre typographie AyaPos
          </h1>
          <p className="text-lg text-gray-600">
            Comparez les 3 options et sélectionnez celle qui représente le mieux votre marque
          </p>
        </div>

        {/* Logo Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {logoOptions.map((option) => (
            <div 
              key={option.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Preview Area */}
              <div className="bg-gradient-to-br from-white to-gray-50 p-12 flex items-center justify-center min-h-[300px] border-b border-gray-100">
                <div style={option.style}>
                  AyaPos
                </div>
              </div>
              
              {/* Description Area */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {option.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {option.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {option.impression.split(' • ').map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Technical Details */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">
                    <span className="font-semibold">Police:</span> {option.style.fontFamily.split(',')[0].replace(/"/g, '')}
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Poids:</span> {option.style.fontWeight === '700' ? 'Bold' : option.style.fontWeight === '800' ? 'Extra Bold' : 'Semi-Bold'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Context Examples */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Aperçu en contexte (Navbar)
          </h2>
          
          {logoOptions.map((option) => (
            <div key={option.id} className="mb-8 last:mb-0">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                {option.name}
              </p>
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div style={{...option.style, fontSize: '2rem'}}>
                  AyaPos
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-700">
                  <span>Home</span>
                  <span>POS Systems</span>
                  <span>AyaPay</span>
                  <span>Contact</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decision Helper */}
        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            💡 Guide de sélection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-blue-900 mb-2">Choisissez l'Option 1 si :</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Vous visez une clientèle tech-savvy</li>
                <li>• Vous voulez paraître moderne et innovant</li>
                <li>• Vous ciblez les startups et PME</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-2">Choisissez l'Option 2 si :</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Vous privilégiez la confiance et sécurité</li>
                <li>• Vous ciblez les grandes entreprises</li>
                <li>• Vous voulez un look intemporel</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-2">Choisissez l'Option 3 si :</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Vous voulez un positionnement premium</li>
                <li>• Vous ciblez le haut de gamme</li>
                <li>• Vous voulez un impact visuel fort</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Une fois votre choix fait, communiquez-moi le numéro de l'option (1, 2 ou 3) et je l'appliquerai immédiatement sur tout le site ! 🚀
          </p>
          <div className="inline-flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-sm text-yellow-800">
            <span>💬</span>
            <span>Répondez simplement : "Option 1", "Option 2" ou "Option 3"</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoPreview;

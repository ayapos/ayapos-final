import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageContent } from '../hooks/usePageContent';
import { usePOSPackages } from '../hooks/usePOSPackages';

const POSSystems = () => {
  const { t } = useTranslation();
  const { getContentValue, loading: contentLoading } = usePageContent('pos-systems');
  const { packages, loading: packagesLoading } = usePOSPackages();

  if (contentLoading || packagesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {getContentValue('hero-title', t('pos.title'))}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getContentValue('hero-subtitle', t('pos.subtitle'))}
          </p>
        </div>
      </section>

      {/* POS Packages Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {displayPackages.map((pkg, index) => {
              // Image URLs pour chaque type de POS (fallback)
              const posImages = {
                'pos-premium': 'https://images.unsplash.com/photo-1693632376342-96ccd26632f1?w=800&h=400&fit=crop',
                'pos-tablet': 'https://images.unsplash.com/photo-1747930117871-df71e977ac0c?w=800&h=400&fit=crop',
                'pos-web': 'https://images.unsplash.com/photo-1718279602896-6df6c34f61e5?w=800&h=400&fit=crop',
                'pos-mobile': 'https://images.unsplash.com/photo-1726065235203-4368c41c6f19?w=800&h=400&fit=crop'
              };

              // Use product image if available, otherwise fallback
              const imageUrl = pkg.image || posImages[pkg.id] || 'https://images.unsplash.com/photo-1718279602896-6df6c34f61e5?w=800';

              return (
              <Card key={pkg.id} className={`relative overflow-hidden ${
                pkg.recommended || pkg.featured
                  ? 'border-blue-600 border-2 shadow-2xl' 
                  : 'border-gray-200 hover:shadow-xl'
              } transition-all`}>
                {(pkg.recommended || pkg.featured) && (
                  <div className="absolute top-0 right-0 z-10">
                    <Badge className="bg-blue-600 text-white rounded-none rounded-bl-lg px-4 py-2">
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                {pkg.discount && (
                  <div className="absolute top-0 left-0 z-10">
                    <Badge className="bg-green-600 text-white rounded-none rounded-br-lg px-4 py-2">
                      -{pkg.discount}%
                    </Badge>
                  </div>
                )}

                {/* Image du POS */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img 
                    src={imageUrl} 
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1718279602896-6df6c34f61e5?w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <CardHeader className="space-y-4 pb-8">
                  <div>
                    <CardTitle className="text-3xl mb-2">{pkg.name}</CardTitle>
                    <CardDescription className="text-base">{pkg.tagline || pkg.description?.substring(0, 100)}</CardDescription>
                  </div>

                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">CHF {pkg.price}</span>
                    <span className="text-gray-600 ml-2 text-lg">/mois</span>
                  </div>

                  <p className="text-gray-600">{pkg.description}</p>

                  <Link to="/contact">
                    <Button 
                      className={`w-full ${
                        pkg.recommended
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                      size="lg"
                    >
                      Commencer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardHeader>

                <CardContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900 mb-4">Fonctionnalités incluses :</p>
                    <div className="space-y-3">
                      {pkg.features && pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">
                            {typeof feature === 'string' ? feature : (feature.text || '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quel système POS vous convient ?
            </h2>
            <p className="text-xl text-gray-600">
              Comparez nos solutions pour trouver celle qui correspond à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: 'Mobile POS',
                icon: '📱',
                best: 'Ventes mobiles',
                features: ['Portable', 'Léger', 'Sans fil']
              },
              {
                title: 'Web POS',
                icon: '💻',
                best: 'Démarrage rapide',
                features: ['Basé sur le cloud', 'Aucune installation', 'Multi-appareil']
              },
              {
                title: 'Tablet POS',
                icon: '⌨️',
                best: 'PME',
                features: ['Compact', 'Économique', 'Facile à utiliser']
              },
              {
                title: 'Premium POS',
                icon: '🚀',
                best: 'Grandes entreprises',
                features: ['Puissant', 'Multi-branches', 'Fonctionnalités avancées']
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {item.best}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Besoin d'aide pour choisir ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contactez notre équipe pour une consultation personnalisée
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Parler à un expert
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default POSSystems;

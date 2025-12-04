import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Smartphone, QrCode, Monitor, ShoppingBag, Check, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageContent } from '../hooks/usePageContent';

const Digital = () => {
  const { t } = useTranslation();
  const { getContentValue, loading } = usePageContent('digital');

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const digitalSolutions = [
    {
      icon: ShoppingBag,
      title: 'Self-Order Kiosk',
      tagline: 'Commande autonome et rapide',
      description: 'Permettez à vos clients de commander et de payer sans attendre. Réduisez les files d\'attente et augmentez vos ventes.',
      image: 'https://images.unsplash.com/photo-1556742400-b5a5f5d92bb4?w=800&q=80',
      features: [
        'Interface tactile intuitive',
        'Paiement intégré',
        'Personnalisation complète',
        'Multilingue',
        'Upselling automatisé',
        'Intégration POS'
      ],
      benefits: [
        'Réduction du temps d\'attente de 60%',
        'Augmentation du panier moyen de 25%',
        'Réduction des erreurs de commande'
      ]
    },
    {
      icon: Monitor,
      title: 'Digital Menuboard',
      tagline: 'Affichage dynamique et moderne',
      description: 'Présentez vos menus, promotions et vidéos sur des écrans digitaux. Changez votre contenu en temps réel depuis n\'importe où.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      features: [
        'Écrans HD haute qualité',
        'Gestion cloud',
        'Templates pré-conçus',
        'Planification de contenu',
        'Animations et vidéos',
        'Synchronisation multi-écrans'
      ],
      benefits: [
        'Augmentation des ventes de 30%',
        'Mise à jour instantanée',
        'Réduction des coûts d\'impression'
      ]
    },
    {
      icon: QrCode,
      title: 'QR Menu Digital',
      tagline: 'Menu sans contact moderne',
      description: 'Un menu digital accessible via QR code. Vos clients scannent et consultent votre menu sur leur smartphone.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      features: [
        'Scan QR code simple',
        'Design responsive',
        'Photos HD des plats',
        'Filtres allergènes',
        'Mise à jour instantanée',
        'Multilingue'
      ],
      benefits: [
        'Solution sans contact',
        'Coût réduit',
        'Écologique et moderne'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      tagline: 'Application mobile sur mesure',
      description: 'Votre propre application de commande et fidélisation. Engagez vos clients et augmentez vos ventes.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      features: [
        'Commande en ligne',
        'Programme de fidélité',
        'Notifications push',
        'Paiement intégré',
        'Suivi de commande',
        'Personnalisation'
      ],
      benefits: [
        'Augmentation de la fidélité',
        'Canal de vente supplémentaire',
        'Données clients précieuses'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-blue-500 text-white border-none mb-6">
              Solutions Digitales Innovantes
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('nav.digital')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Transformez l'expérience de vos clients avec nos solutions digitales de pointe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                  Demander une démo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800 w-full sm:w-auto">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Solutions */}
      {digitalSolutions.map((solution, index) => {
        const Icon = solution.icon;
        const isEven = index % 2 === 0;

        return (
          <section key={index} className={`py-20 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}>
                {/* Image */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}>
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg z-20 hidden lg:block">
                    <Icon className="h-12 w-12" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{solution.tagline}</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {solution.title}
                    </h2>
                    <p className="text-xl text-gray-600">
                      {solution.description}
                    </p>
                  </div>

                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>Fonctionnalités principales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {solution.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Bénéfices clés :</h3>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      En savoir plus
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à moderniser votre entreprise ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Découvrez comment nos solutions digitales peuvent transformer votre activité
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Demander une démonstration
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Digital;

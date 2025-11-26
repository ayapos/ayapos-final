import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CreditCard, Shield, Wifi, Smartphone, Check, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ayapayTerminals } from '../data/mockData';

const AyaPay = () => {
  const { t } = useTranslation();

  const paymentFeatures = [
    {
      icon: CreditCard,
      title: 'Acceptation universelle',
      description: 'Visa, Mastercard, American Express, Maestro et plus'
    },
    {
      icon: Zap,
      title: 'Paiements instantanés',
      description: 'Transactions ultra-rapides en moins de 2 secondes'
    },
    {
      icon: Wifi,
      title: 'Connexion flexible',
      description: 'WiFi, 4G, Ethernet - restez toujours connecté'
    },
    {
      icon: Shield,
      title: 'Sécurité maximale',
      description: 'Certifié PCI-DSS avec chiffrement de bout en bout'
    },
    {
      icon: Smartphone,
      title: 'Reçus digitaux',
      description: 'Envoi automatique par email ou SMS'
    },
    {
      icon: Check,
      title: 'Intégration complète',
      description: 'Compatible avec tous nos systèmes POS'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-500 text-white border-none">
                Solutions de paiement professionnelles
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('ayapay.title')}
              </h1>
              <p className="text-xl text-blue-100">
                {t('ayapay.hero_text')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                    Demander un devis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#ayapay-pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800 w-full sm:w-auto">
                    Voir les tarifs
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80"
                alt="Payment Terminal"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir AyaPay ?
            </h2>
            <p className="text-xl text-gray-600">
              Des terminaux de paiement conçus pour votre réussite
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paymentFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-blue-600 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Terminals Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('ayapay.terminals_title')}
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez le terminal adapté à votre activité
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ayapayTerminals.map((terminal) => (
              <Card key={terminal.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                  <img
                    src={terminal.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80'}
                    alt={terminal.name}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80';
                    }}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{terminal.name}</CardTitle>
                      <CardDescription className="text-base">{terminal.tagline}</CardDescription>
                    </div>
                    <Badge className="bg-blue-600 text-white">
                      Populaire
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">{terminal.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <p className="font-semibold text-gray-900">Caractéristiques :</p>
                    {terminal.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      En savoir plus
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="ayapay-pricing" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tarifs transparents
            </h2>
            <p className="text-xl text-gray-600">
              Aucun frais caché, aucun engagement long terme
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '29',
                description: 'Pour les petites entreprises',
                features: [
                  'Terminal SmartPOS A77',
                  'Frais de transaction 1.5%',
                  'Support email',
                  'Reçus digitaux',
                  'Rapports mensuels'
                ]
              },
              {
                name: 'Business',
                price: '79',
                description: 'Pour les entreprises en croissance',
                features: [
                  'Terminal SmartPOS A920',
                  'Frais de transaction 1.2%',
                  'Support prioritaire',
                  'Reçus digitaux et imprimés',
                  'Rapports en temps réel',
                  'Intégration POS complète'
                ],
                recommended: true
              },
              {
                name: 'Enterprise',
                price: 'Sur mesure',
                description: 'Pour les grandes entreprises',
                features: [
                  'Tous les terminaux',
                  'Frais négociables',
                  'Support dédié 24/7',
                  'Fonctionnalités avancées',
                  'Intégration personnalisée',
                  'Formation sur site'
                ]
              }
            ].map((tier, index) => (
              <Card key={index} className={`relative ${
                tier.recommended ? 'border-blue-600 border-2 shadow-xl' : 'border-gray-200'
              }`}>
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">
                      Recommandé
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    {tier.price === 'Sur mesure' ? (
                      <div className="text-3xl font-bold text-gray-900">{tier.price}</div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">€{tier.price}</span>
                        <span className="text-gray-600 ml-2">/mois</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button className={`w-full ${
                      tier.recommended
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}>
                      Commencer
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à accepter tous les paiements ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Obtenez votre terminal de paiement en 48h
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Demander votre terminal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AyaPay;

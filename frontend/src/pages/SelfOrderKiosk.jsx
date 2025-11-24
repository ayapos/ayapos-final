import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Smartphone, Zap, Users, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const SelfOrderKiosk = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Smartphone,
      title: 'Interface Intuitive',
      description: 'Écran tactile facile à utiliser pour tous les âges'
    },
    {
      icon: Zap,
      title: 'Service Rapide',
      description: 'Réduisez les files d\'attente de 60%'
    },
    {
      icon: Users,
      title: 'Expérience Client',
      description: 'Commande autonome sans stress'
    },
    {
      icon: TrendingUp,
      title: 'Augmentation Ventes',
      description: 'Panier moyen +25% avec upselling intelligent'
    }
  ];

  const benefits = [
    'Réduction du temps d\'attente',
    'Moins d\'erreurs de commande',
    'Personnel libéré pour le service',
    'Disponible 24/7',
    'Multilingue',
    'Paiement intégré',
    'Personnalisation complète',
    'Analytics en temps réel'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-500 text-white border-none">
                Solution Self-Service
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Self-Order Kiosk
              </h1>
              <p className="text-xl text-blue-100">
                Borne de commande interactive pour moderniser votre service et augmenter vos ventes
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Demander une démo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1556742400-b5a5f5d92bb4?w=800&q=80"
                alt="Self-Order Kiosk"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités clés
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-blue-600 transition-all">
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

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pourquoi choisir nos bornes Self-Order?
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1556741533-f6acd646dcec?w=800&q=80"
                alt="Kiosk Benefits"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à moderniser votre service?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contactez-nous pour une démonstration personnalisée
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Demander une démo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SelfOrderKiosk;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Zap, Wifi, Users, CheckCircle, Bell, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageContent } from '../hooks/usePageContent';

const WaiterTerminalComplete = () => {
  const { content, loading } = usePageContent('waiter-terminal');

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const iconMap = {
    'Smartphone': Smartphone,
    'Zap': Zap,
    'Wifi': Wifi,
    'Users': Users,
    'CheckCircle': CheckCircle,
    'Bell': Bell,
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-500 text-white border-none">
                {content?.hero?.subtitle || 'Terminal Serveur Mobile'}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {content?.hero?.title || 'Terminal Serveur Mobile'}
              </h1>
              <p className="text-xl text-blue-100">
                {content?.hero?.description || 'Terminal mobile professionnel pour la prise de commande rapide'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    {content?.hero?.cta_primary || 'Demander une démo'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/waiter-terminal-pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                    {content?.hero?.cta_secondary || 'Voir les tarifs'}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={content?.hero?.image || 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80'}
                alt="Terminal Serveur"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {content?.benefits && content.benefits.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {content.benefits.map((benefit, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <img
                      src={benefit.image || 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80'}
                      alt={benefit.title}
                      className="rounded-2xl shadow-xl w-full h-96 object-contain bg-gray-100"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80';
                      }}
                    />
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {benefit.title}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {content?.features && content.features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fonctionnalités Principales
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || Smartphone;
                return (
                  <Card key={index} className="border-2 hover:border-blue-500 hover:shadow-lg transition-all">
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
      )}

      {/* Pricing Section */}
      {content?.pricing && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-blue-500">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Tarification Simple</CardTitle>
                <CardDescription className="text-lg">{content.pricing.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-blue-600">{content.pricing.monthly}</span>
                  <span className="text-gray-600">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {content.pricing.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Commencer maintenant
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à optimiser votre service ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des centaines de restaurants qui font confiance à notre terminal serveur
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Demander une démo gratuite
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/waiter-terminal-pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Voir les tarifs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaiterTerminalComplete;

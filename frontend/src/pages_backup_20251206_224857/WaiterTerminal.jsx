import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tablet, Wifi, Battery, Zap, Smartphone, Check, Users, Clock, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageContent } from '../hooks/usePageContent';

const WaiterTerminal = () => {
  const { content, loading } = usePageContent('waiter-terminal');
  
  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }
  
  const pageContent = content || {};
  const features = pageContent.features || [];
  const benefits = pageContent.benefits || [];
  
  // Icônes par défaut si pas de features
  const defaultFeatures = [
    { icon: 'Tablet', title: 'Interface tactile', description: 'Facile et rapide à utiliser' },
    { icon: 'Wifi', title: 'Connexion WiFi', description: 'Synchronisation en temps réel' },
    { icon: 'Battery', title: 'Autonomie longue', description: 'Batterie toute la journée' },
    { icon: 'Zap', title: 'Prise de commande rapide', description: 'Service plus efficace' }
  ];
  
  const displayFeatures = features.length > 0 ? features : defaultFeatures;
  
  const iconMap = { 
    Tablet, Wifi, Battery, Zap, Smartphone, Check, Users, Clock,
    ArrowRight 
  };
  
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-blue-500 text-white border-none mb-6">
            Solution Mobile
          </Badge>
          <h1 className="text-5xl font-bold mb-6">
            {pageContent.hero_title || 'Terminal Serveur'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {pageContent.hero_subtitle || 'Tablette mobile pour serveurs - Prenez les commandes directement à table'}
          </p>
          {pageContent.hero_image && (
            <div className="max-w-4xl mx-auto mt-8">
              <img 
                src={pageContent.hero_image} 
                alt="Terminal Serveur"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          )}
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 mt-8">
              Demander une démo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayFeatures.map((feature, idx) => {
              const Icon = iconMap[feature.icon] || Tablet;
              return (
                <Card key={idx}>
                  <CardHeader>
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Benefits Section with Images */}
      {benefits.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="overflow-hidden">
                  {benefit.image && (
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {pageContent.cta_title || 'MODERNISEZ VOTRE SERVICE EN SALLE'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {pageContent.cta_subtitle || 'Essai gratuit 30 jours - Sans engagement'}
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Contactez-nous
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WaiterTerminal;

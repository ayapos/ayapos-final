import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, QrCode, Monitor, ShoppingBag, Check, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageContent } from '../hooks/usePageContent';

const Digital = () => {
  const { content, loading } = usePageContent('digital');

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const iconMap = {
    'ShoppingBag': ShoppingBag,
    'Monitor': Monitor,
    'QrCode': QrCode,
    'Smartphone': Smartphone,
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {content?.hero?.subtitle || 'Solutions Digitales Innovantes'}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            {content?.hero?.title || 'Solutions Digitales'}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {content?.hero?.description || 'Transformez l\'expérience de vos clients avec nos solutions digitales de pointe'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              {content?.hero?.cta_primary || 'Demander une démo'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {content?.hero?.cta_secondary || 'Voir les tarifs'}
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Solutions Digitales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos solutions innovantes pour digitaliser votre restaurant
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content?.solutions?.map((solution, index) => {
              const IconComponent = iconMap[solution.icon] || ShoppingBag;
              
              return (
                <Card key={index} className="border-2 hover:border-blue-500 transition-all hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{solution.title}</CardTitle>
                        <CardDescription className="text-base font-semibold text-blue-600">
                          {solution.tagline}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Image */}
                    {solution.image && (
                      <div className="rounded-xl overflow-hidden">
                        <img 
                          src={solution.image} 
                          alt={solution.title}
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Features */}
                    {solution.features && solution.features.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Fonctionnalités principales :</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {solution.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits */}
                    {solution.benefits && solution.benefits.length > 0 && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h4 className="font-bold text-green-900 mb-2">Bénéfices :</h4>
                        <ul className="space-y-1">
                          {solution.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">✓</span>
                              <span className="text-sm text-green-800">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {content?.cta?.title || 'Prêt à digitaliser votre restaurant ?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {content?.cta?.subtitle || 'Rejoignez des centaines de restaurants qui ont fait le choix du digital'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              {content?.cta?.button_text || 'Demander une démo gratuite'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {content?.cta?.button_secondary || 'Voir les tarifs'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Digital;

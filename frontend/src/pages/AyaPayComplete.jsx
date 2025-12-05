import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Shield, Wifi, Smartphone, Check, ArrowRight, Zap, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageContent } from '../hooks/usePageContent';

const AyaPay = () => {
  const { content, loading } = usePageContent('ayapay');

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const iconMap = {
    'CreditCard': CreditCard,
    'Shield': Shield,
    'Wifi': Wifi,
    'Smartphone': Smartphone,
    'Check': Check,
    'Zap': Zap,
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-500 text-white border-none">
                {content?.hero?.subtitle || 'Solutions de paiement professionnelles'}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {content?.hero?.title || 'AyaPay - Solutions de paiement professionnelles'}
              </h1>
              <p className="text-xl text-blue-100">
                {content?.hero?.description || 'Des terminaux de paiement nouvelle génération pour votre entreprise'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                    {content?.hero?.cta_primary || 'Demander un devis'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#ayapay-pricing">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800 w-full sm:w-auto">
                    {content?.hero?.cta_secondary || 'Voir les tarifs'}
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={content?.hero?.image || 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80'}
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
            {content?.features?.map((feature, index) => {
              const Icon = iconMap[feature.icon] || CreditCard;
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
              Nos Terminaux de Paiement
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez le terminal adapté à votre activité
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content?.terminals?.map((terminal) => (
              <Card key={terminal.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                  <img
                    src={terminal.image || 'https://images.unsplash.com/photo-1728044849280-10a1a75cff83?w=400&q=80'}
                    alt={terminal.name}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1728044849280-10a1a75cff83?w=400&q=80';
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
                    {terminal.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{typeof feature === 'string' ? feature : (feature.text || '')}</span>
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
            {content?.pricing_plans?.map((tier, index) => (
              <Card key={index} className={`relative ${
                tier.highlight ? 'border-blue-600 border-2 shadow-xl' : 'border-gray-200'
              }`}>
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">
                      {tier.badge || 'Recommandé'}
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    {tier.price === 'Sur mesure' || tier.currency === '' ? (
                      <div className="text-3xl font-bold text-gray-900">{tier.price}</div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">{tier.currency}{tier.price}</span>
                        <span className="text-gray-600 ml-2">/{tier.period}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {tier.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{typeof feature === 'string' ? feature : (feature.text || '')}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button className={`w-full ${
                      tier.highlight
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

      {/* FAQ Section */}
      {content?.faq && content.faq.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
            </div>
            <div className="space-y-6">
              {content.faq.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {content?.cta?.title || 'Prêt à moderniser vos paiements ?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {content?.cta?.subtitle || 'Rejoignez plus de 5000 commerces qui nous font confiance'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                {content?.cta?.button_text || 'Demander un devis gratuit'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {content?.cta?.button_secondary || 'Voir une démo'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AyaPay;

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Smartphone, Zap, Users, Clock, 
  DollarSign, TrendingUp, Star, ShoppingBag, Loader2, Menu as MenuIcon
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageContent } from '../hooks/usePageContent';

const SelfOrderKioskComplete = () => {
  const { content, loading } = usePageContent('self-order-kiosk');

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

  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* Hero Section - DESIGN CENTRÉ AVEC VIDEO/ANIMATION STYLE */}
      <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Badge centré */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full">
              <Zap className="h-5 w-5 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-blue-100 font-semibold">Augmentez vos ventes de 40%</span>
            </div>
          </div>

          {/* Title centré et grand */}
          <div className="text-center max-w-5xl mx-auto mb-12">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-6 leading-tight">
              {pageContent.hero_title || 'Self-Order Kiosk'}
            </h1>
            <p className="text-2xl lg:text-3xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              {pageContent.hero_subtitle || 'Laissez vos clients commander en toute autonomie'}
            </p>
          </div>

          {/* Image/Mockup centrée avec effet 3D */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="relative z-10">
              {/* Glow effect derrière */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
              
              {/* Image principale */}
              <img
                src={pageContent.hero_image || "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=1200&q=80"}
                alt="Self-Order Kiosk"
                className="relative rounded-3xl shadow-2xl border-8 border-white/10 backdrop-blur"
              />

              {/* Features flottantes autour de l'image */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-2xl shadow-2xl p-6 animate-float hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-500 rounded-full p-3">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">-70%</div>
                    <div className="text-sm text-gray-600">Temps d'attente</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-1/3 bg-white rounded-2xl shadow-2xl p-6 animate-float delay-300 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 rounded-full p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+40%</div>
                    <div className="text-sm text-gray-600">Panier moyen</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/4 bg-white rounded-2xl shadow-2xl p-6 animate-float delay-500 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 rounded-full p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">300+</div>
                    <div className="text-sm text-gray-600">Commandes/jour</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA centré */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-7 text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group">
                Obtenir une démo
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#pricing">
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white/10 font-bold px-10 py-7 text-xl backdrop-blur-sm">
                Voir les prix
              </Button>
            </a>
          </div>

          {/* Mini stats bar */}
          <div className="flex flex-wrap justify-center gap-12 mt-16 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">700+</div>
              <div className="text-blue-200">Kiosques installés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">2M+</div>
              <div className="text-blue-200">Commandes/mois</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-200">Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid - Section moderne avec icônes */}
      {features.length > 0 && (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Pourquoi choisir nos kiosques ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une solution complète pour moderniser votre service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const iconMap = { 
                Smartphone, Zap, Users, Clock, DollarSign, MenuIcon, 
                ShoppingBag, TrendingUp, Star, Check 
              };
              const Icon = iconMap[feature.icon] || Smartphone;
              
              return (
                <Card key={index} className="border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Benefits avec images alternées */}
      {benefits.length > 0 && (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {benefits.map((benefit, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-16 items-center mb-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="bg-blue-100 text-blue-600 font-bold text-sm px-4 py-2 rounded-full inline-block mb-4">
                  Avantage #{index + 1}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  {benefit.title}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {benefit.description}
                </p>
                <a href="#contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                    En savoir plus
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-extrabold text-white mb-6">
            Prêt à transformer votre service ?
          </h2>
          <p className="text-2xl text-blue-100 mb-12">
            Rejoignez les 700+ restaurants qui ont fait le choix de l'innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-12 py-7 text-xl shadow-2xl">
                Demander un devis gratuit
              </Button>
            </a>
            <a href="tel:+41XXXXXXXX">
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white/10 font-bold px-12 py-7 text-xl backdrop-blur-sm">
                Appeler maintenant
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelfOrderKioskComplete;

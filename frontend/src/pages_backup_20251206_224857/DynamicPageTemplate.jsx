import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Loader2, Check, Star, Zap, Cloud, 
  Smartphone, Shield, Package, Users, TrendingUp,
  CreditCard, Globe, Monitor, Settings, BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePageContent } from '../hooks/usePageContent';

/**
 * Template universel pour toutes les pages du site
 * Charge le contenu depuis la base de données via usePageContent
 */
const DynamicPage = ({ pageSlug }) => {
  const { content, loading } = usePageContent(pageSlug);
  
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
  
  // Map des icônes disponibles
  const iconMap = { 
    ArrowRight, Check, Star, Zap, Cloud, Smartphone, Shield, 
    Package, Users, TrendingUp, CreditCard, Globe, Monitor,
    Settings, BarChart3
  };
  
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {pageContent.hero_title || 'Titre de la page'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {pageContent.hero_subtitle || 'Description de la page'}
          </p>
          {pageContent.hero_image && (
            <div className="max-w-4xl mx-auto mt-8">
              <img 
                src={pageContent.hero_image} 
                alt={pageContent.hero_title}
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          )}
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 mt-8">
              En savoir plus <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fonctionnalités
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => {
                const Icon = iconMap[feature.icon] || Star;
                return (
                  <Card key={idx}>
                    <CardHeader>
                      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* Benefits Section with Images */}
      {benefits.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
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
      
      {/* Sections personnalisées */}
      {Object.entries(pageContent.sections || {}).map(([sectionKey, sectionData]) => (
        <section key={sectionKey} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {sectionData.title}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectionData.items?.map((item, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    {item.icon && (
                      <div className="text-4xl mb-4">{item.icon}</div>
                    )}
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {pageContent.cta_title || 'Prêt à commencer ?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {pageContent.cta_subtitle || 'Contactez-nous pour en savoir plus'}
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

export default DynamicPage;

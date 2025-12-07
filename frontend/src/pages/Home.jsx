import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { features, testimonials, posPackages } from '../data/mockData';
import HeroCarousel from '../components/HeroCarousel';
import PromoPopup from '../components/PromoPopup';
import { useHeroSlides } from '../hooks/useHeroSlides';
import { usePageContent } from '../hooks/usePageContent';
import { useProducts } from '../hooks/useProducts';
import { useTestimonials } from '../hooks/useTestimonials';

const Home = () => {
  const { t } = useTranslation();
  const { slides: heroSlidesFromDB, loading: slidesLoading } = useHeroSlides();
  const { getContentValue, loading: contentLoading } = usePageContent('home');
  const { products, loading: productsLoading } = useProducts();
  const { testimonials: testimonialsFromDB, loading: testimonialsLoading } = useTestimonials();

  // Use slides from database if available, otherwise fallback to default
  const heroSlides = heroSlidesFromDB && heroSlidesFromDB.length > 0 
    ? heroSlidesFromDB.map(slide => ({ image: slide.image, alt: slide.title }))
    : [
        {
          image: 'https://images.unsplash.com/photo-1693632376342-96ccd26632f1?w=800&q=80',
          alt: 'POS System 1'
        },
        {
          image: 'https://images.unsplash.com/photo-1728044849321?w=800&q=80',
          alt: 'POS System 2'
        },
        {
          image: 'https://images.unsplash.com/photo-1629248242732-592ecc9cc00f?w=800&q=80',
          alt: 'POS System 3'
        },
        {
          image: 'https://images.unsplash.com/photo-1609951734391?w=800&q=80',
          alt: 'Payment Terminal'
        }
      ];
  
  // Use testimonials from database if available
  const displayTestimonials = testimonialsFromDB && testimonialsFromDB.length > 0 
    ? testimonialsFromDB.slice(0, 3)
    : testimonials;

  if (slidesLoading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
                  Nouvelle Génération
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                {getContentValue('hero-title', t('hero.title'))}
              </h1>
              <p className="text-xl text-gray-600">
                {getContentValue('hero-subtitle', t('hero.subtitle'))}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    {t('hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    {t('hero.cta_secondary')}
                  </Button>
                </Link>
              </div>
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Conforme PCI-DSS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">Support 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700">3000+ Clients</span>
                </div>
              </div>
            </div>

            {/* Right - Carousel */}
            <div className="relative h-[700px]">
              <HeroCarousel slides={heroSlides} />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-20">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <LucideIcons.TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ventes mensuelles</p>
                    <p className="text-lg font-bold text-gray-900">+45%</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <LucideIcons.Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clients satisfaits</p>
                    <p className="text-lg font-bold text-gray-900">3000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des outils puissants pour gérer votre entreprise efficacement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = LucideIcons[feature.icon];
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

      {/* POS Packages Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Solutions POS pour chaque entreprise
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des forfaits adaptés à toutes les tailles d'entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posPackages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${
                pkg.recommended ? 'border-blue-600 border-2 shadow-xl' : 'border-gray-200'
              }`}>
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Recommandé
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.tagline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">CHF {pkg.price}</span>
                      <span className="text-gray-600 ml-2">/mois</span>
                    </div>
                  </div>
                  <Link to="/contact">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Nous contacter
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Voir tous les tarifs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600">
              Plus de 3000 entreprises nous font confiance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <LucideIcons.Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.business} - {testimonial.city}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 italic">"{testimonial.text}"</p>
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
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d'entreprises qui ont choisi AyaPos
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
      </section>
    </div>
  );
};

export default Home;

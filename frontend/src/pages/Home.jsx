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

  // Filtrer les packages POS depuis les produits
  const posPackagesFromDB = products.filter(p => p.category === 'package').slice(0, 4);
  const displayPackages = posPackagesFromDB.length > 0 ? posPackagesFromDB : posPackages;

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
      {/* Promotional Popup */}
      <PromoPopup />
      
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

      {/* Stats Section - Nos Réussites */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Nos Résultats
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Des chiffres qui parlent
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Plus de 800 entreprises suisses nous font confiance pour digitaliser leurs opérations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-10"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6 shadow-lg">
                  <LucideIcons.Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-3">
                  800+
                </div>
                <p className="text-sm md:text-base text-gray-600 font-medium">Clients satisfaits</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-10"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-6 shadow-lg">
                  <LucideIcons.TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-3">
                  +45%
                </div>
                <p className="text-sm md:text-base text-gray-600 font-medium">Croissance moyenne des ventes</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-10"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6 shadow-lg">
                  <LucideIcons.CreditCard className="h-8 w-8 text-white" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-3">
                  5M+
                </div>
                <p className="text-gray-600 font-medium">Transactions mensuelles</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-10"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mb-6 shadow-lg">
                  <LucideIcons.Zap className="h-8 w-8 text-white" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-3">
                  48h
                </div>
                <p className="text-gray-600 font-medium">Temps d'installation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AyaPos */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Nos Avantages
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi choisir AyaPos ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une solution tout-en-un pensée pour les entreprises suisses exigeantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sécurité maximale</h3>
                <p className="text-gray-600 leading-relaxed">
                  Certifié PCI-DSS niveau 1. Vos données et celles de vos clients sont protégées par les plus hauts standards de sécurité internationale.
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold">
                  <span className="text-sm">En savoir plus</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Installation express</h3>
                <p className="text-gray-600 leading-relaxed">
                  Opérationnel en <span className="font-bold text-green-600">48 heures</span>. Formation complète incluse. Notre équipe gère tout de A à Z pour un démarrage sans friction.
                </p>
                <div className="mt-4 flex items-center text-green-600 font-semibold">
                  <span className="text-sm">Réserver ma démo</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.HeadphonesIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Support 24/7</h3>
                <p className="text-gray-600 leading-relaxed">
                  Équipe technique disponible en permanence. Assistance en français, allemand et anglais. Temps de réponse moyen : 2 minutes.
                </p>
                <div className="mt-4 flex items-center text-purple-600 font-semibold">
                  <span className="text-sm">Contacter le support</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Application mobile</h3>
                <p className="text-gray-600 leading-relaxed">
                  Gérez tout depuis votre smartphone. Dashboard temps réel, notifications instantanées, contrôle total où que vous soyez.
                </p>
                <div className="mt-4 flex items-center text-orange-600 font-semibold">
                  <span className="text-sm">Télécharger l'app</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics avancés</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tableaux de bord personnalisables, prévisions IA, rapports automatisés. Prenez des décisions basées sur des données réelles.
                </p>
                <div className="mt-4 flex items-center text-red-600 font-semibold">
                  <span className="text-sm">Voir les fonctionnalités</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.Plug className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Écosystème complet</h3>
                <p className="text-gray-600 leading-relaxed">
                  Intégrations natives avec Twint, PostFinance, Bexio, WooCommerce et 50+ outils business. API ouverte pour vos besoins spécifiques.
                </p>
                <div className="mt-4 flex items-center text-cyan-600 font-semibold">
                  <span className="text-sm">Voir les intégrations</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Simple & Rapide
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Opérationnel en 48 heures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus éprouvé qui transforme votre entreprise en moins de 2 jours
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 z-0" style={{width: '85%', margin: '0 auto'}}></div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl">
                        <span className="text-3xl font-bold text-white">1</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                      <LucideIcons.MessageSquare className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Consultation gratuite</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Échange de 30 min avec nos experts pour identifier vos besoins précis et vous recommander la solution optimale.
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm">
                      <LucideIcons.Clock className="h-4 w-4 mr-2" />
                      <span>30 minutes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl">
                        <span className="text-3xl font-bold text-white">2</span>
                      </div>
                    </div>
                    <div className="bg-purple-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                      <LucideIcons.Rocket className="h-10 w-10 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Installation & Formation</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Nos techniciens installent votre système complet et forment votre équipe. Tout est prêt en une demi-journée.
                    </p>
                    <div className="flex items-center text-purple-600 font-semibold text-sm">
                      <LucideIcons.Clock className="h-4 w-4 mr-2" />
                      <span>4 heures</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-green-300 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-green-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl">
                        <span className="text-3xl font-bold text-white">3</span>
                      </div>
                    </div>
                    <div className="bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                      <LucideIcons.CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Go Live & Support</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Vous êtes opérationnel! Notre équipe reste disponible 24/7 pour vous accompagner et optimiser vos performances.
                    </p>
                    <div className="flex items-center text-green-600 font-semibold text-sm">
                      <LucideIcons.Infinity className="h-4 w-4 mr-2" />
                      <span>Support illimité</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all">
                Démarrer maintenant - C'est gratuit
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">Installation en 48h • Sans engagement • Support inclus</p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              Solutions Métiers
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Adapté à votre secteur d'activité
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des fonctionnalités spécifiques pour chaque industrie, pensées par des experts terrain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-80 flex flex-col items-center justify-center p-8 text-white">
                <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.UtensilsCrossed className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Restaurants & Cafés</h3>
                <p className="text-center text-white/90 text-sm leading-relaxed mb-6">
                  Gestion des tables, commandes cuisine en temps réel, et paiements ultra-rapides pour un service impeccable.
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>En savoir plus</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-80 flex flex-col items-center justify-center p-8 text-white">
                <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.ShoppingBag className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Commerce de détail</h3>
                <p className="text-center text-white/90 text-sm leading-relaxed mb-6">
                  Gestion des stocks intelligente, codes-barres, et programmes de fidélité pour maximiser vos revenus.
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>En savoir plus</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-80 flex flex-col items-center justify-center p-8 text-white">
                <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.Scissors className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Salons & Spas</h3>
                <p className="text-center text-white/90 text-sm leading-relaxed mb-6">
                  Réservations en ligne, gestion du planning équipe, et fidélisation automatique de vos clients.
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>En savoir plus</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-80 flex flex-col items-center justify-center p-8 text-white">
                <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LucideIcons.Briefcase className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Services professionnels</h3>
                <p className="text-center text-white/90 text-sm leading-relaxed mb-6">
                  Facturation automatisée, suivi des prestations, et paiements récurrents pour vos services.
                </p>
                <div className="flex items-center text-sm font-semibold">
                  <span>En savoir plus</span>
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 text-lg font-semibold transition-all">
                Découvrir toutes les solutions
                <ArrowRight className="ml-2 h-6 w-6" />
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, Check, Cloud, Store, Smartphone, Wifi, 
  Package, Users, BarChart3, Globe, Settings, Lock,
  CreditCard, Printer, Shield, Zap, TrendingUp, Star, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';
import { usePageContent } from '../hooks/usePageContent';
import { useProducts } from '../hooks/useProducts';
import { useFAQ } from '../hooks/useFAQ';
import { useTestimonials } from '../hooks/useTestimonials';

const RestaurantPOS = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { content, loading: contentLoading } = usePageContent('restaurant-pos');
  const { products, loading: productsLoading } = useProducts();
  const { faqs, loading: faqsLoading } = useFAQ('restaurant-pos');
  const { testimonials, loading: testimonialsLoading } = useTestimonials();
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    phone: '',
    email: '',
    city: ''
  });
  
  const restaurantProducts = products.filter(p => 
    p.category === 'POS' || p.name.toLowerCase().includes('restaurant')
  );

  const loading = contentLoading || productsLoading || faqsLoading || testimonialsLoading;

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }
  
  // Utiliser le contenu de la base de données ou fallback sur les valeurs par défaut
  const pageContent = content || {};
  const features = pageContent.features || [];
  const benefits = pageContent.benefits || [];
  const tableManagement = pageContent.sections?.table_management?.items || [];
  const onlineOrders = pageContent.sections?.online_orders?.items || [];
  const reports = pageContent.sections?.reports?.items || [];
  const pricingPlans = restaurantProducts.filter(p => p.category === 'POS') || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée!",
      description: "Nous vous contacterons sous peu.",
    });
  };

  const features = [
    {
      icon: Cloud,
      title: 'Système POS Cloud',
      description: 'Application POS basée sur le cloud pour les appareils Android. Téléchargez-la sur une tablette et essayez immédiatement.'
    },
    {
      icon: Store,
      title: 'Pour Toutes les Entreprises',
      description: 'Restaurants, cafés, pâtisseries, cafés, hôtels, commerces de détail et toutes les chaînes d\'entreprises.'
    },
    {
      icon: Smartphone,
      title: 'Rapports Mobile et En Ligne',
      description: 'Accédez instantanément à toutes vos informations depuis un ordinateur, une tablette ou un smartphone.'
    },
    {
      icon: Wifi,
      title: 'Fonctionnement Hors Ligne',
      description: 'Avec la fonction hors ligne, votre système POS continue de fonctionner sans interruption même si Internet est coupé.'
    },
    {
      icon: Package,
      title: 'Suivi des Stocks',
      description: 'Suivez instantanément les stocks alimentaires et boissons ainsi que les stocks de matières premières liés aux recettes.'
    },
    {
      icon: Users,
      title: 'Comptes Clients',
      description: 'Créez des comptes clients, fournisseurs, cartes de membre, personnel et créances, suivez les dettes.'
    },
    {
      icon: BarChart3,
      title: 'Commande en Ligne',
      description: 'Suivez vos commandes en ligne grâce aux intégrations avec les plateformes de livraison.'
    },
    {
      icon: Globe,
      title: 'Intégrations',
      description: 'Fonctionne avec caller ID, lecteurs de codes-barres, balances, imprimantes SLIP, et systèmes de e-facture.'
    }
  ];

  const benefits = [
    {
      title: 'Commencez Immédiatement à Vendre',
      description: 'Avec l\'interface visuelle conviviale du système POS AyaPos, définissez vos produits en quelques minutes et commencez à prendre des commandes.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'
    },
    {
      title: 'Système Cloud et Fonctionnement Hors Ligne',
      description: 'Le système POS restaurant est un programme basé sur le cloud nouvelle génération. Il offre également un puissant support de fonctionnement hors ligne.',
      image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80'
    },
    {
      title: 'Système POS Compétent et Avancé',
      description: 'Le système POS restaurant dispose de nombreuses fonctionnalités telles que la vente par code-barres, les commandes de table, les commandes à emporter.',
      image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80'
    }
  ];

  const tableManagement = [
    {
      title: 'Déplacer ou Fusionner les Tables',
      description: 'Avec le système POS restaurant, déplacez les additions en bloc ou par articles, et fusionnez-les sur la table.',
      icon: '🔄'
    },
    {
      title: 'Diviser, Annuler ou Rembourser les Commandes',
      description: 'Sélectionnez les produits et offrez, annulez ou remboursez facilement. Divisez les additions en un seul clic.',
      icon: '✂️'
    },
    {
      title: 'Intégration EFT-POS, Facture, e-Facture',
      description: 'Grâce aux intégrations financières du système, prenez le paiement des appareils EFT-POS et imprimez les reçus fiscaux.',
      icon: '💳'
    }
  ];

  const onlineOrders = [
    {
      title: 'Gérer les Commandes en Ligne et à Emporter',
      description: 'Prenez des commandes à emporter des clients qui appellent par téléphone et des applications de commande en ligne.',
      icon: '📦'
    },
    {
      title: 'Informer Vos Clients',
      description: 'Gérez vos commandes en ligne et à emporter sur un seul écran, minimisez les erreurs et suivez facilement les détails et statuts des commandes.',
      icon: '📱'
    },
    {
      title: 'Obtenez l\'Application Livreur',
      description: 'Gérez plus efficacement vos commandes en ligne en utilisant le système POS et l\'application livreur ensemble.',
      icon: '🚗'
    }
  ];

  const reports = [
    {
      title: 'Analysez et Rapportez Vos Ventes',
      description: 'Accédez à tous les rapports de fin de journée, caisse, ventes de produits, additions, encaissements à tout moment.',
      icon: '📊'
    },
    {
      title: 'Mouvements de Caisse et Comptes Clients',
      description: 'Visualisez toutes vos transactions de caisse instantanément, examinez les additions, suivez les créances et dettes des comptes clients.',
      icon: '💰'
    },
    {
      title: 'Gestion des Stocks et Suivi du Personnel',
      description: 'Suivez vos mouvements de stock en temps réel, vérifiez périodiquement vos stocks de produits et matières premières.',
      icon: '📦'
    }
  ];

  const pricingPlans = [
    {
      name: 'POS Mobile',
      tagline: 'Mobile, portable',
      price: '349',
      description: 'Vendeurs mobiles, équipes de terrain, commerçants, zones d\'événements',
      features: [
        'Utilisateurs illimités',
        'Android OS',
        'Fonctionnement hors ligne',
        'Vente rapide par code-barres',
        'Suivi des commandes de table',
        'Gestion des comptes clients',
        'Portail de gestion en ligne',
        'App de rapport mobile',
        'Gestion multi-menus',
        'Connexion multi-imprimantes',
        'Support écran cuisine (KDS)'
      ]
    },
    {
      name: 'POS Web',
      tagline: 'Démarrage rapide, votre propre appareil',
      price: '525',
      discount: 20,
      description: 'Nouvelles entreprises, petits cafés et kiosques',
      features: [
        'Utilisateurs illimités',
        'Basé sur le Web',
        'Fonctionnement hors ligne',
        'Vente rapide par code-barres',
        'Suivi des commandes de table',
        'Gestion des comptes clients',
        'Portail de gestion en ligne',
        'App de rapport mobile',
        'Gestion multi-menus',
        'Connexion multi-imprimantes',
        'Support écran cuisine (KDS)'
      ]
    },
    {
      name: 'POS Tablet',
      tagline: 'Compact, économique',
      price: '699',
      description: 'Petits restaurants, chaînes de cafés, pâtisseries boutiques',
      features: [
        'Utilisateurs illimités',
        'Android OS',
        'Fonctionnement hors ligne',
        'Vente rapide par code-barres',
        'Suivi des commandes de table',
        'Gestion des comptes clients',
        'Portail de gestion en ligne',
        'App de rapport mobile',
        'Gestion multi-menus',
        'Connexion multi-imprimantes',
        'Support écran cuisine (KDS)'
      ],
      recommended: true
    },
    {
      name: 'POS Premium',
      tagline: 'Contrôle total, puissance maximale',
      price: '1049',
      description: 'Chaînes de restaurants, centres commerciaux, entreprises à fort volume',
      features: [
        'Utilisateurs illimités',
        'Android / Windows',
        'Fonctionnement hors ligne',
        'Vente rapide par code-barres',
        'Suivi des commandes de table',
        'Gestion des comptes clients',
        'Portail de gestion en ligne',
        'App de rapport mobile',
        'Gestion multi-menus',
        'Connexion multi-imprimantes',
        'Support écran cuisine (KDS)'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Pierre Martin',
      business: 'Restaurant Le Bistro',
      city: 'Paris',
      text: 'Nous utilisons AyaPos depuis 2 ans dans nos 3 restaurants. La gestion centralisée et les rapports en temps réel nous font gagner beaucoup de temps.',
      rating: 5
    },
    {
      name: 'Sophie Dubois',
      business: 'Café Parisien',
      city: 'Lyon',
      text: 'Le système est intuitif et le support client est exceptionnel. Les terminaux de paiement sont ultra-rapides.',
      rating: 5
    },
    {
      name: 'Marc Laurent',
      business: 'Brasserie du Centre',
      city: 'Marseille',
      text: 'AyaPos a transformé notre façon de travailler. L\'intégration avec les commandes en ligne est parfaite.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Qu\'est-ce que le système POS Restaurant AyaPos et comment fonctionne-t-il?',
      answer: 'Le système POS AyaPos est un système de point de vente basé sur le cloud conçu spécialement pour les restaurants. Il est utilisé pour prendre les commandes des clients, effectuer des ventes par code-barres, gérer les tables et les additions, suivre les stocks et surveiller les performances commerciales.'
    },
    {
      question: 'Quels sont les avantages du programme d\'additions restaurant AyaPos?',
      answer: 'Le système POS AyaPos est un programme d\'additions restaurant rapide et fiable avec une interface visuelle conviviale. Vous pouvez facilement définir vos produits et commencer à prendre des commandes sans formation.'
    },
    {
      question: 'Le programme d\'additions restaurant AyaPos dispose-t-il d\'une intégration de commande en ligne?',
      answer: 'Oui, avec le programme d\'additions restaurant AyaPos, vous pouvez prendre des commandes à emporter des clients qui appellent par téléphone et des applications de commande mobile, et les gérer facilement.'
    },
    {
      question: 'Pour quels types d\'entreprises le système d\'additions restaurant AyaPos est-il adapté?',
      answer: 'Le système d\'additions restaurant AyaPos est idéal pour les restaurants, cafés, bars, chaînes de restauration rapide et entreprises similaires. Il offre des solutions personnalisables et évolutives pour tous types d\'entreprises.'
    },
    {
      question: 'Quel est le modèle de tarification du système d\'additions restaurant AyaPos?',
      answer: 'Les prix du système d\'additions restaurant AyaPos peuvent varier en fonction des besoins et de la taille de l\'entreprise. La tarification des logiciels est généralement proposée via un modèle d\'abonnement mensuel ou annuel.'
    },
    {
      question: 'Comment puis-je acheter le système POS Restaurant AyaPos?',
      answer: 'Pour acheter ou essayer le système POS restaurant AyaPos, vous pouvez remplir le formulaire de contact ou appeler directement notre centre d\'appels.'
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-orange-50 via-white to-blue-50">
      {/* Hero Section - CENTRÉ avec couleurs */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
              {pageContent.hero_title || '🍽️ Système POS Restaurant Complet'}
            </h1>
            <p className="text-2xl text-orange-50 max-w-3xl mx-auto leading-relaxed mb-8">
              {pageContent.hero_subtitle || 'Solution tout-en-un pour gérer votre restaurant avec efficacité'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#pricing">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-4">
                  Voir les tarifs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold px-8 py-4">
                  Demander une démo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {benefits.map((benefit, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{benefit.title}</h2>
                <p className="text-xl text-gray-600 mb-6">{benefit.description}</p>
                <a href="#contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Voir les tarifs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Table Management Section */}
      {tableManagement.length > 0 && (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {pageContent.sections?.table_management?.title || 'Gérez les commandes, additions et tables!'}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {tableManagement.map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <a href="#contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Voir les tarifs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      )}

      {/* Online Orders Section */}
      {onlineOrders.length > 0 && (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {pageContent.sections?.online_orders?.title || 'Gérez vos commandes en ligne sur un seul écran!'}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {onlineOrders.map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <a href="#contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Voir les tarifs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      )}

      {/* Reports Section */}
      {reports.length > 0 && (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {pageContent.sections?.reports?.title || 'Rapports avancés et analyses'}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {reports.map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <a href="#contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Voir les tarifs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      )}

      {/* Features Grid - CENTRÉ et COLORÉ */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              ✨ Fonctionnalités Puissantes
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
              Tout ce dont vous avez besoin pour gérer votre restaurant
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors = [
                'from-orange-500 to-red-500',
                'from-blue-500 to-indigo-500',
                'from-purple-500 to-pink-500',
                'from-green-500 to-teal-500',
                'from-yellow-500 to-orange-500',
                'from-red-500 to-pink-500',
              ];
              const bgColor = colors[index % colors.length];
              return (
                <Card key={index} className="hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-100 overflow-hidden">
                  <div className={`bg-gradient-to-r ${bgColor} p-6 text-center`}>
                    <Icon className="h-16 w-16 text-white mx-auto drop-shadow-lg" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choisissez le meilleur pour vous
            </h2>
            <p className="text-xl text-gray-600">
              Sélectionnez le meilleur système POS pour vos besoins et commencez à vendre aux meilleurs prix
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.recommended ? 'border-blue-600 border-2 shadow-2xl' : ''}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Recommandé</Badge>
                  </div>
                )}
                {plan.discount && (
                  <div className="absolute -top-4 right-4">
                    <Badge className="bg-green-600 text-white">-{plan.discount}%</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.tagline}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">€{plan.price}</span>
                      <span className="text-gray-600 ml-2">/mois</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  <a href="#contact">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
                      Commencer
                    </Button>
                  </a>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm">Fonctionnalités:</p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.business} | {testimonial.city}
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choisissez immédiatement le système POS le plus adapté
            </h2>
            <p className="text-xl text-gray-600">
              Remplissez le formulaire et nous vous appellerons dans les plus brefs délais
            </p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de votre entreprise *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    placeholder="Mon Restaurant"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type d'entreprise *
                  </label>
                  <Select required onValueChange={(value) => setFormData({...formData, businessType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="fast-food">Fast Food</SelectItem>
                      <SelectItem value="bakery">Pâtisserie</SelectItem>
                      <SelectItem value="market">Marché</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+41 XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="contact@restaurant.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Paris"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Obtenir un Devis Gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            AYAPOS SYSTÈMES POS NOUVELLE GÉNÉRATION
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ayez toujours une longueur d'avance!
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

export default RestaurantPOS;

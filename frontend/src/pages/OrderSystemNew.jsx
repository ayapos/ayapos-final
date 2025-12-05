import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Package, Zap, Clock, BarChart3,
  Smartphone, Wifi, Bell, TrendingUp, Star, Users,
  ShoppingCart, Truck, CheckCircle, Globe
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';

const OrderSystemNew = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    phone: '',
    email: '',
    city: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée!",
      description: "Nous vous contacterons sous peu.",
    });
  };

  const benefits = [
    {
      title: 'Gérez toutes vos commandes sur un seul écran',
      description: 'Centralisez la gestion de toutes vos commandes: sur place, à emporter, livraison, et commandes en ligne depuis les plateformes de livraison.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5-592ecc9cc00f?w=800&q=80'
    },
    {
      title: 'Intégrations avec les plateformes de livraison',
      description: 'Connectez-vous automatiquement avec Uber Eats, Deliveroo, Just Eat et autres plateformes. Toutes vos commandes apparaissent sur le même écran.',
      image: 'https://images.unsplash.com/photo-1609951734391?w=800&q=80'
    },
    {
      title: 'Optimisez la préparation et réduisez les erreurs',
      description: 'Système de tickets cuisine (KDS) pour une préparation optimale. Notifications automatiques et suivi en temps réel de chaque commande.',
      image: 'https://images.unsplash.com/photo-1728044849280?w=800&q=80'
    }
  ];

  const features = [
    {
      icon: Package,
      title: 'Gestion centralisée',
      description: 'Toutes vos commandes au même endroit'
    },
    {
      icon: Zap,
      title: 'Traitement rapide',
      description: 'Optimisez le temps de préparation'
    },
    {
      icon: Clock,
      title: 'Suivi en temps réel',
      description: 'État de chaque commande visible'
    },
    {
      icon: BarChart3,
      title: 'Rapports détaillés',
      description: 'Analytics et statistiques complètes'
    },
    {
      icon: Smartphone,
      title: 'Commandes en ligne',
      description: 'Intégration plateformes de livraison'
    },
    {
      icon: Wifi,
      title: 'Synchronisation cloud',
      description: 'Données en temps réel partout'
    },
    {
      icon: Bell,
      title: 'Notifications push',
      description: 'Alertes automatiques nouveaux ordres'
    },
    {
      icon: TrendingUp,
      title: 'Optimisation ventes',
      description: 'Analyses pour augmenter revenus'
    }
  ];

  const orderTypes = [
    {
      title: 'Commandes sur place',
      description: 'Gestion des tables et service en salle',
      icon: '🍽️',
      features: ['Suivi par table', 'Division additions', 'Service multi-courses']
    },
    {
      title: 'Commandes à emporter',
      description: 'Click & Collect et takeaway',
      icon: '📦',
      features: ['Horaire préparation', 'SMS notification', 'Paiement en ligne']
    },
    {
      title: 'Livraison à domicile',
      description: 'Gestion des livraisons et livreurs',
      icon: '🚗',
      features: ['Suivi GPS', 'Dispatch auto', 'Optimisation routes']
    },
    {
      title: 'Commandes en ligne',
      description: 'Intégrations plateformes tierces',
      icon: '📱',
      features: ['Uber Eats', 'Deliveroo', 'Just Eat']
    }
  ];

  const statistics = [
    { value: '50%', label: 'Réduction erreurs commande' },
    { value: '35%', label: 'Temps préparation optimisé' },
    { value: '100%', label: 'Visibilité commandes' },
    { value: '24/7', label: 'Disponibilité système' }
  ];

  const testimonials = [
    {
      name: 'Laurent Mercier',
      business: 'Pizza Express',
      city: 'Nice',
      text: 'Le système de gestion des commandes a révolutionné notre cuisine. Plus d\'erreurs, plus de stress, juste de l\'efficacité pure.',
      rating: 5
    },
    {
      name: 'Fatima Benali',
      business: 'Le Taj Mahal',
      city: 'Paris',
      text: 'L\'intégration avec les plateformes de livraison nous a fait gagner 3 heures par jour. Tout est automatisé!',
      rating: 5
    },
    {
      name: 'Carlos Rodriguez',
      business: 'Taco Loco',
      city: 'Bordeaux',
      text: 'Nos clients adorent pouvoir suivre leur commande en temps réel. Les avis positifs ont augmenté de 40%.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Comment fonctionne le système de gestion des commandes AyaPos?',
      answer: 'Le système centralise toutes vos commandes (sur place, à emporter, livraison, en ligne) sur une interface unique. Chaque commande est automatiquement routée vers la cuisine avec toutes les informations nécessaires.'
    },
    {
      question: 'Puis-je intégrer mes plateformes de livraison existantes?',
      answer: 'Oui! AyaPos s\'intègre avec les principales plateformes comme Uber Eats, Deliveroo, Just Eat et autres. Les commandes arrivent automatiquement dans votre système.'
    },
    {
      question: 'Le système fonctionne-t-il avec un écran cuisine (KDS)?',
      answer: 'Absolument! Le système inclut un module KDS (Kitchen Display System) qui affiche les commandes sur des écrans en cuisine pour une préparation optimisée.'
    },
    {
      question: 'Comment sont notifiés les clients sur l\'état de leur commande?',
      answer: 'Les clients reçoivent des notifications automatiques par SMS ou email à chaque étape: commande reçue, en préparation, prête, en livraison. Tout est personnalisable.'
    },
    {
      question: 'Puis-je gérer plusieurs établissements avec le même système?',
      answer: 'Oui, le système supporte la gestion multi-sites. Vous pouvez gérer toutes vos commandes de tous vos établissements depuis un seul tableau de bord centralisé.'
    },
    {
      question: 'Le système génère-t-il des rapports de performance?',
      answer: 'Le système fournit des rapports détaillés: temps moyen de préparation, commandes par heure, pics d\'activité, erreurs, satisfaction client et bien plus encore.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-600 text-white">
                SYSTÈME DE GESTION DES COMMANDES
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Système de Commande et Paquet Service
              </h1>
              <p className="text-xl text-gray-600">
                Gérez toutes vos commandes sur un seul écran: sur place, à emporter, livraison et plateformes en ligne
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    Demander une démo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/order-system-pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5-592ecc9cc00f?w=800&q=80"
                alt="Système de Commande"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
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
                    En savoir plus
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tous types de commandes supportés
            </h2>
            <p className="text-xl text-gray-600">
              Un système unique pour gérer tous vos canaux de vente
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {orderTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités complètes
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
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

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 border rounded-lg px-6">
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

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Optimisez la gestion de vos commandes
            </h2>
            <p className="text-xl text-gray-600">
              Contactez-nous pour une démonstration personnalisée
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
                      <SelectItem value="delivery">Service Livraison</SelectItem>
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
            Centralisez vos commandes dès aujourd'hui
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des centaines de restaurants qui optimisent leur gestion
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Contactez-nous
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OrderSystemNew;
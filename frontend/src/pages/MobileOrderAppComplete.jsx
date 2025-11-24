import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Smartphone, CreditCard, Bell, Heart,
  ShoppingCart, Users, Star, TrendingUp, Globe, Zap,
  Gift, Lock, Cloud, Settings, MessageCircle, BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';

const MobileOrderAppComplete = () => {
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

  const mainBenefits = [
    {
      title: 'Vendez depuis n\'importe où',
      description: 'Avec l\'application mobile AyaPos, supprimez les frontières de votre entreprise. Acceptez des commandes depuis n\'importe où avec des smartphones et tablettes. Augmentez vos ventes et votre notoriété.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80'
    },
    {
      title: 'Soyez toujours accessible',
      description: 'Avec l\'application mobile facilement téléchargeable sur smartphones et tablettes, vos clients peuvent toujours vous joindre et consulter vos produits. Créez ainsi la fidélité client.',
      image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80'
    },
    {
      title: 'Vos clients commandent facilement',
      description: 'Grâce à l\'interface conviviale et rapide à comprendre, vos clients peuvent rapidement sélectionner les produits qu\'ils souhaitent et commander facilement en quelques clics.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'
    }
  ];

  const visualFeatures = [
    {
      title: 'Offrez des menus visuels à vos clients',
      description: 'Offrez un festin visuel à vos clients avec l\'application mobile AyaPos. Impressionnez vos clients avec des images haute résolution que vous ajouterez aux catégories et augmentez vos ventes.',
      icon: '📱'
    },
    {
      title: 'Gestion facile des produits',
      description: 'Vous pouvez organiser vos produits comme vous le souhaitez. Vous pouvez facilement modifier les prix, descriptions et tous les détails à tout moment depuis le panneau de gestion en quelques clics.',
      icon: '⚙️'
    },
    {
      title: 'Organisez les catégories',
      description: 'Avec l\'application mobile, vous pouvez organiser les catégories de produits selon vos besoins. Vous pouvez ajouter autant de catégories que vous le souhaitez et supprimer celles que vous voulez facilement depuis le panneau.',
      icon: '📂'
    }
  ];

  const orderFeatures = [
    {
      title: 'Commande facile, suivi facile',
      description: 'Pendant que vos clients commandent facilement avec l\'application, vous pouvez suivre les commandes entrantes depuis votre panneau de gestion.',
      icon: '✓'
    },
    {
      title: 'Ajoutez au panier, commandez immédiatement',
      description: 'Avec l\'application mobile, vos clients peuvent ajuster les quantités de produits après les avoir ajoutés au panier, puis passer commande rapidement.',
      icon: '🛒'
    },
    {
      title: 'Achetez, collectez des points',
      description: 'Créez des programmes de fidélité avec l\'application mobile. Vos clients collectent des points à chaque achat et les utilisent pour leurs prochaines commandes.',
      icon: '⭐'
    }
  ];

  const campaignFeatures = [
    {
      title: 'Augmentez les ventes avec des campagnes',
      description: 'Vous pouvez facilement créer des campagnes depuis votre panneau administrateur avec l\'application mobile.',
      icon: '🎁'
    },
    {
      title: 'Fidélité client',
      description: 'Faire régulièrement des campagnes vous fait préférer davantage. Ainsi, vous pouvez gagner plus et augmenter la fidélité de vos clients.',
      icon: '❤️'
    },
    {
      title: 'Envoyez des notifications à vos clients',
      description: 'Avec l\'application mobile, vous pouvez envoyer vos campagnes par notification à vos clients depuis le panneau de gestion et les atteindre facilement.',
      icon: '🔔'
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Android et iOS Compatible',
      description: 'Fonctionne sans problème sur tous les téléphones Android et iOS'
    },
    {
      icon: Cloud,
      title: 'Infrastructure Cloud',
      description: 'Modifiez le menu depuis ordinateur ou téléphone. Les changements sont immédiatement appliqués'
    },
    {
      icon: ShoppingCart,
      title: 'Adapté à toutes entreprises',
      description: 'Parfait pour vendeurs détail, restauration, services professionnels'
    },
    {
      icon: Settings,
      title: 'Panneau de gestion avancé',
      description: 'Ajoutez, retirez ou modifiez prix selon vos besoins'
    },
    {
      icon: CreditCard,
      title: 'Paiement intégré',
      description: 'Acceptez cartes bancaires, Apple Pay, Google Pay'
    },
    {
      icon: Bell,
      title: 'Notifications push',
      description: 'Informez clients des nouveautés et promotions'
    },
    {
      icon: Heart,
      title: 'Programme fidélité',
      description: 'Récompensez clients réguliers avec points'
    },
    {
      icon: BarChart3,
      title: 'Analytics avancées',
      description: 'Suivez ventes et comportements clients'
    }
  ];

  const appFeatures = [
    {
      title: 'Commande en ligne',
      description: 'Click & Collect et livraison à domicile',
      items: ['Panier intelligent', 'Personnalisation produits', 'Suivi temps réel', 'Historique commandes']
    },
    {
      title: 'Paiement sécurisé',
      description: 'Infrastructure 3D Secure et SSL 256Bit',
      items: ['Toutes cartes acceptées', 'Apple Pay & Google Pay', 'Paiement en 1 clic', 'Données cryptées']
    },
    {
      title: 'Fidélité & Récompenses',
      description: 'Programme de points et avantages',
      items: ['Points par achat', 'Niveaux VIP', 'Offres exclusives', 'Parrainage amis']
    },
    {
      title: 'Portefeuille virtuel',
      description: 'Crédit et carte cadeaux',
      items: ['Rechargement crédit', 'Cartes cadeaux', 'Codes promo', 'Cashback']
    }
  ];

  const statistics = [
    { value: '45%', label: 'Augmentation commandes en ligne' },
    { value: '65%', label: 'Clients préfèrent app mobile' },
    { value: '30%', label: 'Panier moyen plus élevé' },
    { value: '80%', label: 'Clients reviennent via app' }
  ];

  const testimonials = [
    {
      name: 'Alexandre Dubois',
      business: 'Burger House',
      city: 'Paris',
      text: 'Notre application mobile a révolutionné nos ventes! 60% de nos commandes viennent maintenant de l\'app. Les clients adorent la simplicité.',
      rating: 5
    },
    {
      name: 'Sophie Martin',
      business: 'Café Gourmand',
      city: 'Lyon',
      text: 'Le programme de fidélité intégré fait revenir nos clients régulièrement. Nos ventes ont augmenté de 45% en 3 mois.',
      rating: 5
    },
    {
      name: 'Lucas Bernard',
      business: 'Pizza Express',
      city: 'Marseille',
      text: 'L\'interface est super intuitive. Même nos clients âgés n\'ont aucun problème pour commander. Configuration en 24h, incroyable!',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Qu\'est-ce qu\'une application mobile de commande et comment fonctionne-t-elle?',
      answer: 'L\'application mobile de commande AyaPos est une application personnalisée pour votre entreprise qui permet à vos clients de consulter vos produits, passer des commandes et effectuer des paiements depuis leurs smartphones. L\'application est disponible sur iOS et Android.'
    },
    {
      question: 'Combien de temps faut-il pour créer l\'application?',
      answer: 'Votre application mobile personnalisée peut être prête en 24-48 heures! Nous créons une application avec votre logo, couleurs et informations. Vous pouvez commencer à recevoir des commandes immédiatement.'
    },
    {
      question: 'L\'application fonctionne-t-elle sur iOS et Android?',
      answer: 'Oui! Votre application sera disponible à la fois sur l\'App Store d\'Apple et sur Google Play Store. Vos clients peuvent la télécharger sur n\'importe quel appareil.'
    },
    {
      question: 'Puis-je personnaliser le design de l\'application?',
      answer: 'Absolument! Vous pouvez personnaliser les couleurs, ajouter votre logo, modifier les bannières et adapter complètement l\'interface à votre identité de marque.'
    },
    {
      question: 'Comment fonctionne le système de paiement?',
      answer: 'L\'application utilise une infrastructure de paiement sécurisée 3D Secure avec certificat SSL 256Bit. Vos clients peuvent payer par carte bancaire, Apple Pay, Google Pay en toute sécurité.'
    },
    {
      question: 'Puis-je créer des campagnes et offres spéciales?',
      answer: 'Oui! Vous pouvez créer des campagnes, codes promo, offres spéciales depuis le panneau de gestion et envoyer des notifications push à tous vos clients pour les informer.'
    },
    {
      question: 'Comment fonctionne le programme de fidélité?',
      answer: 'Le programme de fidélité permet à vos clients de collecter des points à chaque achat. Vous définissez combien de points ils gagnent et ce qu\'ils peuvent en faire (réductions, produits gratuits, etc.).'
    },
    {
      question: 'L\'application est-elle intégrée avec mon système POS?',
      answer: 'Oui, l\'application mobile est complètement intégrée avec le système POS AyaPos. Toutes les commandes passées via l\'application arrivent directement dans votre système POS.'
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
                APPLICATION MOBILE DE COMMANDE
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Application Mobile de Commande - Programme de Fidélité & Portefeuille
              </h1>
              <p className="text-xl text-gray-600">
                Application mobile avec système de commande en ligne, infrastructure de paiement sécurisée, programme de fidélité et portefeuille virtuel pour restaurants, cafés et hôtels
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    Demander une démo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="#demos">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    Voir les démos
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
                alt="Application Mobile"
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

      {/* Main Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vendez partout, tout le temps
            </h2>
            <p className="text-xl text-gray-600">
              Atteignez vos clients où qu'ils soient
            </p>
          </div>
          {mainBenefits.map((benefit, index) => (
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

      {/* Visual Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Menus visuels et gestion facile
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {visualFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Commande facile, fidélité garantie
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {orderFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Augmentez les ventes avec des campagnes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {campaignFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Security */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Infrastructure de paiement en ligne 100% sécurisée!
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Lock className="h-8 w-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Validité internationale</h3>
                    <p className="text-blue-100">Infrastructure 3D Secure et certificat SSL 256Bit utilisés dans l'application ont une validité internationale.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Shield className="h-8 w-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Informations sécurisées</h3>
                    <p className="text-blue-100">Le certificat SSL 256Bit protège et crypte les informations de carte et mots de passe de vos clients.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
                alt="Paiement sécurisé"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* App Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités complètes
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {appFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Demo */}
      <section id="demos" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Téléchargez l'application pour l'essayer!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Découvrez toutes les fonctionnalités avec notre application de démonstration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-2xl shadow-xl mb-4">
                <img
                  src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://play.google.com/store"
                  alt="Google Play QR"
                  className="w-32 h-32"
                />
              </div>
              <Badge className="bg-green-600 text-white">Google Play</Badge>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-2xl shadow-xl mb-4">
                <img
                  src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://apps.apple.com"
                  alt="App Store QR"
                  className="w-32 h-32"
                />
              </div>
              <Badge className="bg-gray-900 text-white">App Store</Badge>
            </div>
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

      {/* FAQ */}
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

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Obtenez votre application mobile personnalisée
            </h2>
            <p className="text-xl text-gray-600">
              Remplissez le formulaire et nous vous contacterons rapidement
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
            Lancez votre application mobile dès aujourd'hui
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des centaines d'entreprises qui vendent via leur app mobile
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

export default MobileOrderAppComplete;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Tablet, Wifi, Battery, Zap,
  Clock, Users, Star, ShoppingCart, Bell, TrendingUp,
  Smartphone, Package, CheckCircle, Globe
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';

const WaiterTerminalNew = () => {
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
      title: 'Prenez les commandes directement à table',
      description: 'Vos serveurs prennent les commandes sur tablette ou smartphone, directement auprès des clients. Les commandes arrivent instantanément en cuisine.',
      image: 'https://images.unsplash.com/photo-1556741533-f6acd646dcec?w=800&q=80'
    },
    {
      title: 'Service plus rapide, clients plus satisfaits',
      description: 'Réduisez le temps de prise de commande de 40%. Vos serveurs passent plus de temps avec les clients et moins de temps à aller-retour vers le POS.',
      image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80'
    },
    {
      title: 'Synchronisation en temps réel avec la cuisine',
      description: 'Les commandes sont immédiatement transmises à la cuisine et au bar. Suivi en temps réel de l\'état de chaque plat.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'
    }
  ];

  const features = [
    {
      icon: Tablet,
      title: 'Interface tactile',
      description: 'Écran tactile rapide et réactif'
    },
    {
      icon: Wifi,
      title: 'Connexion WiFi',
      description: 'Synchronisation temps réel'
    },
    {
      icon: Battery,
      title: 'Autonomie longue',
      description: 'Batterie toute la journée'
    },
    {
      icon: Zap,
      title: 'Prise commande rapide',
      description: 'Interface optimisée serveurs'
    },
    {
      icon: Clock,
      title: 'Gain de temps',
      description: '40% plus rapide que méthode papier'
    },
    {
      icon: Users,
      title: 'Multi-serveurs',
      description: 'Tablettes illimitées'
    },
    {
      icon: ShoppingCart,
      title: 'Gestion tables',
      description: 'Attribution et suivi tables'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Alertes plats prêts'
    }
  ];

  const advantages = [
    {
      title: 'Pour les serveurs',
      icon: '👨‍🍳',
      points: [
        'Moins de déplacements',
        'Plus de temps avec clients',
        'Interface simple',
        'Formation rapide'
      ]
    },
    {
      title: 'Pour la cuisine',
      icon: '🍳',
      points: [
        'Commandes claires',
        'Moins d\'erreurs',
        'Meilleure organisation',
        'Timing optimisé'
      ]
    },
    {
      title: 'Pour les clients',
      icon: '😊',
      points: [
        'Service plus rapide',
        'Moins d\'erreurs',
        'Modifications faciles',
        'Meilleure expérience'
      ]
    },
    {
      title: 'Pour la gestion',
      icon: '📊',
      points: [
        'Rapports détaillés',
        'Suivi performance',
        'Analyse serveurs',
        'Optimisation coûts'
      ]
    }
  ];

  const statistics = [
    { value: '40%', label: 'Temps de service réduit' },
    { value: '60%', label: 'Moins d\'erreurs commande' },
    { value: '35%', label: 'Rotation tables améliorée' },
    { value: '25%', label: 'Satisfaction client augmentée' }
  ];

  const deviceTypes = [
    {
      name: 'Tablette Android 10"',
      description: 'Grand écran confortable',
      features: ['Écran tactile HD', 'WiFi 6', 'Batterie 12h', 'Léger 450g']
    },
    {
      name: 'Tablette Android 7"',
      description: 'Compact et mobile',
      features: ['Ultra portable', 'WiFi 6', 'Batterie 10h', 'Léger 280g']
    },
    {
      name: 'Smartphone Android',
      description: 'Poche-friendly',
      features: ['Toujours à portée', '4G/WiFi', 'Batterie longue', 'Très léger']
    }
  ];

  const testimonials = [
    {
      name: 'Antoine Rousseau',
      business: 'La Brasserie Moderne',
      city: 'Paris',
      text: 'Nos serveurs adorent les tablettes! Plus besoin de courir au POS, ils prennent les commandes directement à table. Service beaucoup plus fluide.',
      rating: 5
    },
    {
      name: 'Claire Moreau',
      business: 'Restaurant Le Gourmet',
      city: 'Lyon',
      text: 'Formation des nouveaux serveurs en 15 minutes au lieu de 2 heures. L\'interface est tellement intuitive!',
      rating: 5
    },
    {
      name: 'Michel Dubois',
      business: 'Café du Port',
      city: 'Marseille',
      text: 'Les clients apprécient le service rapide. Nos notes sur TripAdvisor ont augmenté significativement depuis qu\'on utilise les terminaux.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Qu\'est-ce qu\'un terminal serveur et comment fonctionne-t-il?',
      answer: 'Un terminal serveur est une tablette ou smartphone que vos serveurs utilisent pour prendre les commandes directement à table. Les commandes sont instantanément transmises au système POS et à la cuisine via WiFi.'
    },
    {
      question: 'Les tablettes fonctionnent-elles si le WiFi tombe en panne?',
      answer: 'Oui! Les terminaux disposent d\'un mode hors ligne qui stocke les commandes localement. Dès que la connexion revient, tout est automatiquement synchronisé.'
    },
    {
      question: 'Combien de terminaux puis-je connecter?',
      answer: 'Il n\'y a pas de limite! Vous pouvez connecter autant de tablettes ou smartphones que vous avez de serveurs. Chaque appareil se connecte de manière indépendante.'
    },
    {
      question: 'Les terminaux résistent-ils aux chutes et éclaboussures?',
      answer: 'Oui, nous recommandons des coques de protection robustes. Les appareils peuvent résister aux chutes normales et sont résistants aux éclaboussures.'
    },
    {
      question: 'La formation des serveurs est-elle difficile?',
      answer: 'Non, l\'interface est conçue pour être intuitive. La plupart des serveurs maîtrisent le système en 15-30 minutes. Nous fournissons également une formation complète.'
    },
    {
      question: 'Puis-je voir quelles tables sont attribuées à quel serveur?',
      answer: 'Absolument! Le système permet une attribution automatique ou manuelle des tables par serveur avec un suivi en temps réel de toutes les commandes.'
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
                TERMINAL SERVEUR MOBILE
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Terminal Serveur - Prise de Commande Mobile
              </h1>
              <p className="text-xl text-gray-600">
                Tablette et smartphone pour serveurs - Prenez les commandes directement à table et améliorez votre service
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    Demander une démo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/waiter-terminal-pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556741533-f6acd646dcec?w=800&q=80"
                alt="Terminal Serveur"
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

      {/* Advantages for everyone */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Des avantages pour toute l'équipe
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{adv.icon}</div>
                  <CardTitle className="text-xl">{adv.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {adv.points.map((point, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{point}</span>
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
              Fonctionnalités techniques
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

      {/* Device Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choisissez votre appareil
            </h2>
            <p className="text-xl text-gray-600">
              Plusieurs options selon vos besoins
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {deviceTypes.map((device, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{device.name}</CardTitle>
                  <CardDescription>{device.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {device.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
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
              Équipez vos serveurs de tablettes
            </h2>
            <p className="text-xl text-gray-600">
              Contactez-nous pour un essai gratuit
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
                      <SelectItem value="hotel">Hôtel</SelectItem>
                      <SelectItem value="bistro">Bistro</SelectItem>
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
            Transformez votre service dès aujourd'hui
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Des centaines de restaurants améliorent leur service avec nos terminaux
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

export default WaiterTerminalNew;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Check, Smartphone, Zap, Users, TrendingUp, 
  Clock, ShoppingBag, Star, DollarSign, Globe, Utensils
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useToast } from '../hooks/use-toast';

const SelfOrderKiosk = () => {
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
      title: 'Augmentez vos ventes avec le Self-Order Kiosk',
      description: 'Les bornes de commande self-service augmentent le panier moyen de 25% grâce aux suggestions intelligentes de produits complémentaires.',
      image: 'https://images.unsplash.com/photo-1764795849694-34b3316b3de4?w=800&q=80'
    },
    {
      title: 'Réduisez les files d\'attente et le temps d\'attente',
      description: 'Les clients passent leurs commandes rapidement via l\'interface tactile intuitive, réduisant les files d\'attente de 60%.',
      image: 'https://images.unsplash.com/photo-1609951734391?w=800&q=80'
    },
    {
      title: 'Libérez votre personnel pour un meilleur service',
      description: 'Vos employés peuvent se concentrer sur la préparation des commandes et le service client plutôt que sur la prise de commandes.',
      image: 'https://images.unsplash.com/photo-1728044849280?w=800&q=80'
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Interface tactile intuitive',
      description: 'Écran tactile HD facile à utiliser pour tous les âges'
    },
    {
      icon: Zap,
      title: 'Commande ultra-rapide',
      description: 'Processus de commande optimisé en moins de 60 secondes'
    },
    {
      icon: Users,
      title: 'Support multilingue',
      description: 'Interface disponible en 9 langues pour vos clients internationaux'
    },
    {
      icon: TrendingUp,
      title: 'Upselling intelligent',
      description: 'Suggestions automatiques de produits complémentaires'
    },
    {
      icon: Clock,
      title: 'Disponible 24/7',
      description: 'Service continu même pendant les heures de pointe'
    },
    {
      icon: ShoppingBag,
      title: 'Panier personnalisable',
      description: 'Modifications faciles et options de personnalisation'
    },
    {
      icon: DollarSign,
      title: 'Paiement intégré',
      description: 'Accepte toutes les cartes et paiements sans contact'
    },
    {
      icon: Globe,
      title: 'Design personnalisable',
      description: 'Interface adaptée à votre identité visuelle'
    }
  ];

  const useCases = [
    {
      title: 'Restaurants Fast-Food',
      description: 'Idéal pour les chaînes de restauration rapide avec fort volume',
      icon: '🍔'
    },
    {
      title: 'Cafés et Pâtisseries',
      description: 'Commandes rapides pour café, viennoiseries et snacks',
      icon: '☕'
    },
    {
      title: 'Cinémas',
      description: 'Commande de popcorn, boissons et snacks avant la séance',
      icon: '🎬'
    },
    {
      title: 'Food Courts',
      description: 'Gestion multi-restaurants dans les centres commerciaux',
      icon: '🏢'
    },
    {
      title: 'Stades et Événements',
      description: 'Service rapide pour grandes foules lors d\'événements',
      icon: '🏟️'
    },
    {
      title: 'Aéroports',
      description: 'Commandes rapides pour voyageurs pressés',
      icon: '✈️'
    }
  ];

  const statistics = [
    { value: '25%', label: 'Augmentation du panier moyen' },
    { value: '60%', label: 'Réduction du temps d\'attente' },
    { value: '40%', label: 'Réduction des erreurs de commande' },
    { value: '30%', label: 'Augmentation du chiffre d\'affaires' }
  ];

  const testimonials = [
    {
      name: 'Jean Dupont',
      business: 'Burger King Franchise',
      city: 'Paris',
      text: 'Les bornes Self-Order ont révolutionné notre service. Les clients adorent l\'autonomie et nous avons vu nos ventes augmenter de 30%.',
      rating: 5
    },
    {
      name: 'Marie Lambert',
      business: 'Café Central',
      city: 'Lyon',
      text: 'Installation rapide et formation facile. Nos employés peuvent maintenant se concentrer sur la qualité du service.',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      business: 'Food Court Manager',
      city: 'Marseille',
      text: 'Gérer 5 restaurants avec un seul système de kiosques est incroyablement efficace. Recommandé à 100%!',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Qu\'est-ce qu\'un Self-Order Kiosk et comment fonctionne-t-il?',
      answer: 'Un Self-Order Kiosk est une borne de commande interactive qui permet aux clients de passer leurs commandes de manière autonome via un écran tactile. Le client sélectionne ses produits, personnalise sa commande, paie directement sur le kiosk et reçoit un numéro de commande.'
    },
    {
      question: 'Les bornes sont-elles faciles à utiliser pour tous les clients?',
      answer: 'Oui! L\'interface est conçue pour être intuitive avec de grandes icônes visuelles, des images de produits et un parcours de commande simplifié. Le système est disponible en plusieurs langues et adapté à tous les âges.'
    },
    {
      question: 'Quels modes de paiement sont acceptés?',
      answer: 'Les kiosks AyaPos acceptent tous les modes de paiement: cartes bancaires, paiements sans contact (NFC), Apple Pay, Google Pay, et peuvent être configurés pour accepter les espèces via un module optionnel.'
    },
    {
      question: 'Le kiosk fonctionne-t-il hors ligne?',
      answer: 'Oui, comme tous nos systèmes AyaPos, les kiosks disposent d\'un mode hors ligne qui garantit la continuité du service même en cas de coupure internet temporaire.'
    },
    {
      question: 'Puis-je personnaliser l\'interface du kiosk?',
      answer: 'Absolument! L\'interface peut être entièrement personnalisée avec vos couleurs, logo, images de produits et organisation des menus selon vos besoins spécifiques.'
    },
    {
      question: 'Combien de temps faut-il pour installer un kiosk?',
      answer: 'L\'installation physique prend environ 2-3 heures. La configuration du système et la formation de votre équipe peuvent être réalisées en une journée. Vous pouvez commencer à utiliser vos kiosks immédiatement après.'
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
                SELF-ORDER KIOSK AYAPOS
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Borne de Commande Self-Service Interactive
              </h1>
              <p className="text-xl text-gray-600">
                Augmentez vos ventes de 25% et réduisez les files d\'attente de 60% avec nos kiosks nouvelle génération
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    Demander une démo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/kiosk-pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1764795849694-34b3316b3de4?w=800&q=80"
                alt="Self-Order Kiosk"
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

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités complètes
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour une expérience self-service parfaite
            </p>
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

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Parfait pour tous types d'établissements
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
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
              Demandez votre devis personnalisé
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
                      <SelectItem value="cinema">Cinéma</SelectItem>
                      <SelectItem value="food-court">Food Court</SelectItem>
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
            Modernisez votre service dès aujourd'hui
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des centaines d'établissements qui ont choisi nos kiosks
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

export default SelfOrderKiosk;

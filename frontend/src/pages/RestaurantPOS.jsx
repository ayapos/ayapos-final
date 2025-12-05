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

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section - MODERNE SPLIT DESIGN */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-blue-100 text-sm font-medium">Solution POS #1 en Suisse</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
                {pageContent.hero_title || 'Système POS Restaurant Complet'}
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                {pageContent.hero_subtitle || 'Solution tout-en-un pour gérer votre restaurant avec efficacité'}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">700+</div>
                  <div className="text-sm text-blue-200">Restaurants</div>
                </div>
                <div className="text-center border-x border-blue-400/30">
                  <div className="text-3xl font-bold text-white">99%</div>
                  <div className="text-sm text-blue-200">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-blue-200">Support</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  Demander une démo gratuite
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#pricing">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg backdrop-blur-sm">
                  Voir les tarifs
                </Button>
              </a>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-300" />
                  <span className="text-sm text-blue-200">Sécurisé & Certifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-blue-200">Installation en 24h</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image/Mockup */}
            <div className="relative lg:block hidden">
              <div className="relative z-10">
                {/* Main Image with Glow Effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-3xl opacity-30 animate-pulse"></div>
                  <img
                    src={pageContent.hero_image || "https://images.unsplash.com/photo-1726065235203-4368c41c6f19-4cbffc50cc1d?w=800&q=80"}
                    alt="POS Restaurant"
                    className="relative rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur"
                  />
                </div>
                
                {/* Floating Stats Cards */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-2">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">+127%</div>
                      <div className="text-xs text-gray-600">Efficacité</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-2xl p-4 animate-float delay-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 rounded-full p-2">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">+43%</div>
                      <div className="text-xs text-gray-600">Revenus</div>
                    </div>
                  </div>
                </div>
              </div>
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
      {features.length > 0 && (
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
              ✨ Fonctionnalités Puissantes
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
              Tout ce dont vous avez besoin pour gérer votre restaurant
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const iconMap = { Cloud, Store, Smartphone, Wifi, Package, Users, BarChart3, Globe };
              const Icon = iconMap[feature.icon] || Cloud;
              const colors = [
                'from-blue-500 to-blue-600',
                'from-blue-600 to-blue-700',
                'from-blue-500 to-indigo-600',
                'from-indigo-600 to-blue-600',
                'from-blue-400 to-blue-600',
                'from-blue-700 to-blue-800',
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
      )}

      {/* Pricing Section */}
      {pricingPlans.length > 0 && (
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
              <Card key={plan.id || index} className={`relative ${plan.recommended ? 'border-blue-600 border-2 shadow-2xl' : ''}`}>
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
                    {plan.features && plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-600">{typeof feature === 'string' ? feature : (feature.text || '')}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
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
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
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
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.id || index} value={`item-${index}`} className="bg-white border rounded-lg px-6">
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
      )}

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
            {pageContent.cta_title || 'AYAPOS SYSTÈMES POS NOUVELLE GÉNÉRATION'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {pageContent.cta_subtitle || 'Ayez toujours une longueur d\'avance!'}
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

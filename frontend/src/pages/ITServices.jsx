import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Cloud, 
  Database, 
  Shield,
  Zap,
  Settings,
  ArrowRight,
  Check,
  Sparkles,
  Cpu,
  Layout,
  Palette
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const ITServices = () => {
  const services = [
    {
      icon: Globe,
      title: "Sites Web sur Mesure",
      description: "Créez votre présence en ligne avec des sites web modernes, rapides et optimisés pour le SEO.",
      features: [
        "Design responsive et moderne",
        "Optimisation SEO intégrée",
        "Performance ultra-rapide",
        "Compatible tous appareils",
        "Hébergement et maintenance"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Smartphone,
      title: "Applications Mobiles",
      description: "Applications iOS et Android natives ou hybrides pour engager vos clients partout.",
      features: [
        "iOS & Android natif",
        "React Native / Flutter",
        "Design UX/UI professionnel",
        "Intégrations API complètes",
        "Publication sur stores"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Cloud,
      title: "Applications SaaS",
      description: "Solutions SaaS complètes, scalables et sécurisées pour votre business.",
      features: [
        "Architecture cloud scalable",
        "Multi-tenant sécurisé",
        "Paiements intégrés",
        "Dashboard analytics",
        "API REST/GraphQL"
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Code,
      title: "Développement Backend",
      description: "APIs robustes, bases de données optimisées et architecture backend performante.",
      features: [
        "API RESTful / GraphQL",
        "Microservices architecture",
        "Base de données SQL/NoSQL",
        "Authentification sécurisée",
        "CI/CD automatisé"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Layout,
      title: "CMS & E-commerce",
      description: "Boutiques en ligne et systèmes de gestion de contenu sur mesure.",
      features: [
        "WordPress / Shopify / Custom",
        "Paiements sécurisés",
        "Gestion des stocks",
        "Marketing automation",
        "Analytics avancés"
      ],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Cpu,
      title: "Intelligence Artificielle",
      description: "Intégration d'IA et Machine Learning pour automatiser et innover.",
      features: [
        "Chatbots intelligents",
        "Analyse prédictive",
        "Computer Vision",
        "NLP & traitement du langage",
        "Automatisation de processus"
      ],
      color: "from-pink-500 to-rose-500"
    }
  ];

  const technologies = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "Python", icon: "🐍" },
    { name: "TypeScript", icon: "📘" },
    { name: "Next.js", icon: "▲" },
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "AWS", icon: "☁️" },
    { name: "Docker", icon: "🐳" },
    { name: "Kubernetes", icon: "⎈" },
    { name: "GraphQL", icon: "◆" },
    { name: "TailwindCSS", icon: "🎨" }
  ];

  const process = [
    {
      step: "01",
      title: "Consultation Gratuite",
      description: "Discussion de vos besoins, objectifs et vision du projet",
      icon: Sparkles
    },
    {
      step: "02",
      title: "Proposition & Devis",
      description: "Analyse détaillée, architecture technique et estimation budgétaire",
      icon: Settings
    },
    {
      step: "03",
      title: "Développement",
      description: "Sprints agiles, mises à jour régulières et tests continus",
      icon: Code
    },
    {
      step: "04",
      title: "Déploiement & Support",
      description: "Mise en production, formation et maintenance continue",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Services de Développement IT
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transformez Vos Idées en
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-100">
                Solutions Digitales Innovantes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              De la conception au déploiement, nous créons des applications web, mobiles et SaaS 
              qui propulsent votre business vers le succès.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 text-lg">
                  Démarrer Votre Projet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              >
                Découvrir Nos Services
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check className="h-4 w-4" />
                <span>Développement sur mesure</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check className="h-4 w-4" />
                <span>Technologies modernes</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Check className="h-4 w-4" />
                <span>Support continu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-600 mb-4">
              Nos Services
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Solutions Complètes de Développement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expertise technique et créativité au service de votre projet digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="block mt-6">
                      <Button className="w-full">
                        Discuter de ce service
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Portfolio
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Nos Réalisations
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez quelques projets que nous avons développés avec succès pour nos clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 - Restaurant POS */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🍽️
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-blue-500">Restaurant</Badge>
                </div>
                <CardTitle className="text-white text-xl">Système POS Complet</CardTitle>
                <CardDescription className="text-blue-200">
                  Solution POS complète pour chaîne de restaurants avec gestion multi-sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>React + Node.js + MongoDB</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>15 restaurants connectés</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Paiements intégrés</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project 2 - E-commerce */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-green-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🛒
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-green-500">E-commerce</Badge>
                </div>
                <CardTitle className="text-white text-xl">Marketplace B2B</CardTitle>
                <CardDescription className="text-blue-200">
                  Plateforme e-commerce B2B avec gestion de catalogue et commandes en gros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Next.js + PostgreSQL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>500+ produits gérés</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Intégration Stripe</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project 3 - Mobile App */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  📱
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-purple-500">Mobile App</Badge>
                </div>
                <CardTitle className="text-white text-xl">App Fitness & Santé</CardTitle>
                <CardDescription className="text-blue-200">
                  Application mobile iOS/Android pour suivi fitness et nutrition personnalisé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>React Native + Firebase</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>10K+ téléchargements</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>IA pour recommandations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project 4 - SaaS Platform */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  ☁️
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-orange-500">SaaS</Badge>
                </div>
                <CardTitle className="text-white text-xl">Plateforme CRM</CardTitle>
                <CardDescription className="text-blue-200">
                  CRM cloud pour PME avec automatisation marketing et gestion client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Vue.js + Python + AWS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Architecture multi-tenant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>200+ entreprises clientes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project 5 - Website */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-cyan-500 to-blue-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🌐
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-cyan-500">Website</Badge>
                </div>
                <CardTitle className="text-white text-xl">Site Corporate</CardTitle>
                <CardDescription className="text-blue-200">
                  Site web corporate multilingue avec blog et espace presse intégré
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Next.js + Headless CMS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>SEO optimisé - Top 3 Google</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Performance 98/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project 6 - AI Chatbot */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🤖
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-indigo-500">Intelligence Artificielle</Badge>
                </div>
                <CardTitle className="text-white text-xl">Chatbot IA Support Client</CardTitle>
                <CardDescription className="text-blue-200">
                  Assistant virtuel intelligent pour support client 24/7 avec NLP avancé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>GPT-4 + Python + FastAPI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>92% taux de résolution</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Intégration WhatsApp</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8">
                Voir Plus de Projets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-600 mb-4">
              Technologies
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stack Technologique Moderne
            </h2>
            <p className="text-xl text-gray-600">
              Nous utilisons les meilleures technologies pour créer des solutions performantes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border-2 border-gray-100 hover:border-blue-200"
              >
                <div className="text-4xl mb-2">{tech.icon}</div>
                <p className="font-semibold text-gray-900">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-600 mb-4">
              Notre Processus
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment Nous Travaillons
            </h2>
            <p className="text-xl text-gray-600">
              Une méthodologie éprouvée pour garantir le succès de votre projet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  )}
                  <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
                    <div className="absolute -top-4 left-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                      {item.step}
                    </div>
                    <div className="mt-8">
                      <Icon className="h-10 w-10 text-blue-600 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à Démarrer Votre Projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contactez-nous pour une consultation gratuite et un devis personnalisé.
            Pas de prix fixes - chaque projet est unique !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 text-lg">
                Contactez-Nous Maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-200">Projets Réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Clients Satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5★</div>
              <div className="text-blue-200">Note Moyenne</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ITServices;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, CreditCard, Shield, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { posPackages } from '../data/mockData';
import { usePageContent } from '../hooks/usePageContent';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Pricing = () => {
  const { t } = useTranslation();
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const { getContentValue, loading: contentLoading } = usePageContent('pricing');
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [terminals, setTerminals] = useState([]);
  const [posProducts, setPosProducts] = useState([]);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        // Charger les packages depuis l'API products
        const response = await axios.get(`${API_URL}/api/products/`);
        if (response.data.success && response.data.products.length > 0) {
          // Filtrer les produits de catégorie "package"
          const packages = response.data.products.filter(p => p.category === 'package');
          setPricingPlans(packages.length > 0 ? packages : posPackages);
          
          // Filtrer les terminaux de paiement (catégorie "Payment")
          const paymentTerminals = response.data.products.filter(p => p.category === 'Payment');
          setTerminals(paymentTerminals);
          
          // Filtrer les produits POS (catégorie "POS")
          const posProds = response.data.products.filter(p => p.category === 'POS');
          setPosProducts(posProds);
        } else {
          setPricingPlans(posPackages);
        }
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
        setPricingPlans(posPackages);
      } finally {
        setLoading(false);
      }
    };
    fetchPricingPlans();
  }, []);

  const calculatePrice = (price) => {
    if (billingPeriod === 'yearly') {
      return Math.round(price * 0.8); // 20% discount for yearly
    }
    return price;
  };

  if (loading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            {getContentValue('hero-title', t('pricing.title'))}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            {getContentValue('hero-subtitle', t('pricing.subtitle'))}
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center space-x-4">
            <Tabs value={billingPeriod} onValueChange={setBillingPeriod} className="w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">{t('pricing.monthly')}</TabsTrigger>
                <TabsTrigger value="yearly">
                  {t('pricing.yearly')}
                  <Badge className="ml-2 bg-green-600 text-white">{t('pricing.save')}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Pricing Cards - CENTR\u00c9 */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête descriptive */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
              Plans Tarifaires pour Votre Système POS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choisissez le plan qui correspond parfaitement aux besoins de votre entreprise. 
              De la petite boutique à la grande chaîne, nous avons la solution idéale pour vous.
            </p>
            <div className="mt-8 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
              <span className="text-2xl">🎉</span>
              <span className="font-semibold">Essai gratuit de 14 jours • Sans carte bancaire</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((pkg) => {
              const price = calculatePrice(pkg.price);
              const savings = pkg.price - price;

              // Images pour chaque forfait POS (fallback)
              const posImages = {
                'pos-premium': 'https://images.pexels.com/photos/12935078/pexels-photo-12935078.jpeg?auto=compress&cs=tinysrgb&w=600&h=300',
                'pos-tablet': 'https://images.unsplash.com/photo-1742238896849-303d74d8a8de?w=600&h=300&fit=crop&q=80',
                'pos-web': 'https://images.unsplash.com/photo-1663704413984-ffc91bc84cee?w=600&h=300&fit=crop&q=80',
                'pos-mobile': 'https://images.unsplash.com/photo-1508938255445-041651dfe0c3?w=600&h=300&fit=crop&q=80'
              };

              // Use plan image if available, otherwise fallback
              const planImage = pkg.image || posImages[pkg.id] || 'https://images.unsplash.com/photo-1726056652582-7c9d202d4018?w=600';

              const cardColors = [
                'from-blue-500 to-indigo-600',
                'from-purple-500 to-pink-600',
                'from-orange-500 to-red-600',
                'from-green-500 to-teal-600'
              ];
              const bgGradient = cardColors[pricingPlans.indexOf(pkg) % cardColors.length];

              return (
                <Card
                  key={pkg.id}
                  className={`relative flex flex-col overflow-hidden hover:scale-105 transition-transform duration-300 ${
                    pkg.recommended || pkg.highlighted
                      ? 'border-4 border-yellow-400 shadow-2xl ring-4 ring-yellow-200'
                      : 'border-2 border-gray-200 shadow-lg'
                  }`}
                >
                  {/* Badge supprimé selon demande utilisateur */}

                  {/* Header color\u00e9 avec d\u00e9grad\u00e9 */}
                  <div className={`bg-gradient-to-r ${bgGradient} p-8 text-center`}>
                    <CardTitle className="text-3xl font-extrabold text-white mb-3">{pkg.name}</CardTitle>
                    <p className="text-blue-50 text-lg">{pkg.description}</p>
                  </div>

                  <CardHeader className="text-center pb-6 pt-8 bg-white">
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center">
                        <span className={`text-6xl font-extrabold bg-gradient-to-r ${bgGradient} bg-clip-text text-transparent`}>
                          {price}
                        </span>
                        {pkg.priceType === 'one-time' ? (
                          <span className="text-2xl text-gray-600 ml-2">{pkg.currency || 'CHF'}</span>
                        ) : (
                          <span className="text-2xl text-gray-600 ml-2">
                            {pkg.currency || 'CHF'}/{pkg.billingPeriod === 'yearly' ? 'an' : 'mois'}
                          </span>
                        )}
                      </div>
                      {billingPeriod === 'yearly' && savings > 0 && pkg.priceType !== 'one-time' && (
                        <p className="text-sm text-green-600 font-medium">
                          Économisez {pkg.currency || 'CHF'} {savings}/mois
                        </p>
                      )}
                    </div>

                    <Link to="/contact" className="mt-6">
                      <Button
                        className={`w-full ${
                          pkg.recommended
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-900 hover:bg-gray-800 text-white'
                        }`}
                        size="lg"
                      >
                        {t('pricing.cta')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>

                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900 mb-3">
                        {t('pricing.features')} :
                      </p>
                      <div className="space-y-2">
                        {pkg.features && pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">
                              {typeof feature === 'string' ? feature : (feature.text || '')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AyaPay Payment Terminals Pricing */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600 text-white mb-4">
              Solutions de Paiement
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tarifs AyaPay - Terminaux de Paiement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des terminaux modernes avec des taux de transaction transparents et compétitifs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Starter Plan */}
            <Card className="border-2 border-gray-200 hover:shadow-2xl transition-all">
              <CardHeader className="text-center pb-8 bg-gradient-to-br from-gray-50 to-white">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Starter</CardTitle>
                <CardDescription className="text-base mb-4">
                  Idéal pour petites entreprises
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">CHF 29</span>
                    <span className="text-gray-600 ml-2">/mois</span>
                  </div>
                  <p className="text-sm text-gray-600">+ frais de transaction</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                  <p className="text-sm font-semibold text-blue-900 mb-1">Taux de Transaction</p>
                  <p className="text-2xl font-bold text-blue-600">1.5%</p>
                  <p className="text-xs text-blue-700 mt-1">par transaction</p>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-gray-900 flex items-center">
                    <Check className="h-4 w-4 text-blue-600 mr-2" />
                    Inclus :
                  </p>
                  <div className="space-y-2 pl-6">
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Terminal SmartPOS A77</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Écran tactile 5"</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">WiFi + 4G intégrés</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Sans contact (NFC)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Reçus numériques</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Support email</span>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="block">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800">
                    Commencer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Business Plan - Recommended */}
            <Card className="border-2 border-blue-600 shadow-2xl relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-6 py-2 text-sm">
                  ⭐ Recommandé
                </Badge>
              </div>

              <CardHeader className="text-center pb-8 bg-gradient-to-br from-blue-50 to-white">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">Business</CardTitle>
                <CardDescription className="text-base mb-4">
                  Le plus populaire
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">CHF 79</span>
                    <span className="text-gray-600 ml-2">/mois</span>
                  </div>
                  <p className="text-sm text-gray-600">+ frais de transaction</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-blue-600 rounded-lg p-4 text-white">
                  <p className="text-sm font-semibold mb-1">Taux de Transaction</p>
                  <p className="text-3xl font-bold">1.2%</p>
                  <p className="text-xs mt-1 opacity-90">par transaction</p>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-gray-900 flex items-center">
                    <Check className="h-4 w-4 text-blue-600 mr-2" />
                    Tout du Starter, plus :
                  </p>
                  <div className="space-y-2 pl-6">
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Terminal SmartPOS A920</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Écran tactile 7"</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Imprimante thermique intégrée</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Caméra pour QR codes</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Intégration POS complète</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Support prioritaire 24/7</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Rapports avancés</span>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Commencer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-200 hover:shadow-2xl transition-all">
              <CardHeader className="text-center pb-8 bg-gradient-to-br from-gray-50 to-white">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
                <CardDescription className="text-base mb-4">
                  Pour grandes entreprises
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">Sur mesure</span>
                  </div>
                  <p className="text-sm text-gray-600">Tarifs négociables</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                  <p className="text-sm font-semibold text-purple-900 mb-1">Taux de Transaction</p>
                  <p className="text-2xl font-bold text-purple-600">À partir de 0.9%</p>
                  <p className="text-xs text-purple-700 mt-1">Volume élevé</p>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-gray-900 flex items-center">
                    <Check className="h-4 w-4 text-purple-600 mr-2" />
                    Tout du Business, plus :
                  </p>
                  <div className="space-y-2 pl-6">
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Tous les terminaux disponibles</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Terminaux supplémentaires inclus</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">API dédiée</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Multi-établissements</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Account manager dédié</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">SLA garanti 99.9%</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Formation sur site</span>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Nous contacter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Informations sur les frais de transaction
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-2" />
                  Inclus dans tous les forfaits :
                </h4>
                <ul className="space-y-2 pl-7">
                  <li className="text-sm text-gray-700">✓ Visa, Mastercard, American Express</li>
                  <li className="text-sm text-gray-700">✓ Paiements sans contact (NFC)</li>
                  <li className="text-sm text-gray-700">✓ Virements bancaires quotidiens</li>
                  <li className="text-sm text-gray-700">✓ Aucun frais de configuration</li>
                  <li className="text-sm text-gray-700">✓ Aucun engagement de durée</li>
                  <li className="text-sm text-gray-700">✓ Certificat PCI-DSS inclus</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  Sécurité & Conformité :
                </h4>
                <ul className="space-y-2 pl-7">
                  <li className="text-sm text-gray-700">✓ Chiffrement de bout en bout</li>
                  <li className="text-sm text-gray-700">✓ 3D Secure 2.0</li>
                  <li className="text-sm text-gray-700">✓ Tokenisation des cartes</li>
                  <li className="text-sm text-gray-700">✓ Fraude detection en temps réel</li>
                  <li className="text-sm text-gray-700">✓ Conformité DSP2</li>
                  <li className="text-sm text-gray-700">✓ Assurance jusqu'à 1M CHF</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                * Les taux de transaction peuvent varier selon le volume mensuel et le type de carte. 
                Contactez-nous pour un devis personnalisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comparaison des fonctionnalités
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez la solution parfaite pour votre entreprise
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Fonctionnalités
                    </th>
                    {posPackages.map((pkg) => (
                      <th key={pkg.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    'Utilisateurs illimités',
                    'Fonctionnement hors ligne',
                    'Gestion multi-menus',
                    'Support écran cuisine (KDS)',
                    'Portail de gestion en ligne',
                    'Application de rapport mobile',
                  ].map((feature, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 text-sm text-gray-700">{feature}</td>
                      {posPackages.map((pkg) => (
                        <td key={pkg.id} className="px-6 py-4 text-center">
                          <Check className="h-5 w-5 text-blue-600 mx-auto" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Puis-je changer de forfait à tout moment ?',
                answer: 'Oui, vous pouvez passer à un forfait supérieur ou inférieur à tout moment. Les changements prennent effet immédiatement.',
              },
              {
                question: 'Y a-t-il des frais de configuration ?',
                answer: 'Non, tous nos forfaits sont sans frais de configuration. Vous ne payez que l\'abonnement mensuel.',
              },
              {
                question: 'Quel est le mode de paiement accepté ?',
                answer: 'Nous acceptons les cartes de crédit, virements bancaires et prélèvements automatiques.',
              },
              {
                question: 'Proposez-vous une période d\'essai ?',
                answer: 'Oui, tous nos forfaits incluent une période d\'essai gratuite de 14 jours sans engagement.',
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Terminaux de Paiement Section */}
      {console.log('Terminals count:', terminals.length, terminals)}
      {terminals.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos Terminaux de Paiement
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nos terminaux professionnels pour accepter tous les paiements
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {terminals.map((terminal) => {
                const priceDisplay = terminal.priceType === 'one-time' 
                  ? `${terminal.currency || 'CHF'} ${terminal.price}`
                  : `${terminal.currency || 'CHF'} ${terminal.price}/${terminal.billingPeriod === 'yearly' ? 'an' : 'mois'}`;

                return (
                  <Card key={terminal.id} className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-300">
                    <CardHeader className="text-center pb-4">
                      {terminal.image && (
                        <img 
                          src={terminal.image} 
                          alt={terminal.name}
                          className="w-32 h-32 mx-auto object-contain mb-4"
                        />
                      )}
                      <CardTitle className="text-xl mb-2">{terminal.name}</CardTitle>
                      <CardDescription>{terminal.description || terminal.tagline}</CardDescription>
                      <div className="mt-4">
                        <div className="text-3xl font-bold text-blue-600">
                          {priceDisplay}
                        </div>
                        {terminal.priceType === 'one-time' && (
                          <div className="text-sm text-gray-500 mt-1">Achat unique</div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {terminal.features && terminal.features.length > 0 && (
                        <ul className="space-y-2">
                          {terminal.features.slice(0, 5).map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link to="/contact" className="block mt-6">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Commander
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Besoin d'une solution personnalisée ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contactez-nous pour un forfait adapté à vos besoins spécifiques
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Nous contacter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { posPackages } from '../data/mockData';

const Pricing = () => {
  const { t } = useTranslation();
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const calculatePrice = (price) => {
    if (billingPeriod === 'yearly') {
      return Math.round(price * 0.8); // 20% discount for yearly
    }
    return price;
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t('pricing.subtitle')}
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

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posPackages.map((pkg) => {
              const price = calculatePrice(pkg.price);
              const savings = pkg.price - price;

              return (
                <Card
                  key={pkg.id}
                  className={`relative flex flex-col ${
                    pkg.recommended
                      ? 'border-blue-600 border-2 shadow-2xl'
                      : 'border-gray-200'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        Le plus populaire
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                    <CardDescription className="text-base mb-4">
                      {pkg.tagline}
                    </CardDescription>

                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          €{price}
                        </span>
                        <span className="text-gray-600 ml-2">/mois</span>
                      </div>
                      {billingPeriod === 'yearly' && savings > 0 && (
                        <p className="text-sm text-green-600 font-medium">
                          Économisez €{savings}/mois
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
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{feature}</span>
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

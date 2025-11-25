import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Truck, MapPin, Package, Zap, Users, TrendingUp, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeliveryServicePricing = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('deliveryServicePricing.plans.starter.name'),
      price: '39€',
      period: t('deliveryServicePricing.perMonth'),
      color: 'blue',
      icon: <Package className="w-12 h-12" />,
      description: t('deliveryServicePricing.plans.starter.description'),
      features: [
        t('deliveryServicePricing.plans.starter.features.0'),
        t('deliveryServicePricing.plans.starter.features.1'),
        t('deliveryServicePricing.plans.starter.features.2'),
        t('deliveryServicePricing.plans.starter.features.3'),
        t('deliveryServicePricing.plans.starter.features.4'),
        t('deliveryServicePricing.plans.starter.features.5')
      ],
      recommended: false
    },
    {
      name: t('deliveryServicePricing.plans.business.name'),
      price: '79€',
      period: t('deliveryServicePricing.perMonth'),
      color: 'green',
      icon: <Truck className="w-12 h-12" />,
      description: t('deliveryServicePricing.plans.business.description'),
      features: [
        t('deliveryServicePricing.plans.business.features.0'),
        t('deliveryServicePricing.plans.business.features.1'),
        t('deliveryServicePricing.plans.business.features.2'),
        t('deliveryServicePricing.plans.business.features.3'),
        t('deliveryServicePricing.plans.business.features.4'),
        t('deliveryServicePricing.plans.business.features.5'),
        t('deliveryServicePricing.plans.business.features.6'),
        t('deliveryServicePricing.plans.business.features.7')
      ],
      recommended: true
    },
    {
      name: t('deliveryServicePricing.plans.enterprise.name'),
      price: '149€',
      period: t('deliveryServicePricing.perMonth'),
      color: 'purple',
      icon: <MapPin className="w-12 h-12" />,
      description: t('deliveryServicePricing.plans.enterprise.description'),
      features: [
        t('deliveryServicePricing.plans.enterprise.features.0'),
        t('deliveryServicePricing.plans.enterprise.features.1'),
        t('deliveryServicePricing.plans.enterprise.features.2'),
        t('deliveryServicePricing.plans.enterprise.features.3'),
        t('deliveryServicePricing.plans.enterprise.features.4'),
        t('deliveryServicePricing.plans.enterprise.features.5'),
        t('deliveryServicePricing.plans.enterprise.features.6'),
        t('deliveryServicePricing.plans.enterprise.features.7'),
        t('deliveryServicePricing.plans.enterprise.features.8'),
        t('deliveryServicePricing.plans.enterprise.features.9')
      ],
      recommended: false
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: t('deliveryServicePricing.benefits.speed.title'),
      description: t('deliveryServicePricing.benefits.speed.description')
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: t('deliveryServicePricing.benefits.satisfaction.title'),
      description: t('deliveryServicePricing.benefits.satisfaction.description')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: t('deliveryServicePricing.benefits.revenue.title'),
      description: t('deliveryServicePricing.benefits.revenue.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: t('deliveryServicePricing.benefits.reliability.title'),
      description: t('deliveryServicePricing.benefits.reliability.description')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'from-blue-500 to-blue-700',
        button: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600',
        ring: 'ring-blue-500'
      },
      green: {
        bg: 'from-green-500 to-green-700',
        button: 'bg-green-600 hover:bg-green-700',
        text: 'text-green-600',
        ring: 'ring-green-500'
      },
      purple: {
        bg: 'from-purple-500 to-purple-700',
        button: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600',
        ring: 'ring-purple-500'
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block bg-green-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {t('deliveryServicePricing.hero.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('deliveryServicePricing.hero.title')}
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            {t('deliveryServicePricing.hero.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold">{t('deliveryServicePricing.hero.trial')}</span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('deliveryServicePricing.plansSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('deliveryServicePricing.plansSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const colors = getColorClasses(plan.color);
              return (
                <div 
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 ${
                    plan.recommended ? `ring-4 ${colors.ring} scale-105` : ''
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm z-10">
                      {t('deliveryServicePricing.recommended')}
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${colors.bg} text-white p-8 text-center`}>
                    <div className="flex justify-center mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm opacity-90 mb-6">{plan.description}</p>
                    <div className="text-5xl font-bold mb-2">{plan.price}</div>
                    <p className="text-sm opacity-90">{plan.period}</p>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full ${colors.button} text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg`}>
                      {t('deliveryServicePricing.selectPlan')}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('deliveryServicePricing.benefitsSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('deliveryServicePricing.benefitsSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('deliveryServicePricing.comparison.title')}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <th className="p-4 text-left font-semibold">{t('deliveryServicePricing.comparison.feature')}</th>
                  <th className="p-4 text-center font-semibold">{t('deliveryServicePricing.plans.starter.name')}</th>
                  <th className="p-4 text-center font-semibold">{t('deliveryServicePricing.plans.business.name')}</th>
                  <th className="p-4 text-center font-semibold">{t('deliveryServicePricing.plans.enterprise.name')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-green-50">
                  <td className="p-4 font-medium">{t('deliveryServicePricing.comparison.orders')}</td>
                  <td className="p-4 text-center">200/mois</td>
                  <td className="p-4 text-center">1000/mois</td>
                  <td className="p-4 text-center">Illimité</td>
                </tr>
                <tr className="border-b hover:bg-green-50 bg-gray-50">
                  <td className="p-4 font-medium">{t('deliveryServicePricing.comparison.tracking')}</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-green-50">
                  <td className="p-4 font-medium">{t('deliveryServicePricing.comparison.couriers')}</td>
                  <td className="p-4 text-center">2</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">Illimité</td>
                </tr>
                <tr className="border-b hover:bg-green-50 bg-gray-50">
                  <td className="p-4 font-medium">{t('deliveryServicePricing.comparison.support')}</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Email + Chat</td>
                  <td className="p-4 text-center">24/7 Prioritaire</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('deliveryServicePricing.cta.title')}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {t('deliveryServicePricing.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                {t('deliveryServicePricing.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryServicePricing;
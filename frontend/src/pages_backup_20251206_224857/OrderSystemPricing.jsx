import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Zap, Package, Smartphone, Globe, Users, TrendingUp, Clock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSystemPricing = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('orderSystemPricing.plans.basic.name'),
      price: '49CHF',
      period: t('orderSystemPricing.perMonth'),
      color: 'blue',
      icon: <Package className="w-12 h-12" />,
      description: t('orderSystemPricing.plans.basic.description'),
      features: [
        t('orderSystemPricing.plans.basic.features.0'),
        t('orderSystemPricing.plans.basic.features.1'),
        t('orderSystemPricing.plans.basic.features.2'),
        t('orderSystemPricing.plans.basic.features.3'),
        t('orderSystemPricing.plans.basic.features.4'),
        t('orderSystemPricing.plans.basic.features.5'),
        t('orderSystemPricing.plans.basic.features.6')
      ],
      recommended: false
    },
    {
      name: t('orderSystemPricing.plans.standard.name'),
      price: '99CHF',
      period: t('orderSystemPricing.perMonth'),
      color: 'green',
      icon: <Smartphone className="w-12 h-12" />,
      description: t('orderSystemPricing.plans.standard.description'),
      features: [
        t('orderSystemPricing.plans.standard.features.0'),
        t('orderSystemPricing.plans.standard.features.1'),
        t('orderSystemPricing.plans.standard.features.2'),
        t('orderSystemPricing.plans.standard.features.3'),
        t('orderSystemPricing.plans.standard.features.4'),
        t('orderSystemPricing.plans.standard.features.5'),
        t('orderSystemPricing.plans.standard.features.6'),
        t('orderSystemPricing.plans.standard.features.7'),
        t('orderSystemPricing.plans.standard.features.8')
      ],
      recommended: true
    },
    {
      name: t('orderSystemPricing.plans.premium.name'),
      price: '199CHF',
      period: t('orderSystemPricing.perMonth'),
      color: 'purple',
      icon: <Globe className="w-12 h-12" />,
      description: t('orderSystemPricing.plans.premium.description'),
      features: [
        t('orderSystemPricing.plans.premium.features.0'),
        t('orderSystemPricing.plans.premium.features.1'),
        t('orderSystemPricing.plans.premium.features.2'),
        t('orderSystemPricing.plans.premium.features.3'),
        t('orderSystemPricing.plans.premium.features.4'),
        t('orderSystemPricing.plans.premium.features.5'),
        t('orderSystemPricing.plans.premium.features.6'),
        t('orderSystemPricing.plans.premium.features.7'),
        t('orderSystemPricing.plans.premium.features.8'),
        t('orderSystemPricing.plans.premium.features.9'),
        t('orderSystemPricing.plans.premium.features.10')
      ],
      recommended: false
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: t('orderSystemPricing.benefits.sales.title'),
      description: t('orderSystemPricing.benefits.sales.description')
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: t('orderSystemPricing.benefits.customers.title'),
      description: t('orderSystemPricing.benefits.customers.description')
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: t('orderSystemPricing.benefits.automation.title'),
      description: t('orderSystemPricing.benefits.automation.description')
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      title: t('orderSystemPricing.benefits.integration.title'),
      description: t('orderSystemPricing.benefits.integration.description')
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block bg-blue-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {t('orderSystemPricing.hero.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('orderSystemPricing.hero.title')}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {t('orderSystemPricing.hero.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold">{t('orderSystemPricing.hero.trial')}</span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('orderSystemPricing.plansSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('orderSystemPricing.plansSection.subtitle')}
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
                      {t('orderSystemPricing.recommended')}
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
                      {t('orderSystemPricing.selectPlan')}
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('orderSystemPricing.benefitsSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('orderSystemPricing.benefitsSection.subtitle')}
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              {t('orderSystemPricing.faq.title')}
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t('orderSystemPricing.faq.q1.question')}
                </h3>
                <p className="text-gray-600">
                  {t('orderSystemPricing.faq.q1.answer')}
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t('orderSystemPricing.faq.q2.question')}
                </h3>
                <p className="text-gray-600">
                  {t('orderSystemPricing.faq.q2.answer')}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t('orderSystemPricing.faq.q3.question')}
                </h3>
                <p className="text-gray-600">
                  {t('orderSystemPricing.faq.q3.answer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('orderSystemPricing.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('orderSystemPricing.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                {t('orderSystemPricing.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderSystemPricing;
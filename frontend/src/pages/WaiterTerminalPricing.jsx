import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Tablet, Users, Zap, TrendingUp, Clock, Shield, Package, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const WaiterTerminalPricing = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('waiterTerminalPricing.plans.starter.name'),
      price: '59€',
      period: t('waiterTerminalPricing.perMonth'),
      color: 'blue',
      icon: <Tablet className="w-12 h-12" />,
      description: t('waiterTerminalPricing.plans.starter.description'),
      terminals: '2 tablettes',
      features: [
        t('waiterTerminalPricing.plans.starter.features.0'),
        t('waiterTerminalPricing.plans.starter.features.1'),
        t('waiterTerminalPricing.plans.starter.features.2'),
        t('waiterTerminalPricing.plans.starter.features.3'),
        t('waiterTerminalPricing.plans.starter.features.4'),
        t('waiterTerminalPricing.plans.starter.features.5'),
        t('waiterTerminalPricing.plans.starter.features.6')
      ],
      recommended: false
    },
    {
      name: t('waiterTerminalPricing.plans.professional.name'),
      price: '119€',
      period: t('waiterTerminalPricing.perMonth'),
      color: 'green',
      icon: <Users className="w-12 h-12" />,
      description: t('waiterTerminalPricing.plans.professional.description'),
      terminals: '5 tablettes',
      features: [
        t('waiterTerminalPricing.plans.professional.features.0'),
        t('waiterTerminalPricing.plans.professional.features.1'),
        t('waiterTerminalPricing.plans.professional.features.2'),
        t('waiterTerminalPricing.plans.professional.features.3'),
        t('waiterTerminalPricing.plans.professional.features.4'),
        t('waiterTerminalPricing.plans.professional.features.5'),
        t('waiterTerminalPricing.plans.professional.features.6'),
        t('waiterTerminalPricing.plans.professional.features.7'),
        t('waiterTerminalPricing.plans.professional.features.8')
      ],
      recommended: true
    },
    {
      name: t('waiterTerminalPricing.plans.enterprise.name'),
      price: '219€',
      period: t('waiterTerminalPricing.perMonth'),
      color: 'purple',
      icon: <Zap className="w-12 h-12" />,
      description: t('waiterTerminalPricing.plans.enterprise.description'),
      terminals: 'Illimitées',
      features: [
        t('waiterTerminalPricing.plans.enterprise.features.0'),
        t('waiterTerminalPricing.plans.enterprise.features.1'),
        t('waiterTerminalPricing.plans.enterprise.features.2'),
        t('waiterTerminalPricing.plans.enterprise.features.3'),
        t('waiterTerminalPricing.plans.enterprise.features.4'),
        t('waiterTerminalPricing.plans.enterprise.features.5'),
        t('waiterTerminalPricing.plans.enterprise.features.6'),
        t('waiterTerminalPricing.plans.enterprise.features.7'),
        t('waiterTerminalPricing.plans.enterprise.features.8'),
        t('waiterTerminalPricing.plans.enterprise.features.9'),
        t('waiterTerminalPricing.plans.enterprise.features.10')
      ],
      recommended: false
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: t('waiterTerminalPricing.benefits.efficiency.title'),
      description: t('waiterTerminalPricing.benefits.efficiency.description')
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: t('waiterTerminalPricing.benefits.speed.title'),
      description: t('waiterTerminalPricing.benefits.speed.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: t('waiterTerminalPricing.benefits.errors.title'),
      description: t('waiterTerminalPricing.benefits.errors.description')
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      title: t('waiterTerminalPricing.benefits.management.title'),
      description: t('waiterTerminalPricing.benefits.management.description')
    }
  ];

  const hardwareOptions = [
    {
      name: t('waiterTerminalPricing.hardware.tablet.name'),
      price: '399€',
      description: t('waiterTerminalPricing.hardware.tablet.description'),
      features: [
        t('waiterTerminalPricing.hardware.tablet.features.0'),
        t('waiterTerminalPricing.hardware.tablet.features.1'),
        t('waiterTerminalPricing.hardware.tablet.features.2'),
        t('waiterTerminalPricing.hardware.tablet.features.3')
      ]
    },
    {
      name: t('waiterTerminalPricing.hardware.printer.name'),
      price: '249€',
      description: t('waiterTerminalPricing.hardware.printer.description'),
      features: [
        t('waiterTerminalPricing.hardware.printer.features.0'),
        t('waiterTerminalPricing.hardware.printer.features.1'),
        t('waiterTerminalPricing.hardware.printer.features.2')
      ]
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
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block bg-blue-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {t('waiterTerminalPricing.hero.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('waiterTerminalPricing.hero.title')}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {t('waiterTerminalPricing.hero.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold">{t('waiterTerminalPricing.hero.trial')}</span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('waiterTerminalPricing.plansSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('waiterTerminalPricing.plansSection.subtitle')}
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
                      {t('waiterTerminalPricing.recommended')}
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${colors.bg} text-white p-8 text-center`}>
                    <div className="flex justify-center mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{plan.description}</p>
                    <div className="bg-white/20 px-4 py-2 rounded-full inline-block mb-4">
                      <span className="text-sm font-semibold">{plan.terminals}</span>
                    </div>
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
                      {t('waiterTerminalPricing.selectPlan')}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hardware Options */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('waiterTerminalPricing.hardwareSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('waiterTerminalPricing.hardwareSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hardwareOptions.map((hardware, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {hardware.name}
                    </h3>
                    <p className="text-gray-600">{hardware.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{hardware.price}</div>
                    <div className="text-sm text-gray-500">{t('waiterTerminalPricing.oneTime')}</div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {hardware.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                  {t('waiterTerminalPricing.addToCart')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('waiterTerminalPricing.benefitsSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('waiterTerminalPricing.benefitsSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300"
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

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('waiterTerminalPricing.comparison.title')}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="p-4 text-left font-semibold">{t('waiterTerminalPricing.comparison.feature')}</th>
                  <th className="p-4 text-center font-semibold">{t('waiterTerminalPricing.plans.starter.name')}</th>
                  <th className="p-4 text-center font-semibold">{t('waiterTerminalPricing.plans.professional.name')}</th>
                  <th className="p-4 text-center font-semibold">{t('waiterTerminalPricing.plans.enterprise.name')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-blue-50">
                  <td className="p-4 font-medium">{t('waiterTerminalPricing.comparison.tablets')}</td>
                  <td className="p-4 text-center">2</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center">Illimité</td>
                </tr>
                <tr className="border-b hover:bg-blue-50 bg-gray-50">
                  <td className="p-4 font-medium">{t('waiterTerminalPricing.comparison.tables')}</td>
                  <td className="p-4 text-center">20</td>
                  <td className="p-4 text-center">100</td>
                  <td className="p-4 text-center">Illimité</td>
                </tr>
                <tr className="border-b hover:bg-blue-50">
                  <td className="p-4 font-medium">{t('waiterTerminalPricing.comparison.kitchen')}</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-blue-50 bg-gray-50">
                  <td className="p-4 font-medium">{t('waiterTerminalPricing.comparison.analytics')}</td>
                  <td className="p-4 text-center">{t('waiterTerminalPricing.comparison.basic')}</td>
                  <td className="p-4 text-center">{t('waiterTerminalPricing.comparison.advanced')}</td>
                  <td className="p-4 text-center">{t('waiterTerminalPricing.comparison.complete')}</td>
                </tr>
                <tr className="border-b hover:bg-blue-50">
                  <td className="p-4 font-medium">{t('waiterTerminalPricing.comparison.support')}</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Email + Chat</td>
                  <td className="p-4 text-center">24/7 Dédié</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('waiterTerminalPricing.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('waiterTerminalPricing.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                {t('waiterTerminalPricing.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaiterTerminalPricing;

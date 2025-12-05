import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Monitor, Smartphone, Tv, Zap, Package, Shield, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const KioskPricing = () => {
  const { t } = useTranslation();

  const kioskModels = [
    {
      name: t('kioskPricing.models.small.name'),
      size: t('kioskPricing.models.small.size'),
      screen: t('kioskPricing.models.small.screen'),
      price: '1 499CHF',
      color: 'blue',
      icon: <Smartphone className="w-16 h-16" />,
      image: 'https://images.unsplash.com/photo-1764795849694-34b3316b3de4?w=600&h=800&fit=crop',
      features: [
        t('kioskPricing.models.small.features.0'),
        t('kioskPricing.models.small.features.1'),
        t('kioskPricing.models.small.features.2'),
        t('kioskPricing.models.small.features.3'),
        t('kioskPricing.models.small.features.4'),
        t('kioskPricing.models.small.features.5'),
        t('kioskPricing.models.small.features.6'),
        t('kioskPricing.models.small.features.7')
      ],
      recommended: false
    },
    {
      name: t('kioskPricing.models.medium.name'),
      size: t('kioskPricing.models.medium.size'),
      screen: t('kioskPricing.models.medium.screen'),
      price: '2 299CHF',
      color: 'green',
      icon: <Monitor className="w-16 h-16" />,
      image: 'https://images.unsplash.com/photo-1609951734391?w=600&h=800&fit=crop',
      features: [
        t('kioskPricing.models.medium.features.0'),
        t('kioskPricing.models.medium.features.1'),
        t('kioskPricing.models.medium.features.2'),
        t('kioskPricing.models.medium.features.3'),
        t('kioskPricing.models.medium.features.4'),
        t('kioskPricing.models.medium.features.5'),
        t('kioskPricing.models.medium.features.6'),
        t('kioskPricing.models.medium.features.7'),
        t('kioskPricing.models.medium.features.8'),
        t('kioskPricing.models.medium.features.9')
      ],
      recommended: true
    },
    {
      name: t('kioskPricing.models.large.name'),
      size: t('kioskPricing.models.large.size'),
      screen: t('kioskPricing.models.large.screen'),
      price: '3 499CHF',
      color: 'purple',
      icon: <Tv className="w-16 h-16" />,
      image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600&h=800&fit=crop',
      features: [
        t('kioskPricing.models.large.features.0'),
        t('kioskPricing.models.large.features.1'),
        t('kioskPricing.models.large.features.2'),
        t('kioskPricing.models.large.features.3'),
        t('kioskPricing.models.large.features.4'),
        t('kioskPricing.models.large.features.5'),
        t('kioskPricing.models.large.features.6'),
        t('kioskPricing.models.large.features.7'),
        t('kioskPricing.models.large.features.8'),
        t('kioskPricing.models.large.features.9'),
        t('kioskPricing.models.large.features.10'),
        t('kioskPricing.models.large.features.11')
      ],
      recommended: false
    }
  ];

  const commonFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: t('kioskPricing.commonFeatures.warranty.title'),
      description: t('kioskPricing.commonFeatures.warranty.description')
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-green-600" />,
      title: t('kioskPricing.commonFeatures.support.title'),
      description: t('kioskPricing.commonFeatures.support.description')
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: t('kioskPricing.commonFeatures.installation.title'),
      description: t('kioskPricing.commonFeatures.installation.description')
    },
    {
      icon: <Package className="w-8 h-8 text-orange-600" />,
      title: t('kioskPricing.commonFeatures.software.title'),
      description: t('kioskPricing.commonFeatures.software.description')
    }
  ];

  const getColorClasses = (color, recommended) => {
    const colors = {
      blue: {
        bg: 'from-blue-500 to-blue-700',
        badge: 'bg-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        border: 'border-blue-200',
        text: 'text-blue-600'
      },
      green: {
        bg: 'from-green-500 to-green-700',
        badge: 'bg-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        border: 'border-green-200',
        text: 'text-green-600'
      },
      purple: {
        bg: 'from-purple-500 to-purple-700',
        badge: 'bg-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        border: 'border-purple-200',
        text: 'text-purple-600'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('kioskPricing.hero.title')}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {t('kioskPricing.hero.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold">{t('kioskPricing.hero.badge')}</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {kioskModels.map((model, index) => {
              const colors = getColorClasses(model.color, model.recommended);
              return (
                <div 
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 ${
                    model.recommended ? 'ring-4 ring-green-500 scale-105' : ''
                  }`}
                >
                  {model.recommended && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm">
                      {t('kioskPricing.recommended')}
                    </div>
                  )}
                  
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${colors.bg} text-white p-8 text-center`}>
                    <div className="flex justify-center mb-4">
                      {model.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{model.size}</p>
                    <div className="text-4xl font-bold mb-2">{model.price}</div>
                    <p className="text-sm opacity-90">{t('kioskPricing.oneTime')}</p>
                  </div>

                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <div className="mb-6">
                      <div className={`inline-block ${colors.badge} text-white px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                        {model.screen}
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {model.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full ${colors.button} text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg`}>
                      {t('kioskPricing.orderNow')}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('kioskPricing.included.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('kioskPricing.included.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commonFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('kioskPricing.comparison.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('kioskPricing.comparison.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <th className="p-4 text-left font-semibold">{t('kioskPricing.comparison.feature')}</th>
                  <th className="p-4 text-center font-semibold">{t('kioskPricing.models.small.name')}</th>
                  <th className="p-4 text-center font-semibold">{t('kioskPricing.models.medium.name')}</th>
                  <th className="p-4 text-center font-semibold">{t('kioskPricing.models.large.name')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-blue-50">
                  <td className="p-4 font-medium">{t('kioskPricing.comparison.screenSize')}</td>
                  <td className="p-4 text-center">15.6"</td>
                  <td className="p-4 text-center">21.5"</td>
                  <td className="p-4 text-center">32"</td>
                </tr>
                <tr className="border-b hover:bg-blue-50 bg-gray-50">
                  <td className="p-4 font-medium">{t('kioskPricing.comparison.touchscreen')}</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-blue-50">
                  <td className="p-4 font-medium">{t('kioskPricing.comparison.printer')}</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-blue-50 bg-gray-50">
                  <td className="p-4 font-medium">{t('kioskPricing.comparison.cardReader')}</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-blue-50">
                  <td className="p-4 font-medium">{t('kioskPricing.comparison.speakers')}</td>
                  <td className="p-4 text-center">Standard</td>
                  <td className="p-4 text-center">Premium</td>
                  <td className="p-4 text-center">Premium HD</td>
                </tr>
                <tr className="border-b hover:bg-blue-50 bg-gray-50">
                  <td className="p-4 font-medium">{t('kioskPricing.comparison.customization')}</td>
                  <td className="p-4 text-center">{t('kioskPricing.comparison.basic')}</td>
                  <td className="p-4 text-center">{t('kioskPricing.comparison.advanced')}</td>
                  <td className="p-4 text-center">{t('kioskPricing.comparison.complete')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('kioskPricing.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('kioskPricing.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                {t('kioskPricing.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KioskPricing;

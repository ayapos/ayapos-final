import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Navigation, Battery, AlertTriangle, Weight, Sparkles, Clock, Shield, TrendingUp, Zap } from 'lucide-react';

const RobotWaiterComplete = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Navigation className="w-12 h-12 text-blue-600" />,
      title: t('robotWaiter.features.navigation.title'),
      description: t('robotWaiter.features.navigation.description')
    },
    {
      icon: <Weight className="w-12 h-12 text-blue-600" />,
      title: t('robotWaiter.features.capacity.title'),
      description: t('robotWaiter.features.capacity.description')
    },
    {
      icon: <Battery className="w-12 h-12 text-blue-600" />,
      title: t('robotWaiter.features.battery.title'),
      description: t('robotWaiter.features.battery.description')
    },
    {
      icon: <AlertTriangle className="w-12 h-12 text-blue-600" />,
      title: t('robotWaiter.features.speedLimit.title'),
      description: t('robotWaiter.features.speedLimit.description')
    }
  ];

  const benefits = [
    {
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: t('robotWaiter.benefits.experience.title'),
      description: t('robotWaiter.benefits.experience.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: t('robotWaiter.benefits.contactless.title'),
      description: t('robotWaiter.benefits.contactless.description')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: t('robotWaiter.benefits.profitability.title'),
      description: t('robotWaiter.benefits.profitability.description')
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: t('robotWaiter.benefits.efficiency.title'),
      description: t('robotWaiter.benefits.efficiency.description')
    }
  ];

  const deliveryFeatures = [
    {
      title: t('robotWaiter.delivery.speed.title'),
      description: t('robotWaiter.delivery.speed.description')
    },
    {
      title: t('robotWaiter.delivery.accuracy.title'),
      description: t('robotWaiter.delivery.accuracy.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-blue-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold">
                {t('robotWaiter.hero.badge')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('robotWaiter.hero.title')}
              </h1>
              <p className="text-xl text-blue-100">
                {t('robotWaiter.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  {t('robotWaiter.hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop" 
                  alt="Robot Waiter"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('robotWaiter.benefits.mainTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('robotWaiter.benefits.mainSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autonomous Navigation Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=600&fit=crop"
                alt="Autonomous Navigation"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('robotWaiter.navigation.badge')}
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                {t('robotWaiter.navigation.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('robotWaiter.navigation.description1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('robotWaiter.navigation.description2')}
              </p>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
                {t('robotWaiter.navigation.cta')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Profitability Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('robotWaiter.profitability.badge')}
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                {t('robotWaiter.profitability.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('robotWaiter.profitability.description1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('robotWaiter.profitability.description2')}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
                  <div className="text-sm text-gray-600">{t('robotWaiter.profitability.stat1')}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">{t('robotWaiter.profitability.stat2')}</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Profitability"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Automatic Delivery System */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('robotWaiter.delivery.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('robotWaiter.delivery.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop"
                alt="Automatic Delivery"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              {deliveryFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('robotWaiter.technicalFeatures.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('robotWaiter.technicalFeatures.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('robotWaiter.gallery.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('robotWaiter.gallery.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1561144257-e32e7a75ff0d?w=600&h=400&fit=crop"
                alt="Robot Waiter 1"
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-6 font-semibold">{t('robotWaiter.gallery.image1')}</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1581092583537-20d51876f1e6?w=600&h=400&fit=crop"
                alt="Robot Waiter 2"
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-6 font-semibold">{t('robotWaiter.gallery.image2')}</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop"
                alt="Robot Waiter 3"
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-6 font-semibold">{t('robotWaiter.gallery.image3')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('robotWaiter.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('robotWaiter.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
              {t('robotWaiter.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RobotWaiterComplete;

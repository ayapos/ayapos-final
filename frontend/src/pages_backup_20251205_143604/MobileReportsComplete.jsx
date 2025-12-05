import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Smartphone, BarChart3, TrendingUp, Clock, Package, DollarSign, Users, Cloud, Settings, Download } from 'lucide-react';

const MobileReportsComplete = () => {
  const { t } = useTranslation();

  const mainFeatures = [
    {
      icon: <Smartphone className="w-12 h-12 text-blue-600" />,
      title: t('mobileReports.features.mobile.title'),
      description: t('mobileReports.features.mobile.description')
    },
    {
      icon: <Cloud className="w-12 h-12 text-blue-600" />,
      title: t('mobileReports.features.cloud.title'),
      description: t('mobileReports.features.cloud.description')
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: t('mobileReports.features.analytics.title'),
      description: t('mobileReports.features.analytics.description')
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: t('mobileReports.features.accounts.title'),
      description: t('mobileReports.features.accounts.description')
    }
  ];

  const summaryFeatures = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: t('mobileReports.summary.bestSellers.title'),
      description: t('mobileReports.summary.bestSellers.description')
    },
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: t('mobileReports.summary.dayEnd.title'),
      description: t('mobileReports.summary.dayEnd.description')
    },
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: t('mobileReports.summary.stock.title'),
      description: t('mobileReports.summary.stock.description')
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: t('mobileReports.summary.insights.title'),
      description: t('mobileReports.summary.insights.description')
    }
  ];

  const productFeatures = [
    {
      title: t('mobileReports.products.track.title'),
      description: t('mobileReports.products.track.description')
    },
    {
      title: t('mobileReports.products.search.title'),
      description: t('mobileReports.products.search.description')
    },
    {
      title: t('mobileReports.products.design.title'),
      description: t('mobileReports.products.design.description')
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
                {t('mobileReports.hero.badge')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('mobileReports.hero.title')}
              </h1>
              <p className="text-xl text-blue-100">
                {t('mobileReports.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  {t('mobileReports.hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop" 
                  alt="Mobile Reports"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Reports Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('mobileReports.summarySection.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('mobileReports.summarySection.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('mobileReports.summarySection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {summaryFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">
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

      {/* Product Management Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('mobileReports.productSection.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('mobileReports.productSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('mobileReports.productSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                alt="Product Management"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              {productFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Management Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('mobileReports.business.badge')}
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                {t('mobileReports.business.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('mobileReports.business.description1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('mobileReports.business.description2')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('mobileReports.business.description3')}
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Business Management"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* App Settings Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
                alt="App Settings"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('mobileReports.settings.badge')}
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                {t('mobileReports.settings.title')}
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Settings className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t('mobileReports.settings.account.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('mobileReports.settings.account.description')}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Settings className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t('mobileReports.settings.pos.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('mobileReports.settings.pos.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('mobileReports.featuresGrid.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('mobileReports.featuresGrid.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group text-center"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
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

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              {t('mobileReports.download.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('mobileReports.download.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <Download className="w-5 h-5" />
                App Store
              </button>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <Download className="w-5 h-5" />
                Google Play
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('mobileReports.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('mobileReports.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
              {t('mobileReports.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileReportsComplete;
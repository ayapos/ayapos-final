import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Cloud, BarChart3, Settings, Globe, Lock, Zap, TrendingUp, Users, Package, FileText, Activity } from 'lucide-react';

const WebPortalComplete = () => {
  const { t } = useTranslation();

  const mainFeatures = [
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: t('webPortal.features.reports.title'),
      description: t('webPortal.features.reports.description')
    },
    {
      icon: <Settings className="w-12 h-12 text-blue-600" />,
      title: t('webPortal.features.management.title'),
      description: t('webPortal.features.management.description')
    },
    {
      icon: <Cloud className="w-12 h-12 text-blue-600" />,
      title: t('webPortal.features.central.title'),
      description: t('webPortal.features.central.description')
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      title: t('webPortal.features.compatible.title'),
      description: t('webPortal.features.compatible.description')
    }
  ];

  const reportFeatures = [
    {
      title: t('webPortal.reports.instant.title'),
      description: t('webPortal.reports.instant.description')
    },
    {
      title: t('webPortal.reports.central.title'),
      description: t('webPortal.reports.central.description')
    }
  ];

  const managementFeatures = [
    {
      title: t('webPortal.management.remote.title'),
      description: t('webPortal.management.remote.description')
    },
    {
      title: t('webPortal.management.auto.title'),
      description: t('webPortal.management.auto.description')
    },
    {
      title: t('webPortal.management.unified.title'),
      description: t('webPortal.management.unified.description')
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
                {t('webPortal.hero.badge')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('webPortal.hero.title')}
              </h1>
              <p className="text-xl text-blue-100">
                {t('webPortal.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  {t('webPortal.hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" 
                  alt="Web Portal"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('webPortal.reportsSection.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('webPortal.reportsSection.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('webPortal.reportsSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Reports and Analytics"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              {reportFeatures.map((feature, index) => (
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

      {/* Remote Management Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('webPortal.remoteManagement.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('webPortal.remoteManagement.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('webPortal.remoteManagement.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {managementFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
                alt="Remote Management"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Day End Reports Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('webPortal.dayEnd.badge')}
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                {t('webPortal.dayEnd.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('webPortal.dayEnd.description1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('webPortal.dayEnd.description2')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('webPortal.dayEnd.description3')}
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop"
                alt="Day End Reports"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* System Settings Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('webPortal.settings.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('webPortal.settings.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('webPortal.settings.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Settings className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('webPortal.settings.general.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('webPortal.settings.general.description')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Package className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('webPortal.settings.order.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('webPortal.settings.order.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('webPortal.featuresGrid.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('webPortal.featuresGrid.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group text-center"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('webPortal.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('webPortal.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
              {t('webPortal.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebPortalComplete;
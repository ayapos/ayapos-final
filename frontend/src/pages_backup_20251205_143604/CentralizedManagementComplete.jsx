import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Building2, Users, TrendingUp, Settings, BarChart3, Globe, CheckCircle, Zap, Clock } from 'lucide-react';

const CentralizedManagementComplete = () => {
  const { t } = useTranslation();

  const quickFeatures = [
    {
      icon: <Settings className="w-8 h-8 text-blue-600" />,
      title: t('centralizedManagement.quick.menus.title'),
      description: t('centralizedManagement.quick.menus.description')
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: t('centralizedManagement.quick.movements.title'),
      description: t('centralizedManagement.quick.movements.description')
    },
    {
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      title: t('centralizedManagement.quick.branches.title'),
      description: t('centralizedManagement.quick.branches.description')
    }
  ];

  const controlFeatures = [
    {
      title: t('centralizedManagement.control.supervise.title'),
      description: t('centralizedManagement.control.supervise.description')
    },
    {
      title: t('centralizedManagement.control.update.title'),
      description: t('centralizedManagement.control.update.description')
    },
    {
      title: t('centralizedManagement.control.accounts.title'),
      description: t('centralizedManagement.control.accounts.description')
    }
  ];

  const operationalFeatures = [
    {
      title: t('centralizedManagement.operational.control.title'),
      description: t('centralizedManagement.operational.control.description')
    },
    {
      title: t('centralizedManagement.operational.remote.title'),
      description: t('centralizedManagement.operational.remote.description')
    },
    {
      title: t('centralizedManagement.operational.evaluate.title'),
      description: t('centralizedManagement.operational.evaluate.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-indigo-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold">
                {t('centralizedManagement.hero.badge')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('centralizedManagement.hero.title')}
              </h1>
              <p className="text-xl text-indigo-100">
                {t('centralizedManagement.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  {t('centralizedManagement.hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop" 
                  alt="Centralized Management"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('centralizedManagement.quickSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('centralizedManagement.quickSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    {feature.icon}
                  </div>
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

      {/* Control & Intervention Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('centralizedManagement.controlSection.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('centralizedManagement.controlSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('centralizedManagement.controlSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                alt="Control and Intervention"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              {controlFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-green-600" />
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

      {/* All Branches Under Control Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('centralizedManagement.allBranches.badge')}
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                {t('centralizedManagement.allBranches.title')}
              </h2>
              <div className="space-y-4">
                {operationalFeatures.map((feature, index) => (
                  <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="All Branches"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reports & Analytics Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('centralizedManagement.reports.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('centralizedManagement.reports.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('centralizedManagement.reports.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt="Reports and Analytics"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <Clock className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t('centralizedManagement.reports.instant.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('centralizedManagement.reports.instant.description')}
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <BarChart3 className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t('centralizedManagement.reports.central.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('centralizedManagement.reports.central.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Zap className="w-16 h-16 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">10x</div>
                <p className="text-indigo-100">{t('centralizedManagement.benefits.stat1')}</p>
              </div>
              <div>
                <Globe className="w-16 h-16 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">24/7</div>
                <p className="text-indigo-100">{t('centralizedManagement.benefits.stat2')}</p>
              </div>
              <div>
                <Users className="w-16 h-16 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-indigo-100">{t('centralizedManagement.benefits.stat3')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('centralizedManagement.cta.title')}
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            {t('centralizedManagement.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
              {t('centralizedManagement.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CentralizedManagementComplete;
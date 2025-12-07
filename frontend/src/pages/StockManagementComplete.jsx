import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Package, TrendingUp, AlertCircle, BarChart3, Clipboard, Clock, CheckCircle, Archive } from 'lucide-react';

const StockManagementComplete = () => {
  const { t } = useTranslation();

  const mainBenefits = [
    {
      icon: <TrendingUp className="w-12 h-12 text-green-600" />,
      title: t('stockManagement.benefits.efficiency.title'),
      description: t('stockManagement.benefits.efficiency.description')
    },
    {
      icon: <AlertCircle className="w-12 h-12 text-orange-600" />,
      title: t('stockManagement.benefits.waste.title'),
      description: t('stockManagement.benefits.waste.description')
    }
  ];

  const stockTypes = [
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: t('stockManagement.types.simple.title'),
      description: t('stockManagement.types.simple.description')
    },
    {
      icon: <Clipboard className="w-8 h-8 text-purple-600" />,
      title: t('stockManagement.types.recipe.title'),
      description: t('stockManagement.types.recipe.description')
    }
  ];

  const managementFeatures = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: t('stockManagement.management.movements.title'),
      description: t('stockManagement.management.movements.description')
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: t('stockManagement.management.counting.title'),
      description: t('stockManagement.management.counting.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-green-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold">
                {t('stockManagement.hero.badge')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('stockManagement.hero.title')}
              </h1>
              <p className="text-xl text-green-100">
                {t('stockManagement.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  {t('stockManagement.hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={content?.section_images?.hero_side || "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?w=800&h=600&fit=crop"} 
                  alt="Stock Management"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('stockManagement.benefitsSection.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('stockManagement.benefitsSection.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('stockManagement.benefitsSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mainBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 p-10 rounded-2xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-6 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center text-lg">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Planning Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('stockManagement.recipeSection.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('stockManagement.recipeSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('stockManagement.recipeSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <img 
                src={content?.section_images?.inventory || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"}
                alt="Recipe Management"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              {stockTypes.map((type, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        {type.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Centralized Management Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('stockManagement.centralized.badge')}
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                {t('stockManagement.centralized.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('stockManagement.centralized.description1')}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <Archive className="w-10 h-10 text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">{t('stockManagement.centralized.stat1')}</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                  <Clock className="w-10 h-10 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">{t('stockManagement.centralized.stat2')}</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src={content?.section_images?.analytics || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"}
                alt="Centralized Management"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stock Management Features */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('stockManagement.featuresSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('stockManagement.featuresSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop"
                alt="Stock Features"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              {managementFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
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

      {/* Alert System Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <AlertCircle className="w-16 h-16 mb-6" />
                <h2 className="text-4xl font-bold mb-6">
                  {t('stockManagement.alert.title')}
                </h2>
                <p className="text-xl text-orange-100 mb-6">
                  {t('stockManagement.alert.description')}
                </p>
                <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center gap-2">
                  {t('stockManagement.alert.cta')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?w=600&h=400&fit=crop"
                  alt="Alert System"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('stockManagement.cta.title')}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {t('stockManagement.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
              {t('stockManagement.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StockManagementComplete;
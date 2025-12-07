import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Smartphone, CreditCard, DollarSign, Shield, Clock, Bell, CheckCircle, TrendingUp, Package, Navigation } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DeliveryManagementComplete = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/content/delivery-management`);
        if (response.data.success) {
          setContent(response.data.content);
        }
      } catch (error) {
        console.error('Erreur chargement contenu:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const mainFeatures = [
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: t('deliveryManagement.features.orderDetails.title'),
      description: t('deliveryManagement.features.orderDetails.description')
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: t('deliveryManagement.features.mapView.title'),
      description: t('deliveryManagement.features.mapView.description')
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: t('deliveryManagement.features.callCustomer.title'),
      description: t('deliveryManagement.features.callCustomer.description')
    }
  ];

  const paymentFeatures = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: t('deliveryManagement.payment.cash.title'),
      description: t('deliveryManagement.payment.cash.description')
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: t('deliveryManagement.payment.card.title'),
      description: t('deliveryManagement.payment.card.description')
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: t('deliveryManagement.payment.security.title'),
      description: t('deliveryManagement.payment.security.description')
    }
  ];

  const courierFeatures = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: t('deliveryManagement.courier.reports.title'),
      description: t('deliveryManagement.courier.reports.description')
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: t('deliveryManagement.courier.status.title'),
      description: t('deliveryManagement.courier.status.description')
    },
    {
      icon: <Bell className="w-8 h-8 text-red-600" />,
      title: t('deliveryManagement.courier.notifications.title'),
      description: t('deliveryManagement.courier.notifications.description')
    }
  ];

  const systemFeatures = [
    {
      icon: <Smartphone className="w-12 h-12 text-blue-600" />,
      title: t('deliveryManagement.system.mobile.title'),
      description: t('deliveryManagement.system.mobile.description')
    },
    {
      icon: <Navigation className="w-12 h-12 text-blue-600" />,
      title: t('deliveryManagement.system.cloud.title'),
      description: t('deliveryManagement.system.cloud.description')
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: t('deliveryManagement.system.analytics.title'),
      description: t('deliveryManagement.system.analytics.description')
    },
    {
      icon: <Package className="w-12 h-12 text-blue-600" />,
      title: t('deliveryManagement.system.accounts.title'),
      description: t('deliveryManagement.system.accounts.description')
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
                {t('deliveryManagement.hero.badge')}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('deliveryManagement.hero.title')}
              </h1>
              <p className="text-xl text-blue-100">
                {t('deliveryManagement.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  {t('deliveryManagement.hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={content?.hero_image || "https://images.unsplash.com/photo-1526470498-9ae0538c34a7?w=800&h=600&fit=crop"} 
                  alt="Delivery Management"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Images */}
      {content?.benefits && content.benefits.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Avantages de la Gestion de Livraison
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-blue-100">
                  {benefit.image && (
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-56 object-cover rounded-lg mb-6"
                    />
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
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
      )}

      {/* Order Management Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('deliveryManagement.orderManagement.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('deliveryManagement.orderManagement.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('deliveryManagement.orderManagement.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {mainFeatures.map((feature, index) => (
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

          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={content?.section_images?.mobile_app || "https://images.unsplash.com/photo-1598769398698-bab7f1b4cadd?w=1200&h=600&fit=crop"}
              alt="Order Tracking"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('deliveryManagement.payment.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('deliveryManagement.payment.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('deliveryManagement.payment.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1728044849321?w=800&h=600&fit=crop"
                alt="Payment Methods"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              {paymentFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      {feature.icon}
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

      {/* Courier Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('deliveryManagement.courier.badge')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('deliveryManagement.courier.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('deliveryManagement.courier.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {courierFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      {feature.icon}
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
            <div>
              <img 
                src="https://images.unsplash.com/photo-1593929976216-f746e488aa45?w=800&h=600&fit=crop"
                alt="Courier Management"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* System Features Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('deliveryManagement.systemFeatures.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('deliveryManagement.systemFeatures.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {systemFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
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

      {/* Real-time Tracking Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('deliveryManagement.tracking.badge')}
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                {t('deliveryManagement.tracking.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('deliveryManagement.tracking.description1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('deliveryManagement.tracking.description2')}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('deliveryManagement.tracking.feature1')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('deliveryManagement.tracking.feature2')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('deliveryManagement.tracking.feature3')}</span>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop"
                alt="Real-time Tracking"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('deliveryManagement.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('deliveryManagement.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
              {t('deliveryManagement.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryManagementComplete;

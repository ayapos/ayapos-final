import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, X, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { usePricingPlans } from '../hooks/usePricingPlans';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PricingDynamic = () => {
  const { t } = useTranslation();
  const { plans, loading: plansLoading } = usePricingPlans();
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/content/pricing`);
        if (response.data.success) {
          setPageContent(response.data.content);
        }
      } catch (error) {
        console.error('Error fetching pricing content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const getContentValue = (id) => {
    if (!pageContent || !pageContent.sections) return '';
    const section = pageContent.sections.find(s => s.id === id);
    return section ? section.value : '';
  };

  if (loading || plansLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {getContentValue('pricing-title') || t('pricing.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {getContentValue('pricing-subtitle') || t('pricing.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Cards from Database */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {plans && plans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative flex flex-col overflow-hidden ${
                    plan.highlighted
                      ? 'border-blue-600 border-2 shadow-2xl scale-105'
                      : 'border-gray-200'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Image du plan */}
                  {plan.image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={plan.image} 
                        alt={plan.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">{plan.currency}</span>
                        <span className="text-gray-500 ml-1">/ {plan.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6 flex-1">
                      <ul className="space-y-3">
                        {plan.features && plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            {feature.included ? (
                              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} text-white`}
                      asChild
                    >
                      <Link to="/contact">
                        {plan.buttonText || 'Choisir ce plan'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun plan tarifaire disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PricingDynamic;

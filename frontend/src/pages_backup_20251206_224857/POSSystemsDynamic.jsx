import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { usePageContent } from '../hooks/usePageContent';
import { useProducts } from '../hooks/useProducts';

const POSSystemsDynamic = () => {
  const { t } = useTranslation();
  const { getContentValue, loading } = usePageContent('pos');
  const { products, loading: productsLoading } = useProducts();
  
  const posProducts = products.filter(p => p.category === 'POS' || p.category === 'Tablet' || p.category === 'Mobile');

  if (loading || productsLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {getContentValue('pos-title', 'Systèmes POS')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {getContentValue('pos-subtitle', 'Solutions complètes pour votre commerce')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {product.image && (
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=' + product.name;
                      }}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  {product.price && (
                    <p className="text-3xl font-bold text-blue-600 mb-4">
                      {product.price} {product.currency}
                    </p>
                  )}
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {product.features.slice(0, 5).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button asChild className="w-full">
                    <Link to="/contact">
                      Demander un devis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default POSSystemsDynamic;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const DeliveryManagement = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-blue-500 text-white border-none mb-6">
            Logistique Intelligente
          </Badge>
          <h1 className="text-5xl font-bold mb-6">Gestion de Livraison</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Optimisez vos livraisons avec notre système de gestion intelligent
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              En savoir plus <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Gestion de flotte', desc: 'Suivez tous vos livreurs' },
              { icon: MapPin, title: 'GPS en temps réel', desc: 'Localisation précise' },
              { icon: Clock, title: 'Optimisation routes', desc: 'Livraisons plus rapides' },
              { icon: Users, title: 'Attribution automatique', desc: 'Dispatch intelligent' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx}>
                  <CardHeader>
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryManagement;

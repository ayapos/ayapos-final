import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Zap, Clock, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const RobotWaiter = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-blue-500 text-white border-none mb-6">
            Innovation Technologique
          </Badge>
          <h1 className="text-5xl font-bold mb-6">Serveur Robot</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Robot autonome pour livraison des plats - Le futur du service restauration
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Découvrir <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Bot, title: 'Navigation autonome', desc: 'Se déplace seul en toute sécurité' },
              { icon: Zap, title: 'Service continu', desc: 'Disponible sans interruption' },
              { icon: Clock, title: 'Gain de temps', desc: 'Libère votre personnel' },
              { icon: Shield, title: 'Sécurité maximale', desc: 'Détection d\'obstacles' }
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

export default RobotWaiter;

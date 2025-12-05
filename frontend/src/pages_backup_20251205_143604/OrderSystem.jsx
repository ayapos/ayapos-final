import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Package, Zap, Clock, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const OrderSystem = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-blue-500 text-white border-none mb-6">
            Gestion des commandes
          </Badge>
          <h1 className="text-5xl font-bold mb-6">Système de Commande</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Gérez toutes vos commandes en temps réel avec notre système intelligent
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
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Package, title: 'Gestion centralisée', desc: 'Toutes vos commandes au même endroit' },
              { icon: Zap, title: 'Traitement rapide', desc: 'Optimisez le temps de préparation' },
              { icon: Clock, title: 'Suivi en temps réel', desc: 'Surveillez l\'état de chaque commande' },
              { icon: BarChart3, title: 'Rapports détaillés', desc: 'Analytics et statistiques complètes' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx}>
                  <CardHeader>
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
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

export default OrderSystem;

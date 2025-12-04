import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Code, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ServicesManager = () => {
  const { getAuthHeaders } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => { loadServices(); }, []);

  const loadServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/services/`);
      if (response.data.success) setServices(response.data.services);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveService = async (service) => {
    try {
      if (service.id) {
        await axios.put(`${API_URL}/api/services/${service.id}`, service, { headers: getAuthHeaders() });
      } else {
        await axios.post(`${API_URL}/api/services/`, service, { headers: getAuthHeaders() });
      }
      loadServices();
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm('Supprimer ce service ?')) return;
    try {
      await axios.delete(`${API_URL}/api/services/${serviceId}`, { headers: getAuthHeaders() });
      loadServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const newService = () => {
    setEditingService({ name: '', description: '', icon: '', price: 0, priceType: 'Sur devis', category: '', features: [], active: true, order: services.length });
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center"><Code className="h-6 w-6 mr-2" />Services</h2>
        <Button onClick={newService} className="bg-blue-600 hover:bg-blue-700"><Plus className="h-4 w-4 mr-2" />Nouveau Service</Button>
      </div>
      <div className="p-6">
        {editingService ? (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Nom</label><input type="text" value={editingService.name} onChange={(e) => setEditingService({...editingService, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Cat\u00e9gorie</label><input type="text" value={editingService.category || ''} onChange={(e) => setEditingService({...editingService, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea value={editingService.description} onChange={(e) => setEditingService({...editingService, description: e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Prix</label><input type="number" value={editingService.price || 0} onChange={(e) => setEditingService({...editingService, price: parseFloat(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Type de prix</label><input type="text" value={editingService.priceType || ''} onChange={(e) => setEditingService({...editingService, priceType: e.target.value})} placeholder="Sur devis" className="w-full px-3 py-2 border rounded-lg" /></div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => saveService(editingService)} className="bg-blue-600"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button>
              <Button onClick={() => setEditingService(null)} variant="outline">Annuler</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                <p className="text-lg font-bold text-blue-600 mb-4">{service.price > 0 ? `${service.price} CHF` : service.priceType}</p>
                <div className="flex space-x-2">
                  <Button onClick={() => setEditingService(service)} variant="outline" className="flex-1">Éditer</Button>
                  <Button onClick={() => deleteService(service.id)} variant="ghost" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManager;

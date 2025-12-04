import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Save, Plus, Trash2, Loader2, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PricingManager = () => {
  const { getAuthHeaders } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/pricing/`);
      if (response.data.success) {
        setPlans(response.data.plans);
      }
    } catch (error) {
      console.error('Error loading plans:', error);
      showMessage('error', 'Erreur lors du chargement des plans');
    } finally {
      setLoading(false);
    }
  };

  const savePlan = async (plan) => {
    try {
      setSaving(true);
      if (plan.id) {
        await axios.put(`${API_URL}/api/pricing/${plan.id}`, plan, { headers: getAuthHeaders() });
        showMessage('success', 'Plan mis à jour avec succès !');
      } else {
        await axios.post(`${API_URL}/api/pricing/`, plan, { headers: getAuthHeaders() });
        showMessage('success', 'Plan créé avec succès !');
      }
      loadPlans();
      setEditingPlan(null);
    } catch (error) {
      console.error('Error saving plan:', error);
      showMessage('error', 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const deletePlan = async (planId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce plan ?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/pricing/${planId}`, { headers: getAuthHeaders() });
      showMessage('success', 'Plan supprimé avec succès !');
      loadPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      showMessage('error', 'Erreur lors de la suppression');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const newPlan = () => {
    setEditingPlan({
      name: '',
      price: 0,
      currency: 'CHF',
      period: 'mois',
      description: '',
      features: [{ text: '', included: true }],
      badge: '',
      buttonText: 'Choisir ce plan',
      highlighted: false,
      order: plans.length
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {message.text && (
        <div className={`${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border px-4 py-3 flex items-center space-x-2 rounded-t-lg`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <DollarSign className="h-6 w-6 mr-2" />
          Gestion des Tarifs
        </h2>
        <Button onClick={newPlan} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Plan
        </Button>
      </div>

      <div className="p-6">
        {/* Always show existing plans list */}
        {!editingPlan && plans.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Aucun plan de tarification.</p>
            <p className="text-sm mt-2">Cliquez sur "Nouveau Plan" pour commencer.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Editing Form */}
            {editingPlan && (
              <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {editingPlan.id ? '✏️ Modifier le Plan' : '➕ Créer un Nouveau Plan'}
                  </h3>
                  <Button onClick={() => setEditingPlan(null)} variant="ghost" size="sm">✕</Button>
                </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Plan</label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Ex: Basic, Premium, Enterprise"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({...editingPlan, price: parseFloat(e.target.value)})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <select
                    value={editingPlan.currency}
                    onChange={(e) => setEditingPlan({...editingPlan, currency: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="CHF">CHF</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                  <select
                    value={editingPlan.period}
                    onChange={(e) => setEditingPlan({...editingPlan, period: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="mois">mois</option>
                    <option value="an">an</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge (optionnel)</label>
                <input
                  type="text"
                  value={editingPlan.badge || ''}
                  onChange={(e) => setEditingPlan({...editingPlan, badge: e.target.value})}
                  placeholder="Ex: Populaire, Recommandé"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Texte du Bouton</label>
                <input
                  type="text"
                  value={editingPlan.buttonText}
                  onChange={(e) => setEditingPlan({...editingPlan, buttonText: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Fonctionnalités</label>
                {editingPlan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={feature.included}
                      onChange={(e) => {
                        const newFeatures = [...editingPlan.features];
                        newFeatures[idx].included = e.target.checked;
                        setEditingPlan({...editingPlan, features: newFeatures});
                      }}
                      className="h-4 w-4"
                    />
                    <input
                      type="text"
                      value={feature.text}
                      onChange={(e) => {
                        const newFeatures = [...editingPlan.features];
                        newFeatures[idx].text = e.target.value;
                        setEditingPlan({...editingPlan, features: newFeatures});
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Fonctionnalité"
                    />
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const newFeatures = editingPlan.features.filter((_, i) => i !== idx);
                        setEditingPlan({...editingPlan, features: newFeatures});
                      }}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setEditingPlan({...editingPlan, features: [...editingPlan.features, { text: '', included: true }]})}
                  className="mt-2"
                >
                  + Ajouter Fonctionnalité
                </Button>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingPlan.highlighted}
                  onChange={(e) => setEditingPlan({...editingPlan, highlighted: e.target.checked})}
                  className="h-4 w-4 mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Mettre en avant ce plan</label>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-blue-200">
              <Button onClick={() => savePlan(editingPlan)} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Sauvegarde...</> : <><Save className="h-4 w-4 mr-2" />Sauvegarder</>}
              </Button>
              <Button onClick={() => setEditingPlan(null)} variant="outline">Annuler</Button>
            </div>
              </div>
            )}

            {/* Existing Plans List - Always Visible */}
            {plans.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  📋 Tous les Plans ({plans.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`relative border-2 rounded-lg p-6 transition-all ${
                    editingPlan?.id === plan.id 
                      ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' 
                      : plan.highlighted 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {editingPlan?.id === plan.id && (
                    <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      ✏️ En cours d'édition
                    </div>
                  )}
                  
                  {plan.badge && (
                    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      {plan.badge}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  
                  <div className="text-3xl font-bold mb-2 text-blue-600">
                    {plan.price} {plan.currency}
                    <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 min-h-[40px]">{plan.description || 'Aucune description'}</p>
                  
                  <ul className="space-y-2 mb-6 min-h-[80px]">
                    {plan.features && plan.features.length > 0 ? (
                      plan.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className={`flex items-center text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                          <span className="mr-2">{feature.included ? '✓' : '✗'}</span>
                          {feature.text}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-400">Aucune fonctionnalité</li>
                    )}
                    {plan.features && plan.features.length > 4 && (
                      <li className="text-sm text-gray-500">+ {plan.features.length - 4} autres...</li>
                    )}
                  </ul>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => setEditingPlan(plan)} 
                      variant={editingPlan?.id === plan.id ? "default" : "outline"} 
                      className={`flex-1 ${editingPlan?.id === plan.id ? 'bg-blue-600' : ''}`}
                    >
                      {editingPlan?.id === plan.id ? 'Édition en cours...' : 'Éditer'}
                    </Button>
                    <Button 
                      onClick={() => deletePlan(plan.id)} 
                      variant="ghost" 
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingManager;

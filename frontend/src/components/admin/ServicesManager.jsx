import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Plus, Save, Trash2, Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ServicesManager = () => {
  const { getAuthHeaders } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const r = await axios.get(`${API_URL}/api/services/`); if (r.data.success) setServices(r.data.services); } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/services/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/services/`, item, { headers: getAuthHeaders() });
      showMessage('success', 'Service sauvegardé !');
      load(); setEditing(null);
    } catch (e) { showMessage('error', 'Erreur'); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ce service ?')) return;
    try { await axios.delete(`${API_URL}/api/services/${id}`, { headers: getAuthHeaders() }); showMessage('success', 'Supprimé'); load(); } catch (e) { showMessage('error', 'Erreur'); }
  };

  const showMessage = (type, text) => { setMessage({ type, text }); setTimeout(() => setMessage({ type: '', text: '' }), 3000); };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {message.text && (
        <div className={`${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border px-4 py-3 flex items-center space-x-2 rounded-t-lg`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}<span>{message.text}</span>
        </div>
      )}
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center"><Briefcase className="h-6 w-6 mr-2" />Services</h2>
        <Button onClick={() => setEditing({name:'',description:'',icon:'',features:[],price:0,currency:'CHF',active:true,order:services.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau Service</Button>
      </div>
      
      <div className="p-6">
        {services.length === 0 ? (
          <div className="text-center py-12 text-gray-500"><Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" /><p>Aucun service</p></div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">💼 Tous les Services ({services.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((s)=>(
                <div key={s.id} className={`border-2 rounded-lg p-4 transition-all ${editing?.id === s.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <h3 className="font-bold text-lg mb-1">{s.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{s.description}</p>
                  {s.price > 0 && <div className="text-2xl font-bold text-blue-600 mb-2">{s.price} {s.currency}</div>}
                  {s.features && s.features.length > 0 && (
                    <ul className="text-xs text-gray-600 mb-3 space-y-1">
                      {s.features.slice(0, 3).map((f, i) => <li key={i}>• {f}</li>)}
                    </ul>
                  )}
                  <div className="flex space-x-2">
                    <Button onClick={()=>setEditing(s)} variant="outline" size="sm" className="flex-1">Éditer</Button>
                    <Button onClick={()=>del(s.id)} variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={()=>setEditing(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">{editing.id ? '✏️ Modifier le Service' : '➕ Nouveau Service'}</h3>
              <button onClick={()=>setEditing(null)} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Nom du Service</label><input type="text" value={editing.name} onChange={(e)=>setEditing({...editing,name:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Installation POS" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={editing.description||''} onChange={(e)=>setEditing({...editing,description:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="Service complet..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Prix</label><input type="number" value={editing.price||0} onChange={(e)=>setEditing({...editing,price:parseFloat(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium mb-1">Devise</label><select value={editing.currency||'CHF'} onChange={(e)=>setEditing({...editing,currency:e.target.value})} className="w-full px-3 py-2 border rounded-lg"><option value="CHF">CHF</option><option value="EUR">EUR</option></select></div>
              </div>
              <div><label className="block text-sm font-medium mb-2">Fonctionnalités</label>{(editing.features||[]).map((feat,idx)=>(<div key={idx} className="flex items-center space-x-2 mb-2"><input type="text" value={feat} onChange={(e)=>{const newFeats=[...editing.features];newFeats[idx]=e.target.value;setEditing({...editing,features:newFeats});}} className="flex-1 px-3 py-2 border rounded-lg" placeholder="Fonctionnalité" /><Button variant="ghost" onClick={()=>setEditing({...editing,features:editing.features.filter((_,i)=>i!==idx)})} className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div>))}<Button variant="outline" size="sm" onClick={()=>setEditing({...editing,features:[...(editing.features||[]),'']})}>+ Ajouter</Button></div>
              <label className="flex items-center"><input type="checkbox" checked={editing.active} onChange={(e)=>setEditing({...editing,active:e.target.checked})} className="h-4 w-4 mr-2" />Service actif</label>
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex space-x-3 border-t">
              <Button onClick={()=>save(editing)} className="bg-blue-600 flex-1"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button>
              <Button onClick={()=>setEditing(null)} variant="outline">Annuler</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
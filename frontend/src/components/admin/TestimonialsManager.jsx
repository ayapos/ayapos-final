import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Plus, Save, Trash2, Loader2, X, CheckCircle2, AlertCircle, Star } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TestimonialsManager = () => {
  const { getAuthHeaders } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const r = await axios.get(`${API_URL}/api/testimonials/`); if (r.data.success) setTestimonials(r.data.testimonials); } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/testimonials/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/testimonials/`, item, { headers: getAuthHeaders() });
      showMessage('success', 'Témoignage sauvegardé !');
      load(); setEditing(null);
    } catch (e) { showMessage('error', 'Erreur'); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ce témoignage ?')) return;
    try { await axios.delete(`${API_URL}/api/testimonials/${id}`, { headers: getAuthHeaders() }); showMessage('success', 'Supprimé'); load(); } catch (e) { showMessage('error', 'Erreur'); }
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
        <h2 className="text-xl font-semibold flex items-center"><MessageSquare className="h-6 w-6 mr-2" />Témoignages</h2>
        <Button onClick={() => setEditing({name:'',company:'',role:'',text:'',rating:5,image:'',featured:false,order:testimonials.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau Témoignage</Button>
      </div>
      
      <div className="p-6">
        {testimonials.length === 0 ? (
          <div className="text-center py-12 text-gray-500"><MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" /><p>Aucun témoignage</p></div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">💬 Tous les Témoignages ({testimonials.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t)=>(
                <div key={t.id} className={`border-2 rounded-lg p-4 transition-all ${editing?.id === t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <div className="flex items-center mb-3">
                    {t.image && <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-3" />}
                    <div>
                      <h3 className="font-bold">{t.name}</h3>
                      <p className="text-xs text-gray-500">{t.role} • {t.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-2">{Array(t.rating||5).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}</div>
                  <p className="text-sm text-gray-700 line-clamp-3 mb-3">"{t.text}"</p>
                  {t.featured && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">En vedette</span>}
                  <div className="flex space-x-2 mt-3">
                    <Button onClick={()=>setEditing(t)} variant="outline" size="sm" className="flex-1">Éditer</Button>
                    <Button onClick={()=>del(t.id)} variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
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
              <h3 className="text-lg font-semibold">{editing.id ? '✏️ Modifier le Témoignage' : '➕ Nouveau Témoignage'}</h3>
              <button onClick={()=>setEditing(null)} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Nom du Client</label><input type="text" value={editing.name} onChange={(e)=>setEditing({...editing,name:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Pierre Durand" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Entreprise</label><input type="text" value={editing.company||''} onChange={(e)=>setEditing({...editing,company:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Restaurant" /></div>
                <div><label className="block text-sm font-medium mb-1">Poste</label><input type="text" value={editing.role||''} onChange={(e)=>setEditing({...editing,role:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Propriétaire" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Témoignage</label><textarea value={editing.text||''} onChange={(e)=>setEditing({...editing,text:e.target.value})} rows={4} className="w-full px-3 py-2 border rounded-lg" placeholder="Excellent produit..." /></div>
              <div><label className="block text-sm font-medium mb-1">Photo URL</label><input type="text" value={editing.image||''} onChange={(e)=>setEditing({...editing,image:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." /></div>
              <div><label className="block text-sm font-medium mb-1">Note (1-5)</label><input type="number" min="1" max="5" value={editing.rating||5} onChange={(e)=>setEditing({...editing,rating:parseInt(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <label className="flex items-center"><input type="checkbox" checked={editing.featured} onChange={(e)=>setEditing({...editing,featured:e.target.checked})} className="h-4 w-4 mr-2" />En vedette</label>
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

export default TestimonialsManager;
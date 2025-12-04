import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Plus, Save, Trash2, Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PortfolioManager = () => {
  const { getAuthHeaders } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const r = await axios.get(`${API_URL}/api/portfolio/`); if (r.data.success) setProjects(r.data.projects); } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/portfolio/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/portfolio/`, item, { headers: getAuthHeaders() });
      showMessage('success', 'Projet sauvegardé !');
      load(); setEditing(null);
    } catch (e) { showMessage('error', 'Erreur'); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    try { await axios.delete(`${API_URL}/api/portfolio/${id}`, { headers: getAuthHeaders() }); showMessage('success', 'Supprimé'); load(); } catch (e) { showMessage('error', 'Erreur'); }
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
        <h2 className="text-xl font-semibold flex items-center"><Briefcase className="h-6 w-6 mr-2" />Portfolio</h2>
        <Button onClick={() => setEditing({title:'',description:'',category:'',image:'',images:[],client:'',year:'2024',featured:false,order:projects.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau Projet</Button>
      </div>
      
      <div className="p-6">
        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500"><Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" /><p>Aucun projet</p></div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">💼 Tous les Projets ({projects.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p)=>(
                <div key={p.id} className={`border-2 rounded-lg overflow-hidden transition-all ${editing?.id === p.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                    <p className="text-sm text-blue-600 mb-2">{p.category}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{p.description}</p>
                    <p className="text-xs text-gray-500 mb-3">{p.client} • {p.year}</p>
                    {p.featured && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded mb-3 inline-block">En vedette</span>}
                    <div className="flex space-x-2">
                      <Button onClick={()=>setEditing(p)} variant="outline" size="sm" className="flex-1">Éditer</Button>
                      <Button onClick={()=>del(p.id)} variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                    </div>
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
              <h3 className="text-lg font-semibold">{editing.id ? '✏️ Modifier le Projet' : '➕ Nouveau Projet'}</h3>
              <button onClick={()=>setEditing(null)} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Titre du Projet</label><input type="text" value={editing.title} onChange={(e)=>setEditing({...editing,title:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Restaurant Le Bistrot" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={editing.description||''} onChange={(e)=>setEditing({...editing,description:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="Système POS complet..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Catégorie</label><input type="text" value={editing.category||''} onChange={(e)=>setEditing({...editing,category:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Restaurant" /></div>
                <div><label className="block text-sm font-medium mb-1">Année</label><input type="text" value={editing.year||'2024'} onChange={(e)=>setEditing({...editing,year:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Client</label><input type="text" value={editing.client||''} onChange={(e)=>setEditing({...editing,client:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Nom du client" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="text" value={editing.image||''} onChange={(e)=>setEditing({...editing,image:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." /></div>
              <label className="flex items-center"><input type="checkbox" checked={editing.featured} onChange={(e)=>setEditing({...editing,featured:e.target.checked})} className="h-4 w-4 mr-2" />Projet en vedette</label>
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

export default PortfolioManager;
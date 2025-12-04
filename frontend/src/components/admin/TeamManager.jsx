import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Users, Plus, Save, Trash2, Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TeamManager = () => {
  const { getAuthHeaders } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const r = await axios.get(`${API_URL}/api/team/`); if (r.data.success) setMembers(r.data.members); } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/team/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/team/`, item, { headers: getAuthHeaders() });
      showMessage('success', 'Membre sauvegardé !');
      load(); setEditing(null);
    } catch (e) { showMessage('error', 'Erreur'); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ce membre ?')) return;
    try { await axios.delete(`${API_URL}/api/team/${id}`, { headers: getAuthHeaders() }); showMessage('success', 'Supprimé'); load(); } catch (e) { showMessage('error', 'Erreur'); }
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
        <h2 className="text-xl font-semibold flex items-center"><Users className="h-6 w-6 mr-2" />Équipe</h2>
        <Button onClick={() => setEditing({name:'',role:'',bio:'',image:'',email:'',linkedin:'',active:true,order:members.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau Membre</Button>
      </div>
      
      <div className="p-6">
        {members.length === 0 ? (
          <div className="text-center py-12 text-gray-500"><Users className="h-12 w-12 mx-auto mb-4 text-gray-400" /><p>Aucun membre</p></div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">👥 Tous les Membres ({members.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {members.map((m)=>(
                <div key={m.id} className={`border-2 rounded-lg p-4 transition-all ${editing?.id === m.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  {m.image && <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover" />}
                  <h3 className="font-bold text-center mb-1">{m.name}</h3>
                  <p className="text-sm text-blue-600 text-center mb-2">{m.role}</p>
                  <p className="text-xs text-gray-600 text-center line-clamp-2 mb-3">{m.bio}</p>
                  <div className="flex space-x-2">
                    <Button onClick={()=>setEditing(m)} variant="outline" size="sm" className="flex-1">Éditer</Button>
                    <Button onClick={()=>del(m.id)} variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
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
              <h3 className="text-lg font-semibold">{editing.id ? '✏️ Modifier le Membre' : '➕ Nouveau Membre'}</h3>
              <button onClick={()=>setEditing(null)} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Nom</label><input type="text" value={editing.name} onChange={(e)=>setEditing({...editing,name:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Marie Dubois" /></div>
              <div><label className="block text-sm font-medium mb-1">Rôle/Poste</label><input type="text" value={editing.role} onChange={(e)=>setEditing({...editing,role:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="CEO" /></div>
              <div><label className="block text-sm font-medium mb-1">Biographie</label><textarea value={editing.bio||''} onChange={(e)=>setEditing({...editing,bio:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="Courte bio..." /></div>
              <div><label className="block text-sm font-medium mb-1">Photo URL</label><input type="text" value={editing.image||''} onChange={(e)=>setEditing({...editing,image:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={editing.email||''} onChange={(e)=>setEditing({...editing,email:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <label className="flex items-center"><input type="checkbox" checked={editing.active} onChange={(e)=>setEditing({...editing,active:e.target.checked})} className="h-4 w-4 mr-2" />Membre actif</label>
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

export default TeamManager;
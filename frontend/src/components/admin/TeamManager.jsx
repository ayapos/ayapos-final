import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Users, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TeamManager = () => {
  const { getAuthHeaders } = useAuth();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/team/`);
      if (r.data.success) setTeam(r.data.team);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/team/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/team/`, item, { headers: getAuthHeaders() });
      load(); setEditing(null);
    } catch (e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    try { await axios.delete(`${API_URL}/api/team/${id}`, { headers: getAuthHeaders() }); load(); } catch (e) { console.error(e); }
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center"><Users className="h-6 w-6 mr-2" />Équipe</h2>
        <Button onClick={() => setEditing({name:'',position:'',bio:'',photo:'',email:'',phone:'',social:{},order:team.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau Membre</Button>
      </div>
      <div className="p-6">
        {editing ? (
          <div className="border rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Nom</label><input type="text" value={editing.name} onChange={(e)=>setEditing({...editing,name:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Poste</label><input type="text" value={editing.position} onChange={(e)=>setEditing({...editing,position:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Bio</label><textarea value={editing.bio||''} onChange={(e)=>setEditing({...editing,bio:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Photo URL</label><input type="text" value={editing.photo||''} onChange={(e)=>setEditing({...editing,photo:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={editing.email||''} onChange={(e)=>setEditing({...editing,email:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
            </div>
            <div className="flex space-x-3 pt-4 border-t"><Button onClick={()=>save(editing)} className="bg-blue-600"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button><Button onClick={()=>setEditing(null)} variant="outline">Annuler</Button></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m)=>(
              <div key={m.id} className="border rounded-lg p-4 text-center">
                <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">{m.photo?<img src={m.photo} alt={m.name} className="w-full h-full object-cover rounded-full"/>:<Users className="h-8 w-8 text-gray-400" />}</div>
                <h3 className="font-semibold">{m.name}</h3><p className="text-sm text-gray-600">{m.position}</p><div className="flex space-x-2 mt-4 justify-center"><Button onClick={()=>setEditing(m)} variant="outline" size="sm">Éditer</Button><Button onClick={()=>del(m.id)} variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManager;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PortfolioManager = () => {
  const { getAuthHeaders } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/portfolio/`);
      if (r.data.success) setProjects(r.data.projects);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/portfolio/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/portfolio/`, item, { headers: getAuthHeaders() });
      load(); setEditing(null);
    } catch (e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    try { await axios.delete(`${API_URL}/api/portfolio/${id}`, { headers: getAuthHeaders() }); load(); } catch (e) { console.error(e); }
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center"><Briefcase className="h-6 w-6 mr-2" />Portfolio</h2>
        <Button onClick={() => setEditing({title:'',description:'',category:'',image:'',client:'',date:'',link:'',technologies:[],featured:false,order:projects.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau Projet</Button>
      </div>
      <div className="p-6">
        {editing ? (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Titre</label><input type="text" value={editing.title} onChange={(e)=>setEditing({...editing,title:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Catégorie</label><input type="text" value={editing.category} onChange={(e)=>setEditing({...editing,category:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea value={editing.description} onChange={(e)=>setEditing({...editing,description:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Client</label><input type="text" value={editing.client||''} onChange={(e)=>setEditing({...editing,client:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Date</label><input type="text" value={editing.date||''} onChange={(e)=>setEditing({...editing,date:e.target.value})} placeholder="2024" className="w-full px-3 py-2 border rounded-lg" /></div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={()=>save(editing)} className="bg-blue-600"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button>
              <Button onClick={()=>setEditing(null)} variant="outline">Annuler</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((p)=>(
              <div key={p.id} className="border rounded-lg p-4">
                <div className="bg-gray-100 h-32 rounded mb-3 flex items-center justify-center text-gray-400">Image</div>
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{p.category}</p>
                <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                <div className="flex space-x-2">
                  <Button onClick={()=>setEditing(p)} variant="outline" className="flex-1">Éditer</Button>
                  <Button onClick={()=>del(p.id)} variant="ghost" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioManager;

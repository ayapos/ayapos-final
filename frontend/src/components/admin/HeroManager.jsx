import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Image, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const HeroManager = () => {
  const { getAuthHeaders } = useAuth();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/hero/`);
      if (r.data.success) setSlides(r.data.slides);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/hero/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/hero/`, item, { headers: getAuthHeaders() });
      load(); setEditing(null);
    } catch (e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    try { await axios.delete(`${API_URL}/api/hero/${id}`, { headers: getAuthHeaders() }); load(); } catch (e) { console.error(e); }
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center"><Image className="h-6 w-6 mr-2" />Hero/Carousel</h2>
        <Button onClick={() => setEditing({title:'',subtitle:'',description:'',image:'',buttonText:'',buttonLink:'',active:true,order:slides.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau Slide</Button>
      </div>
      <div className="p-6">
        {editing ? (
          <div className="border rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Titre</label><input type="text" value={editing.title} onChange={(e)=>setEditing({...editing,title:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Sous-titre</label><input type="text" value={editing.subtitle||''} onChange={(e)=>setEditing({...editing,subtitle:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea value={editing.description||''} onChange={(e)=>setEditing({...editing,description:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Image URL</label><input type="text" value={editing.image} onChange={(e)=>setEditing({...editing,image:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="/images/hero-1.jpg" /></div>
              <div><label className="block text-sm font-medium mb-1">Texte Bouton</label><input type="text" value={editing.buttonText||''} onChange={(e)=>setEditing({...editing,buttonText:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="En savoir plus" /></div>
              <div><label className="block text-sm font-medium mb-1">Lien Bouton</label><input type="text" value={editing.buttonLink||''} onChange={(e)=>setEditing({...editing,buttonLink:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="/contact" /></div>
              <div className="flex items-center"><input type="checkbox" checked={editing.active} onChange={(e)=>setEditing({...editing,active:e.target.checked})} className="h-4 w-4 mr-2" /><label>Slide actif</label></div>
            </div>
            <div className="flex space-x-3 pt-4 border-t"><Button onClick={()=>save(editing)} className="bg-blue-600"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button><Button onClick={()=>setEditing(null)} variant="outline">Annuler</Button></div>
          </div>
        ) : (
          <div className="space-y-4">
            {slides.map((s)=>(
              <div key={s.id} className="border rounded-lg p-4 flex items-center space-x-4">
                <div className="w-32 h-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">{s.image?<img src={s.image} alt={s.title} className="w-full h-full object-cover rounded"/>:<Image className="h-8 w-8 text-gray-400" />}</div>
                <div className="flex-1"><h3 className="font-semibold">{s.title}</h3><p className="text-sm text-gray-600">{s.subtitle}</p>{s.active?<span className="text-xs text-green-600">Actif</span>:<span className="text-xs text-gray-400">Inactif</span>}</div>
                <div className="flex space-x-2"><Button onClick={()=>setEditing(s)} variant="outline">Éditer</Button><Button onClick={()=>del(s.id)} variant="ghost" className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroManager;

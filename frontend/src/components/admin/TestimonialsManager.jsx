import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Plus, Save, Trash2, Loader2, Star } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TestimonialsManager = () => {
  const { getAuthHeaders } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/testimonials/`);
      if (r.data.success) setTestimonials(r.data.testimonials);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/testimonials/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/testimonials/`, item, { headers: getAuthHeaders() });
      load(); setEditing(null);
    } catch (e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    try { await axios.delete(`${API_URL}/api/testimonials/${id}`, { headers: getAuthHeaders() }); load(); } catch (e) { console.error(e); }
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center"><MessageSquare className="h-6 w-6 mr-2" />Témoignages</h2>
        <Button onClick={() => setEditing({name:'',company:'',position:'',rating:5,comment:'',photo:'',featured:false,order:testimonials.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau</Button>
      </div>
      <div className="p-6">
        {editing ? (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Nom</label><input type="text" value={editing.name} onChange={(e)=>setEditing({...editing,name:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Entreprise</label><input type="text" value={editing.company} onChange={(e)=>setEditing({...editing,company:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Poste</label><input type="text" value={editing.position||''} onChange={(e)=>setEditing({...editing,position:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Note (1-5)</label><input type="number" min="1" max="5" value={editing.rating} onChange={(e)=>setEditing({...editing,rating:parseInt(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Commentaire</label><textarea value={editing.comment} onChange={(e)=>setEditing({...editing,comment:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={()=>save(editing)} className="bg-blue-600"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button>
              <Button onClick={()=>setEditing(null)} variant="outline">Annuler</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t)=>(
              <div key={t.id} className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  {[...Array(t.rating)].map((_,i)=><Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm mb-2 italic">"{t.comment}"</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-600">{t.position} - {t.company}</p>
                <div className="flex space-x-2 mt-4">
                  <Button onClick={()=>setEditing(t)} variant="outline" className="flex-1">Éditer</Button>
                  <Button onClick={()=>del(t.id)} variant="ghost" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsManager;

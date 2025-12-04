import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { HelpCircle, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const FAQManager = () => {
  const { getAuthHeaders } = useAuth();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/faq/`);
      if (r.data.success) setFaqs(r.data.faq);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/faq/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/faq/`, item, { headers: getAuthHeaders() });
      load(); setEditing(null);
    } catch (e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    try { await axios.delete(`${API_URL}/api/faq/${id}`, { headers: getAuthHeaders() }); load(); } catch (e) { console.error(e); }
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center"><HelpCircle className="h-6 w-6 mr-2" />FAQ</h2>
        <Button onClick={() => setEditing({question:'',answer:'',category:'Général',order:faqs.length,active:true})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouvelle Question</Button>
      </div>
      <div className="p-6">
        {editing ? (
          <div className="border rounded-lg p-4 space-y-4">
            <div><label className="block text-sm font-medium mb-1">Catégorie</label><input type="text" value={editing.category||''} onChange={(e)=>setEditing({...editing,category:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Question</label><input type="text" value={editing.question} onChange={(e)=>setEditing({...editing,question:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Réponse</label><textarea value={editing.answer} onChange={(e)=>setEditing({...editing,answer:e.target.value})} rows={4} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div className="flex space-x-3">
              <Button onClick={()=>save(editing)} className="bg-blue-600"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button>
              <Button onClick={()=>setEditing(null)} variant="outline">Annuler</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((f)=>(
              <div key={f.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{f.category}</p>
                    <p className="font-semibold mb-2">{f.question}</p>
                    <p className="text-sm text-gray-600">{f.answer}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button onClick={()=>setEditing(f)} variant="outline" size="sm">Éditer</Button>
                    <Button onClick={()=>del(f.id)} variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQManager;

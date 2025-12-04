import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { HelpCircle, Plus, Save, Trash2, Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const FAQManager = () => {
  const { getAuthHeaders } = useAuth();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const r = await axios.get(`${API_URL}/api/faq/`); if (r.data.success) setFaqs(r.data.faqs); } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/faq/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/faq/`, item, { headers: getAuthHeaders() });
      showMessage('success', 'FAQ sauvegardée !');
      load(); setEditing(null);
    } catch (e) { showMessage('error', 'Erreur'); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer cette question ?')) return;
    try { await axios.delete(`${API_URL}/api/faq/${id}`, { headers: getAuthHeaders() }); showMessage('success', 'Supprimée'); load(); } catch (e) { showMessage('error', 'Erreur'); }
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
        <h2 className="text-xl font-semibold flex items-center"><HelpCircle className="h-6 w-6 mr-2" />FAQ</h2>
        <Button onClick={() => setEditing({question:'',answer:'',category:'',active:true,order:faqs.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouvelle Question</Button>
      </div>
      
      <div className="p-6">
        {faqs.length === 0 ? (
          <div className="text-center py-12 text-gray-500"><HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" /><p>Aucune question</p></div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">❓ Toutes les Questions ({faqs.length})</h3>
            <div className="space-y-3">
              {faqs.map((f)=>(
                <div key={f.id} className={`border-2 rounded-lg p-4 transition-all ${editing?.id === f.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold mb-2 text-gray-900">Q: {f.question}</h3>
                      <p className="text-sm text-gray-600 mb-2">R: {f.answer}</p>
                      {f.category && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{f.category}</span>}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button onClick={()=>setEditing(f)} variant="outline" size="sm">Éditer</Button>
                      <Button onClick={()=>del(f.id)} variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
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
              <h3 className="text-lg font-semibold">{editing.id ? '✏️ Modifier la Question' : '➕ Nouvelle Question'}</h3>
              <button onClick={()=>setEditing(null)} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Question</label><input type="text" value={editing.question} onChange={(e)=>setEditing({...editing,question:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Comment...?" /></div>
              <div><label className="block text-sm font-medium mb-1">Réponse</label><textarea value={editing.answer||''} onChange={(e)=>setEditing({...editing,answer:e.target.value})} rows={4} className="w-full px-3 py-2 border rounded-lg" placeholder="La réponse..." /></div>
              <div><label className="block text-sm font-medium mb-1">Catégorie</label><input type="text" value={editing.category||''} onChange={(e)=>setEditing({...editing,category:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Tarifs, Support, etc." /></div>
              <label className="flex items-center"><input type="checkbox" checked={editing.active} onChange={(e)=>setEditing({...editing,active:e.target.checked})} className="h-4 w-4 mr-2" />Active</label>
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

export default FAQManager;
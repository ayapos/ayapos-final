import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FileText, Plus, Save, Trash2, Loader2, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const BlogManager = () => {
  const { getAuthHeaders } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/blog/posts`);
      if (r.data.success) setPosts(r.data.posts);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/blog/posts/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/blog/posts`, item, { headers: getAuthHeaders() });
      showMessage('success', 'Article sauvegardé !');
      load(); setEditing(null);
    } catch (e) { showMessage('error', 'Erreur'); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    try { await axios.delete(`${API_URL}/api/blog/posts/${id}`, { headers: getAuthHeaders() }); showMessage('success', 'Supprimé'); load(); } catch (e) { showMessage('error', 'Erreur'); }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {message.text && (
        <div className={`${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border px-4 py-3 flex items-center space-x-2 rounded-t-lg`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{message.text}</span>
        </div>
      )}
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center"><FileText className="h-6 w-6 mr-2" />Blog</h2>
        <Button onClick={() => setEditing({title:'',slug:'',excerpt:'',content:'',author:'Équipe AyaPos',category:'',tags:[],image:'',published:false,featured:false,order:posts.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouvel Article</Button>
      </div>
      
      <div className="p-6">
        {/* Liste toujours visible */}
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Aucun article</p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">📝 Tous les Articles ({posts.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((p)=>(
                <div key={p.id} className={`border-2 rounded-lg p-4 transition-all ${editing?.id === p.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  {p.image && <img src={p.image} alt={p.title} className="w-full h-32 object-cover rounded mb-3" />}
                  <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">Par {p.author} • {p.category || 'Sans catégorie'}</p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{p.excerpt}</p>
                  <div className="flex space-x-2 mb-3">
                    {p.published && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Publié</span>}
                    {p.featured && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">À la une</span>}
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={()=>setEditing(p)} variant="outline" size="sm" className="flex-1">Éditer</Button>
                    <Button onClick={()=>del(p.id)} variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Popup Compact */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={()=>setEditing(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">{editing.id ? '✏️ Modifier l\'Article' : '➕ Nouvel Article'}</h3>
              <button onClick={()=>setEditing(null)} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Titre</label><input type="text" value={editing.title} onChange={(e)=>setEditing({...editing,title:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Mon article" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Auteur</label><input type="text" value={editing.author} onChange={(e)=>setEditing({...editing,author:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium mb-1">Catégorie</label><input type="text" value={editing.category||''} onChange={(e)=>setEditing({...editing,category:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Actualités" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Extrait</label><textarea value={editing.excerpt||''} onChange={(e)=>setEditing({...editing,excerpt:e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg" placeholder="Résumé court" /></div>
              <div><label className="block text-sm font-medium mb-1">Contenu</label><textarea value={editing.content||''} onChange={(e)=>setEditing({...editing,content:e.target.value})} rows={5} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="text" value={editing.image||''} onChange={(e)=>setEditing({...editing,image:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." /></div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center"><input type="checkbox" checked={editing.published} onChange={(e)=>setEditing({...editing,published:e.target.checked})} className="h-4 w-4 mr-2" />Publié</label>
                <label className="flex items-center"><input type="checkbox" checked={editing.featured} onChange={(e)=>setEditing({...editing,featured:e.target.checked})} className="h-4 w-4 mr-2" />À la une</label>
              </div>
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

export default BlogManager;
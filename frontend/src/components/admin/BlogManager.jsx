import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FileText, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const BlogManager = () => {
  const { getAuthHeaders } = useAuth();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => { load(); loadCategories(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/blog/posts`);
      if (r.data.success) setPosts(r.data.posts);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const loadCategories = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/blog/categories`);
      if (r.data.success) setCategories(r.data.categories);
    } catch (e) { console.error(e); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/blog/posts/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/blog/posts`, item, { headers: getAuthHeaders() });
      load(); setEditing(null);
    } catch (e) { console.error(e); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ?')) return;
    try { await axios.delete(`${API_URL}/api/blog/posts/${id}`, { headers: getAuthHeaders() }); load(); } catch (e) { console.error(e); }
  };

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center"><FileText className="h-6 w-6 mr-2" />Blog</h2>
        <Button onClick={() => setEditing({title:'',slug:'',excerpt:'',content:'',author:'',category:'',tags:[],image:'',published:false,featured:false,order:posts.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouvel Article</Button>
      </div>
      <div className="p-6">
        {editing ? (
          <div className="border rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Titre</label><input type="text" value={editing.title} onChange={(e)=>setEditing({...editing,title:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Auteur</label><input type="text" value={editing.author} onChange={(e)=>setEditing({...editing,author:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Catégorie</label><select value={editing.category} onChange={(e)=>setEditing({...editing,category:e.target.value})} className="w-full px-3 py-2 border rounded-lg"><option value="">Sélectionner</option>{categories.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Extrait</label><textarea value={editing.excerpt||''} onChange={(e)=>setEditing({...editing,excerpt:e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="col-span-2"><label className="block text-sm font-medium mb-1">Contenu</label><textarea value={editing.content} onChange={(e)=>setEditing({...editing,content:e.target.value})} rows={8} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="text" value={editing.image||''} onChange={(e)=>setEditing({...editing,image:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="flex items-center space-x-4"><div className="flex items-center"><input type="checkbox" checked={editing.published} onChange={(e)=>setEditing({...editing,published:e.target.checked})} className="h-4 w-4 mr-2" /><label>Publié</label></div><div className="flex items-center"><input type="checkbox" checked={editing.featured} onChange={(e)=>setEditing({...editing,featured:e.target.checked})} className="h-4 w-4 mr-2" /><label>À la une</label></div></div>
            </div>
            <div className="flex space-x-3 pt-4 border-t"><Button onClick={()=>save(editing)} className="bg-blue-600"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button><Button onClick={()=>setEditing(null)} variant="outline">Annuler</Button></div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((p)=>(
              <div key={p.id} className="border rounded-lg p-4 flex justify-between items-start">
                <div className="flex-1"><h3 className="font-semibold text-lg mb-1">{p.title}</h3><p className="text-sm text-gray-500 mb-2">Par {p.author} • {p.category}</p><p className="text-sm text-gray-600">{p.excerpt}</p><div className="flex space-x-2 mt-2">{p.published&&<span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Publié</span>}{p.featured&&<span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">À la une</span>}</div></div>
                <div className="flex space-x-2 ml-4"><Button onClick={()=>setEditing(p)} variant="outline">Éditer</Button><Button onClick={()=>del(p.id)} variant="ghost" className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;

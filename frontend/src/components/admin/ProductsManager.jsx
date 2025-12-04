import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Package, Plus, Save, Trash2, Loader2, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ProductsManager = () => {
  const { getAuthHeaders } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/products/`);
      if (r.data.success) setProducts(r.data.products);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async (item) => {
    try {
      if (item.id) await axios.put(`${API_URL}/api/products/${item.id}`, item, { headers: getAuthHeaders() });
      else await axios.post(`${API_URL}/api/products/`, item, { headers: getAuthHeaders() });
      showMessage('success', 'Produit sauvegardé !');
      load(); setEditing(null);
    } catch (e) { showMessage('error', 'Erreur'); }
  };

  const del = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try { 
      await axios.delete(`${API_URL}/api/products/${id}`, { headers: getAuthHeaders() }); 
      showMessage('success', 'Produit supprimé');
      load(); 
    } catch (e) { showMessage('error', 'Erreur'); }
  };

  const uploadImage = async (file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${API_URL}/api/upload/image`, formData, { 
        headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        return response.data.url;
      }
    } catch (error) {
      showMessage('error', 'Erreur upload image');
    } finally {
      setUploading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
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
        <h2 className="text-xl font-semibold flex items-center"><Package className="h-6 w-6 mr-2" />Produits/Terminaux</h2>
        <Button onClick={() => setEditing({name:'',category:'POS',description:'',price:0,currency:'CHF',image:'',images:[],specifications:[],features:[],inStock:true,featured:false,order:products.length})} className="bg-blue-600"><Plus className="h-4 w-4 mr-2" />Nouveau Produit</Button>
      </div>
      <div className="p-6">
        {/* Always show existing products list */}
        {!editing && products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Aucun produit</p>
            <p className="text-sm mt-2">Cliquez sur "Nouveau Produit" pour commencer.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Editing Form */}
            {editing && (
              <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {editing.id ? '✏️ Modifier le Produit' : '➕ Créer un Nouveau Produit'}
                  </h3>
                  <Button onClick={() => setEditing(null)} variant="ghost" size="sm">✕</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Nom du Produit</label><input type="text" value={editing.name} onChange={(e)=>setEditing({...editing,name:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Terminal POS Premium" /></div>
                  <div><label className="block text-sm font-medium mb-1">Catégorie</label><select value={editing.category} onChange={(e)=>setEditing({...editing,category:e.target.value})} className="w-full px-3 py-2 border rounded-lg"><option value="POS">Terminaux POS</option><option value="Tablet">Tablettes</option><option value="Mobile">Mobile</option><option value="Accessory">Accessoires</option></select></div>
                  <div className="col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea value={editing.description} onChange={(e)=>setEditing({...editing,description:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium mb-1">Prix</label><div className="flex space-x-2"><input type="number" value={editing.price||0} onChange={(e)=>setEditing({...editing,price:parseFloat(e.target.value)})} className="flex-1 px-3 py-2 border rounded-lg" /><select value={editing.currency} onChange={(e)=>setEditing({...editing,currency:e.target.value})} className="px-3 py-2 border rounded-lg"><option value="CHF">CHF</option><option value="EUR">EUR</option></select></div></div>
                  <div><label className="block text-sm font-medium mb-1">Image Principale</label><div className="space-y-2">{editing.image && <img src={editing.image} alt="Preview" className="w-full h-32 object-cover rounded" />}<input type="text" value={editing.image||''} onChange={(e)=>setEditing({...editing,image:e.target.value})} placeholder="/images/terminal.jpg" className="w-full px-3 py-2 border rounded-lg" /><input type="file" accept="image/*" onChange={async(e)=>{const f=e.target.files[0]; if(f){const url=await uploadImage(f); if(url)setEditing({...editing,image:url});}}} className="hidden" id="main-image" /><label htmlFor="main-image" className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">{uploading?<Loader2 className="h-4 w-4 animate-spin"/>:<Upload className="h-4 w-4"/>}<span>Télécharger Image</span></label></div></div>
                  <div className="col-span-2"><label className="block text-sm font-medium mb-2">Spécifications</label>{(editing.specifications||[]).map((spec,idx)=>(<div key={idx} className="flex items-center space-x-2 mb-2"><input type="text" value={spec.name} onChange={(e)=>{const newSpecs=[...editing.specifications];newSpecs[idx].name=e.target.value;setEditing({...editing,specifications:newSpecs});}} placeholder="Écran" className="flex-1 px-3 py-2 border rounded-lg" /><input type="text" value={spec.value} onChange={(e)=>{const newSpecs=[...editing.specifications];newSpecs[idx].value=e.target.value;setEditing({...editing,specifications:newSpecs});}} placeholder="15 pouces" className="flex-1 px-3 py-2 border rounded-lg" /><Button variant="ghost" onClick={()=>setEditing({...editing,specifications:editing.specifications.filter((_,i)=>i!==idx)})} className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div>))}<Button variant="outline" onClick={()=>setEditing({...editing,specifications:[...(editing.specifications||[]),{name:'',value:''}]})} className="mt-2">+ Ajouter Spécification</Button></div>
                  <div className="col-span-2"><label className="block text-sm font-medium mb-2">Fonctionnalités</label>{(editing.features||[]).map((feat,idx)=>(<div key={idx} className="flex items-center space-x-2 mb-2"><input type="text" value={feat} onChange={(e)=>{const newFeats=[...editing.features];newFeats[idx]=e.target.value;setEditing({...editing,features:newFeats});}} className="flex-1 px-3 py-2 border rounded-lg" placeholder="Écran tactile" /><Button variant="ghost" onClick={()=>setEditing({...editing,features:editing.features.filter((_,i)=>i!==idx)})} className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div>))}<Button variant="outline" onClick={()=>setEditing({...editing,features:[...(editing.features||[]),'']})}>+ Ajouter Fonctionnalité</Button></div>
                  <div className="flex items-center"><input type="checkbox" checked={editing.featured} onChange={(e)=>setEditing({...editing,featured:e.target.checked})} className="h-4 w-4 mr-2" /><label>Produit vedette</label></div>
                  <div className="flex items-center"><input type="checkbox" checked={editing.inStock} onChange={(e)=>setEditing({...editing,inStock:e.target.checked})} className="h-4 w-4 mr-2" /><label>En stock</label></div>
                </div>
                <div className="flex space-x-3 pt-4 border-t border-blue-200"><Button onClick={()=>save(editing)} className="bg-blue-600"><Save className="h-4 w-4 mr-2" />Sauvegarder</Button><Button onClick={()=>setEditing(null)} variant="outline">Annuler</Button></div>
              </div>
            )}
            
            {/* Existing Products List - Always Visible */}
            {products.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  📦 Tous les Produits ({products.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.map((p)=>(
                    <div key={p.id} className={`relative border-2 rounded-lg p-4 transition-all ${editing?.id === p.id ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}>
                      {editing?.id === p.id && <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">✏️ En cours d'édition</div>}
                      {p.image && <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded mb-3" />}
                      <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                      <div className="text-2xl font-bold text-blue-600 mb-2">{p.price} {p.currency}</div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{p.description}</p>
                      <div className="flex space-x-2">
                        <Button onClick={()=>setEditing(p)} variant={editing?.id === p.id ? "default" : "outline"} className={`flex-1 ${editing?.id === p.id ? 'bg-blue-600' : ''}`} size="sm">{editing?.id === p.id ? 'Édition en cours...' : 'Éditer'}</Button>
                        <Button onClick={()=>del(p.id)} variant="ghost" className="text-red-600" size="sm"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManager;
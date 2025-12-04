import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Menu, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const NavigationManager = () => {
  const { getAuthHeaders } = useAuth();
  const [footer, setFooter] = useState({columns:[],copyright:'',socialLinks:{}});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => { loadFooter(); }, []);

  const loadFooter = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/navigation/footer`);
      if (r.data.success) setFooter(r.data.footer);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const saveFooter = async () => {
    try {
      setSaving(true);
      await axios.put(`${API_URL}/api/navigation/footer`, footer, { headers: getAuthHeaders() });
      showMessage('success', 'Footer sauvegardé !');
    } catch (e) { showMessage('error', 'Erreur'); } finally { setSaving(false); }
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
        <h2 className="text-xl font-semibold flex items-center"><Menu className="h-6 w-6 mr-2" />Navigation & Footer</h2>
        <Button onClick={saveFooter} disabled={saving} className="bg-blue-600">{saving?<><Loader2 className="h-4 w-4 animate-spin mr-2" />Sauvegarde...</>:<><Save className="h-4 w-4 mr-2" />Sauvegarder</>}</Button>
      </div>
      <div className="p-6 space-y-6">
        <div><h3 className="font-semibold mb-4">Footer - Copyright</h3><input type="text" value={footer.copyright} onChange={(e)=>setFooter({...footer,copyright:e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="© 2024 AyaPos. Tous droits réservés." /></div>
        <div><h3 className="font-semibold mb-4">Colonnes du Footer</h3>{footer.columns.map((col,idx)=>(<div key={idx} className="border rounded-lg p-4 mb-4"><div className="mb-2"><label className="block text-sm font-medium mb-1">Titre Colonne</label><input type="text" value={col.title} onChange={(e)=>{const newCols=[...footer.columns];newCols[idx].title=e.target.value;setFooter({...footer,columns:newCols});}} className="w-full px-3 py-2 border rounded-lg" /></div><div><label className="block text-sm font-medium mb-2">Liens</label>{col.links.map((link,linkIdx)=>(<div key={linkIdx} className="flex space-x-2 mb-2"><input type="text" value={link.label} onChange={(e)=>{const newCols=[...footer.columns];newCols[idx].links[linkIdx].label=e.target.value;setFooter({...footer,columns:newCols});}} placeholder="Label" className="flex-1 px-3 py-2 border rounded-lg" /><input type="text" value={link.url} onChange={(e)=>{const newCols=[...footer.columns];newCols[idx].links[linkIdx].url=e.target.value;setFooter({...footer,columns:newCols});}} placeholder="URL" className="flex-1 px-3 py-2 border rounded-lg" /></div>))}<Button variant="outline" size="sm" onClick={()=>{const newCols=[...footer.columns];newCols[idx].links.push({label:'',url:''});setFooter({...footer,columns:newCols});}}>+ Ajouter Lien</Button></div></div>))}<Button variant="outline" onClick={()=>setFooter({...footer,columns:[...footer.columns,{title:'',links:[{label:'',url:''}]}]})}>+ Ajouter Colonne</Button></div>
      </div>
    </div>
  );
};

export default NavigationManager;

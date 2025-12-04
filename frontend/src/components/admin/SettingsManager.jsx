import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Settings, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const SettingsManager = () => {
  const { getAuthHeaders } = useAuth();
  const [settings, setSettings] = useState({popupEnabled:true,popupDelay:5,cookieConsentEnabled:true,maintenanceMode:false,analyticsEnabled:false,analyticsCode:'',metaTitle:'',metaDescription:'',metaKeywords:''});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const r = await axios.get(`${API_URL}/api/settings/`);
      if (r.data.success) setSettings({...settings,...r.data.settings});
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const save = async () => {
    try {
      setSaving(true);
      await axios.put(`${API_URL}/api/settings/`, settings, { headers: getAuthHeaders() });
      showMessage('success', 'Paramètres sauvegardés avec succès !');
    } catch (e) {
      showMessage('error', 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
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
        <h2 className="text-xl font-semibold flex items-center"><Settings className="h-6 w-6 mr-2" />Paramètres du Site</h2>
        <Button onClick={save} disabled={saving} className="bg-blue-600">{saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Sauvegarde...</> : <><Save className="h-4 w-4 mr-2" />Sauvegarder</>}</Button>
      </div>
      <div className="p-6 space-y-6">
        <div className="border-b pb-4"><h3 className="font-semibold mb-4">Popup de Rappel</h3>
          <div className="flex items-center mb-3"><input type="checkbox" checked={settings.popupEnabled} onChange={(e)=>setSettings({...settings,popupEnabled:e.target.checked})} className="h-4 w-4 mr-2" /><label>Activer le popup</label></div>
          <div><label className="block text-sm font-medium mb-1">Délai d'apparition (secondes)</label><input type="number" value={settings.popupDelay} onChange={(e)=>setSettings({...settings,popupDelay:parseInt(e.target.value)})} className="w-32 px-3 py-2 border rounded-lg" /></div>
        </div>
        <div className="border-b pb-4"><h3 className="font-semibold mb-4">Cookies & Légal</h3>
          <div className="flex items-center"><input type="checkbox" checked={settings.cookieConsentEnabled} onChange={(e)=>setSettings({...settings,cookieConsentEnabled:e.target.checked})} className="h-4 w-4 mr-2" /><label>Afficher le bandeau cookies</label></div>
        </div>
        <div className="border-b pb-4"><h3 className="font-semibold mb-4">Maintenance</h3>
          <div className="flex items-center"><input type="checkbox" checked={settings.maintenanceMode} onChange={(e)=>setSettings({...settings,maintenanceMode:e.target.checked})} className="h-4 w-4 mr-2" /><label className="text-red-600 font-medium">Mode maintenance (site inaccessible)</label></div>
        </div>
        <div><h3 className="font-semibold mb-4">SEO & Méta</h3>
          <div className="space-y-3">
            <div><label className="block text-sm font-medium mb-1">Titre Meta</label><input type="text" value={settings.metaTitle||''} onChange={(e)=>setSettings({...settings,metaTitle:e.target.value})} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Description Meta</label><textarea value={settings.metaDescription||''} onChange={(e)=>setSettings({...settings,metaDescription:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;

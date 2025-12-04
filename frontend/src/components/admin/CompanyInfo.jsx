import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Save, Loader2, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CompanyInfo = () => {
  const { getAuthHeaders } = useAuth();
  const [info, setInfo] = useState({
    name: '', slogan: '', description: '', email: '', phone: '', address: '', city: '', postalCode: '', country: '',
    openingHours: '', logo: '', favicon: '',
    socialMedia: { facebook: '', linkedin: '', twitter: '', instagram: '', youtube: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/company/`);
      if (response.data.success) {
        setInfo({...info, ...response.data.info});
      }
    } catch (error) {
      console.error('Error loading company info:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveInfo = async () => {
    try {
      setSaving(true);
      await axios.put(`${API_URL}/api/company/`, info, { headers: getAuthHeaders() });
      showMessage('success', 'Informations sauvegardées avec succès !');
    } catch (error) {
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
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center"><Building2 className="h-6 w-6 mr-2" />Informations de l'Entreprise</h2>
        <Button onClick={saveInfo} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
          {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Sauvegarde...</> : <><Save className="h-4 w-4 mr-2" />Sauvegarder</>}
        </Button>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label><input type="text" value={info.name} onChange={(e) => setInfo({...info, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label><input type="text" value={info.slogan || ''} onChange={(e) => setInfo({...info, slogan: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={info.description || ''} onChange={(e) => setInfo({...info, description: e.target.value})} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={info.email} onChange={(e) => setInfo({...info, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label><input type="text" value={info.phone} onChange={(e) => setInfo({...info, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label><input type="text" value={info.address || ''} onChange={(e) => setInfo({...info, address: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Ville</label><input type="text" value={info.city || ''} onChange={(e) => setInfo({...info, city: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label><input type="text" value={info.postalCode || ''} onChange={(e) => setInfo({...info, postalCode: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Pays</label><input type="text" value={info.country || ''} onChange={(e) => setInfo({...info, country: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
        </div>
        <div className="border-t pt-6"><h3 className="font-semibold mb-4">Réseaux Sociaux</h3><div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label><input type="url" value={info.socialMedia?.facebook || ''} onChange={(e) => setInfo({...info, socialMedia: {...info.socialMedia, facebook: e.target.value}})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label><input type="url" value={info.socialMedia?.linkedin || ''} onChange={(e) => setInfo({...info, socialMedia: {...info.socialMedia, linkedin: e.target.value}})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label><input type="url" value={info.socialMedia?.twitter || ''} onChange={(e) => setInfo({...info, socialMedia: {...info.socialMedia, twitter: e.target.value}})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label><input type="url" value={info.socialMedia?.instagram || ''} onChange={(e) => setInfo({...info, socialMedia: {...info.socialMedia, instagram: e.target.value}})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
        </div></div>
      </div>
    </div>
  );
};

export default CompanyInfo;

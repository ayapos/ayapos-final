import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Save, Upload, Loader2, FileText } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ContentEditor = ({ selectedPage, setSelectedPage }) => {
  const { getAuthHeaders } = useAuth();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const pages = [
    { id: 'home', name: 'Accueil' },
    { id: 'pricing', name: 'Tarifs' },
    { id: 'about', name: 'À propos' },
    { id: 'contact', name: 'Contact' },
    { id: 'pos-systems', name: 'Systèmes POS' },
    { id: 'restaurant-pos', name: 'Restaurant POS' },
    { id: 'ayapay', name: 'AyaPay' },
    // 12 nouvelles pages produits
    { id: 'pos-restaurant', name: '🍽️ POS Restaurant' },
    { id: 'self-order-kiosk', name: '🖥️ Self-Order Kiosk' },
    { id: 'systeme-commande', name: '📱 Système Commande' },
    { id: 'terminal-serveur', name: '📲 Terminal Serveur' },
    { id: 'app-mobile-commande', name: '📱 App Mobile' },
    { id: 'serveur-robot', name: '🤖 Serveur Robot' },
    { id: 'gestion-livraison', name: '🚚 Gestion Livraison' },
    { id: 'portail-web', name: '🌐 Portail Web' },
    { id: 'rapport-mobile', name: '📊 Rapport Mobile' },
    { id: 'gestion-stock', name: '📦 Gestion Stock' },
    { id: 'gestion-centralisee', name: '🏢 Gestion Centralisée' },
    { id: 'materiel-appareils', name: '🖨️ Matériel' },
  ];

  useEffect(() => { loadAllContent(); }, []);

  const loadAllContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/content/`);
      if (response.data.success) {
        const contentMap = {};
        response.data.content.forEach(pageContent => {
          contentMap[pageContent.page] = pageContent.sections || [];
        });
        setContent(contentMap);
        if (!selectedPage && pages.length > 0) setSelectedPage(pages[0].id);
      }
    } catch (error) {
      console.error(error);
      showMessage('error', 'Erreur chargement');
    } finally { setLoading(false); }
  };

  const saveContent = async () => {
    try {
      setSaving(true);
      const currentSections = content[selectedPage] || [];
      await axios.post(`${API_URL}/api/content/`, 
        { page: selectedPage, sections: currentSections },
        { headers: getAuthHeaders() }
      );
      showMessage('success', 'Sauvegardé!');
    } catch (error) {
      showMessage('error', 'Erreur');
    } finally { setSaving(false); }
  };

  const updateSectionValue = (index, value) => {
    const newContent = { ...content };
    if (!newContent[selectedPage]) newContent[selectedPage] = [];
    newContent[selectedPage][index] = { ...newContent[selectedPage][index], value };
    setContent(newContent);
  };

  const uploadImage = async (file, sectionIndex) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${API_URL}/api/upload/image`, formData, {
        headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        // Mettre à jour l'image dans le state
        const newContent = { ...content };
        if (!newContent[selectedPage]) newContent[selectedPage] = [];
        newContent[selectedPage][sectionIndex] = { ...newContent[selectedPage][sectionIndex], value: response.data.url };
        setContent(newContent);
        
        // Sauvegarder automatiquement dans la base de données
        const currentSections = newContent[selectedPage];
        await axios.post(`${API_URL}/api/content/`, 
          { page: selectedPage, sections: currentSections },
          { headers: getAuthHeaders() }
        );
        
        showMessage('success', '✅ Image téléchargée et sauvegardée!');
      }
    } catch (error) {
      showMessage('error', 'Erreur upload');
    } finally { setUploading(false); }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const currentSections = content[selectedPage] || [];

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {message.text && (
        <div className={`${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-4 py-3 mb-4 rounded`}>
          {message.text}
        </div>
      )}

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">Éditeur de Contenu</h2>
      </div>

      {/* Tabs simples */}
      <div className="border-b px-6 py-3">
        <div className="flex space-x-2 overflow-x-auto">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page.id)}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                selectedPage === page.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - CENTRÉ */}
      <div className="p-6">
        {currentSections.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p>Aucun contenu pour cette page</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {currentSections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {section.label}
                </label>
                
                {section.type === 'textarea' ? (
                  <textarea
                    value={section.value || ''}
                    onChange={(e) => updateSectionValue(index, e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : section.type === 'image' ? (
                  <div className="space-y-3">
                    {section.value && (
                      <img src={section.value} alt={section.label} className="w-full h-48 object-cover rounded" />
                    )}
                    <input
                      type="text"
                      value={section.value || ''}
                      onChange={(e) => updateSectionValue(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="URL de l'image..."
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0], index)}
                      className="hidden"
                      id={`file-${index}`}
                    />
                    <label htmlFor={`file-${index}`} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                      {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                      Télécharger
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={section.value || ''}
                    onChange={(e) => updateSectionValue(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bouton Sauvegarder */}
      {currentSections.length > 0 && (
        <div className="border-t px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={saveContent}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" />Sauvegarde...</>
              ) : (
                <><Save className="h-4 w-4 mr-2" />Sauvegarder</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
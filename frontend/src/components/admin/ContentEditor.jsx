import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Save, Upload, Loader2, CheckCircle2, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';
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
    { id: 'home', name: '🏠 Accueil', color: 'from-blue-500 to-blue-600' },
    { id: 'pricing', name: '💰 Tarifs', color: 'from-green-500 to-green-600' },
    { id: 'about', name: 'ℹ️ À propos', color: 'from-purple-500 to-purple-600' },
    { id: 'contact', name: '📞 Contact', color: 'from-orange-500 to-orange-600' },
    { id: 'pos-systems', name: '🖥️ Systèmes POS', color: 'from-indigo-500 to-indigo-600' },
    { id: 'restaurant-pos', name: '🍽️ Restaurant POS', color: 'from-red-500 to-red-600' },
    { id: 'ayapay', name: '💳 AyaPay', color: 'from-pink-500 to-pink-600' },
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
      showMessage('success', '✅ Sauvegardé!');
    } catch (error) {
      showMessage('error', '❌ Erreur');
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
        updateSectionValue(sectionIndex, response.data.url);
        showMessage('success', '✅ Image téléchargée!');
      }
    } catch (error) {
      showMessage('error', '❌ Erreur upload');
    } finally { setUploading(false); }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const currentSections = content[selectedPage] || [];
  const currentPage = pages.find(p => p.id === selectedPage);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg overflow-hidden">
      {message.text && (
        <div className={`${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-4 flex items-center space-x-3 font-semibold`}>
          {message.type === 'success' ? <CheckCircle2 className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
          <span className="text-lg">{message.text}</span>
        </div>
      )}

      {/* Header avec gradient coloré */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-6">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <FileText className="h-8 w-8 mr-3" />
          Éditeur de Contenu
        </h2>
        <p className="text-blue-100 mt-2 text-lg">Modifiez le contenu de vos pages en temps réel</p>
      </div>

      {/* Tabs colorés */}
      <div className="bg-white border-b-4 border-blue-200 px-6 py-4 overflow-x-auto">
        <div className="flex space-x-3">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page.id)}
              className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 whitespace-nowrap ${
                selectedPage === page.id
                  ? `bg-gradient-to-r ${page.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - CENTRÉ */}
      <div className="p-8">
        {currentSections.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-20 w-20 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl">Aucun contenu pour cette page</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className={`bg-gradient-to-r ${currentPage?.color || 'from-blue-500 to-blue-600'} rounded-xl p-6 text-white mb-8`}>
              <h3 className="text-2xl font-bold mb-2">{currentPage?.name}</h3>
              <p className="text-blue-100">Modifiez les champs ci-dessous pour changer le contenu de la page</p>
            </div>

            {currentSections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500">
                <label className="block text-lg font-bold text-gray-800 mb-3 flex items-center">
                  {section.type === 'image' ? <ImageIcon className="h-5 w-5 mr-2 text-blue-600" /> : <FileText className="h-5 w-5 mr-2 text-blue-600" />}
                  {section.label}
                </label>
                
                {section.type === 'textarea' ? (
                  <textarea
                    value={section.value || ''}
                    onChange={(e) => updateSectionValue(index, e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 text-lg"
                    placeholder="Entrez le contenu ici..."
                  />
                ) : section.type === 'image' ? (
                  <div className="space-y-3">
                    {section.value && (
                      <div className="relative rounded-lg overflow-hidden border-4 border-blue-200">
                        <img src={section.value} alt={section.label} className="w-full h-48 object-cover" />
                      </div>
                    )}
                    <input
                      type="text"
                      value={section.value || ''}
                      onChange={(e) => updateSectionValue(index, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 text-gray-700 text-lg"
                      placeholder="URL de l'image..."
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0], index)}
                      className="hidden"
                      id={`file-${index}`}
                    />
                    <label
                      htmlFor={`file-${index}`}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 cursor-pointer font-semibold"
                    >
                      {uploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Upload className="h-5 w-5 mr-2" />}
                      Télécharger Image
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={section.value || ''}
                    onChange={(e) => updateSectionValue(index, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 text-lg"
                    placeholder="Entrez le texte ici..."
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bouton Sauvegarder fixe en bas */}
      {currentSections.length > 0 && (
        <div className="sticky bottom-0 bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 shadow-lg">
          <div className="max-w-4xl mx-auto flex justify-center">
            <Button
              onClick={saveContent}
              disabled={saving}
              className="bg-white text-green-600 hover:bg-green-50 px-12 py-4 text-xl font-bold rounded-xl shadow-xl transform hover:scale-105 transition-all"
              size="lg"
            >
              {saving ? (
                <><Loader2 className="h-6 w-6 animate-spin mr-3" />Sauvegarde...</>
              ) : (
                <><Save className="h-6 w-6 mr-3" />💾 Sauvegarder les Modifications</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
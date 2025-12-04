import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Save, Upload, Loader2, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
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
    { id: 'ayapay', name: 'AyaPay' },
    { id: 'it-services', name: 'Services IT' },
    { id: 'contact', name: 'Contact' },
    { id: 'terms', name: 'CGV' },
    { id: 'privacy', name: 'Confidentialité' },
    { id: 'callback-popup', name: 'Popup Rappel' },
  ];

  useEffect(() => {
    loadAllContent();
  }, []);

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
      }
    } catch (error) {
      console.error('Error loading content:', error);
      showMessage('error', 'Erreur lors du chargement du contenu');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const sections = content[selectedPage] || [];
      
      const response = await axios.put(
        `${API_URL}/api/content/${selectedPage}`,
        { sections },
        { headers: getAuthHeaders() }
      );

      if (response.data.success) {
        showMessage('success', 'Contenu sauvegardé avec succès !');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      showMessage('error', 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (sectionId, file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${API_URL}/api/upload/image`,
        formData,
        { 
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        updateSectionValue(sectionId, response.data.url);
        showMessage('success', 'Image téléchargée avec succès !');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      showMessage('error', "Erreur lors du téléchargement de l'image");
    } finally {
      setUploading(false);
    }
  };

  const updateSectionValue = (sectionId, value) => {
    setContent(prev => {
      const pageSections = prev[selectedPage] || [];
      const updatedSections = pageSections.map(section =>
        section.id === sectionId ? { ...section, value } : section
      );
      return {
        ...prev,
        [selectedPage]: updatedSections
      };
    });
  };

  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      type: 'text',
      label: 'Nouveau champ',
      value: '',
      order: (content[selectedPage]?.length || 0) + 1
    };
    
    setContent(prev => ({
      ...prev,
      [selectedPage]: [...(prev[selectedPage] || []), newSection]
    }));
  };

  const deleteSection = (sectionId) => {
    setContent(prev => ({
      ...prev,
      [selectedPage]: (prev[selectedPage] || []).filter(s => s.id !== sectionId)
    }));
  };

  const updateSection = (sectionId, field, value) => {
    setContent(prev => {
      const pageSections = prev[selectedPage] || [];
      const updatedSections = pageSections.map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      );
      return {
        ...prev,
        [selectedPage]: updatedSections
      };
    });
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  const currentSections = content[selectedPage] || [];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {message.text && (
        <div className={`${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border px-4 py-3 flex items-center space-x-2 rounded-t-lg`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Éditeur de Contenu</h2>
          <div className="flex space-x-3">
            <Button onClick={addSection} variant="outline">+ Ajouter Section</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Sauvegarde...</> : <><Save className="h-4 w-4 mr-2" />Sauvegarder</>}
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedPage === page.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {page.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {currentSections.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Aucune section pour cette page.</p>
            <p className="text-sm mt-2">Cliquez sur "Ajouter Section" pour commencer.</p>
          </div>
        ) : (
          currentSections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={section.label}
                      onChange={(e) => updateSection(section.id, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={section.type}
                      onChange={(e) => updateSection(section.id, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="text">Texte</option>
                      <option value="title">Titre</option>
                      <option value="description">Description</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                </div>
                <Button onClick={() => deleteSection(section.id)} variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4">Supprimer</Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
                {section.type === 'image' ? (
                  <div className="space-y-3">
                    {/* Preview de l'image */}
                    {section.value && (
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                        <img
                          src={section.value}
                          alt={section.label}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          Aperçu
                        </div>
                      </div>
                    )}
                    
                    {/* Upload button GROS et visible */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => { const file = e.target.files[0]; if (file) handleImageUpload(section.id, file); }}
                      className="hidden"
                      id={`upload-${section.id}`}
                    />
                    <label 
                      htmlFor={`upload-${section.id}`} 
                      className="cursor-pointer flex items-center justify-center space-x-2 w-full px-6 py-4 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-all bg-blue-50"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                          <span className="text-blue-600 font-medium">Téléchargement...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-blue-600" />
                          <span className="text-blue-600 font-medium">Cliquez pour télécharger une photo</span>
                        </>
                      )}
                    </label>
                    
                    {/* URL manuelle (optionnel) */}
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-900">Ou entrer une URL manuellement</summary>
                      <input
                        type="text"
                        value={section.value}
                        onChange={(e) => updateSectionValue(section.id, e.target.value)}
                        placeholder="https://exemple.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
                      />
                    </details>
                  </div>
                ) : (
                  <textarea
                    value={section.value}
                    onChange={(e) => updateSectionValue(section.id, e.target.value)}
                    rows={section.type === 'title' ? 2 : 4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`Entrez le ${section.label.toLowerCase()}...`}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentEditor;
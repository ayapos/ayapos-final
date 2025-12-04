import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  LogOut, 
  Save, 
  Upload, 
  Home, 
  DollarSign, 
  CreditCard, 
  Code, 
  Mail, 
  FileText,
  Bell,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const { isAuthenticated, user, logout, getAuthHeaders, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [selectedPage, setSelectedPage] = useState('home');
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const pages = [
    { id: 'home', name: 'Accueil', icon: Home },
    { id: 'pricing', name: 'Tarifs', icon: DollarSign },
    { id: 'ayapay', name: 'AyaPay', icon: CreditCard },
    { id: 'it-services', name: 'Services IT', icon: Code },
    { id: 'contact', name: 'Contact', icon: Mail },
    { id: 'terms', name: 'CGV', icon: FileText },
    { id: 'privacy', name: 'Confidentialité', icon: FileText },
    { id: 'callback-popup', name: 'Popup Rappel', icon: Bell },
  ];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllContent();
    }
  }, [isAuthenticated]);

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
      showMessage('error', 'Erreur lors du téléchargement de l\'image');
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

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const currentSections = content[selectedPage] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-black text-[#1e3a8a]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                AyaPos
              </h1>
              <span className="text-sm text-gray-500">Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Message Banner */}
      {message.text && (
        <div className={`${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
        } border-b px-4 py-3 flex items-center justify-center space-x-2`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Page Selector */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-gray-900 mb-4">Pages</h2>
              <nav className="space-y-1">
                {pages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.id}
                      onClick={() => setSelectedPage(page.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        selectedPage === page.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{page.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content - Editor */}
          <div className="col-span-9">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {pages.find(p => p.id === selectedPage)?.name || 'Page'}
                </h2>
                <div className="flex space-x-3">
                  <Button
                    onClick={addSection}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <span>+ Ajouter Section</span>
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sauvegarde...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Sauvegarder</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Content Editor */}
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
                          {/* Label */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Label
                            </label>
                            <input
                              type="text"
                              value={section.label}
                              onChange={(e) => updateSection(section.id, 'label', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          {/* Type */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Type
                            </label>
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
                        <Button
                          onClick={() => deleteSection(section.id)}
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
                        >
                          Supprimer
                        </Button>
                      </div>

                      {/* Value */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contenu
                        </label>
                        {section.type === 'image' ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={section.value}
                              onChange={(e) => updateSectionValue(section.id, e.target.value)}
                              placeholder="/images/example.jpg"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex items-center space-x-3">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) handleImageUpload(section.id, file);
                                }}
                                className="hidden"
                                id={`upload-${section.id}`}
                              />
                              <label
                                htmlFor={`upload-${section.id}`}
                                className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                {uploading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Upload className="h-4 w-4" />
                                )}
                                <span>Télécharger une image</span>
                              </label>
                              {section.value && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <ImageIcon className="h-4 w-4" />
                                  <span>{section.value}</span>
                                </div>
                              )}
                            </div>
                            {section.value && (
                              <img
                                src={section.value}
                                alt="Preview"
                                className="mt-2 max-w-xs rounded-lg border border-gray-200"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

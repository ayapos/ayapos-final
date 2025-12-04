import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, LogOut, Save, Eye, Upload, Trash2, Plus, Search,
  Home, Utensils, CreditCard, Monitor, Smartphone, DollarSign, Info, 
  Phone, Code, Package, ShoppingCart, Truck, Settings, BarChart3,
  FileText, Shield, Image as ImageIcon, ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminComplete = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedPage, setSelectedPage] = useState('restaurant-pos');
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Liste COMPLÈTE de toutes les pages du site
  const allPages = [
    { slug: 'home', name: 'Page d\'Accueil', icon: Home, category: 'Principal' },
    { slug: 'restaurant-pos', name: 'Restaurant POS', icon: Utensils, category: 'Solutions Restaurant' },
    { slug: 'self-order-kiosk', name: 'Kiosque Commande', icon: Monitor, category: 'Solutions Restaurant' },
    { slug: 'kiosk-pricing', name: 'Tarifs Kiosque', icon: DollarSign, category: 'Solutions Restaurant' },
    { slug: 'order-system', name: 'Système Commande', icon: ShoppingCart, category: 'Solutions Restaurant' },
    { slug: 'order-system-pricing', name: 'Tarifs Système', icon: DollarSign, category: 'Solutions Restaurant' },
    { slug: 'waiter-terminal', name: 'Terminal Serveur', icon: Smartphone, category: 'Solutions Restaurant' },
    { slug: 'waiter-terminal-pricing', name: 'Tarifs Terminal', icon: DollarSign, category: 'Solutions Restaurant' },
    { slug: 'mobile-order-app', name: 'App Commande Mobile', icon: Smartphone, category: 'Solutions Restaurant' },
    { slug: 'robot-waiter', name: 'Robot Serveur', icon: Settings, category: 'Solutions Restaurant' },
    { slug: 'delivery-management', name: 'Gestion Livraison', icon: Truck, category: 'Solutions Restaurant' },
    { slug: 'delivery-service-pricing', name: 'Tarifs Livraison', icon: DollarSign, category: 'Solutions Restaurant' },
    { slug: 'ayapay', name: 'AyaPay Paiement', icon: CreditCard, category: 'Paiement' },
    { slug: 'pos', name: 'Systèmes POS', icon: Monitor, category: 'POS' },
    { slug: 'digital', name: 'Solutions Digitales', icon: Smartphone, category: 'Digital' },
    { slug: 'web-portal', name: 'Portail Web', icon: Code, category: 'Outils Gestion' },
    { slug: 'mobile-reports', name: 'Rapports Mobile', icon: BarChart3, category: 'Outils Gestion' },
    { slug: 'stock-management', name: 'Gestion Stock', icon: Package, category: 'Outils Gestion' },
    { slug: 'centralized-management', name: 'Gestion Centralisée', icon: Settings, category: 'Outils Gestion' },
    { slug: 'hardware-devices', name: 'Matériel & Devices', icon: Monitor, category: 'Matériel' },
    { slug: 'pricing', name: 'Tarifs Généraux', icon: DollarSign, category: 'Commercial' },
    { slug: 'about', name: 'À Propos', icon: Info, category: 'Institutionnel' },
    { slug: 'contact', name: 'Contact', icon: Phone, category: 'Institutionnel' },
    { slug: 'it-services', name: 'Services IT', icon: Code, category: 'Services' },
    { slug: 'blog', name: 'Blog', icon: FileText, category: 'Contenu' },
    { slug: 'terms-conditions', name: 'CGU', icon: Shield, category: 'Légal' },
    { slug: 'privacy-policy', name: 'Confidentialité', icon: Shield, category: 'Légal' }
  ];

  // Grouper les pages par catégorie
  const pagesByCategory = allPages.reduce((acc, page) => {
    if (!acc[page.category]) acc[page.category] = [];
    acc[page.category].push(page);
    return acc;
  }, {});

  // Filtrer les pages selon la recherche
  const filteredPages = allPages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadPageData(selectedPage);
  }, [selectedPage]);

  const loadPageData = async (slug) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/content/${slug}`);
      if (response.data.success) {
        setPageData(response.data.content || {});
      } else {
        // Si la page n'existe pas encore, initialiser avec une structure vide
        setPageData({
          slug: slug,
          page_title: '',
          hero_title: '',
          hero_subtitle: '',
          hero_image: '',
          features: [],
          benefits: [],
          sections: {}
        });
      }
    } catch (error) {
      console.error('Erreur chargement page:', error);
      // Initialiser avec structure vide en cas d'erreur
      setPageData({
        slug: slug,
        page_title: '',
        hero_title: '',
        hero_subtitle: '',
        hero_image: '',
        features: [],
        benefits: [],
        sections: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const savePageData = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(
        `${API_URL}/api/content/${selectedPage}`,
        { content: pageData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({
        title: "✅ Sauvegardé !",
        description: `La page "${allPages.find(p => p.slug === selectedPage)?.name}" a été mise à jour.`,
      });
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file, fieldPath) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const token = localStorage.getItem('admin_token');
      console.log('🔄 Upload de l\'image:', file.name);
      console.log('📍 API URL:', API_URL);
      console.log('🔑 Token présent:', !!token);
      
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('✅ Réponse upload:', response.data);
      
      if (response.data.success) {
        updateField(fieldPath, response.data.url);
        toast({
          title: "✅ Image uploadée",
          description: `Image ${file.name} téléchargée avec succès`,
        });
        
        // Sauvegarder automatiquement après upload
        setTimeout(() => {
          savePageData();
        }, 500);
      } else {
        throw new Error('Upload échoué');
      }
    } catch (error) {
      console.error('❌ Erreur upload complète:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'Erreur inconnue';
      toast({
        title: "Erreur d'upload",
        description: `Impossible de télécharger: ${errorMsg}`,
        variant: "destructive"
      });
    }
  };

  const updateField = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    setPageData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName]?.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ) || []
    }));
  };

  const addArrayItem = (arrayName, template) => {
    setPageData(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), template]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setPageData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName]?.filter((_, i) => i !== index) || []
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const renderImageField = (label, fieldName, currentValue) => (
    <div className="space-y-2">
      <Label className="font-semibold">{label}</Label>
      {currentValue && (
        <div className="relative">
          <img 
            src={currentValue} 
            alt={label}
            className="w-full h-48 object-cover rounded-lg border-2"
          />
          <Button
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => updateField(fieldName, '')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={currentValue || ''}
          onChange={(e) => updateField(fieldName, e.target.value)}
          placeholder="URL de l'image"
        />
        <Button 
          variant="outline"
          onClick={() => document.getElementById(`upload-${fieldName}`).click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
        <input
          id={`upload-${fieldName}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], fieldName)}
        />
      </div>
    </div>
  );

  const updateSectionItem = (sectionName, index, field, value) => {
    setPageData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: {
          ...prev.sections?.[sectionName],
          items: prev.sections?.[sectionName]?.items?.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          ) || []
        }
      }
    }));
  };

  const updateSectionTitle = (sectionName, value) => {
    setPageData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: {
          ...prev.sections?.[sectionName],
          title: value
        }
      }
    }));
  };

  const addSectionItem = (sectionName) => {
    setPageData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: {
          ...prev.sections?.[sectionName],
          items: [
            ...(prev.sections?.[sectionName]?.items || []),
            { icon: '⭐', title: '', description: '' }
          ]
        }
      }
    }));
  };

  const removeSectionItem = (sectionName, index) => {
    setPageData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: {
          ...prev.sections?.[sectionName],
          items: prev.sections?.[sectionName]?.items?.filter((_, i) => i !== index) || []
        }
      }
    }));
  };

  const addCustomSection = (sectionName) => {
    setPageData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: {
          title: 'Nouvelle Section',
          items: []
        }
      }
    }));
  };

  const renderEditor = () => {
    const currentPageInfo = allPages.find(p => p.slug === selectedPage);
    
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de la page...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        {/* Header fixe */}
        <div className="bg-white border-b px-8 py-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{currentPageInfo?.name}</h2>
            <p className="text-gray-600 mt-1">✏️ Modifiez TOUT : Photos, Textes, Sections</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => window.open(`/${selectedPage}`, '_blank')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Voir le Site
            </Button>
            <Button 
              onClick={savePageData} 
              disabled={saving}
              size="lg"
              className="px-8 bg-green-600 hover:bg-green-700"
            >
              <Save className="h-5 w-5 mr-2" />
              {saving ? 'Publication...' : '💾 Sauvegarder et Publier'}
            </Button>
          </div>
        </div>

        {/* Contenu scrollable */}
        <ScrollArea className="flex-1">
          <div className="p-8 space-y-8">
            {/* SECTION HERO */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ImageIcon className="h-6 w-6" />
                  Section Hero (Bannière Principale)
                </CardTitle>
                <CardDescription>La première section visible sur la page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <Label className="font-semibold">Titre de la Page</Label>
                  <Input
                    value={pageData.page_title || ''}
                    onChange={(e) => updateField('page_title', e.target.value)}
                    placeholder="Titre SEO de la page"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="font-semibold">Titre Principal (Hero)</Label>
                  <Input
                    value={pageData.hero_title || ''}
                    onChange={(e) => updateField('hero_title', e.target.value)}
                    placeholder="Ex: 🍽️ Système POS Restaurant Complet"
                    className="text-xl h-14 mt-2"
                  />
                </div>
                
                <div>
                  <Label className="font-semibold">Sous-titre</Label>
                  <Textarea
                    value={pageData.hero_subtitle || ''}
                    onChange={(e) => updateField('hero_subtitle', e.target.value)}
                    placeholder="Description principale"
                    rows={3}
                    className="mt-2"
                  />
                </div>
                
                {renderImageField('Image Hero', 'hero_image', pageData.hero_image)}
              </CardContent>
            </Card>

            {/* SECTION FEATURES */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-2xl">✨ Fonctionnalités</CardTitle>
                <CardDescription>Liste des fonctionnalités principales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {pageData.features?.length > 0 ? (
                  <div className="space-y-4">
                    {pageData.features.map((feature, index) => (
                      <Card key={index} className="border-2">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Feature #{index + 1}</CardTitle>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeArrayItem('features', index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-xs">Icône</Label>
                            <Input
                              value={feature.icon || ''}
                              onChange={(e) => updateArrayItem('features', index, 'icon', e.target.value)}
                              placeholder="Ex: Cloud, Star"
                              className="h-9 mt-1"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs">Titre</Label>
                            <Input
                              value={feature.title || ''}
                              onChange={(e) => updateArrayItem('features', index, 'title', e.target.value)}
                              placeholder="Titre de la fonctionnalité"
                              className="h-9 mt-1"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <Label className="text-xs">Description</Label>
                            <Textarea
                              value={feature.description || ''}
                              onChange={(e) => updateArrayItem('features', index, 'description', e.target.value)}
                              placeholder="Description détaillée"
                              rows={2}
                              className="mt-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">Aucune fonctionnalité. Ajoutez-en une ci-dessous.</p>
                )}
                
                <Button
                  onClick={() => addArrayItem('features', { icon: 'Star', title: '', description: '' })}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une Fonctionnalité
                </Button>
              </CardContent>
            </Card>

            {/* SECTION BENEFITS (avec images) */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                <CardTitle className="text-2xl">💎 Bénéfices (avec images)</CardTitle>
                <CardDescription>Avantages principaux avec images illustratives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {pageData.benefits?.map((benefit, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Bénéfice #{index + 1}</CardTitle>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeArrayItem('benefits', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <div>
                        <Label>Titre</Label>
                        <Input
                          value={benefit.title || ''}
                          onChange={(e) => updateArrayItem('benefits', index, 'title', e.target.value)}
                          placeholder="Titre du bénéfice"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={benefit.description || ''}
                          onChange={(e) => updateArrayItem('benefits', index, 'description', e.target.value)}
                          placeholder="Description complète"
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label>Image</Label>
                        {benefit.image && (
                          <div className="relative mt-2">
                            <img 
                              src={benefit.image} 
                              alt={benefit.title}
                              className="w-full h-40 object-cover rounded border"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2"
                              onClick={() => updateArrayItem('benefits', index, 'image', '')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <div className="flex gap-2 mt-2">
                          <Input
                            value={benefit.image || ''}
                            onChange={(e) => updateArrayItem('benefits', index, 'image', e.target.value)}
                            placeholder="URL de l'image ou uploadez"
                          />
                          <Button 
                            variant="outline"
                            onClick={() => document.getElementById(`benefit-upload-${index}`).click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                          <input
                            id={`benefit-upload-${index}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files[0]) {
                                const file = e.target.files[0];
                                const formData = new FormData();
                                formData.append('file', file);
                                
                                try {
                                  const token = localStorage.getItem('adminToken');
                                  console.log('🔄 Upload benefit image:', file.name);
                                  
                                  const response = await axios.post(`${API_URL}/api/upload`, formData, {
                                    headers: {
                                      'Content-Type': 'multipart/form-data',
                                      Authorization: `Bearer ${token}`
                                    }
                                  });
                                  
                                  console.log('✅ Upload response:', response.data);
                                  
                                  if (response.data.success) {
                                    updateArrayItem('benefits', index, 'image', response.data.url);
                                    toast({
                                      title: "✅ Image uploadée",
                                      description: `Image du bénéfice #${index + 1} téléchargée`,
                                    });
                                    
                                    // Sauvegarder automatiquement
                                    setTimeout(() => {
                                      savePageData();
                                    }, 500);
                                  }
                                } catch (error) {
                                  console.error('❌ Erreur upload benefit:', error);
                                  const errorMsg = error.response?.data?.detail || error.message || 'Erreur inconnue';
                                  toast({
                                    title: "Erreur d'upload",
                                    description: errorMsg,
                                    variant: "destructive"
                                  });
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  onClick={() => addArrayItem('benefits', { title: '', description: '', image: '' })}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un Bénéfice
                </Button>
              </CardContent>
            </Card>

            {/* SECTIONS PERSONNALISÉES */}
            {Object.entries(pageData.sections || {}).map(([sectionKey, sectionData]) => (
              <Card key={sectionKey}>
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl capitalize">
                        📋 {sectionKey.replace(/_/g, ' ')}
                      </CardTitle>
                      <CardDescription>Section personnalisée avec éléments multiples</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newSections = { ...pageData.sections };
                        delete newSections[sectionKey];
                        setPageData(prev => ({ ...prev, sections: newSections }));
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer Section
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <Label className="font-semibold">Titre de la Section</Label>
                    <Input
                      value={sectionData.title || ''}
                      onChange={(e) => updateSectionTitle(sectionKey, e.target.value)}
                      placeholder="Titre de cette section"
                      className="mt-1"
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <Label className="font-semibold">Éléments de la section</Label>
                    {sectionData.items?.map((item, index) => (
                      <Card key={index} className="border">
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs text-gray-500">Élément #{index + 1}</Label>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeSectionItem(sectionKey, index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-xs">Icône Emoji</Label>
                              <Input
                                value={item.icon || ''}
                                onChange={(e) => updateSectionItem(sectionKey, index, 'icon', e.target.value)}
                                placeholder="Ex: 🔄 ✨ 💡"
                                className="h-9 text-center text-lg"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label className="text-xs">Titre</Label>
                              <Input
                                value={item.title || ''}
                                onChange={(e) => updateSectionItem(sectionKey, index, 'title', e.target.value)}
                                placeholder="Titre de l'élément"
                                className="h-9"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs">Description</Label>
                            <Textarea
                              value={item.description || ''}
                              onChange={(e) => updateSectionItem(sectionKey, index, 'description', e.target.value)}
                              placeholder="Description détaillée"
                              rows={2}
                            />
                          </div>
                          
                          {item.image !== undefined && (
                            <div>
                              <Label className="text-xs">Image (optionnelle)</Label>
                              {item.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.title}
                                  className="w-full h-32 object-cover rounded border mt-1"
                                />
                              )}
                              <Input
                                value={item.image || ''}
                                onChange={(e) => updateSectionItem(sectionKey, index, 'image', e.target.value)}
                                placeholder="URL de l'image"
                                className="mt-1"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => addSectionItem(sectionKey)}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un Élément
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Bouton pour ajouter une nouvelle section */}
            <Card className="border-dashed border-2">
              <CardContent className="pt-6">
                <Button
                  onClick={() => {
                    const sectionName = prompt('Nom de la nouvelle section (ex: pricing, testimonials):');
                    if (sectionName) {
                      addCustomSection(sectionName);
                    }
                  }}
                  variant="outline"
                  className="w-full h-16"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  ➕ Ajouter une Nouvelle Section Personnalisée
                </Button>
              </CardContent>
            </Card>

            {/* SECTION CTA */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="text-2xl">🚀 Call-to-Action Final</CardTitle>
                <CardDescription>Message final pour inciter à l'action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label className="font-semibold">Titre CTA</Label>
                  <Input
                    value={pageData.cta_title || ''}
                    onChange={(e) => updateField('cta_title', e.target.value)}
                    placeholder="Ex: AYAPOS SYSTÈMES POS NOUVELLE GÉNÉRATION"
                    className="mt-2 text-lg"
                  />
                </div>
                
                <div>
                  <Label className="font-semibold">Sous-titre CTA</Label>
                  <Input
                    value={pageData.cta_subtitle || ''}
                    onChange={(e) => updateField('cta_subtitle', e.target.value)}
                    placeholder="Ex: Ayez toujours une longueur d'avance!"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bouton de sauvegarde final */}
            <div className="flex justify-center py-8">
              <Button 
                onClick={savePageData} 
                disabled={saving}
                size="lg"
                className="px-16"
              >
                <Save className="h-5 w-5 mr-2" />
                {saving ? 'Sauvegarde en cours...' : 'Sauvegarder Toutes les Modifications'}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* SIDEBAR GAUCHE - Liste des pages */}
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-2xl font-black text-white">AyaPos Admin</h1>
          <p className="text-blue-100 text-sm mt-1">Gestion Complète du Site</p>
        </div>

        {/* Recherche */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une page..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Liste des pages */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {Object.entries(pagesByCategory).map(([category, pages]) => {
              const categoryPages = pages.filter(page =>
                page.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
              
              if (categoryPages.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 px-2">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {categoryPages.map(page => {
                      const Icon = page.icon;
                      const isSelected = selectedPage === page.slug;
                      
                      return (
                        <button
                          key={page.slug}
                          onClick={() => setSelectedPage(page.slug)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                            isSelected
                              ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                          <span className="text-sm text-left flex-1 truncate">{page.name}</span>
                          {isSelected && <ChevronRight className="h-4 w-4 text-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* CONTENU PRINCIPAL - Éditeur */}
      <div className="flex-1 overflow-hidden">
        {renderEditor()}
      </div>
    </div>
  );
};

export default AdminComplete;

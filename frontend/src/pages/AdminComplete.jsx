import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, LogOut, Save, Eye, Upload, Trash2, Plus, Search,
  Home, Utensils, CreditCard, Monitor, Smartphone, DollarSign, Info, 
  Phone, Code, Package, ShoppingCart, Truck, Settings, BarChart3,
  FileText, Shield, Image as ImageIcon, ChevronRight, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';
import AIAssistant from '../components/admin/AIAssistantModern';
import MediaLibrary from '../components/admin/MediaLibrary';
import DynamicEditor from '../components/admin/DynamicEditor';
import ProductsManager from '../components/admin/ProductsManager';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminComplete = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedPage, setSelectedPage] = useState('restaurant-pos');
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'photos', 'packages', ou 'popup'
  
  // États pour le popup promotionnel
  const [popupConfig, setPopupConfig] = useState({
    enabled: false,
    title: '',
    description: '',
    image: '',
    button_text: 'Contactez-nous',
    contact_email: 'emrah@ayapos.com',
    whatsapp_number: '',
    show_on_pages: ['home']
  });
  const [loadingPopup, setLoadingPopup] = useState(false);

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
      
      if (!token) {
        throw new Error('Token manquant - veuillez vous reconnecter');
      }
      
      console.log('💾 Sauvegarde de:', selectedPage);
      console.log('📦 Données:', Object.keys(pageData));
      
      const response = await axios.put(
        `${API_URL}/api/content/${selectedPage}`,
        { content: pageData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log('✅ Réponse sauvegarde:', response.data);
      
      toast({
        title: "✅ Sauvegardé !",
        description: `La page "${allPages.find(p => p.slug === selectedPage)?.name}" a été mise à jour.`,
      });
    } catch (error) {
      console.error('❌ Erreur sauvegarde complète:', error);
      
      // Si erreur 401, token expiré
      if (error.response?.status === 401) {
        toast({
          title: "⚠️ Session expirée",
          description: "Veuillez vous reconnecter",
          variant: "destructive"
        });
        
        // Rediriger vers login après 2 secondes
        setTimeout(() => {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_email');
          navigate('/admin/login');
        }, 2000);
      } else {
        const errorMsg = error.response?.data?.detail || error.message || 'Erreur inconnue';
        toast({
          title: "❌ Erreur de sauvegarde",
          description: errorMsg,
          variant: "destructive"
        });
      }
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
      console.log('📍 Field Path:', fieldPath);
      console.log('🔑 Token présent:', !!token);
      
      const response = await axios.post(`${API_URL}/api/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('✅ Réponse upload:', response.data);
      
      if (response.data.success) {
        // Mettre à jour le champ avec le chemin complet (ex: "solutions.0.image")
        const keys = fieldPath.split('.');
        const newData = JSON.parse(JSON.stringify(pageData));
        
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = response.data.url;
        
        console.log('📦 Nouvelles données après upload:', { fieldPath, url: response.data.url });
        setPageData(newData);
        
        toast({
          title: "✅ Image uploadée",
          description: `Image ${file.name} téléchargée avec succès`,
        });
        
        // Sauvegarder automatiquement après upload avec les nouvelles données
        setTimeout(async () => {
          setSaving(true);
          try {
            const token = localStorage.getItem('admin_token');
            
            console.log('💾 Auto-sauvegarde après upload image');
            console.log('📦 Données à sauvegarder:', Object.keys(newData));
            
            const saveResponse = await axios.put(
              `${API_URL}/api/content/${selectedPage}`,
              { content: newData },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            
            console.log('✅ Auto-sauvegarde réussie:', saveResponse.data);
            
            toast({
              title: "✅ Sauvegardé automatiquement",
              description: "L'image a été enregistrée dans la base de données",
            });
          } catch (error) {
            console.error('❌ Erreur auto-sauvegarde:', error);
            toast({
              title: "⚠️ Image uploadée mais non sauvegardée",
              description: "Veuillez cliquer sur 'Sauvegarder et Publier' pour enregistrer",
              variant: "destructive"
            });
          } finally {
            setSaving(false);
          }
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
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
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

  // États pour le carrousel
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(false);
  
  // Charger les slides du carrousel pour la page d'accueil
  useEffect(() => {
    if (selectedPage === 'home') {
      loadCarouselSlides();
    }
  }, [selectedPage]);
  
  const loadCarouselSlides = async () => {
    setLoadingCarousel(true);
    try {
      const response = await axios.get(`${API_URL}/api/hero/`);
      if (response.data.success) {
        setCarouselSlides(response.data.slides || []);
      }
    } catch (error) {
      console.error('Erreur chargement carrousel:', error);
    } finally {
      setLoadingCarousel(false);
    }
  };
  
  const updateCarouselSlide = (index, field, value) => {
    const updatedSlides = carouselSlides.map((slide, i) => 
      i === index ? { ...slide, [field]: value } : slide
    );
    setCarouselSlides(updatedSlides);
    return updatedSlides; // Retourner les nouvelles données pour un usage immédiat
  };
  
  const addCarouselSlide = () => {
    setCarouselSlides(prev => [...prev, {
      title: 'Nouveau Slide',
      subtitle: 'Description du slide',
      image: '',
      order: prev.length
    }]);
  };
  
  const removeCarouselSlide = (index) => {
    setCarouselSlides(prev => prev.filter((_, i) => i !== index));
  };
  
  const saveCarouselSlides = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      
      // Sauvegarder chaque slide
      for (let i = 0; i < carouselSlides.length; i++) {
        const slide = carouselSlides[i];
        if (slide.id) {
          // Update
          await axios.put(
            `${API_URL}/api/hero/${slide.id}`,
            slide,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          // Create
          await axios.post(
            `${API_URL}/api/hero/`,
            { ...slide, order: i },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }
      
      toast({
        title: "✅ Carrousel sauvegardé !",
        description: `${carouselSlides.length} slides mis à jour`,
      });
      
      // Recharger
      loadCarouselSlides();
    } catch (error) {
      console.error('❌ Erreur sauvegarde carrousel:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le carrousel",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const renderEditor = () => {
    const currentPageInfo = allPages.find(p => p.slug === selectedPage);
    
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader2 className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Chargement de la page...</p>
          </div>
        </div>
      );
    }

    const handleUpdateData = (newData) => {
      setPageData(newData);
    };

    const isHomePage = selectedPage === 'home';

    return (
      <div className="h-full flex flex-col">
        {/* Header fixe */}
        <div className="bg-white border-b px-8 py-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{currentPageInfo?.name}</h2>
            <p className="text-gray-600 mt-1">✏️ Éditeur intelligent - modifiez tout le contenu de la page</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                const url = selectedPage === 'home' ? '/' : `/${selectedPage}`;
                window.open(url, '_blank');
              }}
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
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Publication...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  💾 Sauvegarder et Publier
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Contenu scrollable */}
        <ScrollArea className="flex-1">
          <div className="p-8 space-y-8">
            
            {/* SECTION CARROUSEL (uniquement pour la page d'accueil) */}
            {isHomePage && (
              <Card>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">🎠 Carrousel Hero (Page d&apos;Accueil)</CardTitle>
                      <CardDescription>Gérez les slides du carrousel de la page d&apos;accueil</CardDescription>
                    </div>
                    <Button onClick={saveCarouselSlides} disabled={saving} variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder Carrousel
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {loadingCarousel ? (
                    <div className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                    </div>
                  ) : (
                    <>
                      {carouselSlides.map((slide, index) => (
                        <Card key={index} className="border-2">
                          <CardHeader className="pb-3 bg-gray-50">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">Slide #{index + 1}</CardTitle>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeCarouselSlide(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 pt-4">
                            <div>
                              <Label className="font-semibold">Titre</Label>
                              <Input
                                value={slide.title || ''}
                                onChange={(e) => updateCarouselSlide(index, 'title', e.target.value)}
                                placeholder="Titre du slide"
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label className="font-semibold">Sous-titre</Label>
                              <Textarea
                                value={slide.subtitle || ''}
                                onChange={(e) => updateCarouselSlide(index, 'subtitle', e.target.value)}
                                placeholder="Description du slide"
                                rows={2}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label className="font-semibold">Image</Label>
                              {slide.image && (
                                <div className="relative mt-2">
                                  <img 
                                    src={slide.image} 
                                    alt={slide.title}
                                    className="w-full h-48 object-cover rounded border"
                                  />
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="absolute top-2 right-2"
                                    onClick={() => updateCarouselSlide(index, 'image', '')}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                              <div className="flex gap-2 mt-2">
                                <Input
                                  value={slide.image || ''}
                                  onChange={(e) => updateCarouselSlide(index, 'image', e.target.value)}
                                  placeholder="URL de l'image"
                                />
                                <Button 
                                  variant="outline"
                                  onClick={() => document.getElementById(`carousel-upload-${index}`).click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload
                                </Button>
                                <input
                                  id={`carousel-upload-${index}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={async (e) => {
                                    if (e.target.files[0]) {
                                      const file = e.target.files[0];
                                      const formData = new FormData();
                                      formData.append('file', file);
                                      
                                      try {
                                        const token = localStorage.getItem('admin_token');
                                        console.log('🔄 Upload carrousel - Slide #', index + 1);
                                        
                                        const response = await axios.post(`${API_URL}/api/upload/image`, formData, {
                                          headers: {
                                            'Content-Type': 'multipart/form-data',
                                            Authorization: `Bearer ${token}`
                                          }
                                        });
                                        
                                        if (response.data.success) {
                                          console.log('✅ Image uploadée:', response.data.url);
                                          
                                          // Mettre à jour l'état ET récupérer les nouvelles données
                                          const updatedSlides = updateCarouselSlide(index, 'image', response.data.url);
                                          
                                          toast({
                                            title: "✅ Image uploadée",
                                            description: `Image du slide #${index + 1} téléchargée`,
                                          });
                                          
                                          // Auto-save avec les nouvelles données immédiatement
                                          setTimeout(async () => {
                                            setSaving(true);
                                            try {
                                              const token = localStorage.getItem('admin_token');
                                              const slideToSave = updatedSlides[index];
                                              
                                              console.log('💾 Sauvegarde auto du slide:', slideToSave.id || 'nouveau');
                                              
                                              if (slideToSave.id) {
                                                await axios.put(
                                                  `${API_URL}/api/hero/${slideToSave.id}`,
                                                  slideToSave,
                                                  { headers: { Authorization: `Bearer ${token}` } }
                                                );
                                              } else {
                                                await axios.post(
                                                  `${API_URL}/api/hero/`,
                                                  { ...slideToSave, order: index },
                                                  { headers: { Authorization: `Bearer ${token}` } }
                                                );
                                              }
                                              
                                              console.log('✅ Carrousel sauvegardé automatiquement');
                                              toast({
                                                title: "✅ Sauvegardé",
                                                description: "L'image a été enregistrée automatiquement",
                                              });
                                              
                                              // Recharger pour sync
                                              loadCarouselSlides();
                                            } catch (error) {
                                              console.error('❌ Erreur sauvegarde auto:', error);
                                              toast({
                                                title: "⚠️ Attention",
                                                description: "L'image est uploadée mais non sauvegardée. Cliquez sur 'Sauvegarder Carrousel'",
                                                variant: "destructive"
                                              });
                                            } finally {
                                              setSaving(false);
                                            }
                                          }, 500);
                                        }
                                      } catch (error) {
                                        console.error('❌ Erreur upload carrousel:', error);
                                        toast({
                                          title: "Erreur d'upload",
                                          description: error.response?.data?.detail || error.message,
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
                        onClick={addCarouselSlide}
                        variant="outline"
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un Slide
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* ÉDITEUR DYNAMIQUE - S'adapte automatiquement à la structure des données */}
            {Object.keys(pageData).length > 0 ? (
              <DynamicEditor 
                data={pageData} 
                onUpdate={handleUpdateData}
                onImageUpload={handleImageUpload}
              />
            ) : (
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
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Duplicate code removed

  // Orphaned code removed

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

      {/* CONTENU PRINCIPAL - Avec Onglets */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Onglets */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('editor')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'editor'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Éditeur de Pages
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('photos')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'photos'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Bibliothèque Photos
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'packages'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                📦 Packages POS
              </span>
            </button>
          </div>
        </div>

        {/* Contenu de l'onglet actif */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'editor' ? (
            renderEditor()
          ) : activeTab === 'photos' ? (
            <MediaLibrary />
          ) : (
            <div className="p-6">
              <ProductsManager />
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant - Floating */}
      <AIAssistant 
        currentPage={allPages.find(p => p.slug === selectedPage)}
        onContentUpdate={() => {
          // Recharger le contenu après modification par l'AI
          loadPageData();
        }}
      />
    </div>
  );
};

export default AdminComplete;

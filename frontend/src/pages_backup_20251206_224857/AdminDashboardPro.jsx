import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, FileText, Package, Image, MessageSquare, 
  HelpCircle, Users, LogOut, Save, Eye, Upload, X, Plus,
  Home, Utensils, CreditCard, Monitor, Smartphone, DollarSign,
  Info, Phone, Code, ChevronRight, Search, Edit, Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { Separator } from '../components/ui/separator';
import RestaurantPOSEditor from '../components/admin/RestaurantPOSEditor';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboardPro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // États
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activePageEditor, setActivePageEditor] = useState('home');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Données
  const [stats, setStats] = useState({
    products: 0,
    pages: 0,
    testimonials: 0,
    faqs: 0
  });
  
  const [pageData, setPageData] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_image: '',
    sections: {}
  });
  
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  
  // Structure des pages du site
  const sitePages = [
    { id: 'home', name: 'Page d\'Accueil', icon: Home, slug: 'home' },
    { id: 'restaurant-pos', name: 'Restaurant POS', icon: Utensils, slug: 'restaurant-pos' },
    { id: 'ayapay', name: 'AyaPay (Paiement)', icon: CreditCard, slug: 'ayapay' },
    { id: 'pos-systems', name: 'Systèmes POS', icon: Monitor, slug: 'pos-systems' },
    { id: 'digital', name: 'Solutions Digitales', icon: Smartphone, slug: 'digital' },
    { id: 'pricing', name: 'Tarifs', icon: DollarSign, slug: 'pricing' },
    { id: 'about', name: 'À Propos', icon: Info, slug: 'about' },
    { id: 'contact', name: 'Contact', icon: Phone, slug: 'contact' },
    { id: 'it-services', name: 'Services IT', icon: Code, slug: 'it-services' }
  ];
  
  // Menu latéral
  const menuSections = [
    { id: 'dashboard', name: 'Tableau de Bord', icon: LayoutDashboard },
    { id: 'pages', name: 'Gestion des Pages', icon: FileText },
    { id: 'products', name: 'Produits & Terminaux', icon: Package },
    { id: 'global', name: 'Éléments Globaux', icon: Image }
  ];

  // Charger les statistiques au montage
  useEffect(() => {
    loadStats();
  }, []);
  
  // Charger les données quand on change de section
  useEffect(() => {
    if (activeSection === 'pages') {
      loadPageData(activePageEditor);
    } else if (activeSection === 'products') {
      loadProducts();
    } else if (activeSection === 'global') {
      loadGlobalElements();
    }
  }, [activeSection, activePageEditor]);

  const loadStats = async () => {
    try {
      const [productsRes, testimonialsRes, faqsRes] = await Promise.all([
        axios.get(`${API_URL}/api/products/`),
        axios.get(`${API_URL}/api/testimonials/`),
        axios.get(`${API_URL}/api/faq/`)
      ]);
      
      setStats({
        products: productsRes.data.products?.length || 0,
        pages: sitePages.length,
        testimonials: testimonialsRes.data.testimonials?.length || 0,
        faqs: faqsRes.data.faqs?.length || 0
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const loadPageData = async (pageSlug) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/content/${pageSlug}`);
      if (response.data.success) {
        setPageData(response.data.content || {});
      }
    } catch (error) {
      console.error('Erreur chargement page:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données de la page",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/products/`);
      if (response.data.success) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.error('Erreur chargement produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadGlobalElements = async () => {
    setLoading(true);
    try {
      const [testimonialsRes, faqsRes] = await Promise.all([
        axios.get(`${API_URL}/api/testimonials/`),
        axios.get(`${API_URL}/api/faq/`)
      ]);
      
      setTestimonials(testimonialsRes.data.testimonials || []);
      setFaqs(faqsRes.data.faqs || []);
    } catch (error) {
      console.error('Erreur chargement éléments globaux:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePageData = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${API_URL}/api/content/${activePageEditor}`,
        { content: pageData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({
        title: "✅ Sauvegardé !",
        description: "Les modifications ont été enregistrées avec succès.",
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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleImageUpload = async (file, fieldName) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setPageData(prev => ({
          ...prev,
          [fieldName]: response.data.url
        }));
        
        toast({
          title: "✅ Image téléchargée",
          description: "L'image a été uploadée avec succès",
        });
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger l'image",
        variant: "destructive"
      });
    }
  };

  // Rendu du Dashboard
  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Tableau de Bord</h2>
        <p className="text-gray-600">Vue d'ensemble de votre site AyaPos</p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('pages')}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <FileText className="h-8 w-8 text-blue-600" />
              <Badge variant="secondary">{stats.pages}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold">{stats.pages}</CardTitle>
            <CardDescription>Pages du Site</CardDescription>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('products')}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Package className="h-8 w-8 text-green-600" />
              <Badge variant="secondary">{stats.products}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold">{stats.products}</CardTitle>
            <CardDescription>Produits & Terminaux</CardDescription>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('global')}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <Badge variant="secondary">{stats.testimonials}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold">{stats.testimonials}</CardTitle>
            <CardDescription>Témoignages</CardDescription>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('global')}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <HelpCircle className="h-8 w-8 text-orange-600" />
              <Badge variant="secondary">{stats.faqs}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold">{stats.faqs}</CardTitle>
            <CardDescription>Questions FAQ</CardDescription>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>🎯 Accès Rapide</CardTitle>
          <CardDescription>Éditez rapidement les pages principales de votre site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {sitePages.slice(0, 6).map(page => {
              const Icon = page.icon;
              return (
                <Button
                  key={page.id}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50"
                  onClick={() => {
                    setActiveSection('pages');
                    setActivePageEditor(page.slug);
                  }}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{page.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Rendu de l'éditeur de pages
  const renderPageEditor = () => {
    const currentPage = sitePages.find(p => p.slug === activePageEditor);
    
    // Si c'est la page Restaurant POS, utiliser l'éditeur complet
    if (activePageEditor === 'restaurant-pos') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between sticky top-0 z-20 bg-gray-50 py-4 -mx-8 px-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Éditer : {currentPage?.name}</h2>
              <p className="text-gray-600">Modifiez TOUT le contenu de cette page</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => window.open(`/${activePageEditor}`, '_blank')}>
                <Eye className="h-4 w-4 mr-2" />
                Voir le Site
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <RestaurantPOSEditor 
              pageData={pageData}
              setPageData={setPageData}
              onSave={savePageData}
              onUploadImage={handleImageUpload}
              saving={saving}
            />
          )}
        </div>
      );
    }
    
    // Pour les autres pages, garder l'ancien éditeur pour l'instant
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Éditer : {currentPage?.name}</h2>
            <p className="text-gray-600">Modifiez le contenu de cette page</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => window.open(`/${activePageEditor}`, '_blank')}>
              <Eye className="h-4 w-4 mr-2" />
              Prévisualiser
            </Button>
            <Button onClick={savePageData} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </div>
        
        {/* Sélecteur de page */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Changer de page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {sitePages.map(page => {
                const Icon = page.icon;
                return (
                  <Button
                    key={page.id}
                    variant={activePageEditor === page.slug ? "default" : "outline"}
                    size="sm"
                    className="h-auto py-3 flex flex-col items-center space-y-1"
                    onClick={() => setActivePageEditor(page.slug)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs text-center leading-tight">{page.name}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hero" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Section Hero</CardTitle>
                  <CardDescription>Titre principal et sous-titre de la page</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Titre Principal</label>
                    <Input
                      value={pageData.hero_title || ''}
                      onChange={(e) => setPageData({...pageData, hero_title: e.target.value})}
                      placeholder="Ex: 🍽️ Système POS Restaurant Complet"
                      className="text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Sous-titre</label>
                    <Textarea
                      value={pageData.hero_subtitle || ''}
                      onChange={(e) => setPageData({...pageData, hero_subtitle: e.target.value})}
                      placeholder="Ex: Solution tout-en-un pour gérer votre restaurant avec efficacité"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Image Hero</label>
                    <div className="flex items-center space-x-4">
                      {pageData.hero_image && (
                        <img 
                          src={pageData.hero_image} 
                          alt="Hero" 
                          className="h-24 w-40 object-cover rounded border"
                        />
                      )}
                      <div className="flex-1">
                        <Input
                          value={pageData.hero_image || ''}
                          onChange={(e) => setPageData({...pageData, hero_image: e.target.value})}
                          placeholder="URL de l'image"
                        />
                      </div>
                      <Button variant="outline" onClick={() => document.getElementById('hero-image-upload').click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <input
                        id="hero-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0], 'hero_image')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Contenu de la Page</CardTitle>
                  <CardDescription>Sections et textes principaux</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 py-8">
                    Contenu spécifique à développer pour cette page
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="images">
              <Card>
                <CardHeader>
                  <CardTitle>Galerie d'Images</CardTitle>
                  <CardDescription>Gérez toutes les images de cette page</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 py-8">
                    Galerie d'images à développer
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres SEO</CardTitle>
                  <CardDescription>Optimisez le référencement de cette page</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-500 py-8">
                    Paramètres SEO à développer
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    );
  };

  // Rendu des produits
  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Produits & Terminaux</h2>
          <p className="text-gray-600">Gérez vos produits, systèmes POS et terminaux de paiement</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Produit
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <CardDescription className="mb-4">{product.description?.substring(0, 100)}...</CardDescription>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">CHF {product.price}</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Rendu des éléments globaux
  const renderGlobalElements = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Éléments Globaux</h2>
        <p className="text-gray-600">Gérez les éléments utilisés sur plusieurs pages</p>
      </div>
      
      <Tabs defaultValue="testimonials">
        <TabsList>
          <TabsTrigger value="testimonials">Témoignages ({testimonials.length})</TabsTrigger>
          <TabsTrigger value="faqs">FAQ ({faqs.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Témoignage
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.business} • {testimonial.city}</CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="faqs" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle FAQ
            </Button>
          </div>
          <div className="space-y-3">
            {faqs.map(faq => (
              <Card key={faq.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                  {faq.category && (
                    <Badge variant="secondary" className="mt-2">{faq.category}</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-black text-blue-600">AyaPos</h1>
          <p className="text-sm text-gray-600">Admin Panel Pro</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuSections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{section.name}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'pages' && renderPageEditor()}
          {activeSection === 'products' && renderProducts()}
          {activeSection === 'global' && renderGlobalElements()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPro;

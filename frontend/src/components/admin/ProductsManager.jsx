import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Save, X, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { Badge } from '../ui/badge';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ProductsManager = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'POS',
    description: '',
    tagline: '',
    price: '',
    features: '',
    recommended: false,
    discount: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      console.log('🔄 Chargement des produits depuis:', `${API_URL}/api/products`);
      const response = await axios.get(`${API_URL}/api/products`);
      console.log('✅ Réponse API:', response.data);
      
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(`📦 ${response.data.products.length} produits chargés`);
      } else {
        console.warn('⚠️ API success=false');
      }
    } catch (error) {
      console.error('❌ Erreur chargement produits:', error);
      console.error('Détails:', error.response?.data || error.message);
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Impossible de charger les produits",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('admin_token');
      
      const productData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        tagline: formData.tagline || formData.description,
        price: parseFloat(formData.price),
        features: formData.features.split('\n').filter(f => f.trim()),
        recommended: formData.recommended,
        discount: formData.discount ? parseInt(formData.discount) : null,
        inStock: true,
        featured: formData.recommended
      };

      if (editingProduct) {
        await axios.put(
          `${API_URL}/api/products/${editingProduct.id}`,
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        toast({
          title: "✅ Produit mis à jour",
          description: `${formData.name} a été modifié`,
        });
      } else {
        await axios.post(
          `${API_URL}/api/products`,
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        toast({
          title: "✅ Produit créé",
          description: `${formData.name} a été ajouté`,
        });
      }

      resetForm();
      loadProducts();
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.response?.data?.detail || "Erreur lors de la sauvegarde",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description || '',
      tagline: product.tagline || '',
      price: product.price?.toString() || '',
      features: Array.isArray(product.features) ? product.features.join('\n') : '',
      recommended: product.recommended || false,
      discount: product.discount?.toString() || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`Supprimer "${productName}" ?`)) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(
        `${API_URL}/api/products/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({
        title: "✅ Produit supprimé",
        description: `${productName} a été supprimé`,
      });
      
      loadProducts();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      category: 'POS',
      description: '',
      tagline: '',
      price: '',
      features: '',
      recommended: false,
      discount: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">📦 Gestion des Packages & Produits</h2>
          <p className="text-gray-600">Gérez tous les packages affichés sur le site (Restaurant POS, etc.)</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau
        </Button>
      </div>

      {showForm && (
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <div className="flex justify-between items-center">
              <CardTitle>
                {editingProduct ? `Modifier: ${editingProduct.name}` : 'Nouveau Produit'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Nom *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Premium POS"
                    required
                  />
                </div>
                
                <div>
                  <Label>Catégorie *</Label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="POS">POS</option>
                    <option value="Hardware">Matériel</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
              </div>

              <div>
                <Label>Slogan</Label>
                <Input
                  value={formData.tagline}
                  onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                  placeholder="Contrôle total, puissance maximale"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Prix (CHF) *</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label>Réduction (%)</Label>
                  <Input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                  />
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id="recommended"
                    checked={formData.recommended}
                    onChange={(e) => setFormData({...formData, recommended: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="recommended">Recommandé</Label>
                </div>
              </div>

              <div>
                <Label>Fonctionnalités (une par ligne)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  placeholder="Multi-branches&#10;Support 24/7"
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-green-600">
                  <Save className="h-4 w-4 mr-2" />
                  {editingProduct ? 'Mettre à jour' : 'Créer'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {Object.keys(productsByCategory).map(category => (
        <div key={category} className="space-y-3">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Package className="h-5 w-5" />
            {category} ({productsByCategory[category].length})
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsByCategory[category].map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow relative">
                {product.recommended && (
                  <Badge className="absolute top-2 right-2 bg-blue-600">Recommandé</Badge>
                )}
                {product.discount && (
                  <Badge className="absolute top-2 left-2 bg-green-600">-{product.discount}%</Badge>
                )}
                
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-600">CHF {product.price}</span>
                    <span className="text-sm text-gray-500">/mois</span>
                  </div>
                  {product.tagline && (
                    <p className="text-sm text-gray-600 italic">{product.tagline}</p>
                  )}
                </CardHeader>
                
                <CardContent>
                  {product.features && product.features.length > 0 && (
                    <ul className="text-xs text-gray-600 space-y-1 mb-3">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id, product.name)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsManager;

import React, { useState } from 'react';
import { Save, Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';

const RestaurantPOSEditor = ({ pageData, setPageData, onSave, onUploadImage, saving }) => {
  
  const updateField = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    setPageData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateSectionItem = (sectionName, index, field, value) => {
    setPageData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: {
          ...prev.sections[sectionName],
          items: prev.sections[sectionName].items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
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
          ...prev.sections[sectionName],
          title: value
        }
      }
    }));
  };

  const addBenefit = () => {
    setPageData(prev => ({
      ...prev,
      benefits: [...(prev.benefits || []), { title: '', description: '', image: '' }]
    }));
  };

  const removeBenefit = (index) => {
    setPageData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    setPageData(prev => ({
      ...prev,
      features: [...(prev.features || []), { icon: 'Star', title: '', description: '' }]
    }));
  };

  const removeFeature = (index) => {
    setPageData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Bouton de sauvegarde flottant */}
      <div className="flex justify-end sticky top-0 z-10 bg-white p-4 border-b">
        <Button onClick={onSave} disabled={saving} size="lg" className="shadow-lg">
          <Save className="h-5 w-5 mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder Tout'}
        </Button>
      </div>

      {/* SECTION HERO */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <CardTitle className="text-2xl">🎯 Section Hero (Bannière Principale)</CardTitle>
          <CardDescription>La première chose que vos visiteurs voient</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <Label htmlFor="hero_title" className="text-base font-semibold">Titre Principal</Label>
            <Input
              id="hero_title"
              value={pageData.hero_title || ''}
              onChange={(e) => updateField('hero_title', e.target.value)}
              placeholder="Ex: 🍽️ Système POS Restaurant Complet"
              className="text-xl h-14 mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="hero_subtitle" className="text-base font-semibold">Sous-titre</Label>
            <Textarea
              id="hero_subtitle"
              value={pageData.hero_subtitle || ''}
              onChange={(e) => updateField('hero_subtitle', e.target.value)}
              placeholder="Ex: Solution tout-en-un pour gérer votre restaurant avec efficacité"
              rows={3}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-base font-semibold">Image Hero</Label>
            <div className="mt-2 space-y-3">
              {pageData.hero_image && (
                <div className="relative">
                  <img 
                    src={pageData.hero_image} 
                    alt="Hero" 
                    className="w-full h-48 object-cover rounded-lg border-2"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => updateField('hero_image', '')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={pageData.hero_image || ''}
                  onChange={(e) => updateField('hero_image', e.target.value)}
                  placeholder="URL de l'image"
                />
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('hero-upload').click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <input
                  id="hero-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files[0] && onUploadImage(e.target.files[0], 'hero_image')}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION BENEFITS (3 items avec images) */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-2xl">💎 Bénéfices Principaux (3 sections avec images)</CardTitle>
          <CardDescription>Les 3 grands avantages de votre système</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {pageData.benefits?.map((benefit, index) => (
            <Card key={index} className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Bénéfice #{index + 1}</CardTitle>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeBenefit(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-semibold">Titre</Label>
                  <Input
                    value={benefit.title || ''}
                    onChange={(e) => updateArrayItem('benefits', index, 'title', e.target.value)}
                    placeholder="Ex: Commencez Immédiatement à Vendre"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="font-semibold">Description</Label>
                  <Textarea
                    value={benefit.description || ''}
                    onChange={(e) => updateArrayItem('benefits', index, 'description', e.target.value)}
                    placeholder="Description du bénéfice"
                    rows={3}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="font-semibold">Image</Label>
                  <div className="mt-2 space-y-2">
                    {benefit.image && (
                      <img 
                        src={benefit.image} 
                        alt={benefit.title}
                        className="w-full h-40 object-cover rounded border"
                      />
                    )}
                    <div className="flex gap-2">
                      <Input
                        value={benefit.image || ''}
                        onChange={(e) => updateArrayItem('benefits', index, 'image', e.target.value)}
                        placeholder="URL de l'image"
                      />
                      <Button 
                        variant="outline"
                        onClick={() => document.getElementById(`benefit-img-${index}`).click()}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      <input
                        id={`benefit-img-${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            // Upload logic here
                            console.log('Upload benefit image', index);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button onClick={addBenefit} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un Bénéfice
          </Button>
        </CardContent>
      </Card>

      {/* SECTION FEATURES (8 fonctionnalités) */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-2xl">✨ Fonctionnalités Puissantes</CardTitle>
          <CardDescription>Liste des fonctionnalités principales du système</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {pageData.features?.map((feature, index) => (
              <Card key={index} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Feature #{index + 1}</CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Icône</Label>
                    <Input
                      value={feature.icon || ''}
                      onChange={(e) => updateArrayItem('features', index, 'icon', e.target.value)}
                      placeholder="Ex: Cloud, Store, Package"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Titre</Label>
                    <Input
                      value={feature.title || ''}
                      onChange={(e) => updateArrayItem('features', index, 'title', e.target.value)}
                      placeholder="Ex: Système POS Cloud"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={feature.description || ''}
                      onChange={(e) => updateArrayItem('features', index, 'description', e.target.value)}
                      placeholder="Description de la fonctionnalité"
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button onClick={addFeature} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une Fonctionnalité
          </Button>
        </CardContent>
      </Card>

      {/* SECTION TABLE MANAGEMENT */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="text-2xl">🍽️ Gestion des Tables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label className="font-semibold">Titre de la Section</Label>
            <Input
              value={pageData.sections?.table_management?.title || ''}
              onChange={(e) => updateSectionTitle('table_management', e.target.value)}
              placeholder="Ex: Gérez les commandes, additions et tables!"
              className="mt-1"
            />
          </div>
          
          <Separator />
          
          {pageData.sections?.table_management?.items?.map((item, index) => (
            <Card key={index} className="border">
              <CardContent className="pt-4 space-y-3">
                <div>
                  <Label className="text-xs">Icône Emoji</Label>
                  <Input
                    value={item.icon || ''}
                    onChange={(e) => updateSectionItem('table_management', index, 'icon', e.target.value)}
                    placeholder="Ex: 🔄"
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Titre</Label>
                  <Input
                    value={item.title || ''}
                    onChange={(e) => updateSectionItem('table_management', index, 'title', e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={item.description || ''}
                    onChange={(e) => updateSectionItem('table_management', index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* SECTION ONLINE ORDERS */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardTitle className="text-2xl">📱 Commandes en Ligne</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label className="font-semibold">Titre de la Section</Label>
            <Input
              value={pageData.sections?.online_orders?.title || ''}
              onChange={(e) => updateSectionTitle('online_orders', e.target.value)}
              placeholder="Ex: Gérez vos commandes en ligne sur un seul écran!"
              className="mt-1"
            />
          </div>
          
          <Separator />
          
          {pageData.sections?.online_orders?.items?.map((item, index) => (
            <Card key={index} className="border">
              <CardContent className="pt-4 space-y-3">
                <div>
                  <Label className="text-xs">Icône Emoji</Label>
                  <Input
                    value={item.icon || ''}
                    onChange={(e) => updateSectionItem('online_orders', index, 'icon', e.target.value)}
                    placeholder="Ex: 📦"
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Titre</Label>
                  <Input
                    value={item.title || ''}
                    onChange={(e) => updateSectionItem('online_orders', index, 'title', e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={item.description || ''}
                    onChange={(e) => updateSectionItem('online_orders', index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* SECTION REPORTS */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
          <CardTitle className="text-2xl">📊 Rapports et Analyses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label className="font-semibold">Titre de la Section</Label>
            <Input
              value={pageData.sections?.reports?.title || ''}
              onChange={(e) => updateSectionTitle('reports', e.target.value)}
              placeholder="Ex: Rapports avancés et analyses"
              className="mt-1"
            />
          </div>
          
          <Separator />
          
          {pageData.sections?.reports?.items?.map((item, index) => (
            <Card key={index} className="border">
              <CardContent className="pt-4 space-y-3">
                <div>
                  <Label className="text-xs">Icône Emoji</Label>
                  <Input
                    value={item.icon || ''}
                    onChange={(e) => updateSectionItem('reports', index, 'icon', e.target.value)}
                    placeholder="Ex: 📊"
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Titre</Label>
                  <Input
                    value={item.title || ''}
                    onChange={(e) => updateSectionItem('reports', index, 'title', e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={item.description || ''}
                    onChange={(e) => updateSectionItem('reports', index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* SECTION CTA FINAL */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
          <CardTitle className="text-2xl">🚀 Call-to-Action Final</CardTitle>
          <CardDescription>Le message final pour inciter à l'action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label className="font-semibold">Titre CTA</Label>
            <Input
              value={pageData.cta_title || ''}
              onChange={(e) => updateField('cta_title', e.target.value)}
              placeholder="Ex: AYAPOS SYSTÈMES POS NOUVELLE GÉNÉRATION"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="font-semibold">Sous-titre CTA</Label>
            <Input
              value={pageData.cta_subtitle || ''}
              onChange={(e) => updateField('cta_subtitle', e.target.value)}
              placeholder="Ex: Ayez toujours une longueur d'avance!"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bouton de sauvegarde final */}
      <div className="flex justify-center pb-8">
        <Button onClick={onSave} disabled={saving} size="lg" className="px-12">
          <Save className="h-5 w-5 mr-2" />
          {saving ? 'Sauvegarde en cours...' : 'Sauvegarder Toutes les Modifications'}
        </Button>
      </div>
    </div>
  );
};

export default RestaurantPOSEditor;

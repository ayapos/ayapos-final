import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2, Copy, Check, Search, Filter, X } from 'lucide-react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { useToast } from '../../hooks/use-toast';

const MediaLibrary = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { toast } = useToast();
  const API_URL = process.env.REACT_APP_BACKEND_URL || '';

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    // Filtrer les images selon la recherche
    if (searchTerm) {
      setFilteredImages(
        images.filter(img => 
          img.filename.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredImages(images);
    }
  }, [searchTerm, images]);

  const loadImages = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${API_URL}/api/media/images`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setImages(response.data.images || []);
      }
    } catch (error) {
      console.error('Erreur chargement images:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les images",
        variant: "destructive"
      });
    }
  };

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      const token = localStorage.getItem('admin_token');
      
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`${API_URL}/api/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      toast({
        title: "✅ Succès",
        description: `${files.length} image(s) téléchargée(s)`,
      });

      loadImages();
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        title: "Erreur",
        description: "Échec du téléchargement",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDelete = async (imageId, filename) => {
    if (!window.confirm(`Supprimer "${filename}" ?`)) return;

    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${API_URL}/api/media/images/${imageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "✅ Supprimée",
        description: "Image supprimée avec succès",
      });

      loadImages();
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'image",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    
    toast({
      title: "✅ Copié !",
      description: "URL copiée dans le presse-papier",
    });

    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getImageUrl = (path) => {
    if (path.startsWith('http')) return path;
    return `${API_URL}${path}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bibliothèque Photos</h2>
          <p className="text-gray-600 mt-1">Gérez toutes vos images en un seul endroit</p>
        </div>
        
        <div className="relative">
          <input
            type="file"
            id="upload-images"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <label htmlFor="upload-images">
            <Button 
              as="span" 
              className="bg-blue-700 hover:bg-blue-800 cursor-pointer"
              disabled={uploading}
            >
              <Upload className="h-5 w-5 mr-2" />
              {uploading ? 'Téléchargement...' : 'Télécharger des images'}
            </Button>
          </label>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher une image..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="text-sm text-gray-600">
          {filteredImages.length} image(s) {searchTerm && `trouvée(s)`}
        </div>
      </div>

      {/* Grille d'images */}
      {filteredImages.length === 0 ? (
        <Card className="p-12 text-center">
          <ImageIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'Aucune image trouvée' : 'Aucune image'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Essayez un autre terme de recherche' : 'Commencez par télécharger des images'}
          </p>
          {!searchTerm && (
            <label htmlFor="upload-images">
              <Button as="span" variant="outline" className="cursor-pointer">
                <Upload className="h-5 w-5 mr-2" />
                Télécharger maintenant
              </Button>
            </label>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((image) => {
            const imageUrl = getImageUrl(image.url || image.path);
            const isCopied = copiedUrl === imageUrl;
            
            return (
              <Card 
                key={image._id || image.id}
                className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image */}
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={image.filename}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EErreur%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  
                  {/* Overlay avec actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(imageUrl);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                      title="Copier l'URL"
                    >
                      {isCopied ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(image._id || image.id, image.filename);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-red-600 hover:text-white transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Nom du fichier */}
                <div className="p-2 bg-white">
                  <p className="text-xs text-gray-600 truncate" title={image.filename}>
                    {image.filename}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal d'aperçu */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedImage.filename}</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <img
                src={getImageUrl(selectedImage.url || selectedImage.path)}
                alt={selectedImage.filename}
                className="w-full rounded-lg mb-4"
              />
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-700">URL de l'image</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      value={getImageUrl(selectedImage.url || selectedImage.path)}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      onClick={() => copyToClipboard(getImageUrl(selectedImage.url || selectedImage.path))}
                      variant="outline"
                    >
                      {copiedUrl === getImageUrl(selectedImage.url || selectedImage.path) ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {selectedImage.uploadedAt && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Date d'upload</label>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(selectedImage.uploadedAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;

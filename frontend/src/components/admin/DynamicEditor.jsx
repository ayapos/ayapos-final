import React from 'react';
import { Plus, Trash2, Upload, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

/**
 * Éditeur dynamique qui s'adapte automatiquement à n'importe quelle structure de données
 */
const DynamicEditor = ({ data, onUpdate, onImageUpload }) => {
  const [expandedSections, setExpandedSections] = React.useState({});

  const toggleSection = (path) => {
    setExpandedSections(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const updateValue = (path, value) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    onUpdate(newData);
  };

  const updateArrayItem = (arrayPath, index, field, value) => {
    const keys = arrayPath.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    
    let current = newData;
    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    
    if (Array.isArray(current)) {
      current[index][field] = value;
    }
    
    onUpdate(newData);
  };

  const addArrayItem = (arrayPath, template) => {
    const keys = arrayPath.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    
    let current = newData;
    for (let i = 0; i < keys.length; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = [];
      }
      current = current[keys[i]];
    }
    
    if (Array.isArray(current)) {
      current.push(template);
    }
    
    onUpdate(newData);
  };

  const removeArrayItem = (arrayPath, index) => {
    const keys = arrayPath.split('.');
    const newData = JSON.parse(JSON.stringify(data));
    
    let current = newData;
    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    
    if (Array.isArray(current)) {
      current.splice(index, 1);
    }
    
    onUpdate(newData);
  };

  const renderField = (key, value, path = '') => {
    const fullPath = path ? `${path}.${key}` : key;
    
    // Skip internal fields
    if (['_id', 'slug', 'updatedAt', 'createdAt'].includes(key)) {
      return null;
    }

    // Null or undefined
    if (value === null || value === undefined) {
      return (
        <div key={fullPath} className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
          <Input
            value=""
            onChange={(e) => updateValue(fullPath, e.target.value)}
            placeholder={`Entrez ${formatLabel(key).toLowerCase()}`}
          />
        </div>
      );
    }

    // String
    if (typeof value === 'string') {
      // Image fields - détection améliorée pour URLs d'images
      const isImageKey = key.toLowerCase().includes('image') || key.toLowerCase().includes('photo') || key.toLowerCase().includes('icon');
      const isImageURL = typeof value === 'string' && (value.startsWith('http') || value.startsWith('/')) && 
        (value.includes('.jpg') || value.includes('.png') || value.includes('.webp') || value.includes('.jpeg') ||
         value.includes('images.unsplash') || value.includes('/photo') || value.includes('cloudinary') ||
         value.includes('/uploads/'));
      
      if (isImageKey || isImageURL) {
        return (
          <div key={fullPath} className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
            {value && (
              <div className="relative">
                <img 
                  src={value} 
                  alt={formatLabel(key)}
                  className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E';
                  }}
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => updateValue(fullPath, '')}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={value || ''}
                onChange={(e) => updateValue(fullPath, e.target.value)}
                placeholder="URL de l'image"
              />
              {onImageUpload && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => document.getElementById(`upload-${fullPath}`).click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <input
                    id={`upload-${fullPath}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files[0] && onImageUpload(e.target.files[0], fullPath)}
                  />
                </>
              )}
            </div>
          </div>
        );
      }
      
      // Long text fields
      if (value.length > 100 || key.toLowerCase().includes('description') || key.toLowerCase().includes('content')) {
        return (
          <div key={fullPath} className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
            <Textarea
              value={value}
              onChange={(e) => updateValue(fullPath, e.target.value)}
              rows={4}
              placeholder={`Entrez ${formatLabel(key).toLowerCase()}`}
            />
          </div>
        );
      }
      
      // Regular text
      return (
        <div key={fullPath} className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
          <Input
            value={value}
            onChange={(e) => updateValue(fullPath, e.target.value)}
            placeholder={`Entrez ${formatLabel(key).toLowerCase()}`}
          />
        </div>
      );
    }

    // Number
    if (typeof value === 'number') {
      return (
        <div key={fullPath} className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => updateValue(fullPath, Number(e.target.value))}
            placeholder={`Entrez ${formatLabel(key).toLowerCase()}`}
          />
        </div>
      );
    }

    // Boolean
    if (typeof value === 'boolean') {
      return (
        <div key={fullPath} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={fullPath}
            checked={value}
            onChange={(e) => updateValue(fullPath, e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor={fullPath} className="text-sm font-semibold text-gray-700">
            {formatLabel(key)}
          </Label>
        </div>
      );
    }

    // Array
    if (Array.isArray(value)) {
      const isExpanded = expandedSections[fullPath];
      const template = value.length > 0 ? createTemplate(value[0]) : {};

      return (
        <Card key={fullPath} className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleSection(fullPath)}>
                {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                <CardTitle className="text-lg">{formatLabel(key)} ({value.length})</CardTitle>
              </div>
              <Button
                size="sm"
                onClick={() => addArrayItem(fullPath, template)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
          </CardHeader>
          {isExpanded && (
            <CardContent className="pt-6">
              <div className="space-y-4">
                {value.map((item, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gray-50">
                      <CardTitle className="text-base font-semibold">
                        {formatLabel(key).slice(0, -1)} #{index + 1}
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem(fullPath, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                      {Object.entries(item).map(([itemKey, itemValue]) =>
                        renderArrayItemField(fullPath, index, itemKey, itemValue)
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      );
    }

    // Object
    if (typeof value === 'object') {
      const isExpanded = expandedSections[fullPath] !== false; // Expanded by default

      return (
        <Card key={fullPath} className="border-2 border-gray-200">
          <CardHeader className="bg-gray-50 cursor-pointer" onClick={() => toggleSection(fullPath)}>
            <div className="flex items-center gap-2">
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              <CardTitle className="text-lg">{formatLabel(key)}</CardTitle>
            </div>
          </CardHeader>
          {isExpanded && (
            <CardContent className="pt-6 space-y-4">
              {Object.entries(value).map(([subKey, subValue]) =>
                renderField(subKey, subValue, fullPath)
              )}
            </CardContent>
          )}
        </Card>
      );
    }

    return null;
  };

  const renderArrayItemField = (arrayPath, index, key, value) => {
    // Skip internal fields
    if (['_id', 'id'].includes(key)) {
      return null;
    }

    // Image field
    if (key.toLowerCase().includes('image') || key.toLowerCase().includes('photo') ||
        (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/')) && 
         (value.includes('.jpg') || value.includes('.png') || value.includes('.webp') || value.includes('.jpeg')))) {
      const fullPath = `${arrayPath}.${index}.${key}`;
      return (
        <div key={key} className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
          {value && (
            <div className="relative">
              <img 
                src={value} 
                alt={formatLabel(key)}
                className="w-full h-32 object-cover rounded-lg border"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E';
                }}
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => updateArrayItem(arrayPath, index, key, '')}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <Input
              value={value || ''}
              onChange={(e) => updateArrayItem(arrayPath, index, key, e.target.value)}
              placeholder="URL de l'image"
            />
            {onImageUpload && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById(`upload-${fullPath.replace(/\./g, '-')}`).click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <input
                  id={`upload-${fullPath.replace(/\./g, '-')}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      onImageUpload(e.target.files[0], fullPath);
                      e.target.value = '';
                    }
                  }}
                />
              </>
            )}
          </div>
        </div>
      );
    }

    // Array field (nested)
    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
          <div className="space-y-2">
            {value.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={typeof item === 'string' ? item : item.text || ''}
                  onChange={(e) => {
                    const newArray = [...value];
                    newArray[i] = typeof item === 'string' ? e.target.value : { ...item, text: e.target.value };
                    updateArrayItem(arrayPath, index, key, newArray);
                  }}
                  placeholder={`${formatLabel(key)} #${i + 1}`}
                />
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    const newArray = value.filter((_, idx) => idx !== i);
                    updateArrayItem(arrayPath, index, key, newArray);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const template = typeof value[0] === 'string' ? '' : { text: '' };
                updateArrayItem(arrayPath, index, key, [...value, template]);
              }}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter {formatLabel(key)}
            </Button>
          </div>
        </div>
      );
    }

    // Long text
    if (typeof value === 'string' && (value.length > 100 || key.toLowerCase().includes('description'))) {
      return (
        <div key={key} className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
          <Textarea
            value={value}
            onChange={(e) => updateArrayItem(arrayPath, index, key, e.target.value)}
            rows={3}
            placeholder={`Entrez ${formatLabel(key).toLowerCase()}`}
          />
        </div>
      );
    }

    // Boolean
    if (typeof value === 'boolean') {
      return (
        <div key={key} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`${arrayPath}-${index}-${key}`}
            checked={value}
            onChange={(e) => updateArrayItem(arrayPath, index, key, e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor={`${arrayPath}-${index}-${key}`} className="text-sm font-semibold text-gray-700">
            {formatLabel(key)}
          </Label>
        </div>
      );
    }

    // Regular text or number
    return (
      <div key={key} className="space-y-2">
        <Label className="text-sm font-semibold text-gray-700">{formatLabel(key)}</Label>
        <Input
          type={typeof value === 'number' ? 'number' : 'text'}
          value={value || ''}
          onChange={(e) => {
            const newValue = typeof value === 'number' ? Number(e.target.value) : e.target.value;
            updateArrayItem(arrayPath, index, key, newValue);
          }}
          placeholder={`Entrez ${formatLabel(key).toLowerCase()}`}
        />
      </div>
    );
  };

  const formatLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .trim();
  };

  const createTemplate = (sample) => {
    if (typeof sample !== 'object') return '';
    
    const template = {};
    for (const key in sample) {
      if (typeof sample[key] === 'string') template[key] = '';
      else if (typeof sample[key] === 'number') template[key] = 0;
      else if (typeof sample[key] === 'boolean') template[key] = false;
      else if (Array.isArray(sample[key])) template[key] = [];
      else if (typeof sample[key] === 'object') template[key] = createTemplate(sample[key]);
    }
    return template;
  };

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([key, value]) => renderField(key, value))}
    </div>
  );
};

export default DynamicEditor;

import React from 'react';
import { usePageContent } from '../hooks/usePageContent';
import { Loader2 } from 'lucide-react';

/**
 * Composant pour afficher du contenu dynamique depuis l'admin
 * Usage: <DynamicContent pageName="home" contentId="hero-title" fallback="Titre par défaut" />
 */
const DynamicContent = ({ pageName, contentId, fallback = '', as: Component = 'span', className = '', children }) => {
  const { getContentValue, loading } = usePageContent(pageName);
  
  if (loading) {
    return <Component className={className}><Loader2 className="h-4 w-4 animate-spin inline" /></Component>;
  }
  
  const content = getContentValue(contentId, fallback);
  
  return <Component className={className}>{content || children}</Component>;
};

export default DynamicContent;

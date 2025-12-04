import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const usePageContent = (pageName) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/content/${pageName}`);
        if (response.data.success) {
          setContent(response.data.content);
        }
      } catch (err) {
        console.error(`Error fetching ${pageName} content:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (pageName) {
      fetchContent();
    }
  }, [pageName]);

  const getContentValue = (id, fallback = '') => {
    if (!content || !content.sections) return fallback;
    const section = content.sections.find(s => s.id === id);
    return section ? section.value : fallback;
  };

  return { content, loading, error, getContentValue };
};

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const useFAQ = (category = null) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const url = category 
          ? `${API_URL}/api/faq?category=${category}`
          : `${API_URL}/api/faq`;
        const response = await axios.get(url);
        if (response.data.success) {
          setFaqs(response.data.faqs);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [category]);

  return { faqs, loading, error };
};

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const usePOSPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/packages`);
      if (response.data.success) {
        setPackages(response.data.packages);
      }
    } catch (err) {
      console.error('Error loading POS packages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { packages, loading, error, reload: loadPackages };
};

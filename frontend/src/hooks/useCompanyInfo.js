import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const useCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/company/`);
        if (response.data.success) {
          setCompanyInfo(response.data.info);
        }
      } catch (err) {
        console.error('Error fetching company info:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);

  return { companyInfo, loading, error };
};

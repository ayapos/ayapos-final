import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const usePricingPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/pricing/`);
        if (response.data.success) {
          const sortedPlans = response.data.plans.sort((a, b) => a.order - b.order);
          setPlans(sortedPlans);
        }
      } catch (err) {
        console.error('Error fetching pricing plans:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
};

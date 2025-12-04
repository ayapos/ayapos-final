import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/testimonials/`);
        if (response.data.success) {
          setTestimonials(response.data.testimonials);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
};

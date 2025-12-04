import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const useHeroSlides = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/hero/`);
        if (response.data.success) {
          // Filter only active slides and sort by order
          const activeSlides = response.data.slides
            .filter(slide => slide.active)
            .sort((a, b) => a.order - b.order);
          setSlides(activeSlides);
        }
      } catch (err) {
        console.error('Error fetching hero slides:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  return { slides, loading, error };
};

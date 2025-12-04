import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle, Star, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useHeroSlides } from '../hooks/useHeroSlides';
import { useProducts } from '../hooks/useProducts';
import { useTestimonials } from '../hooks/useTestimonials';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const HomeDynamic = () => {
  const { t } = useTranslation();
  const { slides, loading: slidesLoading } = useHeroSlides();
  const { products, loading: productsLoading } = useProducts();
  const { testimonials, loading: testimonialsLoading } = useTestimonials();
  const [pageContent, setPageContent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/content/home`);
        if (response.data.success) {
          setPageContent(response.data.content);
        }
      } catch (error) {
        console.error('Error fetching home content:', error);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (slides && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  const getContentValue = (id, fallback = '') => {
    if (!pageContent || !pageContent.sections) return fallback;
    const section = pageContent.sections.find(s => s.id === id);
    return section ? section.value : fallback;
  };

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const featuredTestimonials = testimonials.filter(t => t.featured).slice(0, 3);

  if (slidesLoading || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen">
        {slides && slides.length > 0 ? (
          slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: slide.image ? `url(${slide.image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl text-white mb-8 animate-fade-in-delay">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.description && (
                    <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                  )}
                  {slide.buttonText && slide.buttonLink && (
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                      <Link to={slide.buttonLink}>
                        {slide.buttonText}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          // Fallback hero if no slides
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600">
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  {getContentValue('hero-title', t('home.hero.title'))}
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8">
                  {getContentValue('hero-subtitle', t('home.hero.subtitle'))}
                </p>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                  <Link to="/contact">
                    Commencer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Slide indicators */}
        {slides && slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {getContentValue('products-title', 'Nos Terminaux')}
              </h2>
              <p className="text-xl text-gray-600">
                {getContentValue('products-subtitle', 'Découvrez nos solutions POS')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                    {product.image && (
                      <div className="h-64 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=' + product.name;
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      {product.price && (
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                          {product.price} {product.currency}
                        </p>
                      )}
                      <Button asChild className="w-full">
                        <Link to="/pricing">En savoir plus</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {featuredTestimonials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {getContentValue('testimonials-title', 'Ce que disent nos clients')}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    {testimonial.photo && (
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">
                        {testimonial.position} - {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            {getContentValue('cta-title', 'Prêt à transformer votre business ?')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {getContentValue('cta-subtitle', 'Contactez-nous dès aujourd\'hui pour une démonstration gratuite')}
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/contact">
              Demander une démo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomeDynamic;

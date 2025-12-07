import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight, Clock, Tag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Blog = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blog/posts`);
        if (response.data.success) {
          // Accept all posts (don't filter by published)
          setBlogPosts(response.data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const categories = [
    { id: 'all', name: t('blog.categories.all') },
    { id: 'news', name: t('blog.categories.news') },
    { id: 'tips', name: t('blog.categories.tips') },
    { id: 'technology', name: t('blog.categories.technology') },
    { id: 'success', name: t('blog.categories.success') }
  ];

  const articles = [
    {
      id: 1,
      category: 'news',
      title: t('blog.articles.article1.title'),
      excerpt: t('blog.articles.article1.excerpt'),
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=500&fit=crop',
      date: '15 Nov 2024',
      author: 'Marie Dubois',
      readTime: '5 min'
    },
    {
      id: 2,
      category: 'tips',
      title: t('blog.articles.article2.title'),
      excerpt: t('blog.articles.article2.excerpt'),
      image: 'https://images.unsplash.com/photo-1728044849321?w=800&h=500&fit=crop',
      date: '10 Nov 2024',
      author: 'Pierre Martin',
      readTime: '7 min'
    },
    {
      id: 3,
      category: 'technology',
      title: t('blog.articles.article3.title'),
      excerpt: t('blog.articles.article3.excerpt'),
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
      date: '5 Nov 2024',
      author: 'Sophie Laurent',
      readTime: '6 min'
    },
    {
      id: 4,
      category: 'success',
      title: t('blog.articles.article4.title'),
      excerpt: t('blog.articles.article4.excerpt'),
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
      date: '1 Nov 2024',
      author: 'Jean Dupont',
      readTime: '8 min'
    },
    {
      id: 5,
      category: 'tips',
      title: t('blog.articles.article5.title'),
      excerpt: t('blog.articles.article5.excerpt'),
      image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=500&fit=crop',
      date: '28 Oct 2024',
      author: 'Emma Bernard',
      readTime: '5 min'
    },
    {
      id: 6,
      category: 'technology',
      title: t('blog.articles.article6.title'),
      excerpt: t('blog.articles.article6.excerpt'),
      image: 'https://images.unsplash.com/photo-1629248242732-592ecc9cc00f?w=800&h=500&fit=crop',
      date: '25 Oct 2024',
      author: 'Thomas Petit',
      readTime: '4 min'
    }
  ];

  // Use articles from DB if available, otherwise use fallback
  const displayArticles = blogPosts.length > 0 
    ? blogPosts.map(post => ({
        id: post._id || post.id,
        category: post.category?.toLowerCase() || 'technology',
        title: post.title,
        excerpt: post.excerpt,
        image: post.imageUrl || post.image,
        date: post.date ? new Date(post.date).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR'),
        author: post.author,
        readTime: post.readTime || '5 min',
        slug: post.slug,
        featured: post.featured
      }))
    : articles;

  const filteredArticles = selectedCategory === 'all' 
    ? displayArticles 
    : displayArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('blog.hero.title')}
            </h1>
            <p className="text-xl text-blue-100">
              {t('blog.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden h-56">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      {article.author}
                    </div>
                    <Link to={article.slug ? `/blog/${article.slug}` : `/blog/post-${article.id}`} className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-all duration-300">
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t('blog.newsletter.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('blog.newsletter.subtitle')}
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t('blog.newsletter.placeholder')}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300">
                {t('blog.newsletter.button')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
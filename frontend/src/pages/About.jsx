import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Target, Users, Award, TrendingUp, Globe, Shield, Zap, Loader2 } from 'lucide-react';
import { usePageContent } from '../hooks/usePageContent';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const About = () => {
  const { t } = useTranslation();
  const { getContentValue, loading } = usePageContent('about');
  const [team, setTeam] = React.useState([]);

  React.useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/team/`);
        if (response.data.success) {
          setTeam(response.data.team.sort((a, b) => a.order - b.order).slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  const values = [
    {
      icon: <Target className="w-12 h-12 text-blue-600" />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: t('about.values.customer.title'),
      description: t('about.values.customer.description')
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-600" />,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    },
    {
      icon: <Zap className="w-12 h-12 text-orange-600" />,
      title: t('about.values.efficiency.title'),
      description: t('about.values.efficiency.description')
    }
  ];

  const stats = [
    { number: '5000+', label: t('about.stats.clients') },
    { number: '15+', label: t('about.stats.years') },
    { number: '50+', label: t('about.stats.team') },
    { number: '99%', label: t('about.stats.satisfaction') }
  ];

  const milestones = [
    {
      year: '2010',
      title: t('about.timeline.2010.title'),
      description: t('about.timeline.2010.description')
    },
    {
      year: '2015',
      title: t('about.timeline.2015.title'),
      description: t('about.timeline.2015.description')
    },
    {
      year: '2020',
      title: t('about.timeline.2020.title'),
      description: t('about.timeline.2020.description')
    },
    {
      year: '2024',
      title: t('about.timeline.2024.title'),
      description: t('about.timeline.2024.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Notre équipe"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                {t('about.story.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.story.paragraph1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.story.paragraph2')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.story.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('about.valuesSection.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.valuesSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('about.timeline.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('about.timeline.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="relative pl-8 pb-12 border-l-4 border-blue-600 last:pb-0"
              >
                <div className="absolute -left-4 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg ml-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              {t('about.mission.title')}
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              {t('about.mission.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                <span className="font-semibold">{t('about.mission.badge1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <span className="font-semibold">{t('about.mission.badge2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-400" />
                <span className="font-semibold">{t('about.mission.badge3')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
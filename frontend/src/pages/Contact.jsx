import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { businessTypes } from '../data/mockData';
import { usePageContent } from '../hooks/usePageContent';
import { useCompanyInfo } from '../hooks/useCompanyInfo';

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { getContentValue, loading: contentLoading } = usePageContent('contact');
  const { companyInfo, loading: companyLoading } = useCompanyInfo();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    phone: '',
    email: '',
    city: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: 'fr'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
        toast({
          title: "Merci pour votre demande !",
          description: data.message || "Nous vous contacterons dans les 24 heures.",
        });
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            businessName: '',
            businessType: '',
            phone: '',
            email: '',
            city: '',
            message: ''
          });
          setSubmitted(false);
        }, 3000);
      } else {
        throw new Error(data.detail || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  if (contentLoading || companyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {getContentValue('hero-title', t('contact.title'))}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {getContentValue('hero-subtitle', t('contact.subtitle'))}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Demander un devis gratuit</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire et obtenez une réponse rapide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Demande envoyée !
                      </h3>
                      <p className="text-gray-600">
                        Nous vous contacterons très bientôt.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('contact.name')} *
                        </label>
                        <Input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          required
                          placeholder="Mon Restaurant"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('contact.type')} *
                        </label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                          required
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('contact.phone')} *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+41 XX XXX XX XX"
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('contact.email')} *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="contact@restaurant.com"
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('contact.city')} *
                        </label>
                        <Input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Paris"
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('contact.message')}
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Parlez-nous de votre projet..."
                          className="w-full"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                      >
                        {isSubmitting ? (
                          'Envoi en cours...'
                        ) : (
                          <>
                            {t('contact.submit')}
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {getContentValue('contact-title', 'Nous sommes là pour vous aider')}
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  {getContentValue('contact-description', 'Notre équipe d\'experts est disponible pour répondre à toutes vos questions et vous accompagner dans votre projet.')}
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-l-4 border-l-blue-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Téléphone</CardTitle>
                        <CardDescription className="text-base">{companyInfo.phone || '+41 (0) 800 123 456'}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {getContentValue('phone-hours', 'Lundi - Vendredi: 9h00 - 18h00')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Email</CardTitle>
                        <CardDescription className="text-base">{companyInfo.email || 'contact@ayapos.com'}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {getContentValue('email-note', 'Réponse sous 24 heures')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Adresse</CardTitle>
                        <CardDescription className="text-base">
                          {companyInfo.address || 'Bahnhofstrasse 100'}<br />
                          {companyInfo.city || '8001 Zurich'}, {companyInfo.country || 'Switzerland'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-3xl font-bold mb-1">3000+</p>
                      <p className="text-blue-100">Clients satisfaits</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold mb-1">24/7</p>
                      <p className="text-blue-100">Support disponible</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold mb-1">48h</p>
                      <p className="text-blue-100">Livraison rapide</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold mb-1">15+</p>
                      <p className="text-blue-100">Pays couverts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

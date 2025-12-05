import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Monitor, Tablet, Printer, Barcode, DollarSign, CreditCard, Wifi, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const HardwareDevices = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: t('hardwareDevices.categories.all'), icon: <Monitor className="w-5 h-5" /> },
    { id: 'pos', name: t('hardwareDevices.categories.pos'), icon: <Monitor className="w-5 h-5" /> },
    { id: 'kiosk', name: t('hardwareDevices.categories.kiosk'), icon: <Tablet className="w-5 h-5" /> },
    { id: 'printers', name: t('hardwareDevices.categories.printers'), icon: <Printer className="w-5 h-5" /> },
    { id: 'accessories', name: t('hardwareDevices.categories.accessories'), icon: <Barcode className="w-5 h-5" /> }
  ];

  const devices = [
    {
      category: 'pos',
      name: 'Sunmi D3 Pro Android POS',
      screen: '15.6"',
      image: 'https://images.unsplash.com/photo-1739989934256-99e15bee9906?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.sunmiD3Pro')
    },
    {
      category: 'pos',
      name: 'Sunmi D3 Mini Android POS',
      screen: '10.1"',
      image: 'https://images.unsplash.com/photo-1726607288637-a646ddd3814a?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.sunmiD3Mini')
    },
    {
      category: 'pos',
      name: 'iMin Swan 1 Android POS',
      screen: '15.6"',
      image: 'https://images.unsplash.com/photo-1629248242732-592ecc9cc00f?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.iMinSwan')
    },
    {
      category: 'pos',
      name: 'iMin D3 Android POS',
      screen: '15.6"',
      image: 'https://images.unsplash.com/photo-1556741568-055d848f8bfd?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.iMinD3')
    },
    {
      category: 'pos',
      name: 'iMin D2 Android POS',
      screen: '10.1"',
      image: 'https://images.unsplash.com/photo-1726056652582-7c9d202d4018?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.iMinD2')
    },
    {
      category: 'pos',
      name: 'iMin D1 Android POS',
      screen: '10.1"',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.iMinD1')
    },
    {
      category: 'kiosk',
      name: 'Wintec AnyPOS 300 Kiosk',
      screen: '15.6"',
      image: 'https://images.unsplash.com/photo-1556742208-999815fca738?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.wintecAnypos')
    },
    {
      category: 'kiosk',
      name: 'Wintec SelfPOS 10 Kiosk',
      screen: '15.6"',
      image: 'https://images.unsplash.com/photo-1739989934256-99e15bee9906?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.wintecSelfpos10')
    },
    {
      category: 'kiosk',
      name: 'Wintec SelfPOS 70 Kiosk',
      screen: '32"',
      image: 'https://images.unsplash.com/photo-1556742212-5b321f3c261b?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.wintecSelfpos70')
    },
    {
      category: 'kiosk',
      name: 'PAX SK800 Kiosk',
      screen: '23.8"',
      image: 'https://images.unsplash.com/photo-1726607288637-a646ddd3814a?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.paxSk800')
    },
    {
      category: 'printers',
      name: t('hardwareDevices.devices.thermalPrinter'),
      screen: '',
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.thermalPrinterDesc')
    },
    {
      category: 'printers',
      name: t('hardwareDevices.devices.labelPrinter'),
      screen: '',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.labelPrinterDesc')
    },
    {
      category: 'printers',
      name: t('hardwareDevices.devices.scaleLabel'),
      screen: '',
      image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.scaleLabelDesc')
    },
    {
      category: 'accessories',
      name: t('hardwareDevices.devices.barcodeWired'),
      screen: '',
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.barcodeWiredDesc')
    },
    {
      category: 'accessories',
      name: t('hardwareDevices.devices.barcodeWireless'),
      screen: '',
      image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.barcodeWirelessDesc')
    },
    {
      category: 'accessories',
      name: t('hardwareDevices.devices.cashDrawer'),
      screen: '',
      image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.cashDrawerDesc')
    },
    {
      category: 'accessories',
      name: t('hardwareDevices.devices.cardReader'),
      screen: '',
      image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.cardReaderDesc')
    },
    {
      category: 'pos',
      name: 'PAVO N86 POS Terminal',
      screen: '5.0"',
      image: 'https://images.unsplash.com/photo-1739989934256-99e15bee9906?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.pavoN86')
    },
    {
      category: 'pos',
      name: t('hardwareDevices.devices.waiterHandheld'),
      screen: '5.0"',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.waiterHandheldDesc')
    },
    {
      category: 'pos',
      name: 'PAX A920 Pro',
      screen: '5.5"',
      image: 'https://images.unsplash.com/photo-1726056652582-7c9d202d4018?w=400&h=300&fit=crop',
      description: t('hardwareDevices.devices.paxA920Pro')
    }
  ];

  const filteredDevices = activeCategory === 'all' 
    ? devices 
    : devices.filter(device => device.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-gray-700 bg-opacity-50 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t('hardwareDevices.hero.badge')}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('hardwareDevices.hero.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('hardwareDevices.hero.subtitle')}
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
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Devices Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDevices.map((device, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={device.image}
                    alt={device.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {device.screen && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {device.screen}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {device.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {device.description}
                  </p>
                  
                  <Link to="/contact">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                      {t('hardwareDevices.requestQuote')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('hardwareDevices.features.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('hardwareDevices.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('hardwareDevices.features.quality.title')}
              </h3>
              <p className="text-gray-600">
                {t('hardwareDevices.features.quality.description')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('hardwareDevices.features.warranty.title')}
              </h3>
              <p className="text-gray-600">
                {t('hardwareDevices.features.warranty.description')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('hardwareDevices.features.support.title')}
              </h3>
              <p className="text-gray-600">
                {t('hardwareDevices.features.support.description')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('hardwareDevices.features.delivery.title')}
              </h3>
              <p className="text-gray-600">
                {t('hardwareDevices.features.delivery.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('hardwareDevices.cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('hardwareDevices.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg">
                {t('hardwareDevices.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HardwareDevices;

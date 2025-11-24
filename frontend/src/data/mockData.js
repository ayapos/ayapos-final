// Mock data for AyaPos application

export const posPackages = [
  {
    id: 'premium',
    name: 'Premium POS',
    tagline: 'Contrôle total, puissance maximale',
    description: 'Pour les chaînes de restaurants, centres commerciaux et entreprises à fort volume',
    price: 1049,
    features: [
      'Utilisateurs illimités',
      'Android / Windows',
      'Fonctionnement hors ligne',
      'Vente rapide par code-barres',
      'Suivi des commandes par table',
      'Gestion des comptes clients',
      'Portail de gestion en ligne',
      'Application de rapport mobile',
      'Gestion multi-menus',
      'Connexion multi-imprimantes',
      'Support écran cuisine (KDS)'
    ],
    recommended: true
  },
  {
    id: 'tablet',
    name: 'Tablet POS',
    tagline: 'Compact et économique',
    description: 'Pour les petits restaurants, chaînes de cafés et pâtisseries boutiques',
    price: 699,
    features: [
      'Utilisateurs illimités',
      'Android OS',
      'Fonctionnement hors ligne',
      'Vente rapide par code-barres',
      'Suivi des commandes par table',
      'Gestion des comptes clients',
      'Portail de gestion en ligne',
      'Application de rapport mobile',
      'Gestion multi-menus',
      'Connexion multi-imprimantes',
      'Support écran cuisine (KDS)'
    ],
    recommended: false
  },
  {
    id: 'web',
    name: 'Web POS',
    tagline: 'Démarrage rapide, votre propre appareil',
    description: 'Pour les nouvelles entreprises, cafés et kiosques',
    price: 525,
    discount: 20,
    features: [
      'Utilisateurs illimités',
      'Basé sur le Web',
      'Fonctionnement hors ligne',
      'Vente rapide par code-barres',
      'Suivi des commandes par table',
      'Gestion des comptes clients',
      'Portail de gestion en ligne',
      'Application de rapport mobile',
      'Gestion multi-menus',
      'Connexion multi-imprimantes',
      'Support écran cuisine (KDS)'
    ],
    recommended: false
  },
  {
    id: 'mobile',
    name: 'Mobile POS',
    tagline: 'Mobile et portable',
    description: 'Pour les ventes sur le terrain, vendeurs ambulants et événements',
    price: 349,
    features: [
      'Utilisateurs illimités',
      'Android OS',
      'Fonctionnement hors ligne',
      'Vente rapide par code-barres',
      'Suivi des commandes par table',
      'Gestion des comptes clients',
      'Portail de gestion en ligne',
      'Application de rapport mobile',
      'Gestion multi-menus',
      'Connexion multi-imprimantes',
      'Support écran cuisine (KDS)'
    ],
    recommended: false
  }
];

export const ayapayTerminals = [
  {
    id: 'a77',
    name: 'SmartPOS A77',
    tagline: 'Compact et léger',
    description: 'Terminal portable avec écran tactile 5" et connexion 4G. Parfait pour les paiements mobiles.',
    image: '/images/terminal-a77.png',
    features: [
      'Écran tactile 5"',
      'Connexion 4G/WiFi',
      'Batterie longue durée',
      'NFC sans contact',
      'Scanner QR code',
      'Imprimante thermique'
    ]
  },
  {
    id: 'a920',
    name: 'SmartPOS A920',
    tagline: 'Smart et rapide',
    description: 'Terminal intelligent avec grand écran 5.5" et imprimante intégrée. Idéal pour les restaurants.',
    image: '/images/terminal-a920.png',
    features: [
      'Grand écran tactile 5.5"',
      'Processeur puissant',
      'Imprimante intégrée',
      'Caméra arrière',
      '4G/WiFi/Bluetooth',
      'Android OS'
    ]
  },
  {
    id: 'q80',
    name: 'Desk POS Q80',
    tagline: 'Fixe et pratique',
    description: 'Terminal de comptoir avec support stable. Solution professionnelle pour points de vente fixes.',
    image: '/images/terminal-q80.png',
    features: [
      'Écran tactile 8"',
      'Support stable',
      'Connexion Ethernet',
      'Imprimante haute vitesse',
      'Scanner code-barres',
      'Design professionnel'
    ]
  },
  {
    id: 'softpos',
    name: 'Tap to Pay on iPhone',
    tagline: 'Paiement sans terminal',
    description: 'Transformez votre iPhone en terminal de paiement. Aucun matériel supplémentaire nécessaire.',
    image: '/images/tap-to-pay.png',
    features: [
      'Sans matériel supplémentaire',
      'Application MyPayments',
      'Paiements sans contact',
      'Sécurité maximale',
      'Configuration rapide',
      'Compatible iPhone XS+'
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sophie Laurent',
    business: 'Café Parisien',
    city: 'Paris',
    rating: 5,
    text: "AyaPos a transformé notre façon de travailler. Le système est intuitif et le support client est exceptionnel. Les terminaux de paiement sont ultra-rapides."
  },
  {
    id: 2,
    name: 'Marc Dubois',
    business: 'Restaurant Le Gourmet',
    city: 'Lyon',
    rating: 5,
    text: "Nous utilisons AyaPos depuis 2 ans dans nos 5 restaurants. La gestion centralisée et les rapports en temps réel nous font gagner un temps précieux."
  },
  {
    id: 3,
    name: 'Emma Bernard',
    business: 'Pâtisserie Sucrée',
    city: 'Marseille',
    rating: 5,
    text: "Le système POS est parfait pour notre boutique. L'intégration avec les terminaux AyaPay rend les paiements extrêmement fluides."
  },
  {
    id: 4,
    name: 'Thomas Weber',
    business: 'Hotel Alpenblick',
    city: 'Zurich',
    rating: 5,
    text: "Die AyaPos-Lösung ist perfekt für unser Hotel. Das System ist zuverlässig und die Zahlungsterminals funktionieren einwandfrei."
  }
];

export const businessTypes = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Café' },
  { value: 'fast-food', label: 'Fast Food' },
  { value: 'bakery', label: 'Pâtisserie' },
  { value: 'hotel', label: 'Hôtel' },
  { value: 'market', label: 'Marché' },
  { value: 'retail', label: 'Commerce de détail' },
  { value: 'other', label: 'Autre' }
];

export const features = [
  {
    icon: 'Laptop',
    title: 'Système POS Complet',
    description: 'Gérez vos ventes, stocks, et rapports en temps réel depuis n\'importe où'
  },
  {
    icon: 'CreditCard',
    title: 'Terminaux de Paiement',
    description: 'Solutions de paiement sécurisées et rapides pour tous types de transactions'
  },
  {
    icon: 'Smartphone',
    title: 'Menus Digitaux',
    description: 'QR codes, tablettes et kiosques pour une expérience client moderne'
  },
  {
    icon: 'BarChart3',
    title: 'Rapports & Analytics',
    description: 'Suivez vos performances avec des tableaux de bord intuitifs'
  },
  {
    icon: 'Cloud',
    title: 'Cloud Synchronisé',
    description: 'Accédez à vos données depuis n\'importe quel appareil, n\'importe où'
  },
  {
    icon: 'Shield',
    title: 'Sécurité Maximale',
    description: 'Conformité PCI-DSS et chiffrement de bout en bout de vos données'
  }
];

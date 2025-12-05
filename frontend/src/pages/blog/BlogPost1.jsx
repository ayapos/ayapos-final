import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost1 = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <div className="max-w-4xl">
            <div className="inline-block bg-blue-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Actualités
            </div>
            <h1 className="text-5xl font-bold mb-6">
              AyaPos lance sa nouvelle gamme de bornes self-service
            </h1>
            <div className="flex items-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                15 Novembre 2024
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Marie Dubois
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                5 min de lecture
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-4 -mt-12">
        <div className="max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=600&fit=crop"
            alt="Bornes self-service AyaPos"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Nous sommes ravis d'annoncer le lancement de notre nouvelle gamme de bornes self-service AyaPos Kiosk. Ces terminaux de dernière génération représentent l'aboutissement de 2 ans de recherche et développement pour offrir la meilleure expérience client possible.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Une révolution pour la restauration rapide</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Les nouvelles bornes AyaPos Kiosk sont conçues pour transformer l'expérience de commande dans les restaurants. Avec leur écran tactile 32 pouces ultra-réactif et leur interface intuitive, vos clients peuvent passer commande en moins de 30 secondes.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Nous avons travaillé avec plus de 100 restaurateurs pendant la phase de test pour optimiser chaque détail : de la hauteur de l'écran à la taille des boutons, en passant par les animations et les transitions. Le résultat est une expérience utilisateur parfaite, même pour les clients qui utilisent une borne pour la première fois.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
              <p className="text-lg font-semibold text-blue-900 mb-2">
                💡 Le saviez-vous ?
              </p>
              <p className="text-blue-800">
                Les restaurants équipés de bornes self-service AyaPos constatent une augmentation moyenne de 30% de leur chiffre d'affaires grâce à l'upselling automatique et à la réduction du temps d'attente.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Trois modèles pour tous les besoins</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Notre nouvelle gamme se décline en trois modèles pour s'adapter à tous les types d'établissements :
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Kiosk Compact - 15.6 pouces</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Parfait pour les petits espaces. Avec son design vertical élégant et son écran de 15.6 pouces, le Kiosk Compact offre toutes les fonctionnalités essentielles dans un format gain de place. Idéal pour les cafés, boulangeries et petits restaurants.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Kiosk Standard - 21.5 pouces</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Le choix le plus populaire. Avec son écran Full HD de 21.5 pouces et ses haut-parleurs intégrés, le Kiosk Standard offre le meilleur rapport qualité-prix. C'est notre best-seller, adopté par plus de 2000 restaurants en France.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Kiosk Premium - 32 pouces</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              L'expérience ultime. Écran 4K de 32 pouces, double imprimante ticket, caméra HD pour analytics, éclairage LED RGB personnalisable... Le Kiosk Premium est conçu pour les restaurants haut de gamme et les chaînes qui veulent faire forte impression.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Des fonctionnalités innovantes</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Toutes nos bornes intègrent des fonctionnalités avancées développées spécifiquement pour le secteur de la restauration :
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
              <li><strong>Upselling intelligent :</strong> Suggestions personnalisées basées sur l'IA pour augmenter le panier moyen de 25%</li>
              <li><strong>Menu adaptatif :</strong> Affichage dynamique selon l'heure de la journée (petit-déjeuner, déjeuner, dîner)</li>
              <li><strong>Allergènes et nutrition :</strong> Informations complètes sur chaque produit avec filtres allergènes</li>
              <li><strong>Paiement multi-options :</strong> CB sans contact, Apple Pay, Google Pay, tickets restaurant</li>
              <li><strong>Impression ticket ultra-rapide :</strong> Moins de 3 secondes après validation</li>
              <li><strong>Mode hors-ligne :</strong> Continue à fonctionner même sans connexion internet</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Installation et formation incluses</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Comme toujours avec AyaPos, l'installation est incluse dans tous nos forfaits. Nos techniciens viennent sur site pour installer et configurer vos bornes. Nous assurons également une formation complète de votre équipe pour garantir une prise en main optimale.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              La livraison est gratuite partout en France, et nos bornes sont garanties 2 à 5 ans selon le modèle choisi. Notre service après-vente est disponible 7j/7 pour vous accompagner.
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl my-12">
              <h3 className="text-2xl font-bold mb-4">Offre de lancement !</h3>
              <p className="text-blue-100 mb-4">
                Pour célébrer ce lancement, bénéficiez de 20% de réduction sur votre première commande de bornes AyaPos Kiosk jusqu'au 31 décembre 2024.
              </p>
              <Link to="/contact">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300">
                  Demander un devis
                </button>
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Témoignages clients</h2>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <p className="text-gray-700 italic mb-4">
                "Nous avons installé 3 bornes AyaPos dans notre restaurant il y a 2 mois. Le retour sur investissement a été immédiat : +35% de chiffre d'affaires, zéro erreur de commande, et nos clients adorent ! Le personnel peut enfin se concentrer sur le service à table."
              </p>
              <p className="text-gray-900 font-semibold">— Thomas Laurent, Le Burger Moderne, Lyon</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <p className="text-gray-700 italic mb-4">
                "L'interface est tellement intuitive que même les personnes âgées l'utilisent sans problème. Et le mode hors-ligne nous a sauvé plusieurs fois lors de coupures internet. Un investissement indispensable pour tout restaurant moderne."
              </p>
              <p className="text-gray-900 font-semibold">— Sophie Martin, Café des Arts, Paris</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Comment commander ?</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Intéressé par nos nouvelles bornes AyaPos Kiosk ? C'est simple :
            </p>

            <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
              <li>Consultez notre page tarifs pour découvrir les 3 modèles en détail</li>
              <li>Contactez-nous pour un devis personnalisé et une démonstration gratuite</li>
              <li>Nos experts vous conseillent sur le modèle adapté à votre établissement</li>
              <li>Installation sous 2 semaines avec formation de votre équipe</li>
            </ol>

            <p className="text-gray-700 leading-relaxed mb-6">
              Nos bornes sont également disponibles en location avec option d'achat, à partir de 99€/mois.
            </p>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://ui-avatars.com/api/?name=Marie+Dubois&background=3B82F6&color=fff&size=64"
                    alt="Marie Dubois"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Marie Dubois</div>
                    <div className="text-gray-600">Responsable Communication AyaPos</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                  <Share2 className="w-5 h-5" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Articles similaires</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link to="/blog/post-2" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1728044849321?w=400&h=200&fit=crop" alt="Article" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">10 Conseils pour optimiser votre service</h3>
                <p className="text-gray-600 text-sm">Comment gérer l'affluence aux heures de rush...</p>
              </div>
            </Link>
            <Link to="/blog/post-3" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1728044849280?w=400&h=200&fit=crop" alt="Article" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">L'IA au service de la restauration</h3>
                <p className="text-gray-600 text-sm">Comment l'IA peut optimiser vos opérations...</p>
              </div>
            </Link>
            <Link to="/blog/post-4" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop" alt="Article" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Success Story : Le Bistrot Moderne</h3>
                <p className="text-gray-600 text-sm">Comment tripler son chiffre d'affaires...</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost1;
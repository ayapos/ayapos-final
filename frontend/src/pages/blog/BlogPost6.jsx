import React from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost6 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <div className="max-w-4xl">
            <div className="inline-block bg-indigo-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Technologie
            </div>
            <h1 className="text-5xl font-bold mb-6">
              QR Code et commande en ligne : les nouvelles attentes des clients
            </h1>
            <div className="flex items-center gap-6 text-indigo-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                25 Octobre 2024
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Thomas Petit
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                4 min de lecture
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1629248242732-592ecc9cc00f?w=1200&h=600&fit=crop"
            alt="QR Code Restaurant"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Les habitudes de consommation évoluent rapidement. Une étude récente montre que 73% des clients de moins de 35 ans préfèrent commander via QR code plutôt que d'attendre un serveur. Voici pourquoi votre restaurant doit s'adapter, et comment AyaPos rend cette transition simple et profitable.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">La révolution du QR Code</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Avant le COVID, les QR codes étaient anecdotiques. Aujourd'hui, ils sont partout : menus, paiements, programmes de fidélité. Les clients ont pris l'habitude de scanner et apprécient la simplicité et l'hygiène de ce système.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Pour les restaurateurs, c'est une opportunité en or : réduire les coûts de personnel, augmenter la vitesse de service, collecter des données précieuses, et offrir une expérience moderne.
          </p>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 my-8">
            <p className="text-lg font-semibold text-indigo-900 mb-2">📊 Chiffres clés</p>
            <ul className="text-indigo-800 space-y-1">
              <li>• 73% des moins de 35 ans préfèrent commander via QR code</li>
              <li>• Le panier moyen augmente de 18% avec commande digitale</li>
              <li>• 85% des clients apprécient de pouvoir commander à leur rythme</li>
              <li>• Temps de service réduit de 35% en moyenne</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Comment fonctionne le système AyaPos QR ?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            C'est d'une simplicité enfantine :
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
            <li>Vous placez un QR code unique sur chaque table</li>
            <li>Le client scanne le code avec son smartphone</li>
            <li>Le menu s'affiche instantanément dans son navigateur (pas d'app à télécharger)</li>
            <li>Il passe commande en quelques clics</li>
            <li>La commande arrive immédiatement en cuisine sur votre écran AyaPos</li>
            <li>Il peut payer en ligne ou à la fin du repas</li>
          </ol>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Les avantages pour vos clients</h2>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Autonomie et rapidité</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Plus besoin d'attendre qu'un serveur soit disponible. Le client consulte le menu, passe commande et ajoute des plats quand il veut. Cette autonomie est particulièrement appréciée pendant les heures de rush.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Menu enrichi et personnalisé</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Sur le menu digital AyaPos, chaque plat a une belle photo HD, une description détaillée, les allergènes, les calories. Le client peut filtrer par régime (végétarien, sans gluten, etc.). Impossible sur un menu papier !
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Personnalisation facile</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            "Burger sans oignons, supplément bacon, sauce à part" : toutes les modifications sont clairement affichées et transmises. Plus de confusion, plus d'erreurs.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Transparence des prix</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le total se calcule automatiquement. Le client voit exactement ce qu'il va payer avant de valider. Aucune mauvaise surprise.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Les avantages pour votre restaurant</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Réduction des coûts de personnel</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Vos serveurs n'ont plus besoin de faire 10 allers-retours pour prendre les commandes. Ils peuvent se concentrer sur l'accueil, les conseils et le service des plats. Un restaurant peut servir 30% de couverts supplémentaires avec la même équipe.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Augmentation du panier moyen</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Les suggestions intelligentes d'AyaPos augmentent le panier de 18% en moyenne. Quand le client ajoute un burger, le système suggère automatiquement les frites et une boisson au bon moment. Le taux de conversion de ces suggestions est 3x supérieur à ce qu'un serveur peut obtenir.
          </p>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-bold mb-4">Activez le système QR Code AyaPos</h3>
            <p className="text-indigo-100 mb-4">
              Inclus dans tous les forfaits à partir de 49CHF /mois. Installation en 1 heure, QR codes personnalisés fournis.
            </p>
            <Link to="/order-system-pricing">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300">
                Voir les tarifs
              </button>
            </Link>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Zéro erreur de commande</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le client saisit lui-même sa commande. Elle arrive directement en cuisine exactement comme demandée. Plus de "j'avais dit sans oignons", plus de plats retournés, plus de clients mécontents.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Collecte de données précieuses</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Avec le consentement du client, vous collectez :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Ses préférences culinaires</li>
            <li>Sa fréquence de visite</li>
            <li>Son panier moyen</li>
            <li>Les plats qu'il consulte mais ne commande pas</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Ces données permettent de créer des offres ultra-personnalisées qui convertissent.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Mises à jour instantanées</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Rupture de stock ? Plat du jour ? Promotion flash ? Vous modifiez votre menu en 30 secondes depuis votre portail web AyaPos. C'est immédiatement visible pour tous les clients. Impossible avec des menus papier !
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Le système de paiement intégré</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Avec AyaPos, le client peut payer directement depuis son téléphone :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>CB, Apple Pay, Google Pay</li>
            <li>Paiement sécurisé 3D Secure</li>
            <li>Reçu envoyé par email automatiquement</li>
            <li>Option de pourboire intégrée (avec suggestions 10%, 15%, 20%)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Plus besoin d'attendre la note. Le client paie quand il veut et part. La rotation des tables est 40% plus rapide.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Programme de fidélité automatique</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Quand un client commande via QR code, il peut créer un compte en 10 secondes (ou se connecter via Google/Facebook). Avantages :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Ses coordonnées bancaires sont sauvegardées (paiement en 1 clic la prochaine fois)</li>
            <li>Historique de ses commandes conservé</li>
            <li>Points de fidélité automatiques (10ème burger offert par exemple)</li>
            <li>Offres personnalisées par email/SMS</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Les préoccupations (et pourquoi elles sont infondées)</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">"Ça va déshumaniser mon restaurant"</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Au contraire ! Vos serveurs, libérés de la prise de commande, ont plus de temps pour discuter avec les clients, donner des conseils, créer du lien. Le service devient plus personnel, pas moins.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">"Les personnes âgées ne sauront pas faire"</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            AyaPos a conçu une interface ultra-simple spécifiquement pour être utilisable par tous. Lors de nos tests, 91% des utilisateurs de plus de 65 ans ont réussi à passer commande sans aide. Et pour les autres ? Vos serveurs restent disponibles pour commander à l'ancienne.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">"C'est compliqué à mettre en place"</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Installation en 1 heure. Nos techniciens viennent sur place, configurent tout, forment votre équipe. Vous imprimez les QR codes (ou on vous les fournit plastifiés). C'est tout. Le lendemain, c'est opérationnel.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 italic mb-4">
              "J'étais vraiment réticent au début. Aujourd'hui, 85% de mes clients commandent via QR code et ils adorent. Mon chiffre d'affaires a augmenté de 28% en 4 mois. Je ne reviendrai jamais en arrière."
            </p>
            <p className="text-gray-900 font-semibold">— Laurent Moreau, Brasserie Le Central, Toulouse</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Et après ? L'avenir de la commande</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            AyaPos travaille déjà sur les prochaines évolutions :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li><strong>Commande vocale :</strong> "Alexa, commande-moi un burger au restaurant"</li>
            <li><strong>Réalité augmentée :</strong> Visualiser le plat en 3D avant de commander</li>
            <li><strong>Recommandations IA avancées :</strong> Basées sur vos goûts et votre historique</li>
            <li><strong>Table connectée :</strong> Écran tactile intégré dans la table</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6">
            La restauration de demain se construit aujourd'hui. Les restaurateurs qui adoptent ces technologies maintenant prennent une longueur d'avance décisive.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Comment démarrer ?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le système de commande QR Code AyaPos est inclus dans tous nos forfaits dès 49CHF /mois :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Menu digital responsive illimité</li>
            <li>QR codes personnalisés pour toutes vos tables</li>
            <li>Paiement en ligne sécurisé</li>
            <li>Programme de fidélité intégré</li>
            <li>Support 7j/7</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6">
            Testez gratuitement pendant 14 jours, sans engagement. Nos équipes viennent installer et former votre personnel sans frais supplémentaires.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="https://ui-avatars.com/api/?name=Thomas+Petit&background=6366F1&color=fff&size=64"
                  alt="Thomas Petit"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">Thomas Petit</div>
                  <div className="text-gray-600">Product Manager AyaPos</div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold">
                <Share2 className="w-5 h-5" />
                Partager
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost6;

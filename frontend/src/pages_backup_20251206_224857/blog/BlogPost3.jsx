import React from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost3 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-purple-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <div className="max-w-4xl">
            <div className="inline-block bg-purple-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Technologie
            </div>
            <h1 className="text-5xl font-bold mb-6">
              L'Intelligence Artificielle au service de la restauration
            </h1>
            <div className="flex items-center gap-6 text-purple-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                5 Novembre 2024
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Sophie Laurent
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                6 min de lecture
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1728044849280?w=1200&h=600&fit=crop"
            alt="Intelligence Artificielle"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            L'Intelligence Artificielle n'est plus de la science-fiction. Chez AyaPos, nous l'avons intégrée dans notre système pour vous aider à prendre de meilleures décisions, optimiser vos opérations et augmenter votre rentabilité. Découvrez comment l'IA transforme déjà des milliers de restaurants.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Prévisions de ventes ultra-précises</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Notre moteur d'IA AyaPos Analytics analyse vos historiques de ventes, la météo, les événements locaux, les jours fériés et même les tendances sur les réseaux sociaux pour prédire vos ventes avec une précision de 95%.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Imaginez savoir exactement combien de hamburgers vous allez vendre demain. Plus de surplus qui finissent à la poubelle, plus de ruptures de stock qui frustrent vos clients. L'IA vous dit précisément quoi commander et en quelle quantité.
          </p>

          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-8">
            <p className="text-lg font-semibold text-purple-900 mb-2">🤖 Résultat concret</p>
            <p className="text-purple-800">
              Le restaurant "La Table du Chef" à Bordeaux a réduit son gaspillage alimentaire de 47% et augmenté ses marges de 12% grâce aux prévisions IA d'AyaPos.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Upselling intelligent et personnalisé</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nos bornes AyaPos Kiosk intègrent un système d'upselling basé sur l'IA. Contrairement aux suggestions aléatoires, notre IA analyse en temps réel :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Ce que le client a déjà dans son panier</li>
            <li>L'heure de la journée et le contexte</li>
            <li>Les associations de produits qui marchent le mieux</li>
            <li>La rentabilité de chaque suggestion</li>
            <li>Les préférences des clients similaires</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Résultat : un taux d'acceptation des suggestions de 35% contre 8% pour les suggestions aléatoires classiques. Cela représente une augmentation moyenne du panier de 4,50CHF  par commande.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Optimisation dynamique des prix</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            L'IA AyaPos peut ajuster automatiquement vos prix en fonction de la demande, comme le font les compagnies aériennes. Par exemple :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Réduire légèrement les prix pendant les heures creuses pour attirer plus de clients</li>
            <li>Augmenter les prix de 10-15% pendant les heures de pointe quand la demande est forte</li>
            <li>Proposer des promotions ciblées sur les produits qui se vendent mal</li>
            <li>Maximiser les marges sur vos best-sellers</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Cette stratégie, testée sur 200 restaurants, a permis d'augmenter le chiffre d'affaires de 18% en moyenne sans perdre de clients.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Gestion intelligente des stocks</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le module de gestion des stocks AyaPos utilise l'IA pour vous alerter intelligemment. Le système apprend vos cycles de vente et comprend que vous vendez plus de glaces l'été, plus de soupes l'hiver, plus de salades le midi.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Il vous envoie des alertes contextuelles : "Attention, selon les prévisions météo (30°C samedi), vous risquez une rupture de stock de glace vanille. Commandez 40 unités supplémentaires."
          </p>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-bold mb-4">Essayez l'IA AyaPos gratuitement</h3>
            <p className="text-purple-100 mb-4">
              Activez les fonctionnalités IA sur votre système AyaPos existant ou testez-les gratuitement pendant 30 jours.
            </p>
            <Link to="/contact">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300">
                Activer l'IA maintenant
              </button>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Détection automatique des anomalies</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            L'IA surveille en permanence vos opérations et vous alerte en cas d'anomalie :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Baisse inhabituelle des ventes → Problème possible de qualité ou concurrent</li>
            <li>Augmentation anormale des remises → Fraude potentielle</li>
            <li>Temps d'attente qui s'allonge → Besoin de personnel supplémentaire</li>
            <li>Ratio déchets/ventes anormal → Problème de portions ou de qualité</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Chatbot intelligent pour vos clients</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Notre chatbot IA intégré au système de commande en ligne répond instantanément aux questions des clients 24/7 :
          </p>
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 mb-2"><strong>Client :</strong> "Est-ce que le burger végétarien contient des arachides ?"</p>
            <p className="text-gray-700 mb-2"><strong>IA AyaPos :</strong> "Non, notre burger végétarien ne contient pas d'arachides. Il est à base de légumes grillés et de fromage halloumi. Souhaitez-vous le commander ?"</p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le chatbot comprend le langage naturel et peut gérer 87% des questions sans intervention humaine, libérant votre personnel pour le service.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Planification intelligente du personnel</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            L'IA AyaPos analyse vos besoins en personnel en croisant vos prévisions de ventes avec les compétences de votre équipe. Elle génère automatiquement des plannings optimisés qui :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Assurent une couverture suffisante pendant les pics</li>
            <li>Respectent les contraintes légales (heures max, repos)</li>
            <li>Prennent en compte les préférences et disponibilités</li>
            <li>Équilibrent la charge de travail entre tous</li>
            <li>Minimisent les coûts de personnel</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Analyse des avis clients</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            L'IA scanne automatiquement vos avis Google, TripAdvisor et réseaux sociaux. Elle identifie les tendances positives et négatives, extrait les points d'amélioration et vous alerte sur les problèmes récurrents.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Par exemple : "7 clients ont mentionné un temps d'attente trop long cette semaine. Envisagez d'ajouter du personnel le samedi midi."
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">L'avenir : Vision par ordinateur</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nos bornes Premium sont équipées de caméras HD qui analysent :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Le flux de clients pour optimiser les heures d'ouverture</li>
            <li>Les temps d'attente réels aux caisses</li>
            <li>Les zones d'affluence dans le restaurant</li>
            <li>Les comportements d'achat (anonymisés)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Ces données permettent d'optimiser l'agencement de votre restaurant et le positionnement de vos équipes.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 italic mb-4">
              "L'IA d'AyaPos a complètement transformé notre façon de travailler. Nous prenons des décisions basées sur des données précises au lieu de notre intuition. Résultat : +22% de rentabilité en 6 mois."
            </p>
            <p className="text-gray-900 font-semibold">— Marc Durand, Le Gourmet Moderne, Marseille</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Comment activer l'IA sur votre système ?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Si vous utilisez déjà AyaPos, l'IA est incluse dans tous les forfaits Business et Enterprise. Activez-la simplement depuis votre portail web.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Si vous êtes sur le forfait Essentiel, upgrader vers Business coûte seulement 50CHF /mois supplémentaires et vous donne accès à toutes les fonctionnalités IA.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Pour les nouveaux clients, nous offrons une formation complète de 2 heures pour vous apprendre à tirer le maximum de l'IA AyaPos.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="https://ui-avatars.com/api/?name=Sophie+Laurent&background=9333EA&color=fff&size=64"
                  alt="Sophie Laurent"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">Sophie Laurent</div>
                  <div className="text-gray-600">Chief Technology Officer AyaPos</div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold">
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

export default BlogPost3;
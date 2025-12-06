import React from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost5 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <div className="max-w-4xl">
            <div className="inline-block bg-green-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Conseils
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Réduire le gaspillage alimentaire de 40% grâce à la technologie AyaPos
            </h1>
            <div className="flex items-center gap-6 text-green-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                28 Octobre 2024
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Emma Bernard
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                5 min de lecture
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&h=600&fit=crop"
            alt="Réduire le gaspillage"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Le gaspillage alimentaire est un fléau économique et écologique. En France, les restaurants jettent en moyenne 15-20% de leur stock. Ça représente des milliers d'euros perdus chaque mois. Heureusement, la technologie AyaPos peut vous aider à réduire drastiquement ce gaspillage. Voici comment.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Le vrai coût du gaspillage</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Prenons un restaurant moyen avec 15 000CHF  d'achats alimentaires mensuels. Un taux de gaspillage de 18% représente 2 700CHF  jetés à la poubelle chaque mois, soit 32 400CHF  par an !
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Mais ce n'est pas tout. Il faut aussi comptabiliser le coût d'élimination des déchets, l'impact environnemental (émissions CO2), et le temps perdu par votre personnel à gérer ces surplus.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
            <p className="text-lg font-semibold text-green-900 mb-2">💰 Impact réel</p>
            <p className="text-green-800">
              Un restaurant utilisant AyaPos avec gestion intelligente des stocks réduit son gaspillage de 40% en moyenne, soit une économie de 12 960CHF  par an pour notre exemple.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Prévisions de ventes basées sur l'IA</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le système AyaPos analyse vos historiques de ventes, la météo, les événements locaux, et même les tendances sur les réseaux sociaux pour prédire précisément vos besoins.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Par exemple : "Selon nos prévisions, vous vendrez 87 burgers demain (±5). Vous avez actuellement 45 steaks en stock. Commandez 50 steaks supplémentaires pour optimiser."
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Gestion des dates de péremption</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            AyaPos suit automatiquement les dates de péremption de vos produits. Le système vous alerte 3 jours avant qu'un produit n'expire et vous suggère des actions :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Créer une promotion éclair (ex: -30% sur le plat du jour)</li>
            <li>Proposer en suggestion sur les bornes self-service</li>
            <li>Donner à une association caritative (avec suivi automatique pour déduction fiscale)</li>
            <li>Utiliser dans une recette alternative</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Analyse des restes de plats</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Avec le système d'écran cuisine, vos équipes peuvent noter en un clic les plats retournés non terminés. L'IA analyse ces données pour identifier les problèmes :
          </p>
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 mb-2"><strong>Exemple d'alerte AyaPos :</strong></p>
            <p className="text-gray-700">"7 clients ont laissé plus de 50% de leur salade César cette semaine. Problème de portion (trop grande) ou de qualité ? Vérifiez et ajustez."</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Menu dynamique basé sur les stocks</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            AyaPos peut automatiquement ajuster votre menu digital en fonction de vos stocks. Si vous avez un surplus de tomates qui approche de la péremption, le système :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Met en avant les plats contenant des tomates</li>
            <li>Les place en "suggestions du jour" sur les bornes</li>
            <li>Augmente leur visibilité sur le site de commande en ligne</li>
            <li>Propose des combos avantageux incluant ces plats</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Portions optimisées</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le système analyse les retours de plats non terminés pour vous aider à optimiser vos portions. Si 60% de vos clients ne finissent pas leurs frites, c'est un signal clair : réduisez la portion de 20% et économisez.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Cette approche data-driven vous permet de trouver le sweet spot : des portions qui satisfont vos clients sans gaspillage.
          </p>

          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-bold mb-4">Calculez vos économies potentielles</h3>
            <p className="text-green-100 mb-4">
              Contactez-nous pour un audit gratuit de votre gaspillage. Nous analysons vos données et vous montrons combien vous pourriez économiser avec AyaPos.
            </p>
            <Link to="/contact">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300">
                Demander un audit gratuit
              </button>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">6. Gestion intelligente des promotions</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Les happy hours et promotions ne doivent plus être aléatoires. AyaPos analyse vos heures creuses et vos surplus pour créer des promotions ciblées qui :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Attirent des clients pendant les périodes faibles</li>
            <li>Écoulent les stocks qui s'accumulent</li>
            <li>Maintiennent une marge acceptable</li>
            <li>Se désactivent automatiquement une fois l'objectif atteint</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">7. Collaboration avec les associations</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            AyaPos facilite le don aux associations. Le système génère automatiquement les certificats de don pour vos déductions fiscales (jusqu'à 60% du don déductible).
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Vous pouvez même connecter directement votre restaurant à des applications comme Too Good To Go via notre API. Les invendus sont automatiquement proposés à prix réduit en fin de journée.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">8. Formation du personnel</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le tableau de bord AyaPos affiche en temps réel le taux de gaspillage de chaque service et par catégorie. Cette transparence encourage vos équipes à faire attention.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Vous pouvez même gamifier la réduction du gaspillage : définissez des objectifs mensuels et récompensez les équipes qui les atteignent.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">9. Recettes alternatives automatiques</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Quand un ingrédient approche de sa date de péremption, AyaPos peut suggérer automatiquement des recettes alternatives qui l'utilisent. Ces suggestions apparaissent directement dans l'interface de votre chef.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700">"Vous avez 3kg de carottes qui expirent dans 2 jours. Suggestion : ajoutez une 'Soupe de carottes au gingembre' en plat du jour. Recette disponible dans votre base de données."</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">10. Reporting et amélioration continue</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Les rapports hebdomadaires AyaPos vous montrent :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Votre taux de gaspillage par catégorie</li>
            <li>Les produits les plus gaspillés</li>
            <li>L'évolution semaine après semaine</li>
            <li>Votre économie réalisée en euros</li>
            <li>Votre impact environnemental (CO2 évité)</li>
            <li>Comparaison avec les restaurants similaires</li>
          </ul>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 italic mb-4">
              "Grâce à AyaPos, nous avons réduit notre gaspillage de 52%. Ça représente 1800CHF  économisés chaque mois. Et nos clients apprécient notre démarche écologique, c'est devenu un argument de vente."
            </p>
            <p className="text-gray-900 font-semibold">— Claire Martin, Restaurant Bio & Local, Nantes</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Bonus : L'impact environnemental</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Au-delà des économies financières, réduire le gaspillage a un impact énorme sur l'environnement. AyaPos calcule et affiche votre empreinte carbone évitée.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            En moyenne, réduire le gaspillage de 40% équivaut à économiser 2,4 tonnes de CO2 par an pour un restaurant moyen. C'est l'équivalent de 15 000 km en voiture !
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Vous pouvez même afficher ce badge sur votre site web : "Restaurant engagé - 2.4 tonnes de CO2 économisées grâce à nos pratiques anti-gaspillage". Un vrai argument marketing.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Comment commencer ?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            La gestion anti-gaspillage est incluse dans tous les forfaits AyaPos Business et Enterprise. Si vous êtes sur le forfait Essentiel, l'upgrade coûte 50CHF /mois et s'amortit dès le premier mois.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nos experts peuvent faire un audit gratuit de votre établissement et vous montrer précisément combien vous pourriez économiser. La plupart de nos clients récupèrent leur investissement en moins de 2 mois.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="https://ui-avatars.com/api/?name=Emma+Bernard&background=059669&color=fff&size=64"
                  alt="Emma Bernard"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">Emma Bernard</div>
                  <div className="text-gray-600">Consultante Développement Durable AyaPos</div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold">
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

export default BlogPost5;

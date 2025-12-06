import React from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost4 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-orange-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <div className="max-w-4xl">
            <div className="inline-block bg-orange-500 bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Success Story
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Success Story : Comment Le Bistrot Moderne a triplé son chiffre d'affaires avec AyaPos
            </h1>
            <div className="flex items-center gap-6 text-orange-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                1 Novembre 2024
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Jean Dupont
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                8 min de lecture
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop"
            alt="Le Bistrot Moderne"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Jean Dupont tenait un restaurant traditionnel depuis 15 ans à Lyon. Malgré une cuisine excellente et une clientèle fidèle, son établissement stagnait. Il y a 18 mois, il a décidé de tout changer en adoptant AyaPos. Aujourd'hui, son chiffre d'affaires a triplé. Voici son histoire.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">La situation avant AyaPos</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            "Mon restaurant fonctionnait à l'ancienne," explique Jean. "Tickets papier, caisse enregistreuse mécanique, pas de site web pour commander. Je pensais que c'était le charme de l'authenticité. En réalité, je perdais de l'argent tous les jours."
          </p>

          <div className="bg-red-50 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-red-900 mb-3">Les problèmes identifiés :</h3>
            <ul className="list-disc list-inside space-y-2 text-red-800">
              <li>Erreurs de commande fréquentes (1 sur 10)</li>
              <li>Temps d'attente de 45 minutes en moyenne</li>
              <li>Gaspillage alimentaire de 25% du stock</li>
              <li>Aucune visibilité sur les ventes en temps réel</li>
              <li>Impossibilité de commander en ligne</li>
              <li>Rotation des tables très lente</li>
              <li>Pas de programme de fidélité</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            "Je voyais des clients partir après 10 minutes d'attente. Je perdais facilement 15-20 couverts par service. Et à la fin du mois, je jetais pour 2000CHF  de nourriture périmée."
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">La décision de passer à AyaPos</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Un ami restaurateur lui a parlé d'AyaPos. "Au début, j'étais sceptique. Je me disais que c'était trop cher, trop compliqué. Mais après une démonstration gratuite, j'ai compris que je ne pouvais plus continuer comme ça."
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Jean a opté pour une installation complète :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>1 terminal POS principal à la caisse</li>
            <li>3 tablettes serveur pour la prise de commande mobile</li>
            <li>2 écrans cuisine pour les commandes</li>
            <li>2 bornes self-service à l'entrée</li>
            <li>Système de commande en ligne</li>
            <li>Module de gestion des stocks avec IA</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6">
            "L'installation a pris une journée. L'équipe AyaPos a formé tout mon personnel pendant 2 heures. En une semaine, tout le monde était autonome."
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-8">
            <p className="text-lg font-semibold text-orange-900 mb-2">💡 Point clé</p>
            <p className="text-orange-800">
              Jean a démarré avec le forfait Business à 99CHF /mois. L'investissement en matériel (5200CHF ) a été amorti en moins de 3 mois grâce aux gains de productivité.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Les résultats après 6 mois</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
              <TrendingUp className="w-10 h-10 text-green-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">+180%</div>
              <div className="text-gray-700">Augmentation du chiffre d'affaires</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
              <TrendingUp className="w-10 h-10 text-blue-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">-47%</div>
              <div className="text-gray-700">Réduction du gaspillage alimentaire</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <TrendingUp className="w-10 h-10 text-purple-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">-65%</div>
              <div className="text-gray-700">Réduction des erreurs de commande</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl">
              <TrendingUp className="w-10 h-10 text-orange-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">+40%</div>
              <div className="text-gray-700">Augmentation des couverts servis</div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Les commandes en ligne : un game-changer</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            "Deux mois après l'installation, j'ai activé le système de commande en ligne AyaPos. Aujourd'hui, 35% de mon chiffre d'affaires vient des commandes en ligne. C'est du chiffre que je n'avais pas avant !"
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Les clients peuvent commander depuis le site web ou scanner un QR code à table. Les commandes arrivent directement en cuisine. "Zéro erreur de prise de commande, zéro ticket oublié."
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Les bornes self-service : plus de capacité</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            "Les deux bornes gèrent 60% des commandes à emporter. Pendant le rush du midi, c'est inestimable. Mes serveurs se concentrent sur le service en salle."
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le panier moyen des bornes est 15% plus élevé grâce aux suggestions intelligentes d'AyaPos. "Les gens n'hésitent pas à ajouter un dessert ou une boisson quand c'est suggéré au bon moment."
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">La gestion des stocks : fini le gaspillage</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            "L'IA d'AyaPos me dit exactement quoi commander et quand. Plus de surplus, plus de ruptures. J'ai divisé mon gaspillage par deux et mes marges ont augmenté de 8%."
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <p className="text-gray-700 italic mb-4">
              "Le système m'a alerté qu'il allait faire 28°C samedi. Il m'a suggéré de commander 30% de salades en plus et 40% de soupes en moins. J'ai suivi ses recommandations. Résultat : rupture de stock évitée et zéro gaspillage."
            </p>
            <p className="text-gray-900 font-semibold">— Jean Dupont, Le Bistrot Moderne</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Les résultats après 18 mois</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Aujourd'hui, Le Bistrot Moderne est méconnaissable :
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <strong className="text-gray-900">Chiffre d'affaires :</strong>
                <span className="text-gray-700"> Passé de 18 000CHF /mois à 54 000CHF /mois</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">👥</span>
              <div>
                <strong className="text-gray-900">Couverts :</strong>
                <span className="text-gray-700"> De 1200 à 2100 par mois</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <strong className="text-gray-900">Note Google :</strong>
                <span className="text-gray-700"> Passée de 3,8 à 4,7 étoiles</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <strong className="text-gray-900">Marge nette :</strong>
                <span className="text-gray-700"> +12 points de pourcentage</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <strong className="text-gray-900">Fidélisation :</strong>
                <span className="text-gray-700"> 3200 clients dans le programme de fidélité</span>
              </div>
            </li>
          </ul>

          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-bold mb-4">Vous aussi, transformez votre restaurant</h3>
            <p className="text-orange-100 mb-4">
              Comme Jean, des milliers de restaurateurs ont déjà fait le choix d'AyaPos. Demandez une démonstration gratuite et découvrez votre potentiel.
            </p>
            <Link to="/contact">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300">
                Demander une démonstration
              </button>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Les conseils de Jean aux restaurateurs</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Nous avons demandé à Jean quels conseils il donnerait à un restaurateur qui hésite à franchir le pas :
          </p>

          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li><strong>N'attendez pas :</strong> "Chaque mois que j'ai perdu, c'est de l'argent qui ne reviendra jamais"</li>
              <li><strong>Formez votre équipe :</strong> "Certains serveurs étaient réticents au début. Aujourd'hui, ils ne pourraient plus revenir en arrière"</li>
              <li><strong>Analysez vos données :</strong> "Prenez 30 minutes par semaine pour regarder vos rapports. C'est là qu'on trouve les opportunités"</li>
              <li><strong>Écoutez AyaPos :</strong> "L'IA fait des suggestions basées sur des millions de données. Faites-lui confiance"</li>
              <li><strong>Investissez progressivement :</strong> "Commencez avec l'essentiel, ajoutez des modules au fur et à mesure"</li>
            </ol>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Et maintenant ?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Jean ne compte pas s'arrêter là. "J'ai déjà ouvert une deuxième adresse il y a 3 mois. Avec la gestion centralisée d'AyaPos, je pilote mes deux restaurants depuis mon téléphone. Je vais ouvrir un troisième l'année prochaine."
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Il a également embauché 4 personnes supplémentaires pour faire face à la croissance. "AyaPos m'a permis de créer des emplois. Je suis fier de ça."
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Sa conclusion ? "AyaPos n'est pas une dépense, c'est un investissement. Le meilleur que j'ai fait dans ma carrière de restaurateur."
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="https://ui-avatars.com/api/?name=Jean+Dupont&background=EA580C&color=fff&size=64"
                  alt="Jean Dupont"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">Jean Dupont</div>
                  <div className="text-gray-600">Propriétaire - Le Bistrot Moderne, Lyon</div>
                </div>
              </div>
              <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold">
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

export default BlogPost4;
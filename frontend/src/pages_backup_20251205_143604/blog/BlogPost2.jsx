import React from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
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
              10 Conseils pour optimiser votre service en période de pointe
            </h1>
            <div className="flex items-center gap-6 text-green-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                10 Novembre 2024
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Pierre Martin
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                7 min de lecture
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=600&fit=crop"
            alt="Service en période de pointe"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Les heures de pointe sont à la fois une opportunité et un défi pour tout restaurateur. C'est le moment où vous générez le plus de chiffre d'affaires, mais aussi où les risques d'erreurs et de mécontentement sont les plus élevés. Voici nos 10 conseils d'experts pour gérer ces moments cruciaux.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Préparez votre mise en place à l'avance</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            La préparation est la clé. Utilisez les statistiques de votre système POS AyaPos pour prévoir les volumes. Notre analytics vous montre précisément quels jours et quelles heures sont les plus chargés. Préparez un maximum d'éléments avant le rush : découpe des légumes, pré-portionnage, mise en place des sauces.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Utilisez les Terminaux Serveur mobiles</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Équipez vos serveurs de tablettes AyaPos pour la prise de commande à table. Les commandes arrivent instantanément en cuisine, éliminant les va-et-vient inutiles. Vous gagnez 3-5 minutes par table, ce qui fait toute la différence pendant le rush.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Activez le système d'écran cuisine intelligent</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            L'écran cuisine AyaPos affiche les commandes par ordre de priorité avec code couleur selon le temps d'attente. Plus besoin de tickets papier qui se perdent. Chaque poste (entrées, plats, desserts) voit exactement ce qu'il doit préparer en temps réel.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Mettez en place un menu simplifié</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Pendant les heures de pointe, proposez un menu restreint avec vos best-sellers. Avec AyaPos, vous pouvez activer un "menu rush" en un clic depuis votre portail web. Cela accélère la préparation et réduit le stress en cuisine.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
            <p className="text-lg font-semibold text-green-900 mb-2">💡 Astuce AyaPos</p>
            <p className="text-green-800">
              Utilisez la fonction "Suggestions automatiques" pour proposer des plats plus rapides à préparer pendant les périodes chargées. L'IA AyaPos analyse votre capacité de production en temps réel.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Gérez l'attente de manière proactive</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            La transparence est essentielle. Le système AyaPos affiche automatiquement le temps d'attente estimé sur les bornes self-service. Pour le service à table, utilisez la fonction SMS automatique : vos clients reçoivent un message quand leur table est prête, ils peuvent patienter au bar ou à l'extérieur.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">6. Optimisez la rotation des tables</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le plan de salle interactif AyaPos vous montre en temps réel l'état de chaque table : occupée, en attente de débarrassage, disponible. Assignez intelligemment les clients selon la taille des groupes. Notre système suggère automatiquement la meilleure table disponible.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">7. Prévoyez du personnel supplémentaire</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Analysez vos rapports AyaPos pour identifier précisément vos besoins en personnel. Notre système de gestion d'équipe vous permet de planifier les shifts et d'envoyer des alertes aux extras quand nécessaire. Un serveur de plus peut faire toute la différence.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">8. Automatisez les tâches répétitives</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Laissez AyaPos gérer automatiquement : 
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>L'envoi des commandes en cuisine</li>
            <li>Le calcul et l'impression des additions</li>
            <li>Les notifications aux clients (commande prête, table disponible)</li>
            <li>La gestion des programmes de fidélité</li>
            <li>Les statistiques de vente en temps réel</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">9. Utilisez les bornes self-service stratégiquement</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Les bornes AyaPos Kiosk sont parfaites pour gérer l'affluence. Un client met 25 secondes en moyenne pour passer commande sur une borne, contre 2-3 minutes avec un serveur. Une borne peut gérer jusqu'à 120 commandes par heure contre 20 pour un humain.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">10. Analysez et améliorez continuellement</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Après chaque service, consultez vos rapports AyaPos :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>Temps moyen par table</li>
            <li>Plats les plus/moins commandés</li>
            <li>Moments de pic d'affluence précis</li>
            <li>Performance de chaque serveur</li>
            <li>Taux d'erreur de commande</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Utilisez ces données pour ajuster votre stratégie semaine après semaine.
          </p>

          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-bold mb-4">Besoin d'aide pour optimiser votre service ?</h3>
            <p className="text-green-100 mb-4">
              Nos experts AyaPos peuvent analyser votre établissement et vous proposer des solutions sur-mesure pour gérer vos périodes de pointe.
            </p>
            <Link to="/contact">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300">
                Demander un audit gratuit
              </button>
            </Link>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            En suivant ces 10 conseils et en exploitant pleinement votre système AyaPos, vous transformerez les heures de pointe d'un moment de stress en une machine bien huilée qui génère un maximum de revenus tout en maintenant la qualité de service.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="https://ui-avatars.com/api/?name=Pierre+Martin&background=10B981&color=fff&size=64"
                  alt="Pierre Martin"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">Pierre Martin</div>
                  <div className="text-gray-600">Consultant Restaurant AyaPos</div>
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

export default BlogPost2;
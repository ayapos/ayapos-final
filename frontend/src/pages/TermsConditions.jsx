import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, Shield } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-blue-100 rounded-xl">
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-gray-600 mt-2">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              1. Informations Légales
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                <strong>Raison sociale :</strong> AyaPos Sàrl
              </p>
              <p>
                <strong>Siège social :</strong> Bahnhofstrasse 100, 8001 Zurich, Suisse
              </p>
              <p>
                <strong>Numéro IDE :</strong> CHE-XXX.XXX.XXX
              </p>
              <p>
                <strong>Email de contact :</strong> emrah@ayapos.com
              </p>
              <p>
                <strong>Téléphone :</strong> +41 (0) 800 123 456
              </p>
              <p className="mt-4 text-sm text-gray-600">
                AyaPos est une société enregistrée en Suisse, soumise au droit suisse. Les présentes conditions générales 
                régissent l'utilisation de nos services et produits.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Objet
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et l'utilisation 
                des services proposés par AyaPos, notamment :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Systèmes de point de vente (POS) matériels et logiciels</li>
                <li>Solutions de paiement intégrées (AyaPay)</li>
                <li>Applications mobiles et portails web</li>
                <li>Services de gestion centralisée et reporting</li>
                <li>Solutions de commande digitale (kiosques, QR codes)</li>
                <li>Services d'assistance technique et de maintenance</li>
              </ul>
              <p className="mt-4">
                L'utilisation de nos services implique l'acceptation pleine et entière des présentes CGU. 
                En cas de désaccord, l'utilisateur doit s'abstenir d'utiliser nos services.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Conditions d'Accès et d'Utilisation
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">3.1 Compte Utilisateur</h3>
              <p>
                L'accès à certains services nécessite la création d'un compte utilisateur. L'utilisateur s'engage à :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir des informations exactes, complètes et à jour</li>
                <li>Maintenir la confidentialité de ses identifiants de connexion</li>
                <li>Informer immédiatement AyaPos de toute utilisation non autorisée</li>
                <li>Être responsable de toutes les activités effectuées depuis son compte</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">3.2 Utilisation Conforme</h3>
              <p>L'utilisateur s'engage à utiliser les services de manière conforme aux lois en vigueur et à ne pas :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Utiliser les services à des fins illégales ou frauduleuses</li>
                <li>Tenter d'accéder à des systèmes non autorisés</li>
                <li>Diffuser des contenus illicites, offensants ou contraires aux bonnes mœurs</li>
                <li>Perturber le fonctionnement normal des services</li>
                <li>Copier, modifier ou distribuer le logiciel sans autorisation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">3.3 Disponibilité des Services</h3>
              <p>
                AyaPos s'efforce de maintenir ses services accessibles 24h/24 et 7j/7, mais ne peut garantir une 
                disponibilité continue. Des interruptions peuvent survenir pour maintenance, mise à jour ou en cas 
                de force majeure. AyaPos décline toute responsabilité en cas d'indisponibilité temporaire.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Tarifs et Modalités de Paiement
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">4.1 Prix</h3>
              <p>
                Les prix sont indiqués en Francs suisses (CHF) hors TVA. La TVA suisse au taux en vigueur (actuellement 8,1%) 
                sera ajoutée lors de la facturation. AyaPos se réserve le droit de modifier ses tarifs à tout moment, 
                avec un préavis de 30 jours pour les clients existants.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.2 Modalités de Paiement</h3>
              <p>Les paiements peuvent être effectués par :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Carte bancaire (Visa, Mastercard)</li>
                <li>Virement bancaire SEPA/SWIFT</li>
                <li>TWINT (pour les clients suisses)</li>
                <li>Prélèvement automatique (sur accord préalable)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.3 Facturation et Délais de Paiement</h3>
              <p>
                Les factures sont émises mensuellement pour les services d'abonnement. Le paiement est dû dans les 
                10 jours suivant l'émission de la facture. En cas de retard, des intérêts moratoires au taux de 5% 
                par an pourront être appliqués conformément à l'art. 104 CO (Code des Obligations suisse).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.4 Défaut de Paiement</h3>
              <p>
                En cas de non-paiement après relance, AyaPos se réserve le droit de suspendre l'accès aux services 
                sans préavis et de résilier le contrat. Les montants restants dus demeureront exigibles.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Propriété Intellectuelle
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                Tous les éléments du site et des services AyaPos (textes, graphismes, logiciels, photos, vidéos, 
                marques, logos, etc.) sont protégés par le droit d'auteur suisse (LDA - Loi sur le Droit d'Auteur) 
                et les conventions internationales.
              </p>
              <p>
                L'utilisateur dispose d'un droit d'usage personnel et non exclusif des services. Toute reproduction, 
                représentation, modification ou exploitation commerciale est strictement interdite sans autorisation 
                écrite préalable d'AyaPos.
              </p>
              <p>
                Les marques « AyaPos » et « AyaPay » sont des marques déposées. Toute utilisation non autorisée 
                constitue une contrefaçon sanctionnée par les articles 61 et suivants du Code Pénal suisse.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Protection des Données Personnelles
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                AyaPos s'engage à protéger les données personnelles de ses utilisateurs conformément à la Loi fédérale 
                sur la protection des données (LPD) et au Règlement général sur la protection des données (RGPD) 
                lorsque applicable.
              </p>
              <p>
                Pour plus d'informations sur la collecte, le traitement et la protection de vos données, veuillez 
                consulter notre{' '}
                <Link to="/privacy-policy" className="text-blue-600 hover:underline font-medium">
                  Politique de Confidentialité
                </Link>.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Responsabilités et Garanties
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">7.1 Garanties</h3>
              <p>
                AyaPos garantit que ses services sont fournis avec soin et diligence professionnelle. Le matériel 
                est garanti contre les défauts de fabrication pendant une période de 24 mois à compter de la livraison.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">7.2 Limitation de Responsabilité</h3>
              <p>
                Dans les limites autorisées par la loi suisse, AyaPos ne saurait être tenue responsable de :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dommages indirects, immatériels ou perte de profits</li>
                <li>Interruptions de service dues à des cas de force majeure</li>
                <li>Pertes de données causées par des actions de l'utilisateur</li>
                <li>Utilisation inappropriée ou non conforme des services</li>
                <li>Dommages causés par des tiers ou des facteurs indépendants de notre volonté</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">7.3 Sauvegarde des Données</h3>
              <p>
                Bien qu'AyaPos effectue des sauvegardes régulières, l'utilisateur demeure responsable de la 
                sauvegarde de ses propres données. AyaPos recommande d'effectuer des sauvegardes locales régulières.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Durée et Résiliation
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">8.1 Durée du Contrat</h3>
              <p>
                Les contrats d'abonnement sont conclus pour une durée minimale de 12 mois, renouvelables tacitement 
                pour des périodes identiques sauf résiliation.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">8.2 Résiliation</h3>
              <p>
                Chaque partie peut résilier le contrat moyennant un préavis de 3 mois avant l'échéance du terme. 
                La résiliation doit être notifiée par lettre recommandée ou par email avec accusé de réception.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">8.3 Résiliation pour Juste Motif</h3>
              <p>
                En cas de violation grave des CGU, AyaPos se réserve le droit de résilier le contrat avec effet 
                immédiat, notamment en cas de :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Non-paiement persistant malgré relances</li>
                <li>Utilisation frauduleuse ou abusive des services</li>
                <li>Atteinte à la sécurité des systèmes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">8.4 Conséquences de la Résiliation</h3>
              <p>
                À la fin du contrat, l'utilisateur dispose d'un délai de 30 jours pour récupérer ses données. 
                Passé ce délai, AyaPos se réserve le droit de supprimer définitivement toutes les données.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Modifications des CGU
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                AyaPos se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront 
                informés de toute modification substantielle par email au moins 30 jours avant leur entrée en vigueur.
              </p>
              <p>
                La poursuite de l'utilisation des services après l'entrée en vigueur des nouvelles CGU vaut 
                acceptation de celles-ci. Si l'utilisateur refuse les modifications, il peut résilier son contrat 
                conformément à l'article 8.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Droit Applicable et For Juridique
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">10.1 Droit Applicable</h3>
              <p>
                Les présentes CGU sont régies par le droit suisse, à l'exclusion de toute autre législation. 
                Les conventions internationales applicables en Suisse prévalent sur les dispositions contraires 
                du droit interne.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">10.2 For Juridique</h3>
              <p>
                Tout litige relatif à l'interprétation ou à l'exécution des présentes CGU sera soumis à la 
                compétence exclusive des tribunaux du canton de Zurich, sous réserve de recours au Tribunal fédéral.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">10.3 Règlement des Différends</h3>
              <p>
                En cas de litige, les parties s'engagent à privilégier une résolution amiable avant toute 
                action judiciaire. Une médiation peut être proposée conformément à l'art. 213 CPC 
                (Code de procédure civile suisse).
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Dispositions Générales
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">11.1 Nullité Partielle</h3>
              <p>
                Si une ou plusieurs dispositions des présentes CGU sont déclarées nulles ou inapplicables, 
                les autres dispositions conservent leur pleine force et effet. La disposition nulle sera 
                remplacée par une disposition valable ayant un effet économique similaire.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">11.2 Non-Renonciation</h3>
              <p>
                Le fait pour AyaPos de ne pas se prévaloir d'une disposition des CGU ne saurait être 
                interprété comme une renonciation à s'en prévaloir ultérieurement.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">11.3 Intégralité de l'Accord</h3>
              <p>
                Les présentes CGU constituent l'intégralité de l'accord entre les parties concernant l'utilisation 
                des services et remplacent tous accords antérieurs, écrits ou oraux.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">11.4 Langue</h3>
              <p>
                Les présentes CGU sont rédigées en français. En cas de traduction dans d'autres langues, 
                seule la version française fait foi.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Contact Section */}
          <section>
            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                Contact et Questions
              </h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant ces conditions générales ou pour exercer vos droits, 
                vous pouvez nous contacter :
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Par email :</strong> emrah@ayapos.com</p>
                <p><strong>Par téléphone :</strong> +41 (0) 800 123 456</p>
                <p><strong>Par courrier :</strong> AyaPos Sàrl, Bahnhofstrasse 100, 8001 Zurich, Suisse</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <div className="p-4 bg-green-100 rounded-xl">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Politique de Confidentialité
              </h1>
              <p className="text-gray-600 mt-2">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            AyaPos accorde une grande importance à la protection de vos données personnelles. Cette politique 
            de confidentialité vous informe sur la manière dont nous collectons, utilisons, protégeons et 
            traitons vos données conformément à la <strong>Loi fédérale suisse sur la protection des données (nLPD)</strong> 
            et au <strong>Règlement général sur la protection des données (RGPD)</strong>.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              1. Responsable du Traitement des Données
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                Le responsable du traitement de vos données personnelles est :
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600">
                <p><strong>AyaPos Sàrl</strong></p>
                <p>Bahnhofstrasse 100</p>
                <p>8001 Zurich, Suisse</p>
                <p className="mt-3"><strong>Email :</strong> emrah@ayapos.com</p>
                <p><strong>Téléphone :</strong> +41 (0) 800 123 456</p>
                <p><strong>Numéro IDE :</strong> CHE-XXX.XXX.XXX</p>
              </div>
              <p className="mt-4">
                Pour toute question concernant le traitement de vos données personnelles ou pour exercer vos droits, 
                vous pouvez contacter notre Délégué à la Protection des Données (DPO) à l'adresse : 
                <strong> dpo@ayapos.com</strong>
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              2. Données Collectées
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Dans le cadre de nos services, nous sommes susceptibles de collecter les catégories de données 
                personnelles suivantes :
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">2.1 Données d'Identification</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Nom de l'entreprise et forme juridique</li>
                <li>Adresse postale professionnelle</li>
                <li>Adresse email professionnelle</li>
                <li>Numéro de téléphone professionnel</li>
                <li>Numéro IDE / Numéro de TVA</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">2.2 Données de Connexion et Techniques</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adresse IP</li>
                <li>Type et version du navigateur</li>
                <li>Système d'exploitation</li>
                <li>Pages visitées et durée de visite</li>
                <li>Données de géolocalisation (avec consentement)</li>
                <li>Cookies et identifiants de session</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">2.3 Données Transactionnelles</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Historique des commandes et des transactions</li>
                <li>Données de paiement (cryptées et sécurisées)</li>
                <li>Factures et reçus</li>
                <li>Historique des communications avec le service client</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">2.4 Données d'Utilisation des Services</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Données de ventes et de stocks (pour les clients utilisant nos systèmes POS)</li>
                <li>Rapports et statistiques générés par nos outils</li>
                <li>Paramètres et préférences de l'utilisateur</li>
                <li>Logs d'utilisation des systèmes</li>
              </ul>

              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <p className="font-semibold text-blue-900">
                  ⚠️ Important :
                </p>
                <p className="text-blue-800 mt-2">
                  Nous ne collectons que les données strictement nécessaires à la fourniture de nos services. 
                  Nous ne vendons ni ne louons jamais vos données personnelles à des tiers.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-blue-600" />
              3. Finalités du Traitement
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Vos données personnelles sont traitées pour les finalités suivantes, sur les bases légales 
                indiquées :
              </p>

              <div className="space-y-6 mt-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Exécution du Contrat</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Création et gestion de votre compte client</li>
                    <li>Fourniture et maintenance de nos services POS et solutions de paiement</li>
                    <li>Traitement des commandes et facturation</li>
                    <li>Support technique et assistance client</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Base légale :</strong> Exécution du contrat (art. 6(1)(b) RGPD)
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Obligations Légales</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Respect des obligations comptables et fiscales suisses</li>
                    <li>Conservation des données pour conformité réglementaire</li>
                    <li>Lutte contre la fraude et le blanchiment d'argent</li>
                    <li>Réponse aux demandes des autorités compétentes</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Base légale :</strong> Obligation légale (art. 6(1)(c) RGPD)
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Intérêts Légitimes</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Amélioration de nos produits et services</li>
                    <li>Analyse statistique et études de marché</li>
                    <li>Sécurité des systèmes et prévention des cyberattaques</li>
                    <li>Gestion des réclamations et contentieux</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Base légale :</strong> Intérêt légitime (art. 6(1)(f) RGPD)
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Consentement</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Envoi de newsletters et communications marketing</li>
                    <li>Personnalisation de l'expérience utilisateur</li>
                    <li>Utilisation de cookies non essentiels</li>
                    <li>Partage de témoignages clients</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Base légale :</strong> Consentement (art. 6(1)(a) RGPD)
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    ℹ️ Vous pouvez retirer votre consentement à tout moment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <UserCheck className="w-6 h-6 mr-3 text-blue-600" />
              4. Destinataires des Données
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Vos données personnelles peuvent être partagées avec les catégories de destinataires suivantes, 
                dans les limites strictement nécessaires :
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.1 Personnel Interne</h3>
              <p>
                Nos employés et collaborateurs autorisés ayant besoin d'accéder aux données pour l'exécution 
                de leurs fonctions (service commercial, support technique, comptabilité).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.2 Prestataires de Services</h3>
              <p>Nous faisons appel à des prestataires soigneusement sélectionnés pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Hébergement cloud :</strong> Amazon Web Services (AWS) - Serveurs situés en Suisse/UE</li>
                <li><strong>Traitement des paiements :</strong> Prestataires de paiement certifiés PCI-DSS</li>
                <li><strong>Services de communication :</strong> Envoi d'emails transactionnels et marketing</li>
                <li><strong>Outils d'analyse :</strong> Google Analytics (données anonymisées)</li>
                <li><strong>Support client :</strong> Plateforme de gestion des tickets</li>
              </ul>
              <p className="mt-3 bg-gray-50 p-4 rounded-lg">
                <strong>Note :</strong> Tous nos prestataires sont liés par des accords de confidentialité stricts 
                et ne peuvent utiliser vos données que conformément à nos instructions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.3 Autorités Légales</h3>
              <p>
                En cas d'obligation légale, nous pouvons être amenés à communiquer vos données aux autorités 
                compétentes (police, tribunaux, administration fiscale, régulateurs financiers).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4.4 Transferts Internationaux</h3>
              <p>
                Vos données sont principalement stockées et traitées en Suisse et dans l'Union Européenne. 
                En cas de transfert vers des pays tiers, nous veillons à assurer un niveau de protection adéquat 
                par le biais de :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clauses contractuelles types approuvées par la Commission européenne</li>
                <li>Certifications (Privacy Shield successeur, etc.)</li>
                <li>Décisions d'adéquation de la Commission européenne</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-blue-600" />
              5. Durée de Conservation
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités 
                pour lesquelles elles ont été collectées, dans le respect des obligations légales :
              </p>

              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                        Type de Données
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                        Durée de Conservation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Données de compte actif</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Durée du contrat + 1 an</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">Données comptables et fiscales</td>
                      <td className="px-6 py-4 text-sm text-gray-700">10 ans (obligation légale suisse)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Données de facturation</td>
                      <td className="px-6 py-4 text-sm text-gray-700">10 ans (Code des obligations, art. 958f)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">Logs de connexion et sécurité</td>
                      <td className="px-6 py-4 text-sm text-gray-700">12 mois</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Données de prospection (consentement)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">3 ans sans contact</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">Cookies</td>
                      <td className="px-6 py-4 text-sm text-gray-700">13 mois maximum</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4">
                À l'issue de ces délais, vos données sont soit supprimées de manière sécurisée, soit anonymisées 
                pour des besoins statistiques.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Sécurité des Données
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                AyaPos met en œuvre des mesures techniques et organisationnelles appropriées pour assurer 
                la sécurité de vos données personnelles :
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">6.1 Mesures Techniques</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Chiffrement :</strong> Chiffrement SSL/TLS pour les transmissions de données</li>
                <li><strong>Chiffrement au repos :</strong> Données sensibles chiffrées dans nos bases de données</li>
                <li><strong>Pare-feu et protection DDoS :</strong> Systèmes de protection contre les intrusions</li>
                <li><strong>Authentification forte :</strong> Authentification à deux facteurs (2FA) disponible</li>
                <li><strong>Sauvegardes :</strong> Sauvegardes régulières et chiffrées</li>
                <li><strong>Mises à jour :</strong> Correctifs de sécurité appliqués régulièrement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">6.2 Mesures Organisationnelles</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accès limité aux données sur la base du principe du "besoin d'en connaître"</li>
                <li>Formation régulière du personnel sur la protection des données</li>
                <li>Clauses de confidentialité dans les contrats de travail</li>
                <li>Audits de sécurité réguliers et tests d'intrusion</li>
                <li>Plan de réponse aux incidents de sécurité</li>
                <li>Politique de gestion des mots de passe stricte</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">6.3 Certifications</h3>
              <p>
                Nos infrastructures et processus sont conformes aux standards internationaux :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>ISO 27001 (Gestion de la sécurité de l'information)</li>
                <li>PCI-DSS (Sécurité des données de carte de paiement)</li>
                <li>SOC 2 Type II (pour nos prestataires cloud)</li>
              </ul>

              <div className="bg-red-50 rounded-lg p-4 mt-6 border-l-4 border-red-500">
                <p className="font-semibold text-red-900">
                  🚨 En cas de violation de données :
                </p>
                <p className="text-red-800 mt-2">
                  Conformément à la nLPD et au RGPD, nous nous engageons à notifier toute violation de données 
                  à l'autorité compétente dans un délai de 72 heures et à vous informer rapidement si vos 
                  droits et libertés sont susceptibles d'être affectés.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Vos Droits
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Conformément à la Loi fédérale sur la protection des données (nLPD) et au RGPD, vous disposez 
                des droits suivants concernant vos données personnelles :
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-2">✓ Droit d'Accès</h4>
                  <p className="text-sm text-blue-800">
                    Obtenir une copie de vos données personnelles que nous détenons.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-2">✓ Droit de Rectification</h4>
                  <p className="text-sm text-green-800">
                    Corriger vos données inexactes ou incomplètes.
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-2">✓ Droit à l'Effacement</h4>
                  <p className="text-sm text-red-800">
                    Demander la suppression de vos données dans certaines conditions.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-2">✓ Droit à la Limitation</h4>
                  <p className="text-sm text-purple-800">
                    Limiter le traitement de vos données dans certains cas.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-900 mb-2">✓ Droit d'Opposition</h4>
                  <p className="text-sm text-yellow-800">
                    Vous opposer au traitement de vos données pour des raisons légitimes.
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-5 border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-indigo-900 mb-2">✓ Droit à la Portabilité</h4>
                  <p className="text-sm text-indigo-800">
                    Recevoir vos données dans un format structuré et les transférer.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-500">
                  <h4 className="font-semibold text-gray-900 mb-2">✓ Droit de Retrait du Consentement</h4>
                  <p className="text-sm text-gray-800">
                    Retirer votre consentement à tout moment lorsque applicable.
                  </p>
                </div>

                <div className="bg-pink-50 rounded-lg p-5 border-l-4 border-pink-500">
                  <h4 className="font-semibold text-pink-900 mb-2">✓ Droit de Réclamation</h4>
                  <p className="text-sm text-pink-800">
                    Déposer une plainte auprès de l'autorité de protection des données.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-8">Comment Exercer vos Droits ?</h3>
              <p>
                Pour exercer l'un de ces droits, vous pouvez nous contacter :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Par email :</strong> dpo@ayapos.com ou emrah@ayapos.com</li>
                <li><strong>Par courrier :</strong> AyaPos Sàrl - DPO, Bahnhofstrasse 100, 8001 Zurich, Suisse</li>
              </ul>
              <p className="mt-4">
                Nous nous engageons à répondre à votre demande dans un délai de <strong>30 jours</strong>. 
                Une pièce d'identité pourra être demandée pour vérifier votre identité.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8">Droit de Réclamation auprès de l'Autorité</h3>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de :
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <p><strong>Préposé fédéral à la protection des données et à la transparence (PFPDT)</strong></p>
                <p>Feldeggweg 1</p>
                <p>3003 Berne, Suisse</p>
                <p className="mt-2"><strong>Site web :</strong> <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.edoeb.admin.ch</a></p>
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Cookies et Technologies Similaires
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Notre site utilise des cookies et technologies similaires pour améliorer votre expérience et 
                analyser l'utilisation de nos services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">8.1 Types de Cookies Utilisés</h3>
              
              <div className="space-y-4 mt-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-green-900">Cookies Strictement Nécessaires (Toujours Actifs)</h4>
                  <p className="text-sm text-green-800 mt-2">
                    Ces cookies sont indispensables au fonctionnement du site : authentification, sécurité, 
                    panier d'achat. Ils ne peuvent pas être désactivés.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-900">Cookies de Performance et Analytiques</h4>
                  <p className="text-sm text-blue-800 mt-2">
                    Nous utilisons Google Analytics (avec anonymisation IP) pour comprendre comment vous 
                    utilisez notre site. Vous pouvez les refuser via notre gestionnaire de cookies.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-purple-900">Cookies de Marketing (Nécessitent Consentement)</h4>
                  <p className="text-sm text-purple-800 mt-2">
                    Ces cookies permettent de vous proposer des publicités pertinentes. Ils sont activés 
                    uniquement avec votre consentement explicite.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-8">8.2 Gestion des Cookies</h3>
              <p>
                Vous pouvez gérer vos préférences de cookies à tout moment via :
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Notre gestionnaire de cookies (bannière en bas de page)</li>
                <li>Les paramètres de votre navigateur</li>
                <li>Des outils comme <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Your Online Choices</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-8">8.3 Durée de Conservation des Cookies</h3>
              <p>
                Les cookies sont conservés pour une durée maximale de 13 mois, conformément aux recommandations 
                de la CNIL et du PFPDT.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Mineurs
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                Nos services s'adressent exclusivement aux professionnels et entreprises. Nous ne collectons 
                pas sciemment de données personnelles de personnes âgées de moins de 16 ans.
              </p>
              <p>
                Si vous avez connaissance qu'un mineur nous a fourni des données personnelles, veuillez nous 
                contacter immédiatement afin que nous puissions prendre les mesures nécessaires.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Modifications de la Politique de Confidentialité
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                AyaPos se réserve le droit de modifier la présente politique de confidentialité à tout moment 
                pour refléter les évolutions légales, réglementaires ou de nos pratiques.
              </p>
              <p>
                Toute modification substantielle vous sera notifiée par email au moins 30 jours avant son entrée 
                en vigueur. La date de dernière mise à jour est indiquée en haut de cette page.
              </p>
              <p>
                Nous vous encourageons à consulter régulièrement cette page pour rester informé de la manière 
                dont nous protégeons vos données.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Contact Section */}
          <section>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-green-600" />
                Contact et Questions
              </h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
                n'hésitez pas à nous contacter :
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Délégué à la Protection des Données (DPO)</p>
                  <p><strong>Email :</strong> dpo@ayapos.com</p>
                  <p><strong>Email général :</strong> emrah@ayapos.com</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Adresse Postale</p>
                  <p>AyaPos Sàrl - DPO</p>
                  <p>Bahnhofstrasse 100</p>
                  <p>8001 Zurich, Suisse</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Téléphone :</strong> +41 (0) 800 123 456 (Lundi - Vendredi, 9h00 - 18h00)
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

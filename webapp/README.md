# 2027 & Moi - Boussole Présidentielle

Application web interactive permettant aux utilisateurs de découvrir quel candidat présidentiel 2027 correspond le mieux à leurs idées politiques.

## 🚀 Fonctionnalités

- **Quiz politique interactif** : 13 thèmes couvrant l'ensemble du programme présidentiel
- **Graphique radar** : Visualisation de l'affinité politique par famille
- **Cartographie des candidats** : Filtrage par bloc politique, statut et recherche
- **Comparateur Face à Face** : Comparez 2 candidats côte à côte
- **Analyse thématique** : Consultez les propositions par thème
- **Partage des résultats** : Copiez et partagez votre profil politique
- **Sources officielles** : Liens vers Assemblée nationale, Sénat, etc.

## 📋 Prérequis

- Python 3.x (pour la génération des données)
- Un serveur web (Apache, Nginx, ou hébergement statique comme Netlify, Vercel, GitHub Pages)

## 🛠️ Installation

1. Cloner le repository :
```bash
git clone <repository-url>
cd webapp
```

2. Générer le fichier `data.js` à partir des fichiers JSON :
```bash
python build.py
```

3. Ouvrir `index.html` dans un navigateur ou déployer sur un serveur web.

## 📁 Structure du projet

```
webapp/
├── index.html          # Page principale
├── app.js              # Logique de l'application
├── style.css           # Styles personnalisés
├── data.js             # Données générées (ne pas modifier manuellement)
├── build.py            # Script de génération des données
├── favicon.svg         # Favicon SVG
├── og-image.png        # Image pour partage social (à créer)
└── README.md           # Ce fichier

../
├── candidats.json      # Données brutes des candidats
├── prises-de-parole.json  # Déclarations des candidats
└── votes.json          # Votes parlementaires
```

## 🌐 Déploiement

### GitHub Pages

1. Push le code sur GitHub
2. Activer GitHub Pages dans les settings du repository
3. Sélectionner la branche `main` et le dossier `/webapp`

### Netlify

1. Connecter le repository Netlify
2. Configurer le répertoire de publication : `webapp`
3. Déployer automatiquement à chaque push

### Vercel

1. Importer le projet depuis GitHub
2. Configurer le répertoire racine : `webapp`
3. Déployer

### Hébergement traditionnel (Apache/Nginx)

Uploader le contenu du dossier `webapp` sur votre serveur. Aucune configuration spécifique n'est requise (site statique).

## 🔧 Mise à jour des données

Pour mettre à jour les données des candidats :

1. Modifier les fichiers JSON dans le dossier parent (`candidats.json`, `prises-de-parole.json`, `votes.json`)
2. Exécuter `python build.py` dans le dossier `webapp`
3. Commiter et déployer le nouveau `data.js`

## 📱 Optimisation pour le partage LinkedIn

Pour un partage optimal sur LinkedIn, assurez-vous de :

1. **Créer l'image Open Graph** (`og-image.png`) :
   - Dimensions : 1200x630 pixels
   - Format : PNG
   - Contenu : Logo "2027 & Moi", slogan "Boussole Présidentielle", design professionnel

2. **Mettre à jour l'URL** dans `index.html` :
   - Remplacer `https://2027etmoi.fr/` par votre URL de production
   - Remplacer `https://2027etmoi.fr/og-image.png` par l'URL de votre image OG

3. **Tester le partage** :
   - Utiliser le [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - Vérifier que l'image et le titre s'affichent correctement

## ♿ Accessibilité

L'application utilise :
- Balises HTML sémantiques
- Navigation au clavier
- Contrastes de couleurs conformes aux standards WCAG
- Labels ARIA pour les éléments interactifs

## 📊 Performance

- Tailwind CSS via CDN pour un chargement rapide
- Chart.js et SortableJS optimisés
- Loader animé pour une meilleure UX
- Pas de dépendances lourdes côté serveur

## 📝 Licence

© 2026 2027 & Moi. Tous droits réservés.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour proposer des améliorations ou corriger des bugs, merci d'ouvrir une issue ou un pull request.

## 📧 Contact

Pour toute question ou suggestion, contactez-nous via le formulaire de contact sur le site.

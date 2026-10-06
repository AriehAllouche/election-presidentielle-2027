# Guide de Déploiement en Production

Ce guide vous accompagne pour mettre en production l'application **2027 & Moi** avant votre campagne LinkedIn.

## 📋 Checklist Pré-Déploiement

- [ ] Mettre à jour l'URL de production dans `index.html` (meta tags Open Graph)
- [ ] Vérifier que `data.js` est à jour (exécuter `python build.py`)
- [ ] Tester l'application en local
- [ ] Vérifier le responsive design (mobile, tablette, desktop)
- [ ] Tester le partage sur LinkedIn avec le [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## 🚀 Options de Déploiement

### Option 1: Netlify (Recommandé - Gratuit & Rapide)

1. **Créer un compte Netlify**
   - Allez sur [netlify.com](https://www.netlify.com)
   - Créez un compte gratuit

2. **Connecter votre repository**
   - "Add new site" → "Import an existing project"
   - Connectez votre repository GitHub/GitLab/Bitbucket

3. **Configurer le build**
   - Build command: (laisser vide)
   - Publish directory: `webapp`
   - Cliquez sur "Deploy site"

4. **Personnaliser le domaine (optionnel)**
   - Site settings → Domain management
   - Ajoutez votre domaine personnalisé (ex: `2027etmoi.fr`)

**Avantages** : HTTPS automatique, CDN global, déploiement continu, gratuit.

### Option 2: Vercel (Alternatif - Gratuit)

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Créez un compte gratuit

2. **Importer le projet**
   - "Add New Project"
   - Importez depuis GitHub
   - Configurez le répertoire racine : `webapp`
   - Cliquez sur "Deploy"

**Avantages** : Très rapide, excellent pour les sites statiques, HTTPS automatique.

### Option 3: GitHub Pages (Gratuit)

1. **Pusher le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <votre-repo-url>
   git push -u origin main
   ```

2. **Activer GitHub Pages**
   - Allez dans Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /webapp
   - Save

3. **Votre site sera disponible**
   - `https://<votre-username>.github.io/<repo-name>/`

### Option 4: Hébergement traditionnel (cPanel, Plesk, etc.)

1. **Uploader les fichiers**
   - Utilisez FileZilla ou le gestionnaire de fichiers de votre hébergeur
   - Uploader tout le contenu du dossier `webapp` dans `public_html` ou `www`

2. **Vérifier les permissions**
   - Assurez-vous que les fichiers sont lisibles (755 pour dossiers, 644 pour fichiers)

## 🔧 Configuration de Production

### 1. Mettre à jour l'URL dans index.html

Avant le déploiement, remplacez les URLs placeholder dans `index.html` :

```html
<!-- Ligne 16 -->
<meta property="og:url" content="https://votre-domaine.com/">

<!-- Ligne 19 -->
<meta property="og:image" content="https://votre-domaine.com/og-image.png">

<!-- Ligne 29 -->
<meta name="twitter:image" content="https://votre-domaine.com/og-image.png">
```

### 2. Régénérer data.js (si modification des données)

```bash
cd webapp
python build.py
```

### 3. Tester le partage LinkedIn

1. Déployez d'abord votre site
2. Allez sur [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
3. Entrez l'URL de votre site
4. Vérifiez que :
   - L'image s'affiche correctement (1200x630)
   - Le titre est "2027 & Moi - Boussole Présidentielle"
   - La description est complète
   - Le favicon s'affiche

## 📱 Test avant le lancement

### Checklist de test

- [ ] **Desktop** : Chrome, Firefox, Safari, Edge
- [ ] **Mobile** : iOS Safari, Android Chrome
- [ ] **Tablette** : iPad, Android tablet
- [ ] **Quiz** : Compléter le quiz et vérifier les résultats
- [ ] **Cartographie** : Tester les filtres et la recherche
- [ ] **Comparaison** : Tester la comparaison Face à Face
- [ ] **Modales** : Ouvrir les profils candidats
- [ ] **Partage** : Tester le bouton de partage des résultats
- [ ] **Performance** : Vérifier le temps de chargement (< 3s)

## 📊 Optimisation pour LinkedIn

### Texte de partage recommandé

Pour votre post LinkedIn, utilisez ce template :

```
🗳️ Découvrez quel candidat de 2027 correspond le mieux à vos idées !

J'ai développé "2027 & Moi", une boussole présidentielle interactive qui analyse votre profil politique en 13 thèmes :

✅ Quiz interactif avec glisser-déposer
✅ Comparaison des programmes par thèmes
✅ Graphique radar de vos affinités politiques
✅ Comparateur Face à Face des candidats
✅ Sources officielles (Assemblée, Sénat)

🎯 Testez le quiz : [lien vers votre site]

Toutes les données sont basées sur les déclarations officielles et votes parlementaires.

#Presidentielle2027 #Politique #France #Elections2027
```

## 🔒 Sécurité

Bien que ce soit un site statique, quelques bonnes pratiques :

- Utilisez HTTPS (automatique avec Netlify/Vercel/GitHub Pages)
- Mettez à jour régulièrement les dépendances (CDN)
- Surveillez les liens externes dans les données JSON

## 📈 Monitoring après le lancement

### À surveiller

1. **Google Analytics** (optionnel) : Ajoutez le tracking dans `index.html`
2. **LinkedIn Analytics** : Surveillez les vues de votre post
3. **Feedback utilisateurs** : Prévoyez un moyen de collecter les retours

### Outils recommandés

- [Google PageSpeed Insights](https://pagespeed.web.dev/) : Performance
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) : Partage social
- [GTmetrix](https://gtmetrix.com/) : Performance détaillée

## 🆘 Support

En cas de problème :

1. Vérifiez la console du navigateur (F12)
2. Consultez le README.md
3. Vérifiez que `data.js` est bien généré
4. Testez en local avant de redéployer

## ✨ Dernières étapes avant le lancement

1. **Faire un commit final** avec tous les changements
2. **Taguer la version** : `git tag -a v1.0.0 -m "Version 1.0.0 - Production"`
3. **Pusher les tags** : `git push origin v1.0.0`
4. **Déployer** sur votre plateforme choisie
5. **Tester** l'URL de production
6. **Partager** sur LinkedIn !

---

Bon lancement ! 🚀

# Smoke test manuel — simulateur

Script de vérification manuelle du flux complet, à rejouer après tout
changement touchant l'éditeur. ~5 minutes.

1. **Démarrer** — à la racine du repo : `pnpm dev:simulator` (lance
   webtrine sur `:3000` et le simulateur sur `:3001`). Attendre que les
   deux serveurs soient prêts.
2. **Ouvrir** http://localhost:3001. La barre du haut affiche "Client",
   les boutons de langue et "Page" ; l'aperçu (iframe) se charge sans
   bandeau rouge "Preview server hors-ligne".
3. **Sélectionner** client `apt235`, langue `fr` (bouton actif), page
   `Home`. L'arborescence à gauche affiche une section GLOBAL et une
   section PAGE — Home avec des lignes du type `banner-1 · banner`.
4. **Éditer un bloc** — cliquer sur la ligne `banner-1`. L'onglet
   "Contenu" affiche un formulaire ; modifier le champ texte "Title". Le
   point orange (modifications non enregistrées) apparaît à côté du type
   de bloc.
5. **Enregistrer** — cliquer "Enregistrer". Le chip d'état passe par
   "saving…" puis "saved ✓".
6. **Vérifier** — `git diff --stat apps/webtrine/config` doit montrer
   exactement 1 fichier modifié (`config.fr.json` d'apt235). L'iframe se
   recharge automatiquement après l'enregistrement.
7. **Ajouter un composant** — cliquer "＋ Ajouter un composant". La boîte
   de dialogue liste des composants groupés par dossier (ex. "banners",
   "descriptions"). En choisir un : il apparaît dans l'arborescence juste
   après le bloc sélectionné.
8. **Synchroniser** — cliquer "Enregistrer" : l'ajout étant une opération
   structurelle, une confirmation "Appliquer aussi la structure à
   config.en.json ?" apparaît. Accepter : `config.en.json` reçoit le même
   composant à la même position.
9. **Lang et Thème** — onglet "Lang" : modifier une valeur, essayer la
   recherche, cliquer "Enregistrer lang". Onglet "Thème" : modifier une
   couleur, cliquer "Enregistrer thème". Les deux affichent "Enregistré".
10. **Réinitialiser** — à la racine du repo :
    `git checkout -- apps/webtrine/config apps/webtrine/lang`, puis
    `git status` doit être propre pour ces dossiers. Arrêter les deux
    serveurs (Ctrl+C).

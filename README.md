# Eldaana — landing (eldaana.com)

Site Next.js déployé sur Vercel. Chaque push sur `main` redéploie automatiquement.

## Distribution de l'APK Android (beta)

L'APK est servie à l'URL stable **https://eldaana.com/eldaana-app.apk** depuis `public/eldaana-app.apk`.
Pendant la beta cette URL n'est pas affichée sur le site : elle est partagée au cas par cas aux testeurs.

Pour publier une nouvelle version :

1. Construire la release signée dans `eldaana_android` (`./gradlew assembleRelease`, `versionCode` incrémenté).
2. Remplacer le fichier : `cp app/build/outputs/apk/release/app-release.apk public/eldaana-app.apk` (nom inchangé, l'URL reste stable).
3. `git add public/eldaana-app.apk && git commit -m "apk: version X.Y" && git push` → Vercel redéploie, l'URL sert la nouvelle version.
4. Vérifier : `curl -I https://eldaana.com/eldaana-app.apk` doit répondre `200`, `Content-Type: application/vnd.android.package-archive`, `Content-Disposition: attachment`.

Les en-têtes sont définis dans `vercel.json`. Les navigateurs Android téléchargent le fichier au clic au lieu de l'afficher.
Un fichier de 11 Mo est très en dessous de la limite Vercel.

## Liens vers l'app

Les boutons et liens "Ouvrir Eldaana" pointent vers `https://eldaana.app` (constante `APP_URL` dans `app/page.tsx`
et `app/pricing/page.tsx`). Le magic link (`app/api/auth/magic/route.ts`) redirige aussi vers ce domaine.

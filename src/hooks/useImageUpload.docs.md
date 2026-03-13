# useImageUpload Hook Documentation

## Vue d'ensemble

Hook React personnalisé pour gérer l'upload d'images avec un système de feature flip permettant de choisir entre deux stratégies :
- **Attachment** : Compression et envoi en pièce jointe via EmailJS (limite 500KB)
- **Cloud** : Upload sur Cloudinary et envoi des URLs dans l'email

## Utilisation

### Import

```typescript
import { useImageUpload } from '@/hooks/useImageUpload.hooks';
```

### Modes disponibles

#### 1. Mode Attachment (EmailJS)

Compresse les images et les envoie en pièces jointes. Idéal pour de petites images avec limite de taille stricte.

```typescript
const { uploadImages, images, totalSize, maxSize, errors, removeImage } = useImageUpload({
  feature: {
    type: 'attachment',
    attachment: {
      maxTotalSizeKB: 500,        // Limite totale EmailJS
      maxPhotos: 2,                // Nombre max de photos
      targetSizePerPhotoKB: 240,   // Taille cible par photo
      maxResolution: 1400,         // Résolution max (largeur/hauteur)
      compressionQuality: 0.85,    // Qualité compression (0-1)
    }
  },
  t: useTranslation().t
});

// Les images sont des File objects
images.forEach((img) => {
  if (img instanceof File) {
    console.log(img.name, img.size);
  }
});
```

#### 2. Mode Cloud (Cloudinary)

Upload les images sur Cloudinary et retourne les URLs. Pas de limite de taille, meilleure qualité.

```typescript
const { uploadImages, images, errors, removeImage, isUploading } = useImageUpload({
  feature: {
    type: 'cloud',
    cloud: {
      cloudName: 'my-cloud-name',
      uploadPreset: 'my-unsigned-preset',
      folder: 'tattoo-references',   // Optionnel
      maxPhotos: 5,
      transformation: {               // Optionnel
        width: 1920,
        height: 1920,
        crop: 'limit',
        quality: 'auto:good',
      }
    }
  },
  t: useTranslation().t
});

// Les images sont des URLs (strings)
images.forEach((url) => {
  console.log(url); // https://res.cloudinary.com/...
});
```

## API du Hook

### Paramètres d'entrée

```typescript
type UseImageUploadConfig = {
  feature: ImageDisplayFeature;  // Configuration du feature flip
  t: (key: string) => string;    // Fonction de traduction
};
```

### Valeurs de retour

```typescript
{
  images: Array<File | string>;  // File[] en mode attachment, string[] en mode cloud
  errors: string[];              // Messages d'erreur de validation
  isUploading: boolean;          // Upload en cours
  totalSize: number;             // Taille totale en bytes (attachment uniquement)
  maxSize: number;               // Taille max en bytes (attachment uniquement)
  maxPhotos: number;             // Nombre max de photos autorisées
  mode: 'attachment' | 'cloud';  // Mode actif
  uploadImages: (files: FileList | null) => Promise<ImageUploadResult>;
  removeImage: (index: number) => void;
  clearImages: () => void;
}
```

## Configuration dans config.json

### Example complet avec les deux modes

```json
{
  "type": "contact",
  "id": "tattooContact",
  "datas": {
    "artists": [
      {
        "artistName": "Artist Name",
        "mail": "artist@example.com"
      }
    ],
    "features": {
      "imagesDisplay": {
        "type": "cloud",
        "cloud": {
          "cloudName": "my-cloudinary-account",
          "uploadPreset": "tattoo_unsigned",
          "folder": "tattoo-references",
          "maxPhotos": 5,
          "transformation": {
            "width": 1920,
            "height": 1920,
            "crop": "limit",
            "quality": "auto:good"
          }
        },
        "attachment": {
          "maxTotalSizeKB": 500,
          "maxPhotos": 2,
          "targetSizePerPhotoKB": 240,
          "maxResolution": 1400,
          "compressionQuality": 0.85
        }
      }
    }
  }
}
```

### Mode Attachment uniquement

```json
{
  "features": {
    "imagesDisplay": {
      "type": "attachment",
      "attachment": {
        "maxTotalSizeKB": 500,
        "maxPhotos": 2,
        "targetSizePerPhotoKB": 240,
        "maxResolution": 1400,
        "compressionQuality": 0.85
      }
    }
  }
}
```

### Mode Cloud uniquement (défaut recommandé)

```json
{
  "features": {
    "imagesDisplay": {
      "type": "cloud",
      "cloud": {
        "cloudName": "your-cloud-name",
        "uploadPreset": "your-unsigned-preset",
        "folder": "uploads/tattoos",
        "maxPhotos": 5
      }
    }
  }
}
```

## Configuration Cloudinary

### 1. Créer un Upload Preset (unsigned)

1. Aller dans Cloudinary Dashboard
2. Settings → Upload → Upload presets
3. Créer un nouveau preset :
   - **Signing Mode** : Unsigned
   - **Folder** : uploads/tattoos (ou votre choix)
   - **Transformations** : Optionnelles
   - Copier le **Preset name**

### 2. Récupérer le Cloud Name

Disponible dans Dashboard → Account Details

### 3. URL Pattern

Les images uploadées auront ce format :
```
https://res.cloudinary.com/{cloudName}/image/upload/v{version}/{folder}/{publicId}.{format}
```

## Exemple complet d'intégration

```typescript
import { useImageUpload } from '@/hooks/useImageUpload';
import { useTranslation } from 'react-i18next';

function TattooContactForm({ features }) {
  const { t } = useTranslation();

  const {
    uploadImages,
    images,
    errors,
    isUploading,
    totalSize,
    maxSize,
    maxPhotos,
    mode,
    removeImage,
  } = useImageUpload({
    feature: features?.imagesDisplay || { type: 'cloud' },
    t,
  });

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await uploadImages(e.target.files);
    console.log('Upload result:', result);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoChange}
        disabled={images.length >= maxPhotos || isUploading}
      />

      {/* Mode Attachment : afficher la taille */}
      {mode === 'attachment' && images.length > 0 && (
        <div>
          Taille: {(totalSize / 1024).toFixed(0)} KB / {(maxSize / 1024).toFixed(0)} KB
        </div>
      )}

      {/* Preview des images */}
      {images.map((img, idx) => (
        <div key={idx}>
          {mode === 'attachment' && img instanceof File && (
            <span>{img.name}</span>
          )}
          {mode === 'cloud' && typeof img === 'string' && (
            <img src={img} alt={`Preview ${idx}`} />
          )}
          <button onClick={() => removeImage(idx)}>Remove</button>
        </div>
      ))}

      {/* Erreurs */}
      {errors.map((error) => (
        <div key={error}>{error}</div>
      ))}
    </div>
  );
}
```

## Clés de traduction requises

Le hook utilise les clés de traduction suivantes (à ajouter dans `lang/customer/{client}/fr.json` et `en.json`) :

```json
{
  "contact": {
    "tattoo": {
      "errorTooLarge": "Fichier trop volumineux (max 10MB avant compression)",
      "errorNotImage": "Le fichier doit être une image",
      "errorMaxFiles": "Nombre maximum de photos atteint",
      "errorUpload": "Erreur lors de l'upload"
    }
  }
}
```

## Différences entre les modes

| Aspect | Attachment | Cloud |
|--------|-----------|-------|
| **Stockage** | Pièce jointe email | Cloudinary CDN |
| **Limite de taille** | 500KB total | Illimité (plan Cloudinary) |
| **Qualité** | Compression requise | Qualité originale possible |
| **Nombre max** | 1-2 photos | 3-5+ photos |
| **Coût** | Gratuit (EmailJS) | Gratuit jusqu'à 25GB (Cloudinary) |
| **Traitement** | Client-side | Server-side |
| **URLs permanentes** | Non | Oui |
| **Transformations** | Non | Oui (resize, crop, filters) |

## Configuration par défaut

Si `features` n'est pas fourni dans la config, le hook utilise ces valeurs par défaut :

```typescript
{
  type: 'attachment',
  attachment: {
    maxTotalSizeKB: 500,
    maxPhotos: 2,
    targetSizePerPhotoKB: 240,
    maxResolution: 1400,
    compressionQuality: 0.85,
  }
}
```

## Notes importantes

### Mode Attachment
- La compression est automatique via `browser-image-compression`
- Les `File` objects compressés sont stockés dans le state
- Le composant parent doit gérer l'envoi à EmailJS avec `emailjs.sendForm()`

### Mode Cloud
- Nécessite un compte Cloudinary (gratuit jusqu'à 25GB)
- Upload preset doit être **unsigned** pour les uploads depuis le navigateur
- Les URLs retournées sont permanentes et peuvent être stockées en BDD
- Le composant parent reçoit des URLs strings au lieu de File objects

### Sécurité
- Mode Cloud : Utiliser unsigned presets uniquement avec restrictions (folder, format, taille)
- Ne jamais exposer les signed presets ou API secrets côté client
- Configurer les restrictions dans Cloudinary (allowed formats, max file size, rate limiting)

## Troubleshooting

### Cloudinary 401 Unauthorized
- Vérifier que le preset est bien "unsigned"
- Vérifier que le cloudName est correct

### Cloudinary 400 Bad Request
- Vérifier le format du fichier (PNG, JPG, WebP supportés)
- Vérifier les transformations (syntax correcte)

### Attachment images trop lourdes
- Réduire `targetSizePerPhotoKB`
- Réduire `compressionQuality`
- Réduire `maxResolution`
- Limiter `maxPhotos`

### Images floues (attachment)
- Augmenter `targetSizePerPhotoKB` (attention à la limite 500KB)
- Augmenter `compressionQuality`
- Augmenter `maxResolution`

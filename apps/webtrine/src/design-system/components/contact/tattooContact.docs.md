# Tattoo Contact Component (Formulaire de contact tatoueur)

Composant de formulaire de contact avec sélection d'artiste et envoi de photos de référence, pour les studios de tatouage.

## Exemples de configuration JSON

### Configuration de base (mode Cloud recommandé)

```json
{
  "type": "tattooContact",
  "datas": {
    "logo": "logo_customer",
    "artists": [
      {
        "artistName": "Jordan Lenoir",
        "mail": "jordan.lenoir@example.com"
      },
      {
        "artistName": "Camille Verdier",
        "mail": "camille.verdier@example.com"
      }
    ],
    "features": {
      "imagesDisplay": {
        "type": "cloud",
        "cloud": {
          "cloudName": "my-cloud-name",
          "uploadPreset": "unsigned_preset",
          "folder": "customers/customer-name",
          "maxPhotos": 3
        }
      }
    }
  }
}
```

### Configuration en mode Attachment (sans service cloud)

```json
{
  "type": "tattooContact",
  "datas": {
    "logo": "logo_customer",
    "artists": [
      {
        "artistName": "Jordan Lenoir",
        "mail": "jordan.lenoir@example.com"
      }
    ],
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
}
```

### Configuration avec un artiste sans e-mail (bouton mailto)

```json
{
  "type": "tattooContact",
  "datas": {
    "logo": "logo_customer",
    "artists": [
      {
        "artistName": "Jordan Lenoir",
        "mail": "jordan.lenoir@example.com"
      },
      {
        "artistName": "Camille Verdier",
        "mail": null
      }
    ]
  }
}
```

### Notes

- `features` est optionnel : si absent, le mode d'upload par défaut est `"attachment"` (photos en pièce jointe d'e-mail).
- Si `mail` d'un artiste vaut `null`, un bouton mailto générique est affiché à la place du formulaire complet pour cet artiste.
- L'e-mail de contact général et l'identifiant du template d'envoi proviennent de la configuration client (`client.contact`), pas de `datas`.
- Les libellés et messages du formulaire (labels, hints, placeholders, erreurs) proviennent de la sous-arborescence `contact.*` de `lang/customer/<customer>/<lang>.json`.

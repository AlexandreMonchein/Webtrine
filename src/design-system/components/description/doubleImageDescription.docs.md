# DoubleImageDescription Component

Component displaying two columns with overlapping text blocks on images. The left column has text at the top of the image, while the right column has text at the bottom. The right column is vertically offset upward for a staggered visual effect.

## Features

- ✅ Two-column layout with images and text blocks
- ✅ Text blocks positioned absolutely over images (top-left, bottom-right)
- ✅ Right column offset upward for visual hierarchy
- ✅ Hover effects on text blocks
- ✅ Fully responsive (stacks on mobile)
- ✅ Dynamic asset loading per customer
- ✅ Link integration with React Router
- ✅ CSS Modules styling

## Props

```typescript
interface DoubleImageDescriptionProps {
  leftText: {
    title: string;           // Main title (h2)
    description: string;     // Description paragraph
    link: string;            // React Router link path
  };
  leftImage: {
    image: string;           // Image filename (without .webp extension)
    imageAlt?: string;       // Alt text for accessibility
  };
  rightImage: {
    image: string;           // Image filename (without .webp extension)
    imageAlt?: string;       // Alt text for accessibility
  };
  rightText: {
    title: string;           // Main title (h2)
    description: string;     // Description paragraph
    link: string;            // React Router link path
  };
  "data-testid"?: string;
}
```

## Usage in config.json

```json
{
  "type": "doubleImageDescription",
  "id": "bookingAndArtists",
  "datas": {
    "leftText": {
      "title": "PRENDRE RENDEZ-VOUS",
      "description": "Prenez rendez-vous avec votre artiste et laissez vous guider tout au long de votre séance",
      "link": "/book"
    },
    "leftImage": {
      "image": "appointment-card",
      "imageAlt": "Business card"
    },
    "rightImage": {
      "image": "studio",
      "imageAlt": "Studio photo"
    },
    "rightText": {
      "title": "LES ARTISTES",
      "description": "Regardez nos différents artistes, tous passionnés et prêts à vous offrir la meilleure expérience",
      "link": "/artists"
    }
  }
}
```

## Asset Requirements

Images must be placed in `/public/assets/{CUSTOMER}/` with `.webp` extension:

- `appointment-card.webp`
- `studio.webp`

Recommended image dimensions:
- **Width**: 600-800px
- **Height**: 800-1000px
- **Format**: WebP for optimal performance
- **Aspect ratio**: Portrait or square works best

## Visual Layout

```
┌─────────────────────────────────────────┐
│  LEFT COLUMN        RIGHT COLUMN        │
│  ┌────────────┐    ┌────────────┐      │
│  │ TEXT TOP   │    │            │      │
│  │────────────│    │   IMAGE    │ ⬆    │
│  │            │    │            │ Offset│
│  │            │    │────────────│      │
│  │   IMAGE    │    │ TEXT BOT   │      │
│  │            │    └────────────┘      │
│  └────────────┘                        │
└─────────────────────────────────────────┘
```

## CSS Variables Used

This component uses the following CSS variables from `style.config.json`:

- `--dark-blue`: Text and divider color
- `--subtitle-font-size`: Title font size
- `--text-font-size`: Description font size

## Responsive Behavior

- **Desktop (>768px)**: Two columns side-by-side, right column offset upward
- **Tablet (768-1024px)**: Reduced offset, smaller padding
- **Mobile (<768px)**: Stacks vertically, text blocks positioned statically below images

## Accessibility

- ✅ Semantic HTML (h2, p, hr elements)
- ✅ Alt text for images
- ✅ ARIA-friendly link navigation
- ✅ Keyboard accessible
- ✅ Proper heading hierarchy

## Example Integration

Add to customer's `config.json`:

```json
{
  "client": { ... },
  "layout": {
    "templates": [
      {
        "type": "navbars",
        "id": "classicNavbar",
        "datas": { ... }
      },
      {
        "type": "doubleImageDescription",
        "id": "bookingSection",
        "datas": {
          "leftText": {
            "title": "RÉSERVEZ MAINTENANT",
            "description": "Prenez rendez-vous en ligne et choisissez votre créneau idéal",
            "link": "/booking"
          },
          "leftImage": {
            "image": "booking-calendar",
            "imageAlt": "Calendrier de réservation"
          },
          "rightImage": {
            "image": "team-workspace",
            "imageAlt": "Notre espace de travail"
          },
          "rightText": {
            "title": "NOTRE ÉQUIPE",
            "description": "Découvrez les professionnels passionnés qui vous accompagneront",
            "link": "/team"
          }
        }
      }
    ]
  }
}
```

## Testing

Component includes Storybook stories in `doubleImageDescription.stories.tsx`:

- **Default**: Standard layout with appointment and artist sections
- **CustomContent**: Alternative content example

Run Storybook to preview:
```bash
pnpm storybook
```

## Notes

- Images are automatically loaded from `/public/assets/{CUSTOMER}/` based on Redux state
- Text blocks have subtle hover scale effect for interactivity
- The `.webp` extension is automatically appended to image names
- Link navigation uses React Router's `<Link>` component
- Fully compatible with the multi-tenant architecture

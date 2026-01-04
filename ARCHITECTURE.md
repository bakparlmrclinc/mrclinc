# MrClinc Architecture Guide

## Project Structure

```
mrclinc/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── apply/                    # Patient application flow
│   ├── contact/                  # Contact page
│   ├── faq/                      # FAQ page
│   ├── how-it-works/             # Process explanation
│   ├── pd/                       # Pathway Developer section
│   │   ├── page.tsx              # PD landing page
│   │   ├── login/                # PD login
│   │   └── portal/               # PD dashboard
│   │       ├── page.tsx          # Portal dashboard
│   │       ├── case/[code]/      # Individual case view
│   │       ├── earnings/         # Earnings dashboard
│   │       ├── education/        # Training modules
│   │       └── profile/          # PD profile
│   ├── privacy/                  # Privacy policy
│   ├── services/                 # Services listing
│   ├── terms/                    # Terms & conditions
│   ├── track/                    # Patient tracking
│   └── why-antalya/              # Destination marketing
│
├── components/
│   ├── ui/                       # Primitive UI components
│   │   ├── Accordion.tsx
│   │   ├── Alert.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Radio.tsx
│   │   ├── Select.tsx
│   │   ├── Spinner.tsx
│   │   ├── Textarea.tsx
│   │   └── index.ts              # Barrel exports
│   │
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   │
│   ├── pd/                       # PD-specific components
│   │   ├── PDPortalLayout.tsx
│   │   └── index.ts
│   │
│   ├── shared/                   # Shared/reusable components
│   │   └── index.ts              # (Extract common patterns here)
│   │
│   ├── home/                     # Homepage components (TODO)
│   ├── services/                 # Services page components (TODO)
│   ├── apply/                    # Apply form components (TODO)
│   └── track/                    # Tracking components (TODO)
│
├── lib/
│   ├── types/                    # TypeScript type definitions
│   │   ├── patient.ts            # Patient types
│   │   ├── service.ts            # Service & request types
│   │   ├── pd.ts                 # Pathway Developer types
│   │   ├── case.ts               # Case management types
│   │   ├── clinic.ts             # Clinic types
│   │   ├── second-opinion.ts     # FSO types
│   │   ├── education.ts          # Training/education types
│   │   └── index.ts              # Barrel exports
│   │
│   ├── content/                  # Static content & copy
│   │   ├── site.ts               # Site config, nav, footer
│   │   ├── services.ts           # Service categories & procedures
│   │   ├── pd.ts                 # PD earnings, modules
│   │   ├── disclaimers.ts        # Legal disclaimers, form text
│   │   ├── stats.ts              # Verified statistics only
│   │   └── index.ts              # Barrel exports
│   │
│   ├── constants/                # App-wide constants
│   │   └── index.ts              # Patterns, colors, validation
│   │
│   └── utils/                    # Utility functions
│       └── index.ts
│
└── public/                       # Static assets
```

## Architecture Principles

### 1. Content Separation
All static content lives in `lib/content/`. Pages import content, they don't define it.

### 2. Type Safety
Domain types split by entity in `lib/types/`. Use barrel exports for clean imports.

### 3. Component Extraction
**When a page file exceeds 200 lines**, extract components to the matching `components/` folder.

Example: If `app/apply/page.tsx` grows large, extract form sections to `components/apply/`.

### 4. Barrel Exports
Every component folder has an `index.ts` for clean imports:
```ts
// ✅ Good
import { Button, Card } from "@/components/ui";

// ❌ Avoid
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
```

## Known Technical Debt

### High Priority (Extract Content)
- `app/pd/portal/education/training-lab/[category]/page.tsx` (1159 lines)
  - Extract scenario data to `lib/content/training-scenarios.ts`
  
- `app/pd/portal/education/[moduleId]/page.tsx` (1140 lines)
  - Extract module content to `lib/content/education-modules/`

### Medium Priority (Extract Components)
- `app/apply/page.tsx` (719 lines)
  - Extract: FormSteps, ServiceSelector, SubmitConfirmation
  
- `app/pd/portal/profile/page.tsx` (518 lines)
  - Extract: ProfileForm, SettingsPanel

### Low Priority (Cleanup)
- `public/` contains default Next.js assets - replace with MrClinc branding
- `components/home/` empty - populate when homepage is componentized

## Import Aliases

Configured in `tsconfig.json`:
- `@/components/*` → `components/*`
- `@/lib/*` → `lib/*`
- `@/app/*` → `app/*`

## Adding New Features

1. **New page**: Create folder in `app/`, add `page.tsx`
2. **New type**: Add to appropriate file in `lib/types/`, export in `index.ts`
3. **New content**: Add to appropriate file in `lib/content/`, export in `index.ts`
4. **New component**: 
   - Primitive UI → `components/ui/`
   - Page-specific → `components/[page-name]/`
   - Cross-cutting → `components/shared/`

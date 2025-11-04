# Struktur Frontend - Best Practices untuk Next.js App Router

## 📁 Struktur Direktori yang Disarankan

```
madu/
├── app/                          # Next.js App Router (Routing)
│   ├── (routes)/                 # Route groups (opsional)
│   │   ├── tentang-kami/
│   │   │   └── page.tsx
│   │   ├── produk/
│   │   │   └── page.tsx
│   │   └── artikel-dokumentasi/
│   │       └── page.tsx
│   ├── api/                      # API Routes (jika ada)
│   │   └── [...route].ts
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                   # Home page (/)
│   ├── loading.tsx                # Loading UI (opsional)
│   ├── error.tsx                  # Error UI (opsional)
│   └── globals.css                # Global styles
│
├── components/                    # Komponen Reusable
│   ├── ui/                        # Komponen UI dasar (Button, Input, Card, dll)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── layout/                    # Komponen layout (Header, Footer, Sidebar)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/                  # Komponen section (Homepage sections)
│   │   ├── MvpSection.tsx
│   │   ├── BestsellerSection.tsx
│   │   ├── OurProductSection.tsx
│   │   ├── FunfactSection.tsx
│   │   ├── ArtDocSection.tsx
│   │   └── WhyUsSection.tsx
│   └── features/                  # Komponen fitur spesifik
│       └── ProductCard.tsx
│
├── lib/                           # Utilities & Helpers
│   ├── utils.ts                   # Fungsi utility umum
│   ├── constants.ts               # Konstanta aplikasi
│   └── validations.ts             # Validasi form (jika ada)
│
├── hooks/                         # Custom React Hooks
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── types/                         # TypeScript Type Definitions
│   ├── index.ts                   # Export semua types
│   ├── product.ts
│   └── user.ts
│
├── styles/                        # Styles tambahan (jika ada)
│   └── components.css
│
├── public/                        # Static Assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── config/                        # Konfigurasi
    └── site.ts                    # Site configuration
```

## 🎯 Kategori Komponen

### 1. **UI Components** (`components/ui/`)
- Komponen dasar yang bisa digunakan di mana saja
- Contoh: Button, Input, Modal, Card, Badge
- Biasanya stateless dan reusable

### 2. **Layout Components** (`components/layout/`)
- Komponen untuk struktur halaman
- Contoh: Header, Footer, Sidebar, Container
- Biasanya digunakan di layout.tsx

### 3. **Section Components** (`components/sections/`)
- Komponen untuk section spesifik di halaman
- Contoh: HeroSection, AboutSection, ProductSection
- Bisa memiliki state dan logic sendiri

### 4. **Feature Components** (`components/features/`)
- Komponen untuk fitur spesifik
- Contoh: ProductCard, CartItem, UserProfile
- Bisa memiliki logic bisnis

## 📝 Prinsip Organisasi

### ✅ DO (Lakukan):
1. **Group by feature, bukan by type**
   - `components/products/ProductCard.tsx` (lebih baik)
   - vs `components/cards/ProductCard.tsx` (kurang baik)

2. **Colocation** - Letakkan file terkait dekat
   - `ProductCard.tsx` dan `ProductCard.test.tsx` di folder yang sama

3. **Barrel Exports** - Gunakan index.ts untuk export
   ```ts
   // components/sections/index.ts
   export { default as MvpSection } from './MvpSection';
   export { default as BestsellerSection } from './BestsellerSection';
   ```

4. **Clear naming** - Nama file harus jelas
   - ✅ `ProductCard.tsx`
   - ❌ `Card.tsx` atau `PC.tsx`

### ❌ DON'T (Jangan):
1. Jangan buat folder terlalu dalam (> 3 level)
2. Jangan duplikasi komponen
3. Jangan campur logic dengan UI di komponen yang sama

## 🔄 Import Pattern

### Menggunakan Barrel Exports:
```typescript
// ❌ Buruk
import MvpSection from '@/components/sections/MvpSection';
import BestsellerSection from '@/components/sections/BestsellerSection';

// ✅ Baik
import { MvpSection, BestsellerSection } from '@/components/sections';
```

### Menggunakan Path Alias:
```typescript
// ✅ Baik - menggunakan @ alias
import { Button } from '@/components/ui';
import { useLocalStorage } from '@/hooks';
import { Product } from '@/types';
```

## 📦 Struktur File Komponen

### Template Standar:
```typescript
// components/sections/MvpSection.tsx
import { FC } from 'react';
import type { MvpSectionProps } from './types';

const MvpSection: FC<MvpSectionProps> = ({ data }) => {
  return (
    <section>
      {/* Component content */}
    </section>
  );
};

export default MvpSection;
```

## 🎨 Styling Organization

### Option 1: Tailwind CSS (Recommended untuk Next.js)
- Gunakan className langsung di komponen
- Global styles di `app/globals.css`

### Option 2: CSS Modules
```
components/
  └── Button/
      ├── Button.tsx
      └── Button.module.css
```

### Option 3: Styled Components
- Untuk styling yang lebih kompleks

## 🚀 Tips Praktis

1. **Mulai sederhana** - Jangan over-engineering struktur awal
2. **Refactor saat perlu** - Reorganisasi saat proyek berkembang
3. **Konsisten** - Ikuti pattern yang sama di seluruh proyek
4. **Dokumentasi** - Buat README di folder besar


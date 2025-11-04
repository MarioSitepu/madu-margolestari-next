# Components Directory

Struktur folder untuk komponen React yang reusable.

## 📁 Struktur

```
components/
├── ui/              # Komponen UI dasar (Button, Input, Card, dll)
├── layout/          # Komponen layout (Header, Footer, Navigation)
├── sections/        # Komponen section untuk halaman
└── features/        # Komponen fitur spesifik
```

## 🎯 Penggunaan

### Sections
Komponen section untuk homepage dan halaman lainnya.

```typescript
import { MvpSection, BestsellerSection } from '@/components/sections';
```

### UI Components
Komponen dasar yang bisa digunakan di mana saja.

```typescript
import { Button } from '@/components/ui';
```

### Layout Components
Komponen untuk struktur halaman.

```typescript
import { Header, Footer } from '@/components/layout';
```


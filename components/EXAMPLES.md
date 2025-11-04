# Contoh Penggunaan Komponen Responsif

## 🎯 Contoh Komponen yang Sudah Responsif

### 1. MvpSection
Sudah menggunakan:
- Container dengan padding responsif
- Typography responsif (text-2xl → text-5xl)
- Spacing responsif (space-y-4 → space-y-8)

### 2. BestsellerSection
Sudah menggunakan:
- Grid responsif (1 kolom → 4 kolom)
- Gap responsif
- Background color dengan dark mode support

### 3. Button Component
Komponen UI dasar yang responsif dengan:
- Size variants (sm, md, lg)
- Variant styles (primary, secondary, outline)
- Responsif text size

## 📝 Cara Menggunakan

### Menggunakan Button Component

```typescript
import { Button } from '@/components/ui';

// Button dengan size responsif
<Button size="sm" variant="primary">
  Kecil
</Button>

<Button size="md" variant="primary">
  Sedang (default)
</Button>

<Button size="lg" variant="primary">
  Besar
</Button>

// Button dengan variant berbeda
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
```

### Membuat Komponen Section Baru yang Responsif

```typescript
// components/sections/NewSection.tsx
const NewSection = () => {
  return (
    <section className="
      container mx-auto
      px-4 sm:px-6 lg:px-8
      py-12 sm:py-16 lg:py-20
    ">
      <div className="
        grid
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-4 sm:gap-6 lg:gap-8
      ">
        {/* Content */}
      </div>
    </section>
  );
};

export default NewSection;
```

## 🎨 Pattern yang Bisa Digunakan

### Pattern 1: Container dengan Padding
```typescript
className="container mx-auto px-4 sm:px-6 lg:px-8"
```

### Pattern 2: Typography Responsif
```typescript
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
```

### Pattern 3: Grid Responsif
```typescript
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
```

### Pattern 4: Flexbox Responsif
```typescript
className="flex flex-col sm:flex-row gap-4 sm:gap-6"
```

## ✅ Checklist untuk Komponen Baru

Saat membuat komponen baru, pastikan:
- [ ] Menggunakan container dengan padding responsif
- [ ] Typography menggunakan ukuran responsif
- [ ] Spacing (gap, padding, margin) responsif
- [ ] Layout (grid/flex) responsif
- [ ] Dark mode support (jika diperlukan)
- [ ] Test di berbagai breakpoint


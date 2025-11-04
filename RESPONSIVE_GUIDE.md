# Panduan Responsif Design

## ✅ Struktur Sudah Mendukung Responsif

Struktur folder yang sudah dibuat **100% mendukung responsif design**. Responsivitas ditangani di level komponen menggunakan **Tailwind CSS**.

## 🎨 Menggunakan Tailwind CSS untuk Responsif

Proyek ini sudah menggunakan **Tailwind CSS v4**, yang memiliki utility classes untuk membuat komponen responsif dengan mudah.

### Breakpoints Tailwind CSS

```typescript
// Breakpoints default Tailwind:
sm:  '640px'   // Mobile landscape & small tablets
md:  '768px'   // Tablets
lg:  '1024px'  // Desktop
xl:  '1280px'  // Large desktop
2xl: '1536px'  // Extra large desktop
```

### Pattern Responsif

```typescript
// Mobile-first approach
className="
  base-style        // Mobile (default)
  sm:small-screen   // ≥ 640px
  md:medium-screen  // ≥ 768px
  lg:large-screen   // ≥ 1024px
  xl:xlarge-screen  // ≥ 1280px
"
```

## 📱 Contoh Komponen Responsif

### Contoh 1: Grid Layout Responsif

```typescript
// components/sections/MvpSection.tsx
const MvpSection = () => {
  return (
    <section className="
      container mx-auto px-4 py-8
      grid grid-cols-1          // Mobile: 1 kolom
      sm:grid-cols-2            // Tablet: 2 kolom
      md:grid-cols-3            // Desktop: 3 kolom
      lg:grid-cols-4            // Large: 4 kolom
      gap-4 sm:gap-6 lg:gap-8
    ">
      {/* Content */}
    </section>
  );
};
```

### Contoh 2: Typography Responsif

```typescript
const HeroSection = () => {
  return (
    <div className="
      text-center
      px-4 sm:px-6 lg:px-8
      py-12 sm:py-16 lg:py-24
    ">
      <h1 className="
        text-3xl              // Mobile: 30px
        sm:text-4xl           // Tablet: 36px
        md:text-5xl           // Desktop: 48px
        lg:text-6xl           // Large: 60px
        font-bold
        mb-4 sm:mb-6 lg:mb-8
      ">
        Judul Hero
      </h1>
      <p className="
        text-base             // Mobile: 16px
        sm:text-lg            // Tablet: 18px
        lg:text-xl            // Desktop: 20px
        max-w-2xl mx-auto
      ">
        Deskripsi hero section
      </p>
    </div>
  );
};
```

### Contoh 3: Flexbox Responsif

```typescript
const ProductCard = () => {
  return (
    <div className="
      flex
      flex-col              // Mobile: vertical
      sm:flex-row           // Tablet+: horizontal
      gap-4 sm:gap-6
      p-4 sm:p-6 lg:p-8
      rounded-lg
      shadow-sm sm:shadow-md lg:shadow-lg
    ">
      <img className="
        w-full              // Mobile: full width
        sm:w-1/3            // Tablet+: 1/3 width
        object-cover
        rounded-md
      " />
      <div className="
        flex-1
        space-y-2 sm:space-y-4
      ">
        {/* Content */}
      </div>
    </div>
  );
};
```

### Contoh 4: Navigation Responsif

```typescript
const Navigation = () => {
  return (
    <nav className="
      flex
      flex-col              // Mobile: vertical menu
      sm:flex-row           // Tablet+: horizontal menu
      items-start sm:items-center
      gap-4 sm:gap-6 lg:gap-8
      p-4 sm:p-6
      bg-white dark:bg-gray-900
    ">
      <a href="#" className="text-sm sm:text-base lg:text-lg">Home</a>
      <a href="#" className="text-sm sm:text-base lg:text-lg">Produk</a>
      <a href="#" className="text-sm sm:text-base lg:text-lg">Tentang Kami</a>
    </nav>
  );
};
```

## 🎯 Best Practices untuk Responsif

### 1. **Mobile-First Approach**
Selalu mulai dari mobile, lalu tambahkan breakpoint untuk layar lebih besar.

```typescript
// ✅ Baik - Mobile first
className="text-sm md:text-base lg:text-lg"

// ❌ Kurang baik - Desktop first
className="text-lg md:text-base sm:text-sm"
```

### 2. **Gunakan Container & Padding**
Gunakan container dengan padding responsif untuk spacing yang konsisten.

```typescript
className="
  container mx-auto
  px-4 sm:px-6 lg:px-8    // Padding horizontal responsif
  py-8 sm:py-12 lg:py-16  // Padding vertical responsif
"
```

### 3. **Spacing Responsif**
Gunakan spacing yang berbeda untuk setiap breakpoint.

```typescript
className="
  gap-4    // Mobile: 16px
  sm:gap-6 // Tablet: 24px
  lg:gap-8 // Desktop: 32px
"
```

### 4. **Hide/Show Elements**
Sembunyikan atau tampilkan elemen berdasarkan breakpoint.

```typescript
className="
  hidden           // Mobile: hidden
  md:block         // Desktop: visible
"
```

### 5. **Image Responsif**
Gunakan Next.js Image component dengan sizing responsif.

```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  className="
    w-full h-auto
    object-cover
    rounded-lg
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

## 📐 Grid System Responsif

### Grid dengan Gap Responsif

```typescript
className="
  grid
  grid-cols-1        // Mobile: 1 kolom
  sm:grid-cols-2     // Tablet: 2 kolom
  md:grid-cols-3     // Desktop: 3 kolom
  lg:grid-cols-4     // Large: 4 kolom
  gap-4 sm:gap-6 lg:gap-8
"
```

### Auto-fit Grid

```typescript
className="
  grid
  grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
  gap-4 sm:gap-6
"
```

## 🎨 Custom Breakpoints (Opsional)

Jika perlu breakpoint custom, bisa ditambahkan di `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
}
```

## ✅ Checklist Responsif

- [ ] Semua komponen menggunakan mobile-first approach
- [ ] Typography menggunakan ukuran responsif
- [ ] Spacing (padding, margin, gap) responsif
- [ ] Grid layout responsif
- [ ] Images menggunakan Next.js Image dengan sizing
- [ ] Navigation responsif (mobile menu)
- [ ] Test di berbagai device size
- [ ] Test di browser dev tools (responsive mode)

## 🧪 Testing Responsif

### 1. Browser Dev Tools
- Chrome/Firefox: F12 → Toggle device toolbar
- Test di berbagai breakpoints: mobile, tablet, desktop

### 2. Real Devices
- Test di smartphone (iOS & Android)
- Test di tablet
- Test di desktop dengan berbagai resolusi

### 3. Tools Online
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [BrowserStack](https://www.browserstack.com/)

## 💡 Tips

1. **Jangan terlalu banyak breakpoint** - Gunakan hanya yang diperlukan
2. **Konsisten** - Gunakan spacing/padding yang sama di seluruh aplikasi
3. **Test secara berkala** - Jangan tunggu sampai akhir untuk test responsif
4. **Gunakan Tailwind IntelliSense** - Untuk autocomplete yang lebih baik


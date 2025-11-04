# Perbedaan Layout dan Section

## 🏗️ LAYOUT (Struktur Halaman)

**Layout** adalah komponen yang membentuk **struktur dasar halaman** yang biasanya **sama di semua halaman** atau sebagian besar halaman.

### Karakteristik Layout:
- ✅ **Tampil di banyak halaman** (Header, Footer, Sidebar)
- ✅ **Struktur tetap** (tidak berubah isinya)
- ✅ **Mengelilingi konten** (seperti bingkai)
- ✅ **Biasanya di `app/layout.tsx`** atau `components/layout/`

### Contoh Layout Components:

#### 1. **Header/Navigation**
```typescript
// components/layout/Header.tsx
const Header = () => {
  return (
    <header className="sticky top-0 bg-white shadow">
      <nav>
        <a href="/">Home</a>
        <a href="/produk">Produk</a>
        <a href="/tentang-kami">Tentang Kami</a>
      </nav>
    </header>
  );
};
```
**Tampil di:** Semua halaman (Home, Produk, Tentang Kami, dll)

#### 2. **Footer**
```typescript
// components/layout/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <p>© 2024 Madu MarLes. All rights reserved.</p>
      <div>Link Sosial Media</div>
    </footer>
  );
};
```
**Tampil di:** Semua halaman

#### 3. **Sidebar** (jika ada)
```typescript
// components/layout/Sidebar.tsx
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100">
      <nav>Menu samping</nav>
    </aside>
  );
};
```

### Cara Menggunakan Layout:

```typescript
// app/layout.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />      {/* Tampil di semua halaman */}
        <main>
          {children}    {/* Konten halaman yang berbeda */}
        </main>
        <Footer />      {/* Tampil di semua halaman */}
      </body>
    </html>
  );
}
```

### Visual Layout:

```
┌─────────────────────────────────┐
│         HEADER                  │ ← Layout (tampil di semua halaman)
├─────────────────────────────────┤
│                                 │
│         {children}              │ ← Konten halaman (berbeda per halaman)
│         (isi halaman)           │
│                                 │
├─────────────────────────────────┤
│         FOOTER                  │ ← Layout (tampil di semua halaman)
└─────────────────────────────────┘
```

---

## 📄 SECTION (Bagian Konten Halaman)

**Section** adalah komponen yang mewakili **bagian konten spesifik** di dalam halaman. Biasanya **hanya tampil di halaman tertentu** atau **berbeda per halaman**.

### Karakteristik Section:
- ✅ **Spesifik untuk halaman tertentu** (biasanya homepage)
- ✅ **Isi konten yang berbeda** (MVP, Bestseller, dll)
- ✅ **Bagian dari konten halaman** (bukan struktur)
- ✅ **Biasanya di `components/sections/`**

### Contoh Section Components:

#### 1. **MvpSection** (Hero/MVP Section)
```typescript
// components/sections/MvpSection.tsx
const MvpSection = () => {
  return (
    <section className="hero-section">
      <h1>Selamat Datang di Madu MarLes</h1>
      <p>Madu berkualitas tinggi dari alam</p>
      <button>Beli Sekarang</button>
    </section>
  );
};
```
**Tampil di:** Hanya di Homepage

#### 2. **BestsellerSection**
```typescript
// components/sections/BestsellerSection.tsx
const BestsellerSection = () => {
  return (
    <section className="bestseller-section">
      <h2>Produk Terlaris</h2>
      <div className="products-grid">
        {/* Daftar produk terlaris */}
      </div>
    </section>
  );
};
```
**Tampil di:** Hanya di Homepage

#### 3. **WhyUsSection**
```typescript
// components/sections/WhyUsSection.tsx
const WhyUsSection = () => {
  return (
    <section className="why-us-section">
      <h2>Mengapa Pilih Kami?</h2>
      <ul>
        <li>Madu 100% Asli</li>
        <li>Harga Terjangkau</li>
        <li>Pengiriman Cepat</li>
      </ul>
    </section>
  );
};
```
**Tampil di:** Hanya di Homepage

### Cara Menggunakan Section:

```typescript
// app/page.tsx (Homepage)
import {
  MvpSection,
  BestsellerSection,
  OurProductSection,
  FunfactSection,
  ArtDocSection,
  WhyUsSection,
} from '@/components/sections';

export default function Home() {
  return (
    <main>
      <MvpSection />           {/* Section 1 */}
      <BestsellerSection />    {/* Section 2 */}
      <OurProductSection />    {/* Section 3 */}
      <FunfactSection />       {/* Section 4 */}
      <ArtDocSection />        {/* Section 5 */}
      <WhyUsSection />         {/* Section 6 */}
    </main>
  );
}
```

### Visual Section dalam Halaman:

```
┌─────────────────────────────────┐
│         HEADER (Layout)          │
├─────────────────────────────────┤
│                                 │
│    ┌─────────────────────┐      │
│    │   MvpSection        │      │ ← Section 1
│    └─────────────────────┘      │
│                                 │
│    ┌─────────────────────┐      │
│    │ BestsellerSection   │      │ ← Section 2
│    └─────────────────────┘      │
│                                 │
│    ┌─────────────────────┐      │
│    │ OurProductSection   │      │ ← Section 3
│    └─────────────────────┘      │
│                                 │
│    ┌─────────────────────┐      │
│    │  WhyUsSection       │      │ ← Section 4
│    └─────────────────────┘      │
│                                 │
├─────────────────────────────────┤
│         FOOTER (Layout)          │
└─────────────────────────────────┘
```

---

## 📊 Perbandingan

| Aspek | **LAYOUT** | **SECTION** |
|-------|-----------|-------------|
| **Lokasi** | `components/layout/` | `components/sections/` |
| **Penggunaan** | Di `app/layout.tsx` | Di `app/page.tsx` (halaman spesifik) |
| **Frekuensi** | Tampil di banyak halaman | Tampil di halaman tertentu |
| **Fungsi** | Struktur halaman (bingkai) | Konten halaman (isi) |
| **Contoh** | Header, Footer, Sidebar | MvpSection, BestsellerSection |
| **Perubahan** | Jarang berubah | Bisa berbeda per halaman |

---

## 🎯 Contoh Lengkap

### Struktur Halaman Lengkap:

```typescript
// app/layout.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />              {/* ← LAYOUT: Tampil di semua halaman */}
        <main>
          {children}            {/* ← Konten halaman (berbeda) */}
        </main>
        <Footer />              {/* ← LAYOUT: Tampil di semua halaman */}
      </body>
    </html>
  );
}
```

```typescript
// app/page.tsx (Homepage)
import {
  MvpSection,
  BestsellerSection,
  OurProductSection,
  WhyUsSection,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <MvpSection />           {/* ← SECTION: Hanya di homepage */}
      <BestsellerSection />    {/* ← SECTION: Hanya di homepage */}
      <OurProductSection />    {/* ← SECTION: Hanya di homepage */}
      <WhyUsSection />         {/* ← SECTION: Hanya di homepage */}
    </>
  );
}
```

```typescript
// app/produk/page.tsx (Halaman Produk)
export default function Produk() {
  return (
    <>
      <h1>Daftar Produk</h1>
      {/* Konten produk - BUKAN section, karena spesifik untuk halaman ini */}
    </>
  );
}
```

---

## 💡 Kesimpulan

### **LAYOUT** = Bingkai/Framework
- Struktur yang membungkus konten
- Sama di semua halaman
- Contoh: Header, Footer, Sidebar

### **SECTION** = Isi/Konten
- Bagian konten spesifik
- Biasanya untuk homepage
- Contoh: MvpSection, BestsellerSection

### Analogi Sederhana:
- **Layout** = Bingkai foto (tetap sama)
- **Section** = Foto di dalam bingkai (berbeda-beda)

---

## ✅ Checklist: Kapan Menggunakan Layout vs Section?

### Gunakan **Layout** jika:
- [ ] Komponen tampil di semua atau sebagian besar halaman
- [ ] Merupakan struktur/navigasi halaman
- [ ] Contoh: Header, Footer, Sidebar, Navigation

### Gunakan **Section** jika:
- [ ] Komponen spesifik untuk halaman tertentu (biasanya homepage)
- [ ] Merupakan bagian konten yang bisa di-reuse
- [ ] Contoh: HeroSection, ProductSection, AboutSection


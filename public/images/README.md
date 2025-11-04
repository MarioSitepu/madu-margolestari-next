# Images Directory

Tempat menyimpan gambar untuk aplikasi.

## Struktur

```
public/images/
├── hero-madu.jpg          # Gambar hero untuk MvpSection
└── ...                    # Gambar lainnya
```

## Catatan

- Semua gambar harus dioptimalkan untuk web
- Gunakan format WebP atau JPG untuk foto
- Gunakan SVG untuk icon/logo
- Untuk gambar hero, ukuran recommended: 1440x829px atau lebih besar dengan aspect ratio yang sama

## Penggunaan

Gambar di folder `public/` bisa diakses langsung dari root path:

```typescript
// Contoh penggunaan
<img src="/images/hero-madu.jpg" alt="Madu" />
// atau dengan Next.js Image
<Image src="/images/hero-madu.jpg" alt="Madu" width={1440} height={829} />
```


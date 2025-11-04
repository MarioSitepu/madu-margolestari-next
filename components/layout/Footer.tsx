// Contoh Layout Component: Footer
// Komponen ini tampil di semua halaman

const Footer = () => {
  return (
    <footer className="
      bg-gray-900 text-white
      mt-auto
    ">
      <div className="
        container mx-auto
        px-4 sm:px-6 lg:px-8
        py-8 sm:py-12
      ">
        <div className="
          grid
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-8
        ">
          <div>
            <h3 className="text-lg font-bold mb-4">Madu MarLes</h3>
            <p className="text-gray-400 text-sm">
              Madu berkualitas tinggi dari alam
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tautan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/produk" className="hover:text-white">Produk</a></li>
              <li><a href="/tentang-kami" className="hover:text-white">Tentang Kami</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@madumarles.com</li>
              <li>Telp: +62 123 456 789</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Sosial Media</h4>
            <div className="flex gap-4">
              {/* Icon sosial media */}
            </div>
          </div>
        </div>
        
        <div className="
          mt-8 pt-8
          border-t border-gray-800
          text-center text-sm text-gray-400
        ">
          <p>© 2024 Madu MarLes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


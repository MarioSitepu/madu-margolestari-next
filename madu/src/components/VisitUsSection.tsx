import { MapPin } from "lucide-react";
import headerImage from "@/assets/header-image-1a216d.png";

export const VisitUsSection = () => {
  return <section className="w-full bg-[#ffde7d] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col md:flex-row items-start mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Kunjungi
              </h2>
              <div className="flex flex-col">
                <h2 className="text-4xl md:text-5xl font-bold text-[#00b8a9] ml-2">
                  Kami
                </h2>
                <div className="h-1 bg-black w-full mt-2"></div>
              </div>
            </div>
            <p className="text-black text-lg">
              Ayo kunjungi kami di tempat ini untuk melihat proses pengerjaan
              serta melihat langsung produk kami, fresh diambil langsung dari
              sarangnya
            </p>
          </div>
          {/* Right side - Map */}
          <div className="w-full md:w-1/2">
            <div className="border-4 border-[#00b8a9] rounded-lg h-64 md:h-80 bg-[#ffde7d] relative overflow-hidden">
              <img 
                src={headerImage} 
                alt="Lokasi peternakan lebah Madu Margo Lestari di Jati Agung, Lampung Selatan - Tempat produksi madu murni berkualitas tinggi" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg">
                  <MapPin className="w-12 h-12 text-[#00b8a9]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
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
          {/* Right side - Map placeholder */}
          <div className="w-full md:w-1/2">
            <div className="border-4 border-[#00b8a9] rounded-lg h-64 md:h-80 bg-[#ffde7d]">
              {/* This is a placeholder for a map or additional content */}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
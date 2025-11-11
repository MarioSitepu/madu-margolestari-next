import { useState, type FormEvent } from 'react'
import honeyLogo from '@/assets/1.svg'
import honeycomb from '@/assets/2.png'
export function Footer() { 
  const [email, setEmail] = useState('')
  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle subscription logic here
    alert('Thank you for subscribing!')
    setEmail('')
  }
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Top section with subscription form */}
      <section className="relative bg-[#ffde7d] w-full">
        <div className="container mx-auto px-4 py-8 relative">
          {/* White container with subscription form */}
          <div className="bg-white rounded-2xl max-w-5xl mx-auto mt-24 mb-8 p-8 relative">
            {/* Honeycomb image */}
            <div className="absolute -top-32 left-8 md:left-16 w-64 md:w-80">
              <img
                src={honeycomb}
                alt="Honeycomb with honey"
                className="w-full h-auto"
              />
            </div>
            {/* Subscription content */}
            <div className="grid md:grid-cols-2 gap-8 pt-16 md:pt-0">
              <div className="md:col-span-1">
                {/* Empty column on mobile, image space on desktop */}
              </div>
              <div className="md:col-span-1 space-y-6">
                <h2 className="text-[#00b8a9] text-2xl font-bold">
                  Berlangganan ke web kami untuk mendapatkan pembaruan tentang{' '}
                  <span className="text-[#ffde7d] underline">
                    penawaran menarik
                  </span>{' '}
                  dari kami
                </h2>
                <p className="text-[#00b8a9] text-sm">
                  Dapatkan{' '}
                  <span className="text-[#ffde7d] underline">diskon 20%</span>{' '}
                  untuk pembelian pertama Anda hanya dengan berlangganan
                  newsletter kami.
                </p>
                <form onSubmit={handleSubscribe} className="relative">
                  <div className="bg-[#00b8a9] rounded-full p-1 flex items-center">
                    <div className="flex items-center flex-1 pl-4">
                      <img
                        src="https://uploadthingy.s3.us-west-1.amazonaws.com/1Zxs7CjJ4YZ6xotFV6yEXr/3607decd973daa13410de1b04b7029e9e99f9fd5.svg"
                        alt=""
                        className="w-4 h-4 mr-2"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        className="bg-transparent text-sm text-black/50 outline-none w-full"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#ffde7d] text-black font-medium text-sm py-2 px-4 rounded-full"
                    >
                      Berlangganan
                    </button>
                  </div>
                </form>
                <p className="text-[#00b8a9] text-xs">
                  Anda dapat berhenti berlangganan kapan saja.
                  <br />
                  Baca kebijakan privasi kami{' '}
                  <a href="#" className="text-[#ffde7d] underline">
                    di sini
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer section */}
      <section className="bg-[#00b8a9] text-white grow">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src={honeyLogo}
                  alt="Honeycomb logo"
                  className="w-16 h-16 mr-4"
                />
                <h3 className="text-[#ffde7d] text-2xl font-bold">
                  Madu Marles
                </h3>
              </div>
              <p className="text-sm">
                UMKM Lebah Madu Margolestari merupakan usaha mikro, kecil, dan
                menengah yang berfokus pada budidaya lebah madu dan produksi
                madu murni berkualitas tinggi.
              </p>
            </div>
            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-[#ffde7d] text-lg font-medium underline">
                Code
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Testimonal
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#ffde7d] text-lg font-medium underline">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tweet @Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Webians
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#ffde7d] text-lg font-medium underline">
                Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Become 5Teacher
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    All In One
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4 md:col-start-4 md:row-start-1">
              <h4 className="text-[#ffde7d] text-lg font-medium underline">
                Contact Us
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/qtzmAPNGY8KKXCxbsKaGgN/239e916ef62ae36e3c81fd165260edd7033b0d3d.svg"
                    alt=""
                    className="w-4 h-4 mr-2"
                  />
                  <span>081262143242412</span>
                </li>
                <li className="flex items-center">
                  <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/qsy7F41wDUnmVMRxW8eD61/dbdaf6bbb07247b278f897c9f4cb0dc4674a44a9.svg"
                    alt=""
                    className="w-4 h-4 mr-2"
                  />
                  <span>Support@dfwff.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-white/30 w-full"></div>
        {/* Copyright */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center text-sm">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src="https://uploadthingy.s3.us-west-1.amazonaws.com/1wBeAqm1RZJaTFgKYstpym/28269401c235d5b35d7e1ba2526ba68897b32d3a.svg"
                alt=""
                className="w-4 h-4 mr-2"
              />
              <span>Copyright By CodeUI.All right Reserved</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms Of Use
              </a>
              <a href="#" className="hover:underline">
                Legal
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
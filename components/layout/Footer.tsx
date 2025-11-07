import Image from 'next/image';
import PhoneIcon from '@/components/icons/PhoneIcon';
import EmailFilledIcon from '@/components/icons/EmailFilledIcon';
import CopyrightIcon from '@/components/icons/CopyrightIcon';

interface FooterSection {
  title: string;
  links: string[];
}

interface FooterContact {
  title: string;
  phone: string;
  email: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  logoImage?: string;
  sections?: FooterSection[];
  contact?: FooterContact;
  copyright?: string;
  legalLinks?: string[];
}

const Footer = ({
  brandName = "Madu Marles",
  brandDescription = "UMKM Lebah Madu Margolestari merupakan usaha mikro, kecil, dan menengah yang berfokus pada budidaya lebah madu dan produksi madu murni berkualitas tinggi.",
  logoImage = "/images/honeycomb-transparent.png",
  sections = [
    { title: "Code", links: ["About Us", "Services", "Community", "Testimonal"] },
    { title: "Support", links: ["Help Center", "Tweet @Us", "Webians", "Feedback"] },
    { title: "Links", links: ["Courses", "Become 5Teacher", "Services", "All In One"] }
  ],
  contact = {
    title: "Contact Us",
    phone: "081262143242412",
    email: "Support@dfwff.com"
  },
  copyright = "Copyright By CodeUI.All right Reserved",
  legalLinks = ["Privacy Policy", "Terms Of Use", "Legal"]
}: FooterProps) => {
  return (
    <footer className="bg-brand-teal text-brand-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-[78px] h-[78px]">
                <Image
                  src={logoImage}
                  alt={brandName}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="heading-sm text-brand-yellow mb-2">{brandName}</h3>
            <p className="text-caption text-brand-white">
              {brandDescription}
            </p>
          </div>
          
          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-footer-heading text-brand-yellow mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-footer-link text-brand-white hover:text-brand-yellow transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Section */}
          <div>
            <h4 className="text-footer-heading text-brand-yellow mb-4">
              {contact.title}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <PhoneIcon width={22} height={22} color="#FFFFFF" />
                <span className="text-footer-link text-brand-white">
                  {contact.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <EmailFilledIcon width={20} height={16} color="#FFFFFF" />
                <span className="text-footer-link text-brand-white">
                  {contact.email}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t-[3px] border-brand-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <CopyrightIcon width={16} height={16} color="#FFFFFF" />
            <span className="text-footer-link text-brand-white">
              {copyright}
            </span>
          </div>
          
          <div className="flex gap-16">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-footer-link text-brand-white hover:text-brand-yellow transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
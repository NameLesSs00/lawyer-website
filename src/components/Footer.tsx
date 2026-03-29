import { Scale, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground border-t border-primary-foreground/5">
      <div className="container-custom py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {/* Logo & About */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <Scale className="w-7 h-7 md:w-8 md:h-8 text-gold" />
              <span className="text-lg md:text-xl font-heading font-bold text-primary-foreground leading-tight">
                ميلاد يعقوب بولس
                <br />
                <span className="text-[10px] md:text-xs text-gold/80 block uppercase tracking-wider mt-1">
                  Milad Yacoub Boulos
                </span>
              </span>
            </div>
            <p className="leading-relaxed md:leading-loose text-xs md:text-sm text-primary-foreground/80 font-medium max-w-sm">
              المحامى بالنقض والدستورية العليا. باحث فى قانون الإجراءات الجنائية وقانون الاثبات فى المواد المدنية. متخصص فى الجنايات والمنازعات العقارية والجرائم الاقتصادية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-gold font-heading font-bold text-base md:text-lg border-r-4 border-gold pr-3 md:pr-4">روابط سريعة</h3>
            <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-3">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "أخبار القانون", href: "/news" },
                { label: "المكتبة", href: "/library" },
                { label: "الخدمات", href: "/services" },
                { label: "تواصل معنا", href: "/contact" },
              ].map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="group flex items-center gap-2 text-primary-foreground/70 transition-all duration-300 w-fit"
                >
                  <motion.div 
                    className="hidden md:block h-1 w-0 bg-gold rounded-full transition-all duration-300 group-hover:w-4" 
                    whileHover={{ width: 16 }}
                  />
                  <span className="group-hover:text-gold group-hover:translate-x-[-4px] transition-all duration-300 text-xs md:text-base">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-gold font-heading font-bold text-base md:text-lg border-r-4 border-gold pr-3 md:pr-4">تواصل معنا</h3>
            <div className="flex flex-col gap-3 md:gap-5">
              <Link 
                href="https://maps.app.goo.gl/UpX2ZhYrPyQvrmW97?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 md:gap-4 text-primary-foreground/70 group"
              >
                <div className="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-300">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gold shrink-0" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gold/50 font-bold uppercase tracking-wider">الموقع</span>
                  <span className="text-xs md:text-base group-hover:text-gold transition-colors">الغردقة، البحر الأحمر</span>
                </div>
              </Link>

              <Link 
                href="https://wa.me/201229149719"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 md:gap-4 text-primary-foreground/70 group"
              >
                <div className="p-1.5 md:p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-300">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-gold shrink-0" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gold/50 font-bold uppercase tracking-wider">اتصل بنا</span>
                  <span className="text-xs md:text-base group-hover:text-gold transition-colors font-medium" dir="ltr">
                    +20 12 29149719
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-16 pt-4 md:pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/40 text-[10px] md:text-sm font-medium">
            © {new Date().getFullYear()} MinaAbuSeifen — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

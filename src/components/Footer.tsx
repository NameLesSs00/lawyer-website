import { Scale, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Scale className="w-7 h-7 text-gold" />
              <span className="text-lg font-heading font-bold text-primary-foreground leading-tight">
                ميلاد يعقوب بولس
                <br />
                <span className="text-xs text-gold/80 block uppercase tracking-wider">
                  Milad Yacoub Boulos
                </span>
              </span>
            </div>
                المحامى بالنقض والدستورية العليا. باحث فى قانون الإجراءات الجنائية وقانون الاثبات فى المواد المدنية. متخصص فى الجنايات والمنازعات العقارية والجرائم الاقتصادية.
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gold font-heading font-bold text-lg">روابط سريعة</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">الرئيسية</Link>
              <Link href="/news" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">أخبار القانون</Link>
              <Link href="/library" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">المكتبة القانونية</Link>
              <Link href="/services" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">الخدمات</Link>
              <Link href="/contact" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">تواصل معنا</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-gold font-heading font-bold text-lg">تواصل معنا</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>الغردقة، البحر الأحمر</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span dir="ltr">+20 100 000 0000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>info@minaabuseifein.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} MinaAbuSeifen — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

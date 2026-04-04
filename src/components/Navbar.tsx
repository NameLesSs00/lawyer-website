import Link from "next/link";
import { useRouter } from "next/router";
import { Scale } from "lucide-react";

const navItems = [
  { label: "الرئيسية", path: "/" },
  { label: "أخبار القانون", path: "/news" },
  { label: "المكتبة القانونية", path: "/library" },
  { label: "أحدث أعمالنا", path: "/works" },
  { label: "الخدمات", path: "/services" },
  {
    label: "مصر الرقمية",
    path: "https://digital.gov.eg",
    external: true,
  },
  { label: "تواصل معنا", path: "/contact" },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-navy shadow-elegant">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between py-3 lg:py-0 lg:h-20 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Scale className="w-6 h-6 md:w-8 md:h-8 text-gold" />
            <span className="text-sm md:text-lg font-heading font-bold text-primary-foreground leading-tight">
              مكتب ميلاد يعقوب بولس
              <br />
              <span className="text-[9px] md:text-xs text-gold/80 block uppercase tracking-wider">
                Milad Yacoub Boulos
              </span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-1 lg:pb-0 font-medium w-full lg:w-auto mt-2 lg:mt-0">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm text-primary-foreground/80 hover:text-gold hover:bg-navy-light transition-colors duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm transition-colors duration-200 ${
                    router.pathname === item.path
                      ? "text-gold bg-navy-light"
                      : "text-primary-foreground/80 hover:text-gold hover:bg-navy-light"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

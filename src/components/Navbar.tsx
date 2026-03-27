import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale } from "lucide-react";

const navItems = [
  { label: "الرئيسية", path: "/" },
  { label: "أخبار القانون", path: "/news" },
  { label: "المكتبة القانونية", path: "/library" },
  { label: "الخدمات", path: "/services" },
  {
    label: "خدمات مصر الرقمية",
    path: "https://digital.gov.eg",
    external: true,
  },
  { label: "تواصل معنا", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-navy shadow-elegant">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-gold" />
            <span className="text-base md:text-lg font-heading font-bold text-primary-foreground leading-tight">
              مكتب ميلاد يعقوب بولس
              <br />
              <span className="text-[10px] md:text-xs text-gold/80 block -mt-1 uppercase tracking-wider">
                Milad Yacoub Boulos
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.external ? (
                <motion.a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground/80 hover:text-gold hover:bg-navy-light transition-colors duration-200"
                >
                  {item.label}
                </motion.a>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    router.pathname === item.path
                      ? "text-gold bg-navy-light"
                      : "text-primary-foreground/80 hover:text-gold hover:bg-navy-light"
                  }`}
                >
                  <motion.span 
                    className="inline-block"
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              )
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-primary-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy-dark overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-primary-foreground/80 hover:text-gold hover:bg-navy-light transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-colors ${
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

import { motion, Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative gradient-navy text-primary-foreground overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-gold" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-gold" />
      </div>

      <div className="container-custom py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-medium text-sm tracking-wide">مكتب محاماة واستشارات قانونية</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-tight">
              <span className="block mb-2">ميلاد يعقوب بولس</span>
              <span className="text-gold block">Milad Yacoub Boulos</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-primary-foreground/90 text-lg md:text-2xl font-medium leading-relaxed max-w-xl">
              المحامى بالنقض والدستورية العليا. 
              <br />
              <span className="text-sm md:text-base opacity-70 font-normal">
                باحث فى قانون الإجراءات الجنائية وقانون الاثبات فى المواد المدنية
              </span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-2 border-r-2 border-gold/30 pr-6">
              <p className="text-sm md:text-base text-primary-foreground/70 italic">
                ليسانس حقوق جامعة أسيوط - دفعة 2004/2005
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5 pt-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-gold text-accent-foreground px-8 py-4 rounded-xl font-heading font-bold text-sm hover:bg-gold-dark transition-all duration-300 shadow-lg shadow-gold/20"
              >
                احجز استشارة
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-xl font-heading font-medium text-sm hover:border-gold hover:text-gold transition-all duration-300"
              >
                خدماتنا
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border-4 border-gold/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full border-2 border-gold/10" />
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full p-4">
                <Image 
                  src="/images/profile.jpeg" 
                  alt="المحامي ميلاد يعقوب بولس / Milad Yacoub Boulos"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-full object-cover rounded-full shadow-2xl scale-110"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

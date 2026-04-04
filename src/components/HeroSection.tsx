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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative text-foreground overflow-hidden bg-background">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      />
      {/* Dark overlay to make text readable */}
      <div className="absolute inset-0 z-1 bg-background/90 mix-blend-multiply" />
      {/* Bottom gradient fade into next section */}
      <div className="absolute inset-0 z-2 bg-gradient-to-t from-background to-transparent" />

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

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-gold text-2xl md:text-4xl font-heading font-bold leading-relaxed max-w-xl drop-shadow-md">
                المحامى بالنقض والدستورية العليا.
              </p>
              <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-xl mt-2">
                نلتزم بتقديم أقوى الحلول الدستورية والقانونية لضمان حقوقك.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2 border-r-2 border-gold/50 pr-6">
              <p className="text-sm md:text-base text-white/80 italic">
                ليسانس حقوق جامعة أسيوط - دفعة 2004/2005
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5 pt-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-gold text-white px-8 py-4 rounded-xl font-heading font-bold text-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-gold/20"
              >
                احجز استشارة
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-xl font-heading font-medium text-sm hover:border-gold hover:text-gold transition-all duration-300"
              >
                خدماتنا
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex justify-center lg:justify-end w-full mt-10 lg:mt-0 relative"
          >
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-[400px]">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-gold/20 z-10"
              >
                <Image 
                  src="/images/hero.jpeg" 
                  alt="المحامي ميلاد يعقوب بولس / Milad Yacoub Boulos"
                  width={500}
                  height={600}
                  priority
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

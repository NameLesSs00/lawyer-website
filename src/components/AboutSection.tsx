import { motion } from "framer-motion";
import Image from "next/image";
import { Award, ShieldCheck, Scale } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden border-t border-border relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent z-0 blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gold/20">
              <Image 
                src="/images/about.jpeg" 
                alt="عن مكتب المحامي ميلاد يعقوب"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div>
            
            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 bg-card border border-gold/30 p-6 rounded-2xl shadow-xl flex items-center gap-4 hidden sm:flex"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-gold" />
              </div>
              <div>
                <span className="block text-3xl font-heading font-bold text-white">+20</span>
                <span className="text-gold font-medium text-sm">عاماً من الخبرة</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <span className="text-gold font-bold text-sm tracking-widest uppercase mb-3 block">عن المكتب</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                التزام كامل بقضاياك <br/> من أمهر محامي البحر الأحمر
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-bold text-gold/90 leading-relaxed border-r-4 border-gold pr-4">
                خبرة أكثر من ٢٠ سنة فى مجال المحاماة والترافع فى القضايا الجنائية والمدنية.
              </p>
              
              <p className="text-white/80 text-lg leading-relaxed">
                يُعد مكتبنا من أفضل مكاتب المحاماة في الغردقة والبحر الأحمر من حيث الكفاءة والأمانة. نحن نضع مصلحة الموكل في المقام الأول ونعمل بجدية لضمان استعادة الحقوق وفق أحدث المنظومات القانونية.
              </p>

              <div className="bg-card/50 p-6 rounded-xl border border-white/5 space-y-4">
                <div className="flex items-start gap-4">
                  <Scale className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <p className="text-white font-medium">باحث في قانون الإجراءات الجنائية وقانون الإثبات في المواد المدنية، لضمان أدق الاستشارات.</p>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <p className="text-white font-medium">ليسانس حقوق جامعة أسيوط - دراسة معمقة وتاريخ ممتد من الدفاع عن الحقوق والحريات.</p>
                </div>
              </div>
            </div>


          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

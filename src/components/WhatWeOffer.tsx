import { motion, Variants } from "framer-motion";
import { Gavel, FileText, Users, Shield, Building, Handshake } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const services = [
  { icon: Gavel, title: "الجنايات والجنح", desc: "قضايا الجنايات والجنح والقضايا السياسية والفكرية" },
  { icon: Shield, title: "الجرائم الاقتصادية", desc: "قضايا التموين والمخابز والجرائم الاقتصادية" },
  { icon: FileText, title: "جرائم الإنترنت", desc: "قضايا تقنية المعلومات والشبكات والابتزاز الإلكتروني" },
  { icon: Building, title: "الدعاوى العقارية", desc: "تسجيلات الشهر العقاري والمنازعات العقارية" },
  { icon: Handshake, title: "صياغة العقود", desc: "صياغة ومراجعة كافة أنواع العقود القانونية" },
  { icon: Users, title: "تحصيل الديون", desc: "الإجراءات القانونية لتحصيل الحقوق المالية" },
];

const WhatWeOffer = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium text-sm">خدماتنا المتميزة</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
            ماذا نقدم
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-card rounded-xl p-8 group service-card-hover text-center cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-navy mx-auto flex items-center justify-center mb-6 icon-box-hover">
                <service.icon className="w-6 h-6 text-gold icon-color-hover" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;

import { motion, Variants } from "framer-motion";

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
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const clients = [
  "شركة أوسكار للاستثمار العقاري والسياحى",
  "شركة لاكوتليت للحوم والمجمدات",
  "شركة جنوب سيناء للتوريدات",
  "شركة أمون (مستشفى كليوباترا)",
  "وشركات أخرى ومواطنين وأجانب",
];

const ClientsSection = () => {
  return (
    <section className="section-padding bg-navy/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold font-bold text-sm tracking-widest uppercase mb-2 block">شركاء النجاح</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy mt-2">
            أبرز الموكلين
          </h2>
          <div className="w-20 h-1.5 bg-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {clients.map((client) => (
            <motion.div
              key={client}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)"
              }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-center group transition-all duration-300 cursor-default min-h-[140px] relative overflow-hidden hover:border-[#e3b131]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="text-gray-800 font-heading font-extrabold text-xl md:text-2xl leading-snug group-hover:text-navy transition-colors duration-300 relative z-10 w-full px-4 break-words">
                {client}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;

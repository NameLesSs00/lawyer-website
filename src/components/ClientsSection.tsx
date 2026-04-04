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
    <section className="py-6 bg-background border-t border-border">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-gold font-bold text-xs tracking-widest uppercase mb-1 block">شركاء النجاح</span>
          <h2 className="text-xl md:text-2xl font-heading text-gold opacity-90 mt-2">
            بعض الموكلين لدي المكتب
          </h2>
          <div className="w-16 h-1 bg-gold/50 mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {clients.map((client) => (
            <motion.div
              key={client}
              variants={itemVariants}
              whileHover={{ 
                y: -3,
                boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)"
              }}
              className="bg-card p-4 rounded-lg flex items-center justify-center text-center transition-all duration-300 cursor-default min-h-[80px] border border-border hover:border-gold group"
            >
              <span className="text-muted-foreground font-heading text-sm md:text-base leading-snug group-hover:text-foreground transition-colors duration-300 relative z-10 w-full px-2 break-words">
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

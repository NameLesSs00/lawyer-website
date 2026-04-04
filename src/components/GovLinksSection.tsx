import { motion } from "framer-motion";

const govLinks = [
  {
    name: "موقع محكمة النقض",
    url: "https://www.cc.gov.eg/",
    icon: "🏛️"
  },
  {
    name: "النيابة العامة",
    url: "https://ppo.gov.eg/ppo/r/ppoportal/ppoportal/home",
    icon: "⚖️"
  },
  {
    name: "وزارة العدل - الاستعلام عن دعوى",
    url: "https://moj.gov.eg/services/courts/10050004",
    icon: "📋"
  }
];

const GovLinksSection = () => {
  return (
    <section className="py-12 bg-navy-dark/80 backdrop-blur-md border-t border-gold/30">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading text-gold font-bold">
            روابط حكومية هامة
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {govLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center justify-center p-6 bg-navy border border-gold/20 rounded-xl hover:border-gold hover:shadow-[0_0_20px_rgba(176,141,87,0.3)] transition-all duration-300 group"
            >
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">
                {link.icon}
              </span>
              <span className="text-white font-heading text-lg font-semibold text-center group-hover:text-gold transition-colors duration-300">
                {link.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovLinksSection;

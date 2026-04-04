import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const stats = [
  { id: 1, title: "قضية ناجحة", value: 1250, suffix: "+" },
  { id: 2, title: "رضا العملاء", value: 100, suffix: "%" },
  { id: 3, title: "سنوات خبرة", value: 20, suffix: "+" },
  { id: 4, title: "عميل سعيد", value: 800, suffix: "+" },
];

const Counter = ({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTimeout: NodeJS.Timeout;
      let startTime: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * (to - from) + from);
        
        setCount(currentCount);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(to);
        }
      };

      startTimeout = setTimeout(() => {
        window.requestAnimationFrame(step);
      }, 300);

      return () => clearTimeout(startTimeout);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

const StatsSection = () => {
  return (
    <section className="relative py-20 bg-background overflow-hidden border-t border-border">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('/images/stats-bg.jpeg')", backgroundAttachment: 'fixed' }}
      />
      <div className="absolute inset-0 z-1 bg-black/70 mix-blend-multiply" />
      <div className="absolute inset-0 z-2 bg-gradient-to-t from-background to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center p-6 bg-card/60 backdrop-blur-sm border border-gold/20 rounded-2xl shadow-lg hover:border-gold hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-gold mb-2 flex items-center justify-center">
                <Counter from={0} to={stat.value} duration={2.5} />
                <span className="text-3xl md:text-4xl mr-1">{stat.suffix}</span>
              </div>
              <span className="text-white font-medium text-sm md:text-lg">
                {stat.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

import { motion, Variants } from "framer-motion";
import { ArrowLeft, Scale } from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const newsItems = [
  {
    id: 1,
    title: "تعديلات جديدة على قانون الإيجار القديم",
    excerpt: "صدر قرار جديد بخصوص تعديلات قانون الإيجار القديم يؤثر على ملايين المستأجرين والملاك...",
    category: "قانون مدني",
    date: "2026-03-20",
  },
  {
    id: 2,
    title: "أحكام محكمة النقض الجديدة في قضايا الأحوال الشخصية",
    excerpt: "أصدرت محكمة النقض عدة أحكام مهمة تتعلق بحقوق الحضانة والنفقة...",
    category: "قانون الأسرة",
    date: "2026-03-18",
  },
  {
    id: 3,
    title: "قانون العمل الجديد: أبرز التعديلات",
    excerpt: "تم إقرار تعديلات جوهرية على قانون العمل المصري تشمل حقوق العمال وساعات العمل...",
    category: "قانون العمل",
    date: "2026-03-15",
  },
];

const LatestNews = () => {
  return (
    <section className="section-padding bg-blue-light-custom">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <span className="text-gold font-medium text-sm">آخر المستجدات</span>
            <h2 className="text-3xl font-heading font-bold text-foreground mt-1">آخر الأخبار</h2>
          </div>
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-2 text-navy font-medium text-sm hover:text-gold transition-colors"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {newsItems.map((news) => (
            <motion.div
              key={news.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card rounded-xl overflow-hidden shadow-card group service-card-hover"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center icon-box-hover">
                    <Scale className="w-4 h-4 text-gold icon-color-hover" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{news.category}</span>
                </div>
                <h3 className="font-heading font-bold text-foreground mb-3 line-clamp-2 group-hover:text-gold transition-colors">{news.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{news.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;

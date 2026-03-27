import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const allNews = [
  {
    id: 1,
    title: "تعديلات جديدة على قانون الإيجار القديم",
    content: "صدر قرار جديد بخصوص تعديلات قانون الإيجار القديم يؤثر على ملايين المستأجرين والملاك. تتضمن التعديلات تحديد فترة انتقالية لتعديل القيمة الإيجارية وآليات جديدة لتسوية النزاعات بين المالك والمستأجر.",
    date: "2026-03-20",
  },
  {
    id: 2,
    title: "أحكام محكمة النقض الجديدة في قضايا الأحوال الشخصية",
    content: "أصدرت محكمة النقض عدة أحكام مهمة تتعلق بحقوق الحضانة والنفقة، وتم تأكيد مبدأ مصلحة الطفل الفضلى في جميع قرارات الحضانة.",
    date: "2026-03-18",
  },
  {
    id: 3,
    title: "قانون العمل الجديد: أبرز التعديلات",
    content: "تم إقرار تعديلات جوهرية على قانون العمل المصري تشمل حقوق العمال وساعات العمل والإجازات والتأمينات الاجتماعية.",
    date: "2026-03-15",
  },
  {
    id: 4,
    title: "تحديثات في قانون الشركات التجارية",
    content: "صدرت تعديلات على قانون الشركات التجارية تسهل إجراءات التأسيس وتضع ضوابط جديدة لحوكمة الشركات.",
    date: "2026-03-10",
  },
];

const NewsPage = () => {
  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-gold font-medium text-sm">آخر المستجدات القانونية</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">أخبار القانون</h1>
          <div className="w-16 h-1 bg-gold mt-4 rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {allNews.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card border-r-4 border-gold"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">{item.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{item.content}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;

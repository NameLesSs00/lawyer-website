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

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

type NewsItem = {
  id: string;
  title: string;
  content: string;
  date: Timestamp;
};

const LatestNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const q = query(collection(db, "News"), orderBy("date", "desc"), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
        setNews(data);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestNews();
  }, []);

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
          {loading ? (
            <div className="col-span-full flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : news.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">لا توجد أخبار حالياً.</p>
          ) : (
            news.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-xl overflow-hidden shadow-card group service-card-hover"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center icon-box-hover">
                      <Scale className="w-4 h-4 text-gold icon-color-hover" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {item.date?.toDate().toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-3 line-clamp-2 group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{item.content}</p>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;

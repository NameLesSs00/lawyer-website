import { motion } from "framer-motion";
import { Calendar, ChevronRight, ChevronLeft } from "lucide-react";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

type NewsItem = {
  id: string;
  title: string;
  content: string;
  date: Timestamp;
};

const ITEMS_PER_PAGE = 12;

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, "News"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

        <div className="space-y-6 mb-12">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : news.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">لا توجد أخبار حالياً.</p>
          ) : (
            currentNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card border-r-4 border-gold"
              >
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date?.toDate().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h2 className="font-heading font-bold text-xl text-foreground mb-3">{item.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{item.content}</p>
              </motion.article>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-navy text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold transition-colors"
                    aria-label="الصفحة السابقة"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
                
                <span className="text-sm font-medium text-navy">
                    صفحة {currentPage} من {totalPages}
                </span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-navy text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold transition-colors"
                    aria-label="الصفحة التالية"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;

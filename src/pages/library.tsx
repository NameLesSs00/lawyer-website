import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Download, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

import fs from "fs";
import path from "path";

type Book = {
  id: string;
  Title: string; // Case-sensitive to match firestore schema request, mapped to local as well
  category: string;
  content: string; // Description
  link: string; // Drive URL or local relative path
};

type LibraryPageProps = {
  localBooks: Book[];
};

export const getStaticProps = async () => {
  const pdfDirectory = path.join(process.cwd(), 'public/pdf');
  let filenames: string[] = [];
  
  try {
    if (fs.existsSync(pdfDirectory)) {
      filenames = fs.readdirSync(pdfDirectory);
    }
  } catch (error) {
    console.error("Error reading PDF directory:", error);
  }

  const localBooks: Book[] = filenames
    .filter(file => file.endsWith('.pdf'))
    .map((filename, index) => {
      const cleanName = filename.replace(/\.pdf$/i, "").trim();
      let category = "قانون العام";
      
      if (cleanName.includes("مدني") || cleanName.includes("ايجار")) category = "مدني";
      else if (cleanName.includes("جنائي")) category = "جنائي";
      else if (cleanName.includes("إداري") || cleanName.includes("دولة")) category = "إداري";
      else if (cleanName.includes("أسرة") || cleanName.includes("شخصية")) category = "أسرة";
      else if (cleanName.includes("تجاري") || cleanName.includes("شركات")) category = "تجاري";
      else if (cleanName.includes("دستور")) category = "دستوري";
      else if (cleanName.includes("ضريب") || cleanName.includes("قيمة مضافة")) category = "ضريبي";

      return {
        id: `local-${index}`,
        Title: cleanName,
        category,
        content: `نسخة من ${cleanName} بصيغة بي دي إف.`,
        link: `/pdf/${encodeURIComponent(filename)}`
      };
    });

  return {
    props: {
        localBooks,
    },
  };
};

const ITEMS_PER_PAGE = 12;

const LibraryPage = ({ localBooks }: LibraryPageProps) => {
  const [books, setBooks] = useState<Book[]>(localBooks || []);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "PDFS"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
        setBooks([...(localBooks || []), ...data]);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPDFs();
  }, []);

  const handleDownload = (link: string) => {
    window.open(link, "_blank");
  };

  const filteredBooks = books.filter(
    (book) =>
      book.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="container-custom">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <span className="text-gold font-medium text-sm">مكتبتنا الرقمية</span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">المكتبة القانونية</h1>
            <div className="w-16 h-1 bg-gold mt-4 rounded-full" />
            {!loading && <p className="text-muted-foreground mt-4 text-sm">تضم المكتبة {books.length} ملفاً من القوانين واللوائح.</p>}
        </motion.div>

        {/* Search Bar */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10 max-w-md relative"
        >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="ابحث عن ملف..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-white text-gray-900 placeholder:text-gray-500 border border-border shadow-sm rounded-xl px-12 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
              <Search className="w-5 h-5 text-muted-foreground absolute right-4 pointer-events-none" />
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading && books.length === 0 ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                        <motion.div
                            key={book.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col sm:flex-row gap-5 group hover:border-gold/50 hover:shadow-elegant transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-lg bg-navy flex items-center justify-center shrink-0 group-hover:bg-gold transition-all duration-300 shadow-sm">
                                <BookOpen className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-300" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-heading font-bold text-foreground text-sm md:text-base leading-tight group-hover:text-gold transition-colors line-clamp-2" title={book.Title}>
                                            {book.Title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] bg-navy/5 text-navy px-2 py-0.5 rounded-full uppercase font-extrabold tracking-wider whitespace-nowrap">{book.category}</span>
                                    </div>
                                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{book.content}</p>
                                </div>
                                <button 
                                    onClick={() => handleDownload(book.link)}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs bg-navy text-primary-foreground font-bold px-4 py-2 rounded-lg hover:bg-gold hover:text-navy transition-all duration-300 mt-4 shadow-sm group/btn"
                                >
                                    <Download className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-y-0.5" />
                                    تحميل الملف
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center py-20"
                    >
                        <p className="text-muted-foreground text-lg">لم يتم العثور على ملفات تطابق بحثك.</p>
                    </motion.div>
                )}
            </AnimatePresence>
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

export default LibraryPage;

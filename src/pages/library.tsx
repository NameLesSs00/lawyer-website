import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Download, Search, ChevronRight, ChevronLeft } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import SEO from "@/components/SEO";

type Book = {
  id: string;
  title: string;
  category: string;
  content: string;
  link: string;
};

type CategoryItem = {
  id: string;
  category: string;
  order: number;
};

const ITEMS_PER_PAGE = 12;

const LibraryPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch categories in stored order, filter out works
        const catQ = query(collection(db, "categories"), orderBy("order", "asc"));
        const catSnapshot = await getDocs(catQ);
        const catData = catSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as CategoryItem))
          .filter(cat => cat.category !== "احدث الاعمال");
        setCategories(catData);

        // Set first category as default tab
        if (catData.length > 0) {
          setActiveCategory(catData[0].category);
        }

        // Fetch PDFs, filter out works
        const pdfSnapshot = await getDocs(collection(db, "PDFS"));
        const pdfData = pdfSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as Book))
          .filter(book => book.category !== "احدث الاعمال");
        setBooks(pdfData);
      } catch (error) {
        console.error("Error fetching library data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleDownload = (link: string) => {
    window.open(link, "_blank");
  };

  // Filter by active category tab + search
  const filteredBooks = books.filter((book) => {
    const matchesCategory = activeCategory ? book.category === activeCategory : true;
    const matchesSearch =
      (book.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="section-padding bg-background min-h-screen">
      <SEO 
        title="المكتبة القانونية الرقمية | ميلاد يعقوب بولس"
        description="تصفح وتحميل أهم القوانين المصرية، اللوائح التنفيذية، والدستور المصري من خلال مكتبتنا القانونية الرقمية الشاملة."
        keywords="قوانين مصرية، تحميل الدستور، لوائح تنفيذية، كتب قانونية، مرجع قانوني الغردقة"
      />
      <div className="container-custom">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="text-gold font-medium text-sm">مكتبتنا الرقمية</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">المكتبة القانونية</h1>
          <div className="w-16 h-1 bg-gold mt-4 rounded-full" />
          {!loading && (
            <p className="text-muted-foreground mt-4 text-sm">
              تضم المكتبة {books.length} ملفاً في {categories.length} تصنيف.
            </p>
          )}
        </motion.div>

        {/* Search + Category Tabs Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col gap-4"
        >
          {/* Search Bar */}
          <div className="max-w-md relative flex items-center">
            <input
              type="text"
              placeholder="ابحث عن ملف..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-white text-gray-900 placeholder:text-gray-500 border border-border shadow-sm rounded-xl px-12 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
            />
            <Search className="w-5 h-5 text-muted-foreground absolute right-4 pointer-events-none" />
          </div>

          {/* Category Tabs */}
          {!loading && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.category;
                const count = books.filter(b => b.category === cat.category).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                      isActive
                        ? "bg-gold text-navy border-gold shadow-md scale-[1.03]"
                        : "bg-card text-foreground border-border hover:border-gold/60 hover:text-gold"
                    }`}
                  >
                    {cat.category}
                    <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-extrabold ${
                      isActive ? "bg-navy/20 text-navy" : "bg-muted text-muted-foreground"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {loading ? (
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
                          <h3 className="font-heading font-bold text-foreground text-sm md:text-base leading-tight group-hover:text-gold transition-colors line-clamp-2" title={book.title}>
                            {book.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-extrabold tracking-wider whitespace-nowrap">{book.category}</span>
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
                  <BookOpen className="w-12 h-12 text-gold/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    {searchQuery
                      ? "لم يتم العثور على ملفات تطابق بحثك."
                      : "لا توجد ملفات في هذا التصنيف بعد."}
                  </p>
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

            <span className="text-sm font-medium text-white">
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

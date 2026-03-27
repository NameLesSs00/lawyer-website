import { motion } from "framer-motion";
import { BookOpen, Download } from "lucide-react";

const books = [
  {
    id: 1,
    title: "الدستور المصرى",
    filename: "الدستور المصرى.pdf",
    description: "النسخة الكاملة والمحدثة من الدستور المصرى.",
    category: "دستوري",
  },
  {
    id: 2,
    title: "القانون المدني",
    filename: "قانون رقم 131 لسنة 1948 بإصدار القانون المدني وفقاً لآخر تعديل صادر في 13 أكتوبر عام 2021..pdf",
    description: "قانون رقم 131 لسنة 1948 بإصدار القانون المدني وفقاً لآخر تعديلات 2021.",
    category: "مدني",
  },
  {
    id: 3,
    title: "قانون الإجراءات الجنائية",
    filename: "قانون رقم 150 لسنة 1950 بإصدار قانون الإجراءات الجنائية وفقاً لآخر تعديل صادر في 16 يناير عام 2024..pdf",
    description: "قانون رقم 150 لسنة 1950 بإصدار قانون الإجراءات الجنائية وفقاً لآخر تعديلات 2024.",
    category: "جنائي",
  },
  {
    id: 4,
    title: "قانون المحاماة",
    filename: "قانون رقم ١٧ لسنة ١٩٨٣ بإصدار قانون المحاماة وفقاً لآخر تعديل صادر في 8 يوليو 2020..pdf",
    description: "قانون رقم ١٧ لسنة ١٩٨٣ بإصدار قانون المحاماة وتعديلاته.",
    category: "إداري",
  },
  {
    id: 5,
    title: "قانون المرافعات المدنية والتجارية",
    filename: "قانون رقم 13 لسنة 1968 بإصدار قانون المرافعات المدنية والتجارية وفقاً لآخر تعديل صادر في 10 يولية عام 2024..pdf",
    description: "قانون رقم 13 لسنة 1968 بإصدار قانون المرافعات المدنية والتجارية وتعديلاته 2024.",
    category: "تجاري",
  },
  {
    id: 6,
    title: "قانون الإثبات",
    filename: "قانون رقم 25 لسنة 1968 بإصدار قانون الإثبات في المواد المدنية والتجارية وفقاً لآخر تعديل صادر في 6 يونية 2007 ..pdf",
    description: "قانون رقم 25 لسنة 1968 بإصدار قانون الإثبات وتعديلاته.",
    category: "مدني",
  },
  {
    id: 7,
    title: "قانون المحكمة الدستورية العليا",
    filename: "قانون رقم 48 لسنة 1979 بإصدار قانون المحكمة الدستورية العليا وفقاً لآخر تعديل صادر في 15 أغسطس عام 2021..pdf",
    description: "قانون رقم 48 لسنة 1979 بإصدار قانون المحكمة الدستورية العليا وتعديلاته.",
    category: "دستوري",
  },
  {
    id: 8,
    title: "قانون التجارة",
    filename: "قانون رقم ١٧ لسنة ١٩٩٩ بإصدار قانون التجارة وفقاً لآخر تعديل صادر في 19 فبراير عام 2018..pdf",
    description: "قانون رقم ١٧ لسنة ١٩٩٩ بإصدار قانون التجارة وتعديلاته.",
    category: "تجاري",
  },
  {
    id: 9,
    title: "قانون إيجار الأماكن",
    filename: "قانون 164 لسنة 2025 بشأن بعض الأحكام المتعلقة بقوانين إيجار الأماكن وإعادة تنظيم العلاقة بين المؤجر والمستأجر محدثاً حتى عام 2025..pdf",
    description: "قانون 164 لسنة 2025 بشأن قوانين إيجار الأماكن وإعادة تنظيم العلاقة بين المؤجر والمستأجر محدثاً حتى عام 2025.",
    category: "مدني",
  },
  {
    id: 10,
    title: "قانون أملاك الدولة الخاصة",
    filename: "قانون 168 لسنة 2025 بإصدار قانون بعض قواعد وإجراءات التصرف في أملاك الدولة الخاصة محدثاً حتى عام 2025..pdf",
    description: "قانون 168 لسنة 2025 التصرف في أملاك الدولة الخاصة.",
    category: "إداري",
  },
  {
    id: 11,
    title: "قانون الأحوال الشخصية",
    filename: "قانون رقم 1 لسنة 2000 بإصدار قانون تنظيم بعض أوضاع وإجراءات التقاضي في مسائل الأحوال الشخصية وفقاً لآخر تعديل صادر في 5 سبتمبر عام 2020..pdf",
    description: "قانون رقم 1 لسنة 2000 بتنظيم أوضاع وإجراءات التقاضي في مسائل الأحوال الشخصية.",
    category: "أسرة",
  },
  {
    id: 12,
    title: "قانون الإجراءات الضريبية الموحد",
    filename: "قانون رقم 206 لسنة 2020 بإصدار قانون الإجراءات الضريبية الموحد وفقاً لآخر تعديل صادر في 12 فبراير عام 2025..pdf",
    description: "قانون رقم 206 لسنة 2020 بإصدار قانون الإجراءات الضريبية الموحد وتعديلاته 2025.",
    category: "ضريبي",
  },
  {
    id: 13,
    title: "قانون إجراءات الطعن بالنقض",
    filename: "قانون رقم 57 لسنة 1959 بإصدار قانون حالات وإجراءات الطعن أمام محكمة النقض وفقاً لآخر تعديل صادر في 12 ديسمبر عام 2019..pdf",
    description: "قانون رقم 57 لسنة 1959 بإصدار قانون حالات وإجراءات الطعن أمام محكمة النقض.",
    category: "إجراءات",
  },
];

const LibraryPage = () => {
  const handleDownload = (filename: string) => {
    window.open(`/pdf/${encodeURIComponent(filename)}`, "_blank");
  };

  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="container-custom">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
        >
            <span className="text-gold font-medium text-sm">مكتبتنا الرقمية</span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">المكتبة القانونية</h1>
            <div className="w-16 h-1 bg-gold mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
                <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col sm:flex-row gap-5 group hover:border-gold/50 hover:shadow-elegant transition-all duration-300"
                >
                    <div className="w-14 h-14 rounded-lg bg-navy flex items-center justify-center shrink-0 group-hover:bg-gold transition-all duration-300 shadow-sm">
                        <BookOpen className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-300" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <h3 className="font-heading font-bold text-foreground text-sm md:text-base leading-tight group-hover:text-gold transition-colors">{book.title}</h3>
                                <span className="text-[10px] bg-navy/5 text-navy px-2 py-0.5 rounded-full uppercase font-extrabold tracking-wider whitespace-nowrap">{book.category}</span>
                            </div>
                            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{book.description}</p>
                        </div>
                        <button 
                            onClick={() => handleDownload(book.filename)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs bg-navy text-primary-foreground font-bold px-4 py-2 rounded-lg hover:bg-gold hover:text-navy transition-all duration-300 mt-4 shadow-sm group/btn"
                        >
                            <Download className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-y-0.5" />
                            تحميل الملف
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;

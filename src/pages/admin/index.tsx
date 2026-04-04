import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { db } from "../../lib/firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp,
  query,
  orderBy
} from "firebase/firestore";
import { motion } from "framer-motion";
import { FileText, Newspaper, LogOut, Plus, Edit, Trash2, X, Briefcase } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";

type NewsItem = {
  id: string;
  title: string;
  content: string;
  date: Timestamp;
};

type PDFItem = {
  id: string;
  Title: string;
  category: string;
  content: string;
  link: string;
};

type WorkItem = {
  id: string;
  title: string;
  content: string;
  link: string;
};

export default function AdminDashboard() {
  const { user, loading } = useAuth(true); // require auth
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"news" | "pdfs" | "works">("news");
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pdfs, setPdfs] = useState<PDFItem[]>([]);
  const [works, setWorks] = useState<WorkItem[]>([]);
  
  // Modals / Forms state
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Data
  const [newsFormData, setNewsFormData] = useState({ title: "", content: "", date: "" });
  const [pdfFormData, setPdfFormData] = useState({ Title: "", category: "", content: "", link: "" });
  const [workFormData, setWorkFormData] = useState({ title: "", content: "", link: "" });

  const fetchData = async () => {
    try {
      // Fetch News
      const newsQ = query(collection(db, "News"), orderBy("date", "desc"));
      const newsSnapshot = await getDocs(newsQ);
      const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(newsData);
      
      // Fetch PDFs
      const pdfSnapshot = await getDocs(collection(db, "PDFS"));
      const pdfData = pdfSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PDFItem));
      setPdfs(pdfData);

      // Fetch Works
      const workSnapshot = await getDocs(collection(db, "Works"));
      const workData = workSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WorkItem));
      setWorks(workData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  // -------------------------------------------------------------------
  // News Handlers
  // -------------------------------------------------------------------
  const openNewsModal = (item?: NewsItem) => {
    if (item) {
      const d = item.date.toDate();
      const dateString = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      setNewsFormData({ title: item.title, content: item.content, date: dateString });
      setEditingId(item.id);
    } else {
      const today = new Date();
      const dateString = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
      setNewsFormData({ title: "", content: "", date: dateString });
      setEditingId(null);
    }
    setIsNewsModalOpen(true);
  };

  const saveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateObj = new Date(newsFormData.date);
    const dataToSave = {
      title: newsFormData.title,
      content: newsFormData.content,
      date: Timestamp.fromDate(dateObj)
    };

    if (editingId) {
      await updateDoc(doc(db, "News", editingId), dataToSave);
    } else {
      await addDoc(collection(db, "News"), dataToSave);
    }
    
    setIsNewsModalOpen(false);
    fetchData();
  };

  const deleteNews = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الخبر؟")) {
      await deleteDoc(doc(db, "News", id));
      fetchData();
    }
  };

  // -------------------------------------------------------------------
  // PDFs Handlers
  // -------------------------------------------------------------------
  const openPDFModal = (item?: PDFItem) => {
    if (item) {
      setPdfFormData({ Title: item.Title, category: item.category, content: item.content, link: item.link });
      setEditingId(item.id);
    } else {
      setPdfFormData({ Title: "", category: "", content: "", link: "" });
      setEditingId(null);
    }
    setIsPDFModalOpen(true);
  };

  const savePDF = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, "PDFS", editingId), pdfFormData);
    } else {
      await addDoc(collection(db, "PDFS"), pdfFormData);
    }
    setIsPDFModalOpen(false);
    fetchData();
  };

  const deletePDF = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الملف؟")) {
      await deleteDoc(doc(db, "PDFS", id));
      fetchData();
    }
  };

  // -------------------------------------------------------------------
  // Works Handlers
  // -------------------------------------------------------------------
  const openWorkModal = (item?: WorkItem) => {
    if (item) {
      setWorkFormData({ title: item.title, content: item.content, link: item.link });
      setEditingId(item.id);
    } else {
      setWorkFormData({ title: "", content: "", link: "" });
      setEditingId(null);
    }
    setIsWorkModalOpen(true);
  };

  const saveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, "Works", editingId), workFormData);
    } else {
      await addDoc(collection(db, "Works"), workFormData);
    }
    setIsWorkModalOpen(false);
    fetchData();
  };

  const deleteWork = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العمل؟")) {
      await deleteDoc(doc(db, "Works", id));
      fetchData();
    }
  };

  // -------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Admin Header */}
      <header className="bg-navy text-primary-foreground py-4 px-6 md:px-10 shadow-md flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-heading font-bold text-gold">لوحة التحكم</h1>
          <span className="text-sm opacity-80 hidden md:inline">| مكتب ميلاد يعقوب بولس</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive transition-colors"
        >
          <LogOut className="w-4 h-4" />
          تسجيل الخروج
        </button>
      </header>

      <div className="container-custom py-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
          <button
            onClick={() => setActiveTab("news")}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === "news" ? "bg-gold text-navy shadow-lg" : "bg-card text-foreground border border-border hover:border-gold/50"
            }`}
          >
            <Newspaper className="w-5 h-5" />
            إدارة الأخبار
          </button>
          
          <button
            onClick={() => setActiveTab("pdfs")}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === "pdfs" ? "bg-gold text-navy shadow-lg" : "bg-card text-foreground border border-border hover:border-gold/50"
            }`}
          >
            <FileText className="w-5 h-5" />
            المكتبة و الـ PDFs
          </button>
          
          <button
            onClick={() => setActiveTab("works")}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === "works" ? "bg-gold text-navy shadow-lg" : "bg-card text-foreground border border-border hover:border-gold/50"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            إدارة الأعمال
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[60vh]">
          {activeTab === "news" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                <h2 className="text-xl font-heading font-bold text-foreground">الأخبار المؤرشفة</h2>
                <button 
                  onClick={() => openNewsModal()}
                  className="flex items-center gap-2 bg-navy text-primary-foreground text-sm px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  إضافة خبر جديد
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.length === 0 && <p className="text-muted-foreground text-sm col-span-full">لا توجد أخبار مضافة.</p>}
                {news.map(item => (
                  <div key={item.id} className="border border-border p-4 rounded-xl shadow-sm relative group bg-card hover:border-gold/50 transition-colors">
                    <h3 className="font-bold text-sm mb-2 text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-4">{item.content}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-[10px] bg-navy/5 text-navy px-2 py-1 rounded font-bold">
                        {item.date?.toDate().toLocaleDateString('ar-EG')}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => openNewsModal(item)} className="p-1.5 text-navy hover:bg-navy/10 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteNews(item.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "pdfs" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                <h2 className="text-xl font-heading font-bold text-foreground">إدارة مكتبة المتصفح</h2>
                <button 
                  onClick={() => openPDFModal()}
                  className="flex items-center gap-2 bg-navy text-primary-foreground text-sm px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  إضافة ملف جديد
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pdfs.length === 0 && <p className="text-muted-foreground text-sm col-span-full">لا توجد ملفات مضافة.</p>}
                {pdfs.map(item => (
                  <div key={item.id} className="border border-border p-4 rounded-xl shadow-sm relative group bg-card hover:border-gold/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm line-clamp-2 text-foreground">{item.Title}</h3>
                    </div>
                    <span className="text-[10px] text-white bg-gold/10 px-2 py-1 rounded font-bold inline-block mb-3">
                      {item.category}
                    </span>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{item.content}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <a href={item.link} target="_blank" rel="noreferrer" className="text-xs text-navy hover:underline font-bold">
                        رابط تحميل الملف
                      </a>
                      <div className="flex gap-2">
                        <button onClick={() => openPDFModal(item)} className="p-1.5 text-navy hover:bg-navy/10 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deletePDF(item.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "works" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                <h2 className="text-xl font-heading font-bold text-foreground">سجل أحدث أعمالنا</h2>
                <button 
                  onClick={() => openWorkModal()}
                  className="flex items-center gap-2 bg-navy text-primary-foreground text-sm px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  إضافة عمل جديد
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {works.length === 0 && <p className="text-muted-foreground text-sm col-span-full">لا توجد أعمال مضافة.</p>}
                {works.map(item => (
                  <div key={item.id} className="border border-border p-4 rounded-xl shadow-sm relative group bg-card hover:border-gold/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm line-clamp-2 text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 mt-2">{item.content}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer" className="text-xs text-navy hover:underline font-bold flex items-center gap-1">
                          رابط العمل
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">بدون رابط</span>
                      )}
                      <div className="flex gap-2">
                        <button onClick={() => openWorkModal(item)} className="p-1.5 text-navy hover:bg-navy/10 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteWork(item.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ---------------- NEWS MODAL ---------------- */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-card w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-border"
          >
            <div className="bg-navy p-4 flex justify-between items-center">
              <h3 className="text-white font-bold">{editingId ? "تعديل الخبر" : "إضافة خبر جديد"}</h3>
              <button onClick={() => setIsNewsModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveNews} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground flex justify-between">
                  <span>أدخل التايتل</span>
                  <span className="text-xs opacity-90 font-bold text-gold-dark">الحد الأقصى: 100 حرف</span>
                </label>
                <input 
                  type="text" required maxLength={100}
                  value={newsFormData.title} onChange={e => setNewsFormData({...newsFormData, title: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none text-foreground bg-background" 
                  placeholder="عنوان الخبر..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">تاريخ النشر</label>
                <input 
                  type="date" required
                  value={newsFormData.date} onChange={e => setNewsFormData({...newsFormData, date: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none text-foreground bg-background [&::-webkit-calendar-picker-indicator]:invert" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground flex justify-between">
                  <span>محتوي الخبر</span>
                  <span className="text-xs opacity-90 font-bold text-gold-dark">الحد الأقصى: 350 حرف</span>
                </label>
                <textarea 
                  required maxLength={350} rows={5}
                  value={newsFormData.content} onChange={e => setNewsFormData({...newsFormData, content: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none resize-none text-foreground bg-background" 
                  placeholder="محتوى الخبر باختصار..."
                />
                <p className="text-xs text-muted-foreground mt-1 text-left font-medium">{newsFormData.content.length}/350</p>
              </div>
              <div className="flex gap-3 pt-4 border-t border-border">
                <button type="submit" className="flex-1 bg-gold text-navy font-bold py-2.5 rounded-lg hover:bg-gold-light transition-colors">حفظ التغييرات</button>
                <button type="button" onClick={() => setIsNewsModalOpen(false)} className="px-6 border border-border text-foreground py-2.5 rounded-lg hover:bg-muted transition-colors">إلغاء</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ---------------- PDF MODAL ---------------- */}
      {isPDFModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-card w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-border"
          >
            <div className="bg-navy p-4 flex justify-between items-center">
              <h3 className="text-white font-bold">{editingId ? "تعديل الملف" : "إضافة ملف مخصص للتحميل"}</h3>
              <button onClick={() => setIsPDFModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={savePDF} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground flex justify-between">
                  <span>Title (اسم المستند)</span>
                  <span className="text-xs opacity-90 font-bold text-gold-dark">الحد الأقصى: 100 حرف</span>
                </label>
                <input 
                  type="text" required maxLength={100}
                  value={pdfFormData.Title} onChange={e => setPdfFormData({...pdfFormData, Title: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none text-foreground bg-background" 
                  placeholder="اكتب التايتل الصحيح..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground flex justify-between">
                  <span>التصنيف</span>
                  <span className="text-xs opacity-90 font-bold text-gold-dark">الحد الأقصى: 50 حرف</span>
                </label>
                <input 
                  type="text" required maxLength={50}
                  value={pdfFormData.category} onChange={e => setPdfFormData({...pdfFormData, category: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none text-foreground bg-background" 
                  placeholder="مثال: أحوال شخصية، مدني..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground flex justify-between">
                  <span>تفاصيل او محتوي عن الملف</span>
                  <span className="text-xs opacity-90 font-bold text-gold-dark">الحد الأقصى: 200 حرف</span>
                </label>
                <textarea 
                  required maxLength={200} rows={3}
                  value={pdfFormData.content} onChange={e => setPdfFormData({...pdfFormData, content: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none resize-none text-foreground bg-background" 
                  placeholder="مثال: يحتوي على تحديثات القانون الجديد."
                />
                <p className="text-xs text-muted-foreground mt-1 text-left font-medium">{pdfFormData.content.length}/200</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">لينك الدرايف الخاص بالـ PDF</label>
                <input 
                  type="url" required
                  value={pdfFormData.link} onChange={e => setPdfFormData({...pdfFormData, link: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none text-left text-foreground bg-background" 
                  placeholder="https://drive.google.com/..."
                  dir="ltr"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-border">
                <button type="submit" className="flex-1 bg-gold text-navy font-bold py-2.5 rounded-lg hover:bg-gold-light transition-colors">حفظ التغييرات</button>
                <button type="button" onClick={() => setIsPDFModalOpen(false)} className="px-6 border border-border text-foreground py-2.5 rounded-lg hover:bg-muted transition-colors">إلغاء</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ---------------- WORK MODAL ---------------- */}
      {isWorkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-card w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-border"
          >
            <div className="bg-navy p-4 flex justify-between items-center">
              <h3 className="text-white font-bold">{editingId ? "تعديل العمل" : "إضافة عمل جديد"}</h3>
              <button onClick={() => setIsWorkModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveWork} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground flex justify-between">
                  <span>عنوان العمل</span>
                  <span className="text-xs opacity-90 font-bold text-gold-dark">الحد الأقصى: 100 حرف</span>
                </label>
                <input 
                  type="text" required maxLength={100}
                  value={workFormData.title} onChange={e => setWorkFormData({...workFormData, title: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none text-foreground bg-background" 
                  placeholder="اسم أو عنوان العمل..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground flex justify-between">
                  <span>تفاصيل العمل</span>
                  <span className="text-xs opacity-90 font-bold text-gold-dark">الحد الأقصى: 300 حرف</span>
                </label>
                <textarea 
                  required maxLength={300} rows={4}
                  value={workFormData.content} onChange={e => setWorkFormData({...workFormData, content: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none resize-none text-foreground bg-background" 
                  placeholder="وصف للعمل وما تم إنجازه..."
                />
                <p className="text-xs text-muted-foreground mt-1 text-left font-medium">{workFormData.content.length}/300</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">رابط العمل (Google Drive وغيره) - اختياري</label>
                <input 
                  type="url"
                  value={workFormData.link} onChange={e => setWorkFormData({...workFormData, link: e.target.value})}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-gold outline-none text-left text-foreground bg-background" 
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-border">
                <button type="submit" className="flex-1 bg-gold text-navy font-bold py-2.5 rounded-lg hover:bg-gold-light transition-colors">حفظ التغييرات</button>
                <button type="button" onClick={() => setIsWorkModalOpen(false)} className="px-6 border border-border text-foreground py-2.5 rounded-lg hover:bg-muted transition-colors">إلغاء</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب").max(100),
  phone: z.string().trim().min(8, "رقم الموبايل مطلوب").max(20),
  subject: z.string().trim().min(1, "عنوان المشكلة مطلوب").max(200),
  details: z.string().trim().min(1, "تفاصيل المشكلة مطلوبة").max(2000),
});

const phoneNumber = "201229149719"; // Client phone number

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", subject: "", details: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const message = `*رسالة جديدة من موقع المكتب*%0A%0A*الاسم:* ${encodeURIComponent(form.name)}%0A*الموبايل:* ${encodeURIComponent(form.phone)}%0A*الموضوع:* ${encodeURIComponent(form.subject)}%0A*التفاصيل:* ${encodeURIComponent(form.details)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="section-padding bg-background min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium text-sm">نحن هنا لمساعدتك</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">تواصل معنا</h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 space-y-6">
              <h3 className="font-heading font-bold text-lg text-foreground">معلومات التواصل</h3>
              <div className="space-y-6">
                <Link 
                  href="https://maps.app.goo.gl/UpX2ZhYrPyQvrmW97?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-300 shadow-sm">
                    <MapPin className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-heading font-bold text-foreground text-sm group-hover:text-gold transition-colors">العنوان</p>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">شارع النصر الدهار أعلى شركة اتصالات بجوار سبينس، الغردقة، البحر الأحمر</p>
                  </div>
                </Link>

                <Link 
                  href="https://wa.me/201229149719"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-300 shadow-sm">
                    <Phone className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-heading font-bold text-foreground text-sm group-hover:text-gold transition-colors">الهاتف</p>
                    <p className="text-muted-foreground text-xs md:text-sm font-medium transition-colors" dir="ltr">+20 12 29149719</p>
                  </div>
                </Link>

                <div className="flex items-start gap-4 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-heading font-bold text-foreground text-sm">ساعات العمل</p>
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">السبت - الخميس: 9 ص - 5 م</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">الاسم</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-sm"
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">رقم الموبايل</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-sm"
                    placeholder="أدخل رقم الموبايل"
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">عنوان المشكلة</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-sm"
                  placeholder="اكتب عنوان المشكلة"
                />
                {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">تفاصيل المشكلة</label>
                <textarea
                  value={form.details}
                  onChange={(e) => handleChange("details", e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-sm resize-none"
                  placeholder="اشرح تفاصيل المشكلة القانونية"
                />
                {errors.details && <p className="text-destructive text-xs mt-1">{errors.details}</p>}
              </div>
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gold text-accent-foreground px-8 py-3 rounded-lg font-heading font-bold text-sm hover:bg-gold-dark transition-colors"
              >
                <Send className="w-4 h-4" />
                إرسال عبر واتساب
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

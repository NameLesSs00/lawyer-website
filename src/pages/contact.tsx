import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, MapPin, Clock } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب").max(100),
  phone: z.string().trim().min(8, "رقم الموبايل مطلوب").max(20),
  subject: z.string().trim().min(1, "عنوان المشكلة مطلوب").max(200),
  details: z.string().trim().min(1, "تفاصيل المشكلة مطلوبة").max(2000),
});

const phoneNumber = "+201200039617"; // Test phone number

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
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">العنوان</p>
                    <p className="text-muted-foreground text-sm">شارع النصر الدهار أعلى شركة اتصالات بجوار سبينس، الغردقة، البحر الأحمر</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">الهاتف</p>
                    <p className="text-muted-foreground text-sm" dir="ltr">+20 100 000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">ساعات العمل</p>
                    <p className="text-muted-foreground text-sm">السبت - الخميس: 9 ص - 5 م</p>
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

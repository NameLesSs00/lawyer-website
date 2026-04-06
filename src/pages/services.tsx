import { motion } from "framer-motion";
import { Gavel, FileText, Users, Shield, Building, Handshake, Scale, Briefcase } from "lucide-react";
import SEO from "@/components/SEO";

const services = [
  { icon: Gavel, title: "الجنايات والجنح", desc: "ترافعنا فى الكثير من قضايا الجنايات والقضايا السياسية والفكرية الكبرى أمام جميع المحاكم." },
  { icon: Shield, title: "الجرائم الاقتصادية", desc: "متخصصون فى الجرائم الاقتصادية وجرائم التموين والمخابز والجرائم المالية المعقدة." },
  { icon: FileText, title: "جرائم الإنترنت", desc: "متخصصون في قضايا تقنية المعلومات والشبكات وجرائم المعلومات والابتزاز الإلكتروني." },
  { icon: Building, title: "الدعاوى العقارية", desc: "حل جميع النزاعات العقارية، دعاوى الصحة والنفاذ، وتسجيلات الشهر العقاري بمختلف أنواعها." },
  { icon: Handshake, title: "صياغة العقود", desc: "صياغة ومراجعة كافة أنواع العقود التجارية والمدنية وعقود الشراكة بما يضمن الحماية القانونية التامة." },
  { icon: Users, title: "الأحوال الشخصية", desc: "متخصصون في قضايا الأسرة من زواج وطلاق وخلع ونفقة وحضانة ورؤية بأقصى درجات السرية." },
  { icon: Scale, title: "القضايا التجارية", desc: "تمثيل قانوني في قضايا الشركات، الإفلاس، التصفية، والمنازعات بين الشركاء والمساهمين." },
  { icon: Briefcase, title: "تحصيل الديون", desc: "القيام بكافة الإجراءات القانونية اللازمة لتحصيل الديون وحماية الحقوق المالية للأفراد والشركات." },
];

const ServicesPage = () => {
  return (
    <div className="section-padding bg-background min-h-screen">
      <SEO 
        title="خدماتنا القانونية في الغردقة | ميلاد يعقوب بولس"
        description="نقدم خدمات قانونية متخصصة في الغردقة والبحر الأحمر: جنايات، جرائم اقتصادية، جرائم إنترنت، منازعات عقارية، وصياغة عقود."
        keywords="محامي جنائي الغردقة، قضايا عقارات البحر الأحمر، صياغة عقود، جرائم الإنترنت، محامي أحوال شخصية الغردقة"
      />
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium text-sm">ما نقدمه لعملائنا</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">خدماتنا القانونية</h1>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات القانونية المتخصصة لتلبية احتياجاتكم بأعلى معايير الجودة والاحترافية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl p-6 shadow-card text-center group service-card-hover"
            >
              <div className="w-14 h-14 rounded-full bg-navy mx-auto flex items-center justify-center mb-6 icon-box-hover">
                <service.icon className="w-6 h-6 text-gold icon-color-hover" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

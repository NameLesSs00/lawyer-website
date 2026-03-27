import { AlertTriangle } from "lucide-react";

const BreakingNews = () => {
  const breakingNews = "تم تعديل قانون الإيجار القديم — تابعوا آخر المستجدات القانونية";

  return (
    <div className="bg-gold overflow-hidden">
      <div className="container-custom py-2 flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <AlertTriangle className="w-4 h-4 text-accent-foreground" />
          <span className="font-heading font-bold text-sm text-accent-foreground">عاجل</span>
        </div>
        <div className="overflow-hidden">
          <p className="animate-slide-rtl whitespace-nowrap text-sm font-medium text-accent-foreground">
            {breakingNews}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;

import { useState, useEffect } from "react";
import { collection, query, where, getDocs, Timestamp, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

type NewsItem = {
  id: string;
  title: string;
  content: string;
  createdAt?: Timestamp;
};

const BreakingNews = () => {
  const [todayNews, setTodayNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayNews = async () => {
      try {
        // Get start and end of today
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

        // Convert to Firestore Timestamps
        const startTimestamp = Timestamp.fromDate(startOfDay);
        const endTimestamp = Timestamp.fromDate(endOfDay);

        // Query news where date is within today, ordered by date descending
        const q = query(
          collection(db, "News"),
          where("date", ">=", startTimestamp),
          where("date", "<=", endTimestamp),
          orderBy("date", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          createdAt: doc.data().date
        } as NewsItem));

        setTodayNews(data);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayNews();
  }, []);

  if (loading || todayNews.length === 0) {
    return null;
  }

  // Build the news string — Arabic text is naturally RTL, no word manipulation needed
  const fullContent = todayNews
    .map((item, index) => `${index + 1}. ${item.title} | ${item.content}`)
    .join("   ●   ") + "   ●   ";

  return (
    <div className="w-full bg-gold text-black py-2 overflow-hidden shadow-lg border-b border-black/10">
      <div className="flex items-center gap-4 px-4 md:px-8">
        {/* Label */}
        <div className="flex-shrink-0 bg-black text-gold px-4 py-1 rounded-md font-bold text-sm whitespace-nowrap">
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            عاجل
          </span>
        </div>

        {/* Ticker track — overflow hidden clips the scrolling text */}
        <div className="flex-1 overflow-hidden">
          {/*
            The inner div is twice as wide (two copies side-by-side).
            animate-marquee-rtl slides it from 0 → -50%, which moves
            exactly one copy's width, then loops seamlessly.
            dir="rtl" ensures Arabic characters render right-to-left.
          */}
          <div
            className="flex whitespace-nowrap animate-marquee-rtl hover:[animation-play-state:paused] cursor-pointer"
          >
            {/* dir="rtl" on each link so Arabic text renders correctly, NOT on the flex container */}
            <Link href="/news" dir="rtl" className="text-sm font-bold text-black flex-shrink-0 px-8">
              {fullContent}
            </Link>
            {/* Exact duplicate for seamless loop */}
            <Link href="/news" dir="rtl" className="text-sm font-bold text-black flex-shrink-0 px-8" aria-hidden="true">
              {fullContent}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;

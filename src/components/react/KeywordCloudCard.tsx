import { Bot, Search } from "lucide-react";

const KEYWORDS = [
  "delta airlines",
  "what is an airbnb",
  "how old to rent an airbnb",
  "ai content writing",
  "ai tools",
  "marketers",
  "generate blog posts",
  "social media caption",
  "running shoes",
  "best seo practices",
  "keyword research",
  "content strategy",
  "blog ideas",
  "landing page copy",
  "email subject lines",
  "meta description",
  "long tail keywords",
  "search intent",
  "featured snippets",
  "local seo",
  "e-e-a-t",
  "core web vitals",
  "schema markup",
  "internal linking",
];

function KeywordStrip({
  keywords,
  colorClass,
  id,
}: {
  keywords: string[];
  colorClass: string;
  id: string;
}) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 py-1"
      style={{ minHeight: "min-content" }}
    >
      {keywords.map((keyword, i) => (
        <span
          key={`${id}-${i}-${keyword}`}
          className={`text-sm font-medium whitespace-nowrap leading-tight ${colorClass}`}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}

export default function KeywordCloudCard() {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden">
      {/* Top: keyword cloud + circle */}
      <div className="relative overflow-hidden min-h-[240px]">
        {/* Scrolling layer - gray keywords (full) */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex flex-col items-center w-full"
            style={{
              animation: "keywordScroll 20s linear infinite",
            }}
          >
            <KeywordStrip id="gray-1" keywords={KEYWORDS} colorClass="text-gray-300/90" />
            <KeywordStrip id="gray-2" keywords={KEYWORDS} colorClass="text-gray-300/90" />
          </div>
        </div>

        {/* Scrolling layer - blue keywords (clipped to circle) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "circle(70px at 50% 45%)" }}
        >
          <div
            className="flex flex-col items-center w-full"
            style={{
              animation: "keywordScroll 20s linear infinite",
            }}
          >
            <KeywordStrip id="blue-1" keywords={KEYWORDS} colorClass="text-blue-500" />
            <KeywordStrip id="blue-2" keywords={KEYWORDS} colorClass="text-blue-500" />
          </div>
        </div>

        {/* Transparent white overlay – circle area stays clear */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-yellow-50/60 via-transparent to-orange-100/60"
          style={{
            maskImage: "radial-gradient(circle 70px at 50% 45%, transparent 70px, black 70px)",
            WebkitMaskImage: "radial-gradient(circle 70px at 50% 45%, transparent 70px, black 70px)",
          }}
          aria-hidden
        />

        {/* Center circle overlay - scanning loader */}
        <div
          className="absolute left-1/2 top-[45%] z-10 flex h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/40 shadow-sm"
          aria-hidden
        >
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 140 140"
          >
            <defs>
              <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="70%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#86efac" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle
              cx="70"
              cy="70"
              r="64"
              fill="none"
              stroke="url(#scanGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="80 320"
              style={{
                animation: "scanSweep 3s linear infinite",
                transformOrigin: "70px 70px",
              }}
            />
          </svg>
          <div className="relative">

          <Bot className="relative z-10 h-12 w-12 text-gray-500 bg-white/70 rounded-full" aria-hidden />
          <Search className="absolute -bottom-1 -right-1 z-10 h-6 w-6 text-gray-500 bg-white/70 rounded-full" aria-hidden />

          </div>
        </div>

        {/* SCRAPING SERPS tag */}
        {/* <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-500">
            ANALYZING KEYWORDS
          </span>
        </div> */}
      </div>

      <style>{`
        @keyframes keywordScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scanSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

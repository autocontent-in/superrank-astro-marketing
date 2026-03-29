import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type ChecklistItem = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  suggestion?: string;
};

const SEO_ITEMS: ChecklistItem[] = [
  { id: "1", label: "Meta title & description present", status: "pass" },
  { id: "2", label: "H1 tag unique and descriptive", status: "pass" },
  {
    id: "3",
    label: "Canonical URL set",
    status: "warn",
    suggestion: "Add canonical tag to avoid duplicate content.",
  },
  {
    id: "4",
    label: "Image alt text coverage",
    status: "warn",
    suggestion: "3 images missing alt text.",
  },
  {
    id: "5",
    label: "Internal linking structure",
    status: "fail",
    suggestion: "Add 5–10 internal links to related pages.",
  },
  { id: "6", label: "Page load speed (LCP)", status: "pass" },
  { id: "7", label: "Mobile-friendly markup", status: "pass" },
  {
    id: "8",
    label: "Structured data (Schema)",
    status: "warn",
    suggestion: "Add Article or FAQ schema for rich snippets.",
  },
];

const GEO_ITEMS: ChecklistItem[] = [
  {
    id: "1",
    label: "Generative engine visibility",
    status: "warn",
    suggestion: "Optimize for AI answer snippets.",
  },
  { id: "2", label: "Clear, scannable content", status: "pass" },
  { id: "3", label: "Entity-focused headings", status: "pass" },
  {
    id: "4",
    label: "Factual, cited statements",
    status: "warn",
    suggestion: "Add 2–3 authoritative citations.",
  },
  {
    id: "5",
    label: "Answer-first paragraphs",
    status: "fail",
    suggestion: "Lead with a direct answer in first 100 words.",
  },
  {
    id: "6",
    label: "Structured Q&A format",
    status: "warn",
    suggestion: "Use FAQ blocks where relevant.",
  },
  { id: "7", label: "E-E-A-T signals", status: "pass" },
  { id: "8", label: "Content depth & completeness", status: "pass" },
];

const CATEGORY_SCORES = [
  { name: "SEO", value: 72, color: "#2563eb" },
  { name: "GEO", value: 65, color: "#3b82f6" },
  { name: "Technical", value: 88, color: "#a855f7" },
  { name: "Content", value: 78, color: "#eab308" },
  { name: "UX", value: 82, color: "#06b6d4" },
];

const OVERALL_SCORE = 76;

function StatusBadge({ status }: { status: ChecklistItem["status"] }) {
  const styles = {
    pass: "bg-blue-100 text-blue-800",
    warn: "bg-amber-100 text-amber-800",
    fail: "bg-red-100 text-red-800",
  };
  const labels = { pass: "Pass", warn: "Improve", fail: "Fix" };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default function SeoGeoChecklist() {
  const scoreDonutOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: "donut" },
      labels: ["Score", "Remaining"],
      colors: ["#2563eb", "#e5e7eb"],
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "80%",
            labels: {
              show: true,
              name: { show: false },
              value: {
                show: true,
                fontSize: "28px",
                fontWeight: 700,
                color: "#111827",
                formatter: () => `${OVERALL_SCORE}`,
              },
              total: {
                show: true,
                label: "Overall",
                fontSize: "12px",
                color: "#6b7280",
                formatter: () => `${OVERALL_SCORE}`,
              },
            },
          },
        },
      },
      legend: { show: false },
      stroke: { width: 5, lineCap: "round" },
    }),
    [],
  );

  const scoreDonutSeries = useMemo(
    () => [OVERALL_SCORE, 100 - OVERALL_SCORE],
    [],
  );

  const categoryDonutOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: "donut" },
      labels: CATEGORY_SCORES.map((c) => c.name),
      colors: CATEGORY_SCORES.map((c) => c.color),
      dataLabels: {
        enabled: false,
        formatter: (val: number) => (val ? Math.round(val) + "%" : ""),
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80%",
            labels: {
              show: false,
              name: { show: false, fontSize: "12px" },
              value: { show: false, fontSize: "14px", fontWeight: 600 },
              total: { show: true, label: "Categories", fontSize: "12px" },
            },
          },
        },
      },
      legend: { position: "bottom", horizontalAlign: "center" },
      stroke: { width: 4, colors: ["#fff"] },
    }),
    [],
  );

  const categoryDonutSeries = useMemo(
    () => CATEGORY_SCORES.map((c) => c.value),
    [],
  );

  const barOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
        fontFamily: "inherit",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 10,
          barHeight: "70%",
          distributed: true,
        },
      },
      colors: CATEGORY_SCORES.map((c) => c.color),
      dataLabels: {
        enabled: false,
        formatter: (val: number) => val + "%",
        style: { fontSize: "10px" },
      },
      xaxis: {
        categories: CATEGORY_SCORES.map((c) => c.name),
        max: 100,
        tickAmount: 5,
        labels: { style: { fontSize: "11px" } },
      },
      yaxis: { labels: { style: { fontSize: "11px" } } },
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
      },
      legend: { show: false },
      tooltip: {
        y: { formatter: (val: number) => val + "%" },
      },
    }),
    [],
  );

  const barSeries = useMemo(
    () => [{ name: "Score", data: CATEGORY_SCORES.map((c) => c.value) }],
    [],
  );

  return (
    <div className="p-4 flex flex-col bg-white/65 rounded-2xl backdrop-blur-sm">
      <div className="relative overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]">
        <div className="border-b border-gray-200 bg-gray-50/80 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-gray-300"></span>
                <span className="h-3 w-3 rounded-full bg-gray-300"></span>
                <span className="h-3 w-3 rounded-full bg-gray-300"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-6 px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-pink-500 flex space-x-2 items-center">
              <span>acme.com</span>
              <span className="text-lg text-blue-600 font-mono font-semibold">
                [ {OVERALL_SCORE} / 100 ]
              </span>
            </h1>
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-3">
            {/* Overall score donut */}
            <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <p className="mb-2 text-sm font-medium text-gray-600">
                Overall Website Score
              </p>
              <div className="w-full max-w-[200px]">
                <Chart
                  options={scoreDonutOptions}
                  series={scoreDonutSeries}
                  type="donut"
                  height={200}
                />
              </div>
            </div>

            {/* Category donut */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <p className="mb-2 text-center text-sm font-medium text-gray-600">
                Category Breakdown
              </p>
              <Chart
                options={categoryDonutOptions}
                series={categoryDonutSeries}
                type="donut"
                height={220}
              />
            </div>

            {/* Bar chart */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <p className="mb-2 text-sm font-medium text-gray-600">
                Scores by Category
              </p>
              <Chart
                options={barOptions}
                series={barSeries}
                type="bar"
                height={220}
              />
            </div>
          </div>

          {/* Checklists */}
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900">
                <span className="rounded bg-blue-100 p-1.5 text-blue-600">
                  SEO
                </span>
                Suggestions &amp; improvements
              </h3>
              <ul className="mt-8 space-y-4">
                {SEO_ITEMS.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-start justify-between text-sm border-b border-gray-300 border-dashed pb-4"
                  >
                    <div className="flex flex-col">
                      <p className="text-gray-700">{item.label}</p>
                      {item.suggestion && (
                        <p className="mt-2 text-xs text-gray-500">
                          {item.suggestion}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StatusBadge status={item.status} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900">
                <span className="rounded bg-blue-100 p-1.5 text-blue-600">
                  GEO
                </span>
                Suggestions &amp; improvements
              </h3>
              <ul className="mt-8 space-y-4">
                {GEO_ITEMS.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-start justify-between text-sm border-b border-gray-300 border-dashed pb-4"
                  >
                    <div className="flex flex-col">
                      <p className="text-gray-700">{item.label}</p>
                      {item.suggestion && (
                        <p className="mt-2 text-xs text-gray-500">
                          {item.suggestion}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={item.status} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

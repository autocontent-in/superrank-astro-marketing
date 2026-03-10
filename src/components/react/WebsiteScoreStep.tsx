import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Check, Circle } from "lucide-react";

type ChecklistItem = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  suggestion?: string;
};

const SEO_SAMPLE: ChecklistItem[] = [
  { id: "1", label: "Meta title & description present", status: "pass" },
  {
    id: "2",
    label: "Canonical URL set",
    status: "warn",
    suggestion: "Add canonical tag to avoid duplicate content.",
  },
];

const GEO_SAMPLE: ChecklistItem[] = [
  { id: "1", label: "Clear, scannable content", status: "pass" },
  {
    id: "2",
    label: "Factual, cited statements",
    status: "warn",
    suggestion: "Add 2–3 authoritative citations.",
  },
  {
    id: "3",
    label: "Answer-first paragraphs",
    status: "fail",
    suggestion: "Lead with a direct answer in first 100 words.",
  },
];

const OVERALL_SCORE = 76;

function StatusBadge({ status }: { status: ChecklistItem["status"] }) {
  const styles = {
    pass: "text-green-500",
    warn: "text-amber-500",
    fail: "text-red-500",
  };
  const labels = { pass: "Pass", warn: "Improve", fail: "Fix" };
  return (
    <span className={`rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function SkeletonLine({ width = "100%" }: { width?: string }) {
  return (
    <div className="h-3 rounded bg-gray-200" style={{ width }} />
  );
}

export default function WebsiteScoreStep() {
  const scoreDonutOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: "donut" },
      labels: ["Score", "Remaining"],
      colors: ["#22c55e", "#e5e7eb"],
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: { show: false },
              value: {
                show: true,
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
                formatter: () => `${OVERALL_SCORE}`,
              },
              total: {
                show: true,
                label: "Overall",
                fontSize: "22px",
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

  return (
    <div className="flex flex-col border-t border-l border-gray-200 p-6 pb-6 rounded-tl-xl bg-white">
      <div className="grid grid-cols-2 gap-4">
        {/* Donut: Website score */}
        <div className="w-full flex items-center space-x-4 rounded-xl border border-gray-200 bg-gray-50 py-2 px-4">
          <div className="w-2/5">
            <Chart
              options={scoreDonutOptions}
              series={scoreDonutSeries}
              type="donut"
              height={90}
            />
          </div>
          <div className="w-3/5">
            <p className="text-lg font-normal text-gray-700">Overall Score</p>
            <p className="text-xl font-mono text-green-600">
              {OVERALL_SCORE} / 100
            </p>
          </div>
        </div>
        {/* Donut: Website score */}
        <div className="w-full flex items-center space-x-4 rounded-xl border border-gray-200 bg-gray-50 py-2 px-4">
          <div className="w-4/5">
            <p className="text-lg font-normal text-gray-700">Keyword Density</p>
            <p className="text-xl font-mono text-green-600">1.8 %</p>
          </div>
        </div>
      </div>

      {/* SEO & GEO checklist recommendations */}
      <div className="mt-6 grid gap-4 sm:grid-cols-1">
        <div>
          <h3 className="mt-2 mb-4  font-semibold flex items-center gap-2 text-sm text-gray-800">SEO checks</h3>
          <ul className="space-y-4">
            {SEO_SAMPLE.map((item) => (
              <li key={item.id} className="flex space-x-2 text-xs">
                <Check className="w-4 h-4 shrink-0 text-green-500" />
                <span className="text-gray-700">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mt-4 mb-4 font-semibold flex items-center gap-2 text-sm text-gray-800">GEO - areas needs improvement</h3>
          <ul className="space-y-4">
            {GEO_SAMPLE.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2">
                  <Circle className="w-3 h-3 shrink-0 text-amber-500" />
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">{item.label}</span>
                    {item.suggestion && (
                      <span className="text-right text-[11px] text-gray-500">
                        [ {item.suggestion} ]
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <StatusBadge status={item.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skeleton loaders for "rest" content */}
      <div className="mt-5 space-y-4">
        <div className="flex items-center space-x-2">
          <SkeletonLine width="3%" />
          <SkeletonLine width="60%" />
        </div>
        <div className="flex items-center space-x-2">
          <SkeletonLine width="3%" />
          <SkeletonLine width="40%" />
        </div>

        <div className="flex items-center justify-between">
          <div className="w-full flex items-center space-x-2">
            <SkeletonLine width="3%" />
            <SkeletonLine width="80%" />
          </div>
          <SkeletonLine width="10%" />
        </div>
      </div>
    </div>
  );
}

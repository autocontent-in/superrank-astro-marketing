import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const METRICS = [
  { label: "All Bot Visits", value: "32.6K", change: "+12k" },
  { label: "AI Citations", value: "72.3K", change: "+12k" },
  { label: "Human Referrals", value: "13.2K", change: "+0.3k" },
  { label: "AI Indexing", value: "18.2K", change: "+0.2k" },
];

// Sample time series: 6 days, 6 series (ChatGPT, Anthropic, Perplexity, Google AI, Microsoft, Others)
const CHART_COLORS = ["#3b82f6", "#dc2626", "#06b6d4", "#ea580c", "#7c3aed", "#6b7280"];
const AGENT_NAMES = ["ChatGPT", "Anthropic", "Perplexity", "Google AI", "Microsoft", "Others"];

function generateSampleSeries() {
  const days = 6;
  return AGENT_NAMES.map((_, i) => ({
    name: AGENT_NAMES[i],
    data: Array.from({ length: days }, () => Math.round(80 + Math.random() * 400)),
  }));
}

const SAMPLE_CATEGORIES = ["Apr 12", "Apr 13", "Apr 14", "Apr 15", "Apr 16", "Apr 17"];
const SERIES = generateSampleSeries();

export default function AgentAnalyticsStep() {
  const lineChartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        toolbar: { show: false },
        fontFamily: "inherit",
        zoom: { enabled: false },
        animations: { enabled: true },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: CHART_COLORS,
      dataLabels: { enabled: false },
      xaxis: {
        categories: SAMPLE_CATEGORIES,
        labels: {
          style: { colors: "#6b7280", fontSize: "11px" },
        },
        axisBorder: { show: true, color: "#e5e7eb" },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { colors: "#6b7280", fontSize: "11px" },
        },
        axisBorder: { show: false },
        min: 0,
        tickAmount: 4,
      },
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
      },
      legend: { show: false },
      tooltip: {
        theme: "light",
        shared: true,
        intersect: false,
        x: {
          formatter: (_, { dataPointIndex }) => {
            const totals = SERIES.reduce(
              (sum, s) => sum + (s.data[dataPointIndex] ?? 0),
              0
            );
            return `All visits · ${SAMPLE_CATEGORIES[dataPointIndex] ?? ""} — Total: ${totals}`;
          },
        },
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const total = series.flatMap((s: any) => s).reduce((a: any, b: any) => a + b, 0);
          const rows = AGENT_NAMES.map(
            (name, i) =>
              `<tr><td style="padding:4px 8px 2px 0;color:#374151">${name}</td><td style="text-align:right;padding:4px 0 2px 8px;font-weight:600;color:#111827">${series[i]?.[dataPointIndex] ?? 0}</td></tr>`
          ).join("");
          return `
            <div class="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg" style="min-width:180px">
              <div class="flex justify-between items-center mb-2 text-xs">
                <span class="font-semibold text-gray-700">All visits</span>
                <span class="text-gray-500">${SAMPLE_CATEGORIES[dataPointIndex] ?? ""}</span>
              </div>
              <table style="width:100%;font-size:12px">
                ${rows}
                <tr><td style="padding:4px 8px 2px 0;font-weight:600;color:#374151">Total</td><td style="text-align:right;padding:4px 0 2px 8px;font-weight:700;color:#111827">${total}</td></tr>
              </table>
            </div>
          `;
        },
      },
      markers: {
        size: 3,
        strokeWidth: 1,
        hover: { size: 5 },
      },
    }),
    []
  );

  const lineSeries = useMemo(() => SERIES, []);

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Top: copy + CTA */}
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold tracking-tight text-gray-800">
          Agent Analytics
        </h3>
        <p className="mt-4 text-base text-gray-500">
          Track how your site is interpreted and crawled by ChatGPT, Gemini,
          Claude, Perplexity, and more.
        </p>
      </div>

      {/* Bottom: metrics + chart */}
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3"
            >
              <p className="text-xs font-medium text-gray-500">{m.label}</p>
              <p className="mt-1 text-xl font-bold text-gray-900">{m.value}</p>
              <p className="mt-0.5 text-xs font-medium text-green-600">{m.change}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
          <Chart
            options={lineChartOptions}
            series={lineSeries}
            type="line"
            height={280}
          />
        </div>
      </div>
    </div>
  );
}

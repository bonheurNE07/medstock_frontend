import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip, Title);

interface ChartEntry {
  medicine: string;
  unit: string;
  totalUsed: number;
  period: string;
}

interface WeeklyCenterChartProps {
  centerName: string;
  data: ChartEntry[];
}

const WeeklyCenterChart: React.FC<WeeklyCenterChartProps> = ({ centerName, data }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(match.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  const periods = [...new Set(data.map((item) => item.period))];
  const medicines = [...new Set(data.map((item) => item.medicine))];

  const colors = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444",
    "#6366F1", "#8B5CF6", "#06B6D4", "#EC4899",
  ];

  const datasets = medicines.map((medicine, idx) => ({
    label: medicine,
    data: periods.map(
      (p) => data.find((item) => item.medicine === medicine && item.period === p)?.totalUsed || 0
    ),
    borderColor: colors[idx % colors.length],
    backgroundColor: colors[idx % colors.length],
    fill: false,
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 5,
  }));

  const tickColor = isDarkMode ? "#E5E7EB" : "#374151";
  const gridColor = isDarkMode ? "#4B5563" : "#D1D5DB";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
          color: tickColor,
          font: { size: 11 },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        bodyFont: { size: 11 },
        titleFont: { size: 12 },
        callbacks: {
          label: (ctx: any) => `${ctx.dataset.label}: ${ctx.raw}`,
        },
      },
    },
    layout: {
      padding: { top: 10, bottom: 5 },
    },
    scales: {
      x: {
        ticks: {
          color: tickColor,
          autoSkip: true,
          maxTicksLimit: 15,
          font: { size: 10 },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: tickColor,
          font: { size: 11 },
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-[#181818] text-gray-800 dark:text-gray-100 rounded-xl shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-2">{`📊 Consommation hebdo – ${centerName}`}</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px] md:min-w-[800px] lg:min-w-[1000px] h-[260px] sm:h-[300px]">
          <Line data={{ labels: periods, datasets }} options={options} />
        </div>
      </div>
    </div>
  );
};

export default WeeklyCenterChart;

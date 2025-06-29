import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

interface TopMedicine {
  name: string;
  totalUsed: number;
  unit: string;
}

const TopUsedMedicinesChart: React.FC<{ data: TopMedicine[] }> = ({ data }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(match.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  const labels = data.map((item) => item.name);
  const values = data.map((item) => item.totalUsed);

  const palette = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1",
    "#14B8A6", "#EC4899", "#8B5CF6", "#22C55E", "#F472B6"
  ];
  const backgroundColors = values.map((_, i) => palette[i % palette.length]);

  const tickColor = isDarkMode ? "#E5E7EB" : "#374151";
  const gridColor = isDarkMode ? "#4B5563" : "#D1D5DB";

  const chartData = {
    labels,
    datasets: [
      {
        label: "Utilisation Totale",
        data: values,
        backgroundColor: backgroundColors,
        borderRadius: 6,
        maxBarThickness: 32,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const med = data[ctx.dataIndex];
            return `${med.name}: ${med.totalUsed} ${med.unit}`;
          },
        },
      },
    },
    layout: {
      padding: { top: 10, bottom: 10, left: 5, right: 5 },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: tickColor,
          font: { size: 12 },
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: tickColor,
          font: { size: 12 },
          callback: function (label: string | number) {
            const str = label.toString();
            return str.length > 25 ? str.slice(0, 25) + "…" : str;
          },
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-[#181818] text-gray-800 dark:text-gray-100 rounded-xl shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-3">
        📊 Top 5 Médicaments les Plus Utilisés
      </h3>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[400px] md:min-w-[600px] h-[300px] sm:h-[380px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TopUsedMedicinesChart;

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

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    match.addEventListener("change", handleChange);

    return () => match.removeEventListener("change", handleChange);
  }, []);

  const labels = data.map((item) => item.name);
  const usageData = data.map((item) => item.totalUsed);

  const colorPalette = [
    "rgba(59, 130, 246, 0.7)",   // blue-500
    "rgba(16, 185, 129, 0.7)",   // green-500
    "rgba(245, 158, 11, 0.7)",   // yellow-500
    "rgba(239, 68, 68, 0.7)",    // red-500
    "rgba(99, 102, 241, 0.7)",   // indigo-500
  ];

  const backgroundColors = usageData.map((_, i) => colorPalette[i % colorPalette.length]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Utilisation Totale",
        data: usageData,
        backgroundColor: backgroundColors,
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  };

  const tickColor = isDarkMode ? "#E5E7EB" : "#374151";
  const gridColor = isDarkMode ? "#4B5563" : "#D1D5DB";

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const medicine = data[context.dataIndex];
            return `${medicine.name}: ${medicine.totalUsed} ${medicine.unit}`;
          },
        },
      },
    },
    layout: {
      padding: { top: 10, bottom: 10 },
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
    <div className="bg-white dark:bg-[#181818] rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Top 5 Médicaments les Plus Utilisés
      </h3>
      <div className="h-[300px] sm:h-[400px] w-full overflow-x-auto">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TopUsedMedicinesChart;

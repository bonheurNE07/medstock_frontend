import { useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import type { Receipt } from "../stock/ReceiptTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

interface Props {
  receipts: Receipt[];
}

const generateColors = (count: number) => {
  const palette = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1",
    "#EC4899", "#14B8A6", "#8B5CF6", "#22C55E", "#F472B6"
  ];
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
};

const prepareChartData = (
  receipts: Receipt[],
  groupBy: "medicine" | "date"
) => {
  const map: Record<string, number> = {};
  receipts.forEach((r) => {
    const key = groupBy === "medicine" ? r.medicine_name : r.received_date;
    map[key] = (map[key] || 0) + r.quantity_received;
  });
  const labels = Object.keys(map).sort();
  const values = labels.map((label) => map[label]);
  const colors = generateColors(labels.length);

  return {
    labels,
    datasets: [
      {
        label:
          groupBy === "medicine"
            ? "Quantité totale par médicament"
            : "Quantité totale par date",
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: { font: { size: 10 } },
    },
    title: { display: false },
    tooltip: {
      bodyFont: { size: 10 },
      titleFont: { size: 11 },
    },
  },
  scales: {
    x: {
      ticks: { font: { size: 10 } },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: { font: { size: 10 } },
    },
  },
};

const ReceiptChartsScrollable = ({ receipts }: Props) => {
  const byMedicineData = useMemo(
    () => prepareChartData(receipts, "medicine"),
    [receipts]
  );
  const byDateData = useMemo(
    () => prepareChartData(receipts, "date"),
    [receipts]
  );

  return (
    <div className="mt-6 overflow-x-auto">
      <div className="flex space-x-4 w-max">
        <div className="min-w-[300px] max-w-[600px] bg-white dark:bg-[#181818] p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-2">
            Bar — Par Médicament
          </h3>
          <Bar data={byMedicineData} options={chartOptions} />
        </div>
        <div className="min-w-[300px] max-w-[600px] bg-white dark:bg-[#181818] p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-2">
            Bar — Par Date
          </h3>
          <Bar data={byDateData} options={chartOptions} />
        </div>
        <div className="min-w-[300px] max-w-[600px] bg-white dark:bg-[#181818] p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-2">
            Line — Par Médicament
          </h3>
          <Line data={byMedicineData} options={chartOptions} />
        </div>
        <div className="min-w-[300px] max-w-[600px] bg-white dark:bg-[#181818] p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-100 mb-2">
            Line — Par Date
          </h3>
          <Line data={byDateData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ReceiptChartsScrollable;

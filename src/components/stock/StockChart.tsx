import React, { useMemo } from "react";
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
import type { Stock } from "../../types/models";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

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
  stocks: Stock[];
  title: string;
}


const generateColors = (count: number) => {
  const palette = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1",
    "#EC4899", "#14B8A6", "#8B5CF6", "#22C55E", "#F472B6"
  ];
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
};

const StockChart: React.FC<Props> = ({ stocks, title }) => {
  const chartByMedicine = useMemo(() => {
    const map: Record<string, number> = {};
    stocks.forEach((stock) => {
      const key = stock.medicine_name || "Inconnu";
      map[key] = (map[key] || 0) + stock.total_quantity;
    });
    const labels = Object.keys(map).sort();
    const values = labels.map((label) => map[label]);
    const colors = generateColors(labels.length);
    return {
      labels,
      datasets: [
        {
          label: "Quantité totale par médicament",
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };
  }, [stocks]);

  const chartByDate = useMemo(() => {
    const map: Record<string, number> = {};
    stocks.forEach((stock) => {
      const key = format(new Date(stock.last_updated), "dd/MM/yyyy");
      map[key] = (map[key] || 0) + stock.total_quantity;
    });
    const labels = Object.keys(map).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    const values = labels.map((label) => map[label]);
    const colors = generateColors(labels.length);
    return {
      labels,
      datasets: [
        {
          label: "Quantité totale par date",
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };
  }, [stocks]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { size: 10 } },
      },
      title: {
        display: true,
        text: "",
        font: { size: 12 },
      },
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

  return (
    <div className="overflow-x-auto space-x-4 flex snap-x snap-mandatory mt-6 pb-4">
      <Card className="min-w-[320px] snap-start shrink-0 dark:bg-[#181818]">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">{title} par médicament</h2>
          <Bar data={chartByMedicine} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "📊 Par médicament" } } }} />
        </CardContent>
      </Card>

      <Card className="min-w-[320px] snap-start shrink-0 dark:bg-[#181818]">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">{title} par date</h2>
          <Line data={chartByDate} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "📈 Par date" } } }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StockChart;

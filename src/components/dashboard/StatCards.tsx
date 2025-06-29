import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface StatCardsProps {
  totalReceived: number;
  totalMedicines: number;
  totalRemaining: number;
  centersCount: number;
  lastReceiptDate: string | null;
}

const StatCards: React.FC<StatCardsProps> = ({
  totalReceived,
  totalMedicines,
  totalRemaining,
  centersCount,
  lastReceiptDate,
}) => {
  const nf = new Intl.NumberFormat();

  const stats = [
    {
      label: "Total Reçu",
      value: nf.format(totalReceived ?? 0),
      bg: "bg-blue-100 dark:bg-blue-900/20",
      text: "text-blue-800 dark:text-blue-200",
    },
    {
      label: "Total Médicaments",
      value: nf.format(totalMedicines ?? 0),
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
      text: "text-emerald-800 dark:text-emerald-200",
    },
    {
      label: "Stock Restant",
      value: nf.format(totalRemaining ?? 0),
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
      text: "text-yellow-800 dark:text-yellow-200",
    },
    {
      label: "Centres Médicaux",
      value: nf.format(centersCount),
      bg: "bg-fuchsia-100 dark:bg-fuchsia-900/20",
      text: "text-fuchsia-800 dark:text-fuchsia-200",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`min-h-[110px] sm:min-h-[120px] lg:min-h-[130px] ${stat.bg} ${stat.text} rounded-xl transition-transform hover:scale-[1.02] shadow-md`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg sm:text-xl font-bold leading-tight">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm font-medium dark:text-gray-300">
              {stat.label}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Display Last Receipt Date */}
      {lastReceiptDate && (
        <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          Dernière réception :{" "}
          <strong>{new Date(lastReceiptDate).toLocaleDateString()}</strong>
        </p>
      )}
    </div>
  );
};

export default StatCards;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`min-h-[110px] ${stat.bg} ${stat.text} rounded-xl transition-transform hover:scale-[1.02] shadow-sm`}
          >
            <CardHeader className="pb-1">
              <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm font-medium text-muted-foreground dark:text-gray-300">
              {stat.label}
            </CardContent>
          </Card>
        ))}
      </div>

      {lastReceiptDate && (
        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          Dernière réception :{" "}
          <strong>{new Date(lastReceiptDate).toLocaleDateString()}</strong>
        </p>
      )}
    </div>
  );
};

export default StatCards;

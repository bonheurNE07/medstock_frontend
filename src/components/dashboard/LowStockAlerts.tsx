import React from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LowStockEntry {
  medicine_name: string;
  center_name: string;
  available_stock: number;
  unit: string;
}

const LowStockAlerts: React.FC<{ alerts: LowStockEntry[] }> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <Card className="bg-white dark:bg-[#181818] border dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-300">
          Alertes de Stock Faible
        </h3>
        <ScrollArea className="max-h-80 pr-2">
          <ul className="space-y-2 text-sm text-red-700 dark:text-red-400">
            {alerts.map((alert, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 mt-0.5 text-red-500 dark:text-red-300" />
                <span>
                  {alert.medicine_name.toLowerCase()} à {alert.center_name.toLowerCase()} —{" "}
                  {alert.available_stock} {alert.unit.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LowStockAlerts;

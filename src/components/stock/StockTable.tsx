import React from "react";
import type { Stock } from "../../types/models";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  stocks: Stock[];
}

const StockTable: React.FC<Props> = ({ stocks }) => {
  return (
    <Card className="text-gray-800 dark:text-gray-100 mt-6">
      <CardContent className="p-0">
        <div className="p-4 pb-1">
          <h2 className="text-lg font-semibold">📦 Stock actuel par centre</h2>
        </div>

        <ScrollArea className="w-full max-h-[450px] overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-[#212121]">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-400">Centre</th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-400">Médicament</th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-400">Quantité</th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-400">Mise à jour</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#181818]">
              {stocks.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                >
                  <td className="px-4 py-2 whitespace-nowrap">{item.center_name.toLowerCase()}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.medicine_name.toLowerCase()}</td>
                  <td className="px-4 py-2 font-semibold text-green-600 dark:text-green-400 whitespace-nowrap">
                    {item.total_quantity}
                  </td>
                  <td className="px-4 py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {new Date(item.last_updated).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {stocks.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                    Aucun stock trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StockTable;

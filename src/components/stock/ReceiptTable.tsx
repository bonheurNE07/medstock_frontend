import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Receipt {
  id: number;
  center: number;
  center_name: string;
  medicine: number;
  medicine_name: string;
  unit: string;
  quantity_received: number;
  exp_date: string;
  received_date: string;
}

interface Props {
  receipts: Receipt[];
}

const ReceiptTable = ({ receipts }: Props) => {
  return (
    <Card className="dark:bg-[#181818] mt-8">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Médicaments reçus
        </h2>

        <ScrollArea className="max-h-[450px] overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-[#212121]">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Centre</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Médicament</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Quantité</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Péremption</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Réception</th>
              </tr>
            </thead>
            <tbody className="dark:bg-[#181818] bg-white">
              {receipts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-6">
                    Aucun reçu trouvé.
                  </td>
                </tr>
              ) : (
                receipts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                  >
                    <td className="px-4 py-2 text-gray-800 dark:text-white whitespace-nowrap">
                      {item.center_name}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-white whitespace-nowrap">
                      {item.medicine_name}
                    </td>
                    <td className="px-4 py-2 font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {item.quantity_received}
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {item.exp_date}
                    </td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {item.received_date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ReceiptTable;

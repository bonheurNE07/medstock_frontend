import React from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StockEntry {
  center_name: string;
  medicine_name: string;
  available_stock: number;
  unit: string;
}

const StockPerCenterTable: React.FC<{ data: StockEntry[] }> = ({ data }) => {
  return (
    <Card className="bg-white dark:bg-[#181818] border dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Stock Disponible par Centre
        </h3>

        <ScrollArea className="w-full overflow-x-auto">
          <Table className="min-w-[640px] text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700">
                <TableHead className="whitespace-nowrap">Centre</TableHead>
                <TableHead className="whitespace-nowrap">Médicament</TableHead>
                <TableHead className="whitespace-nowrap">Quantité</TableHead>
                <TableHead className="whitespace-nowrap">Unité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <TableCell className="capitalize text-gray-700 dark:text-gray-100">{entry.center_name}</TableCell>
                  <TableCell className="capitalize text-gray-700 dark:text-gray-100">{entry.medicine_name}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-100">{entry.available_stock}</TableCell>
                  <TableCell className="capitalize text-gray-700 dark:text-gray-100">{entry.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StockPerCenterTable;

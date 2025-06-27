import React from "react";
import { Receipt } from "@/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecentReceiptsTable: React.FC<{ receipts: Receipt[] }> = ({ receipts }) => {
  return (
    <Card className="bg-white dark:bg-[#181818] border dark:border-gray-700">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Réceptions Récentes
        </h3>
        <ScrollArea className="w-full overflow-x-auto">
          <Table className="min-w-[640px] text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700">
                <TableHead>Centre</TableHead>
                <TableHead>Médicament</TableHead>
                <TableHead>Unité</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Date de Péremption</TableHead>
                <TableHead>Date de Réception</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((r, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <TableCell className="text-gray-700 dark:text-gray-100">{r.center_name.toLowerCase()}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-100">{r.medicine_name.toLowerCase()}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-100">{r.unit.toLowerCase()}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-100">{r.quantity__received}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-100">{r.expiration_date}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-100">{r.received__date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentReceiptsTable;

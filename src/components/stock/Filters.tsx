import type { Center } from "../../types/models";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  centers: Center[];
  selectedCenter: number | null;
  onCenterChange: (centerId: number | null) => void;
  medicineSearch: string;
  onMedicineSearchChange: (val: string) => void;
  startDate: string;
  onStartDateChange: (val: string) => void;
  endDate: string;
  onEndDateChange: (val: string) => void;
}

const Filters = ({
  centers,
  selectedCenter,
  onCenterChange,
  medicineSearch,
  onMedicineSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 dark:bg-[#181818] p-4 rounded-2xl shadow-md border border-gray-700">
      {/* Center selection */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="center" className="text-gray-700 dark:text-gray-300 text-sm">
          Centre médical
        </Label>
        <Select
          onValueChange={(val) => onCenterChange(val ? parseInt(val) : null)}
          value={selectedCenter?.toString() || ""}
        >
          <SelectTrigger className="dark:bg-[#181818] dark:text-gray-200 border-gray-600">
            <SelectValue placeholder="Tous les centres" />
          </SelectTrigger>
          <SelectContent className="dark:bg-[#181818] dark:text-gray-200 border-gray-700">
            <SelectItem value="all">Tous les centres</SelectItem>
            {centers.map((c) => (
              <SelectItem key={c.id} value={c.id.toString()}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Medicine search */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="search" className="text-gray-700 dark:text-gray-300 text-sm">
          Médicament
        </Label>
        <Input
          id="search"
          placeholder="Rechercher un médicament"
          value={medicineSearch}
          onChange={(e) => onMedicineSearchChange(e.target.value)}
          className="dark:bg-[#212121] text-gray-700 dark:text-gray-300 border-gray-600 placeholder-gray-400"
        />
      </div>

      {/* Start date */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="start" className="text-gray-700 dark:text-gray-300 text-sm">
          Date de début
        </Label>
        <Input
          id="start"
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="dark:bg-[#212121] text-gray-700 dark:text-gray-300 border-gray-600"
        />
      </div>

      {/* End date */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="end" className="text-gray-700 dark:text-gray-300 text-sm">
          Date de fin
        </Label>
        <Input
          id="end"
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="dark:bg-[#212121] text-gray-700 dark:text-gray-300 border-gray-600"
        />
      </div>
    </div>
  );
};

export default Filters;

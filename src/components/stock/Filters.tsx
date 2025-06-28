import React from "react";
import { Center } from "../../types/models";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {/* Center Dropdown */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Centre médical
        </label>
        <select
          className="w-full rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-[#181818] text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCenter ?? ""}
          onChange={(e) =>
            onCenterChange(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">Tous les centres</option>
          {centers.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>
      </div>

      {/* Medicine Search */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Rechercher un médicament
        </label>
        <input
          type="text"
          placeholder="Ex: Paracétamol"
          value={medicineSearch}
          onChange={(e) => onMedicineSearchChange(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-[#181818] text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Date de début
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-[#181818] text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Date de fin
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-[#181818] text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Filters;

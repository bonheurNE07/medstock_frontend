interface Props {
  medicines: { id: number; name: string; unit: string }[];
}

export default function MedicineTable({ medicines }: Props) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="overflow-y-auto max-h-80">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-100">
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-[#181818]">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">ID</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Nom</th>
              <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Unité</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#212121] divide-y divide-gray-200 dark:divide-gray-700">
            {medicines.map((med, index) => (
              <tr
                key={med.id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-[#181818]" : ""
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-4 py-2">{med.id}</td>
                <td className="px-4 py-2 capitalize">{med.name}</td>
                <td className="px-4 py-2 capitalize">{med.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface Props {
  centers: { id: number; name: string }[];
}

export default function CenterTable({ centers }: Props) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl shadow border border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto max-h-64">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-100">
          <thead className="sticky top-0 bg-gray-100 dark:bg-[#212121] z-10">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">ID</th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Nom</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#181818] divide-y divide-gray-200 dark:divide-gray-700">
            {centers.map((center, ) => (
              <tr
                key={center.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-2">{center.id}</td>
                <td className="px-4 py-2">{center.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

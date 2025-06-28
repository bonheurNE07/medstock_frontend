import React, { useState } from "react";
import { createMedicine } from "../../services/stockService";

export default function MedicineForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !unit.trim()) return;

    setLoading(true);
    try {
      await createMedicine({ name, unit });
      setName("");
      setUnit("");
      onCreated();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white dark:bg-[#212121] border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 shadow-md flex flex-col md:flex-row md:items-end gap-4"
    >
      {/* Nom du Médicament */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nom du Médicament
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Paracétamol"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-[#181818] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
      </div>

      {/* Forme */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Forme
        </label>
        <input
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Ex: Flacon, Comprimé..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-[#181818] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
      </div>

      {/* Bouton Ajouter */}
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors w-full md:w-auto text-sm"
      >
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}

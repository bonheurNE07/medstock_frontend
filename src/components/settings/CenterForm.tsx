import React, { useState } from "react";
import { createCenter } from "../../services/stockService";

export default function CenterForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await createCenter({ name });
      setName("");
      onCreated();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white dark:bg-[#181818] border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-end gap-4"
    >
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Nom du Centre
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du Centre"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
      >
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}

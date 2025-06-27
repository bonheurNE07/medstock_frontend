import React, { useState } from "react";
import { uploadReceiptExcel } from "../../services/receiptService";

const ReceiptExcelUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && /\.(xlsx|xls)$/i.test(selected.name)) {
      setFile(selected);
      setMessage("");
    } else {
      setMessage("❌ Veuillez importer un fichier Excel valide (.xlsx ou .xls)");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Aucun fichier sélectionné.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      const result = await uploadReceiptExcel(file);
      setMessage(`✅ ${result.message || "Importation réussie"}`);
      setFile(null);
    } catch (error: any) {
      const detail = error?.response?.data?.error || "❌ Échec de l'importation.";
      setMessage(detail);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#181818] rounded-xl p-5 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        📥 Importer un fichier Excel
      </h2>

      {/* File Drop/Click Area */}
      <label
        htmlFor="receipt-excel-upload"
        className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition"
      >
        <div className="flex flex-col items-center pt-5 pb-6">
          <svg
            className="w-10 h-10 mb-3 text-gray-500 dark:text-gray-300"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-1 text-sm text-gray-600 dark:text-gray-200">
            <span className="font-semibold">Cliquez ou glissez un fichier</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Format accepté : .xlsx, .xls
          </p>
        </div>
        <input
          id="receipt-excel-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* File info + Upload button */}
      {file && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-gray-700 dark:text-gray-200 truncate w-full sm:w-auto">
            {file.name}
          </span>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition"
          >
            {uploading ? "Importation en cours..." : "Importer le fichier"}
          </button>
        </div>
      )}

      {/* Status Message */}
      {message && (
        <p
          className={`mt-4 text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ReceiptExcelUpload;

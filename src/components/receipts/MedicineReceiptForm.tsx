import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createMedicineReceipt } from "@/services/medicineReceiptService";
import { fetchCenters, fetchMedicines } from "@/services/stockService";
import type { Center, Medicine } from "../../types";

interface FormData {
  center: string;
  medicine: string;
  quantity_received: string;
  exp_date: Date;
  received_date: Date;
}

const MedicineReceiptForm: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      exp_date: new Date(),
      received_date: new Date(),
    },
  });

  useEffect(() => {
    fetchCenters().then(setCenters);
    fetchMedicines().then(setMedicines);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage("");
    try {
      await createMedicineReceipt({
        center: parseInt(data.center),
        medicine: parseInt(data.medicine),
        quantity_received: parseInt(data.quantity_received),
        exp_date: data.exp_date.toISOString().split("T")[0],
        received_date: data.received_date.toISOString().split("T")[0],
      });
      setMessage("✅ Entrée enregistrée avec succès.");
      resetField("quantity_received");
      resetField("exp_date");
    } catch (error) {
      setMessage("❌ Erreur lors de l’enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white dark:bg-[#191919] rounded-xl shadow p-4 sm:p-6 space-y-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        ➕ Ajouter une entrée de stock
      </h2>

      {/* Center select */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          Centre médical
        </label>
        <select
          {...register("center", { required: "Centre requis" })}
          className="w-full border rounded p-2 text-sm dark:bg-[#191919] dark:border-gray-600 dark:text-gray-200"
        >
          <option value="">-- Choisir un centre --</option>
          {centers.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>
        {errors.center && (
          <p className="text-sm text-red-600 mt-1">{errors.center.message}</p>
        )}
      </div>

      {/* Medicine select */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          Médicament
        </label>
        <select
          {...register("medicine", { required: "Médicament requis" })}
          className="w-full border rounded p-2 text-sm dark:bg-[#191919] dark:border-gray-600 dark:text-gray-200"
        >
          <option value="">-- Choisir un médicament --</option>
          {medicines.map((med) => (
            <option key={med.id} value={med.id}>
              {med.name}
            </option>
          ))}
        </select>
        {errors.medicine && (
          <p className="text-sm text-red-600 mt-1">{errors.medicine.message}</p>
        )}
      </div>

      {/* Quantity input */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          Quantité reçue
        </label>
        <input
          type="number"
          min={1}
          {...register("quantity_received", {
            required: "Quantité requise",
            min: { value: 1, message: "Quantité minimale : 1" },
          })}
          className="w-full border rounded p-2 text-sm dark:bg-[#191919] dark:border-gray-600 dark:text-gray-200"
        />
        {errors.quantity_received && (
          <p className="text-sm text-red-600 mt-1">
            {errors.quantity_received.message}
          </p>
        )}
      </div>

      {/* Dates: Expiry + Received */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            Date de réception
          </label>
          <Controller
            name="received_date"
            control={control}
            rules={{ required: "Date requise" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd/MM/yyyy"
                className="w-full border rounded p-2 text-sm dark:bg-[#191919] dark:border-gray-600 dark:text-gray-200"
              />
            )}
          />
          {errors.received_date && (
            <p className="text-sm text-red-600 mt-1">{errors.received_date.message}</p>
          )}
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            Date d'expiration
          </label>
          <Controller
            name="exp_date"
            control={control}
            rules={{ required: "Date requise" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd/MM/yyyy"
                className="w-full border rounded p-2 text-sm dark:bg-[#191919] dark:border-gray-600 dark:text-gray-200"
              />
            )}
          />
          {errors.exp_date && (
            <p className="text-sm text-red-600 mt-1">{errors.exp_date.message}</p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Enregistrement...
            </span>
          ) : (
            "Enregistrer"
          )}
        </button>
      </div>

      {/* Result message */}
      {message && (
        <p
          className={`text-sm mt-2 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default MedicineReceiptForm;

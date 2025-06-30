import { useEffect, useState, lazy, Suspense } from "react";
import { fetchCenters, fetchMedicines } from "../services/stockService";
import Loading from "./Loading";

// Lazy-loaded components
const CenterForm = lazy(() => import("../components/settings/CenterForm"));
const MedicineForm = lazy(() => import("../components/settings/MedicineForm"));
const CenterTable = lazy(() => import("../components/settings/CenterTable"));
const MedicineTable = lazy(() => import("../components/settings/MedicineTable"));

export default function SettingsPage() {
  const [centers, setCenters] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const loadData = async () => {
    const [c, m] = await Promise.all([fetchCenters(), fetchMedicines()]);
    setCenters(c);
    setMedicines(m);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 bg-white text-gray-900 dark:bg-[#181818] dark:text-gray-100">
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Ajouter un Centre Médical
        </h2>
        <Suspense fallback={<Loading />}>
          <CenterForm onCreated={loadData} />
          <CenterTable centers={centers} />
        </Suspense>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Ajouter un Médicament
        </h2>
        <Suspense fallback={<Loading />}>
          <MedicineForm onCreated={loadData} />
          <MedicineTable medicines={medicines} />
        </Suspense>
      </section>
    </div>
  );
}

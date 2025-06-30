import { lazy, Suspense } from "react";
import Loading from "./Loading"; // Reuse the loading spinner

// Lazy-load heavy components
const WeeklyReportForm = lazy(() => import("../components/reports/WeeklyReportForm"));
const WeeklyReportExcelUpload = lazy(() => import("../components/reports/WeeklyReportExcelUpload"));
const WeeklyReportExportButton = lazy(() => import("../components/reports/WeeklyReportExportButton"));

export default function ReportInsertionPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-10 max-w-6xl mx-auto bg-white dark:bg-[#181818] text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Ajouter un Rapport Hebdomadaire
      </h1>

      {/* Manual Form Section */}
      <Suspense fallback={<Loading />}>
        <section className="dark:bg-[#181818] rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-6 sm:p-8 space-y-4">
          <WeeklyReportForm />
        </section>
      </Suspense>

      {/* Excel Upload Section */}
      <Suspense fallback={<Loading />}>
        <section className="bg-gray-100 dark:bg-[#181818] rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-semibold">Importer un Fichier Excel</h2>
          <WeeklyReportExcelUpload />
        </section>
      </Suspense>

      {/* Export Section */}
      <Suspense fallback={<Loading />}>
        <section className="bg-gray-100 dark:bg-[#181818] rounded-2xl border border-gray-300 dark:border-gray-700 shadow-md p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-semibold">Exporter le Rapport Hebdomadaire</h2>
          <WeeklyReportExportButton />
        </section>
      </Suspense>
    </div>
  );
}

import { Suspense, lazy } from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import StatCards from "../components/dashboard/StatCards";
import Loading from "./Loading";

// Lazy-load big components
const WeeklyCenterChart = lazy(() => import("../components/dashboard/WeeklyCenterChart"));
const RecentReceiptsTable = lazy(() => import("../components/dashboard/RecentReceiptsTable"));
const LowStockAlerts = lazy(() => import("../components/dashboard/LowStockAlerts"));
const TopUsedMedicinesChart = lazy(() => import("../components/dashboard/TopUsedMedicinesChart"));
const StockPerCenterTable = lazy(() => import("../components/dashboard/StockPerCenterTable"));

const DashboardPage = () => {
  const { data: dashboard, loading } = useDashboardData();

  if (loading) return <Loading />;
  if (!dashboard)
    return (
      <div className="p-4 text-red-600 dark:text-red-400">
        Erreur lors du chargement du tableau de bord.
      </div>
    );

  return (
    <div className="p-4 space-y-6 text-gray-800 dark:text-gray-100">
      <StatCards
        totalReceived={dashboard.summary.totalReceivedQuantity ?? 0}
        totalMedicines={dashboard.summary.totalMedicines}
        totalRemaining={dashboard.summary.totalStockQuantity}
        centersCount={dashboard.summary.totalCenters}
        lastReceiptDate={dashboard.summary.lastReceiptDate}
      />

      {/* Wrap everything lazy inside Suspense */}
      <Suspense fallback={<Loading />}>
        <LowStockAlerts alerts={dashboard.alerts.lowStock} />

        <TopUsedMedicinesChart data={dashboard.charts.topUsedMedicines} />
        <StockPerCenterTable data={dashboard.tables.stockPerCenter} />

        {Object.entries(dashboard.charts.weeklyConsumptionByCenter as Record<string, any[]>).map(
          ([centerName, entries]) => (
            <WeeklyCenterChart key={centerName} centerName={centerName} data={entries} />
          )
        )}

        <RecentReceiptsTable receipts={dashboard.tables.recentReceipts} />
      </Suspense>
    </div>
  );
};

export default DashboardPage;

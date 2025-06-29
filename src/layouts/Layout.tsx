import { Outlet } from 'react-router-dom';
import Footer from '@/components/navigation/Footer';
import Navbar from '@/components/navigation/Navbar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-[#212121] dark:text-gray-100">

      <Navbar />

      <main
        className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-12 bg-gray-50 dark:bg-[#181818] rounded-t-2xl"
        aria-label="Main content"
      >
        <div className="max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

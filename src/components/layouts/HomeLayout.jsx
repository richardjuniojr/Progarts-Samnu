import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import ScrollToTop from "../ui/ScrollToTop";

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

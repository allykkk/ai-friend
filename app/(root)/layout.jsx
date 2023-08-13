import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const RootLayout = ({ children }) => {

  // Navbar
  // Sidebar (mobile only)
  // Content

  return (
    <>
      <Navbar/>
      <asdie className="hidden md:block fixed inset-y-0 h-screen md:w-64 transition-transform"><Sidebar/></asdie>
      <main className="bg-white min-h-100vh bg-secondary md:pl-64 pt-16">{children}</main>
    </>
  );
};

export default RootLayout;

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const RootLayout = ({ children }) => {

  // Navbar
  // Sidebar (mobile only)
  // Content

  return (
    <div className="h-full bg-secondary">
      <Navbar/>
      <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0"><Sidebar/></div>
      <main className="h-full md:pl-20 pt-16">{children}</main>
    </div>
  );
};

export default RootLayout;

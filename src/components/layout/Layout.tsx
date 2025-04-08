
import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-64 pt-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;

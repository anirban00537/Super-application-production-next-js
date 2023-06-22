import DashboardSidebar from "@/components/Sidebar/dashboard.comp";
import Link from "next/link";
import React from "react";

const layout = ({ children }: any) => {
  return (
    <div>
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default layout;

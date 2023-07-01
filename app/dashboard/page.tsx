import PortfolioCard from "@/components/Cards/portfolio.comp";
import React from "react";

const Layout = () => {
  return (
    <div className="p-4 sm:ml-64 grid grid-cols-5 gap-4">
      {" "}
      {/* Updated grid classes */}
      <PortfolioCard number={56} title="Total Portfolios" />
      <PortfolioCard number={56} title="Total Published Blogs" />
      <PortfolioCard number={56} title="Total blogs" />
      <PortfolioCard number={56} title="Total blogs" />
      <PortfolioCard number={56} title="Total blogs" />
      <PortfolioCard number={56} title="Total blogs" />
      <PortfolioCard number={56} title="Total notes" />
      <PortfolioCard number={56} title="Total Journals" />
    </div>
  );
};

export default Layout;

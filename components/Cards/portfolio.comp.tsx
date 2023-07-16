import React from "react";

const PortfolioCard = ({
  number,
  title,
}: {
  number: number;
  title: string;
}) => {
  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-500">{number}</h1>
      <h1 className="text-base font-bold text-gray-500">{title}</h1>
      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-red-500 to-transparent"></div>
    </div>
  );
};

export default PortfolioCard;

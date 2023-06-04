import { Spinner } from "flowbite-react";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner aria-label="Default status example" size="xl" />
    </div>
  );
};

export default LoadingComponent;

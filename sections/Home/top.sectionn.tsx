import React from "react";

const TopSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      {" "}
      {/* Adjust the py-16 value to reduce the height */}
      <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Understand User Flow.
            <br className="hidden sm:block" />
            <strong className="font-extrabold text-orange-700">
              Increase Conversion.
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="inline-block px-8 py-3 text-sm font-medium text-white bg-orange-600 rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring active:bg-orange-500"
              href="/get-started"
            >
              Get Started
            </a>
            <a
              className="inline-block px-8 py-3 text-sm font-medium text-orange-600 hover:text-orange-700 focus:outline-none focus:ring active:text-orange-500"
              href="/about"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;

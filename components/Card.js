import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-gray-200 py-4 w-[360px] rounded-md shadow-md md:w-[540px] md:text-2xl md:py-8 lg:w-[640px] lg:py-14">
      {children}
    </div>
  );
};

export default Card;

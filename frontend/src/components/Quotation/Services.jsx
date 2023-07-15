import React, { Fragment } from "react";

const Services = ({ payload }) => {
  return (
    <div className="">
      <p className="font-euclidMedium text-qblue text-center text-xl mt-1 px-6">
        Services We Provide
      </p>
      <p className="font-euclidRegular text-qblue text-center p-6">
        {payload.about}
      </p>
    </div>
  );
};

export default Services;

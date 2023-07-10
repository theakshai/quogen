import React, { Fragment } from "react";

const Services = ({ prop }) => {
  return (
    <Fragment>
      <div className="mt-4 flex justify-around">
        <p className="font-euclidRegular">Service</p>
        <p className="font-euclidRegular">Quantity</p>
      </div>
    </Fragment>
  );
};

export default Services;

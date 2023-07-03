import React, { Fragment } from "react";

const Stats = () => {
  return (
    <Fragment>
      <div className="flex justify-around px-5 ml-8 mt-10 flex-wrap gap-2">
        <div className="flex-col mb-4 border border-qwhite p-4">
          <p className="font-euclidRegular text-qwhite text-5xl">500+</p>
          <p className="font-euclidRegular text-qwhite">Users Visited</p>
        </div>
        <div className="flex-col mb-4 border border-qwhite p-4">
          <p className="font-euclidRegular text-qwhite text-5xl text-center">
            50+
          </p>
          <p className="font-euclidRegular text-qwhite">Business Partners</p>
        </div>
        <div className="flex-col mb-4 border border-qwhite p-4">
          <p className="font-euclidRegular text-qwhite text-5xl">10000+</p>
          <p className="font-euclidRegular text-qwhite">Quotation Generated</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Stats;

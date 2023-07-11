import React from "react";

const TC = ({ payload }) => {
  return (
    <div className="p-6">
      <p className="font-euclidMedium text-qblue px-6">Terms And Conditions</p>
      <ul className="px-6 mt-2">{payload.tc}</ul>
    </div>
  );
};

export default TC;

import React, { Fragment } from "react";

const SenderReciver = ({ payload }) => {
  return (
    <Fragment>
      <div id="header" className="flex justify-around">
        <div id="from" className="p-6">
          <p className="font-euclidMedium text-qblue">To</p>
          <p className="font-euclidRegular text-qblue">{payload.clientName}</p>
          <p className="font-euclidRegular text-qblue">{payload.clientEmail}</p>
          <p className="font-euclidRegular text-qblue">{payload.clientState}</p>
        </div>
        <div id="from" className="p-6">
          <p className="font-euclidMedium text-qblue">From</p>
          <p className="font-euclidRegular text-qblue">{payload.senderName}</p>
          <p className="font-euclidRegular text-qblue">{payload.senderEmail}</p>
          <p className="font-euclidRegular text-qblue">{payload.senderState}</p>
        </div>
        <div id="from" className="p-6">
          <p className="font-euclidMedium text-qblue"></p>
          <p className="font-euclidRegular text-qblue"></p>
        </div>
      </div>
    </Fragment>
  );
};

export default SenderReciver;

import React from "react";
import { Link } from "react-router-dom";
import { QuotationContext } from "../../Context/QuotationContext";
import { useContext } from "react";

const DCard = ({ cardName, msg }) => {
  return (
    <div className="border-4 border-qwhite sm:w-96 sm:m-10">
      <div className="flex w-96">
        <p className="text-9xl  font-lcSac text-qblack text-center sm:mt-10 sm:p-10">
          {cardName}
        </p>
        <p className="text-9xl  font-lcSac text-qwhite text-center sm:mt-10 sm:p-10">
          {msg}
        </p>
      </div>
    </div>
  );
};

export default DCard;

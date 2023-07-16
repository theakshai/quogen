import React from "react";
import { Link } from "react-router-dom";
import { QuotationContext } from "../../Context/QuotationContext";
import { useContext } from "react";

const DCard = ({ cardName, img }) => {
  const { values } = useContext(QuotationContext);
  console.log(JSON.stringify(values));
  return (
    <div className="border border-qwhite sm:w-96 sm:m-10">
      <p className="text-9xl  font-lcSac text-qblack text-center sm:mt-10 sm:p-10">
        {cardName}
      </p>
    </div>
  );
};

export default DCard;

import React from "react";
import { Link } from "react-router-dom";
import { QuotationContext } from "../../Context/QuotationContext";
import { useContext } from "react";

const DCard = ({ cardName, img }) => {
  const { values } = useContext(QuotationContext);
  console.log(JSON.stringify(values));
  return (
    <div className=" w-50 h-50 p-6 bg-white border border-qwhite ">
      <Link to={"/login"}>
        <img src={img} alt={cardName} width={100} className="p-4 m-4" />
        <p className="text-qwhite font-lcSac text-2xl text-center ml-2">
          {cardName}
        </p>
      </Link>
    </div>
  );
};

export default DCard;

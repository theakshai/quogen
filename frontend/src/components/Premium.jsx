import React, { Fragment } from "react";
import Button from "./Button";
import Line from "../assets/Line.svg";

const PremiumCard = () => {
  return (
    <Fragment>
      <div className="w-60 h-80 p-2 bg-white border border-qwhite rounded-sm">
        <h5 className="font-lcSac text-2xl tracking-tight text-qwhite dark:text-white mb-2">
          Business - Premium
        </h5>
        <img src={Line} alt="" />
        <p className="font-euclidRegular text-qwhite text-sm mb-2 mt-2">
          A perfect one for working with organisation
        </p>
        <p className="font-euclidRegular text-qwhite p-2">
          <span className="font-euclidMedium text-5xl">$0.1</span>user/month
        </p>
        <img src={Line} alt="" />
        <p className="font-euclidRegular text-qwhite text-sm mt-2 mb-2">
          Unlimited Quotations per month
        </p>
        <p className="font-euclidRegular text-qwhite text-sm mb-2">
          Data tracing
        </p>
        <p className="font-euclidRegular text-qwhite text-sm mb-2">
          Multi User work flow
        </p>
        <Button action="Let's start" url="/signup" />
      </div>
    </Fragment>
  );
};

export default PremiumCard;

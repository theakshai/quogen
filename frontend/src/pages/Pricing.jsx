import React, { Fragment } from "react";
import Card from "../components/Card";
import PricingInfo from "../components/PricingInfo";

const Pricing = () => {
  return (
    <Fragment>
      <p className="font-lcSac text-qwhite text-4xl text-center p-2 sm:text-left ml-10 mt-4">
        Pricing
      </p>
      <p className="font-lcSac text-qwhite text-3xl p-4 m-5 text-center underline ">
        "QuoGen Offers a free Usage where Users can try first! If they like it
        they can continue to use it with subscription"
      </p>
      <div className="flex justify-evenly flex-wrap gap-4">
        <Card />
        <Card />
      </div>
    </Fragment>
  );
};

export default Pricing;

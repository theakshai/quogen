import React, { Fragment } from "react";
import BasicCard from "../components/BasicCard";
import PremiumCard from "../components/Premium";

const Pricing = () => {
  return (
    <Fragment>
      <p className="font-lcSac text-qwhite text-6xl text-center p-4 sm:text-center mt-2">
        Pricing
      </p>
      <p className="font-lcSac text-qwhite text-3xl p-4 m-5 text-center underline ">
        "QuoGen Offers a free Usage where Users can try first! If they like it
        they can continue to use it with subscription"
      </p>
      <div className="flex justify-evenly flex-wrap gap-4">
        <BasicCard />
        <PremiumCard />
      </div>
    </Fragment>
  );
};

export default Pricing;

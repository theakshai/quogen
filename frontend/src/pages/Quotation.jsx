import React, { useState } from "react";
import QuotationForms from "../components/QuotationForms";
import Toggle from "../components/Toggle";
import CQuotation from "../components/Quotation/CQuotation";
import { QuotationContext } from "../Context/QuotationContext";

const Quotation = () => {
  const [preview, setPreview] = useState(false);
  return (
    <>
      <div className="flex justify-around">
        <h1 className="font-lcSac text-qwhite text-5xl text-center m-10">
          Quotation's Details
        </h1>
        <Toggle setPreview={setPreview} />
      </div>
      {preview ? (
        <QuotationContext.Consumer>
          {(formikvalues) => <CQuotation formikvalue={formikvalues} />}
        </QuotationContext.Consumer>
      ) : (
        <QuotationForms />
      )}
    </>
  );
};

export default Quotation;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ConvertedQuotation = () => {
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState([]);
  const [data, setdata] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5146/api/quotation/converted")
      .then((response) => {
        setQuotation(response.data);
        setdata(true);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-around gap-4 m-10">
        {quotation.map((qu) => (
          <div
            key={qu.quotationId}
            className="text-qwhite text-center font-lcSac h-40 w-40 border border-qwhite m-4"
          >
            <p className="m-10 text-xl">Quotation</p>
            <p className="m-10 text-xl"></p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="border-qwhite border p-2 font-lcSac text-xl text-qwhite"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ConvertedQuotation;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ConvertedQuotation = () => {
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState([]);
  const [data, setdata] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5146/api/quotation/converted")
      .then((response) => {
        setQuotation(response.data);
        console.log(response.data);
        setdata(true);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
    >
      <div className="flex flex-wrap justify-around gap-4 m-10">
        {quotation.map((qu) => (
          <div
            key={qu.quotationId}
            className="text-qwhite flex text-center font-lcSac justify-around w-9/12 p-4 border border-qwhite m-4"
          >
            <p className=" text-xl">to: Quotation</p>
            <p className=" text-xl">To:{JSON.stringify(qu.clientName)}</p>
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
    </motion.div>
  );
};

export default ConvertedQuotation;

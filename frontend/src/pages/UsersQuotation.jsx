import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UsersQuotation = () => {
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState([]);
  const [data, setdata] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5146/api/quotation").then((response) => {
      setQuotation(response.data);
      setdata(true);
    });
  }, []);

  const handleQuotationClick = (quotationId) => {
    navigate(`/quotation/${quotationId}`);
  };

  const qdate = (qu) => {
    return qu;
  };

  const handleConvert = (qu) => {
    const url = `http://localhost:5146/api/quotation/convert/${qu}`;
    axios
      .post(url)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {quotation.length > 0 ? (
        <div className="flex flex-wrap justify-around gap-4 m-10">
          {quotation.map((qu) => (
            <div
              key={qu.quotationId}
              className="text-qwhite text-center font-lcSac h-40 w-40 border border-qwhite m-4"
            >
              <p className="m-10 text-xl">Quotation</p>
              <p className="m-10 text-xl"></p>
              <button
                className="cursor-pointer underline font-euclidRegular"
                onClick={() => handleConvert(qu.quotationId)}
              >
                Convert
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-qwhite p-10 mt-10 font-lcSac text-4xl text-center">
          No Quotation data.To create quotation click{" "}
          <Link to={"/quotation"}>
            <u>here</u>
          </Link>
        </h1>
      )}
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

export default UsersQuotation;

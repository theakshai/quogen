import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const UsersQuotation = () => {
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:5146/api/quotation").then((response) => {
      setQuotation(response.data);
      console.log(response.data);
    });
  }, []);

  const handleQuotationClick = (quotationId) => {
    navigate(`/quotation/${quotationId}`);
  };
  const handlesubmit = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  const handleConvert = (qu) => {
    const url = `http://localhost:5146/api/quotation/convert/${qu}`;
    axios
      .post(url)
      .then((response) => {
        navigate(-1);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <motion.h1
        className="text-qwhite text-center font-lcSac border border-qwhite p-2 w-80  text-xl m-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        Total Quotations Generated: {quotation.length}
      </motion.h1>

      {quotation.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          <div className="flex justify-center">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search"
              className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
            />
          </div>
          <div className="flex flex-wrap justify-around gap-4 m-10">
            {quotation.map((qu) => (
              <div
                key={qu.quotationId}
                className="text-qwhite flex text-center font-lcSac justify-around w-9/12 p-4 border border-qwhite m-4"
              >
                <p className=" text-xl">Quotation</p>
                <p className=" text-xl">{JSON.stringify(qu.clientName)}</p>
                <button
                  className="cursor-pointer underline font-euclidRegular"
                  onClick={() => handleConvert(qu.quotationId)}
                >
                  Convert
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          <h1 className="text-qwhite p-10 mt-10 font-lcSac text-4xl text-center">
            No Quotation data.To create quotation click{" "}
            <Link to={"/quotation"}>
              <u>here</u>
            </Link>
          </h1>
        </motion.div>
      )}
      <motion.div
        className="flex justify-evenly "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <div className="text-qwhite font-lcSac text-2xl text-center">
          If there is no quotation visible, check in the converted or create new
        </div>
      </motion.div>
    </div>
  );
};

export default UsersQuotation;

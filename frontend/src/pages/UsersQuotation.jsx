import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Quote from "../components/Quote";
import Search from "../components/Search";

const UsersQuotation = () => {
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showsearch, setSearch] = useState(false);
  const [datastatus, setdatastatus] = useState(false);
  const [qdata, setqdata] = useState(false);
  const [modaldata, setmodaldata] = useState();

  const openModal = (qu) => {
    setShowModal(true);
    showquotation(qu);
  };

  const closeModal = () => {
    setShowModal(false);
    setdatastatus(false);
  };
  const openSearch = () => {
    setSearch(true);
  };

  const closeSearch = () => {
    setSearch(false);
    setqdata(false);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:5146/api/quotation").then((response) => {
      setQuotation(response.data);
      setqdata(true);
      console.log(response.data);
    });
  }, []);

  const showquotation = (qid) => {
    axios
      .get(`http://localhost:5146/api/quotation/${qid}`)
      .then((response) => {
        setmodaldata(response.data);
        setdatastatus(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <Quote
        showModal={showModal}
        closeModal={closeModal}
        datastatus={datastatus}
        modaldata={modaldata}
      />
      {/* <Search
        showsearch={showsearch}
        closeSearch={closeSearch}
        qdata={qdata}
        quotation={quotation}
      /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="flex justify-between p-10"
      >
        <h1 className="text-qwhite text-center font-lcSac border border-qwhite p-2 w-80  text-xl m-10">
          Total Quotations Generated: {quotation.length}
        </h1>
        <div>
          <button
            type="button"
            className="text-xl p-2 m-10 border border-qwhite font-lcSac text-qwhite"
            onClick={openSearch}
          >
            Search
          </button>
          <button
            className="text-xl p-2 m-10 border border-qwhite font-lcSac text-qwhite"
            onClick={() => navigate("/quotation/")}
          >
            Create New +{" "}
          </button>
          <button
            className="text-xl p-2 m-10 border border-qwhite font-lcSac text-qwhite"
            onClick={() => navigate("/quotation/converted")}
          >
            Converted
          </button>
        </div>
      </motion.div>

      {quotation.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          <div className=" flex flex-wrap justify-around gap-4 m-10">
            <div className="text-qwhite flex text-center font-lcSac justify-around w-9/12 p-4 border-b-2 border-qwhite m-4">
              <p className=" text-xl">Quotation</p>
              <p className=" text-xl">ClientName</p>
              <button className="cursor-pointer  font-euclidRegular">
                Click to Convert
              </button>
              <button
                type="button"
                className="cursor-pointer  font-euclidRegular"
              >
                Click to View
              </button>
            </div>
            {quotation.map((qu) => (
              <div
                key={qu.quotationId}
                className="text-qwhite flex text-center font-lcSac justify-around w-9/12 p-4 border-b-2 border-qwhite m-4"
              >
                <p className=" text-xl">Quotation</p>
                <p className=" text-xl">{JSON.stringify(qu.clientName)}</p>
                <button
                  className="cursor-pointer underline font-euclidRegular"
                  onClick={() => handleConvert(qu.quotationId)}
                >
                  Convert
                </button>
                <button
                  type="button"
                  className="cursor-pointer underline font-euclidRegular"
                  onClick={() => openModal(qu.quotationId)}
                >
                  View
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

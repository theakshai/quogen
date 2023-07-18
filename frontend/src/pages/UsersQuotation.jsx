import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Quote from "../components/Quote";
import Search from "../components/Search";
import quote from "../assets/Quota.jpg";
import { useJwt } from "react-jwt";

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

  let token = localStorage.getItem("token");
  let userId = "";
  let role = "";
  let { decodedToken } = useJwt(token);
  if (decodedToken) {
    userId = decodedToken.UserId;
    role = decodedToken.role;
  }
  const url = `http://localhost:5146/api/quotation/user/${userId}`;
  console.log(url);

  const request = () => {
    axios
      .get(url)
      .then((response) => {
        console.log("the original data");
        console.log(response.data);
      })
      .catch((error) => console.log(error));
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
    navigate("/quotation/all");
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
        <div className="fixed -z-20 inset-0  flex items-center justify-center">
          <img src={quote} alt="" />
        </div>
        <h1 className="text-qwhite text-center font-lcSac border bg-qblack border-qblack p-2 w-80  text-xl m-10">
          Total Quotations Generated: {quotation.length}
        </h1>
        <div>
          <button
            className="text-xl p-2 m-10 border border-qblack bg-qblack font-lcSac text-qwhite"
            onClick={() => navigate("/quotation/")}
          >
            Create New +{" "}
          </button>
          <button
            className="text-xl p-2 m-10 border border-qblack bg-qblack font-lcSac text-qwhite"
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
            {quotation.map((qu) => (
              <div
                key={qu.quotationId}
                className="text-qwhite flex-col text-center font-lcSac justify-around w-80  bg-qblack p-10 border border-qblack m-4"
              >
                <p className=" text-center text-4xl m-2">{qu.clientName}</p>
                <div className="flex justify-center gap-4">
                  {qu.confirmed === false && role === "admin" ? (
                    <button
                      className="cursor-pointer border border-qblack h-10 p-2 font-euclidRegular"
                      onClick={() => handleConvert(qu.quotationId)}
                    >
                      Convert
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="cursor-pointer border border-qblack h-10 p-2 font-euclidRegular"
                    onClick={() => openModal(qu.quotationId)}
                  >
                    View
                  </button>
                </div>
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
          <h1 className="text-qblack p-10 mt-10 font-lcSac text-4xl text-center">
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
        <div className="text-qblack font-lcSac text-2xl text-center">
          If there is no quotation visible, check in the converted or create new
        </div>
      </motion.div>
    </div>
  );
};

export default UsersQuotation;

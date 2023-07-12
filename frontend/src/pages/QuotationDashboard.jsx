import { motion } from "framer-motion";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const QuotationDashboard = () => {
  const navigate = useNavigate();
  const handlesubmit = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <h1 className="text-qwhite font-lcSac text-2xl text-center m-10">
          Welcome to dashboard
        </h1>
        <div className="flex justify-evenly flex-wrap mt-10">
          <div className="border border-qwhite text-center  w-60 text-qwhite p-2   text-xl font-lcSac">
            <Link to={"/quotation/all"}>All Quotation</Link>
          </div>
          <div className="border border-qwhite text-center w-60 text-qwhite   p-2 text-xl font-lcSac">
            <Link to={"/quotation/converted"}>Converted</Link>
          </div>
          <div className="border border-qwhite text-center text-qwhite  w-60 text-xl p-2  font-lcSac">
            <Link to={"/quotation/"}>Create New + </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuotationDashboard;

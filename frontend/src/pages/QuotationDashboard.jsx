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
      <h1 className="text-qwhite font-lcSac text-2xl text-center m-10">
        Welcome to dashboard
      </h1>
      <div className="flex justify-evenly flex-wrap mt-10">
        <div className="border border-qwhite text-center h-40 w-40 text-qwhite p-10 m-10 text-xl font-lcSac">
          <Link to={"/quotation/all"}>All Quotation</Link>
        </div>
        <div className="border border-qwhite text-center h-40 w-40 text-qwhite p-10  m-10 text-xl font-lcSac">
          <Link to={"/quotation/converted"}>Converted</Link>
        </div>
        <div className="border border-qwhite text-center text-qwhite h-40 w-40 p-10 text-xl m-10 font-lcSac">
          <Link to={"/quotation/"}>Create New</Link>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="text-qwhite font-lcSac border border-qwhite p-2"
          onClick={handlesubmit}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default QuotationDashboard;

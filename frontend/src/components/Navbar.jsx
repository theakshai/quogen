import React, { Fragment } from "react";
import Hamburger from "./Hamburger";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handlesubmit = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Fragment>
      <motion.div
        className="flex sm:justify-center flex-wrap mt-8 justify-center ml-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div>
          <Link to={"/"} className="font-lcSac text-qwhite text-2xl sm:text-xl">
            QG
          </Link>
        </div>
        <div className=" sm:flex">
          {token ? (
            <li
              className="list-none px-4 font-lcSac text-qwhite cursor-pointer"
              onClick={handlesubmit}
            >
              Logout
            </li>
          ) : null}
        </div>
      </motion.div>
    </Fragment>
  );
};

export default Navbar;

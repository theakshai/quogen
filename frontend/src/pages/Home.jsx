import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <motion.div
        className="m-10 p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <div className="text-center ">
          <div className="font-lcSac text-qwhite text-7xl sm:text-9xl mr-8">
            Quogen
          </div>
          <div className="pt-8">
            <p className="font-euclidRegular text-qwhite ">
              Personal Tool for Quotation Generation!
            </p>
            <p className="font-euclidRegular text-qwhite ">
              Welcome to QuoGen an aesthetic quotation generator for Gleam
              studios.
            </p>
          </div>
          <div className="p-8 flex gap-4 justify-center flex-wrap">
            <button
              type="submit"
              className="border border-qwhite w-60 h-10 font-lcSac sm:ml-10 sm:mt-5 text-qwhite rounded-sm"
              onClick={() => navigate("/login")}
            >
              Login in
            </button>
            <button
              type="submit"
              className="border border-qwhite w-60 h-10 font-lcSac sm:ml-10 sm:mt-5 text-qwhite rounded-sm"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
          <div>
            <p className=" font-euclidRegular text-qwhite text-center">
              Contact <u>qugogen@support.com</u> for queries
            </p>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
};

export default Home;

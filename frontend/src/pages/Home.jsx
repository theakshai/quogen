import React, { Fragment } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";

const Home = () => {
  return (
    <Fragment>
      <div className="text-center ">
        <motion.div
          className="font-lcSac text-qwhite text-9xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          Quogen
        </motion.div>
        <motion.div
          className="pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          <p className="font-euclidRegular text-qwhite text-2xl">
            Tired of Fancy Quotation generator?
          </p>
          <p className="font-euclidRegular text-qwhite text-2xl">
            Welcome to QuoGen an aesthetic quotation generator for photography
            studios.
          </p>
        </motion.div>
        <div className="p-8">
          <Button action="Let's start" url={"/quotation"} />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

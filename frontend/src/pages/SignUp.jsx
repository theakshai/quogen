import React, { Fragment } from "react";
import SignUpForm from "../components/SignUpForm";
import { motion } from "framer-motion";

const SignUp = () => {
  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <p className="font-lcSac text-qwhite text-9xl p-6 mt-8  text-center">
          SignUp
        </p>
        <div className="flex justify-around">
          <SignUpForm />
        </div>
      </motion.div>
    </Fragment>
  );
};

export default SignUp;

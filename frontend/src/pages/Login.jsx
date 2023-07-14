import React, { Fragment } from "react";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
    >
      <p className="font-lcSac text-qwhite text-9xl p-6 mt-8  text-center">
        Login
      </p>
      <div className="flex justify-around">
        <LoginForm />
      </div>
      <div className="font-euclidRegular mt-5 text-xl text-qwhite text-center">
        No account?
        <Link to="/signup">
          <u> SignUp</u>
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;

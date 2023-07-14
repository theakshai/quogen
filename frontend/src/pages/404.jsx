import React, { Fragment } from "react";
import Notfound from "../assets/404.svg";

const NotFound = () => {
  return (
    <Fragment>
      <p className="text-qwhite text-9xl text-center font-lcSac  mt-10">404</p>
      <p className="text-qwhite text-2xl text-center font-lcSac">
        <span className="text-4xl">OOPS!</span> <br />
        Login/Sign Up to perform the action!
      </p>
      <div className="flex justify-center mt-10 p-10">
        <img src={Notfound} alt="" height={200} width={200} />
      </div>
    </Fragment>
  );
};

export default NotFound;

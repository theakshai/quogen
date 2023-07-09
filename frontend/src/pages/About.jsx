import React, { Fragment } from "react";
import Stats from "../components/Stats";

const About = () => {
  return (
    <Fragment>
      <div className="flex-col justify-around">
        <p className="font-lcSac text-qwhite text-6xl text-center p-4 sm:text-center mt-2">
          About
        </p>
        <div>
          <p className="font-lcSac text-qwhite sm:text-justify  text-xl p-4 m-4 leading-8">
            At Quogen, we are dedicated to the way businesses generate
            quotations. Our innovative quotation generator software offers a
            seamless and efficient solution for creating professional quotes in
            no time. With our user-friendly interface and customizable
            templates, you can easily personalize your quotations to reflect
            your brand's identity and leave a lasting impression on your
            clients. Our automation features eliminate tedious manual tasks,
            saving you valuable time and improving your overall productivity.
            Rest assured that your data is secure with our robust encryption and
            privacy measures. Our dedicated customer support team is always
            ready to assist you, ensuring a smooth and successful experience
            with our software. Join us today and transform your quoting process
            into a streamlined and hassle-free operation. Experience the power
            of efficient quotations with Quogen.ur dedicated customer support
            team is always ready to assist you, ensuring a smooth and successful
            experience with our software. Join us today and transform your
            quoting process into a streamlined and hassle-free operation.
            Experience the power of efficient quotations with Quogen.
          </p>
        </div>
        <Stats />
      </div>
    </Fragment>
  );
};

export default About;

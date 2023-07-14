import React from "react";

const About = ({ payload }) => {
  return (
    <div className="">
      <p className="font-euclidMedium text-qblue text-center text-xl mt-1 px-6">
        About
      </p>
      <p className="font-euclidRegular text-qblue text-center p-6">
        {payload.about}
      </p>
    </div>
  );
};

export default About;

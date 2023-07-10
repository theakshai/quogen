import React, { Fragment } from "react";

const Toggle = ({ setPreview }) => {
  const changePreview = () => {
    setPreview((prevPreview) => !prevPreview);
  };
  return (
    <div className="mt-10 p-4">
      <label className="relative inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={changePreview}
        />
        <div className="w-11 h-6 bg-qblue peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-qwhite  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-qblue after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-qwhite after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-qwhite border border-qwhite"></div>
        <span className="ml-3 font-lcSac text-qwhite ">Preview</span>
      </label>
    </div>
  );
};

export default Toggle;

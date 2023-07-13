import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Organisation = () => {
  const [memberId, setMemberId] = useState("");
  const [orgdata, setorgdata] = useState("");
  const [orgcheck, setorgcheck] = useState(false);
  let token = localStorage.getItem("token");
  let { decodedToken } = useJwt(token);
  let orgId = "";
  if (decodedToken) {
    orgId = decodedToken.OrgId;
  }

  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value);
  };

  console.log(orgId);
  const url = `http://localhost:5146/api/organisation/${orgId}`;
  const [loading, setloading] = useState(false);

  const request = () => {
    axios
      .get(url)
      .then((response) => {
        setorgdata(response.data);
        setorgcheck(true);
        console.log(orgdata);
      })
      .catch((error) => console.log(error));
  };

  const arequest = (payload) => {
    setloading(true);
    axios
      .post("http://localhost:5146/api/organisation/addusermail", payload)
      .then((response) => {
        console.log(response.status);
        setloading(false);
        setMemberId("");
        Swal.fire({
          title: "Email has been succesfully sent",
          color: "#fcf8f2",
          background: "#26262e",
          icon: "success",
          border: "#fcf8f2",
          confirmButtonText: "Ok",
        });
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  const addMemberRequest = () => {
    if (memberId) {
      const payload = {
        OrgId: orgId,
        Email: memberId,
      };
      arequest(payload);
    }
  };

  useEffect(() => {
    request();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
    >
      <div className="flex justify-around flex-wrap">
        <div className="border border-qwhite sm:w-96 sm:m-10">
          {orgcheck ? (
            <p className="text-9xl font-lcSac text-qwhite text-center sm:mt-10 sm:p-10">
              {orgdata.organisationName}
            </p>
          ) : (
            <p className="text-9xl font-lcSac text-qwhite text-center sm:mt-10 sm:p-10">
              No Studio
            </p>
          )}
        </div>
        <div className=" mt-10 p-8 flex gap-2">
          <input
            type="text"
            name="addmember"
            id=""
            value={memberId}
            onChange={handleMemberIdChange}
            placeholder="Add Member"
            className="font-euclidRegular text-qwhite bg-qblue block mb-4 mt-10  w-80 h-10 p-2 outline-none border border-qwhite"
          />
          <button
            className="font-euclidRegular text-qblue bg-qwhite block mb-4 mt-10 h-10 p-2 outline-none border border-qwhite"
            onClick={addMemberRequest}
          >
            Add
          </button>
          {loading ? (
            <h4 className="text-qwhite font-lcSac text-xl">
              Adding Member....
            </h4>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default Organisation;

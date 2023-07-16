import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import bg from "../assets/organisa.jpg";

const Organisation = () => {
  const [memberId, setMemberId] = useState("");
  const [orgdata, setorgdata] = useState("");
  const [orgquotationdata, setorgquotationdata] = useState([]);
  const [memberdata, setmemberdata] = useState([]);
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

  const orgQuotationRequest = () => {
    const orgQuotationRequestURL = `http://localhost:5146/api/organisation/quotations/${orgId}`;
    axios
      .get(orgQuotationRequestURL)
      .then((response) => {
        setorgquotationdata(response.data);
        console.log("This is quotation data");
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => console.log(error));
  };
  const orgMemberRequest = () => {
    const orgMemberRequestURL = `http://localhost:5146/api/organisation/members/${orgId}`;
    axios
      .get(orgMemberRequestURL)
      .then((response) => {
        console.log("This is member data");
        setmemberdata(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => console.log(error));
  };

  orgMemberRequest();

  console.log(orgId);
  const url = `http://localhost:5146/api/organisation/${orgId}`;

  const [loading, setloading] = useState(false);

  const request = () => {
    setorgcheck(true);
    axios
      .get(url)
      .then((response) => {
        setorgdata(response.data);
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
      .catch((error) => {
        if (error.response.status == 409) {
          Swal.fire({
            title: "User already present",
            color: "#fcf8f2",
            background: "#26262e",
            icon: "error",
            border: "#fcf8f2",
            confirmButtonText: "Ok",
          });
          setloading(false);
          setMemberId("");
        }
      });
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
  }, [orgcheck]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
    >
      <div className="fixed -z-20 inset-0  flex items-center justify-center">
        <img src={bg} alt="" />
      </div>
      <div className="flex justify-around flex-wrap">
        <div className="border-4 border-qwhite sm:w-96 sm:m-10">
          {orgcheck ? (
            <p className="text-9xl font-lcSac text-qblack text-center sm:mt-10 sm:p-10">
              {orgdata.organisationName}
            </p>
          ) : (
            <p className="text-9xl font-lcSac text-qblack text-center sm:mt-10 sm:p-10">
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
            className="font-euclidRegular text-qwhite bg block mb-4 mt-10  w-80 h-10 p-2 outline-none border border-qblack"
          />
          <button
            className="font-euclidRegular text-qwhite bg-qblack block mb-4 mt-10 h-10 p-2 outline-none border border-qwhite "
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
      {orgquotationdata ? (
        <div>
          {orgquotationdata.map((o) => (
            <h1 className="text-qblack font-lcSac text-2xl" key={o.id}>
              {o.id}
            </h1>
          ))}
        </div>
      ) : null}

      {memberdata.length > 0 ? (
        <div>
          {memberdata.map((o) => (
            <div key={o.id}>
              {console.log("This is rendering with id " + o.id)}
              <h1 className="text-qblack font-lcSac text-2xl">
                {o.organisationId}
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-qwhite font-lcSac">OOPS! NO DATA</h1>
      )}
    </motion.div>
  );
};

export default Organisation;

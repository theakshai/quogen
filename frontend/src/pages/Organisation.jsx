import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";

const Organisation = () => {
  const [memberId, setMemberId] = useState("");
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

  const request = () => {
    axios
      .get(url)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const arequest = (payload) => {
    axios
      .post("http://localhost:5146/api/organisation/addusermail", payload)
      .then((response) => console.log(response.data))
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
    <>
      <div className="flex justify-around flex-wrap">
        <div className="border border-qwhite sm:w-96 sm:m-10">
          <p className="text-9xl font-lcSac text-qwhite text-center sm:mt-10 sm:p-10">
            Sai Photography
          </p>
        </div>
        <div className=" mt-10 p-8">
          <input
            type="text"
            name="addmember"
            id=""
            value={memberId}
            onChange={handleMemberIdChange}
            placeholder="Add Member"
            className="font-lcSac text-qwhite bg-qblue block mb-4 mt-10  w-80 h-10 p-2 outline-none border border-qwhite"
          />
          <div className="flex justify-center ">
            <button
              className="text-qblue bg-qwhite w-20 p-2 text-xl border font-lcSac border-qwhite"
              onClick={addMemberRequest}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organisation;

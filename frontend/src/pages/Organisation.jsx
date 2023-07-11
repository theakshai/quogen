import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";

const Organisation = () => {
  let token = localStorage.getItem("token");
  const [members, setMembers] = useState([]);
  console.log(token);
  let { decodedToken, isExpired } = useJwt(token);
  let orgId = "";
  if (decodedToken) {
    orgId = decodedToken.OrgId;
  }
  let url = `http://localhost:5146/api/organisation/${orgId}/users`;

  useEffect(() => {
    if (orgId) {
      const request = async () => {
        try {
          const response = await axios.get(url);
          const data = response.data;
          setMembers(data); // Update the members state with the response data
        } catch (error) {
          console.error("Error fetching members:", error);
        }
      };
      request();
    }
  }, []);

  return (
    <div>
      {members.map((user) => {
        <p className="text-qwhite font-lcSac">{user}</p>;
      })}
    </div>
  );
};

export default Organisation;

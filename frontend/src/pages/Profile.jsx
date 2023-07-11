import React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import SignUpForm from "../components/SignUpForm";

const Profile = () => {
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  let orgId = "";
  let userId = "";
  if (decodedToken) {
    userId = decodedToken.UserId;
    orgId = decodedToken.OrgId;
  }
  console.log(userId);
  let userProfile = {};
  let userData = {};

  const [uProfile, setUProfile] = useState();

  const request = async () => {
    await axios
      .get(
        "http://localhost:5146/api/user/bea95a4f-eb5b-426c-bbcb-a76093fc242a"
      )
      .then((response) => {
        setUProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <Fragment>
      <div>
        <p className="text-center font-lcSac text-5xl text-qwhite m-10 p-8">
          Edit the details to be changed!
        </p>
      </div>
      <div className="flex justify-around mt-10 ">
        <SignUpForm userProfile={uProfile} />
      </div>
    </Fragment>
  );
};

export default Profile;

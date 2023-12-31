import React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import SignUpForm from "../components/SignUpForm";

const Profile = () => {
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  let userId = "";
  if (decodedToken) {
    userId = decodedToken.UserId;
  }

  const [uProfile, setUProfile] = useState();

  let url = `http://localhost:5146/api/user/${userId}`;
  console.log(userId);

  const request = async () => {
    await axios
      .get(url)
      .then((response) => {
        const details = response.data;
        setUProfile(details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userId) {
      request();
    }
  }, [userId]);

  console.log(uProfile);

  return (
    <Fragment>
      <div>
        <p className="text-center font-lcSac text-5xl text-qwhite m-10 p-8">
          Edit the details to be changed!
        </p>
      </div>
      <div className="flex justify-around mt-10 ">
        {uProfile ? <SignUpForm userProfile={uProfile} /> : null}
      </div>
    </Fragment>
  );
};

export default Profile;

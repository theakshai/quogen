import React from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import SignUpForm from "../components/SignUpForm";
import UpdateProfile from "../components/UpdateProfile";
import bg from "../assets/prof.jpg";

const Profile = () => {
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  let userId = "";
  if (decodedToken) {
    userId = decodedToken.UserId;
    console.log("the user id is " + userId);
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
        <div className="fixed -z-20 inset-0  flex items-center justify-center">
          <img src={bg} alt="" />
        </div>
        <p className="text-center font-lcSac text-5xl text-qorange m-10 p-8">
          Edit the details to be changed!
        </p>
      </div>
      <div className="flex justify-around mt-10 ">
        {uProfile ? <UpdateProfile userProfile={uProfile} /> : null}
      </div>
    </Fragment>
  );
};

export default Profile;

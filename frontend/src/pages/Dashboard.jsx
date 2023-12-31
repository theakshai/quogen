import React, { useEffect, useState } from "react";
import DCard from "../components/Dashboard/DCard";
import Quotations from "../assets/Quotations.svg";
import Settings from "../assets/Settings.svg";
import Organisation from "../assets/Organisation.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dashboard from "../assets/dashboard.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [presentInOrg, setPresentInOrg] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5146/api/userorg", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setPresentInOrg(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  console.log(presentInOrg);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
    >
      <p className="text-center font-lcSac text-5xl text-qwhite m-4 p-8">
        Personal Dashboard
      </p>
      {presentInOrg ? (
        <div className="flex-col justify-around flex-wrap gap-8">
          <Link to="/quotation/all">
            <DCard img={Quotations} cardName={"Quotation"} />
          </Link>
          <Link to="/organisation">
            <DCard img={Organisation} cardName={"Organisation"} />
          </Link>
          <Link to="/profile">
            <DCard img={Settings} cardName={"Profile"} />
          </Link>
        </div>
      ) : (
        <div>
          <Link to={"/organisation/new"}>
            <p className="font-lcSac text-center text-qwhite cursor-pointer text-2xl border border-qwhite p-2 m-10">
              Add Organisation +
            </p>
          </Link>
          <p className="text-center font-euclidRegular text-xl text-qwhite m-4 p-8">
            <u>
              Note: To quotation to be stored and editable, create an
              organisation.
            </u>
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;

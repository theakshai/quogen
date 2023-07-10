import React, { useEffect, useState } from "react";
import DCard from "../components/Dashboard/DCard";
import Quotations from "../assets/Quotations.svg";
import Settings from "../assets/Settings.svg";
import Organisation from "../assets/Organisation.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [presentInOrg, setPresentInOrg] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5146/api/userorg", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {})
        .catch((error) => {
          if (!error.response.status == 404) {
            setPresentInOrg(true);
          }
        });
    };

    fetchData();
  }, []);

  console.log(presentInOrg);

  return (
    <div>
      <p className="text-center font-lcSac text-2xl text-qwhite m-4 p-8">
        <u>Welcome to your personal Dashboard!</u>
      </p>
      {presentInOrg ? (
        <div className="flex justify-evenly flex-wrap gap-8">
          <DCard img={Quotations} cardName={"Quotation"} />
          <DCard img={Organisation} cardName={"Organisation"} />
          <DCard img={Settings} cardName={"Settings"} />
        </div>
      ) : (
        <div>
          <Link to={"/organisation/new"}>
            <p className="font-lcSac text-center text-qwhite cursor-pointer text-2xl border border-qwhite p-2 ">
              Add Organisation +
            </p>
          </Link>
          <p className="text-center font-lcSac text-xl text-qwhite m-4 p-8">
            <u>
              Note: To quotation to be stored and editable, create an
              organisation.
            </u>
          </p>
          <p className="text-center font-lcSac text-xl text-qwhite m-4 p-8">
            No need to pay for organisation? Feel free to create free quotation{" "}
            <Link to={"/quotation"}>
              <u>here</u>
            </Link>
          </p>
        </div>
      )}
      <button
        type="submit"
        className="border border-qwhite w-60 h-10 font-lcSac ml-10 mt-5 text-qwhite rounded-sm"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </div>
  );
};

export default Dashboard;

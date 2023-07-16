import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/Dash.jpg";

const OrganisationForm = () => {
  const navigate = useNavigate();

  const organisationSchema = Yup.object().shape({
    orgName: Yup.string()
      .min(2, "Mininum be 2 characters")
      .max(50, "Maximum be 50 characters")
      .required("Required"),
    orgEmail: Yup.string().email("Invalid Email Address").required("Required"),
    orgMobile: Yup.string()
      .min(10, "Minimum be 10 characters")
      .required("Required"),
    orgAbout: Yup.string()
      .max(50, "Maximum b 50 characters")
      .required("Required"),
  });

  console.log(localStorage.getItem("token"));

  const request = async (payload) => {
    await axios
      .post("http://localhost:5146/api/organisation", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        let authHeader = response.headers["authorization"];
        const token = authHeader ? authHeader.replace("Bearer", "") : null;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400) {
          Swal.fire({
            title: "Organisation with this name is already exists",
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else if (error.response.status == 403) {
          navigate("/404");
        } else if (error.response.status == 500) {
          Swal.fire({
            title: "Internal Server error in db. Signin/Login to use",
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Logout and try again!",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  return (
    // <motion.div
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     transition={{ delay: 0.5, duration: 2 }}
    // >
    <>
      <div className="fixed -z-20 inset-0  flex items-center justify-center">
        <img src={bg} alt="" />
      </div>
      <p className="font-lcSac text-qblack text-8xl p-6 mt-8  text-center">
        <Link to={"/"}>QuoGen</Link>
      </p>
      <div className="flex justify-around">
        <div>
          <p className="text-center font-lcSac text-2xl text-qblack m-4">
            Register Your Organisation!
          </p>
          <Formik
            initialValues={{
              orgName: localStorage.getItem("orgName") || "",
              orgEmail: localStorage.getItem("orgEmail") || "",
              orgMobile: localStorage.getItem("orgMobile") || "",
              orgAbout: localStorage.getItem("orgAbout") || "",
            }}
            validationSchema={organisationSchema}
            onSubmit={(values) => {
              const payload = {
                organisationName: values.orgName,
                mail: values.orgEmail,
                mobile: values.orgMobile,
                about: values.orgAbout,
              };
              console.log(payload);
              request(payload);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="orgName"
                  type="text"
                  placeholder="Organisation Name"
                  className="font-lcSac text-qblack  block mb-4 w-80 h-10 p-2 outline-none "
                />
                {errors.orgName && touched.orgName ? (
                  <div className="text-qblack font-lcSac">{errors.orgName}</div>
                ) : null}
                <Field
                  name="orgEmail"
                  type="email"
                  placeholder="Organisation Email"
                  className="font-lcSac text-qblack  block mb-4 w-80 h-10 p-2 outline-none "
                />
                {errors.orgEmail && touched.orgEmail ? (
                  <div className="text-qwhite font-lcSac">
                    {errors.orgEmail}
                  </div>
                ) : null}
                <Field
                  name="orgMobile"
                  type="text"
                  placeholder="Organisation Mobile"
                  className="font-lcSac text-qwhite block mb-4 w-80 h-10 p-2 outline-none "
                />
                {errors.orgMobile && touched.orgMobile ? (
                  <div className="text-qblack font-lcSac">
                    {errors.orgMobile}
                  </div>
                ) : null}
                <Field
                  name="orgAbout"
                  type="text"
                  placeholder="About Ex: Software Business, Photography"
                  className="font-lcSac text-qblack  block mb-4 w-80 h-10 p-2 outline-none "
                />
                {errors.orgAbout && touched.orgAbout ? (
                  <div className="text-qblack font-lcSac">
                    {errors.orgAbout}
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="bg-qblack w-60 h-10 font-lcSac ml-10 text-qwhite rounded-sm"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
    // </motion.div>
  );
};

export default OrganisationForm;

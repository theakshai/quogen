import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
        Swal.fire({
          title: "There some error in db. Logout and try again!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <>
      <p className="font-lcSac text-qwhite text-8xl p-6 mt-8  text-center">
        QuoGen
      </p>
      <div className="flex justify-around">
        <div>
          <p className="text-center font-lcSac text-2xl text-qwhite m-4">
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
                  className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                />
                {errors.orgName && touched.orgName ? (
                  <div className="text-qwhite font-lcSac">{errors.orgName}</div>
                ) : null}
                <Field
                  name="orgEmail"
                  type="email"
                  placeholder="Organisation Email"
                  className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
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
                  className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                />
                {errors.orgMobile && touched.orgMobile ? (
                  <div className="text-qwhite font-lcSac">
                    {errors.orgMobile}
                  </div>
                ) : null}
                <Field
                  name="orgAbout"
                  type="text"
                  placeholder="About Ex: Software Business, Photography"
                  className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                />
                {errors.orgAbout && touched.orgAbout ? (
                  <div className="text-qwhite font-lcSac">
                    {errors.orgAbout}
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="border border-qwhite w-60 h-10 font-lcSac ml-10 text-qwhite rounded-sm"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default OrganisationForm;

import React from "react";
import { motion } from "framer-motion";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NewMemberForm = ({ userProfile }) => {
  const navigate = useNavigate();
  const params = useParams();
  let tokens = params["tokenId"].split("+");
  console.log(tokens);
  const userId = tokens[0];
  const orgId = tokens[1];
  const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Mininum be 2 characters")
      .max(50, "Maximum be 50 characters")
      .required("Required"),
    lastName: Yup.string()
      .min(1, "Mininum be 2 characters")
      .max(50, "Maximum be 50 characters")
      .required("Required"),
    designation: Yup.string()
      .min(2, "Mininum be 2 characters")
      .max(50, "Maximum be 50 characters")
      .required("Required"),
    password: Yup.string()
      .min(8, "Minimum be 8 characters")
      .max(12, "Maximum be 12 characters")
      .required("Required"),
  });

  const createmember = async (payload) => {
    await axios
      .post("http://localhost:5146/api/organisation/adduser", payload)
      .then((response) => {
        let authHeader = response.headers["authorization"];
        const token = authHeader ? authHeader.replace("Bearer", "") : null;
        localStorage.setItem("token", token);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 2 }}
    >
      <p className="text-center font-lcSac text-2xl text-qwhite m-4">
        Welcome to Gleam studios!
      </p>
      <p className="text-center font-lcSac text-2xl text-qwhite m-4">
        Fill the form below to be a member at Gleam Studios!
      </p>
      <div className="flex justify-around mt-10 ">
        <Formik
          initialValues={{
            firstName: userProfile?.firstName || "",
            lastName: userProfile?.lastName || "",
            password: userProfile?.password || "",
            designation: userProfile?.designation || "",
          }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            const payload = {
              userId: userId,
              orgId: orgId,
              firstName: values.firstName,
              lastName: values.lastName,
              designation: values.designation,
              password: values.password,
            };
            createmember(payload);
            navigate("/dashboard");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="firstName"
                type="text"
                placeholder="First Name"
                className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
              />
              {touched.firstName && errors.firstName ? (
                <div className="font-lcSac text-qwhite">{errors.firstName}</div>
              ) : null}
              <Field
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
              />
              {touched.lastName && errors.lastName ? (
                <div className="font-lcSac text-qwhite">{errors.lastName}</div>
              ) : null}
              <Field
                name="designation"
                type="text"
                placeholder="Designation: Ex: Sales Manager, HR etc.,"
                className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
              />
              {touched.designation && errors.designation ? (
                <div className="font-lcSac text-qwhite">
                  {errors.designation}
                </div>
              ) : null}
              <Field
                name="password"
                type="text"
                placeholder="Password"
                className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
              />
              {touched.password && errors.password ? (
                <div className="font-lcSac text-qwhite">{errors.password}</div>
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
    </motion.div>
  );
};

export default NewMemberForm;

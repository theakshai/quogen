import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ userProfile }) => {
  const navigate = useNavigate();
  const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Mininum be 2 characters")
      .max(50, "Maximum be 50 characters")
      .required("Required"),
    lastName: Yup.string()
      .min(1, "Mininum be 2 characters")
      .max(50, "Maximum be 50 characters")
      .required("Required"),
    email: Yup.string().email("Invalid Email Address").required("Required"),
    designation: Yup.string()
      .min(2, "Mininum be 2 characters")
      .max(50, "Maximum be 50 characters")
      .required("Required"),
    password: Yup.string()
      .min(8, "Minimum be 8 characters")
      .max(12, "Maximum be 12 characters")
      .required("Required"),
  });
  const request = async (payload) => {
    await axios
      .post("http://localhost:5146/api/signup", payload)
      .then((response) => {
        let authHeader = response.headers["authorization"];
        const token = authHeader ? authHeader.replace("Bearer", "") : null;
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <p className="text-center font-lcSac text-2xl text-qwhite m-4">
        Welcome to QuoGen!
      </p>
      <Formik
        initialValues={{
          firstName: userProfile?.firstName || "",
          lastName: userProfile?.lastName || "",
          email: userProfile?.email || "",
          password: userProfile?.password || "",
          designation: userProfile?.designation || "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            designation: values.designation,
            password: values.password,
          };
          request(payload);
          navigate("/quotation/all");
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
              name="email"
              type="email"
              placeholder="Email"
              className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
            />
            {errors.email && touched.email ? (
              <div className="font-lcSac text-qwhite">{errors.email}</div>
            ) : null}
            <Field
              name="designation"
              type="text"
              placeholder="Designation: Ex: Sales Manager, HR etc.,"
              className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
            />
            {touched.designation && errors.designation ? (
              <div className="font-lcSac text-qwhite">{errors.designation}</div>
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

export default SignUpForm;

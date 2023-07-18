import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

const UpdateProfile = ({ userProfile }) => {
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
  });
  console.log("Rendering");
  const request = async (payload) => {
    await axios
      .put("http://localhost:5146/api/signup", payload)
      .then((response) => {
        console.log("The user data is");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <p className="text-center font-lcSac text-2xl text-qblack m-4">
        Welcome to QuoGen!
      </p>
      <Formik
        initialValues={{
          firstName: userProfile?.firstName || "",
          lastName: userProfile?.lastName || "",
          email: userProfile?.email || "",
          designation: userProfile?.designation || "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            designation: values.designation,
          };
          console.log("calling before request");
          request(payload);
          console.log("calling after request");
          navigate("/dashboard");
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="firstName"
              type="text"
              placeholder="First Name"
              className="font-lcSac text-qblack  block mb-4 w-80 h-10 p-2 outline-none border border-qblack"
            />
            {touched.firstName && errors.firstName ? (
              <div className="font-lcSac text-qblack">{errors.firstName}</div>
            ) : null}
            <Field
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="font-lcSac text-qblack  block mb-4 w-80 h-10 p-2 outline-none border border-qblack"
            />
            {touched.lastName && errors.lastName ? (
              <div className="font-lcSac text-qblack">{errors.lastName}</div>
            ) : null}
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="font-lcSac text-qblack  block mb-4 w-80 h-10 p-2 outline-none border border-qblack"
            />
            {errors.email && touched.email ? (
              <div className="font-lcSac text-qblack">{errors.email}</div>
            ) : null}
            <Field
              name="designation"
              type="text"
              placeholder="Designation: Ex: Sales Manager, HR etc.,"
              className="font-lcSac text-qblack  block mb-4 w-80 h-10 p-2 outline-none border border-qblack"
            />
            {touched.designation && errors.designation ? (
              <div className="font-lcSac text-qblack">{errors.designation}</div>
            ) : null}
            <button
              type="submit"
              className="  bg-qblack w-60 h-10 font-lcSac ml-10 text-qwhite rounded-sm"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <button
        type="submit"
        className=" bg-qblack w-60 h-10 font-lcSac ml-10 mt-5 text-qwhite rounded-sm"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateProfile;

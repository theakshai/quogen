import React from "react";
import { Formik, Field, Form } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email Address").required("Required"),
    password: Yup.string()
      .min(8, "Minimum be 8 characters")
      .max(12, "Maximum be 12 characters")
      .required("Required"),
  });

  const request = async (payload) => {
    await axios
      .post("http://localhost:5146/api/login", payload)
      .then((response) => {
        let authHeader = response.headers["authorization"];
        const token = authHeader ? authHeader.replace("Bearer", "") : null;
        localStorage.setItem("token", token);
        navigate("/signup");
      })
      .catch((error) => {
        if (error.response.status == 404) {
          Swal.fire({
            title: "User not signed in",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
        if (error.response.status == 400) {
          Swal.fire({
            title: "Username/password wrong",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  return (
    <div>
      <p className="text-center font-lcSac text-2xl text-qwhite m-4">
        Glad to see you again!
      </p>
      <Formik
        initialValues={{
          email: localStorage.getItem("email") || "",
          password: localStorage.getItem("password") || "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          const payload = {
            email: values.email,
            password: values.password,
          };
          request(payload);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
            />
            {errors.email && touched.email ? (
              <div className="text-qwhite font-lcSac">{errors.email}</div>
            ) : null}
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
            />
            {errors.password && touched.password ? (
              <div className="text-qwhite font-lcSac">{errors.password}</div>
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
  );
};

export default LoginForm;

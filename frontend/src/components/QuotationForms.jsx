import React, { Fragment, useState } from "react";
import Toggle from "../components/Toggle";
import { motion } from "framer-motion";
import { useFormikContext, useFormik } from "formik";
import SenderReciver from "./Quotation/SenderReciver";
import About from "./Quotation/About";
import TC from "./Quotation/TC";
import Header from "./Quotation/Header";
import Services from "./Quotation/Services";
import Footer from "./Quotation/Footer";
import "../components/Quotation/quotation.css";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const QuotationForms = () => {
  const [preview, setPreview] = useState(true);
  console.log("The current prev is " + preview);
  const formik = useFormik({
    initialValues: {
      senderName: "",
      senderEmail: "",
      senderMobile: "",
      senderState: "",
      clientName: "",
      clientEmail: "",
      clientMobile: "",
      clientState: "",
      about: "",
      tc: "",
    },
    validationSchema: Yup.object({
      senderName: Yup.string()
        .max(30, "Maximum only 30 words to be there")
        .required("Required"),
      senderEmail: Yup.string()
        .email("Invalid Email Address")
        .required("Required"),
      senderMobile: Yup.string()
        .min(10, "Ten digits should be present")
        .required("Required"),
      senderState: Yup.string()
        .max(30, "Maximum only 30 chars to be present")
        .required("Required"),
      clientName: Yup.string()
        .max(30, "Maximum only 30 words to be there")
        .required("Required"),
      clientEmail: Yup.string()
        .email("Invalid Email Address")
        .required("Required"),
      clientMobile: Yup.string()
        .min(10, "Ten digits should be present")
        .required("Required"),
      clientState: Yup.string()
        .max(30, "Maximum only 30 chars to be present")
        .required("Required"),
      about: Yup.string().max(2000, "Maxium only 2000 chars to be present"),
      tc: Yup.string().max(2000, "Maxium only 2000 chars to be present"),
    }),
    onSubmit: (values) => {
      request(payload);
    },
  });

  const instance = axios.create();
  const payload = {
    senderName: formik.values.senderName,
    senderEmail: formik.values.senderEmail,
    senderMobile: formik.values.senderMobile,
    senderState: formik.values.senderState,
    clientName: formik.values.clientName,
    clientEmail: formik.values.clientEmail,
    clientMobile: formik.values.clientMobile,
    clientState: formik.values.clientState,
    about: formik.values.about,
    tc: formik.values.tc,
  };

  const request = (payload) => {
    instance
      .post("http://localhost:5146/api/quotation", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className="flex justify-around">
        <h1 className="font-lcSac text-qwhite text-5xl text-center m-10">
          <Link to={"/"}>Quotation's Details</Link>
        </h1>
        <Toggle setPreview={setPreview} />
      </div>

      {preview ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-evenly flex-wrap p-4 m-2">
              <div>
                <label
                  htmlFor="senderName"
                  className="font-lcSac text-qwhite block text-xl"
                >
                  Sender Name
                </label>
                <input
                  id="senderName"
                  name="senderName"
                  type="text"
                  placeholder="Sender Name"
                  onChange={formik.handleChange}
                  value={formik.values.senderName}
                  className="mt-2 font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                />
                {formik.touched.senderName && formik.errors.senderName ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.senderName}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="senderEmail"
                  className="font-lcSac text-qwhite block text-xl"
                >
                  Sender Email
                </label>
                <input
                  id="senderEmail"
                  name="senderEmail"
                  type="text"
                  placeholder="Sender Email"
                  onChange={formik.handleChange}
                  value={formik.values.senderEmail}
                  className="font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 mt-2 outline-none border border-qwhite"
                />
                {formik.touched.senderEmail && formik.errors.senderEmail ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.senderEmail}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-evenly flex-wrap p-4 m-2">
              <div>
                <label
                  htmlFor="senderMobile"
                  className="font-lcSac text-qwhite block text-xl"
                >
                  Sender Mobile
                </label>
                <input
                  id="senderMobile"
                  name="senderMobile"
                  type="text"
                  placeholder="Sender Mobile"
                  onChange={formik.handleChange}
                  value={formik.values.senderMobile}
                  className="mt-2 font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                />
                {formik.touched.senderMobile && formik.errors.senderMobile ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.senderMobile}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="senderState"
                  className="font-lcSac text-qwhite block text-xl"
                >
                  Sender State
                </label>
                <input
                  id="senderState"
                  name="senderState"
                  type="text"
                  placeholder="Sender State"
                  onChange={formik.handleChange}
                  value={formik.values.senderState}
                  className="font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 mt-2 outline-none border border-qwhite"
                />
                {formik.touched.senderState && formik.errors.senderState ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.senderState}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-evenly flex-wrap p-4 m-2">
              <div>
                <label
                  htmlFor="clientName"
                  className="font-lcSac text-qwhite block text-xl"
                >
                  Client Name
                </label>
                <input
                  id="clientName"
                  name="clientName"
                  type="text"
                  placeholder="Client Name"
                  onChange={formik.handleChange}
                  value={formik.values.clientName}
                  className="mt-2 font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                />
                {formik.touched.clientName && formik.errors.clientName ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.clientName}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="clientEmail"
                  className="font-lcSac text-qwhite block text-xl"
                >
                  Client Email
                </label>
                <input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  placeholder="Client Email"
                  onChange={formik.handleChange}
                  value={formik.values.clientEmail}
                  className="font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 mt-2 outline-none border border-qwhite"
                />
                {formik.touched.clientEmail && formik.errors.clientEmail ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.clientEmail}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-evenly flex-wrap p-4 m-2">
              <div>
                <label
                  htmlFor="clientMobile"
                  className="font-lcSac text-qwhite block text-xl"
                >
                  Client Mobile
                </label>
                <input
                  id="clientMobile"
                  name="clientMobile"
                  type="text"
                  placeholder="Client Mobile No"
                  onChange={formik.handleChange}
                  value={formik.values.clientMobile}
                  className="mt-2 font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                />
                {formik.touched.clientMobile && formik.errors.clientMobile ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.clientMobile}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="clientState"
                  className="font-lcSac text-qwhite block text-xl"
                >
                  Client State
                </label>
                <input
                  id="clientState"
                  name="clientState"
                  type="text"
                  placeholder="Client State"
                  onChange={formik.handleChange}
                  value={formik.values.clientState}
                  className="font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 mt-2 outline-none border border-qwhite"
                />
                {formik.touched.clientState && formik.errors.clientState ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.clientState}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-center">
              <div>
                <label
                  htmlFor="about"
                  className="block font-lcSac text-xl text-qwhite"
                >
                  About{" "}
                </label>
                <textarea
                  name="about"
                  id="about"
                  cols="92"
                  rows="5"
                  placeholder="Ex: Write about the summary of this project"
                  className="p-2 mt-2 font-euclidRegular bg-qblue border border-qwhite text-qwhite"
                  onChange={formik.handleChange}
                  value={formik.values.about}
                />
                {formik.touched.about && formik.errors.about ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.about}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-center">
              <div>
                <label
                  htmlFor="tc"
                  className="block font-lcSac text-xl text-qwhite mt-4"
                >
                  Terms And Condition
                </label>
                <textarea
                  name="tc"
                  id="tc"
                  cols="92"
                  rows="5"
                  placeholder="Ex: Write about the summary of this project"
                  className="p-2 mt-2 font-euclidRegular bg-qblue border border-qwhite text-qwhite"
                  onChange={formik.handleChange}
                  value={formik.values.tc}
                />
                {formik.touched.tc && formik.errors.tc ? (
                  <div className="font-lcSac text-qwhite">
                    {formik.errors.tc}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="font-lcSac text-qwhite border border-qwhite p-2 text-xl m-2"
              >
                Create Quotation
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
        >
          <div className="page">
            <Header />
            <hr />

            <SenderReciver payload={formik.values} />
            <hr />

            <About />
            <hr />

            <div className="mt-4 flex justify-around">
              <p className="font-euclidMedium">Service</p>
              <p className="font-euclidMedium">Quantity</p>
            </div>
            <Services />
            <Services />
            <Services />
            <Services />

            <p className="text-center font-euclidSemibold text-xl text-qblue p-6 mr-10 ">
              The estimated Amount* is $1200
            </p>
            <TC />
            <hr />
            <Footer />
          </div>
        </motion.div>
      )}
    </Fragment>
  );
};

export default QuotationForms;

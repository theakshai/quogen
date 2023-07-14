import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CQuotation from "./components/Quotation/CQuotation";
import OrganisationForm from "./components/OrganisationForm";
import QuotationForms from "./components/QuotationForms";
import NotFound from "./pages/404";
import Profile from "./pages/Profile";
import Organisation from "./pages/Organisation";
import UsersQuotation from "./pages/UsersQuotation";
import QuotationDashboard from "./pages/QuotationDashboard";
import ConvertedQuotation from "./pages/ConvertedQuotation";
import NewMemberForm from "./pages/NewMember";

function App() {
  const location = useLocation();

  const excludedEndpoints = [
    "/quotation",
    "/preview",
    "/organisation/new",
    "/404",
    "*",
    "/profile",
  ];
  const shouldShowNavbar = !excludedEndpoints.includes(location.pathname);
  const token = localStorage.getItem("token");
  return (
    <div className="bg-black">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to={"/dashboard"} /> : <Navigate to={"/home"} />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quotation" element={<QuotationForms />} />
        <Route path="/quotation/:quotationId" element={<QuotationForms />} />
        <Route path="/signup/:quotationId" element={<SignUp />} />
        <Route path="/newmember/:tokenId" element={<NewMemberForm />} />
        <Route path="/newmember/" element={<NewMemberForm />} />
        <Route path="/preview" element={<CQuotation />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organisation/new" element={<OrganisationForm />} />
        <Route path="/organisation" element={<Organisation />} />
        <Route path="/quotation/all" element={<UsersQuotation />} />
        <Route path="/quotation/converted" element={<ConvertedQuotation />} />
        <Route path="/quotation/dashboard" element={<QuotationDashboard />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

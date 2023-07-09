import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Why from "./pages/Why";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Quotation from "./pages/Quotation";
import CQuotation from "./components/Quotation/CQuotation";
import OrganisationForm from "./components/OrganisationForm";

function App() {
  const location = useLocation();

  const excludedEndpoints = [
    "/dashboard",
    "/quotation",
    "/preview",
    "/organisation/new",
  ];
  const shouldShowNavbar = !excludedEndpoints.includes(location.pathname);
  return (
    <div className="bg-black">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/why" element={<Why />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/preview" element={<CQuotation />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organisation/new" element={<OrganisationForm />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Quotation from "./pages/Quotation";
import CQuotation from "./components/Quotation/CQuotation";
import OrganisationForm from "./components/OrganisationForm";
import QuotationForms from "./components/QuotationForms";
import NotFound from "./pages/404";
import Profile from "./pages/Profile";
import MyForm from "./pages/MyForm";
import Organisation from "./pages/Organisation";

function App() {
  const location = useLocation();

  const excludedEndpoints = [
    "/dashboard",
    "/quotation",
    "/preview",
    "/organisation/new",
    "/404",
    "/profile",
  ];
  const shouldShowNavbar = !excludedEndpoints.includes(location.pathname);
  return (
    <div className="bg-black">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quotation" element={<QuotationForms />} />
        <Route path="/preview" element={<CQuotation />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organisation/new" element={<OrganisationForm />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exp" element={<MyForm />} />
        <Route path="/organisation" element={<Organisation />} />
      </Routes>
    </div>
  );
}

export default App;

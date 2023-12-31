import React from "react";
import "./quote.css";

const Quote = ({ showModal, closeModal, modaldata, datastatus }) => {
  const handleDelete = () => {
    axios.post("http://localhost:5146/api/quotation/");
  };

  console.log(datastatus);
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      {datastatus ? (
        <div className="bg-qblue p-6 box z-10 border border-qwhite">
          <div className="flex justify-evenly ">
            <div className="border border-qwhite p-4 w-80">
              <p className=" text-qwhite font-lcSac text-4xl">
                {modaldata.clientName}
              </p>
              <p className=" text-qwhite font-lcSac text-xl">
                Client Mobile: {modaldata.clientMobile}
              </p>
              <p className=" text-qwhite font-lcSac text-xl ">
                Client Email: {modaldata.senderEmail}
              </p>
            </div>
            <div className="border border-qwhite p-4 w-80">
              <p className=" text-qwhite font-lcSac text-4xl">
                {modaldata.senderName}
              </p>
              <p className=" text-qwhite font-lcSac text-xl">
                Sender Mobile: {modaldata.senderMobile}
              </p>
              <p className=" text-qwhite font-lcSac text-xl ">
                Sender Email: {modaldata.senderEmail}
              </p>
            </div>
          </div>
          <div className="border-qwhite w-82 border m-4"></div>
          <p className=" p-2 text-qwhite font-lcSac text-4xl">
            <u>About</u>
          </p>
          <p className=" text-qwhite font-lcSac text-xl p-2">
            {modaldata.about}
          </p>
          <div className="border-qwhite w-82 border m-4"></div>
          <p className=" p-2 text-qwhite font-lcSac text-4xl">
            <u>Service Providing</u>
          </p>
          <p className=" text-qwhite font-lcSac text-xl p-2">
            {modaldata.service}
          </p>
          <div className="border-qwhite w-82 border m-4"></div>
          <p className=" p-2 text-qwhite font-lcSac text-4xl">
            <u>Terms & Condition</u>
          </p>
          <p className=" text-qwhite font-lcSac text-xl p-2">{modaldata.tc}</p>
          <div className="flex justify-around">
            <button
              className="font-lcSac text-qwhite border border-qwhite p-2 text-xl w-20"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Quote;

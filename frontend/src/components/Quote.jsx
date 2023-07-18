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
        <div className="bg-qwhite p-6 box z-10 border-2 border-qblack">
          <div className="flex justify-evenly ">
            <div className="border border-qwhite p-4 w-80">
              <p className=" text-qblack font-lcSac">{modaldata.clientName}</p>
              <p className=" text-qblack font-lcSac">
                Client Mobile: {modaldata.clientMobile}
              </p>
              <p className=" text-qblack font-lcSac">
                Client Email: {modaldata.senderEmail}
              </p>
            </div>
            <div className="border border-qwhite p-4 w-80">
              <p className=" text-qblack font-lcSac">{modaldata.senderName}</p>
              <p className=" text-qblack font-lcSac">
                Sender Mobile: {modaldata.senderMobile}
              </p>
              <p className=" text-qblack font-lcSac">
                Sender Email: {modaldata.senderEmail}
              </p>
            </div>
          </div>
          <div className="border-qblack w-82 border-4 m-4"></div>
          <p className=" p-2 text-qblack font-lcSac ">
            <u>Service Providing</u>
          </p>
          <p className=" text-qblack font-lcSac p-2">{modaldata.service}</p>
          <div className="border-qwhite w-82 border-4 m-4"></div>
          <div className="flex justify-around">
            <button
              className="font-lcSac text-qblack border border-qblack p-2  w-20"
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

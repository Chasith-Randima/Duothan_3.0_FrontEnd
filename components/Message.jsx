import React from "react";
import { useState } from "react";

const Message = ({ message, display }) => {
  const [show, setShow] = useState(display);
  return (
    <>
      <div
        className={"max-w-3xl mx-auto px-4 pt-16 pb-24 text-center z-10 "}
        // className={
        //   show
        //     ? "max-w-3xl mx-auto px-4 pt-16 pb-24 text-center z-10 "
        //     : "max-w-3xl mx-auto px-4 pt-16 pb-24 text-center hidden"
        // }
      >
        <div className="mb-8">
          {/* <img src="images/complete.png" className="w-16 inline-block"/> */}
        </div>
        <h2 className="text-gray-800 font-medium text-3xl mb-3">
          {/* {message} working.. */}
        </h2>
        <div className="mt-10">
          <a
            // href="index.html"
            onClick={() => setShow(!show)}
            className="bg-primary border border-primary text-white px-6 py-3 font-medium rounded-md uppercase hover:bg-transparent
       hover:text-primary transition text-center"
          >
            Close
          </a>
        </div>
      </div>
    </>
  );
};

export default Message;

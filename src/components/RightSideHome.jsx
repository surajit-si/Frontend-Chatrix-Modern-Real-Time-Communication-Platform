import { useState } from "react";
//icons
import { IoSearchSharp } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { IoAttachOutline } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";

function RightSideHome() {
  const [selectedConversation, setelectedConversation] = useState("null");
  const [typing, setTyping] = useState("Panther is typing...");
  return (
    <div className="w-full max-w-2/3 max-lg:max-w-1/2 ">
      {selectedConversation === null ? (
        <div className="h-full w-full flex justify-center items-center">
          {/* //Base Right Side */}
          <div className=" px-12 py-2 bg-(--bg-dark)  border border-(--border)! rounded-3xl ">
            <p className="text-(--text) text-2xl font-semibold w-fit mx-auto mt-4 ">
              Welcome To Chatrix
            </p>
            <p className="text-(--text-muted) text-[0.8rem] mx-auto w-fit text-center ">
              Chat with Family, Friends and Colleague. <br />
              Realtime Chat with Live Updates.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full w-full relative">
          <nav className="rightNavBar w-full h-14 border-b border-(--border) top-0 sticky flex justify-between items-center z-50 bg-(--bg) ">
            {/* profile , name , status */}
            <div className="h-full px-4 w-fit flex items-center">
              {/* ProfileAvatar */}
              <div className="rightProfileAvatar h-12 aspect-square rounded-full overflow-hidden border border-(--border)! ">
                <img
                  src="https://png.pngtree.com/png-clipart/20250419/original/pngtree-an-isolated-black-panthar-head-on-a-white-background-png-image_20739154.png"
                  alt="profile"
                />
              </div>
              {/* Name and Status */}
              {typing.length == 0 ? (
                <div className="w-fit text-(--text) ml-2 font-semibold transition-all duration-1000 ease-in-out  ">
                  Panther Singh
                </div>
              ) : (
                <div className="w-fit text-(--text) ml-2 font-semibold flex flex-col transition-all duration-1000 ease-in-out  ">
                  Panther Singh
                  <span className="typing text-[0.6rem] text-(--text-muted) ">
                    {typing}
                  </span>
                </div>
              )}
            </div>
            {/* Search, Menu etc */}
            <div className="flex gap-4 mr-2">
              <IoSearchSharp className="text-(--text) text-[1.3rem] box-content! p-2 cursor-pointer hover:bg-(--bg-light) rounded-full " />
              <HiDotsVertical className="text-(--text) text-[1.3rem] box-content! p-2 cursor-pointer hover:bg-(--bg-light) rounded-full " />
            </div>
          </nav>
          <div className="rightBody h-full w-full overflow-x-scroll ">
            {/* input Box */}
            <div className="absolute bottom-0 w-full px-2 mx-auto py-2">
              <form
                className=" rounded-4xl bg-(--bg-light) w-full p-1 flex border "
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {/* Atachment Button */}
                <IoAttachOutline className="text-(--text) text-[1.3rem] box-content! p-2 cursor-pointer hover:bg-(--bg) rounded-full transition-colors" />
                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="grow outline-0 text-(--text) "
                  name="messageText"
                />

                <button type="submit" className="">
                  <IoSendSharp className="text-(--text) text-[1.3rem] box-content! p-2 cursor-pointer bg-(--primary) hover:bg-(--secondary) rounded-full transition-colors" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSideHome;

import { useContext, useEffect, useRef, useState } from "react";
//icons
import { IoSearchSharp } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { IoAttachOutline } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
import MessageContainerByMe from "./MessageContainerByMe";
import MessageContainerByOthers from "./MessageContainerByOthers";
import { selectedGroupContext } from "../store/currentGroup.store";
import { UserContext } from "../store/userData.store";
import { addMember, getUser } from "../services/user.services";
import useOnClickOutside from "../hooks/useOnClickOutside";

function RightSideHome() {
  //open menu if user clicks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const conversationMenu = useRef();
  const menuButton = useRef();
  useOnClickOutside(conversationMenu, () => setIsMenuOpen(false), isMenuOpen, [
    menuButton,
  ]);

  //add new member
  const [isAddingNewMember, setIsAddingNewMember] = useState(true);

  //it tells which group is currently set
  const { selectedGroup, setSelectedGroup } = useContext(selectedGroupContext);

  //addMember to conversation
  const addConversationMembers = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const usernameOrEmail = formData.get("usernameOrEmail");

    const postFormData = new FormData();
    postFormData.append("usernameOrEmail", usernameOrEmail);
    postFormData.append("conversationId", selectedGroup?._id);

    console.log(postFormData);
    try {
      const response = await addMember(postFormData);
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  //get userdata and socket
  const { userData, setUserData, socket } = useContext(UserContext);

  //set the typing text according to ws responces.
  const [typing, setTyping] = useState("Panther is typing...");

  //send message when type enter or click the submit button
  const sendMessage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const messageText = formData.get("messageText");

    if (!messageText?.trim() || !selectedGroup) return;

    socket.emit("send-message", {
      currConversation: selectedGroup,
      text: messageText.trim(),
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data) => {
      console.log(data);
    };

    const handleConnectError = async (err) => {
      if (err.message === "Unauthorized") {
        try {
          await getUser();
          socket.connect();
        } catch (error) {
          console.error(error);
        }
      }
    };

    const handleMessageError = (err) => {
      if (err.type === "parmission-error") {
        console.log(err);
      } else if (err.type === "not-found") {
        console.log(err);
      } else if (err.type === "db-error") {
        console.log(err);
      } else if (err.type === "internal-server-error") {
        console.log(err);
      }
    };

    socket.on("new-message", handleIncomingMessage);
    socket.on("connect_error", handleConnectError);
    socket.on("message-error", handleMessageError);

    return () => {
      socket.off("new-message", handleIncomingMessage);
      socket.off("connect_error", handleConnectError);
      socket.off("message-error", handleMessageError);
    };
  }, [socket]);

  return (
    <div className="w-full max-w-2/3 max-lg:max-w-1/2 ">
      {selectedGroup === null ? (
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
                  src={selectedGroup?.groupAvatar}
                  alt="profile"
                  className="object-cover block h-full w-full"
                />
              </div>
              {/* Name and Status */}
              {typing.length == 0 ? (
                <div className="w-fit text-(--text) ml-2 font-semibold transition-all duration-1000 ease-in-out  ">
                  {selectedGroup?.groupName}
                </div>
              ) : (
                <div className="w-fit text-(--text) ml-2 font-semibold flex flex-col transition-all duration-1000 ease-in-out  ">
                  {selectedGroup?.groupName}
                  <span className="typing text-[0.6rem] text-(--text-muted) ">
                    {typing}
                  </span>
                </div>
              )}
            </div>
            {/* Search, Menu etc */}
            <div className="flex gap-4 mr-2">
              <IoSearchSharp className="text-(--text) text-[1.3rem] box-content! p-2 cursor-pointer hover:bg-(--bg-light) rounded-full " />
              {/* three dots */}
              <div className="relative" ref={menuButton}>
                <HiDotsVertical
                  className="text-(--text) text-[1.3rem] box-content! p-2 cursor-pointer hover:bg-(--bg-light) rounded-full  "
                  onClick={() => {
                    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
                  }}
                />

                {/* menu */}
                {isMenuOpen && (
                  <ul
                    className="conversationMenu absolute border border-(--border)! px-3 py-2 right-0 rounded-md bg-(--bg) "
                    ref={conversationMenu}
                  >
                    <li className="conversationOption shrink-0 p-1">
                      <span className="text-center whitespace-nowrap cursor-pointer text-(--text) ">
                        Add a member
                      </span>
                    </li>
                  </ul>
                )}
                {isAddingNewMember && (
                  <div
                    className="conversationMenu absolute border border-(--border)! px-3 py-2 right-0 rounded-md bg-(--bg) "
                    ref={conversationMenu}
                  >
                    <form
                      className="conversationOption shrink-0 p-1 flex flex-col gap-2"
                      onSubmit={addConversationMembers}
                    >
                      <input
                        type="text"
                        name="usernameOrEmail"
                        placeholder="Enter Username/Email"
                        className="outline-0 border-(--border)! border rounded-sm pl-2 placeholder:text-(--text-muted) text-md! text-(--text) "
                      />
                      <button
                        type="submit"
                        className="bg-(--primary) rounded border border-(--border-primary)! "
                      >
                        Add
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div className="rightBody h-full w-full overflow-x-scroll flex flex-col">
            {/* input Box */}
            <div className="absolute bottom-0 w-full px-2 mx-auto py-2 z-50">
              <form
                className=" rounded-4xl bg-(--bg-light) w-full p-1 flex border border-(--border)! "
                onSubmit={sendMessage}
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

            {/* messages */}
            <MessageContainerByMe
              messageText={"Hello World"}
              time={"07:34 PM"}
            />
            <MessageContainerByMe
              messageText={"Hello World"}
              time={"07:34 PM"}
            />
            <MessageContainerByOthers
              messageText={"Hello Guy"}
              time={"07:35 PM"}
              sendBy={"Papa Panther"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSideHome;

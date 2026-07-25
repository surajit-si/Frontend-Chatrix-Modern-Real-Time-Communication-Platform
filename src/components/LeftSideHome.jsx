import { Link, useNavigate } from "react-router-dom";

//icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import {
  createConversation,
  getMessages,
  getUser,
} from "../services/user.services";
import { UserContext } from "../store/userData.store";
import { selectedGroupContext } from "../store/currentGroup.store";

function LeftSideHome({ className, setOnChat, ref }) {
  const [preview, setPreview] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const createGroupContainer = useRef();
  const createGroupButton = useRef();
  const groupNameInput = useRef();

  const {
    userData,
    setUserData,
    conversationMessages,
    setConversationMessages,
  } = useContext(UserContext);

  const { selectedGroup, setSelectedGroup } = useContext(selectedGroupContext);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  //create Conversation
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const groupAvatar = formData.get("groupAvatar");
    const groupName = formData.get("groupName");
    console.log({ groupAvatar, groupName });

    const postFormData = new FormData();
    postFormData.append("avatar", groupAvatar);
    postFormData.append("groupName", groupName);

    try {
      await createConversation(postFormData);
      setPreview(null);
      groupNameInput.current.value = null;
      try {
        const response = await getUser();
        const payload = response?.data?.data ?? response?.data;
        setUserData(payload);
      } catch (error) {
        setUserData(null);
      }
      setIsCreating(false);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  //handles the group click in left side
  const handleGroupClick = async (conversation) => {
    try {
      //change Selected group
      setSelectedGroup(conversation);
      //set onChat?
      setOnChat(true);

      //history for mobile back button act as back to list
      if (window.matchMedia("(max-width: 640px)").matches) {
        window.history.pushState({ screen: "chat" }, "", window.location.href);
      }

      //get messages
      const postMessages = new FormData();
      const conversationId = conversation?._id;
      postMessages.append("conversationId", conversationId);

      const response = await getMessages(postMessages);
      console.log(response.data.data.messages);
      //set the rendered messages to a common obj
      setConversationMessages((prev) => ({
        ...prev,
        [conversation._id]: response.data.data.messages,
      }));
    } catch (error) {
      console.error(error);
      error && console.log(error?.response?.data);
    }
  };

  //handle create group button
  function createGroupBtnHandler() {
    isCreating ? setIsCreating(false) : setIsCreating(true);
  }

  // close the create group UI when clicking outside of it
  useOnClickOutside(
    createGroupContainer,
    () => setIsCreating(false),
    isCreating,
    [createGroupButton],
  );

  //get last messages
  const getLastMessage = (conversation) => {
    if (conversation?.lastMessage?.content.length <= 12) {
      return conversation?.lastMessage?.content;
    } else if (conversation?.lastMessage?.content.length > 12) {
      const lastText = conversation?.lastMessage?.content;
      return lastText.replace(/^(.{12}).+/, "$1...");
    }
  };
  //get sender text for last message

  const getLastMessageSender = (conversation) => {
    if (conversation.lastMessage.sender._id === userData?.profile?._id) {
      return "You:";
    } else if (conversation.lastMessage.sender._id !== userData?.profile?._id) {
      //Temp: Enter username
      return `${conversation.lastMessage?.sender.username}:`;
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} h-full w-full max-w-1/3 max-sm:max-w-full border-r border-r-double border-(--border) max-lg:max-w-1/2 bg-(--bg) `}
    >
      <nav className="flex justify-between mt-2 px-4 border-b ">
        {/* AppName */}
        <Link
          to={"/home"}
          className="henny-penny-regular text-(--text)! p-2 no-underline! text-2xl"
        >
          Chatrix
        </Link>
        {/* icons */}
        <span className="flex gap-3">
          {/* Add */}
          <span className="relative">
            <IoMdAddCircleOutline
              ref={createGroupButton}
              className=" text-(--text) box-content! p-2 rounded-full hover:bg-(--bg-light) cursor-pointer text-2xl "
              onClick={createGroupBtnHandler}
            />
            {/* Create Group */}
            {isCreating && (
              <div
                ref={createGroupContainer}
                className="absolute bg-(--bg-light) z-50 p-2 rounded-2xl flex flex-col justify-center items-center w-80 "
              >
                {/* Upload Image */}
                <div className="aspect-square w-20 max-lg:w-12 border rounded-full border-(--border)! overflow-hidden">
                  <label
                    htmlFor="groupAvatar"
                    className="h-full w-full cursor-pointer relative"
                  >
                    {!preview ? (
                      <IoCloudUploadOutline className="absolute text-3xl text-(--text-muted) top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
                    ) : (
                      <img
                        src={preview}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </label>
                </div>
                <form
                  className="text-(--text) flex flex-col my-2"
                  onSubmit={handleSubmit}
                >
                  {/* Image */}
                  <input
                    name="groupAvatar"
                    type="file"
                    id="groupAvatar"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                  {/* Group Name */}
                  <input
                    type="text"
                    name="groupName"
                    placeholder="Enter group name:"
                    className="form-control bg-tra"
                    ref={groupNameInput}
                    required
                  />

                  <button className="btn btn-primary mt-2" type="submit">
                    Button
                  </button>
                </form>
              </div>
            )}
          </span>
          {/* Menu Dots */}
          <BsThreeDotsVertical className=" text-(--text) box-content! p-2 rounded-full hover:bg-(--bg-light) cursor-pointer text-2xl " />
        </span>
      </nav>

      {/* List Contacts */}
      <ul className="p-1 ">
        {userData?.conversations?.map((conversation) => {
          return (
            <li
              className="flex cursor-pointer text-(--text) items-center py-2 relative border-b border-(--border) "
              onClick={() => handleGroupClick(conversation)}
            >
              {/* Profile */}
              <div className=" aspect-square h-11 rounded-full ml-2 border border-(--border)! overflow-hidden ">
                <img
                  src={conversation.groupAvatar}
                  alt="group_avatar"
                  className="h-full w-full outline-none object-cover block"
                />
              </div>
              {/* Deteals */}
              <span className="ml-2 leading-1">
                {/* Name */}
                <p className="">{conversation.groupName}</p>
                {/* Last Message */}
                <span className="text-(--text-muted) text-[0.8rem] ">
                  <span className="">{getLastMessageSender(conversation)}</span>
                  <span className="ml-1">{getLastMessage(conversation)}</span>
                </span>
              </span>

              {/* Date */}
              <span className="absolute right-0 mr-2 text-(--text-muted) text-sm ">
                16/4/26
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSideHome;

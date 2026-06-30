import { Link, useNavigate } from "react-router-dom";

//icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { createConversation, getUser } from "../services/user.services";
import { UserContext } from "../store/userData.store";

function LeftSideHome() {
  const [preview, setPreview] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const createGroupContainer = useRef();
  const createGroupButton = useRef();
  const groupNameInput = useRef();

  //get user
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getUser({ signal })
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
        }
        console.log(res);
      })
      .catch((err) => {
        err.response.data && setUserData(null);
        // err.response.data && setUserData(err.response.data);
        navigate("/");
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (userData === null) {
    console.log(`userData was null`);
  } else if (userData !== null) {
    console.log(userData);
  }

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
        setUserData(response.data);
      } catch (error) {
        null;
      }
      setIsCreating(false);
    } catch (err) {
      console.log(err?.response?.data);
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

  return (
    <div className="h-full w-full max-w-1/3 border-r border-r-double border-(--border) max-lg:max-w-1/2 ">
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
        {userData?.data?.conversations.map((conversation) => {
          return (
            <li className="flex text-(--text) items-center py-2 relative border-b border-(--border) ">
              {/* Profile */}
              <div className=" aspect-square h-11 rounded-full ml-2 border border-(--border)! overflow-hidden ">
                <img
                  src={conversation.groupAvatar}
                  alt="profile"
                  className="h-full w-full outline-none object-cover block"
                />
              </div>
              {/* Deteals */}
              <span className="ml-2 leading-1">
                {/* Name */}
                <p className="">{conversation.groupName}</p>
                {/* Last Message */}
                <span className="text-(--text-muted) text-[0.8rem] ">
                  <span className="">You:</span>
                  <span className="">Hello</span>
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

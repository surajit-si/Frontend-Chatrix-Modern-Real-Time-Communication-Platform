import { Link } from "react-router-dom";

//icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";

function LeftSideHome() {
  return (
    <div className="h-full w-full max-w-1/3 border-r border-r-double border-(--border) max-lg:max-w-1/2 ">
      <nav className="flex justify-between mt-2 px-4 border-b ">
        {/* AppName */}
        <Link
          to={"/home"}
          className="henny-penny-regular text-(--text)! p-2 no-underline! text-2xl  "
        >
          Chatrix
        </Link>
        {/* icons */}
        <span className="flex gap-3">
          {/* Add */}
          <IoMdAddCircleOutline className=" text-(--text) box-content! p-2 rounded-full hover:bg-(--bg-light) cursor-pointer text-2xl " />
          {/* Menu Dots */}
          <BsThreeDotsVertical className=" text-(--text) box-content! p-2 rounded-full hover:bg-(--bg-light) cursor-pointer text-2xl " />
        </span>
      </nav>

      {/* List Contacts */}
      <ul className="p-1 ">
        <li className="flex text-(--text) items-center py-2 relative border-b border-(--border) ">
          {/* Profile */}
          <div className=" aspect-square h-11 rounded-full ml-2 border border-(--border)! overflow-hidden ">
            <img
              src=""
              alt="profile"
              className="h-full w-full outline-none object-cover block"
            />
          </div>
          {/* Deteals */}
          <span className="ml-2 leading-1">
            {/* Name */}
            <p className="">Surajit Si</p>
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
      </ul>
    </div>
  );
}

export default LeftSideHome;

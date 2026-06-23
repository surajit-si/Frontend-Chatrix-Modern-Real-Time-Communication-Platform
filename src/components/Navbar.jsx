import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className=" flex justify-between items-center mt-2 border-b border-[#00000020] pb-1.5 shadow">
      <p className="ml-4 text-(--text) text-2xl henny-penny-regular my-auto">
        Chatrix
      </p>
      <span className="mr-2">
        <Link to={"/sign-up"} className="btn btn-primary mx-2">
          Sign up
        </Link>
        <Link
          to={"/sign-in"}
          className="btn btn-outline-primary text-(--text) "
        >
          Sign in
        </Link>
      </span>
    </nav>
  );
}
export default Navbar;

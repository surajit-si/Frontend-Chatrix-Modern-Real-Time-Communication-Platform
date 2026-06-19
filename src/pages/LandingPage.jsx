import { useEffect, useState } from "react";
import { getUser } from "../services/user.services.js";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
        }
      })
      .catch((err) => {
        err.response.data && setUserData(err.response.data);
      });
  }, []);
  console.log(userData.statusCode);
  const navigate = useNavigate();
  userData.statusCode == 200 && navigate("/home", { replace: true });

  return (
    <>
      {/* Navbar */}
      <nav className=" flex justify-between mt-2 border-b border-[#00000020] pb-1.5 shadow">
        <h3 className="ml-4">Chatrix</h3>
        <span className="mr-2">
          <Link to={"/sign-up"} class="btn btn-primary mx-2">
            Sign up
          </Link>
          <Link to={"/sign-in"} class="btn btn-outline-primary">
            Sign in
          </Link>
        </span>
      </nav>
      {/* Body */}
      <div className="w-screen h-screen">
        <p className="text-center text-[clamp(10vw,20%,60vw)] tracking-tight font-bold text-[#000]">
          Welcome To <br />
          <p className="">Chatrix</p>
        </p>
      </div>
    </>
  );
}

export default LandingPage;

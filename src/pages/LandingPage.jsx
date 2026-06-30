import "../index.css";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../services/user.services.js";
import { Link, useNavigate } from "react-router-dom";

//components
import Navbar from "../components/Navbar.jsx";
import { UserContext } from "../store/userData.store.jsx";

function LandingPage() {
  // const [userData, setUserData] = useState({});
  const { userData, setUserData } = useContext(UserContext);
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
        // err.response.data && setUserData(null);
        console.log(err);

        err.response.data && setUserData(err.response.data);
      });

    return () => {
      controller.abort();
    };
  }, []);
  console.log(userData?.data?.profile?.isVerified);
  const navigate = useNavigate();
  userData?.statusCode == 200 &&
    userData?.data?.profile.isVerified == true &&
    navigate("/home", { replace: true });

  userData?.statusCode == 200 &&
    userData?.data?.profile.isVerified == false &&
    navigate("/varify-email", { replace: true });

  return (
    <div className="">
      {/* Navbar */}
      <Navbar />
      {/* Body */}
      <div className="w-screen h-screen">
        <p className="text-center text-[clamp(10vw,20%,60vw)] tracking-tight font-bold text-(--text-muted) ">
          Welcome To <br />
          <span className="text-(--text)">Chatrix</span>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;

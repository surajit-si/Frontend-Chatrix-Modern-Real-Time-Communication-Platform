import "../index.css";
import { useContext, useEffect } from "react";
import { getUser } from "../services/user.services.js";
import { useNavigate } from "react-router-dom";

//components
import Navbar from "../components/Navbar.jsx";
import { UserContext } from "../store/userData.store.jsx";

function LandingPage() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getUser({ signal })
      .then((res) => {
        const payload = res?.data?.data ?? res?.data;
        if (!payload) return;

        setUserData(payload);

        if (payload?.profile?.isVerified === true) {
          navigate("/home", { replace: true });
        } else if (payload?.profile?.isVerified === false) {
          navigate("/varify-email", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setUserData(null);
      });

    return () => {
      controller.abort();
    };
  }, [navigate, setUserData]);

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

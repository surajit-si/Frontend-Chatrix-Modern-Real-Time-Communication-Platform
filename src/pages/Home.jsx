//logo
import { IoChatbubblesOutline } from "react-icons/io5";

//components
import HomeNav from "../components/HomeNav.jsx";
import LeftSideHome from "../components/LeftSideHome.jsx";
import RightSideHome from "../components/RightSideHome.jsx";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../services/user.services.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/userData.store.jsx";

function Home() {
  //get user
  const { setUserData, socket } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getUser({ signal })
      .then((res) => {
        const payload = res?.data?.data ?? res?.data;
        if (payload) {
          setUserData(payload);
        }
        socket.connect();
      })
      .catch((err) => {
        setUserData(null);
        console.error(err);

        if (err?.response?.status === 401 || err?.response?.status === 403) {
          navigate("/", { replace: true });
        }
      });

    return () => {
      controller.abort();
    };
  }, [navigate, setUserData, socket]);

  const navIconsArr = [
    { logoIcon: IoChatbubblesOutline, to: "#", selected: true },
  ];

  //lission to back
  window.addEventListener("popstate", () => {
    console.log("Back button pressed");
  });

  //change z index
  //true == current tab is left
  const [onChat, setOnChat] = useState(false);

  return (
    <div className="w-full max-w-450 h-dvh rounded-4xl border border-(--border)! mx-auto sm:flex overflow-hidden max-sm:relative">
      {/* <HomeNav navIconsArr={navIconsArr} /> */}
      {/* left side */}
      <LeftSideHome
        setOnChat={setOnChat}
        className={`${onChat ? `z-0` : `z-50`} max-sm:absolute`}
      />

      {/* right side */}
      <RightSideHome className={`z-10 max-sm:absolute`} />
    </div>
  );
}

export default Home;

//logo
import { IoChatbubblesOutline } from "react-icons/io5";

//components
import HomeNav from "../components/HomeNav.jsx";
import LeftSideHome from "../components/LeftSideHome.jsx";
import RightSideHome from "../components/RightSideHome.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { getUser } from "../services/user.services.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/userData.store.jsx";
import useOnClickElement from "../hooks/useOnClickElement.js";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../store/userDataSlice.js";

function Home() {
  //get user
  const { socket } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getUser({ signal })
      .then((res) => {
        const payload = res?.data?.data ?? res?.data;
        if (payload) {
          dispatch(userDataActions.setUserData(payload));
        }
        socket.connect();
      })
      .catch((err) => {
        dispatch(userDataActions.setUserData(null));
        console.error(err);

        if (err?.response?.status === 401 || err?.response?.status === 403) {
          navigate("/", { replace: true });
        }
      });

    return () => {
      controller.abort();
    };
  }, [navigate, socket]);

  const navIconsArr = [
    { logoIcon: IoChatbubblesOutline, to: "#", selected: true },
  ];

  //change z index
  //true == current tab is left
  const [onChat, setOnChat] = useState(false);

  //left ref
  const leftRef = useRef();
  useOnClickElement(leftRef, () => {
    setOnChat(false);
  });

  //left ref
  const rightRef = useRef();
  useOnClickElement(rightRef, () => {
    setOnChat(true);
  });

  //back button for small screen devices only
  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;

    if (!isSmallScreen) {
      return;
    }

    const handleBackButton = () => {
      setOnChat(false);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <div className="w-full max-w-450 h-dvh rounded-4xl border border-(--border)! mx-auto sm:flex overflow-hidden max-sm:relative select-none">
      {/* <HomeNav navIconsArr={navIconsArr} /> */}
      {/* left side */}
      <LeftSideHome
        ref={leftRef}
        setOnChat={setOnChat}
        className={`${onChat ? `z-0` : `z-50`} max-sm:absolute`}
      />

      {/* right side */}
      <RightSideHome ref={rightRef} className={`z-10 max-sm:absolute`} />
    </div>
  );
}

export default Home;

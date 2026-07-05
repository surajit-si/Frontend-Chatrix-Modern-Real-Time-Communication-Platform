//logo
import { IoChatbubblesOutline } from "react-icons/io5";

//components
import HomeNav from "../components/HomeNav.jsx";
import LeftSideHome from "../components/LeftSideHome.jsx";
import RightSideHome from "../components/RightSideHome.jsx";
import { useContext, useEffect } from "react";
import { getUser } from "../services/user.services.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/userData.store.jsx";

function Home() {
  //get user
  const { userData, setUserData, socket } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getUser({ signal })
      .then((res) => {
        if (res.data) {
          setUserData(res.data);
        }
        //connect socket
        socket.connect();

        console.log(res.data);
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

  const navIconsArr = [
    { logoIcon: IoChatbubblesOutline, to: "#", selected: true },
  ];
  return (
    <div className="w-full max-w-450 h-dvh rounded-4xl border border-(--border)! mx-auto flex overflow-hidden">
      <HomeNav navIconsArr={navIconsArr} />
      {/* left side */}
      <LeftSideHome />

      {/* right side */}
      <RightSideHome />
    </div>
  );
}

export default Home;

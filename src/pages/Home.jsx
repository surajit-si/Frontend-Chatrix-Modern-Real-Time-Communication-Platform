//logo
import { IoChatbubblesOutline } from "react-icons/io5";

//components
import HomeNav from "../components/HomeNav.jsx";
import LeftSideHome from "../components/LeftSideHome.jsx";
import RightSideHome from "../components/RightSideHome.jsx";

function Home() {
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

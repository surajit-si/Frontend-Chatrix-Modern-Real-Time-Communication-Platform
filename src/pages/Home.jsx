//logo
import { IoChatbubblesOutline } from "react-icons/io5";

//components
import HomeNav from "../components/HomeNav.jsx";
import LeftSideHome from "../components/LeftSideHome.jsx";

function Home() {
  const navIconsArr = [
    { logoIcon: IoChatbubblesOutline, to: "#", selected: true },
  ];
  return (
    <div className="w-screen max-w-450 h-screen rounded-4xl border border-(--border) mx-auto my-2 flex">
      <HomeNav navIconsArr={navIconsArr} />
      {/* left side */}
      <LeftSideHome />

      {/* right side */}
      <div className="w-full max-w-2/3 max-lg:max-w-1/2 "></div>
    </div>
  );
}

export default Home;

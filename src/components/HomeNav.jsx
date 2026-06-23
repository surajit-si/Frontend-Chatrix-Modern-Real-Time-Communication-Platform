import CurrTabButton from "./CurrTabButton";

function HomeNav({ navIconsArr = [] }) {
  return (
    <div className="homeNav w-30 border-r border-(--border) flex justify-center items-center flex-col gap-4">
      {navIconsArr.map((item, index) => (
        <CurrTabButton
          key={item.to ?? index}
          LogoIcon={item.logoIcon}
          to={item.to}
          selected={item.selected}
        />
      ))}
    </div>
  );
}

export default HomeNav;

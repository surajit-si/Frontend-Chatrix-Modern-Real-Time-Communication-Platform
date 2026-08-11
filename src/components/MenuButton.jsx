const MenuButton = ({ className, btnName, handler, type }) => {
  const textClass = type === "danger" ? "text-(--danger)!" : "text-(--text)";

  return (
    <span
      className={`${className} text-center whitespace-nowrap cursor-pointer ${textClass} py-2 px-3 `}
      onClick={handler}
    >
      {btnName}
    </span>
  );
};

export default MenuButton;

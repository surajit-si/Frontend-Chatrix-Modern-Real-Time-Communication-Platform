const MenuButton = ({ className, btnName, handler }) => {
  return (
    <span
      className={`${className} text-center whitespace-nowrap cursor-pointer text-(--text) py-2 px-3 `}
      onClick={handler}
    >
      {btnName}
    </span>
  );
};

export default MenuButton;

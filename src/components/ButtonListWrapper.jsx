const ButtonListWrapper = ({ children, className }) => {
  return (
    <li className={`${className}! conversationOption shrink-0 p-1`}>
      {children}
    </li>
  );
};

export default ButtonListWrapper;

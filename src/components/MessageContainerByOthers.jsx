function MessageContainerByOthers({ message, time }) {
  console.log(message);

  return (
    <span
      className={`sendByMe self-start max-w-4/10 min-w-30 text-(--text) float-end px-2 py-1 bg-(--bg-light) border border-(--border)! rounded-lg mx-2 my-2 relative pb-3 `}
    >
      <div
        className={`text-[0.7rem] tracking-wider font-semibold text-[${message.sender.textColor}]`}
        style={{ color: message.sender.textColor }}
      >
        {message.sender.username}
      </div>
      <span>{message.content}</span>
      <span className="text-(--text-muted) text-[0.8rem] ml-2 absolute bottom-0 right-3 ">
        {time}
      </span>
    </span>
  );
}
export default MessageContainerByOthers;

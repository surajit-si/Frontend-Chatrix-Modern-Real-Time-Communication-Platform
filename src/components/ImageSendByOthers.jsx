function ImageSendByOthers({ message, time }) {
  const { height, width } = message;
  return (
    <span className="self-start flex flex-col items-end rounded-md p-2 pb-1 my-1 mx-2 bg-(--bg-light) border border-(--border)!">
      <p
        className="mb-1 text-xs text-gray-500 self-start font-bold "
        style={{ color: message.sender.textColor }}
      >
        {message.sender.username}
      </p>
      <img
        src={message.content}
        alt="Image you sent"
        className="h-auto w-full max-w-80 rounded-md object-cover"
        style={{ aspectRatio: width / height }}
      />
      <span className="text-(--text-muted) text-[0.8rem] mt-1  right-3 ">
        {time}
      </span>
    </span>
  );
}

export default ImageSendByOthers;

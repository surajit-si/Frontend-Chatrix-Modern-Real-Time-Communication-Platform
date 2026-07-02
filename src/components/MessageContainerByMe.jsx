function MessageContainerByMe({ messageText, time }) {
  return (
    <span className="sendByMe self-end max-w-4/10 min-w-20 text-(--text) float-end px-2 py-1 bg-(--primary) rounded-lg mx-2 my-2 relative pb-3">
      
      {messageText}
      <span className="text-(--text-muted) text-[0.8rem] ml-2 absolute bottom-0 right-3 ">
        {time}
      </span>
    </span>
  );
}
export default MessageContainerByMe;

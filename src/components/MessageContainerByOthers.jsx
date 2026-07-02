function MessageContainerByOthers({ messageText, time, sendBy }) {
  return (
    <span className="sendByMe self-start max-w-4/10 min-w-30 text-(--text) float-end px-2 py-1 bg-(--bg-light) border border-(--border)! rounded-lg mx-2 my-2 relative pb-3 ">
      <div className="text-[0.7rem] tracking-wider text-violet-600 font-semibold ">
        {sendBy}
      </div>
      <span>{messageText}</span>
      <span className="text-(--text-muted) text-[0.8rem] ml-2 absolute bottom-0 right-3 ">
        {time}
      </span>
    </span>
  );
}
export default MessageContainerByOthers;

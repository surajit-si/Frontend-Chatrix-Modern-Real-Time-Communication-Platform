function ImageSendByMe({ message, time }) {
  const { height, width } = message;
  return (
    <span className="self-end flex flex-col items-end rounded-md bg-(--primary) p-2 pb-1 my-1">
      {/* <p className="mb-1 text-xs text-gray-500 self-start">you</p> */}
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

export default ImageSendByMe;

/* 
__v: 0
_id: "6af7c2a31bf4903e254aad8d"
bytes: 64964
content: "https://res.cloudinary.com/dshempuqv/image/upload/v1794622114/ge4zffe8pjyykietad2g.jpg"
conversation: Object { _id: "6af51d5a501aec6c13fe7fb7", isGroup: true, groupName: "Admin News", … }
createdAt: 2026-11-14T02:08:35.565Z"
format: "jpg"
height: 2000
messageType: "image"
sender: Object { _id: "6af51b47501aec6c13fe7fb2", username: "admin", fullName: "surajit", … }
updatedAt: "2026-11-14T02:08:35.565Z"
width: 2000
*/

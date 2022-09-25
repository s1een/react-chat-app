import React from "react";
import CamImage from "../img/cam.png";
import AddImage from "../img/add.png";
import MoreImage from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chat-info">
        <div className="user-info-container">
          {data.user?.photoURL && <img src={data.user?.photoURL} alt="" />}
          <span>{data.user?.displayName?.toUpperCase()}</span>
        </div>
        <div className="chat-icons">
          <img src={CamImage} alt="video call" />
          <img src={AddImage} alt="add friend" />
          <img src={MoreImage} alt="more" />
        </div>
      </div>
      {data.chatId === "null" ? (
        <div className="messages empty">
          Select a contact to start chatting. 😉
        </div>
      ) : (
        <>
          <Messages />
          <Input />
        </>
      )}
    </div>
  );
}

export default Chat;

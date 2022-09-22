import React from "react";
import CamImage from "../img/cam.png";
import AddImage from "../img/add.png";
import MoreImage from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";

function Chat() {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>Jane</span>
        <div className="chat-icons">
          <img src={CamImage} alt="video call" />
          <img src={AddImage} alt="add friend" />
          <img src={MoreImage} alt="more" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;

import React from "react";
import Img from "../img/img.png";
import AttachImage from "../img/attach.png";

function Input() {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <img src={AttachImage} alt="Attach" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={Img} alt="file" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
}

export default Input;

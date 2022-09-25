import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { format } from "timeago.js";

function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    }
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  function handleSelect(info) {
    dispatch({ type: "CHANGE_USER", payload: info });
  }
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={`user-chat`}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="user-chat-info">
              <div className="chat-top">
                <span>{chat[1].userInfo.displayName}</span>
                <p className="date-msg">{format(chat[1].date?.toDate())}</p>
              </div>
              <p>
                {chat[1].lastMessage?.text.length > 40
                  ? `${chat[1].lastMessage?.text.substring(0, 40)}...`
                  : chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;

import { useState } from "react";
import { Video, Phone, Search, MoreVertical, Send, Paperclip, Smile } from "lucide-react";
import "./Chat.css";
import { Navbar } from "./Home";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const chats = [
    { id: 1, name: "Sarah Kim", lastMsg: "Thanks for the session!", time: "10:42 AM", online: true, unread: 2, avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 2, name: "Rahul Patel", lastMsg: "See you at 6 PM", time: "Yesterday", online: false, unread: 0, avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 3, name: "Maria Lopez", lastMsg: "¡Claro! Podemos practicar conversación", time: "Monday", online: true, unread: 5, avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 4, name: "Alex Chen", lastMsg: "Check this React hook", time: "2 days ago", online: false, unread: 0, avatar: "https://i.pravatar.cc/150?img=1" },
  ];

  const messages = selectedChat ? [
    { id: 1, text: "Hey! Ready for our session?", sender: "them", time: "10:30 AM" },
    { id: 2, text: "Yes! Just setting up my screen", sender: "me", time: "10:31 AM" },
    { id: 3, text: "Great! I'll share the Zoom link in 2 mins", sender: "them", time: "10:32 AM" },
    { id: 4, text: "Perfect, thanks!", sender: "me", time: "10:33 AM" },
  ] : [];

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <>
      {/* Navbar from homepage */}
      <Navbar />

      <div className="chat-app">
        {/* Chat List Sidebar */}
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h2>Messages</h2>
            <div className="search-box">
              <Search size={20} />
              <input type="text" placeholder="Search chats..." />
            </div>
          </div>

          <div className="chat-list">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat === chat.id ? "active" : ""}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                <div className="chat-info">
                  <div className="chat-name-status">
                    <h3>{chat.name}</h3>
                    {chat.online && <span className="online-dot"></span>}
                  </div>
                  <p className="last-message">{chat.lastMsg}</p>
                </div>
                <div className="chat-meta">
                  <span className="time">{chat.time}</span>
                  {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-user-info">
                  <img src={currentChat.avatar} alt={currentChat.name} className="header-avatar" />
                  <div>
                    <h3>{currentChat.name}</h3>
                    <p className="status-text">
                      {currentChat.online ? "Online" : "Last seen recently"}
                    </p>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="video-call-btn" title="Start Video Call">
                    <Video size={24} />
                  </button>
                  
                  <button className="more-btn">
                    <MoreVertical size={22} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-area">
                {messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="message-input-area">
                <button className="attach-btn">
                  <Paperclip size={22} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && message && alert("Sent: " + message)}
                />
                <button className="emoji-btn">
                  <Smile size={22} />
                </button>
                <button className="send-btn" disabled={!message.trim()}>
                  <Send size={22} />
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="empty-state">
                <div className="chat-bubble-icon">Chat</div>
                <h2>Welcome to SkillXchange Chat</h2>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import classes from "./chat.module.css";

const ChatPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "user", text: "Xin chào" },
        { sender: "user", text: "Làm thế nào để xem các sản phẩm" },
        { sender: "admin", text: "Chào bạn" },
        { sender: "admin", text: "Bạn có thể vào mục Shop để xem các sản phẩm" },
    ]);
    const [input, setInput] = useState("");

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { sender: "user", text: input }]);
        setInput("");

        // Giả lập phản hồi từ Admin
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "admin", text: "Cảm ơn bạn! Chúng tôi sẽ hỗ trợ ngay." },
            ]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <Button
                variant="dark"
                className={` ${classes.button_messenger} position-fixed bottom-3 end-3 rounded-circle p-3 shadow-lg`}
                onClick={toggleChat}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-messenger" viewBox="0 0 16 16">
                    <path
                        d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.64.64 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.64.64 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/>
                </svg>
                {/*<i className={`bi ${isOpen ? "bi-x-lg" : "bi-chat-dots-fill"} fs-4`}></i>*/}
            </Button>

            {/* Chat Modal */}
            <Modal show={isOpen} onHide={toggleChat} className={classes.chatModal}>
                <Modal.Header closeButton className={classes.chatHeader}>
                    <Modal.Title  className={classes["modal-title"]}>
                        <i className="bi bi-chat-left-text me-2"></i>Customer Support
                    </Modal.Title>
                    <span className={classes.chatApp}>Let's chat app</span>
                </Modal.Header>
                <Modal.Body className={classes.chatBody}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${classes.messageContainer} ${msg.sender === "user" ? classes.userMessageWrap : ''}`}>
                            {msg.sender === "admin" && (
                                <div className={classes.userAvatar}><img
                                    alt="Руслан"
                                    src="https://gaming-cdn.com/images/avatars/16468750-1641881764.jpg" loading="lazy"
                                    className="ig-avatar" /></div>
                            )}
                            <div className={msg.sender === "user" ? classes.userMessage : classes.adminMessage}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer className={classes.chatFooter}>
                    <div className={classes.inputContainer}>
                        <div className={classes.userAvatar}><img
                             alt="Руслан"
                            src="https://gaming-cdn.com/images/avatars/16468750-1641881764.jpg" loading="lazy"
                            className="ig-avatar" /></div>
                        <Form.Control
                            type="text"
                            placeholder="Enter Message!"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            className={classes.chatInput}
                        />
                        <svg className={`${classes.icon} bi bi-paperclip`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path
                                d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
                        </svg>
                        <svg className={`${classes.icon} bi bi-emoji-smile`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path
                                d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
                        </svg>
                        <Button variant="link" onClick={sendMessage} className={classes.chatSendBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-send-fill" viewBox="0 0 16 16">
                                <path
                                    d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                            </svg>
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChatPopup;

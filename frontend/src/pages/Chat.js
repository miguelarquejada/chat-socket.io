import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import socketIOClient from "socket.io-client"
const socket = socketIOClient("http://127.0.0.1:3001")

function Chat(props) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef(null)
  
  useEffect(() => {
    scrollToBottom()
    socket.on('message', obj => {
      setMessages(msg => [...msg, obj])
    })
  },[])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  
  const sendMessage = () => {
    if(newMessage) {
      socket.emit('message', {
        user: props.user,
        message: newMessage
      })
      setNewMessage('')
    }
  }

  const handleKeyPress = e => e.key === 'Enter' ? sendMessage() : null

  return (
    <div id="page-chat">
      <div id="chat-area">
        <ul id="messages" >
          { 
            messages && messages.map((obj, i) => {
              return (
                <li key={i} className="message-area">
                  <span className="username">{obj.user}</span>
                  <span className="user-message">{obj.message}</span>
                </li>
              )
            })
          }
          <div ref={scrollRef}></div>
        </ul>
        <div id="form">
          <input onChange={e => setNewMessage(e.target.value)} value={newMessage} onKeyPress={handleKeyPress} type="text" placeholder="Digite uma mensagem..."/>
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
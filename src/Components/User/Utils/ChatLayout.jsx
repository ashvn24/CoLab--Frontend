import React from 'react'
import ChatMessage from './ChatMessage'

const ChatLayout = ({usr, usrname}) => {
  return (
    <nav
      className="md:flex flex-col justify-between min-w-[950px] min-h-[610px] rounded-tr-3xl rounded-br-3xl  bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png)",
      }}
    >
        {usr && <ChatMessage usr={usr} usrname={usrname}/>}
      
    </nav>
  )
}

export default ChatLayout

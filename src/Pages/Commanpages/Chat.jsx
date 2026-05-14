import React, { useState } from 'react';
import {
  MessageCircle,
  Send,
  User,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Image,
  Mic,
  CheckCheck,
  Clock,
  Circle,
  Sparkles,
  ArrowLeft,
  X
} from 'lucide-react';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);

  const chats = [
    {
      id: 1,
      name: 'Mr. Rahim Khan',
      role: 'Chip Instructor',
      avatar: 'RK',
      status: 'online',
      lastSeen: 'Online',
      unread: 2,
      messages: [
        { id: 1, sender: 'teacher', text: 'Have you submitted your web development project?', time: '10:30 AM', status: 'read' },
        { id: 2, sender: 'student', text: 'Not yet sir, I am working on it.', time: '10:32 AM', status: 'read' },
        { id: 3, sender: 'teacher', text: 'Please submit it by tomorrow.', time: '10:33 AM', status: 'read' },
        { id: 4, sender: 'student', text: 'Yes sir, I will submit it today.', time: '10:35 AM', status: 'read' }
      ]
    },
    {
      id: 2,
      name: 'Ms. Fatema Begum',
      role: 'Senior Instructor',
      avatar: 'FB',
      status: 'offline',
      lastSeen: 'Last seen 2 hours ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'teacher', text: 'Your database assignment is excellent!', time: 'Yesterday', status: 'read' },
        { id: 2, sender: 'student', text: 'Thank you maam!', time: 'Yesterday', status: 'read' }
      ]
    },
    {
      id: 3,
      name: 'Mr. Hasan Ahmed',
      role: 'Instructor',
      avatar: 'HA',
      status: 'online',
      lastSeen: 'Online',
      unread: 1,
      messages: [
        { id: 1, sender: 'teacher', text: 'Class tomorrow at 9 AM sharp.', time: '09:00 AM', status: 'read' },
        { id: 2, sender: 'student', text: 'Okay sir.', time: '09:05 AM', status: 'read' },
        { id: 3, sender: 'teacher', text: 'Bring your lab manual.', time: '09:10 AM', status: 'sent' }
      ]
    },
    {
      id: 4,
      name: 'Sumaiya Akter',
      role: 'Classmate',
      avatar: 'SA',
      status: 'online',
      lastSeen: 'Online',
      unread: 0,
      messages: [
        { id: 1, sender: 'student', text: 'Did you understand the algorithm topic?', time: '11:00 AM', status: 'read' },
        { id: 2, sender: 'student', text: 'Yes, I can help you if you want.', time: '11:05 AM', status: 'read' }
      ]
    },
    {
      id: 5,
      name: 'Tanvir Islam',
      role: 'Classmate',
      avatar: 'TI',
      status: 'offline',
      lastSeen: 'Last seen 1 hour ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'student', text: 'Group study tonight?', time: '06:00 PM', status: 'read' }
      ]
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentChat = selectedChat ? chats.find(c => c.id === selectedChat) : null;

  const sendMessage = () => {
    if (messageInput.trim()) {
      console.log('Message sent:', messageInput);
      setMessageInput('');
    }
  };

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    setIsMobileSidebarOpen(false);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setIsMobileSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      
      <div className="container py-4 sm:py-6 lg:py-8">
        
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-2 sm:mb-3 shadow-md border border-gray-100">
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Real Time Communication</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Messages</span>
          </h1>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex h-[calc(100vh-200px)] sm:h-[500px] lg:h-[600px]">
            
            <div className={`${isMobileSidebarOpen ? 'w-full' : 'hidden'} lg:block lg:w-96 w-full border-r border-gray-100 flex flex-col`}>
              <div className="p-3 sm:p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`w-full p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 ${
                      selectedChat === chat.id ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                        {chat.avatar}
                      </div>
                      {chat.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-400 flex-shrink-0">{chat.messages[chat.messages.length - 1]?.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{chat.role}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5 sm:mt-1">
                        {chat.messages[chat.messages.length - 1]?.text}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-white">{chat.unread}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {currentChat ? (
              <div className={`${!isMobileSidebarOpen ? 'w-full' : 'hidden'} lg:flex flex-1 flex-col`}>
                <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <button 
                      onClick={handleBackToList}
                      className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 flex-shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                        {currentChat.avatar}
                      </div>
                      {currentChat.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{currentChat.name}</h3>
                      <p className="text-xs text-gray-400 truncate">
                        {currentChat.status === 'online' ? 'Online' : currentChat.lastSeen}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gradient-to-b from-gray-50 to-white">
                  {currentChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] sm:max-w-[70%] ${message.sender === 'student' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-2xl p-2.5 sm:p-3 ${
                          message.sender === 'student'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-xs sm:text-sm break-words">{message.text}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-xs text-gray-400 ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                          <span>{message.time}</span>
                          {message.sender === 'student' && (
                            message.status === 'read' ? <CheckCheck className="w-3 h-3 text-indigo-500" /> : <Clock className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 sm:p-4 border-t border-gray-100 bg-white">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
                      <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
                      <Image className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm"
                    />
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
                      <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                    <button 
                      onClick={sendMessage}
                      className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition-all flex-shrink-0"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-6 sm:p-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">No conversation selected</h3>
                <p className="text-xs sm:text-sm text-gray-400 text-center">
                  Select a chat from the list to start messaging
                </p>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Chat;
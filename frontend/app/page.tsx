'use client'

import React from 'react';

interface Conversation {
  username: string;
  avatar: string;
}

const ChatPage: React.FC = () => {
  // Mock conversation data
  const conversations: Conversation[] = [
    { username: 'User1', avatar: 'avatar1.jpg' },
    { username: 'User2', avatar: 'avatar2.jpg' },
    // ... more conversations
  ];

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200">
        <h2 className="text-xl font-bold p-4">Conversations</h2>
        <div>
          {conversations.map((conversation, index) => (
            <div key={index} className="flex items-center p-4 hover:bg-gray-300">
              <img src="https://picsum.photos/50/50?random=4" alt={conversation.username} className="w-8 h-8 rounded-full mr-2" />
              <span>{conversation.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 bg-gray-100">
        {/* Chat Display */}
        <div className="h-4/5 border-b border-gray-300">Chat Display Area</div>

        {/* Bottom Bar */}
        <div className="flex items-center p-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 mr-2 p-2 border border-gray-300 rounded-md"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

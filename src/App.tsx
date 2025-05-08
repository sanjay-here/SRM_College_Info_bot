import React from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import { useChatbot } from './hooks/useChatbot';

function App() {
  const { messages, isTyping, sendMessage, predefinedQuestions } = useChatbot();

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  const handleSelectQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />
      <ChatInterface
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        predefinedQuestions={predefinedQuestions}
        onSelectQuestion={handleSelectQuestion}
      />
    </div>
  );
}

export default App;
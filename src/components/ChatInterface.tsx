import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import PredefinedQuestions from './PredefinedQuestions';
import ChatBotAnimation from './ChatBotAnimation';
import { Message, PredefinedQuestion } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  predefinedQuestions: PredefinedQuestion[];
  onSelectQuestion: (question: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isTyping,
  onSendMessage,
  predefinedQuestions,
  onSelectQuestion,
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg border border-gray-700">
        <div className="flex flex-col h-[calc(100vh-180px)]">
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <div className="hidden md:flex md:w-20 bg-gray-900 items-center justify-center border-r border-gray-700">
              <ChatBotAnimation isTyping={isTyping} />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="bg-gray-900 p-3 md:hidden flex justify-center border-b border-gray-700">
                <ChatBotAnimation isTyping={isTyping} />
              </div>
              <MessageList messages={messages} isTyping={isTyping} />
              <PredefinedQuestions
                questions={predefinedQuestions}
                onSelectQuestion={onSelectQuestion}
                disabled={isTyping}
              />
              <UserInput onSendMessage={onSendMessage} disabled={isTyping} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
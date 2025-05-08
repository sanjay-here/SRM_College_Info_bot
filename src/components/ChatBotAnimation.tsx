import React, { useEffect, useState } from 'react';
import { Bot, Waves as Waving, BookOpen, Smile } from 'lucide-react';

interface ChatBotAnimationProps {
  isTyping: boolean;
}

const ChatBotAnimation: React.FC<ChatBotAnimationProps> = ({ isTyping }) => {
  const [animationState, setAnimationState] = useState(0);
  const [botAction, setBotAction] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isTyping) {
      interval = setInterval(() => {
        setAnimationState((prev) => (prev + 1) % 3);
      }, 500) as unknown as number;
    } else {
      setAnimationState(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTyping]);

  useEffect(() => {
    const actionInterval = setInterval(() => {
      setBotAction((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(actionInterval);
  }, []);

  const renderBotIcon = () => {
    switch (botAction) {
      case 0:
        return <Waving className="h-8 w-8 text-white animate-wave" />;
      case 1:
        return <BookOpen className="h-8 w-8 text-white animate-study" />;
      case 2:
        return <Smile className="h-8 w-8 text-white animate-bounce" />;
      default:
        return <Bot className="h-8 w-8 text-white animate-walk" />;
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="animate-float bg-blue-500/20 rounded-full w-16 h-16 absolute top-0 left-0" />
        <div className="animate-float-delayed bg-purple-500/20 rounded-full w-12 h-12 absolute top-4 right-0" />
      </div>
      <div 
        className={`rounded-full bg-gradient-to-br from-blue-500 to-blue-700 p-4 shadow-lg transition-all duration-500 relative
          ${isTyping ? 'scale-110 animate-pulse' : 'scale-100 hover:scale-105'}`}
      >
        <div className="absolute -top-3 -right-2">
          <div className="bg-blue-400 rounded-lg p-1 transform rotate-12 animate-float">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
        </div>
        {renderBotIcon()}
      </div>
      {isTyping && (
        <div className="mt-3 flex space-x-1">
          <div 
            className={`h-2 w-2 rounded-full transition-all duration-300
              ${animationState === 0 ? 'bg-blue-400 scale-125' : 'bg-blue-700 scale-100'}`}
          />
          <div 
            className={`h-2 w-2 rounded-full transition-all duration-300
              ${animationState === 1 ? 'bg-blue-400 scale-125' : 'bg-blue-700 scale-100'}`}
          />
          <div 
            className={`h-2 w-2 rounded-full transition-all duration-300
              ${animationState === 2 ? 'bg-blue-400 scale-125' : 'bg-blue-700 scale-100'}`}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBotAnimation;
import React, { useState, KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react';

interface UserInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-700 p-4 bg-gray-800">
      <div className="flex items-center max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about SRM Ramapuram..."
          className="flex-1 py-2 px-4 rounded-full border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={disabled}
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className={`ml-2 bg-blue-600 text-white p-2 rounded-full transition-all duration-300 ${
            disabled || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'
          }`}
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default UserInput;
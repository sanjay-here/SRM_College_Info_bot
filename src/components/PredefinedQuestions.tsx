import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PredefinedQuestion } from '../types';

interface PredefinedQuestionsProps {
  questions: PredefinedQuestion[];
  onSelectQuestion: (question: string) => void;
  disabled: boolean;
}

const PredefinedQuestions: React.FC<PredefinedQuestionsProps> = ({
  questions,
  onSelectQuestion,
  disabled,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border-t border-gray-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-between text-gray-300 hover:text-white transition-colors"
      >
        <span className="font-medium text-sm">Suggested questions</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {questions.map((question) => (
            <button
              key={question.id}
              onClick={() => onSelectQuestion(question.text)}
              disabled={disabled}
              className={`py-1 px-3 text-sm rounded-full text-left transition-all duration-300 ${
                disabled
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700/50 text-gray-200 hover:bg-blue-600/50 hover:text-white'
              }`}
            >
              {question.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredefinedQuestions;
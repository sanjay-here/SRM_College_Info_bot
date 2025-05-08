import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, PredefinedQuestion } from '../types';
import queryProcessor from '../utils/queryProcessor';

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  
  const getTopicSpecificQuestions = (topic: string): PredefinedQuestion[] => {
    switch (topic.toLowerCase()) {
      case 'courses':
        return [
          { id: 'c1', text: 'What are the engineering courses?', category: 'courses' },
          { id: 'c2', text: 'Tell me about MBA program', category: 'courses' },
          { id: 'c3', text: 'What is the duration of B.Tech?', category: 'courses' }
        ];
      case 'departments':
        return [
          { id: 'd1', text: 'What facilities are in CSE department?', category: 'departments' },
          { id: 'd2', text: 'Who is the HOD of ECE?', category: 'departments' },
          { id: 'd3', text: 'Research activities in Mechanical?', category: 'departments' }
        ];
      case 'facilities':
        return [
          { id: 'f1', text: 'Tell me about hostel facilities', category: 'facilities' },
          { id: 'f2', text: 'What sports facilities are available?', category: 'facilities' },
          { id: 'f3', text: 'Library working hours?', category: 'facilities' }
        ];
      case 'admission':
        return [
          { id: 'a1', text: 'What are the entrance exams?', category: 'admission' },
          { id: 'a2', text: 'Documents required for admission?', category: 'admission' },
          { id: 'a3', text: 'When does admission start?', category: 'admission' }
        ];
      case 'placements':
        return [
          { id: 'p1', text: 'Which companies visit campus?', category: 'placements' },
          { id: 'p2', text: 'What is the highest package?', category: 'placements' },
          { id: 'p3', text: 'Internship opportunities?', category: 'placements' }
        ];
      default:
        return defaultPredefinedQuestions;
    }
  };

  const defaultPredefinedQuestions: PredefinedQuestion[] = [
    { id: '1', text: 'What courses are offered?', category: 'courses' },
    { id: '2', text: 'Tell me about the departments', category: 'departments' },
    { id: '3', text: 'What facilities are available?', category: 'facilities' },
    { id: '4', text: 'How can I apply for admission?', category: 'admission' },
    { id: '5', text: 'What events happen at the college?', category: 'events' },
    { id: '6', text: 'What student clubs can I join?', category: 'clubs' },
    { id: '7', text: 'How are the placements?', category: 'placements' },
    { id: '8', text: 'How can I contact the college?', category: 'contact' },
  ];

  const [predefinedQuestions, setPredefinedQuestions] = useState<PredefinedQuestion[]>(defaultPredefinedQuestions);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      text: "Hello! I'm the SRM Ramapuram College bot. How can I help you today? You can ask me about courses, departments, facilities, admission, events, clubs, placements, or contact information.",
      type: 'bot',
      timestamp: new Date(),
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const addMessage = (text: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: uuidv4(),
      text,
      type,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage;
  };

  const simulateTyping = (text: string) => {
    const typingSpeed = 15;
    const minTypingTime = 1000;
    const maxTypingTime = 3000;
    
    const typingTime = Math.min(
      Math.max(text.length * typingSpeed, minTypingTime),
      maxTypingTime
    );
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, typingTime);
    });
  };

  const detectTopic = (text: string): string | null => {
    const topics = ['courses', 'departments', 'facilities', 'admission', 'placements'];
    return topics.find(topic => text.toLowerCase().includes(topic)) || null;
  };

  const sendMessage = async (text: string) => {
    addMessage(text, 'user');
    setIsTyping(true);
    
    try {
      if (text.toLowerCase().includes('thank')) {
        setPredefinedQuestions(defaultPredefinedQuestions);
        setCurrentTopic(null);
        const response = "You're welcome! Feel free to ask me anything else about SRM Ramapuram College.";
        await simulateTyping(response);
        addMessage(response, 'bot');
      } else {
        const response = await queryProcessor.processQuery(text);
        await simulateTyping(response);
        addMessage(response, 'bot');
        
        const detectedTopic = detectTopic(text);
        if (detectedTopic && detectedTopic !== currentTopic) {
          setCurrentTopic(detectedTopic);
          setPredefinedQuestions(getTopicSpecificQuestions(detectedTopic));
        }
      }
    } catch (error) {
      console.error('Error processing query:', error);
      addMessage("I'm sorry, I encountered an error while processing your query. Please try again.", 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    predefinedQuestions,
  };
};
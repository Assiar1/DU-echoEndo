import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { chatbotResponses, welcomeMessage, fallbackResponse } from '@/data/chatbotData';

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'bot', text: string}[]>([
    {type: 'bot', text: welcomeMessage}
  ]);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const findBestResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Rechercher la meilleure correspondance parmi les mots-clés
    const matchedResponses = chatbotResponses.map(item => {
      const keywordMatches = item.keywords.filter(keyword => 
        lowerCaseMessage.includes(keyword.toLowerCase())
      );
      return { 
        response: item.response, 
        matchCount: keywordMatches.length 
      };
    });
    
    // Trier par nombre de correspondances
    matchedResponses.sort((a, b) => b.matchCount - a.matchCount);
    
    // Retourner la réponse avec le plus de correspondances, ou la réponse par défaut
    return matchedResponses[0]?.matchCount > 0 
      ? matchedResponses[0].response 
      : fallbackResponse;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = message.trim();
    setChatHistory([...chatHistory, {type: 'user', text: userMessage}]);
    setMessage('');
    
    // Get bot response based on message keywords
    setTimeout(() => {
      const botResponse = findBestResponse(userMessage);
      setChatHistory(prev => [...prev, {type: 'bot', text: botResponse}]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-medical-blue text-white p-3 rounded-full shadow-lg hover:bg-medical-dark-blue transition-colors z-50"
        aria-label="Chat avec nous"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-xl shadow-xl z-50 flex flex-col border border-gray-200">
          <div className="bg-medical-blue text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="font-medium">Assistant virtuel DU Endoscopie</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-grow max-h-96 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((entry, index) => (
              <div 
                key={index} 
                className={`flex ${entry.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    entry.type === 'user' 
                      ? 'bg-medical-light-blue text-medical-dark-blue rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {entry.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t p-3 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-medical-blue"
            />
            <button 
              type="submit"
              className="bg-medical-blue text-white px-4 py-2 rounded-r-lg hover:bg-medical-dark-blue"
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
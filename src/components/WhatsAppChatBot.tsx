'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WhatsAppChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hello! 👋 Welcome to Locotraq! I'm here to help you with GPS tracking solutions. How can I assist you today?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputText.toLowerCase());
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    if (userInput.includes('price') || userInput.includes('cost')) {
      return "Our GPS trackers range from ₹1,500 to ₹15,000 depending on features. Would you like me to connect you with our sales team for detailed pricing? 📱";
    }
    if (userInput.includes('product') || userInput.includes('gps') || userInput.includes('tracker')) {
      return "We offer 18+ GPS tracking solutions including:\n• Vehicle Trackers\n• Personal Safety Devices\n• Pet Trackers\n• Asset Monitoring\n• Industrial Solutions\n\nWhich category interests you? 🚗";
    }
    if (userInput.includes('contact') || userInput.includes('call') || userInput.includes('phone')) {
      return "You can reach us at:\n📞 +91 6390 057 777\n📧 support@locotraq.com\n\nOr click below to chat directly on WhatsApp! 💬";
    }
    if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
      return "Hello! Great to hear from you! 😊 Are you looking for GPS tracking solutions for vehicles, personal safety, or business assets?";
    }
    if (userInput.includes('help') || userInput.includes('support')) {
      return "I'm here to help! You can:\n• Browse our products\n• Get pricing information\n• Schedule a demo\n• Contact our support team\n\nWhat would you like to know more about? 🤝";
    }
    return "Thanks for your message! For detailed assistance, I'll connect you with our expert team. Click the WhatsApp button below to chat directly with us! 🚀";
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hi! I'm interested in Locotraq GPS tracking solutions. Can you help me?");
    window.open(`https://wa.me/916390057777?text=${message}`, '_blank');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {isOpen && (
          <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-1">
                  <Image
                    src="/images/MainLogo.jpg"
                    alt="Locotraq"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Locotraq Support</h3>
                  <p className="text-xs text-green-100">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
                      )}
                      <div>
                        <p className="whitespace-pre-line">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-200 px-3 py-2 rounded-lg text-sm max-w-xs">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-green-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                Continue on WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                !
              </div>
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default WhatsAppChatBot;
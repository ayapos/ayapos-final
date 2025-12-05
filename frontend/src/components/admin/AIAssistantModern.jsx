import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import axios from 'axios';

const AIAssistantModern = ({ currentPage, onContentUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Salut ! Je suis ton assistant AI. Je peux t\'aider à modifier le contenu de ton site en quelques secondes. Essaie par exemple :\n\n💬 "Change le titre en..."\n🖼️ "Modifie l\'image principale"\n💰 "Ajoute un nouveau tarif"\n\nComment puis-je t\'aider ?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL || '';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    setIsLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      
      const response = await axios.post(
        `${API_URL}/api/ai-assistant/chat`,
        {
          message: userMessage,
          currentPage: currentPage?.slug || 'home',
          context: {
            pageTitle: currentPage?.label || 'Page d\'accueil'
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date()
      }]);

      if (response.data.contentUpdated && onContentUpdate) {
        onContentUpdate();
      }

    } catch (error) {
      console.error('Erreur AI:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Désolé, une erreur est survenue. Peux-tu reformuler ?',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button - Plus grand et plus visible */}
      {!isOpen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Opening AI Assistant...");
            setIsOpen(true);
          }}
          className="fixed bottom-8 right-8 group"
          style={{ zIndex: 10000 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
            
            {/* Main button */}
            <div className="relative bg-gradient-to-r from-blue-700 to-blue-800 text-white p-5 rounded-full shadow-2xl group-hover:scale-110 transition-all duration-300">
              <Sparkles className="h-7 w-7 animate-pulse" />
            </div>
            
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
            
            {/* Badge AI */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center shadow-lg animate-bounce">
              AI
            </div>
          </div>
        </button>
      )}

      {/* Chat Window - Design Moderne Style Messenger */}
      {isOpen && !isMinimized && (
        <div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[480px] h-[650px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          style={{ zIndex: 10000 }}
        >
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <Bot className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Assistant AI</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white/90">En ligne</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <Minimize2 className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white p-2.5 rounded-2xl shadow-lg">
                      <Bot className="h-5 w-5" />
                    </div>
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] rounded-3xl px-5 py-3 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <span className={`text-xs mt-2 block ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {new Date(message.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2.5 rounded-2xl shadow-lg">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-2.5 rounded-2xl shadow-lg">
                    <Bot className="h-5 w-5" />
                  </div>
                </div>
                <div className="bg-white rounded-3xl rounded-bl-md px-5 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-2 items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">Je réfléchis...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white border-t border-gray-100">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tape ton message ici..."
                  className="w-full resize-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px] transition-all"
                  rows="1"
                  disabled={isLoading}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3.5 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              💡 Appuie sur <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">Entrée</kbd> pour envoyer
            </p>
          </div>
        </div>
      )}

      {/* Minimized State */}
      {isOpen && isMinimized && (
        <div 
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-transform"
          style={{ zIndex: 10000 }}
        >
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6" />
            <span className="font-semibold">Assistant AI</span>
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistantModern;

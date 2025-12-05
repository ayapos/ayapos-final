import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, Sparkles } from 'lucide-react';
import axios from 'axios';

const AIAssistant = ({ currentPage, onContentUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Bonjour ! Je suis votre assistant AI pour gérer le contenu de votre site. Vous pouvez me demander de modifier n\'importe quel élément en langage naturel. Par exemple :\n\n• "Change le titre de la page en..."\n• "Ajoute une nouvelle fonctionnalité"\n• "Modifie l\'image hero"\n• "Change les tarifs de..."\n\nQue voulez-vous modifier ?'
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
    
    // Ajouter le message utilisateur
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage
    }]);

    setIsLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      
      // Envoyer la requête à l'agent AI backend
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

      // Ajouter la réponse de l'AI
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.message
      }]);

      // Si des modifications ont été faites, notifier le parent
      if (response.data.contentUpdated && onContentUpdate) {
        onContentUpdate();
      }

    } catch (error) {
      console.error('Erreur AI:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Désolé, une erreur est survenue. Pouvez-vous reformuler votre demande ?'
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
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => {
            console.log("AI Button clicked, opening chat...");
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 z-[9999] group"
          style={{ zIndex: 9999 }}
        >
          <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            AI
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-[9999] border border-gray-200" style={{ zIndex: 9999 }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Assistant AI</h3>
                <p className="text-xs text-white/80">Toujours là pour vous aider</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white p-2 rounded-full h-8 w-8 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 bg-blue-600 text-white p-2 rounded-full h-8 w-8 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white p-2 rounded-full h-8 w-8 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm border border-gray-100">
                  <div className="flex gap-2 items-center">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                    <span className="text-sm text-gray-600">Réflexion en cours...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Demandez-moi de modifier le contenu..."
                className="flex-1 resize-none border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed self-end"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Astuce : Soyez précis dans vos demandes pour de meilleurs résultats
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;

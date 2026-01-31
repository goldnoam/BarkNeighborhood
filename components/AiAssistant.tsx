
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Info } from 'lucide-react';
import { dogExpertChat } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
}

const AiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'היי! אני המומחה הדיגיטלי שלכם. יש לכם שאלה על הכלב? על אילוף? או אולי מה לקנות לו?', sender: 'ai' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await dogExpertChat(input);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col h-[75vh] max-h-[600px] overflow-hidden">
      {/* AI Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">מומחה הכלבים שלכם</h3>
            <span className="text-[10px] text-slate-400 block">זמין להתייעצות 24/7</span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
              <span className="text-xs text-slate-400 italic">המומחה חושב...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="שאל אותי משהו..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 pr-12 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-xl disabled:opacity-50 hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiAssistant;

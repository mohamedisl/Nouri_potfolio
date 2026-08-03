import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Check, 
  Copy, 
  Terminal, 
  Cpu, 
  Code2, 
  RefreshCw 
} from 'lucide-react';
import { AI_INTERVIEW_QA, PROFILE_DATA, SKILL_CATEGORIES, PROJECTS } from '../data/portfolioData';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am NOURI Mohammed Islam's autonomous AI Portfolio Assistant. Ask me anything about his AI engineering expertise, his RAG knowledge systems, his modern React/TypeScript stack, or why he's a great fit for your engineering team!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendQuestion = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsThinking(true);

    // Generate intelligent response from portfolio knowledge base
    setTimeout(() => {
      const lower = questionText.toLowerCase();
      let responseText = '';

      // Check preloaded interview QA first
      const exactMatch = AI_INTERVIEW_QA.find(
        (qa) => lower.includes(qa.question.toLowerCase().slice(0, 15)) || qa.question.toLowerCase() === lower
      );

      if (exactMatch) {
        responseText = exactMatch.answer;
      } else if (lower.includes('name') || lower.includes('who') || lower.includes('islam') || lower.includes('nouri')) {
        responseText = `${PROFILE_DATA.fullName} is an ${PROFILE_DATA.role} based in Algiers/Remote. ${PROFILE_DATA.bio}`;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('reach')) {
        responseText = `You can reach NOURI Mohammed Islam directly by email at ${PROFILE_DATA.email} or connect with him on LinkedIn at ${PROFILE_DATA.linkedin}. He is actively open to global & remote AI Engineer and Full-Stack Web Developer roles!`;
      } else if (lower.includes('ai') || lower.includes('vision') || lower.includes('retinopathy') || lower.includes('emotion') || lower.includes('xai')) {
        responseText = `Mohammed Islam specializes in Deep Learning, Computer Vision, and Explainable AI (XAI)! For instance, he designed an AI System for Early Detection of Diabetic Retinopathy using CNNs and Grad-CAM for clinical interpretability, and built a real-time Emotion Detection CNN trained on FER-2013.`;
      } else if (lower.includes('react') || lower.includes('web') || lower.includes('mern') || lower.includes('frontend')) {
        responseText = `On the web dev & data side, Mohammed Islam builds full-stack MERN applications (like Volontech, an AI recommendation volunteering platform) and predictive healthcare dashboards using React, Node.js, Python, and Power BI.`;
      } else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('built')) {
        const names = PROJECTS.map(p => `"${p.title}"`).join(', ');
        responseText = `Mohammed Islam has built impactful AI and full-stack projects including: ${names}. You can explore their full architecture pipelines in the Projects section!`;
      } else {
        responseText = `Thanks for asking! NOURI Mohammed Islam is a Computer Engineer specializing in IT Systems, Networks, and Artificial Intelligence with experience in deep learning, Cisco networking, and full-stack web development. His email is ${PROFILE_DATA.email}. Would you like to know more about his Computer Vision projects or his IT & network experience?`;
      }

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 600);
  };

  const handleCopyAnswer = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: `Hello! I am NOURI Mohammed Islam's autonomous AI Portfolio Assistant. Ask me anything about his AI engineering expertise, his RAG knowledge systems, his modern React/TypeScript stack, or why he's a great fit for your engineering team!`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#050505]/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl h-[640px] max-h-[90vh] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-800 bg-[#050505]/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2 font-mono">
                <span>NOURI Mohammed Islam's AI Assistant</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  ONLINE // RAG.V1
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Powered by Portfolio Knowledge Base
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2.5 bg-[#050505]/60 border-b border-zinc-800 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[11px] font-mono text-zinc-500 shrink-0">Ask about:</span>
          {AI_INTERVIEW_QA.map((qa) => (
            <button
              key={qa.id}
              onClick={() => handleSendQuestion(qa.question)}
              className="px-2.5 py-1 rounded-full bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-blue-400 text-xs font-mono whitespace-nowrap border border-zinc-700/80 transition-colors shrink-0"
            >
              {qa.question}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isAI
                      ? 'bg-zinc-800 text-blue-400 border border-zinc-700'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    isAI
                      ? 'bg-zinc-800/80 border border-zinc-700/60 text-zinc-200'
                      : 'bg-blue-600 text-white font-mono text-xs sm:text-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  
                  <div
                    className={`mt-2 pt-2 flex items-center justify-between text-[11px] font-mono ${
                      isAI ? 'text-zinc-400 border-t border-zinc-700/50' : 'text-blue-100'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isAI && (
                      <button
                        onClick={() => handleCopyAnswer(msg.text, msg.id)}
                        className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors font-mono"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-blue-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-800 text-blue-400 border border-zinc-700 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                <span>Searching NOURI Mohammed Islam's portfolio knowledge base...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-[#050505] border-t border-zinc-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about Mohammed Islam's skills, RAG systems, React apps..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-mono font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors border border-blue-500/40"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

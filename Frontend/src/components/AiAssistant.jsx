import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Send, Mic, MicOff, RefreshCw,
  Pill, Apple, Activity, Heart, AlertTriangle,
  User, Key, ExternalLink, Sparkles
} from 'lucide-react';
import { sendMessageToAI, isAIConfigured, resetChat } from '../lib/ai';

const suggestions = [
  { icon: Activity, text: 'I have chest pain and shortness of breath' },
  { icon: Heart, text: 'My blood pressure is 140/90, what should I do?' },
  { icon: Pill, text: 'Explain the side effects of Metformin' },
  { icon: Apple, text: 'What diet is best for a Type 2 diabetic patient?' },
];

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm DigiCare AI, powered by Google Gemini. I can help you understand symptoms, explain medications, suggest diet plans, and more.\n\nHow can I help you today?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
];

// Converts **bold** markdown to <strong> tags for display
function formatMessage(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    // Render line breaks
    return part.split('\n').map((line, j) => (
      <React.Fragment key={`${i}-${j}`}>
        {line}
        {j < part.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  });
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="w-1.5 h-1.5 rounded-full bg-[#787774]"
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-7 h-7 rounded flex-shrink-0 flex items-center justify-center ${isUser ? 'bg-[#37352f] dark:bg-[#e3e3e3]' : 'bg-[#f7f6f3] dark:bg-[#252525] border border-[#e9e9e7] dark:border-[#2f2f2f]'}`}>
        {isUser ? <User className="w-3.5 h-3.5 text-white dark:text-[#191919]" /> : <Brain className="w-3.5 h-3.5 text-[#37352f] dark:text-[#e3e3e3]" />}
      </div>
      <div className={`max-w-[80%] flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-md px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-[#37352f] text-white dark:bg-[#e3e3e3] dark:text-[#191919]'
            : 'bg-[#f7f6f3] dark:bg-[#202020] text-[#37352f] dark:text-[#e3e3e3] border border-[#e9e9e7] dark:border-[#2f2f2f]'
        }`}>
          {isUser ? msg.content : formatMessage(msg.content)}
        </div>
        <span className="text-[11px] text-[#787774] dark:text-[#9b9b9b] px-1">{msg.time}</span>
      </div>
    </motion.div>
  );
}

function ApiKeyBanner() {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="mx-4 my-3 p-3.5 bg-[#fbf3db] dark:bg-[#392e1e] border border-[#f5e0b8] dark:border-[#52412b] rounded-md flex items-start gap-2.5">
      <Key className="w-4 h-4 text-[#d9730d] dark:text-[#fbbf24] flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0 text-left">
        <p className="text-xs font-semibold text-[#d9730d] dark:text-[#fbbf24] mb-0.5">Groq API key not configured</p>
        <p className="text-xs text-[#787774] dark:text-[#9b9b9b] mb-2">
          Add your Groq API key to <code className="bg-white/60 dark:bg-black/40 px-1 rounded">Frontend/.env</code> to enable real AI responses.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2383e2] hover:underline">
            <ExternalLink className="w-3 h-3" /> Get API key at console.groq.com
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function AiAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState(null);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const aiConfigured = isAIConfigured();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleNewChat = () => {
    resetChat();
    setMessages(initialMessages);
    setError(null);
    inputRef.current?.focus();
  };

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content, time: now }]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      let reply;

      if (aiConfigured) {
        reply = await sendMessageToAI(content, (waitSecs) => {
          setRetryCountdown(waitSecs);
          const interval = setInterval(() => {
            setRetryCountdown(prev => {
              if (prev <= 1) { clearInterval(interval); return null; }
              return prev - 1;
            });
          }, 1000);
        });
      } else {
        await new Promise(r => setTimeout(r, 1200));
        const lc = content.toLowerCase();
        if (lc.includes('chest') || lc.includes('pain')) {
          reply = "**⚠️ Important:** Chest pain can be a medical emergency.\n\nPlease call **102** (ambulance) immediately if you have:\n- Severe crushing chest pain\n- Pain radiating to your arm or jaw\n- Shortness of breath with cold sweats\n\nFor mild chest pain, rest and monitor. But please consult a doctor promptly.\n\n*Configure your Groq API key for detailed AI-powered responses.*";
        } else if (lc.includes('metformin') || lc.includes('medication')) {
          reply = "**Metformin Overview:**\n- Used for Type 2 diabetes management\n- Lowers blood glucose by reducing liver glucose production\n\n**Common Side Effects:**\n- Nausea and stomach upset (usually temporary)\n- Metallic taste in mouth\n- Diarrhea — take with food to minimize\n\n*Add your Groq API key to get comprehensive AI-powered medication guidance.*";
        } else {
          reply = "Thanks for your question! I'm currently running in demo mode.\n\n**To get real AI-powered healthcare answers:**\n1. Get an API key at console.groq.com\n2. Add it to `Frontend/.env` as `VITE_GROQ_API_KEY=...`\n3. Restart the dev server\n\nI'll then be able to give you detailed, personalized health guidance powered by Llama 3.3.";
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch (err) {
      const is429 = err.message?.includes('429') || err.message?.includes('quota');
      const errMsg = err.message === 'NO_API_KEY'
        ? 'Please configure your Groq API key in Frontend/.env to use AI features.'
        : is429
        ? 'Rate limit reached. Try again in a few moments or check your Groq limits.'
        : `AI error: ${err.message}`;
      setError(errMsg);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `⚠️ ${errMsg}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setLoading(false);
      setRetryCountdown(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#191919] pt-14 font-sans text-[#37352f] dark:text-[#e3e3e3]">
      {/* Header */}
      <div className="bg-white dark:bg-[#202020] border-b border-[#e9e9e7] dark:border-[#2f2f2f] px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#37352f] dark:bg-[#e3e3e3] text-white dark:text-[#191919] flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm text-[#37352f] dark:text-[#e3e3e3]">AI Health Assistant</h1>
                {aiConfigured && (
                  <span className="flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded bg-[#f7f6f3] dark:bg-[#252525] text-[#37352f] dark:text-[#e3e3e3] border border-[#e9e9e7] dark:border-[#2f2f2f]">
                    <Sparkles className="w-3 h-3 text-[#2383e2]" /> Llama 3.3 70B
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${aiConfigured ? 'bg-[#448361] animate-pulse' : 'bg-[#d9730d]'}`} />
                <span className="text-xs text-[#787774] dark:text-[#9b9b9b]">
                  {aiConfigured ? 'Connected · Groq AI' : 'Demo mode · Add API key for real AI'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 text-xs text-[#787774] hover:text-[#37352f] dark:hover:text-[#e3e3e3] px-2.5 py-1 rounded border border-[#e9e9e7] dark:border-[#2f2f2f] hover:bg-[#f7f6f3] dark:hover:bg-[#252525] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> New chat
          </button>
        </div>
      </div>

      {/* API Key Banner */}
      {!aiConfigured && <ApiKeyBanner />}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-5 space-y-4">
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}

          {/* Typing indicator */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
              <div className="w-7 h-7 rounded bg-[#f7f6f3] dark:bg-[#252525] border border-[#e9e9e7] dark:border-[#2f2f2f] flex items-center justify-center flex-shrink-0">
                <Brain className="w-3.5 h-3.5 text-[#37352f] dark:text-[#e3e3e3]" />
              </div>
              <div className="bg-[#f7f6f3] dark:bg-[#202020] border border-[#e9e9e7] dark:border-[#2f2f2f] rounded-md px-3.5 py-2.5">
                {retryCountdown ? (
                  <div className="flex items-center gap-2 text-xs text-[#d9730d]">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Rate limit hit — retrying in {retryCountdown}s…
                  </div>
                ) : (
                  <TypingDots />
                )}
              </div>
            </motion.div>
          )}

          {/* Suggestion chips — show only at conversation start */}
          {messages.length === 1 && !loading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 pt-2">
              <p className="text-xs text-[#787774] dark:text-[#9b9b9b] font-medium text-center">Try asking</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suggestions.map(({ icon: Icon, text }) => (
                  <button key={text} onClick={() => sendMessage(text)}
                    className="group flex items-center gap-2.5 p-3 bg-[#f7f6f3] dark:bg-[#202020] rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] hover:bg-[#efefed] dark:hover:bg-[#252525] transition-colors text-left">
                    <div className="w-7 h-7 rounded bg-white dark:bg-[#191919] border border-[#e9e9e7] dark:border-[#2f2f2f] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#37352f] dark:text-[#e3e3e3]" />
                    </div>
                    <span className="text-xs text-[#37352f] dark:text-[#e3e3e3]">{text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-[#191919] border-t border-[#e9e9e7] dark:border-[#2f2f2f] px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 mb-2 justify-center">
            <AlertTriangle className="w-3 h-3 text-[#d9730d]" />
            <span className="text-[11px] text-[#787774] dark:text-[#9b9b9b]">AI guidance only. Not a substitute for professional medical advice.</span>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your symptoms or ask a health question..."
                rows={1}
                className="w-full resize-none rounded-md border border-[#e9e9e7] dark:border-[#2f2f2f] bg-white dark:bg-[#202020] px-3 py-2 text-xs text-[#37352f] dark:text-[#e3e3e3] placeholder-[#787774] focus:outline-none focus:ring-1 focus:ring-[#37352f] dark:focus:ring-[#e3e3e3] transition-colors"
                style={{ minHeight: 40, maxHeight: 120 }}
              />
            </div>

            <button
              onClick={() => setListening(!listening)}
              className={`p-2 rounded-md border flex-shrink-0 transition-colors ${
                listening
                  ? 'bg-[#eb5757] border-[#eb5757] text-white animate-pulse'
                  : 'border-[#e9e9e7] dark:border-[#2f2f2f] text-[#787774] hover:bg-[#f7f6f3] dark:hover:bg-[#252525]'
              }`}
            >
              {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="p-2 rounded-md bg-[#37352f] hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-white dark:text-[#191919] transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
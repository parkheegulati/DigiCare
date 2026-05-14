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
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="w-2 h-2 rounded-full bg-blue-400"
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-600 to-cyan-500'}`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-white" />}
      </div>
      <div className={`max-w-[78%] flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-sm shadow-sm'
        }`}>
          {isUser ? msg.content : formatMessage(msg.content)}
        </div>
        <span className="text-xs text-slate-400 px-1">{msg.time}</span>
      </div>
    </motion.div>
  );
}

function ApiKeyBanner() {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="mx-4 my-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-2xl flex items-start gap-3">
      <Key className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Groq API key not configured</p>
        <p className="text-xs text-amber-700 dark:text-amber-400 mb-2">
          Add your Groq API key to <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">Frontend/.env</code> to enable real AI responses.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline">
            <ExternalLink className="w-3 h-3" /> Get API key at console.groq.com
          </a>
        </div>
        <div className="mt-2 p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl">
          <code className="text-xs text-amber-800 dark:text-amber-300">
            VITE_GROQ_API_KEY=gsk_...
          </code>
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
        // Real Gemini response — onRetry fires countdown UI
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
        // Fallback demo responses while no key is set
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
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 pt-16 font-inter">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-manrope font-bold text-slate-900 dark:text-white">AI Health Assistant</h1>
                {aiConfigured && (
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    <Sparkles className="w-3 h-3" /> Llama 3.3 70B
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${aiConfigured ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {aiConfigured ? 'Connected · Groq AI' : 'Demo mode · Add API key for real AI'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> New chat
          </button>
        </div>
      </div>

      {/* API Key Banner */}
      {!aiConfigured && <ApiKeyBanner />}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}

          {/* Typing indicator */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                {retryCountdown ? (
                  <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                    <RefreshCw className="w-4 h-4 animate-spin" />
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider text-center">Try asking</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map(({ icon: Icon, text }) => (
                  <button key={text} onClick={() => sendMessage(text)}
                    className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all text-left">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-200">{text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5 mb-3 justify-center">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span className="text-xs text-slate-400">AI guidance only. Not a substitute for professional medical advice.</span>
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your symptoms or ask a health question..."
                rows={1}
                className="w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                style={{ minHeight: 48, maxHeight: 140 }}
              />
            </div>

            <button
              onClick={() => setListening(!listening)}
              className={`p-3 rounded-2xl border flex-shrink-0 transition-all ${
                listening
                  ? 'bg-red-500 border-red-500 text-white animate-pulse'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-blue-600/25 transition-all flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
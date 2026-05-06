import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, Building, Key, GitCompare, Mic, Send } from 'lucide-react';

function ChatPage({ onSearch }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hi! I'm your AI property assistant. How can I help you find your dream home today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const newMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      let botResponse = "I'm searching for that. Would you like to see our latest listings in that category?";
      const lowerText = text.toLowerCase();

      if (lowerText.includes('rent') || lowerText.includes('bhk') || lowerText.includes('under')) {
        botResponse = "I've found several great rental options matching your criteria. Check the Explore page for the updated results!";
        if (onSearch) onSearch(text);
      } else if (lowerText.includes('buy') || lowerText.includes('project')) {
        botResponse = "New luxury projects are coming up! I've filtered the best ones for you on the Explore page.";
        if (onSearch) onSearch(text);
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="chat-wrapper">
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(201,168,76,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} color="var(--gold)" />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Umbrella AI</div>
            <div style={{ fontSize: '12px', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: 'var(--green)', borderRadius: '50%' }}></div>
              Always Online
            </div>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(m => (
          <div key={m.id} className={m.type === 'bot' ? 'msg-bot' : 'msg-user'}>
            {m.type === 'bot' && <div className="msg-avatar"><Sparkles size={16}/></div>}
            <div className="msg-bubble">
              {m.text}
              {m.id === 1 && (
                <div className="chat-suggestions">
                  {[
                    { label: "2 BHK under 30k", icon: Search },
                    { label: "Projects in Baner", icon: Building },
                    { label: "Luxury villas for sale", icon: Key },
                    { label: "Compare my saved", icon: GitCompare }
                  ].map((s, idx) => (
                    <button key={idx} className="chat-sugg-btn" onClick={() => handleSend(s.label)}>
                      <s.icon size={14} className="chat-sugg-icon"/>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <form className="chat-input-box" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about properties, locations, or pricing..."
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mic size={20} color="var(--text2)" style={{ cursor: 'pointer' }} />
            <button type="submit" style={{ background: 'var(--gold)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={16} color="#000" style={{ marginLeft: '-2px' }} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default ChatPage;
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaTooth, FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import './ChatBot.css';

const API_BASE_URL = 'http://localhost:8081';

const fallbackAnswer =
  "I'm not totally sure about that one! For anything specific to your situation, it's best to book an appointment or call us at +91 123456789 — our team will take great care of you.";

const quickQuestions = [
  'How do I book an appointment?',
  'What are your clinic hours?',
  'I have a toothache',
  'Where is the clinic located?',
];

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! 👋 I'm Smart Dental's assistant. Ask me about dental problems, appointments, or clinic info!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/chatbot-faqs`);
        setFaqs(res.data);
      } catch (err) {
        console.error('Failed to load chatbot FAQs:', err);
      }
    };
    fetchFaqs();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findAnswer = (userText) => {
    const text = userText.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    faqs.forEach((faq) => {
      const keywordList = faq.keywords.split(',').map((k) => k.trim().toLowerCase());
      const score = keywordList.filter((kw) => kw && text.includes(kw)).length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    });

    return bestMatch ? bestMatch.answer : fallbackAnswer;
  };

  const sendMessage = (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(text);
      setMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <FaTimes size={22} /> : <FaTooth size={24} />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <FaTooth />
              </div>
              <div>
                <h4>Smart Dental Assistant</h4>
                <span className="chatbot-status">● Online</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <FaTimes size={16} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                <div className="chatbot-message-icon">
                  {msg.sender === 'user' ? <FaUser size={12} /> : <FaRobot size={12} />}
                </div>
                <div className="chatbot-message-bubble">{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-message bot">
                <div className="chatbot-message-icon">
                  <FaRobot size={12} />
                </div>
                <div className="chatbot-message-bubble chatbot-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="chatbot-quick-questions">
                {quickQuestions.map((q, idx) => (
                  <button key={idx} onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-bar">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={() => sendMessage()} aria-label="Send">
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
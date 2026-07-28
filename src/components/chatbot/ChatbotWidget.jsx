import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaEllipsisV,
  FaHeart,
  FaHome,
  FaPaperPlane,
  FaPhone,
  FaUniversity,
  FaUserPlus,
} from 'react-icons/fa'
import { BsChatDotsFill } from 'react-icons/bs'
import { HiShieldCheck } from 'react-icons/hi'
import axiosInstance from '../../utils/axios'
import logoImg from '../../assets/img/logos/only_logo.png'
import './ChatbotWidget.css'

const BOT_GREETING =
  'Assalam o Alaikum! I am the MTJ Foundation assistant. How can I help you today?'

const QUICK_ACTIONS = [
  { label: 'Donate Now', icon: FaHeart, to: '/donate', tone: 'donate' },
  { label: 'Programs', icon: FaHome, to: '/projects', tone: 'programs' },
  { label: 'Give Your Zakat', icon: FaUniversity, to: '/zakat-calculator', tone: 'zakat' },
  { label: 'Volunteer', icon: FaUserPlus, to: '/volunteerRegistration', tone: 'volunteer' },
]

function ChatbotWidget() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', text: BOT_GREETING },
  ])

  const sessionId = useMemo(
    () => `web-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    [],
  )

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim()
    if (!text || sending) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setSending(true)

    try {
      const response = await axiosInstance.post('/knowledge-base/chat', {
        message: text,
        session_id: sessionId,
      })

      const answer =
        response?.data?.data?.answer ||
        response?.data?.answer ||
        'Sorry, I could not find an answer right now.'

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: answer,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          text:
            error?.response?.data?.message ||
            'Sorry, the assistant is unavailable right now.',
        },
      ])
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendMessage()
  }

  const handleQuickAction = async (prompt) => {
    if (!open) {
      setOpen(true)
    }
    await sendMessage(prompt)
  }

  const handleShortcutNavigate = (to) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <div className={`chatbot-widget${open ? ' chatbot-widget--open' : ''}`}>
      <div
        className={`chatbot-widget__panel${open ? ' chatbot-widget__panel--visible' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="MTJ Foundation assistant"
        aria-hidden={!open}
      >
          <div className="chatbot-widget__header">
            <div className="chatbot-widget__brand">
              <div className="chatbot-widget__avatar-wrap">
                <img src={logoImg} alt="MTJ Foundation" className="chatbot-widget__avatar" />
              </div>
              <div>
                <h3 className="chatbot-widget__title">MTJ Foundation Assistant</h3>
                <p className="chatbot-widget__subtitle">
                  <span className="chatbot-widget__status-dot" />
                  Online
                </p>
              </div>
            </div>
            <div className="chatbot-widget__header-actions">
              <button
                type="button"
                className="chatbot-widget__icon-btn"
                aria-label="More options"
              >
                <FaEllipsisV />
              </button>
              <button
                type="button"
                className="chatbot-widget__icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
          </div>

          <div className="chatbot-widget__messages">
            {messages.map((message) => (
              message.role === 'assistant' ? (
                <div key={message.id} className="chatbot-widget__message-row chatbot-widget__message-row--assistant">
                  <div className="chatbot-widget__sender-avatar">
                    <img src={logoImg} alt="MTJ Foundation" className="chatbot-widget__sender-avatar-img" />
                  </div>
                  <div className="chatbot-widget__message-stack">
                    <div className="chatbot-widget__meta">Just now</div>
                    <div className="chatbot-widget__message chatbot-widget__message--assistant">
                      {message.text}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={message.id}
                  className="chatbot-widget__message chatbot-widget__message--user"
                >
                  {message.text}
                </div>
              )
            ))}
            {sending && (
              <div className="chatbot-widget__message-row chatbot-widget__message-row--assistant">
                <div className="chatbot-widget__sender-avatar">
                  <img src={logoImg} alt="MTJ Foundation" className="chatbot-widget__sender-avatar-img" />
                </div>
                <div className="chatbot-widget__message-stack">
                  <div className="chatbot-widget__meta">Just now</div>
                  <div className="chatbot-widget__message chatbot-widget__message--assistant">
                    Typing...
                  </div>
                </div>
              </div>
            )}

            {/* <div className="chatbot-widget__shortcut-card">
              <p className="chatbot-widget__shortcut-title">
                Here are some quick options to get started:
              </p>
              <div className="chatbot-widget__shortcut-grid">
                {QUICK_ACTIONS.map(({ label, icon: Icon, to, tone }) => (
                  <button
                    key={label}
                    type="button"
                    className={`chatbot-widget__shortcut-btn chatbot-widget__shortcut-btn--${tone}`}
                    onClick={() => handleShortcutNavigate(to)}
                    disabled={sending}
                  >
                    <Icon />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="chatbot-widget__contact-btn"
                onClick={() => handleShortcutNavigate('/contact')}
                disabled={sending}
              >
                <FaPhone />
                Contact Us
              </button>
            </div> */}
          </div>

          <form className="chatbot-widget__composer" onSubmit={handleSubmit}>
            <div className="chatbot-widget__composer-shell">
              <textarea
                className="chatbot-widget__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                rows={1}
                disabled={sending}
              />
              <button
                type="submit"
                className="chatbot-widget__send"
                disabled={sending || !input.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
            <div className="chatbot-widget__footnote">
              <HiShieldCheck className="chatbot-widget__footnote-icon" aria-hidden="true" />
              We're here to help and serve humanity together.
            </div>
          </form>
      </div>

      <div className={`chatbot-widget__launcher${open ? ' chatbot-widget__launcher--hidden' : ''}`}>
          <button
            type="button"
            className="chatbot-widget__toggle-label"
            onClick={() => setOpen(true)}
            aria-label="Open chatbot"
          >
            Need Help?
          </button>
          <button
            type="button"
            className="chatbot-widget__toggle"
            onClick={() => setOpen(true)}
            aria-label={open ? 'Close chatbot' : 'Open chatbot'}
          >
            <BsChatDotsFill className="chatbot-widget__toggle-icon" aria-hidden="true" />
            <span className="chatbot-widget__toggle-badge" />
          </button>
      </div>
    </div>
  )
}

export default ChatbotWidget

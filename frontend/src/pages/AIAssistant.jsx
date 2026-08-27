import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bot, Send, Sparkles, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import ChatMessage from '../components/ai/ChatMessage';
import StudentContextCard from '../components/ai/StudentContextCard';
import QuickActionPills from '../components/ai/QuickActionPills';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';
import aiService from '../services/aiService';
import courseService from '../services/courseService';

export default function AIAssistant() {
  const [searchParams] = useSearchParams();
  const courseIdParam = searchParams.get('course');
  const promptParam = searchParams.get('prompt');

  const { user } = useAuth();
  const { application, documents } = useApplication();

  const candidateName = user?.name || application?.personalInfo?.name || 'Applicant';
  const candidateAppId = application?.applicationNumber || user?.applicationId || 'ADM-2026-4128';

  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'ai',
      text: `Hi ${candidateName.split(' ')[0]}! How can I help you with your admission today? I can evaluate your eligibility, calculate fee scholarships, check document requirements, or walk you through the application process.`,
      suggestions: [
        'Why choose GIET University?',
        'Check my eligibility',
        'Ask about fees and scholarships',
        'Required documents',
        'Campus & Hostel Facilities'
      ],
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [selectedCourseContext, setSelectedCourseContext] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Load course context if passed via URL
  useEffect(() => {
    if (courseIdParam) {
      async function loadCourseContext() {
        try {
          const c = await courseService.getCourseById(courseIdParam);
          if (c) {
            setSelectedCourseContext(c);
            // Pre-send query about this course
            handleSendMessage(`Tell me all about ${c.name}, its eligibility criteria, and fee structure.`, c);
          }
        } catch (err) {
          console.warn('Failed to load course context:', err);
        }
      }
      loadCourseContext();
    } else if (promptParam === 'check-eligibility') {
      handleSendMessage('What is my admission eligibility based on my 12th board marks and JEE rank?');
    }
  }, [courseIdParam, promptParam]);

  const handleSendMessage = async (textToSend = null, overrideCourseContext = null) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isThinking) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsThinking(true);

    try {
      const studentContext = {
        id: user?.id || 'std_9841',
        name: candidateName,
        applicationId: candidateAppId,
        stage: application?.currentStage || 'Document Verification',
        completion: application?.completionPercentage || 68,
        risk: application?.dropOffRisk || 'Medium',
        program: application?.academicInfo?.targetProgram || user?.targetProgram || 'B.Tech in Computer Science & Engineering'
      };

      const courseContext = overrideCourseContext || selectedCourseContext;

      // Call API backend POST /api/ai/chat
      const response = await aiService.sendMessage(query, studentContext, courseContext);

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        suggestions: response.suggestions || [],
        action: response.action || null,
        timestamp: response.timestamp || new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: `I apologize, but I encountered a connection error while consulting the admission database. (${error.message}). Please try again or rephrase your question.`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: `Conversation restarted. Hi ${user?.name?.split(' ')[0] || 'Rahul'}! What admission questions can I answer for you?`,
        suggestions: [
          'Check my eligibility',
          'Ask about fees and scholarships',
          'Required documents',
          'Admission dates and deadlines'
        ],
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[calc(100vh-8.5rem)]">
      {/* ========================================================
          1. CHAT MAIN PANEL (3 cols)
      ======================================================== */}
      <div className="lg:col-span-3 flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden h-[750px]">
        {/* Assistant Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-900 text-sm sm:text-base">🤖 AI Admission Assistant</h2>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-xs text-slate-500">Your personal autonomous admission & counseling guide</p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="text-xs text-slate-500 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-200/60 transition-colors flex items-center gap-1.5"
            title="Reset Conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>

        {/* Selected Course Context Tag */}
        {selectedCourseContext && (
          <div className="px-6 py-2 bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-between text-xs text-indigo-900">
            <span>Course Context Active: <strong>{selectedCourseContext.name}</strong></span>
            <button
              onClick={() => setSelectedCourseContext(null)}
              className="text-indigo-600 hover:underline text-[11px] font-medium"
            >
              Clear
            </button>
          </div>
        )}

        {/* Chat Stream Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSelectPrompt={(p) => handleSendMessage(p)}
            />
          ))}

          {/* Thinking / Typing Animation */}
          {isThinking && (
            <div className="flex gap-3 my-4 justify-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-4 text-xs text-slate-500 flex items-center gap-2 shadow-subtle">
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
                <span>AdmitAI is analyzing admission guidelines...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input & Quick Actions Footer */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 space-y-3">
          {/* Quick Action Pills */}
          <QuickActionPills onSelectAction={(p) => handleSendMessage(p)} />

          {/* Input Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about admissions, eligibility, fees, or documents..."
              className="flex-1 px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-sm"
              disabled={isThinking}
            />

            <Button
              variant="primary"
              size="md"
              disabled={!inputMessage.trim() || isThinking}
              onClick={() => handleSendMessage()}
              icon={Send}
              className="px-5 py-3 rounded-xl shrink-0"
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. STUDENT CONTEXT PANEL (1 col)
      ======================================================== */}
      <div className="lg:col-span-1 space-y-4">
        <StudentContextCard
          student={user}
          application={application}
          documents={documents}
        />

        <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/70 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Autonomous Intelligence</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            AdmitAI leverages your live application record to provide instant cutoff matching, scholarship calculations, and proactive guidance.
          </p>
        </div>
      </div>
    </div>
  );
}

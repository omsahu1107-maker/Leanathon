import React from 'react';
import { Bot, User, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChatMessage({ message, onSelectPrompt }) {
  const isAI = message.sender === 'ai';
  const navigate = useNavigate();

  // Simple Markdown parser for bold (**text**), bullet points (• or -), and numbered lists
  const formatText = (content) => {
    if (!content) return null;

    const lines = content.split('\n');
    return lines.map((line, idx) => {
      let formattedLine = line;

      // Handle bold formatting **text**
      const parts = [];
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={`${idx}-${match.index}`} className="font-semibold text-slate-900">
            {match[1]}
          </strong>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const contentToRender = parts.length > 0 ? parts : line;

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-700 my-0.5 leading-relaxed">
            {contentToRender}
          </li>
        );
      }

      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={idx} className="ml-2 font-medium text-slate-800 my-1">
            {contentToRender}
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="leading-relaxed text-slate-700 my-0.5">
          {contentToRender}
        </p>
      );
    });
  };

  return (
    <div className={`flex gap-3 my-4 ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm shadow-subtle ${
        isAI
          ? 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-sm'
          : 'bg-brand-600 text-white rounded-tr-sm shadow-sm'
      }`}>
        {/* Message Content */}
        <div className={isAI ? 'space-y-1' : 'text-white'}>
          {isAI ? formatText(message.text) : <p className="leading-relaxed">{message.text}</p>}
        </div>

        {/* Action Button inside AI response */}
        {isAI && message.action && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => navigate(message.action.route)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium text-xs transition-colors border border-brand-200"
            >
              <span>{message.action.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Suggestion prompt chips */}
        {isAI && message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-slate-100/80">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-1.5">
              {message.suggestions.map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => onSelectPrompt && onSelectPrompt(suggestion)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md transition-colors text-left font-medium"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className={`text-[10px] mt-2 text-right ${isAI ? 'text-slate-400' : 'text-brand-100'}`}>
          {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
        </div>
      </div>

      {!isAI && (
        <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { format } from 'date-fns';
import { X, Trash2, ExternalLink } from 'lucide-react';

const PRIORITY_EMOJIS = {
    High: '🔥',
    Medium: '⚡',
    Low: '📝'
};

const EMOJI_KEYWORDS = {
    // Work & Study
    'meeting': '💼', '미팅': '💼', 'work': '💼', '일': '💼',
    'study': '📚', '공부': '📚', 'assignment': '📝', '과제': '📝',
    'exam': '💯', '시험': '💯', 'presentation': '📊', '발표': '📊',
    'code': '💻', 'coding': '💻', 'dev': '💻', '개발': '💻',

    // Health & Sports
    'gym': '💪', 'workout': '💪', 'exercise': '💪', '운동': '💪', '헬스': '💪',
    'run': '🏃', 'running': '🏃', '러닝': '🏃', '달리기': '🏃',
    'soccer': '⚽', '축구': '⚽', 'basketball': '🏀', '농구': '🏀',
    'yoga': '🧘', '요가': '🧘', 'hospital': '🏥', '병원': '🏥',

    // Life & Event
    'birthday': '🎂', 'bday': '🎂', '생일': '🎂', 'party': '🎉', '파티': '🎉',
    'date': '❤️', '데이트': '❤️', 'movie': '🎬', '영화': '🎬',
    'dinner': '🍽️', '저녁': '🍽️', 'lunch': '🍴', '점심': '🍴',
    'coffee': '☕', 'cafe': '☕', '커피': '☕', '카페': '☕',
    'trip': '✈️', 'travel': '✈️', '여행': '✈️', 'flight': '✈️',

    // Chores
    'clean': '🧹', 'cleaning': '🧹', '청소': '🧹',
    'laundry': '🧺', '빨래': '🧺',
    'shop': '🛒', 'shopping': '🛒', '장보기': '🛒', '마트': '🛒',
    'bank': '🏦', '은행': '🏦',

    // Others
    'book': '📖', 'reading': '📖', '독서': '📖', '책': '📖',
    'game': '🎮', 'gaming': '🎮', '게임': '🎮',
    'music': '🎵', 'song': '🎵', '음악': '🎵', '노래': '🎵'
};

const TodoModal = ({ date, todos, onClose, onAdd, onDelete }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [customEmoji, setCustomEmoji] = useState('');
    const [autoEmoji, setAutoEmoji] = useState(null); // State for auto-detected emoji

    const getEmojiForText = (inputText) => {
        const lowerText = inputText.toLowerCase();
        for (const [keyword, emoji] of Object.entries(EMOJI_KEYWORDS)) {
            if (lowerText.includes(keyword)) {
                return emoji;
            }
        }
        return null;
    };

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);

        // Auto-detect emoji
        const detected = getEmojiForText(newText);
        if (detected) {
            setAutoEmoji(detected);
        } else {
            setAutoEmoji(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        // Priority: Custom Emoji > Auto Detected > Priority Default
        const emoji = customEmoji || autoEmoji || PRIORITY_EMOJIS[priority];
        onAdd(date, text, priority, emoji);
        setText('');
        setCustomEmoji('');
        setAutoEmoji(null);
    };

    const renderTextWithLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, i) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="todo-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part} <ExternalLink size={12} style={{ display: 'inline', marginLeft: 2 }} />
                    </a>
                );
            }
            return part;
        });
    };

    // Current effective emoji to display in UI preview
    const effectiveEmoji = customEmoji || autoEmoji || PRIORITY_EMOJIS[priority];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{format(date, 'yyyy. MM. dd')}</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                <div className="todo-list">
                    {todos.length === 0 ? (
                        <p className="empty-state">No tasks for today.</p>
                    ) : (
                        <ul>
                            {todos.map(todo => (
                                <li key={todo.id} className={`todo-item priority-${todo.priority.toLowerCase()}`}>
                                    <span className="todo-emoji">{todo.emoji}</span>
                                    <span className="todo-text">{renderTextWithLinks(todo.text)}</span>
                                    <button onClick={() => onDelete(date, todo.id)} className="delete-btn">
                                        <Trash2 size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="todo-form">
                    <input
                        type="text"
                        placeholder="Add a task (try 'Gym', 'Meeting', '생일')..."
                        value={text}
                        onChange={handleTextChange}
                        className="todo-input"
                        autoFocus
                    />
                    <div className="form-options">
                        <select value={priority} onChange={e => setPriority(e.target.value)} className="priority-select">
                            <option value="High">High 🔥</option>
                            <option value="Medium">Medium ⚡</option>
                            <option value="Low">Low 📝</option>
                        </select>

                        {/* Emoji Preview / Manual Override */}
                        <div className="emoji-preview" title="Current Emoji">
                            {effectiveEmoji}
                        </div>

                        <button type="submit" className="add-btn">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoModal;

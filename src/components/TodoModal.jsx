import React, { useState } from 'react';
import { format } from 'date-fns';
import { X, Trash2, ExternalLink } from 'lucide-react';

const PRIORITY_EMOJIS = {
    High: '🔥',
    Medium: '⚡',
    Low: '📝'
};

const TodoModal = ({ date, todos, onClose, onAdd, onDelete }) => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [customEmoji, setCustomEmoji] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const emoji = customEmoji || PRIORITY_EMOJIS[priority];
        onAdd(date, text, priority, emoji);
        setText('');
        setCustomEmoji('');
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
                        placeholder="Add a task (links auto-detected)..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="todo-input"
                        autoFocus
                    />
                    <div className="form-options">
                        <select value={priority} onChange={e => setPriority(e.target.value)} className="priority-select">
                            <option value="High">High 🔥</option>
                            <option value="Medium">Medium ⚡</option>
                            <option value="Low">Low 📝</option>
                        </select>
                        <button type="submit" className="add-btn">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoModal;

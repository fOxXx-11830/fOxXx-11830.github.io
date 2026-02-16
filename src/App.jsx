import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarGrid from './components/CalendarGrid';
import TodoModal from './components/TodoModal';
import './index.css';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('calendar_todos');
    return saved ? JSON.parse(saved) : {};
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('calendar_todos', JSON.stringify(todos));
  }, [todos]);

  const onDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const addTodo = (date, text, priority, emoji) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const newTodo = {
      id: uuidv4(),
      text,
      priority,
      emoji,
      completed: false,
    };

    setTodos(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTodo]
    }));
  };

  const deleteTodo = (date, todoId) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    setTodos(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(t => t.id !== todoId)
    }));
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="app-container">
      <header className="header">
        <button onClick={prevMonth} className="nav-btn"><ChevronLeft size={32} /></button>
        <h1 className="page-title">{format(currentDate, 'yyyy. MM')}</h1>
        <button onClick={nextMonth} className="nav-btn"><ChevronRight size={32} /></button>
      </header>

      <main className="main-content">
        <CalendarGrid
          currentDate={currentDate}
          todos={todos}
          onDateClick={onDateClick}
        />
      </main>

      {isModalOpen && selectedDate && (
        <TodoModal
          date={selectedDate}
          todos={todos[format(selectedDate, 'yyyy-MM-dd')] || []}
          onClose={closeModal}
          onAdd={addTodo}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;

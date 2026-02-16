import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

const CalendarGrid = ({ currentDate, todos, onDateClick }) => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Days Header
    const header = (
        <div className="days-header">
            {daysOfWeek.map((d, i) => (
                <div className="col-header" key={i}>{d}</div>
            ))}
        </div>
    );

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const getPriorityEmoji = (dateKey) => {
        const dayTodos = todos[dateKey];
        if (!dayTodos || dayTodos.length === 0) return null;

        // Check priorities: High > Medium > Low
        const hasHigh = dayTodos.some(t => t.priority === 'High');
        const hasMedium = dayTodos.some(t => t.priority === 'Medium');

        // Find the task that determines the emoji
        let relevantTodo;
        if (hasHigh) relevantTodo = dayTodos.find(t => t.priority === 'High');
        else if (hasMedium) relevantTodo = dayTodos.find(t => t.priority === 'Medium');
        else relevantTodo = dayTodos[0]; // Fallback or Low

        return relevantTodo.emoji;
    };

    return (
        <div className="calendar">
            {header}
            <div className="calendar-grid">
                {allDays.map((day, idx) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const dayEmoji = getPriorityEmoji(dateKey);

                    return (
                        <div
                            className={`day-cell ${!isSameMonth(day, monthStart) ? "disabled" : ""} ${isToday(day) ? "today" : ""}`}
                            key={day.toString()}
                            onClick={() => onDateClick(day)}
                        >
                            <div className="day-number">{format(day, dateFormat)}</div>
                            {dayEmoji && <div className="day-emoji">{dayEmoji}</div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;

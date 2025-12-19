// components/LessonCard.jsx
import React from 'react';
import './LessonCard.css';

const LessonCard = ({ lesson, onStart, isCompleted }) => {
  return (
    <div className={`lesson-card ${isCompleted ? 'completed' : ''}`}>
      <div className="lesson-header">
        <span className="lesson-difficulty">{lesson.difficulty}</span>
        <span className="lesson-duration">{lesson.duration}</span>
      </div>
      
      <div className="lesson-content">
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
        
        <div className="lesson-topics">
          {lesson.topics.map((topic, index) => (
            <span key={index} className="topic-tag">#{topic}</span>
          ))}
        </div>
      </div>
      
      <div className="lesson-footer">
        <div className="xp-reward">
          <span>+{lesson.xpReward} XP</span>
        </div>
        <button 
          className={`start-button ${isCompleted ? 'completed' : ''}`}
          onClick={onStart}
        >
          {isCompleted ? '✓ Пройдено' : 'Начать урок'}
        </button>
      </div>
      
      {isCompleted && <div className="completed-badge">✓</div>}
    </div>
  );
};

export default LessonCard;
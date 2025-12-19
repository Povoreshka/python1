// components/ProgressBar.jsx
import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentXP, nextLevelXP }) => {
  const progress = Math.min((currentXP / nextLevelXP) * 100, 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-info">
        <span>Уровень {Math.floor(currentXP / 1000) + 1}</span>
        <span>{currentXP} / {nextLevelXP} XP</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
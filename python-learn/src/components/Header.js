// components/Header.js
import React from 'react';
import './Header.css';

const Header = ({ user, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'lessons', label: 'Уроки', icon: '📚' },
    { id: 'practice', label: 'Практика', icon: '💻' },
    { id: 'social', label: 'Социальное', icon: '👥' },
    { id: 'profile', label: 'Профиль', icon: '👤' }
  ];

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">🐍</div>
        <div>
          <h1>PythonLearn<span className="tagline">.io</span></h1>
        </div>
      </div>
      
      <nav className="header-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
      
      <div className="user-info">
        <div className="user-avatar">{user.avatar}</div>
        <div className="user-details">
          <div className="user-name">{user.name}</div>
          <div className="user-stats">
            <span className="user-level">🎯 Ур. {user.level}</span>
            <span className="user-xp">⭐ {user.xp} XP</span>
            <span className="user-streak">🔥 {user.streak} дн.</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
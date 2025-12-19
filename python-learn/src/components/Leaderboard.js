// components/Leaderboard.js
import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const leaders = [
    { 
      rank: 1, 
      name: "Алексей", 
      score: 950, 
      time: "27:45", 
      avatar: "👨‍💻",
      xp: 5200,
      streak: 14,
      isCurrentUser: false
    },
    { 
      rank: 2, 
      name: "Вы", 
      score: 850, 
      time: "29:10", 
      avatar: "⭐",
      xp: 1250,
      streak: 7,
      isCurrentUser: true
    },
    { 
      rank: 3, 
      name: "Мария", 
      score: 800, 
      time: "30:00", 
      avatar: "👩‍💻",
      xp: 4800,
      streak: 21,
      isCurrentUser: false
    },
    { 
      rank: 4, 
      name: "Иван", 
      score: 750, 
      time: "28:30", 
      avatar: "🧑‍💻",
      xp: 4500,
      streak: 7,
      isCurrentUser: false
    },
    { 
      rank: 5, 
      name: "Ольга", 
      score: 700, 
      time: "26:45", 
      avatar: "👩‍🎓",
      xp: 4200,
      streak: 30,
      isCurrentUser: false
    }
  ];

  const getRankBadge = (rank) => {
    switch(rank) {
      case 1:
        return { emoji: "🥇", color: "#FFD700", gradient: "linear-gradient(135deg, #FFD700, #FFAA00)" };
      case 2:
        return { emoji: "🥈", color: "#C0C0C0", gradient: "linear-gradient(135deg, #C0C0C0, #A0A0A0)" };
      case 3:
        return { emoji: "🥉", color: "#CD7F32", gradient: "linear-gradient(135deg, #CD7F32, #A0522D)" };
      default:
        return { emoji: null, color: "#667eea", gradient: "linear-gradient(135deg, #667eea, #764ba2)" };
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">
          <span className="title-icon">🏆</span>
          Таблица лидеров
        </h2>
        <div className="leaderboard-subtitle">
          Топ 5 игроков по результатам последнего соревнования
        </div>
      </div>
      
      <div className="leaderboard-stats">
        <div className="stat-item">
          <div className="stat-value">5</div>
          <div className="stat-label">Участников</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">950</div>
          <div className="stat-label">Макс. очков</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">26:45</div>
          <div className="stat-label">Лучшее время</div>
        </div>
      </div>
      
      <div className="leaderboard-list">
        {leaders.map((user, index) => {
          const rankBadge = getRankBadge(user.rank);
          
          return (
            <div 
              key={user.rank} 
              className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}
              style={{ 
                '--rank-color': rankBadge.color,
                '--rank-gradient': rankBadge.gradient,
                '--index': index
              }}
            >
              <div className="rank-badge">
                <span className="rank-number">{user.rank}</span>
                {rankBadge.emoji && (
                  <span className="rank-emoji">{rankBadge.emoji}</span>
                )}
              </div>
              
              <div className="user-info">
                <div className="user-avatar">{user.avatar}</div>
                <div className="user-details">
                  <div className="user-name">
                    {user.name}
                    {user.isCurrentUser && <span className="current-badge">Вы</span>}
                  </div>
                  <div className="user-stats">
                    <span className="stat-score">
                      <span className="stat-icon">⭐</span>
                      {user.score} очков
                    </span>
                    <span className="stat-time">
                      <span className="stat-icon">⏱️</span>
                      {user.time}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="user-score">
                <div className="score-value">{user.score}</div>
                <div className="score-label">pts</div>
              </div>
              
              <div className="user-extra">
                <div className="extra-item">
                  <span className="extra-icon">🔥</span>
                  <span className="extra-value">{user.streak} дн.</span>
                </div>
                <div className="extra-item">
                  <span className="extra-icon">🎯</span>
                  <span className="extra-value">{user.xp} XP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="leaderboard-footer">
        <div className="footer-text">
          Следующее обновление через: <span className="highlight">2 ч 15 мин</span>
        </div>
        <button className="view-all-btn">
          Посмотреть всех участников
          <span className="btn-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
// ProfilePage.js
import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const ProfilePage = ({ user }) => {
  const [profileData, setProfileData] = useState({
    ...user,
    achievements: [
      { id: 1, name: 'Первый урок', icon: '🎯', unlocked: true },
      { id: 2, name: 'Стратегия', icon: '🏆', unlocked: true },
      { id: 3, name: 'Питон-мастер', icon: '🐍', unlocked: false },
      { id: 4, name: 'Неделя обучения', icon: '📚', unlocked: true },
      { id: 5, name: 'Социальный', icon: '👥', unlocked: false },
      { id: 6, name: 'Эксперт', icon: '⭐', unlocked: false },
    ],
    badges: ['Python Новичок', 'Активный ученик', 'Дружелюбный'],
    friends: [
      { id: 1, name: 'Мария С.', level: 3, avatar: '👩‍💻' },
      { id: 2, name: 'Иван П.', level: 5, avatar: '👨‍💼' },
      { id: 3, name: 'Анна К.', level: 2, avatar: '👩‍🎓' },
      { id: 4, name: 'Дмитрий Л.', level: 4, avatar: '🧑‍💻' },
    ],
    activity: [25, 40, 35, 50, 45, 60, 70],
    completedLessons: [
      { id: 1, name: 'Основы Python', xp: 100, duration: '15 мин' },
      { id: 2, name: 'Условные операторы', xp: 150, duration: '20 мин' },
    ],
    stats: {
      avgScore: 85,
      totalTime: '8 ч 30 мин',
      streak: 7,
      rank: 42
    }
  });

  const calculateNextLevelXP = (level) => {
    return level * 1000;
  };

  const xpProgress = (profileData.xp / calculateNextLevelXP(profileData.level)) * 100;

  return (
    <div className="profile-container loading">
      {/* Шапка профиля */}
      <div className="profile-header hover-glow">
        <div className="profile-avatar">
          {profileData.avatar}
        </div>
        
        <div className="profile-info">
          <h1 className="profile-name">{profileData.name}</h1>
          <p className="profile-title">Python Разработчик • Уровень {profileData.level}</p>
          
          <div className="profile-stats">
            <div className="profile-stat hover-glow">
              <span className="stat-value">{profileData.xp}</span>
              <span className="stat-label">Всего XP</span>
            </div>
            <div className="profile-stat hover-glow">
              <span className="stat-value">{profileData.streak}</span>
              <span className="stat-label">Дней подряд</span>
            </div>
            <div className="profile-stat hover-glow">
              <span className="stat-value">{profileData.completedLessons.length}</span>
              <span className="stat-label">Уроков пройдено</span>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="btn btn-primary">
              Редактировать профиль
            </button>
            <button className="btn btn-outline">
              Моя статистика
            </button>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="profile-main-content">
        {/* Левая колонка */}
        <div className="progress-section">
          {/* Прогресс XP */}
          <div className="profile-section">
            <h2 className="section-title">Прогресс обучения</h2>
            <div className="xp-progress">
              <div className="xp-label">
                <span className="current-xp">{profileData.xp} XP</span>
                <span className="next-level">До уровня {profileData.level + 1}: {calculateNextLevelXP(profileData.level) - profileData.xp} XP</span>
              </div>
              <div className="xp-bar-container">
                <div 
                  className="xp-bar" 
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
              <div className="text-center text-muted">
                Уровень {profileData.level} • {Math.round(xpProgress)}% выполнено
              </div>
            </div>
          </div>

          {/* Достижения */}
          <div className="profile-section">
            <h2 className="section-title">Достижения</h2>
            <div className="achievements-grid">
              {profileData.achievements.map(ach => (
                <div 
                  key={ach.id} 
                  className={`achievement-item ${ach.unlocked ? '' : 'locked'}`}
                  title={ach.name}
                >
                  <span className="achievement-icon">{ach.icon}</span>
                  <span className="achievement-name">{ach.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="profile-section">
            <h2 className="section-title">Статистика</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">📊</span>
                <div className="stat-title">Средний балл</div>
                <div className="stat-number">{profileData.stats.avgScore}%</div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⏱️</span>
                <div className="stat-title">Общее время</div>
                <div className="stat-number">{profileData.stats.totalTime}</div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">📈</span>
                <div className="stat-title">Место в рейтинге</div>
                <div className="stat-number">#{profileData.stats.rank}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="sidebar-section">
          <h2 className="section-title">Значки</h2>
          <div className="badge-collection">
            {profileData.badges.map((badge, index) => (
              <div key={index} className="badge-item">
                <span>🏅</span>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Пройденные уроки */}
        <div className="profile-section">
          <h2 className="section-title">Пройденные уроки</h2>
          <div className="lessons-list">
            {profileData.completedLessons.map(lesson => (
              <div key={lesson.id} className="lesson-item">
                <div className="lesson-icon">✓</div>
                <div className="lesson-info">
                  <div className="lesson-name">{lesson.name}</div>
                  <div className="lesson-meta">
                    <span>{lesson.duration}</span>
                    <span className="lesson-xp">+{lesson.xp} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* График активности */}
        <div className="profile-section">
          <h2 className="section-title">Активность за неделю</h2>
          <div className="activity-chart">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
              <div 
                key={day}
                className="activity-bar"
                style={{ height: `${profileData.activity[index]}%` }}
                data-day={day}
              ></div>
            ))}
          </div>
        </div>

        {/* Друзья */}
        <div className="sidebar-section">
          <h2 className="section-title">Друзья</h2>
          <div className="friends-list">
            {profileData.friends.map(friend => (
              <div key={friend.id} className="friend-item">
                <div className="friend-avatar">{friend.avatar}</div>
                <div className="friend-info">
                  <div className="friend-name">{friend.name}</div>
                  <div className="friend-level">Уровень {friend.level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
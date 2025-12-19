// components/Competitions.js
import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import './Competitions.css';

const Competitions = () => {
  const [activeCompetitions, setActiveCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockCompetitions = [
      {
        id: 1,
        title: "Python Sprint Challenge",
        description: "Решите 10 задач за 30 минут и покажите свои навыки программирования!",
        type: "speed",
        prize: "1000 XP + золотой значок",
        participants: 124,
        duration: "30 мин",
        difficulty: "Средний",
        startTime: "2024-01-15T10:00:00",
        endTime: "2024-01-15T10:30:00",
        isActive: true,
        category: "Python Basics",
        tags: ["скорость", "задачи", "таймер"]
      },
      {
        id: 2,
        title: "Weekly Python Marathon",
        description: "Недельный марафон задач разной сложности для настоящих энтузиастов",
        type: "marathon",
        prize: "5000 XP + специальный трофей",
        participants: 78,
        duration: "7 дней",
        difficulty: "Сложный",
        startTime: "2024-01-15T00:00:00",
        endTime: "2024-01-22T23:59:59",
        isActive: true,
        category: "Advanced",
        tags: ["марафон", "неделя", "продвинутый"]
      },
      {
        id: 3,
        title: "Algorithm Masters",
        description: "Соревнование по алгоритмам и структурам данных",
        type: "algorithm",
        prize: "3000 XP + серебряный значок",
        participants: 56,
        duration: "2 часа",
        difficulty: "Эксперт",
        startTime: "2024-01-16T14:00:00",
        endTime: "2024-01-16T16:00:00",
        isActive: true,
        category: "Algorithms",
        tags: ["алгоритмы", "структуры данных", "сложность"]
      }
    ];
    
    setTimeout(() => {
      setActiveCompetitions(mockCompetitions);
      setLoading(false);
    }, 500);
  }, []);

  const handleJoinCompetition = (competitionId) => {
    const competition = activeCompetitions.find(c => c.id === competitionId);
    alert(`🎮 Вы присоединились к соревнованию "${competition.title}"!\n\nУдачи в решении задач! ⚡`);
  };

  const handleDetails = (competitionId) => {
    const competition = activeCompetitions.find(c => c.id === competitionId);
    alert(`📋 Подробности соревнования "${competition.title}":\n\n` +
          `📝 Описание: ${competition.description}\n` +
          `🎯 Тип: ${competition.type === 'speed' ? '⚡ Скорость' : competition.type === 'marathon' ? '🏃‍♂️ Марафон' : '🧠 Алгоритмы'}\n` +
          `📈 Сложность: ${competition.difficulty}\n` +
          `⏱️ Продолжительность: ${competition.duration}\n` +
          `🏆 Приз: ${competition.prize}\n` +
          `👥 Участников: ${competition.participants}`);
  };

  const handleCreateCompetition = () => {
    alert('🎉 Открывается форма создания нового соревнования!\n\nВы сможете настроить тип соревнования, задачи, призы и время проведения.');
  };

  const getCompetitionIcon = (type) => {
    switch(type) {
      case 'speed': return '⚡';
      case 'marathon': return '🏃‍♂️';
      case 'algorithm': return '🧠';
      default: return '⚔️';
    }
  };

  const formatTimeRemaining = () => {
    // Рассчитываем оставшееся время до начала соревнования
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours} ч ${minutes} мин`;
  };

  if (loading) {
    return (
      <div className="competitions-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Загрузка соревнований...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="competitions-container">
      <div className="competitions-header">
        <div className="header-content">
          <h2 className="competitions-title">
            <span className="title-icon">⚔️</span>
            Соревнования
          </h2>
          <p className="competitions-subtitle">
            Соревнуйтесь с другими игроками и докажите свои навыки Python
          </p>
        </div>
        <button 
          className="create-competition-btn"
          onClick={handleCreateCompetition}
        >
          <span className="btn-icon">+</span>
          Создать соревнование
        </button>
      </div>

      <div className="competitions-grid">
        {activeCompetitions.map(competition => (
          <div key={competition.id} className="competition-card">
            <div className="competition-header">
              <div className="competition-badges">
                <span className={`badge type-${competition.type}`}>
                  <span className="badge-icon">{getCompetitionIcon(competition.type)}</span>
                  {competition.type === 'speed' ? 'Скорость' : 
                   competition.type === 'marathon' ? 'Марафон' : 
                   competition.type === 'algorithm' ? 'Алгоритмы' : 'Дуэль'}
                </span>
                <span className={`badge difficulty difficulty-${competition.difficulty.toLowerCase()}`}>
                  {competition.difficulty}
                </span>
              </div>
              <h3 className="competition-name">{competition.title}</h3>
              <p className="competition-description">{competition.description}</p>
              
              <div className="competition-tags">
                {competition.tags.map((tag, index) => (
                  <span key={index} className="competition-tag">#{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="competition-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-icon-wrapper">
                    <span className="detail-icon">🏆</span>
                  </div>
                  <div className="detail-content">
                    <div className="detail-label">Приз</div>
                    <div className="detail-value highlight">{competition.prize}</div>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon-wrapper">
                    <span className="detail-icon">👥</span>
                  </div>
                  <div className="detail-content">
                    <div className="detail-label">Участники</div>
                    <div className="detail-value">{competition.participants}</div>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon-wrapper">
                    <span className="detail-icon">⏱️</span>
                  </div>
                  <div className="detail-content">
                    <div className="detail-label">Длительность</div>
                    <div className="detail-value">{competition.duration}</div>
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-icon-wrapper">
                    <span className="detail-icon">🎯</span>
                  </div>
                  <div className="detail-content">
                    <div className="detail-label">Категория</div>
                    <div className="detail-value">{competition.category}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="competition-footer">
              <div className="competition-timer">
                <span className="timer-icon">🕒</span>
                <span className="timer-text">Начинается через: {formatTimeRemaining()}</span>
              </div>
              
              <div className="competition-actions">
                <button 
                  className="join-competition-btn"
                  onClick={() => handleJoinCompetition(competition.id)}
                >
                  <span className="btn-icon">🎮</span>
                  Присоединиться
                </button>
                
                <button 
                  className="details-btn"
                  onClick={() => handleDetails(competition.id)}
                >
                  <span className="btn-icon">📋</span>
                  Подробнее
                  <span className="btn-icon btn-icon-right">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard-wrapper">
        <Leaderboard />
      </div>
    </div>
  );
};

export default Competitions;
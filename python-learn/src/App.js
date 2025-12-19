// App.js
import React, { useState } from 'react';
import './App.css';

// Импорт компонентов
import Header from './components/Header';
import LessonCard from './components/LessonCard';
import ProgressBar from './components/ProgressBar';
import PythonEditor from './components/PythonEditor';
import TheorySection from './components/TheorySection';
import FriendsList from './components/FriendsList';
import Competitions from './components/Competitions';

// Расширенные данные уроков
const initialLessons = [
  {
    id: 1,
    title: "Основы Python: Переменные и типы данных",
    description: "Изучите базовые типы данных и работу с переменными в Python",
    category: "beginner",
    difficulty: "легкий",
    duration: "15 мин",
    xpReward: 100,
    topics: ["переменные", "типы-данных", "синтаксис"],
    theory: {
      title: "Переменные и типы данных в Python",
      content: `В Python переменные используются для хранения данных. В отличие от некоторых других языков, в Python не нужно явно объявлять тип переменной - он определяется автоматически.

Основные типы данных в Python включают целые числа (int), числа с плавающей точкой (float), строки (str), логические значения (bool), списки (list), кортежи (tuple), словари (dict) и множества (set).`,
      keyPoints: [
        "Python - язык с динамической типизацией",
        "Переменные создаются при первом присваивании",
        "Названия переменных чувствительны к регистру",
        "Рекомендуется использовать snake_case для имен переменных"
      ],
      examples: [
        {
          title: "Создание переменных",
          code: `# Числа\nage = 25\npi = 3.14159\n\n# Строки\nname = "Анна"\nmessage = 'Привет, мир!'`,
          description: "Примеры создания переменных различных типов"
        }
      ],
      exercises: [
        {
          id: 1,
          description: "Создайте переменную с именем 'score' и присвойте ей значение 100",
          hint: "Используйте оператор присваивания ="
        }
      ],
      sectionsCount: 3
    }
  },
  {
    id: 2,
    title: "Условные операторы if/else",
    description: "Научитесь принимать решения в своих программах",
    category: "beginner",
    difficulty: "легкий",
    duration: "20 мин",
    xpReward: 150,
    topics: ["условия", "логика", "ветвление"],
    theory: {
      title: "Условные операторы в Python",
      content: `Условные операторы позволяют выполнять различные действия в зависимости от условий. В Python для этого используются ключевые слова if, elif и else.`,
      keyPoints: [
        "if проверяет условие и выполняет блок кода если оно истинно",
        "elif (else if) проверяет дополнительное условие если предыдущее ложно",
        "else выполняет блок кода если все условия ложны",
        "Условия могут быть объединены с помощью операторов and, or, not"
      ],
      sectionsCount: 3
    }
  },
  {
    id: 3,
    title: "Циклы for и while",
    description: "Освойте повторение действий в программах",
    category: "intermediate",
    difficulty: "средний",
    duration: "25 мин",
    xpReward: 200,
    topics: ["циклы", "итерации", "повторение"],
    theory: {
      title: "Циклы в Python",
      content: `Циклы позволяют выполнять один и тот же блок кода несколько раз. Python поддерживает циклы for (для итерации по последовательностям) и while (для повторения пока условие истинно).`,
      keyPoints: [
        "for используется для итерации по элементам последовательности",
        "while повторяется пока условие истинно",
        "break прерывает выполнение цикла",
        "continue переходит к следующей итерации",
        "else в циклах выполняется если цикл завершился нормально (без break)"
      ],
      sectionsCount: 3
    }
  },
  {
    id: 4,
    title: "Функции и модули",
    description: "Создавайте переиспользуемые блоки кода",
    category: "intermediate",
    difficulty: "средний",
    duration: "30 мин",
    xpReward: 250,
    topics: ["функции", "модули", "переиспользование"],
    theory: {
      title: "Функции в Python",
      content: `Функции позволяют группировать код в переиспользуемые блоки. Они принимают параметры, выполняют операции и могут возвращать результат. Модули - это файлы с кодом Python, которые можно импортировать.`,
      keyPoints: [
        "def используется для определения функции",
        "Функции могут принимать аргументы и возвращать значения",
        "return завершает выполнение функции и возвращает значение",
        "Модули позволяют организовывать код в отдельные файлы",
        "import используется для импорта модулей"
      ],
      sectionsCount: 3
    }
  }
];

// Расширенные данные пользователя для профиля
const extendedUserData = {
  id: 1,
  name: "Алексей Петров",
  avatar: "👨‍💻",
  xp: 1250,
  level: 2,
  streak: 7,
  friends: 12,
  completedLessons: [1],
  achievements: [
    { id: 1, name: 'Первый урок', icon: '🎯', unlocked: true },
    { id: 2, name: 'Стратегия', icon: '🏆', unlocked: true },
    { id: 3, name: 'Питон-мастер', icon: '🐍', unlocked: false },
    { id: 4, name: 'Неделя обучения', icon: '📚', unlocked: true },
    { id: 5, name: 'Социальный', icon: '👥', unlocked: false },
    { id: 6, name: 'Эксперт', icon: '⭐', unlocked: false },
  ],
  badges: ['Python Новичок', 'Активный ученик', 'Дружелюбный'],
  activity: [25, 40, 35, 50, 45, 60, 70],
  completedLessons: [
    { id: 1, name: 'Основы Python', xp: 100, duration: '15 мин' },
    { id: 2, name: 'Условные операторы', xp: 150, duration: '20 мин' },
  ],
  stats: {
    avgScore: 85,
    totalTime: '8 ч 30 мин',
    rank: 42
  }
};

const App = () => {
  const [user, setUser] = useState(extendedUserData);
  
  const [lessons] = useState(initialLessons);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showPractice, setShowPractice] = useState(false);
  const [activeTab, setActiveTab] = useState('lessons');

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
    setShowPractice(true);
    setActiveTab('practice');
  };

  const completeLesson = (lessonId) => {
    if (!user.completedLessons.includes(lessonId)) {
      const lesson = lessons.find(l => l.id === lessonId);
      const newXP = user.xp + lesson.xpReward;
      const newLevel = Math.floor(newXP / 1000) + 1;
      
      // Создаем новый урок для статистики
      const newCompletedLesson = {
        id: lessonId,
        name: lesson.title,
        xp: lesson.xpReward,
        duration: lesson.duration
      };

      // Обновляем пользователя с расширенными данными
      setUser({
        ...user,
        xp: newXP,
        level: newLevel,
        completedLessons: [...user.completedLessons, lessonId],
        stats: {
          ...user.stats,
          totalTime: '9 ч 30 мин' // Обновляем общее время
        }
      });
      
      alert(`🎉 Поздравляем! Вы завершили урок "${lesson.title}" и получили ${lesson.xpReward} XP!`);
    }
  };

  const handleEditProfile = () => {
    const newName = prompt('Введите новое имя:', user.name);
    if (newName && newName.trim() !== '') {
      setUser({ ...user, name: newName.trim() });
      alert('Имя профиля обновлено!');
    }
  };

  const handleViewStats = () => {
    alert(`Статистика пользователя:
📊 Уровень: ${user.level}
⭐ XP: ${user.xp}
🔥 Дней подряд: ${user.streak}
📚 Уроков пройдено: ${user.completedLessons.length}
🏆 Средний балл: ${user.stats.avgScore}%
⏱️ Общее время: ${user.stats.totalTime}
🥇 Рейтинг: ${user.stats.rank} место`);
  };

  const calculateNextLevelXP = (level) => {
    return level * 1000;
  };

  const xpProgress = (user.xp % 1000) / 1000 * 100;

  return (
    <div className="app">
      <Header 
        user={user} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="main-content">
        {showPractice && activeLesson ? (
          <div className="practice-container">
            <button 
              className="back-btn btn btn-outline"
              onClick={() => {
                setShowPractice(false);
                setActiveTab('lessons');
              }}
            >
              ← Назад к урокам
            </button>
            
            <div className="lesson-content">
              <div className="lesson-header-section">
                <div className="lesson-badge badge badge-primary">{activeLesson.difficulty}</div>
                <h2>{activeLesson.title}</h2>
                <p className="lesson-subtitle">{activeLesson.description}</p>
              </div>
              
              <TheorySection theory={activeLesson.theory} />
              
              <div className="practice-section">
                <h3>Попробуйте сами:</h3>
                <PythonEditor 
                  initialCode={`# Напишите вашу первую программу на Python
print("Привет, мир!")

# Создайте переменную
name = "Ваше имя"

# Выведите приветствие
print(f"Привет, {name}!")

# Попробуйте создать свою переменную
age = 25
print(f"Мой возраст: {age} лет")

# Простое вычисление
x = 10
y = 5
print(f"{x} + {y} = {x + y}")
print(f"{x} * {y} = {x * y}")`}
                  height="350px"
                  onComplete={() => completeLesson(activeLesson.id)}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'lessons' && (
              <>
                <section className="hero-section">
                  <h1>Изучайте Python бесплатно</h1>
                  <p>Интерактивные уроки, практика кода и отслеживание прогресса</p>
                  <ProgressBar currentXP={user.xp} nextLevelXP={2000} />
                </section>

                <section className="lessons-section">
                  <h2>Уроки</h2>
                  <div className="lessons-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons.map(lesson => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        onStart={() => handleLessonClick(lesson)}
                        isCompleted={user.completedLessons.includes(lesson.id)}
                      />
                    ))}
                  </div>
                </section>

                <section className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="feature-card card">
                    <div className="feature-icon">🐍</div>
                    <h3>Практика Python</h3>
                    <p>Запускайте код прямо в браузере с мгновенной проверкой</p>
                  </div>
                  <div className="feature-card card">
                    <div className="feature-icon">👥</div>
                    <h3>Соревнования</h3>
                    <p>Соревнуйтесь с друзьями в решении задач на время</p>
                  </div>
                  <div className="feature-card card">
                    <div className="feature-icon">🏆</div>
                    <h3>Достижения</h3>
                    <p>Получайте награды и значки за ваш прогресс</p>
                  </div>
                </section>

                <button 
                  className="show-practice-btn btn btn-primary btn-lg mt-10 mx-auto block"
                  onClick={() => {
                    setActiveLesson(lessons[0]);
                    setShowPractice(true);
                    setActiveTab('practice');
                  }}
                >
                  🚀 Начать обучение
                </button>
              </>
            )}
            
            {activeTab === 'social' && (
              <div className="social-features grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="feature-half">
                  <h3>Друзья</h3>
                  <FriendsList currentUser={user} />
                </div>
                <div className="feature-half">
                  <h3>Соревнования</h3>
                  <Competitions />
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="profile-container card animate-fade-in">
                <div className="profile-header">
                  <div className="profile-avatar animate-float">{user.avatar}</div>
                  <div className="profile-info">
                    <h1 className="profile-name">{user.name}</h1>
                    <p className="profile-title">Python Разработчик • Уровень {user.level}</p>
                    
                    <div className="profile-stats">
                      <div className="profile-stat card">
                        <span className="stat-value">{user.xp}</span>
                        <span className="stat-label">Всего XP</span>
                      </div>
                      <div className="profile-stat card">
                        <span className="stat-value">{user.streak}</span>
                        <span className="stat-label">Дней подряд</span>
                      </div>
                      <div className="profile-stat card">
                        <span className="stat-value">{user.completedLessons.length}</span>
                        <span className="stat-label">Уроков пройдено</span>
                      </div>
                    </div>
                    
                    <div className="profile-actions mt-6">
                      <button className="btn btn-primary" onClick={handleEditProfile}>
                        Редактировать профиль
                      </button>
                      <button className="btn btn-outline" onClick={handleViewStats}>
                        Моя статистика
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="profile-main-content grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Левая колонка */}
                  <div className="lg:col-span-2">
                    {/* Прогресс обучения */}
                    <div className="profile-section card mb-6">
                      <h2 className="section-title">Прогресс обучения</h2>
                      <div className="xp-progress">
                        <div className="flex justify-between mb-2">
                          <span className="current-xp font-bold">{user.xp} XP</span>
                          <span className="next-level text-muted">
                            До уровня {user.level + 1}: {calculateNextLevelXP(user.level + 1) - user.xp} XP
                          </span>
                        </div>
                        <div className="progress">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${xpProgress}%` }}
                          ></div>
                        </div>
                        <div className="text-center text-muted mt-2">
                          Уровень {user.level} • {Math.round(xpProgress)}% выполнено
                        </div>
                      </div>
                    </div>

                    {/* Достижения */}
                    <div className="profile-section card mb-6">
                      <h2 className="section-title">Достижения</h2>
                      <div className="achievements-grid grid grid-cols-3 sm:grid-cols-6 gap-4">
                        {user.achievements.map(ach => (
                          <div 
                            key={ach.id} 
                            className={`achievement-item card text-center p-4 ${ach.unlocked ? '' : 'opacity-50'}`}
                            title={ach.name}
                          >
                            <span className="achievement-icon text-2xl block mb-2">{ach.icon}</span>
                            <span className="achievement-name text-sm font-semibold">{ach.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Пройденные уроки */}
                    <div className="profile-section card">
                      <h2 className="section-title">Пройденные уроки</h2>
                      <div className="lessons-list">
                        {user.completedLessons.map(lesson => (
                          <div key={lesson.id} className="lesson-item flex items-center p-4 mb-3 bg-secondary rounded-lg">
                            <div className="lesson-icon bg-success text-white rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                              ✓
                            </div>
                            <div className="lesson-info flex-1">
                              <div className="lesson-name font-semibold">{lesson.name}</div>
                              <div className="lesson-meta flex gap-4 text-sm text-tertiary">
                                <span>{lesson.duration}</span>
                                <span className="text-success font-semibold">+{lesson.xp} XP</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Правая колонка */}
                  <div>
                    {/* Значки */}
                    <div className="profile-section card mb-6">
                      <h2 className="section-title">Значки</h2>
                      <div className="badge-collection">
                        {user.badges.map((badge, index) => (
                          <div key={index} className="badge-item badge badge-primary mb-2 mr-2">
                            🏅 {badge}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Активность */}
                    <div className="profile-section card mb-6">
                      <h2 className="section-title">Активность за неделю</h2>
                      <div className="activity-chart flex items-end gap-2 h-32 mt-4">
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                          <div 
                            key={day}
                            className="activity-bar bg-primary rounded-t flex-1"
                            style={{ height: `${user.activity[index]}%` }}
                            title={`${user.activity[index]}% активности`}
                          >
                            <div className="text-center text-xs mt-1">{day}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Статистика */}
                    <div className="profile-section card">
                      <h2 className="section-title">Статистика</h2>
                      <div className="stats-grid grid grid-cols-2 gap-4">
                        <div className="stat-card text-center p-4">
                          <span className="stat-icon text-2xl block mb-2">📊</span>
                          <div className="stat-title text-sm text-tertiary">Средний балл</div>
                          <div className="stat-number text-xl font-bold">{user.stats.avgScore}%</div>
                        </div>
                        <div className="stat-card text-center p-4">
                          <span className="stat-icon text-2xl block mb-2">⏱️</span>
                          <div className="stat-title text-sm text-tertiary">Общее время</div>
                          <div className="stat-number text-xl font-bold">{user.stats.totalTime}</div>
                        </div>
                        <div className="stat-card text-center p-4">
                          <span className="stat-icon text-2xl block mb-2">🥇</span>
                          <div className="stat-title text-sm text-tertiary">Место</div>
                          <div className="stat-number text-xl font-bold">#{user.stats.rank}</div>
                        </div>
                        <div className="stat-card text-center p-4">
                          <span className="stat-icon text-2xl block mb-2">👥</span>
                          <div className="stat-title text-sm text-tertiary">Друзей</div>
                          <div className="stat-number text-xl font-bold">{user.friends}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'practice' && !showPractice && (
              <div className="practice-home animate-fade-in">
                <div className="practice-header text-center mb-8">
                  <h2>Практика Python</h2>
                  <p>Выберите задачу для практики или создайте свой проект</p>
                </div>
                
                <div className="quick-editor card">
                  <h3 className="mb-4">Быстрый редактор кода</h3>
                  <PythonEditor 
                    initialCode={`# Начните писать код здесь
print("Добро пожаловать в Python редактор!")

# Попробуйте что-нибудь написать
def greet(name):
    return f"Привет, {name}!"

print(greet("Программист"))
`}
                    height="250px"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="app-footer mt-10">
        <p>PythonLearn © 2024 - Изучайте Python бесплатно!</p>
        <div className="footer-links">
          <a href="#privacy">Политика конфиденциальности</a>
          <a href="#terms">Условия использования</a>
          <a href="#contact">Контакты</a>
          <a href="#help">Помощь</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
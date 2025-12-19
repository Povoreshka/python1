// data/usersData.js
export const usersData = {
  currentUser: {
    id: 1,
    name: "Иван Иванов",
    avatar: "🧑‍💻",
    xp: 1250,
    level: 2,
    streak: 7,
    friends: 12,
    rank: 45,
    achievements: [
      { id: 1, name: "Первый урок", icon: "🎯", date: "2024-01-10" },
      { id: 2, name: "Недельный стрик", icon: "🔥", date: "2024-01-15" },
      { id: 3, name: "Мастер переменных", icon: "🐍", date: "2024-01-12" }
    ],
    stats: {
      lessonsCompleted: 5,
      exercisesSolved: 25,
      totalTime: "12ч 30м",
      accuracy: "87%"
    }
  },
  friends: [
    // данные друзей
  ]
};
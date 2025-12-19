// components/FriendsList.js
import React, { useState, useEffect } from 'react';
import './FriendsList.css';

const FriendsList = ({ currentUser }) => {
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Загрузка данных о друзьях
    const loadFriendsData = async () => {
      const mockFriends = [
        { id: 1, name: "Анна", avatar: "👩‍💻", xp: 4500, isOnline: true, lastActive: '2 мин назад' },
        { id: 2, name: "Сергей", avatar: "🧑‍💻", xp: 5200, isOnline: true, lastActive: '5 мин назад' },
        { id: 3, name: "Ольга", avatar: "👩‍🎓", xp: 3800, isOnline: false, lastActive: '2 часа назад' },
        { id: 4, name: "Михаил", avatar: "🧑‍🎓", xp: 6100, isOnline: true, lastActive: '10 мин назад' },
      ];
      
      const mockPending = [
        { id: 5, name: "Денис", avatar: "👨‍💻", xp: 2900, mutualFriends: 2 },
        { id: 6, name: "Екатерина", avatar: "👩‍🔬", xp: 4100, mutualFriends: 1 },
      ];
      
      const mockSuggested = [
        { id: 7, name: "Александр", avatar: "🧑‍🔧", xp: 3300, mutualFriends: 3 },
        { id: 8, name: "Наталья", avatar: "👩‍🏫", xp: 4700, mutualFriends: 2 },
        { id: 9, name: "Игорь", avatar: "🧑‍🏫", xp: 3900, mutualFriends: 1 },
      ];
      
      setFriends(mockFriends);
      setPendingRequests(mockPending);
      setSuggestedUsers(mockSuggested);
    };
    
    loadFriendsData();
  }, []);

  const handleAddFriend = (userId) => {
    // Логика добавления в друзья
    console.log('Adding friend:', userId);
  };

  const handleAcceptRequest = (userId) => {
    // Принятие заявки
    setPendingRequests(pendingRequests.filter(user => user.id !== userId));
    const userToAdd = pendingRequests.find(user => user.id === userId);
    if (userToAdd) {
      setFriends([...friends, { ...userToAdd, isOnline: false }]);
    }
  };

  const handleChallengeFriend = (friendId) => {
    // Вызов друга на дуэль
    console.log('Challenging friend:', friendId);
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="friends-list">
      <div className="friends-header">
        <h3>👥 Друзья</h3>
        <input
          type="text"
          placeholder="Поиск друзей..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="friends-search"
        />
      </div>

      {pendingRequests.length > 0 && (
        <div className="pending-requests">
          <h4>Запросы в друзья ({pendingRequests.length})</h4>
          {pendingRequests.map(user => (
            <div key={user.id} className="friend-request">
              <div className="request-info">
                <span className="friend-avatar">{user.avatar}</span>
                <div className="request-details">
                  <strong>{user.name}</strong>
                  <span className="mutual-friends">
                    {user.mutualFriends} общих друга
                  </span>
                </div>
              </div>
              <div className="request-actions">
                <button 
                  className="accept-btn"
                  onClick={() => handleAcceptRequest(user.id)}
                >
                  Принять
                </button>
                <button className="decline-btn">Отклонить</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="friends-online">
        <h4>Онлайн ({friends.filter(f => f.isOnline).length})</h4>
        <div className="friends-grid">
          {filteredFriends
            .filter(friend => friend.isOnline)
            .map(friend => (
              <div key={friend.id} className="friend-card online">
                <div className="friend-avatar-status">
                  <span className="friend-avatar">{friend.avatar}</span>
                  <span className="online-dot"></span>
                </div>
                <div className="friend-info">
                  <strong>{friend.name}</strong>
                  <span className="friend-xp">⭐ {friend.xp} XP</span>
                  <span className="friend-status">Online</span>
                </div>
                <button 
                  className="challenge-btn"
                  onClick={() => handleChallengeFriend(friend.id)}
                >
                  ⚔️ Вызвать
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="all-friends">
        <h4>Все друзья ({friends.length})</h4>
        <div className="friends-grid">
          {filteredFriends.map(friend => (
            <div key={friend.id} className="friend-card">
              <div className="friend-avatar-status">
                <span className="friend-avatar">{friend.avatar}</span>
                {friend.isOnline && <span className="online-dot"></span>}
              </div>
              <div className="friend-info">
                <strong>{friend.name}</strong>
                <span className="friend-xp">⭐ {friend.xp} XP</span>
                <span className="friend-status">
                  {friend.isOnline ? 'Online' : `Был(а) ${friend.lastActive}`}
                </span>
              </div>
              <button 
                className="message-btn"
                onClick={() => console.log('Message to:', friend.id)}
              >
                ✉️
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="suggested-friends">
        <h4>Возможно вы знакомы</h4>
        {suggestedUsers.map(user => (
          <div key={user.id} className="suggested-user">
            <div className="suggested-info">
              <span className="user-avatar">{user.avatar}</span>
              <div>
                <strong>{user.name}</strong>
                <div className="user-stats">
                  <span>⭐ {user.xp} XP</span>
                  <span>🤝 {user.mutualFriends} общих друга</span>
                </div>
              </div>
            </div>
            <button 
              className="add-friend-btn"
              onClick={() => handleAddFriend(user.id)}
            >
              Добавить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
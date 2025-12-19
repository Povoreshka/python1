// components/TheorySection.js
import React, { useState } from 'react';
import './TheorySection.css';

const TheorySection = ({ theory }) => {
  const [activeTab, setActiveTab] = useState('theory');
  const [completedSections, setCompletedSections] = useState([]);

  const markAsCompleted = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  return (
    <div className="theory-section">
      <div className="theory-tabs">
        <button 
          className={`tab ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          📚 Теория
        </button>
        <button 
          className={`tab ${activeTab === 'examples' ? 'active' : ''}`}
          onClick={() => setActiveTab('examples')}
        >
          💡 Примеры
        </button>
        <button 
          className={`tab ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          🏋️ Упражнения
        </button>
      </div>
      
      <div className="theory-content">
        {activeTab === 'theory' && (
          <div className="theory-main">
            <h3>{theory.title}</h3>
            <div className="theory-text">
              {theory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            {theory.keyPoints && (
              <div className="key-points">
                <h4>Ключевые моменты:</h4>
                <ul>
                  {theory.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <button 
              className="complete-button"
              onClick={() => markAsCompleted('theory')}
            >
              {completedSections.includes('theory') ? '✓ Изучено' : 'Отметить как изученное'}
            </button>
          </div>
        )}
        
        {activeTab === 'examples' && theory.examples && (
          <div className="examples-section">
            <h3>Примеры кода</h3>
            {theory.examples.map((example, idx) => (
              <div key={idx} className="code-example">
                <h5>{example.title}</h5>
                <pre><code>{example.code}</code></pre>
                <p className="example-description">{example.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'practice' && theory.exercises && (
          <div className="practice-section">
            <h3>Практические упражнения</h3>
            {theory.exercises.map((exercise, idx) => (
              <div key={idx} className="exercise">
                <h5>Упражнение {idx + 1}</h5>
                <p>{exercise.description}</p>
                {exercise.hint && (
                  <details className="hint">
                    <summary>Подсказка</summary>
                    <p>{exercise.hint}</p>
                  </details>
                )}
                <div className="exercise-actions">
                  <button className="show-solution">Показать решение</button>
                  <button 
                    className="mark-completed"
                    onClick={() => markAsCompleted(`exercise-${idx}`)}
                  >
                    {completedSections.includes(`exercise-${idx}`) ? '✓ Выполнено' : 'Отметить выполненным'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="progress-indicator">
        <div className="progress-text">
          Прогресс: {completedSections.length} из {theory.sectionsCount || 3} разделов изучено
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{
              width: `${(completedSections.length / (theory.sectionsCount || 3)) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TheorySection;
// components/Quiz.jsx
import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ quiz, onComplete, onCancel }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [codeInput, setCodeInput] = useState('');

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers, {
      questionId: currentQuestion.id,
      answer: answer
    }];
    
    setUserAnswers(newAnswers);
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCodeInput('');
    } else {
      calculateScore(newAnswers);
    }
  };

  const handleCodeSubmit = () => {
    handleAnswer(codeInput);
  };

  const calculateScore = (answers) => {
    let score = 0;
    
    answers.forEach((userAnswer, index) => {
      const question = quiz.questions[index];
      
      if (question.type === 'multiple-choice') {
        // Проверка множественного выбора
        const correctCount = question.correctAnswers.length;
        const userCorrect = userAnswer.answer.filter(a => 
          question.correctAnswers.includes(a)
        ).length;
        score += userCorrect / correctCount;
      } else if (question.type === 'code') {
        // Простая проверка кода (в реальном приложении нужен более сложный алгоритм)
        if (userAnswer.answer.trim() === question.correctAnswer.trim()) {
          score += 1;
        }
      } else {
        // Для обычных вопросов
        if (userAnswer.answer === question.correctAnswer) {
          score += 1;
        }
      }
    });
    
    onComplete(score, quiz.questions.length);
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="multiple-choice-question">
            <h3>{currentQuestion.question}</h3>
            <div className="options-grid">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswer([option])}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="code-question">
            <h3>{currentQuestion.question}</h3>
            <pre className="code-block">
              <code>{currentQuestion.code}</code>
            </pre>
            <textarea
              className="code-editor"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Напишите ваш код здесь..."
              rows={6}
            />
            <button 
              className="submit-code-button"
              onClick={handleCodeSubmit}
            >
              Проверить код
            </button>
          </div>
        );
      
      default:
        return (
          <div className="standard-question">
            <h3>{currentQuestion.question}</h3>
            <div className="answer-buttons">
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswer(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quiz.title}</h2>
        <button className="cancel-button" onClick={onCancel}>×</button>
      </div>
      
      <div className="quiz-progress">
        <div 
          className="progress-fill"
          style={{
            width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`
          }}
        />
        <span>Вопрос {currentQuestionIndex + 1} из {quiz.questions.length}</span>
      </div>
      
      <div className="question-container">
        {renderQuestion()}
      </div>
    </div>
  );
};

export default Quiz;
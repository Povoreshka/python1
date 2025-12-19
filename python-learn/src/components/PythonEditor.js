// components/PythonEditor.js
import React, { useState } from 'react';
import './PythonEditor.css';

const PythonEditor = ({ initialCode = '', height = '300px', onComplete }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // Эмуляция выполнения кода
    setTimeout(() => {
      try {
        // Эмуляция выполнения кода
        let outputText = '✅ Код выполнен успешно!\n\n';
        
        // Извлекаем print statements
        const printMatches = code.match(/print\(["']([^"']+)["']\)/g);
        if (printMatches && printMatches.length > 0) {
          outputText += 'Вывод программы:\n';
          printMatches.forEach((match, index) => {
            const content = match.match(/print\(["']([^"']+)["']\)/);
            if (content) {
              outputText += `  ${index + 1}. ${content[1]}\n`;
            }
          });
        }
        
        // Проверяем переменные
        const varMatches = code.match(/(\w+)\s*=\s*["']?([^"\n]+)["']?/g);
        if (varMatches) {
          outputText += '\nСозданные переменные:\n';
          varMatches.forEach(match => {
            outputText += `  ${match}\n`;
          });
        }
        
        setOutput(outputText);
        
        // Помечаем как выполненное
        if (!isCompleted) {
          setIsCompleted(true);
          if (onComplete) {
            onComplete();
          }
        }
        
      } catch (error) {
        setOutput(`❌ Ошибка выполнения: ${error.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 1500);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setIsCompleted(false);
  };

  const handleFormat = () => {
    // Простое форматирование
    const formatted = code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((line, index) => {
        // Добавляем отступы для блоков кода
        if (line.includes('if ') || line.includes('def ') || line.includes('for ') || line.includes('while ')) {
          return line + '\n    # ваш код здесь';
        }
        return line;
      })
      .join('\n');
    
    setCode(formatted);
  };

  return (
    <div className="python-editor-container">
      <div className="editor-header">
        <div className="editor-title">
          <h4>Python редактор</h4>
          <span className="editor-subtitle">Запускайте код прямо в браузере</span>
        </div>
        <div className="editor-controls">
          <button 
            onClick={handleFormat}
            className="format-button"
            title="Форматировать код"
          >
            🎨 Форматировать
          </button>
          <button 
            onClick={handleReset}
            className="reset-button"
            title="Сбросить код"
          >
            🔄 Сбросить
          </button>
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className={`run-button ${isCompleted ? 'completed' : ''}`}
          >
            {isRunning ? '⏳ Выполняется...' : isCompleted ? '✅ Выполнено' : '🚀 Запустить код'}
          </button>
        </div>
      </div>
      
      <div className="code-container">
        <div className="code-header">
          <span className="code-language">Python 3</span>
          <span className="code-status">{isCompleted ? '✓ Готово' : 'Редактируется'}</span>
        </div>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ height }}
          placeholder="# Начните писать код здесь...
# Используйте print() для вывода результатов
# Пример: print('Привет, мир!')"
          spellCheck="false"
        />
        <div className="editor-hints">
          <div className="hint">
            <strong>💡 Подсказка:</strong> Используйте Tab для отступов
          </div>
          <div className="hint">
            <strong>✨ Совет:</strong> Нажмите Ctrl+Enter для быстрого запуска
          </div>
        </div>
      </div>
      
      <div className="output-container">
        <div className="output-header">
          <h5>Результат выполнения</h5>
          <button 
            className="clear-output"
            onClick={() => setOutput('')}
            disabled={!output}
          >
            🗑️ Очистить
          </button>
        </div>
        <div className="output-content">
          <pre className={`output-text ${!output ? 'empty' : ''}`}>
            {output || 'Здесь появится результат выполнения вашего кода...'}
          </pre>
        </div>
      </div>
      
      {isCompleted && (
        <div className="completion-message">
          <div className="message-content">
            <span className="message-icon">🎉</span>
            <div>
              <strong>Отлично! Задание выполнено!</strong>
              <p>Вы успешно выполнили код. Переходите к следующему заданию!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PythonEditor;
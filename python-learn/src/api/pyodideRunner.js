// api/pyodideRunner.js
class PyodideRunner {
  constructor() {
    this.pyodide = null;
    this.isInitialized = false;
    this.output = '';
    this.error = '';
  }

  async initialize() {
    if (this.isInitialized) return true;
    
    try {
      // Проверяем, загружен ли Pyodide через CDN (используем window для глобальной переменной)
      if (typeof window.loadPyodide === 'undefined') {
        console.warn('Pyodide not loaded, using mock mode');
        return false;
      }
      
      // Используем window.loadPyodide чтобы ESLint не ругался
      this.pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
      });
      
      this.isInitialized = true;
      console.log('Pyodide initialized successfully');
      return true;
      
    } catch (error) {
      console.error('Pyodide initialization failed:', error);
      return false;
    }
  }

  async runPythonCode(code, testCases = []) {
    // Если Pyodide не загружен, используем мок
    if (!this.isInitialized) {
      const initialized = await this.initialize();
      if (!initialized) {
        return this.mockRunPythonCode(code, testCases);
      }
    }
    
    this.output = '';
    this.error = '';
    
    try {
      // Выполняем код пользователя
      const result = await this.pyodide.runPythonAsync(code);
      this.output = result ? result.toString() : '';
      
      // Проверяем тестовые случаи
      const testResults = [];
      for (const testCase of testCases) {
        const result = await this.executeTest(code, testCase);
        testResults.push(result);
      }
      
      return {
        success: true,
        output: this.output,
        error: '',
        testResults,
        allTestsPassed: testResults.every(t => t.passed)
      };
      
    } catch (error) {
      console.error('Error running Python code:', error);
      return {
        success: false,
        output: '',
        error: error.toString(),
        testResults: [],
        allTestsPassed: false
      };
    }
  }

  async executeTest(userCode, testCase) {
    try {
      // Объединяем код пользователя с тестом
      const fullCode = `${userCode}\n\n${testCase.code}`;
      await this.pyodide.runPythonAsync(fullCode);
      
      // Проверяем assertion если есть
      if (testCase.assertion) {
        const assertionResult = await this.pyodide.runPythonAsync(testCase.assertion);
        if (assertionResult && assertionResult.toString() === 'False') {
          throw new Error('Assertion failed');
        }
      }
      
      return {
        passed: true,
        message: 'Test passed',
        expected: testCase.expected,
        actual: 'OK'
      };
      
    } catch (error) {
      return {
        passed: false,
        message: error.toString(),
        expected: testCase.expected,
        actual: 'Error'
      };
    }
  }

  async checkSyntax(code) {
    if (!this.isInitialized) {
      await this.initialize();
      if (!this.isInitialized) {
        return { valid: true, error: null };
      }
    }
    
    try {
      await this.pyodide.runPythonAsync(`
try:
    compile("""${code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}""", "<string>", "exec")
    True
except SyntaxError as e:
    False
      `);
      return { valid: true, error: null };
    } catch (error) {
      return { valid: false, error: error.toString() };
    }
  }

  // Мок-режим для отладки
  mockRunPythonCode(code, testCases) {
    console.log('Running in mock mode');
    
    // Эмулируем выполнение кода
    let output = '✅ Код выполнен успешно (мок-режим)\n';
    
    // Извлекаем все print statements
    const printMatches = code.match(/print\(["']([^"']+)["']\)/g);
    if (printMatches && printMatches.length > 0) {
      output += 'Вывод программы:\n';
      printMatches.forEach((match, index) => {
        const content = match.match(/print\(["']([^"']+)["']\)/);
        if (content) {
          output += `[${index + 1}] ${content[1]}\n`;
        }
      });
    }
    
    // Проверяем переменные
    const varMatches = code.match(/(\w+)\s*=\s*["']?([^"\n]+)["']?/g);
    if (varMatches) {
      output += '\nСозданные переменные:\n';
      varMatches.forEach(match => {
        output += `  ${match}\n`;
      });
    }
    
    // Мок-результаты тестов
    const testResults = testCases.map((testCase, index) => ({
      passed: index % 2 === 0,
      message: `Тест ${index + 1}: ${index % 2 === 0 ? '✅ пройден' : '❌ не пройден'}`,
      expected: testCase.expected || 'Нет ожидаемого значения',
      actual: index % 2 === 0 ? 'OK' : 'FAIL'
    }));
    
    return {
      success: true,
      output,
      error: '',
      testResults,
      allTestsPassed: testResults.every(t => t.passed)
    };
  }

  async formatCode(code) {
    // Простое форматирование
    return code
      .split('\n')
      .map(line => line.trimEnd())
      .filter(line => line.length > 0)
      .join('\n');
  }
}

export const pyodideRunner = new PyodideRunner();
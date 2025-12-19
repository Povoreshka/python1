// data/lessonsData.js
export const lessonsData = [
  {
    id: 1,
    title: "Основы Python: Переменные и типы данных",
    description: "Изучите базовые типы данных и работу с переменными в Python",
    category: "beginner",
    difficulty: "easy",
    duration: "15 мин",
    xpReward: 100,
    topics: ["variables", "data-types", "syntax"],
    theory: {
      title: "Переменные и типы данных в Python",
      content: `В Python переменные используются для хранения данных. В отличие от некоторых других языков, в Python не нужно явно объявлять тип переменной - он определяется автоматически.

Основные типы данных в Python:
1. Целые числа (int) - например: 5, -3, 42
2. Числа с плавающей точкой (float) - например: 3.14, 2.0, -0.5
3. Строки (str) - текст, заключенный в кавычки
4. Логические значения (bool) - True или False
5. Списки (list) - упорядоченные изменяемые коллекции
6. Кортежи (tuple) - упорядоченные неизменяемые коллекции
7. Словари (dict) - коллекции пар ключ-значение
8. Множества (set) - неупорядоченные коллекции уникальных элементов`,
      keyPoints: [
        "Python - язык с динамической типизацией",
        "Переменные создаются при первом присваивании",
        "Названия переменных чувствительны к регистру",
        "Рекомендуется использовать snake_case для имен переменных"
      ],
      examples: [
        {
          title: "Создание переменных",
          code: `# Числа
age = 25
pi = 3.14159

# Строки
name = "Анна"
message = 'Привет, мир!'

# Логические значения
is_student = True
has_passed = False

# Списки
numbers = [1, 2, 3, 4, 5]
names = ["Анна", "Борис", "Виктория"]

# Словари
person = {"name": "Иван", "age": 30, "city": "Москва"}`,
          description: "Примеры создания переменных различных типов"
        },
        {
          title: "Операции с переменными",
          code: `# Математические операции
x = 10
y = 3
sum_result = x + y       # 13
difference = x - y       # 7
product = x * y          # 30
quotient = x / y         # 3.333...
integer_division = x // y # 3
remainder = x % y        # 1
power = x ** y           # 1000

# Работа со строками
greeting = "Привет"
name = "Мир"
full_greeting = greeting + ", " + name + "!"  # "Привет, Мир!"
repeated = greeting * 3                       # "ПриветПриветПривет"

# Преобразование типов
number_str = "123"
number_int = int(number_str)     # 123
number_float = float("3.14")     # 3.14
str_from_int = str(456)          # "456"`,
          description: "Основные операции с различными типами данных"
        }
      ],
      exercises: [
        {
          id: 1,
          description: "Создайте переменную с именем 'score' и присвойте ей значение 100",
          hint: "Используйте оператор присваивания =",
          testCases: [
            {
              code: "",
              assertion: "score == 100",
              expected: "score должен равняться 100"
            }
          ]
        },
        {
          id: 2,
          description: "Создайте строковую переменную 'welcome' со значением 'Добро пожаловать!'",
          hint: "Не забудьте кавычки вокруг текста",
          testCases: [
            {
              code: "",
              assertion: "welcome == 'Добро пожаловать!'",
              expected: "welcome должен содержать 'Добро пожаловать!'"
            }
          ]
        }
      ]
    },
    practiceExercises: [
      {
        id: 1,
        title: "Калькулятор возраста",
        description: "Напишите программу, которая вычисляет возраст человека через 5 лет",
        initialCode: `# Ваш код здесь
current_age = 20
# Вычислите возраст через 5 лет
future_age = 0
print(f"Через 5 лет вам будет {future_age} лет")`,
        testCases: [
          {
            code: "",
            assertion: "future_age == 25",
            expected: "future_age должен равняться 25"
          }
        ]
      },
      {
        id: 2,
        title: "Конвертер температур",
        description: "Напишите программу для конвертации градусов Цельсия в Фаренгейты",
        initialCode: `# Формула: F = C * 9/5 + 32
celsius = 20
# Конвертируйте в Фаренгейты
fahrenheit = 0
print(f"{celsius}°C = {fahrenheit}°F")`,
        testCases: [
          {
            code: "",
            assertion: "abs(fahrenheit - 68) < 0.01",
            expected: "20°C должно равняться 68°F"
          }
        ]
      }
    ]
  },
  // ... больше уроков
];




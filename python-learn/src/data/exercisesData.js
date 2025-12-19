// data/exercisesData.js
export const exercisesData = [
  {
    id: 101,
    title: "Основы Python - 50 задач",
    category: "beginner",
    difficulty: "easy",
    tasks: [
      {
        id: 1,
        title: "Привет, мир!",
        description: "Напишите программу, которая выводит 'Привет, мир!'",
        initialCode: `# Напишите ваш код ниже`,
        testCases: [
          {
            code: "",
            assertion: "output.strip() == 'Привет, мир!'",
            expected: "Программа должна вывести 'Привет, мир!'"
          }
        ]
      },
      {
        id: 2,
        title: "Сумма двух чисел",
        description: "Напишите программу, которая складывает два числа",
        initialCode: `a = 5
b = 3
# Вычислите сумму
sum_result = 0
print(f"Сумма {a} и {b} равна {sum_result}")`,
        testCases: [
          {
            code: "",
            assertion: "sum_result == 8",
            expected: "Сумма 5 и 3 должна быть 8"
          }
        ]
      },
      // ... больше задач
    ]
  },
  {
    id: 102,
    title: "Условные операторы - 30 задач",
    category: "beginner",
    difficulty: "medium",
    tasks: [
      // Задачи на if-else
    ]
  }
];
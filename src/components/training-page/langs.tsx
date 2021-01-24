import React, { useState } from 'react';

type Tlanguages = {
  [variable: string]: string 
};

const EN: Tlanguages = {
  'trainingHeader': 'Training',
  'showAnswer': 'Show the answer',
  'intervalProgress': 'Interval learning progress',
  'beforeInput': 'Type the English word',
  'activeButton': 'Active',
  'difficultButton': 'Difficult',
  'deleteButton': 'Delete',
  'againButton': 'Again',
  'hardButton': 'Hard',
  'goodButton': 'Good',
  'easyButton': 'Easy',
  'furtherButton': 'Go on!'
};

const RU: Tlanguages = {
  'trainingHeader': 'Тренировка',
  'showAnswer': 'Показать ответ',
  'intervalProgress': 'Прогресс интервального повторения',
  'beforeInput': 'Введите английское слово',
  'activeButton': 'Изучаемое',
  'difficultButton': 'Сложное',
  'deleteButton': 'Удалить',
  'againButton': 'Снова',
  'hardButton': 'Сложно',
  'goodButton': 'Хорошо',
  'easyButton': 'Легко',
  'furtherButton': 'Далее'
};

export { EN, RU }

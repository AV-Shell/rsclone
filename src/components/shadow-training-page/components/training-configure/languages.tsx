interface ITrainingSettings {
  title: string,
  trainingCount: string,
  wordsHard: string,
  wordsLeft: string,
  newWords: string,
  repeatWords: string,
  trainingNew: string,
  trainingWithout: string,
  trainingNewOnly: string,
  trainingDifficult: string,
}

const RU: ITrainingSettings = {
  title: 'Настройка тренировки',
  trainingCount: 'Тренировок за сегодня:',
  wordsHard: 'Сложных слов:',
  wordsLeft: 'Осталось слов на сегодня:',
  newWords: 'Количество новых слов (3-15):',
  repeatWords: 'Количество слов для повторения (10-45):',
  trainingNew: 'Новая тренировка',
  trainingWithout: 'Без новых слов',
  trainingNewOnly: 'Только новые слова',
  trainingDifficult: 'Только сложные слова',
};

const EN: ITrainingSettings = {
  title: 'Training Settings',
  trainingCount: 'Trainings for today:',
  wordsHard: 'Difficult words:',
  wordsLeft: 'Not trained words left:',
  newWords: 'Number of new words (3-15):',
  repeatWords: 'Number of words to repeat (10-45):',
  trainingNew: 'New Training',
  trainingWithout: 'Without New Words',
  trainingNewOnly: 'New Words Only',
  trainingDifficult: 'Difficult Words Only',
};

export { RU, EN };

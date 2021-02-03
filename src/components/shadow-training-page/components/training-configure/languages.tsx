import {
  MIN_NEW_WORDS_PER_DAY,
  MAX_NEW_WORDS_PER_DAY,
  MIN_REPEAT_WORDS_PER_DAY,
  MAX_REPEAT_WORDS_PER_DAY,
} from '../../../../constants/constants';

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
  newWords: `Количество новых слов (${MIN_NEW_WORDS_PER_DAY}-${MAX_NEW_WORDS_PER_DAY}):`,
  repeatWords: `Количество слов для повторения (${MIN_REPEAT_WORDS_PER_DAY}-${MAX_REPEAT_WORDS_PER_DAY}):`,
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
  newWords: `Number of new words (${MIN_NEW_WORDS_PER_DAY}-${MAX_NEW_WORDS_PER_DAY}):`,
  repeatWords: `Number of words to repeat (${MIN_REPEAT_WORDS_PER_DAY}-${MAX_REPEAT_WORDS_PER_DAY}):`,
  trainingNew: 'New Training',
  trainingWithout: 'Without New Words',
  trainingNewOnly: 'New Words Only',
  trainingDifficult: 'Difficult Words Only',
};

export { RU, EN };

interface ILanguagesForSettings {
  title: string,
  avatarTitle: string,
  avatarText: string,
  cardTitle: string,
  cardText: string,
  cardWarning: string,
  showTranslation: string,
  showExample: string,
  showMeaning: string,
  playWord: string,
  showTranscription: string,
  showImage: string,
  playAllAfter: string,
  showWordTranslationAfter: string,
  exampleTranslation: string,
  meaningTranslation: string,
  exampleTranslationAfter: string,
  meaningTranslationAfter: string,
  buttonShowAnswer: string,
  statusButtons: string,
  intervalButtons: string,
  buttonText: string,
}

const EN: ILanguagesForSettings = {
  title: 'Settings',
  avatarTitle: 'Avatar',
  avatarText: 'Choose your avatar',
  cardTitle: 'Card',
  cardText: 'Choose at least 1 out of 4',
  cardWarning: 'Choose at least 1 item!',
  showTranslation: 'show word translation',
  showExample: 'show example',
  showMeaning: 'show explanation',
  playWord: 'play the word',
  showTranscription: 'show transcription',
  showImage: 'show image',
  playAllAfter: 'play all sounds after the answer',
  showWordTranslationAfter: 'show word translation after the answer',
  exampleTranslation: 'show example translation',
  meaningTranslation: 'show explanation translation',
  exampleTranslationAfter: 'show example translation after the answer',
  meaningTranslationAfter: 'show explanation translation after the answer',
  buttonShowAnswer: 'show \'Show answer\' button',
  statusButtons: 'show word status buttons',
  intervalButtons: 'show interval learning buttons',
  buttonText: 'Accept',
};

const RU: ILanguagesForSettings = {
  title: 'Настройки',
  avatarTitle: 'Аватарка',
  avatarText: 'Выберите аватарку',
  cardTitle: 'Карточка',
  cardText: 'Выберите минимум 1 из 4',
  cardWarning: 'Выберите по крайней мере 1 пункт!',
  showTranslation: 'показывать перевод слова',
  showExample: 'показывать пример',
  showMeaning: 'показывать объяснение',
  playWord: 'прослушать слово',
  showTranscription: 'показывать транскрипцию',
  showImage: 'показывать изображение',
  playAllAfter: 'проиграть все звуки после ответа',
  showWordTranslationAfter: 'показывать перевод слова после ответа',
  exampleTranslation: 'показывать перевод примера',
  meaningTranslation: 'показывать перевод объяснения',
  exampleTranslationAfter: 'показывать перевод примера после ответа',
  meaningTranslationAfter: 'показывать перевод объяснения после ответа',
  buttonShowAnswer: 'показывать кнопку \'Показать ответ\'',
  statusButtons: 'показывать кнопки статуса слова',
  intervalButtons: 'показывать кнопки интервального повторения',
  buttonText: 'Принять',
};

export { EN, RU };

type Tlanguages = {
  [variable: string]: string
}

const EN: Tlanguages = {
  choseSetting: 'Choose your profile settings',
  attention: 'After accepting the settings you won\'t be able to change your English level.',
  choseWords: 'Enter your English level(0-5): ',
  choseAvatar: 'Chose your avatar: ',
  submit: 'Submit',
};

const RU: Tlanguages = {
  choseSetting: 'Выберите настройки профиля',
  attention: 'После принятия настроек вы не сиожете изменить свой уровень языка',
  choseWords: 'Введите ваш уровень знания слов(0-5):',
  choseAvatar: 'Выберите Аватарку: ',
  submit: 'Принять',
};

export { EN, RU };

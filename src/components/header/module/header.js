import create from './create';
import cardsData from '../assets/cards';

const header = create('div', 'header');
const switchLabel = create('label', 'switch');
const switchInput = create('input', 'switch-input');
const switchSpan = create('span', 'switch-label');
const switchHandle = create('span', 'switch-handle');
const burgerMenu = create('div', 'burger-menu');
const burgerButton = create('div', 'burger-menu__button');
const burgerUl = create('ul', 'list burger-menu__nav');
const spanLine = create('span', 'burger-menu__lines');
const spanLine1 = create('span', 'burger-menu__lines');
const spanLine2 = create('span', 'burger-menu__lines');
const burgerOverlay = create('div', 'burger-menu__overlay');
const body = document.querySelector('body');
const title = create('h1');

title.innerHTML = 'English for kids';
switchSpan.setAttribute('data-on', 'Train');
switchSpan.setAttribute('data-off', 'Play');
switchInput.setAttribute('type', 'checkbox');

switchLabel.append(switchInput, switchSpan, switchHandle);
burgerButton.append(spanLine, spanLine1, spanLine2);
burgerMenu.append(burgerButton, burgerUl, burgerOverlay);
header.append(burgerMenu, title, switchLabel);

switchInput.addEventListener('change', () => {
  switchInput.toggleAttribute('chacked');
});

function toggleMenu() {
  burgerMenu.classList.toggle('burger-menu_active');
  if (burgerMenu.classList.contains('burger-menu_active')) {
    body.style = 'overflow: hidden';
  } else body.style = 'overflow: visibility';
}
for (let i = 0; i < cardsData[0].length; i++) {
  const burgerLink = create('a', 'list__item list__link');
  burgerLink.innerHTML = cardsData[0][i];
  burgerLink.setAttribute('id', `${i - 1}`);

  burgerLink.addEventListener('click', () => {
    toggleMenu();
  });
  burgerUl.append(burgerLink);
}
burgerButton.addEventListener('click', (e) => {
  e.preventDefault();
  toggleMenu();
});

burgerOverlay.addEventListener('click', () => {
  toggleMenu();
});

export default header;

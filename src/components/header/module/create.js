export default function (el, classNames) {
  let element = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error('Unable to create HTML Element!');
  }
  if (classNames) {
    element.classList.add(...classNames.split(' '));
  }

  return element;
}

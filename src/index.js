import readme from '../Readme.md';
import './style.css';

function prepareDOM() {
  function component() {
      let element = document.createElement('div');
      element.innerHTML = readme;
      return element;
  }
  return document.body.appendChild(component());
}

prepareDOM();

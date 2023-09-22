const grid = document.querySelector('.grid');
const repeat = document.querySelector('#repeat')

const fruits = [
    'uva',
    'banana',
    'manga',
    'maca',
    'melancia',
    'laranja',
    'morango',
    'abacaxi',

  ];

repeat.addEventListener('click', () => {
    loadGame()
})

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
  
    if (disabledCards.length === 16) {
      clearInterval(this.loop);
      alert(`Parabéns   `);
    }

}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkCards = () => {
    const firstFruit = firstCard.getAttribute('data-fruit');
    const secondFruit = secondCard.getAttribute('data-fruit');
  
    if (firstFruit === secondFruit) {
  
      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');
  
      firstCard = '';
      secondCard = '';
  
      checkEndGame();
  
    } else {
      setTimeout(() => {
  
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
  
        firstCard = '';
        secondCard = '';
  
      }, 500);
    }
  
  }

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
      return;
    }
  
    if (firstCard === '') {
  
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
  
    } else if (secondCard === '') {
  
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;
  
      checkCards();
  
    }
  }

const createCard = (fruit) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
  
    front.style.backgroundImage = `url('images/${fruit}.png')`;
  
    card.appendChild(front);
    card.appendChild(back);
    
  
    card.addEventListener('click', revealCard);
    card.setAttribute('data-fruit', fruit)
  
    return card;
}

const loadGame = () => {
    grid.innerHTML = ""

    const duplicateFruits = [...fruits, ...fruits];
  
    const shuffledArray = duplicateFruits.sort(() => Math.random() - 0.5);
  
    shuffledArray.forEach((fruit) => {
      const card = createCard(fruit);
      grid.appendChild(card);
    });
}

loadGame()
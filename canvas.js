// Obtém o elemento canvas e seu contexto 2D
const canvas = document.getElementById("memoryGameCanvas");
const ctx = canvas.getContext("2d");


const repeat = document.querySelector('#repeat')
// Definindo as dimensões das cartas e a disposição do tabuleiro
const cardWidth = 92.5;
const cardHeight = 92.5;
const cardSpacing = 10;
const numRows = 4;
const numCols = 4;

// Array com as imagens das cartas
const cards = [
    'uva',
    'banana',
    'manga',
    'maca',
    'melancia',
    'laranja',
    'morango',
    'abacaxi',
    'uva',
    'banana',
    'manga',
    'maca',
    'melancia',
    'laranja',
    'morango',
    'abacaxi',
];

// Array para rastrear o estado de cada carta (closed, open, ou disabled)
let cardState = new Array(16).fill('closed');
let firstCard = null;
let secondCard = null;
let jogadas = 0;

repeat.addEventListener('click', () => {
    cardState = Array(16).fill('closed');
    jogadas = 0;
    shuffleArray(cards);
    drawCards();
    document.getElementById("jogadas").textContent = `Jogadas: ${jogadas}`
})

// Função para embaralhar as cartas
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para desenhar as cartas no canvas
const drawCards = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cardIndex = row * numCols + col;
            const x = col * (cardWidth + cardSpacing);
            const y = row * (cardHeight + cardSpacing);

            if (cardState[cardIndex] === 'open' || cardState[cardIndex] === 'disabled') {
                // Desenha o conteúdo da carta (imagem)
                const cardImage = new Image();
                cardImage.src = `images/${cards[cardIndex]}.png`;
                cardImage.onload = () => {
                    ctx.drawImage(cardImage, x, y, cardWidth, cardHeight);
                };
            } else {
                // Desenha o verso da carta (cinza)
                ctx.fillStyle = "#888"; // Cor cinza para cartas desativadas
                ctx.fillRect(x, y, cardWidth, cardHeight);
            }
        }
    }
}

// Função para revelar uma carta quando clicada
const revealCard = (event) => {
    if (firstCard !== null && secondCard !== null) {
        return; // Duas cartas já estão viradas, espere antes de virar outra
    }

    const x = event.offsetX;
    const y = event.offsetY;
    const col = Math.floor(x / (cardWidth + cardSpacing));
    const row = Math.floor(y / (cardHeight + cardSpacing));
    const cardIndex = row * numCols + col;

    if (cardState[cardIndex] === 'closed') {
        cardState[cardIndex] = 'open';
        drawCards();

        if (firstCard === null) {
            firstCard = cardIndex;
        } else {
            secondCard = cardIndex;
            jogadas++;
            document.getElementById("jogadas").textContent = `Jogadas: ${jogadas}`;
            checkMatch();
        }
    }
}

// Função para verificar se duas cartas correspondem
const checkMatch = () => {
    if (cards[firstCard] === cards[secondCard]) {
        // Correspondência encontrada, desative as cartas
        cardState[firstCard] = 'disabled';
        cardState[secondCard] = 'disabled';
        firstCard = null;
        secondCard = null;

        // Verifique se todas as cartas estão desabilitadas para encerrar o jogo
        if (cardState.every(state => state === 'disabled')) {
            setTimeout(() => {
                alert(`Parabéns! Você ganhou com ${jogadas} jogadas.`);
            }, 500);
        }
    } else {
        // As cartas não correspondem, vire-as de volta após um breve atraso
        setTimeout(() => {
            cardState[firstCard] = 'closed';
            cardState[secondCard] = 'closed';
            firstCard = null;
            secondCard = null;
            drawCards();
        }, 1000);
    }

    drawCards(); // Redesenha as cartas para refletir o estado atual
}

// Adiciona o evento de clique no canvas para revelar as cartas
canvas.addEventListener('click', revealCard);

// Embaralha as cartas e inicia o jogo
shuffleArray(cards);
drawCards();

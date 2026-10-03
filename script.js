// ========================================
// CONFIGURATION & CUSTOMIZABLE MESSAGES
// ========================================
const messages = {
    heartReveal: "Okay... I think you've given this heart enough love.",
    cards: [
        {
            icon: "🌷",
            title: "love u and miss u hehe",
            text: "I appreciate how you always know exactly how to make me smile, even on the hardest days."
        },
        {
            icon: "😂",
            title: "soo azimm",
            text: "The way your eyes light up when you talk about things you love."
        },
        {
            icon: "🫶",
            title: "lalamove ",
            text: "I'm grateful for your patience, your kindness, and just having you by my side."
        }
    ],
    stars: [
        "Special day",
        "love u beri so much",
        "misss uuuuu",
        "kita tau maya hehe"
    ],
    letter: `Hi! I just want you to know that you are the best part of my life. 

I can't say it all, but everything about you is perfect to me even when you're so asim. 

This isn't an LSM, but I just want this message to show you how much I love you. 

hehehehehehhe love u mwuaps`,
    finalSurprise: "BEST ASIM OAT"
};

// ========================================
// GLOBAL VARIABLES & SETUP
// ========================================
let heartClicks = 0;
let cardsFlipped = 0;
const totalCards = messages.cards.length;

// Initialize Background Effects
createBackgroundParticles();

// ========================================
// SECTION 1: OPENING SCREEN
// ========================================
document.getElementById('open-btn').addEventListener('click', () => {
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    
    openingScreen.style.opacity = '0';
    openingScreen.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        openingScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0);
    }, 1000);
});

// ========================================
// SECTION 2: HEART INTERACTION
// ========================================
const mainHeart = document.getElementById('main-heart');
mainHeart.addEventListener('click', (e) => {
    heartClicks++;
    createMiniHeart(e.clientX, e.clientY);
    
    if (heartClicks === 5) {
        document.getElementById('heart-message').textContent = messages.heartReveal;
        document.getElementById('heart-hidden-content').classList.remove('hidden');
        document.getElementById('heart-hidden-content').classList.add('fade-in');
        document.getElementById('heart-instruction').style.opacity = '0';
    }
});

function createMiniHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = `${x - 10}px`;
    heart.style.top = `${y - 10}px`;
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatHeartMini 1s ease-out forwards';
    heart.style.zIndex = '1000';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// ========================================
// SECTION 3: INTERACTIVE CARDS
// ========================================
const cardsGrid = document.getElementById('cards-grid');
messages.cards.forEach((card) => {
    const cardHTML = `
        <div class="flip-card" onclick="flipCard(this)">
            <div class="flip-card-inner glass">
                <div class="flip-card-front">
                    <div class="icon">${card.icon}</div>
                    <h3>${card.title}</h3>
                </div>
                <div class="flip-card-back">
                    <p>${card.text}</p>
                </div>
            </div>
        </div>
    `;
    cardsGrid.insertAdjacentHTML('beforeend', cardHTML);
});

function flipCard(element) {
    if (!element.classList.contains('flipped')) {
        element.classList.add('flipped');
        cardsFlipped++;
        if (cardsFlipped === totalCards) {
            document.getElementById('cards-nav').classList.remove('hidden');
            document.getElementById('cards-nav').classList.add('fade-in');
        }
    } else {
        element.classList.remove('flipped');
        cardsFlipped--;
    }
}

// ========================================
// SECTION 4: INTERACTIVE BUTTERFLIES
// ========================================
const skyContainer = document.getElementById('interactive-sky');
const starModal = document.getElementById('star-modal');
const starModalText = document.getElementById('star-modal-text');
let starsDiscovered = 0;

messages.stars.forEach((msg) => {
    const star = document.createElement('div');
    star.className = 'interactive-star';
    star.textContent = '🦋'; // Changed to butterfly
    const top = Math.floor(Math.random() * 80) + 10;
    const left = Math.floor(Math.random() * 80) + 10;
    star.style.top = `${top}%`;
    star.style.left = `${left}%`;
    star.style.animation = `twinkle 3s infinite ${Math.random() * 2}s`;
    
    star.addEventListener('click', () => {
        starModalText.textContent = msg;
        starModal.classList.remove('hidden');
        starModal.classList.add('pop-in');
        
        if (!star.dataset.clicked) {
            star.dataset.clicked = 'true';
            star.style.filter = 'drop-shadow(0 0 15px #ffb6c1)'; // Soft pink glow
            starsDiscovered++;
            
            if (starsDiscovered === messages.stars.length) {
                document.getElementById('stars-nav').classList.remove('hidden');
                document.getElementById('stars-nav').classList.add('fade-in');
            }
        }
    });
    skyContainer.appendChild(star);
});

window.closeStarModal = function() {
    starModal.classList.add('hidden');
    starModal.classList.remove('pop-in');
}

// ========================================
// SECTION 5: MINI MEMORY GAME
// ========================================
const gameBoard = document.getElementById('game-board');
const gameSymbols = ['🍎', '🦋', '🌸', '🍄', '🌙', '☁️', '☕', '🎵', '🌻', '🧸'];
let boardItems = gameSymbols.sort(() => 0.5 - Math.random()).slice(0, 9);
const heartIndex = Math.floor(Math.random() * 10);
boardItems.splice(heartIndex, 0, '❤️');

boardItems.forEach((symbol) => {
    const span = document.createElement('span');
    span.className = 'game-item glass';
    span.style.padding = '15px';
    span.textContent = symbol;
    
    span.addEventListener('click', function() {
        if (symbol === '❤️') {
            document.getElementById('game-success').classList.remove('hidden');
            this.style.transform = 'scale(1.5)';
            for(let i=0; i<10; i++){
                setTimeout(() => createMiniHeart(
                    this.getBoundingClientRect().left + Math.random()*50, 
                    this.getBoundingClientRect().top + Math.random()*50
                ), i*100);
            }
        } else {
            this.classList.add('shake');
            setTimeout(() => this.classList.remove('shake'), 400);
        }
    });
    gameBoard.appendChild(span);
});

// ========================================
// SECTION 6: FINAL LETTER
// ========================================
const openLetterBtn = document.getElementById('open-letter-btn');
const letterContainer = document.getElementById('letter-container');

document.getElementById('letter-text').textContent = messages.letter;

openLetterBtn.addEventListener('click', () => {
    openLetterBtn.classList.add('hidden');
    letterContainer.classList.remove('hidden');
    letterContainer.classList.add('fade-in');
});

// ========================================
// SECTION 7: FINAL SURPRISE
// ========================================
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseOverlay = document.getElementById('final-surprise-overlay');
const surpriseText = document.getElementById('surprise-text');

surpriseBtn.addEventListener('click', () => {
    surpriseText.textContent = messages.finalSurprise;
    surpriseOverlay.classList.remove('hidden');
    
    let count = 0;
    const burst = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createMiniHeart(x, y);
        count++;
        if(count > 30) clearInterval(burst);
    }, 100);
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
window.scrollToSection = function(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function createBackgroundParticles() {
    const bgContainer = document.getElementById('background-container');
    
    // Generate Stars (Fixed to % for mobile)
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'bg-star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 2 + 's';
        bgContainer.appendChild(star);
    }
    
    // Generate floating hearts (Fixed to % for mobile)
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.textContent = '🤍';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 15 + 10) + 's';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
        bgContainer.appendChild(heart);
    }
}

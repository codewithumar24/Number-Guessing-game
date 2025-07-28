document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const guessInput = document.getElementById('guessInput');
    const submitBtn = document.getElementById('submitGuess');
    const messageEl = document.getElementById('message');
    const attemptsEl = document.getElementById('attempts');
    const newGameBtn = document.getElementById('newGame');
    
    // Game variables
    let targetNumber;
    let attempts;
    let gameOver;
    
    // Initialize game
    initGame();
    
    // Event listeners
    submitBtn.addEventListener('click', checkGuess);
    newGameBtn.addEventListener('click', initGame);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });
    
    // Initialize a new game
    function initGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        gameOver = false;
        
        // Reset UI
        guessInput.value = '';
        messageEl.textContent = '';
        messageEl.className = 'message';
        attemptsEl.textContent = 'Attempts: 0';
        newGameBtn.classList.add('hidden');
        guessInput.disabled = false;
        submitBtn.disabled = false;
        
        // Focus input
        guessInput.focus();
        
        console.log('Target number:', targetNumber); // For debugging
    }
    
    // Check the user's guess
    function checkGuess() {
        if (gameOver) return;
        
        const userGuess = parseInt(guessInput.value);
        
        // Validate input
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            showMessage('Please enter a valid number between 1 and 100', 'error');
            animateShake();
            return;
        }
        
        // Increment attempts
        attempts++;
        attemptsEl.textContent = `Attempts: ${attempts}`;
        
        // Check guess
        if (userGuess === targetNumber) {
            // Correct guess
            gameOver = true;
            const message = `🎉 Correct! You guessed it in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!`;
            showMessage(message, 'success');
            newGameBtn.classList.remove('hidden');
            guessInput.disabled = true;
            submitBtn.disabled = true;
            animateConfetti();
        } else {
            // Wrong guess - give hint
            const hint = userGuess < targetNumber ? 'Too low!' : 'Too high!';
            showMessage(`${hint} Try again!`, 'hint');
            animateShake();
        }
        
        // Clear input
        guessInput.value = '';
        guessInput.focus();
    }
    
    // Show message with animation
    function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.className = 'message'; // Reset classes
        
        // Add type-specific class
        if (type === 'error') {
            messageEl.classList.add('error');
        } else if (type === 'success') {
            messageEl.classList.add('success');
        } else if (type === 'hint') {
            messageEl.classList.add('hint');
        }
        
        // Add animation
        messageEl.classList.add('animate-fade');
    }
    
    // Shake animation for wrong guesses
    function animateShake() {
        const gameCard = document.querySelector('.game-card');
        gameCard.classList.add('animate-shake');
        
        // Remove class after animation completes
        setTimeout(() => {
            gameCard.classList.remove('animate-shake');
        }, 500);
    }
    
    // Simple confetti effect for winning
    function animateConfetti() {
        const colors = ['#4a6bff', '#ff6b6b', '#6bff6b', '#ffcc4a'];
        const gameContainer = document.querySelector('.game-container');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.opacity = Math.random() * 0.5 + 0.5;
            gameContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
});

// Add confetti styles dynamically
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        pointer-events: none;
        animation: confetti-fall linear forwards;
        z-index: 1000;
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    .error {
        background-color: #ffebee;
        color: #f44336;
        border-left: 4px solid #f44336;
    }
    
    .success {
        background-color: #e8f5e9;
        color: #4caf50;
        border-left: 4px solid #4caf50;
    }
    
    .hint {
        background-color: #e3f2fd;
        color: #2196f3;
        border-left: 4px solid #2196f3;
    }
`;
document.head.appendChild(style);
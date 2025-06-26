// Admin Login Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error-animation');
    const successContainer = document.getElementById('success-animation');
    
    // Correct credentials
    const CORRECT_USERNAME = 'aria';
    const CORRECT_PASSWORD = 'apexs';
    
    // Sound effects (using Web Audio API for atmospheric sounds)
    let audioContext;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    function playErrorSound() {
        initAudio();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.type = 'sawtooth';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
    
    function playSuccessSound() {
        initAudio();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.type = 'sine';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    // Screen shake effect
    function shakeScreen() {
        document.body.style.animation = 'screen-shake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }
    
    // Add screen shake keyframes to CSS dynamically
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes screen-shake {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-10px); }
            20% { transform: translateX(10px); }
            30% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            50% { transform: translateX(-6px); }
            60% { transform: translateX(6px); }
            70% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
            90% { transform: translateX(-2px); }
        }
        
        .input-error {
            border-color: #ff0040 !important;
            box-shadow: 0 0 20px rgba(255, 0, 64, 0.8) !important;
            animation: input-error-shake 0.5s ease-in-out !important;
        }
        
        @keyframes input-error-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);
    
    // Show error animation
    function showErrorAnimation() {
        playErrorSound();
        shakeScreen();
        
        // Add error class to inputs
        usernameInput.classList.add('input-error');
        passwordInput.classList.add('input-error');
        
        // Remove error class after animation
        setTimeout(() => {
            usernameInput.classList.remove('input-error');
            passwordInput.classList.remove('input-error');
        }, 500);
        
        // Show error overlay
        errorContainer.style.display = 'flex';
        
        // Hide error animation after 3 seconds
        setTimeout(() => {
            errorContainer.style.animation = 'error-exit 0.5s ease-out forwards';
            setTimeout(() => {
                errorContainer.style.display = 'none';
                errorContainer.style.animation = '';
            }, 500);
        }, 3000);
    }
    
    // Show success animation
    function showSuccessAnimation() {
        playSuccessSound();
        
        // Show success overlay
        successContainer.style.display = 'flex';
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 3000);
    }
    
    // Add exit animation keyframes
    const exitStyle = document.createElement('style');
    exitStyle.textContent = `
        @keyframes error-exit {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
    `;
    document.head.appendChild(exitStyle);
    
    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validate credentials
        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            showSuccessAnimation();
        } else {
            showErrorAnimation();
            // Clear the form
            usernameInput.value = '';
            passwordInput.value = '';
        }
    });
    
    // Add typing effects to inputs
    function addTypingEffect(input) {
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.textShadow = '0 0 10px #ff4080';
            } else {
                this.style.textShadow = '';
            }
        });
    }
    
    addTypingEffect(usernameInput);
    addTypingEffect(passwordInput);
    
    // Add focus effects
    usernameInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    usernameInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
    
    passwordInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    passwordInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
    
    // Add mysterious cursor following effect
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'custom-cursor';
            newCursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(255, 0, 64, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(newCursor);
        }
        
        const cursorElement = document.querySelector('.custom-cursor');
        cursorElement.style.left = e.clientX - 10 + 'px';
        cursorElement.style.top = e.clientY - 10 + 'px';
    });
    
    // Add atmospheric background sounds (optional)
    function createAtmosphericSound() {
        initAudio();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
        
        // Schedule next atmospheric sound
        setTimeout(createAtmosphericSound, Math.random() * 10000 + 5000);
    }
    
    // Start atmospheric sounds after user interaction
    document.addEventListener('click', function() {
        setTimeout(createAtmosphericSound, 1000);
    }, { once: true });
    
    // Add glitch effect to title occasionally
    function glitchTitle() {
        const title = document.querySelector('.title-main');
        if (title) {
            title.style.animation = 'none';
            title.style.textShadow = '2px 0 #ff0040, -2px 0 #00ff80';
            title.style.transform = 'translateX(2px)';
            
            setTimeout(() => {
                title.style.textShadow = '0 0 20px #ff0040';
                title.style.transform = 'translateX(0)';
                title.style.animation = 'title-flicker 4s ease-in-out infinite';
            }, 100);
        }
        
        // Schedule next glitch
        setTimeout(glitchTitle, Math.random() * 15000 + 10000);
    }
    
    // Start glitch effect
    setTimeout(glitchTitle, 5000);
    
    // Add keyboard shortcuts for testing (remove in production)
    document.addEventListener('keydown', function(e) {
        // Ctrl + Shift + T for test credentials
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            usernameInput.value = CORRECT_USERNAME;
            passwordInput.value = CORRECT_PASSWORD;
        }
    });
    
    console.log('🌙 Shadow Realm Access Portal Initialized');
    console.log('👤 Test credentials: aria / apexs');
});


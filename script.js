const envelopeWrapper = document.getElementById('envelopeWrapper');
        const balloonContainer = document.getElementById('balloonContainer');
        const birthdaySound = document.getElementById('birthdaySound');

        const colors = ['#ff6f00', '#ff9800', '#ffa726', '#ffb74d', '#ff7043'];
        
        // List of 5 photos inside the 'photos' folder
        const photoUrls = [
            'photos/photo1.jpg',
            'photos/photo2.jpg',
            'photos/photo3.jpg',
            'photos/photo4.jpg',
            'photos/photo5.jpg'
        ];

        // 1. Spawns a Single Random Balloon
        function spawnSingleBalloon() {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.left = `${Math.random() * 92}%`;
            
            const duration = 7 + Math.random() * 5;
            balloon.style.animationDuration = `${duration}s`;

            balloonContainer.appendChild(balloon);

            // Remove from HTML once animation finishes
            setTimeout(() => balloon.remove(), duration * 1000);
        }

        // 2. Spawns a Single Random Floating Photo Group
        function spawnSinglePhoto() {
            const group = document.createElement('div');
            group.classList.add('photo-balloon-group');

            // Pick random colors and a random photo from the 5 available
            const color1 = colors[Math.floor(Math.random() * colors.length)];
            const color2 = colors[Math.floor(Math.random() * colors.length)];
            const randomPhoto = photoUrls[Math.floor(Math.random() * photoUrls.length)];

            group.innerHTML = `
                <div class="balloon-pair">
                    <div class="attached-balloon" style="background-color: ${color1}"></div>
                    <div class="attached-balloon" style="background-color: ${color2}"></div>
                </div>
                <div class="floating-photo">
                    <img src="${randomPhoto}" alt="Birthday photo memory">
                </div>
            `;

            // Random horizontal placement across screen width (5% to 85%)
            group.style.left = `${5 + Math.random() * 80}%`;

            // Random floating duration between 10s and 14s
            const duration = 10 + Math.random() * 4;
            group.style.animationDuration = `${duration}s`;

            balloonContainer.appendChild(group);

            // Remove node after it floats past the screen
            setTimeout(() => group.remove(), duration * 1000);
        }

        // Continuous Spawners for Dynamic Randomness
        setInterval(spawnSingleBalloon, 1200); // New balloon every 1.2s
        setInterval(spawnSinglePhoto, 4500);   // New random photo every 4.5s

        // Spawn initial background items immediately
        for (let i = 0; i < 5; i++) spawnSingleBalloon();
        spawnSinglePhoto();

        // Confetti Launcher
        function launchConfetti() {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff6f00', '#ff9800', '#ffa726', '#ffffff', '#ffd54f']
            });
        }

        // Open/Close Event Listener
        envelopeWrapper.addEventListener('click', () => {
            if (envelopeWrapper.classList.contains('open')) {
                envelopeWrapper.classList.remove('open');
                envelopeWrapper.classList.add('closing');
                
                birthdaySound.pause();
                birthdaySound.currentTime = 0;
            } else {
                envelopeWrapper.classList.remove('closing');
                envelopeWrapper.classList.add('open');
                
                setTimeout(() => {
                    birthdaySound.play().catch(error => {
                        console.log("Audio waiting for user interaction:", error);
                    });
                    launchConfetti();
                }, 600);
            }
        });

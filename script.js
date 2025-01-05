const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = new Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        // OTP Generation with typing effect
        const otpDisplay = document.getElementById('otp');
        const generateBtn = document.getElementById('generateBtn');
        const statusEl = document.getElementById('status');

        function generateOTP() {
            const digits = '0123456789';
            let otp = '';
            for (let i = 0; i < 4; i++) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            return otp;
}

        async function typeEffect(element, text, speed = 50) {
            element.textContent = '';
            for (let i = 0; i < text.length; i++) {
                element.textContent += text[i];
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }

        function updateStatus(message) {
            statusEl.textContent = message;
            setTimeout(() => statusEl.textContent = '', 2000);
        }

        generateBtn.addEventListener('click', async () => {
            generateBtn.disabled = true;
            updateStatus('GENERATING NEW OTP...');
            
            // Scramble effect
            for (let i = 0; i < 10; i++) {
                await typeEffect(otpDisplay, generateOTP(), 30);
            }
            
            // Final OTP
            const finalOTP = generateOTP();
            await typeEffect(otpDisplay, finalOTP, 100);
            
            updateStatus('OTP GENERATED SUCCESSFULLY');
            generateBtn.disabled = false;
        });

        // Start the matrix animation
        setInterval(drawMatrix, 50);

        // Initial OTP
        otpDisplay.textContent = '0000';
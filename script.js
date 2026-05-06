const zData = [
    { sign: "Capricorn", icon: "♑", quality: "Cardinal Earth", priorities: "Ambition, Structure, Achievement", qualities: "Disciplined, Responsible, Realistic, Hardworking", inferiorities: "Pessimistic, Unforgiving, Condescending, Stubborn" },
    { sign: "Aquarius", icon: "♒", quality: "Fixed Air", priorities: "Innovation, Progress, Community", qualities: "Progressive, Original, Independent, Humanitarian", inferiorities: "Uncompromising, Aloof, Extremist, Rebellious" },
    { sign: "Pisces", icon: "♓", quality: "Mutable Water", priorities: "Empathy, Imagination, Spirituality", qualities: "Compassionate, Artistic, Intuitive, Gentle", inferiorities: "Overly Trusting, Sad, Desire to Escape Reality, Victim Role" },
    { sign: "Aries", icon: "♈", quality: "Cardinal Fire", priorities: "Action, Independence, Courage", qualities: "Courageous, Determined, Confident, Enthusiastic", inferiorities: "Impatient, Moody, Short-tempered, Impulsive" },
    { sign: "Taurus", icon: "♉", quality: "Fixed Earth", priorities: "Stability, Security, Sensuality", qualities: "Reliable, Patient, Practical, Devoted", inferiorities: "Stubborn, Possessive, Uncompromising, Materialistic" },
    { sign: "Gemini", icon: "♊", quality: "Mutable Air", priorities: "Communication, Knowledge, Versatility", qualities: "Affectionate, Curious, Adaptable, Quick Learner", inferiorities: "Nervous, Inconsistent, Indecisive, Restless" },
    { sign: "Cancer", icon: "♋", quality: "Cardinal Water", priorities: "Emotion, Nurturing, Family", qualities: "Tenacious, Highly Imaginative, Loyal, Emotional", inferiorities: "Moody, Pessimistic, Suspicious, Manipulative" },
    { sign: "Leo", icon: "♌", quality: "Fixed Fire", priorities: "Creativity, Leadership, Expression", qualities: "Creative, Passionate, Generous, Warm-hearted", inferiorities: "Arrogant, Stubborn, Self-centered, Inflexible" },
    { sign: "Virgo", icon: "♍", quality: "Mutable Earth", priorities: "Analysis, Service, Perfection", qualities: "Loyal, Analytical, Kind, Hardworking", inferiorities: "Shyness, Worry, Overly Critical of Self and Others, All Work and No Play" },
    { sign: "Libra", icon: "♎", quality: "Cardinal Air", priorities: "Balance, Harmony, Relationships", qualities: "Cooperative, Diplomatic, Gracious, Fair-minded", inferiorities: "Indecisive, Avoids Confrontations, Will Carry a Grudge, Self-pity" },
    { sign: "Scorpio", icon: "♏", quality: "Fixed Water", priorities: "Transformation, Intensity, Truth", qualities: "Resourceful, Brave, Passionate, Stubborn", inferiorities: "Distrusting, Jealous, Secretive, Violent" },
    { sign: "Sagittarius", icon: "♐", quality: "Mutable Fire", priorities: "Exploration, Freedom, Philosophy", qualities: "Generous, Idealistic, Great Sense of Humor, Optimistic", inferiorities: "Promises More Than Can Deliver, Very Impatient, Will Say Anything" }
];

function getZodiacInfo(day, month) {
    if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) return zData[0];
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return zData[1];
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return zData[2];
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return zData[3];
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return zData[4];
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return zData[5];
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return zData[6];
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return zData[7];
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return zData[8];
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return zData[9];
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return zData[10];
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return zData[11];
    return null;
}

function isValidDate(d, m, y) {
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const resetBtn = document.getElementById('reset-btn');
    const inputSection = document.querySelector('.input-section');
    const resultsSection = document.getElementById('results');
    const errorMsg = document.getElementById('error-message');

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    analyzeBtn.addEventListener('click', () => {
        const birthdateInput = document.getElementById('birthdate').value;

        if (!birthdateInput) {
            errorMsg.classList.remove('hidden');
            return;
        }

        const birthDate = new Date(birthdateInput);
        const day = birthDate.getDate();
        const month = birthDate.getMonth() + 1;
        const year = birthDate.getFullYear();

        const now = new Date();
        
        if (birthDate > now) {
            errorMsg.textContent = "Birth date cannot be in the future.";
            errorMsg.classList.remove('hidden');
            return;
        }

        errorMsg.classList.add('hidden');

        // Age Calculation
        let ageYears = now.getFullYear() - birthDate.getFullYear();
        let ageMonths = now.getMonth() - birthDate.getMonth();
        let ageDays = now.getDate() - birthDate.getDate();

        if (ageDays < 0) {
            ageMonths--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            ageDays += prevMonth.getDate();
        }
        
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        const diffTime = Math.abs(now - birthDate);
        const totalMinutes = Math.floor(diffTime / (1000 * 60));

        // Zodiac Info
        const zodiac = getZodiacInfo(day, month);

        // Update UI
        inputSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');

        // Populate Zodiac
        if (zodiac) {
            document.getElementById('zodiac-icon').textContent = zodiac.icon;
            document.getElementById('res-sign').textContent = zodiac.sign;
            document.getElementById('res-quality').textContent = zodiac.quality;
            document.getElementById('res-qualities').textContent = zodiac.qualities;
            document.getElementById('res-inferiorities').textContent = zodiac.inferiorities;
            document.getElementById('res-priorities').textContent = zodiac.priorities;
        }

        // Animate numbers
        animateValue(document.getElementById('res-years'), 0, ageYears, 1000);
        animateValue(document.getElementById('res-months'), 0, ageMonths, 1200);
        animateValue(document.getElementById('res-days'), 0, ageDays, 1500);
        animateValue(document.getElementById('res-minutes'), 0, totalMinutes, 2000);
    });

    resetBtn.addEventListener('click', () => {
        resultsSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        
        document.getElementById('birthdate').value = '';
        
        // Reset numbers
        document.getElementById('res-years').textContent = '0';
        document.getElementById('res-months').textContent = '0';
        document.getElementById('res-days').textContent = '0';
        document.getElementById('res-minutes').textContent = '0';
    });
});

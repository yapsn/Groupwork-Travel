const generateBtn = document.getElementById('generate-btn');
const numberCircles = document.querySelectorAll('.number-circle');

generateBtn.addEventListener('click', () => {
    const generatedNumbers = new Set();
    while (generatedNumbers.size < 6) {
        generatedNumbers.add(Math.floor(Math.random() * 49) + 1);
    }

    numberCircles.forEach((circle, index) => {
        circle.textContent = Array.from(generatedNumbers)[index];
    });
});

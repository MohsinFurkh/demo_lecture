let currentSlide = 1;
const totalSlides = 15;

// Timer variables
let startTime = Date.now();
let timerInterval;

function showSlide(n) {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    document.getElementById(`slide-${n}`).classList.add('active');
    
    // Update counter
    document.getElementById('current-slide').textContent = n;
    document.getElementById('total-slides').textContent = totalSlides;
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = n === 1;
    document.getElementById('next-btn').disabled = n === totalSlides;
    
    // Initialize charts if needed
    if (n === 12) {
        setTimeout(initIdentityAndConstantCharts, 100);
    }
    if (n === 13) {
        setTimeout(initFloorCeilingChart, 100);
    }
    if (n === 14) {
        setTimeout(initModuloChart, 100);
    }
    if (n === 15) {
        setTimeout(initComplexityAndHashCharts, 100);
    }
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousSlide();
            break;
        case 'f':
        case 'F':
            e.preventDefault();
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
            break;
    }
});

// Initialize charts
function initIdentityAndConstantCharts() {
    // Identity Chart
    const idCtx = document.getElementById('identityChart').getContext('2d');
    const idX = Array.from({length: 11}, (_, i) => i - 5);
    
    new Chart(idCtx, {
        type: 'line',
        data: {
            labels: idX,
            datasets: [{
                label: 'f(x) = x',
                data: idX,
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                pointRadius: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'x' } },
                y: { title: { display: true, text: 'f(x)' } }
            },
            plugins: { legend: { display: false } }
        }
    });

    // Constant Chart
    const constCtx = document.getElementById('constantChart').getContext('2d');
    const constX = Array.from({length: 11}, (_, i) => i - 5);
    
    new Chart(constCtx, {
        type: 'line',
        data: {
            labels: constX,
            datasets: [{
                label: 'f(x) = 3',
                data: constX.map(() => 3),
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'x' } },
                y: { title: { display: true, text: 'f(x)' } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function initFloorCeilingChart() {
    const floorCtx = document.getElementById('floorCeilingChart').getContext('2d');
    const xValues = [];
    const floorValues = [];
    const ceilValues = [];
    
    for (let x = -3; x <= 3; x += 0.1) {
        xValues.push(x.toFixed(1));
        floorValues.push(Math.floor(x));
        ceilValues.push(Math.ceil(x));
    }
    
    new Chart(floorCtx, {
        type: 'line',
        data: {
            labels: xValues.filter((_, i) => i % 10 === 0),
            datasets: [
                {
                    label: 'Floor ⌊x⌋',
                    data: floorValues,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Ceiling ⌈x⌉',
                    data: ceilValues,
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'x' } },
                y: { title: { display: true, text: 'y' } }
            },
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function initModuloChart() {
    const modCtx = document.getElementById('moduloChart').getContext('2d');
    const modXValues = [];
    const modYValues = [];
    const mod = 5;
    
    for (let x = 0; x <= 15; x += 0.1) {
        modXValues.push(x.toFixed(1));
        modYValues.push(x % mod);
    }
    
    new Chart(modCtx, {
        type: 'line',
        data: {
            labels: modXValues.filter((_, i) => i % 20 === 0),
            datasets: [{
                label: `x mod ${mod}`,
                data: modYValues,
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'x' } },
                y: { 
                    title: { display: true, text: `x mod ${mod}` },
                    min: 0,
                    max: mod
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function initComplexityAndHashCharts() {
    // Complexity Chart
    const complexityCtx = document.getElementById('complexityChart').getContext('2d');
    const n = 50;
    const scale = 20;
    
    new Chart(complexityCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: n + 1}, (_, i) => i),
            datasets: [
                {
                    label: 'O(1) - Constant',
                    data: Array(n + 1).fill(5),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'O(log n) - Logarithmic',
                    data: Array.from({length: n + 1}, (_, i) => i > 0 ? Math.log2(i) * scale/2 : 0),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'O(n) - Linear',
                    data: Array.from({length: n + 1}, (_, i) => i * scale/20),
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'O(n²) - Quadratic',
                    data: Array.from({length: n + 1}, (_, i) => i**2 * scale/1000),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Input Size (n)' } },
                y: { 
                    title: { display: true, text: 'Relative Time Complexity' },
                    beginAtZero: true
                }
            },
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // Hash Chart
    const hashCtx = document.getElementById('hashChart').getContext('2d');
    const hashLabels = Array.from({length: 16}, (_, i) => i);
    const hashData = Array(16).fill(0);
    
    for (let i = 0; i < 100; i++) {
        const hash = Math.abs((i * 2654435761) % 16);
        hashData[hash]++;
    }
    
    new Chart(hashCtx, {
        type: 'bar',
        data: {
            labels: hashLabels,
            datasets: [{
                label: 'Hash Distribution',
                data: hashData,
                backgroundColor: 'rgba(249, 115, 22, 0.6)',
                borderColor: 'rgba(249, 115, 22, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Hash Bucket' } },
                y: { 
                    title: { display: true, text: 'Count' },
                    beginAtZero: true
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// Function composition interactive example
function initCompositionExample() {
    const compInput = document.getElementById('comp-input');
    const compOutput = document.getElementById('comp-output');
    const compFinal = document.getElementById('comp-final');
    
    if (compInput && compOutput && compFinal) {
        function updateComposition() {
            try {
                const x = parseFloat(compInput.value);
                // f(x) = 2x + 3
                const fx = 2 * x + 3;
                // g(f(x)) = (2x + 3)²
                const gfx = Math.pow(fx, 2);
                
                compOutput.textContent = fx;
                compFinal.textContent = gfx;
            } catch (e) {
                compOutput.textContent = '?';
                compFinal.textContent = '?';
            }
        }
        
        compInput.addEventListener('input', updateComposition);
        // Initial update
        updateComposition();
    }
}

// Timer functions
function startTimer() {
    startTime = Date.now();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

// Initialize first slide
showSlide(1);

// Initialize composition example when slide 6 is shown
document.addEventListener('DOMContentLoaded', function() {
    // Initialize composition example
    initCompositionExample();
    
    // Start the timer when the presentation loads
    startTimer();
}); 
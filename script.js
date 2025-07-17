let currentSlide = 1;
const totalSlides = 11; // Updated total slides
let timerInterval;
let seconds = 0;
let charts = {}; // Object to hold chart instances

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    startTimer();

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentSlide > 1) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentSlide < totalSlides) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (currentSlide > 1) {
                currentSlide--;
                showSlide(currentSlide);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentSlide < totalSlides) {
                currentSlide++;
                showSlide(currentSlide);
            }
        }
    });
});

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
    
    // Destroy existing charts before initializing new ones
    destroyCharts();
    
    // Initialize charts if needed
    if (n === 9) { // Merged slide with all key function charts
        setTimeout(() => {
            initKeyFunctionCharts();
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }
    if (n === 10) { // Applications slide (previously slide 12/14)
        setTimeout(() => {
            initComplexityAndHashCharts();
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        document.getElementById('timer-clock').textContent =
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function destroyCharts() {
    for (let id in charts) {
        if (charts[id]) {
            charts[id].destroy();
            delete charts[id];
        }
    }
}

// New function to initialize all charts on the merged slide
function initKeyFunctionCharts() {
    initIdentityAndConstantCharts();
    initFloorCeilingChart();
    initModuloChart();
}

function initIdentityAndConstantCharts() {
    const identityCtx = document.getElementById('identityChart')?.getContext('2d');
    if (identityCtx) {
        charts.identityChart = new Chart(identityCtx, {
            type: 'line',
            data: {
                labels: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
                datasets: [{
                    label: 'f(x) = x',
                    data: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
                    borderColor: '#3B82F6',
                    tension: 0.1
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    const constantCtx = document.getElementById('constantChart')?.getContext('2d');
    if (constantCtx) {
        charts.constantChart = new Chart(constantCtx, {
            type: 'line',
            data: {
                labels: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
                datasets: [{
                    label: 'f(x) = 3',
                    data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                    borderColor: '#10B981',
                    tension: 0.1
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function initFloorCeilingChart() {
    const floorCeilingCtx = document.getElementById('floorCeilingChart')?.getContext('2d');
    if (floorCeilingCtx) {
        charts.floorCeilingChart = new Chart(floorCeilingCtx, {
            type: 'line',
            data: {
                labels: [-3, -2.9, -2, -1.9, -1, -0.9, 0, 0.1, 1, 1.1, 2, 2.1, 3],
                datasets: [{
                    label: 'Floor(x)',
                    data: [-3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3],
                    borderColor: '#EF4444',
                    stepped: true
                }, {
                    label: 'Ceiling(x)',
                    data: [-3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3],
                    borderColor: '#8B5CF6',
                    stepped: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function initModuloChart() {
    const moduloCtx = document.getElementById('moduloChart')?.getContext('2d');
    if (moduloCtx) {
        charts.moduloChart = new Chart(moduloCtx, {
            type: 'line',
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [{
                    label: 'x mod 4',
                    data: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2],
                    borderColor: '#F97316',
                    tension: 0.1
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function initComplexityAndHashCharts() {
    const complexityCtx = document.getElementById('complexityChart').getContext('2d');
    const n = 50;
    const scale = 20;
    if (complexityCtx) {
        charts.complexityChart = new Chart(complexityCtx, {
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
    }
    // Hash Chart
    const hashCtx = document.getElementById('hashChart').getContext('2d');
    const hashLabels = Array.from({length: 16}, (_, i) => i);
    const hashData = Array(16).fill(0);
    
    for (let i = 0; i < 100; i++) {
        const hash = Math.abs((i * 2654435761) % 16);
        hashData[hash]++;
    }
    
    charts.hashChart = new Chart(hashCtx, {
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

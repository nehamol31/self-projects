// script.js

const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

// Set canvas size to cover the entire viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    loadDrawing(); // Reload drawing on resize to maintain consistency
});

let drawing = false;
let currentTool = 'pen';
let color = '#000000';
let eraserSize = 10; // Default eraser size

// Adjust canvas coordinates to account for page scrolling
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Tool selection
document.getElementById('pen').addEventListener('click', () => currentTool = 'pen');
document.getElementById('eraser').addEventListener('click', () => currentTool = 'eraser');
document.getElementById('colorPicker').addEventListener('input', (e) => color = e.target.value);
document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('eraserSize').addEventListener('input', (e) => {
    eraserSize = e.target.value;
    document.getElementById('eraserSizeValue').textContent = eraserSize;
});

function startDrawing(e) {
    drawing = true;
    const { x, y } = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
    saveDrawing();
}

function draw(e) {
    if (!drawing) return;

    const { x, y } = getMousePos(e);

    ctx.lineCap = 'round';

    if (currentTool === 'pen') {
        ctx.lineWidth = 5;
        ctx.strokeStyle = color;
    } else if (currentTool === 'eraser') {
        ctx.lineWidth = eraserSize;
        ctx.strokeStyle = '#ffffff'; // Assuming white background
    }

    ctx.lineTo(x, y);
    ctx.stroke();
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('whiteboard');
}

// Save drawing to local storage
function saveDrawing() {
    const dataURL = canvas.toDataURL();
    localStorage.setItem('whiteboard', dataURL);
}

// Load drawing from local storage
function loadDrawing() {
    const savedImage = localStorage.getItem('whiteboard');
    if (savedImage) {
        const img = new Image();
        img.src = savedImage;
        img.onload = () => ctx.drawImage(img, 0, 0);
    }
}

// Initial load
loadDrawing();

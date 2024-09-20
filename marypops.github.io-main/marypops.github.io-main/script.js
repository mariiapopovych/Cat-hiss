const frameElements = document.querySelectorAll('.frame');
const hissSound = document.getElementById('hissSound');

// Arrays of image sources for each frame div
const frameSets = [
    ['cat1.png', 'cat2.png', 'cat3.png', 'cat4.png', 'cat5.png'], // Images for first div
    ['cat1.png', 'cat2.png', 'cat3.png', 'cat4.png', 'cat5.png'], // Images for second div
    ['cat1.png', 'cat2.png', 'cat3.png', 'cat4.png', 'cat5.png']  // Images for third div
];

// Function to map mouse position to a continuous looping frame index
function updateFrame(mouseX, frameRect, frameIndex) {
    const frames = frameSets[frameIndex];
    const relativeX = mouseX - frameRect.left;  // Relative mouse position within the div
    const totalWidth = frameRect.width;
    const segments = frames.length;

    // Calculate the corresponding frame based on mouse position
    let positionRatio = relativeX / totalWidth;
    let frameIndexFloat = positionRatio * segments;

    // Use modulo to ensure looping effect
    let loopingFrameIndex = Math.floor(frameIndexFloat) % segments;

    // Ensure index is positive
    if (loopingFrameIndex < 0) {
        loopingFrameIndex += segments;
    }

    // Update the image source
    document.getElementById(`frameImage${frameIndex}`).src = frames[loopingFrameIndex];
}

// Attach event listeners to each frame div
frameElements.forEach((frameElement, index) => {
    frameElement.addEventListener('mousemove', (event) => {
        const frameRect = frameElement.getBoundingClientRect(); // Get the div's position and size
        updateFrame(event.clientX, frameRect, index);
    });

    // Play the hiss sound when the mouse enters the div
    frameElement.addEventListener('mouseenter', () => {
        hissSound.currentTime = 0; // Rewind to start in case it was already playing
        hissSound.play();
    });
});



// const slider = document.querySelector('.ba-slider-container');
// const afterWrapper = document.querySelector('.ba-image-after-wrapper');
// const handle = document.querySelector('.ba-slider-handle');

// let isDragging = false;

// // Handle mouse events
// handle.addEventListener('mousedown', startDrag);
// document.addEventListener('mousemove', drag);
// document.addEventListener('mouseup', endDrag);

// // Handle touch events
// handle.addEventListener('touchstart', startDrag);
// document.addEventListener('touchmove', drag);
// document.addEventListener('touchend', endDrag);

// function startDrag(e) {
//     isDragging = true;
//     handle.classList.add('dragging');
//     e.preventDefault();
// }

// function drag(e) {
//     if (!isDragging) return;
    
//     const rect = slider.getBoundingClientRect();
//     const clientX = e.clientX || e.touches[0].clientX;
//     let percentage = ((clientX - rect.left) / rect.width) * 100;
    
//     // Constrain between 0 and 100
//     percentage = Math.max(0, Math.min(100, percentage));
    
//     afterWrapper.style.width = `${percentage}%`;
//     handle.style.left = `${percentage}%`;
// }

// function endDrag() {
//     isDragging = false;
//     handle.classList.remove('dragging');
// }






const slider = document.querySelector('.ba-slider-container');
const afterWrapper = document.querySelector('.ba-image-after-wrapper');
const handle = document.querySelector('.ba-slider-handle');

let isDragging = false;

// Handle mouse events
handle.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

// Handle touch events
handle.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    handle.classList.add('dragging');
    e.preventDefault(); // Prevent scrolling on touch devices
}

function drag(e) {
    if (!isDragging) return;

    const rect = slider.getBoundingClientRect();
    let clientX;

    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
    } else if (e.clientX !== undefined) {
        clientX = e.clientX;
    } else {
        return; // Exit if no valid position found
    }

    let percentage = ((clientX - rect.left) / rect.width) * 100;

    // Constrain between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));

    afterWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
}

function endDrag() {
    isDragging = false;
    handle.classList.remove('dragging');
}

// LearnWorlds Image Mask Hover Effect
const masks = document.querySelectorAll(".lw-image-mask");
const SPEED = 0.015; // Slowed down for smooth effect

let rafId = null;
const states = new Map();

function getMaxPan(img, mask) {
  return Math.max(0, img.offsetHeight - mask.offsetHeight);
}

function animate() {
  let animating = false;

  states.forEach((state, img) => {
    state.current += (state.target - state.current) * SPEED;
    img.style.transform = `translateY(${-state.current}px)`;

    if (Math.abs(state.target - state.current) > 0.5) {
      animating = true;
    }
  });

  if (animating) {
    rafId = requestAnimationFrame(animate);
  } else {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

// Initialize
document.querySelectorAll(".lw-img").forEach(img => {
  states.set(img, { current: 0, target: 0 });
});

masks.forEach(mask => {
  const img = mask.querySelector("img");

  mask.addEventListener("mouseenter", () => {
    const maxPan = getMaxPan(img, mask);

    states.forEach((state, otherImg) => {
      state.target = otherImg === img ? maxPan : 0;
    });

    if (!rafId) animate();
  });

  mask.addEventListener("mouseleave", () => {
    states.get(img).target = 0;
    if (!rafId) animate();
  });
});

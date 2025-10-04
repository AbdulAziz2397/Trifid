// Select elements
const heroContainer = document.querySelector(".hero-containers");
const astronaut = document.querySelector(".astronaut");
const birds = document.querySelector(".birds");
const heroContent = document.querySelector(".hero-content");
const heroDiv = document.querySelector('#heroDiv');
const navbar = document.querySelector('#navbar');

// Run animation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    gsap.fromTo(
        [astronaut, birds, heroContent],
        { y: 1000 },
        { y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }
    );
    gsap.fromTo(
        heroContainer,
        { y: -1000 },
        { y: 0, duration: 1, ease: "power3.out", stagger: 0.01 }
    );
});


heroDiv.addEventListener('mousemove', (e) => {
    // Calculate offset based on mouse position (relative to center of screen)
    let x = (e.clientX / window.innerWidth - 0.5) * 20; // max ±10px
    let y = (e.clientY / window.innerHeight - 0.5) * 20;

    // Animate astronaut
    gsap.to(astronaut, {
        duration: 2,
        x: x,
        y: y,
        ease: "power3.out"
    });

    // Animate birds in opposite direction
    gsap.to(birds, {
        duration: 2,
        x: -x,
        y: -y,
        ease: "power3.out"
    });
});

// On scroll navbar color change
let isSticky = false; // flag

window.addEventListener('scroll', () => {
    console.log(window.scrollY)
    if (window.scrollY > 100 && !isSticky) {
        isSticky = true;
        navbar.className = "w-full h-25 flex fixed justify-center items-center max-[1025px]:h-[69px] bg-white font-[Poppins]  px-[42px] z-20 max-[1025px]:px-[0px]";

        gsap.fromTo(navbar,
            { y: -100 },
            { y: 0, duration: 0.8, ease: "power3.out" }
        );
    }
    if (window.scrollY <= 100 && isSticky && window.scrollY == 0) {
        isSticky = false;
        navbar.className = "w-full h-25 flex justify-center fixed items-center max-[1025px]:h-[69px] bg-transparent font-[Poppins]  px-[42px] z-20 max-[1025px]:px-[0px]";

        gsap.fromTo(navbar,
            { y: -100 },
            { y: 0, duration: 0.8, ease: "power3.out" }
        );
    }

});

gsap.registerPlugin(ScrollTrigger);

// state variables for clip-path
const state = {
    topDepth: 20,     // middle point of top V
    leftSpread: 20,   // left slope start
    rightSpread: 80,  // right slope start
    bottomDepth: 100  // bottom inverted V (starts flat)
};

// function to apply updated clip-path
function applyClip() {
    const clip = `polygon(
        0 0,
        ${state.leftSpread}% 0,
        50% ${state.topDepth}%,
        ${state.rightSpread}% 0,
        100% 0,
        100% 100%,
        80% 100%,
        50% ${state.bottomDepth}%,
        20% 100%,
        0 100%
      )`;

    const el = document.querySelector("#bigBox");
    el.style.clipPath = clip;
    el.style.webkitClipPath = clip;
}

applyClip();

// GSAP animation on scroll
gsap.to(state, {
    topDepth: 0,          // top V depth → flat
    leftSpread: 0,        // left slope 20% → 0%
    rightSpread: 100,     // right slope 80% → 100%
    bottomDepth: 80,      // bottom 100% → 80% (inverted V)
    ease: "none",
    onUpdate: applyClip,
    scrollTrigger: {
        trigger: "#bigBox",
        start: "top center",
        end: "+=250vh",
        scrub: true,
    }
});

(function smoothScroll({ ease = 0.12, multiplier = 1 } = {}) {
    let target = window.scrollY || 0;
    let current = window.scrollY || 0;
    let rafId = null;
    let running = false;

    function tick() {
        const diff = target - current;
        current += diff * ease;
        window.scrollTo(0, current);

        if (Math.abs(diff) > 0.5) {
            rafId = requestAnimationFrame(tick);
        } else {
            running = false;
        }
    }

    function onWheel(e) {
        if (e.ctrlKey) return; // ignore pinch zoom
        e.preventDefault();

        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 16; // line -> pixels
        if (e.deltaMode === 2) delta *= window.innerHeight; // page -> pixels

        const max = document.documentElement.scrollHeight - window.innerHeight;
        target = Math.max(0, Math.min(max, target + delta * multiplier));

        if (!running) {
            running = true;
            rafId = requestAnimationFrame(tick);
        }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
})();
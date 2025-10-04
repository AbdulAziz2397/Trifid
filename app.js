// Elements
const heroDiv = document.querySelector('#heroDiv');
const heroContainer = document.querySelector(".hero-containers");
const astronaut = document.querySelector(".astronaut");
const birds = document.querySelector(".birds");
const heroContent = document.querySelector(".hero-content");
const navbar = document.querySelector('#navbar');
const bigBox = document.querySelector("#bigBox");
const hamburger = document.querySelector('#hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
console.log(mobileMenu)
// --- MOBILE MENU TOGGLE ---
let menuOpen = false;
hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.className ="mobile-menu fixed top-[69px] left-0 w-full bg-white overflow-hidden transition-all duration-700 z-20 h-[204px]  flex justify-center items-start ";
        menuOpen = true;
    } else {
        mobileMenu.className = "mobile-menu fixed top-[69px] left-0 w-full bg-white overflow-hidden transition-all duration-700 z-20 h-0  flex justify-center items-start ";
        menuOpen = false;
    }
});

// --- INITIAL ANIMATIONS ---
document.addEventListener("DOMContentLoaded", () => {
    gsap.fromTo([astronaut, birds, heroContent],
        { y: 1000 },
        { y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }
    );
    gsap.fromTo(heroContainer,
        { y: -1000 },
        { y: 0, duration: 1, ease: "power3.out" }
    );
});

// --- PARALLAX MOUSE MOVE ---
heroDiv.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(astronaut, { duration: 2, x, y, ease: "power3.out" });
    gsap.to(birds, { duration: 2, x: -x, y: -y, ease: "power3.out" });
});

// --- NAVBAR STICKY ON SCROLL ---
let isSticky = false;
window.addEventListener('scroll', () => {
    const atTop = window.scrollY <= 50;

    if (window.scrollY > 100 && !isSticky) {
        isSticky = true;
        navbar.className = "w-full h-25 flex fixed justify-center items-center max-[1025px]:h-[69px] bg-white font-[Poppins] px-[42px] z-20 max-[1025px]:px-[0px]";
        gsap.fromTo(navbar, { y: -100 }, { y: 0, duration: 0.8, ease: "power3.out" });
    } else if (atTop && isSticky) {
        isSticky = false;
        navbar.className = "w-full h-25 flex fixed justify-center items-center max-[1025px]:h-[69px] bg-transparent font-[Poppins] px-[42px] z-20 max-[1025px]:px-[0px]";
        gsap.fromTo(navbar, { y: -100 }, { y: 0, duration: 0.8, ease: "power3.out" });
    }
});

// --- CLIP-PATH SCROLL ANIMATION ---
gsap.registerPlugin(ScrollTrigger);

const state = {
    topDepth: 20,   // Top V depth (initial V)
    leftSpread: 20, // Left spread
    rightSpread: 80,// Right spread
    bottomDepth: 100 // Bottom straight (initially flat)
};

function applyClip() {
    const clip = `polygon(
    0 0, ${state.leftSpread}% 0, 50% ${state.topDepth}% , ${state.rightSpread}% 0,
    100% 0, 100% 100%, 80% 100%, 50% ${state.bottomDepth}%, 20% 100%, 0 100%
  )`;
    bigBox.style.clipPath = bigBox.style.webkitClipPath = clip;
}
applyClip();

// --- Top V -> Straight ---
gsap.to(state, {
    topDepth: 0,           // V closes to straight line
    leftSpread: 0,
    rightSpread: 100,
    ease: "none",
    onUpdate: applyClip,
    scrollTrigger: { trigger: bigBox, start: "top center", end: "140vh", scrub: true }
});

// --- Bottom Straight -> V ---
gsap.to(state, {
    bottomDepth: 80,       // Straight turns into V shape
    ease: "none",
    onUpdate: applyClip,
    scrollTrigger: { trigger: bigBox, start: "top start", end: "180vh", scrub: true }
});


// --- SMOOTH SCROLL ---
(function smoothScroll({ ease = 0.12, multiplier = 1 } = {}) {
    let target = window.scrollY, current = target, running = false;

    function tick() {
        current += (target - current) * ease;
        window.scrollTo(0, current);
        if (Math.abs(target - current) > 0.5) requestAnimationFrame(tick);
        else running = false;
    }

    window.addEventListener("wheel", (e) => {
        if (e.ctrlKey) return; // ignore pinch zoom
        e.preventDefault();
        let delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        target = Math.max(0, Math.min(max, target + delta * multiplier));
        if (!running) { running = true; requestAnimationFrame(tick); }
    }, { passive: false });
})();

// --- Phone images ---
const phoneImg = document.querySelector('.iPhone');
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        // Change phone image
        phoneImg.src = `./assets/img/${index + 1}.png`;

        // Reduce opacity of all others
        serviceItems.forEach((el) => {
            if (el !== item) { el.style.opacity = "0.3"; el.style.transition = "opacity 0.5s ease-in-out"; }
        });

        // Keep hovered one full bright
        item.style.opacity = "1";
        // item.style.transition = "opacity 1s ease-in-out";
    });

    item.addEventListener('mouseleave', () => {
        // Reset all opacities
        serviceItems.forEach((el) => {
            el.style.opacity = "1";
        });
    });
});
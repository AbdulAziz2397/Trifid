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
const barLines = document.querySelectorAll('.bars-line');
const desktopSideBarHamburger = document.querySelector('.desktop-side-bar-hamburger');
const desktopSideBarCloser = document.querySelector('.desktop-side-bar-closer');
const overlayRemover = document.querySelector('.overlay-remover');

// Slider images overlay remover
let overlayRemoverClicked = false;
const overlay = document.querySelector('.black-transparent-overlay');
const heading = document.querySelector('.overlay-heading-text');
const button = document.querySelector('.overlay-button');

overlayRemover.addEventListener('click', () => {
    overlayRemoverClicked = !overlayRemoverClicked;

    if (overlayRemoverClicked) {
        // Fade out all overlay elements
        gsap.to(overlay, { opacity: 0, duration: 0.8, ease: "power2.out" });
        gsap.to([heading, button], { opacity: 0, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
        document.querySelector('.overlay-remover-icon').classList.replace('fa-arrow-up-right-from-square', 'fa-down-left-and-up-right-to-center');
    } else {
        // Fade back in
        gsap.to(overlay, { opacity: 0.6, duration: 0.8, ease: "power2.inOut" });
        gsap.to([heading, button], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.inOut" });
        document.querySelector('.overlay-remover-icon').classList.replace('fa-down-left-and-up-right-to-center', 'fa-arrow-up-right-from-square');
    }
});

// Desktop sidebar toggle
desktopSideBarHamburger.addEventListener('click', () => document.querySelector('.desktop-side-bar').classList.replace('-right-96', 'right-0'));
desktopSideBarCloser.addEventListener('click', () => document.querySelector('.desktop-side-bar').classList.replace('right-0', '-right-96'));

// --- MOBILE MENU TOGGLE ---
let menuOpen = false;
hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.replace("-translate-y-full", "translate-y-0");
        barLines.forEach(line => line.classList.replace("left-0", "left-5"));

    } else {
        mobileMenu.classList.replace("translate-y-0", "-translate-y-full");
        barLines.forEach(line => line.classList.replace('left-5', "left-0"));
    }
});

// --- INITIAL ANIMATIONS ---
document.addEventListener("DOMContentLoaded", () => {
    gsap.fromTo([astronaut, birds, heroContent],
        { y: 1000 },
        { y: 20, duration: 1.2, ease: "power3.out", stagger: 0.1 }
    );
    gsap.fromTo(heroContainer,
        { y: -2000 },
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
    navbarSticky(atTop);
});


let navbarSticky = (atTop) => {
    if (window.scrollY > 100 && !isSticky) {
        isSticky = true;
        navbar.classList.replace('bg-transparent', 'bg-white');
        gsap.fromTo(navbar, { y: -100 }, { y: 0, duration: 0.8, ease: "power3.out" });
    } else if (atTop && isSticky) {
        isSticky = false;
        navbar.classList.replace('bg-white', 'bg-transparent');
        gsap.fromTo(navbar, { y: -100 }, { y: 0, duration: 0.8, ease: "power3.out" });
    }
};

// --- CLIP-PATH SCROLL ANIMATION ---
gsap.registerPlugin(ScrollTrigger);

const state = {
    topDepth: 10,   // Top V depth (initial V)
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
    bottomDepth: 90,       // Straight turns into V shape
    ease: "none",
    onUpdate: applyClip,
    scrollTrigger: { trigger: bigBox, start: "top start", end: "180vh", scrub: true }
});

window.addEventListener('scroll', () => {
    console.log(bigBox.scrollTop);
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
const phoneImg = document.querySelector('#iPhoneImg');
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

// --- Tailwind custom breakpoint ---
tailwind.config = {
    theme: {
        extend: {
            screens: {
                'xs': '320px', // custom min-width breakpoint for 320px
            },
        },
    },
};

// --- Infinite Image Slider ---
// Using GSAP for smooth animation
const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll("img");
const totalWidth = slider.scrollWidth; // total width of the image set

// Clone all slides once for infinite loop effect
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
});

// Create infinite loop animation
gsap.to(slider, {
    x: `-${totalWidth}px`,
    duration: 40,
    ease: "none",
    repeat: -1,
    modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // wrap movement
    }
});

// Optional: Pause on hover
slider.addEventListener("mouseenter", () => gsap.globalTimeline.pause());
slider.addEventListener("mouseleave", () => gsap.globalTimeline.play());
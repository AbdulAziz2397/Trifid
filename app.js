// Select elements
const heroContainer = document.querySelector(".hero-containers");
const astronaut = document.querySelector(".astronaut");
const birds = document.querySelector(".birds");
const heroContent = document.querySelector(".hero-content");
const heroDiv = document.querySelector('#heroDiv');
const navbar = document.querySelector('#navbar')

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


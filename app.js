// Select elements
const heroContainer = document.querySelector(".hero-containers");
const astronaut = document.querySelector(".astronaut");
const birds = document.querySelector(".birds");
const heroContent = document.querySelector(".hero-content");
const heroDiv = document.querySelector('#heroDiv');

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

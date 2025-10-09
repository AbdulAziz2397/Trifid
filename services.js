// Elements
const chevronUp = document.querySelector('.fa-chevron-up');
const chevronDown = document.querySelector('.fa-chevron-down');
const servicesHero = document.querySelector('.services-hero');
const progressLine = document.querySelector('.progress-line');
const progressStart = document.querySelector('.progress-start');
const slideContents = document.querySelectorAll('.slide-content')


// 
let bgNumber = 1;
const bgColors = ['#007aff', '#ff3a2d', '#ffcc00', '#4cd964'];
const heights = ['25%', '50%', '75%', '100%']; // heights in percentage

// Initial setup
progressLine.style.height = heights[0];
progressStart.textContent = String(bgNumber).padStart(2, '0'); // "01"

// Function to animate number change
function animateNumber(newNumber) {
    const tl = gsap.timeline();

    tl.to(progressStart, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
    })
        .add(() => {
            progressStart.textContent = String(newNumber).padStart(2, '0');
        })
        .to(progressStart, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
        });
}

// Common function to update both background & progress
function updateVisuals() {
    // Animate background color
    gsap.to(servicesHero, {
        backgroundColor: bgColors[bgNumber - 1],
        duration: 1,
        ease: "power2.inOut"
    });

    // Animate height smoothly
    gsap.fromTo(progressLine,
        {
            height: 0
        }
        , {
            height: heights[bgNumber - 1],
            duration: 1,
            ease: "power2.inOut"
        });

    // Animate number text
    animateNumber(bgNumber);


}

//  services hero content changer
let contentChanger = () => {
    slideContents.forEach((content, idx) => {
        if (idx == (bgNumber - 1)) {
            content.classList.replace('hidden', 'flex')
        }
        else {
            content.classList.replace('flex', 'hidden')
        }
    })
}

contentChanger();


// Down button
chevronDown.addEventListener('click', () => {
    bgNumber++;
    if (bgNumber > 4) bgNumber = 1;
    updateVisuals();
    contentChanger();
    animateSplitText([".title", ".heading", ".description"], "up");   // from top to bottom

});

// Up button
chevronUp.addEventListener('click', () => {
    bgNumber--;
    if (bgNumber < 1) bgNumber = 4;
    updateVisuals();
    contentChanger();
    animateSplitText([".title", ".heading", ".description"], "down"); // from bottom to top
});


// ================== SPLIT TEXT ANIMATION FUNCTION ==================
function animateSplitText(selector, direction = "up") {
    // Direction logic: up means text comes from top, down means from bottom
    const yValue = direction === "up" ? -400 : 300;

    // Create split text effect
    SplitText.create(selector, {
        type: "lines",
        mask: "lines",
        onSplit: (self) => {
            gsap.from(self.lines, {
                y: yValue,
                duration: 0.5,
                stagger: 0.05
            });
        }
    });
}
animateSplitText([".title", ".heading", ".description"], "down"); // from bottom to top


// Smooth intro animation for video text elements
gsap.from([".on-vide-heading", ".on-vide-text"], {
    scale: 1.5,
    filter: "blur(10px)",
    //   opacity: 0,
    duration: 1,
    //   delay: 1,
    ease: "power3.out",
    stagger: 0.2
});


// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') document.documentElement.classList.add('light');
themeBtn.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
themeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  const isLight = document.documentElement.classList.contains('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Typing effect
const phrases = [
  'Computer Science Student',
  'Aspiring Software Engineer',
  'Java & Spring Boot Developer',
  'Web Developer',
  'Database Designer/Developer',
];
const typed = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function type() {
  const word = phrases[pi];
  typed.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 80); }
  else if (deleting && ci > 0) { ci--; setTimeout(type, 40); }
  else {
    if (!deleting) { deleting = true; setTimeout(type, 1400); }
    else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 200); }
  }
}
type();

// Reveal on scroll
const revealEls = document.querySelectorAll('.section, .hero-grid, .card');
revealEls.forEach(el => el.classList.add('reveal-on-scroll'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));


// Contact form javascript
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    if(name.length < 2){
        showToast("Please enter your name");
        return;
    }

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        showToast("Please enter a valid email");
        return;
    }

    if(message.length < 10){
        showToast("Message is too short");
        return;
    }

    emailjs.send(
        "service_k3avuur",
        "template_1zdmbhp",
        {
            from_name: name,
            from_email: email,
            message: message
        }
    )
    .then(() => {

        showToast("✅ Message sent successfully!");

        form.reset();

    })
    .catch((error) => {

        console.error(error);

        showToast("❌ Failed to send message.");

    });

});

//counter
/* ======================================
   AUTO CALCULATE PORTFOLIO STATISTICS
====================================== */

// Projects
const totalProjects =
document.querySelectorAll('.project').length;

// Technologies
const technologies = new Set();

document.querySelectorAll('.tags span').forEach(tag => {
    technologies.add(tag.textContent.trim());
});

document.querySelectorAll('.skill p').forEach(skill => {

    const list = skill.textContent.split(',');

    list.forEach(item => {
        technologies.add(item.trim());
    });

});

const totalTechnologies = technologies.size;

// Years Learning
const startYear = 2023;
const currentYear = new Date().getFullYear();
const totalYears = currentYear - startYear;

// Apply values
document.querySelector('.project-count').dataset.count =
totalProjects;


document.querySelector('.tech-count').dataset.count =
totalTechnologies;

document.querySelector('.years-count').dataset.count =
totalYears;

///

/* ======================================
   ANIMATED COUNTERS
====================================== */

const counters = document.querySelectorAll('.num');

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count);

        let current = 0;

        const increment =
        Math.max(1, Math.ceil(target / 40));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target ;

                counterObserver.unobserve(counter);

                return;
            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);
        };

        updateCounter();

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// Download CV (generates a simple printable HTML; user can Save as PDF)
document.getElementById('downloadCv').addEventListener('click', (e) => {
  // allow normal navigation to cv.html which is print-friendly
  e.preventDefault();
  window.open('cv.html', '_blank');
});



const texts = ["Frontend Developer", "Web Enthusiast", "Creative Designer"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
(function type(){
    if(count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    document.querySelector(".typing").textContent = letter;
    if(letter.length === currentText.length){
        count++;
        index=0;
        setTimeout(type,1000);
    } else {
        setTimeout(type,150);
    }
}());

const skills = document.querySelectorAll('.skill-bar div');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight;
    const aboutSection = document.querySelector('.about');
    if(scrollPos > aboutSection.offsetTop + 100){
        skills.forEach(skill => {
            skill.style.width = skill.style.width || skill.getAttribute('style').replace('width: 0%', '');
        });
    }
});

const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
},{threshold:0.3});
faders.forEach(fader => appearOnScroll.observe(fader));

const darkModeBtn = document.getElementById('darkModeToggle');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

const hero = document.querySelector('.hero');
const canvas = document.createElement('canvas');
hero.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = hero.offsetWidth;
canvas.height = hero.offsetHeight;

let particles = [];
for(let i=0;i<80;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*2+1,
        dx: (Math.random()-0.5)*0.5,
        dy: (Math.random()-0.5)*0.5
    });
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize',()=>{
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
});

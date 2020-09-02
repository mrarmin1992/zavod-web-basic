$('.btn').click(function() {
    $('html, body').animate({scrollTop: $('.kartice').offset().top}, 1000);
});
$('.btn1').click(function() {
  $('html, body').animate({scrollTop: $('.slideshow-container').offset().top}, 1000);
});
$('.btn2').click(function() {
    $('html, body').animate({scrollTop: $('.podaci').offset().top}, 1000);
});
$('.btn3').click(function() {
  $('html, body').animate({scrollTop: $('.mb-4').offset().top}, 1000);
});
$('.btn4').click(function() {
  $('html, body').animate({scrollTop: $('.Link').offset().top}, 1000);
});
//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
var purecookieTitle = "Cookies."; // Title
var purecookieDesc = "By using this website, you automatically accept that we use cookies."; // Description
var purecookieLink = '<a href="cookie-policy.html" target="_blank">What for?</a>'; // Cookiepolicy link
var purecookieButton = "Understood"; // Button text
// ---        --- //


function pureFadeIn(elem, display){
  var el = document.getElementById(elem);
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .02) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
function pureFadeOut(elem){
  var el = document.getElementById(elem);
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .02) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function cookieConsent() {
  if (!getCookie('purecookieDismiss')) {
    document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' + purecookieTitle + '</a></div><div class="cookieDesc"><p>' + purecookieDesc + ' ' + purecookieLink + '</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' + purecookieButton + '</a></div></div>';
	pureFadeIn("cookieConsentContainer");
  }
}

function purecookieDismiss() {
  setCookie('purecookieDismiss','1',7);
  pureFadeOut("cookieConsentContainer");
}

window.onload = function() { cookieConsent(); };


var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
c = canvas.getContext('2d');

window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    initCanvas();
})

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        drawCircles();
    }
)
window.addEventListener("touchmove", 
    function (event) {
        let touch = event.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        drawCircles();
    }
)

function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.vx = vx;
    this.vy = vy;
    this.birth = birth;
    this.life = life;
    this.opacity = opacity;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = 'rgba(' + rgb +','+ this.opacity +')';
        c.fill();
    }

    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.opacity = 1- (((frame - this.birth) * 1) / this.life);

        if (frame > this.birth + this.life){
            for (let i = 0; i < circleArray.length; i++){
                if (this.birth == circleArray[i].birth && this.life == circleArray[i].life){
                    circleArray.splice(i, 1);
                    break;
                }
            }
        } else{
            this.draw();
        }
    }

}

var circleArray = [];

function initCanvas() {
    circleArray = [];
}

var colorArray = [
    '250,250,0',
    '0,84,137',
    '255,255,255'
]

function drawCircles(){
    for (let i = 0; i < 6; i++) {
        let radius = Math.floor(Math.random() * 4) + 2;
        let vx = (Math.random() * 2) - 1;
        let vy = (Math.random() * 2) - 1;
        let spawnFrame = frame;
        let rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
        let life = 100;
        circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));

    }
}

var frame = 0;
function animate() {
    requestAnimationFrame(animate);
    frame += 1;
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++ ){
        circleArray[i].update();
    }
    
}

initCanvas();
animate();

// This is just for demo purposes :
for (let i = 1; i < 110; i++) {
    (function (index) {
        setTimeout(function () { 
            mouse.x = 100 + i * 10;
            mouse.y = 100;
            drawCircles();
         }, i * 10);
    })(i);
}

/* --------ANIMACIJA POZADNMSKE SLIKE-----*/

var card1 = document.querySelector(".card1");
var playing = false;

card1.addEventListener('click',function() {
  if(playing)
    return;
  
  playing = true;
  anime({
    targets: card1,
    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
    rotateY: {value: '+=180', delay: 200},
    easing: 'easeInOutSine',
    duration: 400,
    complete: function(anim){
       playing = false;
    }
  });
});
var card2 = document.querySelector(".card2");
var playing = false;

card2.addEventListener('click',function() {
  if(playing)
    return;
  
  playing = true;
  anime({
    targets: card2,
    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
    rotateY: {value: '+=180', delay: 200},
    easing: 'easeInOutSine',
    duration: 400,
    complete: function(anim){
       playing = false;
    }
  });
});
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

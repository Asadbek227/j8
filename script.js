const secondArrow = document.querySelector('.s'),
      minuteArrow = document.querySelector('.m'),
      hourArrow   = document.querySelector('.h'),
      hoursBox    = document.querySelector('.hours'),
      minutesBox  = document.querySelector('.minutes');
      
      
function clock() {
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    
    secondArrow.style = `transform: rotate(${seconds * 6}deg)`
    minuteArrow.style = `transform: rotate(${minutes * 6}deg)`
    hourArrow.style = `transform: rotate(${hours * 30}deg)`
    
    hoursBox.innerHTML = hours < 10 ? '0' + hours : hours
    minutesBox.innerHTML = minutes < 10 ? '0' + minutes : minutes
    
    setTimeout(() => clock(), 1000)
    
}

clock()


// рекурсия - Это когда функция запускает саму себя


// setTimeout(() => console.log('hello'), 2000);

// let i = 1;

// function num() {
//     if(i <= 10) {
//         console.log(i);
//         i++
//         setTimeout(() => num(), 1000)
//     }
// }

// num()


const links = document.querySelectorAll('.tabsItem')
const tabs  = document.querySelectorAll('.tabsContentItem')

links.forEach((item, i) => {
    item.addEventListener('click', () => {
        removeActive()
        item.classList.add('active')
        tabs[i].classList.add('active')
    })
    
})



function removeActive () {
    links.forEach((item, i) => {
        item.classList.remove('active')
        tabs[i].classList.remove('active')
    })
}

const redDot = document.createElement('div');
redDot.id = 'red-dot';
redDot.style.width = '10px';
redDot.style.height = '10px';
redDot.style.backgroundColor = 'red';
redDot.style.borderRadius = '50%';
redDot.style.position = 'fixed';
redDot.style.top = '360px';
redDot.style.right = '1105px';
redDot.style.display = 'none';
redDot.style.overflow = 'visible';
document.body.appendChild(redDot);

const startBtn = document.querySelector('.stopwatch__btn');
const hours = document.querySelector('.stopwatch__hours');
const minutes = document.querySelector('.stopwatch__minutes');
const seconds = document.querySelector('.stopwatch__seconds');

let stopwatchInterval;
let time = 0;
let timerRunning = false;

// initialize dot blinking interval
let dotBlinkInterval = null;

startBtn.addEventListener('click', () => {
  if (!timerRunning) {
    startBtn.textContent = 'clear';
    timerRunning = true;
    stopwatchInterval = () => {
      time++;
      hours.textContent = Math.floor(time / 3600);
      minutes.textContent = Math.floor((time % 3600) / 60);
      seconds.textContent = time % 60;

      if (startBtn.textContent === 'clear') {
        setTimeout(stopwatchInterval, 1000);
      }
    };
    // start the stopwatch interval
    setTimeout(stopwatchInterval, 1000);

    // display the red dot and start blinking
    redDot.style.display = 'block';
    blinkDot();
    dotBlinkInterval = setInterval(blinkDot, 1000);
  } else {
    startBtn.textContent = 'start';
    clearInterval(stopwatchInterval);
    clearInterval(dotBlinkInterval);
    time = 0;
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    timerRunning = false;
    redDot.style.display = 'none';

    // clear the dot blinking interval when stopping the stopwatch
    clearInterval(dotBlinkInterval);
  }
});

function blinkDot() {
  if (redDot.style.display === 'none') {
    redDot.style.display = 'block';
  } else {
    redDot.style.display = 'none';
  }
}

// start the dot blinking interval when the stopwatch starts
startBtn.textContent.addEventListener('click', () => {
  if (!timerRunning) {
    dotBlinkInterval = setInterval(blinkDot, 1000);
  }
});


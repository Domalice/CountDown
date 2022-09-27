
const start = document.getElementById('start');
const reset = document.getElementById('reset');

const h = document.getElementById("hour");
const m = document.getElementById("minute");
const s = document.getElementById("sec");

let startTimer = null;
let audio = new Audio('./sound/tada.mp3')
let isPaused = false
audio.loop = false

// eventos
start.addEventListener('click', function(){
    function startInterval(){
        startTimer = setInterval(function() {
            if(!isPaused) {
                timer()
            }
        }, 1000);
    }
    startInterval();
})

reset.addEventListener('click', function(){
    h.value = 0;
    m.value = 0;
    s.value = 0;
    stopInterval()
})

// funções

function timer(){
    if(h.value == 0 && m.value == 0 && s.value == 0){
        h.value = 0;
        m.value = 0;
        s.value = 0;
        audio.play()
        audio.loop = false
        change.src="./img/play.jpg"
    } else if(s.value != 0){
        change.src="./img/pause.png"
        s.value--;
    } else if(m.value != 0 && s.value == 0){
        s.value = 59;
        m.value--;
    } else if(h.value != 0 && m.value == 0){
        m.value = 60;
        h.value--;
    }
    return;
}

function stopInterval() {
    clearInterval(startTimer);
    audio.pause()
}

document.onkeydown = function(e) {
    if((e || window.event).keyCode === 73) {
        isPaused = false
        function startInterval(){
            startTimer = setInterval(function() {
                if(!isPaused) {
                    timer()
                }
            }, 1000);
        }
        clearInterval(startTimer)
        startInterval()
    }
    if((e || window.event).keyCode === 80) {
        isPaused = true
        change.src="./img/play.jpg"
    }
}
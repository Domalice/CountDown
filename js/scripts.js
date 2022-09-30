
//selecionando todos os elementos
const start = document.getElementById('start');
const reset = document.getElementById('reset');

const allInputs = document.querySelectorAll('.time')

const h = document.getElementById("hour");
const m = document.getElementById("minute");
const s = document.getElementById("sec");

//configuração básica do app; áudio, inicialização
let startTimer = null;
let audio = new Audio('./sound/tada.mp3')
let isPaused = true
audio.loop = false


// eventos
//adicionando o evento de começar o timer no botão start
start.addEventListener('click', () => {
    if(isPaused) {
        initialize()
    } else {
        stopCount()
    }
})

start.addEventListener('onMouseDown', (e) => {
    e.preventDefault()
})

//adicionando o reset do timer no botão
reset.addEventListener('click', () => {
    h.value = 0;
    m.value = 0;
    s.value = 0;
    stopInterval()
})

// funções
// inicialização do aplicativo, fazendo o countdown funcionar
const initialize = () => {
    isPaused = false
    startTimer = setInterval(() => {
        if(!isPaused) {
            timer()
        } else {
            stopCount()
        }
    }, 1000)
}

// função que dá pause e muda a imagem
const stopCount = () => {
    isPaused = true
    startTimer = stopInterval()
    change.src="./img/green-btn.png"
}

const startSong = () => {
    audio.play()
}


//lógica do countdown
const timer = () => {
    //pegando os valores do input e fazendo a checagem
    if(h.value == 0 && m.value == 0 && s.value == 0){
        h.value = 0
        m.value = 0
        s.value = 0
        check = false
        stopCount()
        startSong()
        //adicionando o countdown nos valores
    } else if(s.value != 0){
        s.value--
        change.src="./img/pause-btn.png"
        //adicionando o countdown nos valores
    } else if(m.value != 0 && s.value == 0){
        s.value = 59
        m.value--
        change.src="./img/pause-btn.png"
        //adicionando o countdown nos valores
    } else if(h.value != 0 && m.value == 0){
        m.value = 59
        h.value--
        change.src="./img/pause-btn.png"
    }
    return
}

//função do reset e que limpa o input
const stopInterval = () => {
    clearInterval(startTimer);
    audio.pause()
    change.src="./img/green-btn.png"
}

//evento que faz o código funcionar pressionando as teclas do keyboard
document.body.onkeydown = (e) => {
    const stopFocus = e.target.blur()
    // a barra de espaço que inicializa e pausa o countdown
    if(e.code ===  "Space") {
        if(isPaused || !start) {
            stopFocus
            initialize()
        } else {
            stopCount()
        }
    }
    
    // a tecla "R" que reseta e zera o countdown
    if (e.code === "KeyR") {
        stopInterval()
        h.value = 0
        m.value = 0
        s.value = 0
        audio.pause()
    }
}

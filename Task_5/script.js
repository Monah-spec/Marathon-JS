/*jshint esversion: 6 */

const start = document.getElementById('start')
const timeList = document.getElementById('time-list')
const screens = document.querySelectorAll('.screen')
const timeEl = document.getElementById('time')
const board = document.getElementById('board')
const colors = ['#B22222', '#C71585', '#FF4500', '#FFDAB9', '#8A2BE2', '#B8860B', '#008080', '#2F4F4F']
let time = 0
let score = 0


start.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createCircle()
    }
})

function startGame() {
    screens[1].classList.add('up')
    setInterval(decreaseTime, 1000)
    createCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш результат: <span class="primary">${score}</span></h1>`
}

function createCircle() {
    const circle = document.createElement('div')
    const sizeCircle = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-sizeCircle)
    const y = getRandomNumber(0, height-sizeCircle)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${sizeCircle}px`
    circle.style.height = `${sizeCircle}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${color}`
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    

    board.append(circle)
    
}


function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
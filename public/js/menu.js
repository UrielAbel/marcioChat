// sockets and others
const socket = io()

// Dom Elements
const formLog = document.getElementById("formLog");
const userInputLog = document.getElementById("userInputLog");
const passInputLog = document.getElementById("passInputLog");

const formSing = document.getElementById("formSing");
const userInputSing = document.getElementById("userInputSing");
const passInputSing = document.getElementById("passInputSing");
const wordInputSing = document.getElementById("wordInputSing")

const actionLog = document.getElementById("actionLog");
const actionSing = document.getElementById("actionSing");

// events

formLog.addEventListener("submit", (e) => {
    e.preventDefault()
    actionLog.innerHTML = passInputLog.value
    let data = {
        user: userInputLog.value,
        pass: passInputLog.value
    }
})

formSing.addEventListener("submit", (e) => {
    e.preventDefault()
    actionLog.innerHTML = passInputSing.value
    let data = {
        user: userInputSing.value,
        pass: passInputSing.value
    }
})
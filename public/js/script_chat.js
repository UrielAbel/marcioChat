    let username = "hola"
    let socket = io("")
    let input = document.getElementById("campo_mensaje");
    let btn_enviar = document.getElementById("btn_enviar");
    let contMensajes = document.getElementById("caja_mensajes");

    socket.emit("newUser", username);

    input.addEventListener("keyup", () => {
        if (input.value != "") {
            socket.emit("typing", username)
            btn_enviar.style.display = "flex"
            input.style.width = "75%"
        } else {
            btn_enviar.style.display = "none"
            input.style.width = ""
        }
    })

    btn_enviar.addEventListener("click", () => {
        let msgE = {
            text: input.value,
            user: username
        }
        input.value = ""
        btn_enviar.style.display = "none"
        input.style.width = ""
        let mgs = document.querySelectorAll(`[username]`)
        if (mgs.length != 0) {
            let name = mgs[mgs.length - 1].attributes.username.value
            if (name == msgE.user) {
                console.log("son iguales")
                caja_mensajes.innerHTML += `<div class="contMensajesP msg contdupli"><div class='msj_propio_enviado dupli' username="${msgE.user}">${msgE.text}</div></div>`;
            } else {
                caja_mensajes.innerHTML += `<div class="contMensajesP"><div class='foto_propia'></div><div class='msj_propio_enviado' username="${msgE.user}"> ${msgE.text} </div></div>`
            }
            t = document.getElementsByClassName("msg")
            let este = t[t.length - 1];
            este.scrollIntoView({
            behavior: 'smooth'
            });
        } else {
            caja_mensajes.innerHTML += `<div class="contMensajesP"><div class='foto_propia'></div><div class='msj_propio_enviado' username="${msgE.user}"> ${msgE.text} </div></div>`;
        }
        socket.emit("mensaje", msgE)
    })

    socket.on("newUser", (data) => {
        caja_mensajes.innerHTML += `<p class="entrada_chat"> ${data} ha entrado a este chat </p>`;
    })
        
    socket.on("mensaje", (data) => {
        document.getElementById("escribiendo").innerText = ""
        let mgs = document.querySelectorAll(`[username]`)
        if (mgs.length != 0) {
            let name = mgs[mgs.length - 1].attributes.username.value
            console.log(name)
            console.log(data.user)
            if (name == data.user) {
                console.log("son iguales")
                caja_mensajes.innerHTML += `<div class="contMensajesA msg contdupli"><div class='msj_ajeno dupli' username="${data.user}">${data.text}</div></div>`;
            } else {
                console.log("no son iguales")
                caja_mensajes.innerHTML += `<div class="contMensajesA msg"><div class='foto_ajena'></div><div class='msj_ajeno' username="${data.user}">${data.text}</div></div>`;
            }
            t = document.getElementsByClassName("msg")
            let este = t[t.length - 1];
            este.scrollIntoView({
            behavior: 'smooth'
        });
        } else {
            caja_mensajes.innerHTML += `<div class="contMensajesA msg"><div class='foto_ajena'></div><div class='msj_ajeno' username="${data.user}">${data.text}</div></div>`;
        }
    })

    socket.on("disconnection", (data) => {
        caja_mensajes.append(`<p class='entrada_chat msg'> ${data} ha entrado a este chat</p>`);
    })

    socket.on("typing", (data) => {
        document.getElementById("escribiendo").innerText = `${data} está escribiendo`
    })

    /*
document.getElementById("boton").addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        let mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        let audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            stream.getTracks().forEach(function(track) { track.stop(); })
            $("#poner").addEventListener("click", () => {
                audio.play();
            })
            });

        $("#parar").addEventListener("click", () => {
            mediaRecorder.stop();
        })
    });  
}) */
    const username = prompt("ingresa tu nombre: ")

    function msjAjeno (data) {
        
        $(".caja_mensajes").append("<div class='foto_ajena'></div>");

        $(".caja_mensajes").append(`<div class='msj_ajeno'>${data}</div>`);

    }

    function salida_chat () {
        $(".caja_mensajes").append("<p class='salida_chat'>User ha salido de este chat</p>");
    }

    
    function entrada_chat (user) {
        $(".caja_mensajes").append(`<p class='entrada_chat'>${user} ha entrado a este chat</p>`);
    }


    // ---------------------------------------------------

    const socket = io("")
    socket.emit("newUser", username);

    socket.on("newUser", (data) => {
        entrada_chat(data)
    })
    
    document.getElementById("btn_enviar").addEventListener("click", () => {
        var texto_mensaje = document.getElementById("campo_mensaje").value;
        if (texto_mensaje == "") {
            alert ("El mensaje no puede estar vacio");
        }
        else {
            $(".caja_mensajes").append("<div class='foto_propia'></div>");
            $(".caja_mensajes").append("<div class='msj_propio_enviado'>" + texto_mensaje + "</div>");
            socket.emit("mensaje", texto_mensaje)
            document.getElementById("campo_mensaje").value = ""
        }
        document.getElementById("campo_mensaje").value = ""
    })
    
    socket.on("mensaje", (data) => {
        msjAjeno(data)
    })
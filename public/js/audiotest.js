
document.getElementById("boton").addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        console.log(audioBlob)
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        stream.getTracks().forEach(function(track) { track.stop(); })
        document.getElementById("poner").addEventListener("click", () => {
            audio.play();
        })
        });

        document.getElementById("parar").addEventListener("click", () => {
            mediaRecorder.stop();
        })
    });  
})
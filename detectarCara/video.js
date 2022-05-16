let video =document.getElementById("video");//Toma el id para poner el video en ese lugar
let model;
//referenciamos al canvas del HTML
let canvas =document.getElementById("canvas");
//Indicamos un contexto 2d
let ctx = canvas.getContext("2d");

const camara = () =>{//Función para utilizar HW de la maquina (camara)
    navigator.mediaDevices
    .getUserMedia({//Da acceso al uso de la camara y no al microfono
        video: {width: 500, height: 500},
        audio: false,
    }).then((stream)=>{
        video.srcObject = stream;
    });
};

//Eventos asìncronos siempre que usemos micro, càmara, etc.
const detectFace = async () =>{
    const prediccion = await model.estimateFaces(video, false);
    console.log(prediccion);

    ctx.drawImage(video, 0, 0, 500, 500);

    prediccion.forEach((pred) => {
        ctx.beginPath();
        ctx.lineWidth="4";
        ctx.strokeStyle= "#fff";
        ctx.rect(//Dibujando un rectangulo
            pred.topLeft[0],
            pred.topLeft[1],
            pred.bottomRight[0] - pred.topLeft[0],
            pred.bottomRight[1] - pred.topLeft[1]
        );
        ctx.stroke();//Se termina de delimitar el rectangulo
        ctx.fillStyle = "blue";
        pred.landmarks.forEach((landmark) => {//dibuja puntos sobre el rectangulo
            ctx.fillRect(landmark[0], landmark[1], 5, 5);
        });
    });
};

camara();//Llama a la funcion camara
video.addEventListener("loadeddata", async() => {//Evento para escuchar el funcionamiento de la camara cada 100 milisegundos
    model = await blazeface.load();
    //call detect faces every 100 milliseconds or 10 time every second
    setInterval(detectFace, 100);
});

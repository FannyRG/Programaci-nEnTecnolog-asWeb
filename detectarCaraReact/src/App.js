// Import dependencies
import React, { useRef, useState, useEffect } from "react";//Importa elementos de React
import * as tf from "@tensorflow/tfjs";//importa todo de tensorflow
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
//DEscarga la red neuronal para detectar objetos
import * as cocossd from "@tensorflow-models/coco-ssd";//importa todo de coco a través de tensorflow
import Webcam from "react-webcam";//Importa librerías referente a la cámara del dispositivo
import "./App.css";

// 2. TODO - Import drawing utility here
import { drawrect } from "./utileria";//Importa el archivo utilería para dibujar el cuadro identificador

function App() {
  const webcamRef = useRef(null);//Iniciando las variables para las referencias de webcam y canvas.
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {//--Declaracion de await para repetir la imagen cada 10 milisegundos, 
                               //--haciendo parecer un video 
    // 3. TODO - Load network    
    //necesitamos invocar nuestra red neuronal. Se cicla por ser imagen para que se "cicle" hasta que se cierre la ventana
    const net=await cocossd.load();
    // e.g. const net = await cocossd.load();
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {// Función para detectar las caracteristicas que tendrá el video como
                //dimensiones y estilos

    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties       
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const objeto = await net.detect(video);
      console.log(objeto);

      // Draw mesh canvas, contexto de la imagen ciclada para dar una dimension y poder dibujar sobre la imagen.
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  . lo que detecta en el video, canvas
        drawrect(objeto,ctx);
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (//Diseño HTML para visualizar la función
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
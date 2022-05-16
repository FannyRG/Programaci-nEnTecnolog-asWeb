export const drawrect = (detectados, ctx) => {
    detectados.forEach(prediccion => {//Funcion para detectar las dimensiones sobre la imagen
        const [x, y, width, height]=prediccion['bbox'];
        const text=prediccion['class'];//Una vez detectadas, identifica a que clase pertenece

        //Dandole un color aleatorio al recuadro de la imagen
        const color="#"+Math.floor(Math.random()*16777215).toString(16);
        //const color='green'
        ctx.stokeStyle = color;
        ctx.font='18px Arial'
        ctx.fillStyle=color;

        //dibujar en el canvas
        ctx.beginPath();
        ctx.fillText(text,x,y)
        ctx.rect(x,y,width,height)
        ctx.stroke()
    })
}
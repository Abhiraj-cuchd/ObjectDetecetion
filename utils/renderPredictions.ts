import { throttle } from "lodash";

export const renderPredictions = (predictions: any, ctx: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const fonts = "16px snas-serif"
    ctx.font = fonts;
    ctx.textBaseLine = "top";

    predictions.forEach((prediction: any) => {
        const [x, y, width, height] = prediction["bbox"];

        const isPerson = prediction.class == "person";

        ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);


        ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`; // Set 
        ctx.fillRect(x, y, width, height);


        ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(fonts, 10); // base 10
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);

        if (isPerson) {
            playAudio();
        }

    });
}

export const playAudio = throttle(() => {
    const audio = new Audio("/mkc.mp3");
    audio.play();
}, 12000
)

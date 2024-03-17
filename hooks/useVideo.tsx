import { useEffect, useRef, useState } from "react";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/renderPredictions";

const useVideo = () => {
    const webCamRef: any = useRef(null)
    const canvasRef: any = useRef(null)
    const [loading, setLoading] = useState(true);
    let detectInterval = null;

    const showMyVideo = () => {
        if (webCamRef.current !== null && webCamRef.current.video?.readyState === 4) {
            const videoWidth = webCamRef.current.video.videoWidth;
            const videoHeight = webCamRef.current.video.videoHeight

            webCamRef.current.video.videoWidth = videoWidth;
            webCamRef.current.video.videoHeight = videoHeight;
        }
    }

    const runCoco = async () => {
        setLoading(true)
        const model = await cocoSSDLoad();
        setLoading(false);

        detectInterval = setInterval(() => {
            runObjectDetection(model)
        }, 10)
    }

    const runObjectDetection = async (model: any) => {
        if (canvasRef.current && webCamRef.current !== null && webCamRef.current.video?.readyState === 4) {
            canvasRef.current.width = webCamRef.current.video.videoWidth;
            canvasRef.current.width = webCamRef.current.video.videoHeight;

            const detectedObjects = await model.detect(
                webCamRef.current.video,
                undefined,
                0.6
            )
            const context = canvasRef.current.getContext("2d");
            renderPredictions(detectedObjects, context)
            // console.log(detectedObjects)
        }
    }

    useEffect(() => {
        showMyVideo();
        runCoco()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { webCamRef, loading, canvasRef }
}

export default useVideo;
"use client"

import useVideo from "@/hooks/useVideo"
import { Spinner } from "@nextui-org/spinner";
import Webcam from "react-webcam"


const ObjectDetection = () => {
    const { webCamRef, loading, canvasRef } = useVideo();
    return (
        <div className="mt-8">
            {loading ? <Spinner /> : <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
                <Webcam className="rounded-md w-full lg:h-[720px]" muted ref={webCamRef} />
                <canvas ref={canvasRef} className="absolute top-0 left-0 z-999 w-full lg:h-[720px]" />
            </div>}
        </div>
    )
}

export default ObjectDetection
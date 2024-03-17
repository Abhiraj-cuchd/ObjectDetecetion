"use client"

import ObjectDetection from "@/components/object-detection";
import { NextUIProvider } from "@nextui-org/system";

export default function Home() {
  return (
    <NextUIProvider>
      <div className="flex min-h-screen flex-col items-center p-8">
        <h1 className=" gradient-title font-extrabold text-3xl md:text-6xl lg:8xl tracking-tighter md:px-6 text-center gradient">Theif Detection</h1>
        <ObjectDetection />
      </div>
    </NextUIProvider>
  );
}

import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";

const Canvas = ({ json }) => {

    const canvasRef = useRef(null);
    const fabricRef = useRef(null);

    useEffect(() => {
        const initFabric = () => {
            fabricRef.current = new fabric.Canvas(canvasRef.current);
        };
        initFabric();
        if (json) {
            fabricRef.current.loadFromJSON(json);
        }
        return () => {
            fabricRef.current.dispose();
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ pointerEvents: "none" }} className="border-2" width={"700px"} height={"300px"} />
    )
}

export default Canvas;
import React, { useEffect, useState, useRef } from "react";
import { fabric } from "fabric";
import { useNavigate, useParams } from 'react-router-dom';
import fetcher from '../utils/axios';

const Paint = () => {
    const fabricRef = useRef(null);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    let { id } = useParams();
    const [update, setUpdate] = useState(false);

    const handleRestore = async (id) => {
        try {
            const reg = await fetcher.get(`/paint/single/${id}`,);
            if (reg?.data?.success) {
                fabricRef.current.loadFromJSON(reg?.data?.data?.json);
                setUpdate(true);
            }
        } catch (err) {
            if (err.response?.data) {
                alert(`${err.response?.data.message}`)
            } else {
                alert(err)
            }

        }
    }

    useEffect(() => {
        if (id !== 'new') {
            handleRestore(id)
        }
        const initFabric = () => {
            fabricRef.current = new fabric.Canvas(canvasRef.current);
        };
        initFabric();
        return () => {
            fabricRef.current.dispose();
        };
    }, []);
    const addText = () => {
        let promptData = prompt("Enter text")
        const text = new fabric.Textbox(promptData, {
            dynamicMinWidth: 69
        });
        fabricRef.current.add(text);
    }
    const addRectangle = () => {
        const rect = new fabric.Rect({
            top: 0,
            left: 0,
            width: 50,
            height: 50,
            fill: 'red',
        });
        fabricRef.current.add(rect);
    }
    const addCircle = () => {
        const circle = new fabric.Circle({
            radius: 15,
            startAngle: 0,
            endAngle: 360,
            fill: "green"
        });
        fabricRef.current.add(circle);
    }
    const addLine = () => {
        const line = new fabric.Line(
            [50, 100, 200, 200], {
            left: 170,
            top: 150,
            stroke: 'blue'
        }
        );
        fabricRef.current.add(line);
    }
    const addTriangle = () => {
        const triangle = new fabric.Triangle({
            top: 0,
            left: 0,
            width: 50,
            height: 50,
            fill: 'red',
        }
        );
        fabricRef.current.add(triangle);
    }
    const delSelected = () => {
        fabricRef.current.remove(fabricRef.current.getActiveObject())
    }

    const updateElementColor = (color) => {
        fabricRef.current.getActiveObject().set("fill", color)
        fabricRef.current.renderAll();
    }
    const handleSave = async () => {
        let promptData = prompt("Please enter your drawing name")
        let paintJson = fabricRef.current.toJSON();
        setLoading(true);
        try {
            const reg = await fetcher.post('/paint/save', { name: promptData, json: paintJson });
            if (reg?.data?.success) {
                navigate(`/paint/${reg?.data?.data?._id}`);
                window.location.reload();
            }
            setLoading(false)

        } catch (err) {
            if (err.response?.data) {
                alert(`${err.response?.data.message}`)
            } else {
                alert(err)
            }
            setLoading(false)

        }
    }
    const handleUpdate = async () => {
        let paintJson = fabricRef.current.toJSON();
        setLoading(true);
        try {
            const reg = await fetcher.put(`/paint/update/${id}`, { json: paintJson });
            if (reg?.data?.success) {
                navigate(`/paint/${reg?.data?.data?._id}`);
                window.location.reload();
            }
            setLoading(false)

        } catch (err) {
            if (err.response?.data) {
                alert(`${err.response?.data.message}`)
            } else {
                alert(err)
            }
            setLoading(false)

        }
    }

    return (<>
        <div className="flex justify-center items-center mt-5 gap-2">
            <button className="border-1 bg-purple-500 text-white rounded px-5 py-2" onClick={() => navigate('/home')}>
                Home</button>
            {
                !update ?
                    <button className="border-1 bg-blue-500 text-white rounded px-5 py-2" onClick={handleSave}>
                        {loading ? "Please Wait" : "Save Changes"}</button>
                    :
                    <button className="border-1 bg-blue-500 text-white rounded px-5 py-2" onClick={handleUpdate}>
                        {loading ? "Please Wait" : "Update Changes"}</button>
            }
        </div>
        <div className="flex gap-2">
            {/* tools */}
            <div className="flex justify-end items-center w-[35rem] h-auto">
                <div className="flex flex-col gap-2">
                    <button className="border-1 bg-blue-500 text-white px-2 rounded" onClick={addText}>Text</button>
                    <button className="border-1 bg-blue-500 text-white px-2 rounded" onClick={addRectangle}>Rect</button>
                    <button className="border-1 bg-blue-500 text-white px-2 rounded" onClick={addCircle}>Circle</button>
                    <button className="border-1 bg-blue-500 text-white px-2 rounded" onClick={addLine}>Line</button>
                    <button className="border-1 bg-blue-500 text-white px-2 rounded" onClick={addTriangle}>Triangle</button>
                    <button className="border-1 bg-blue-500 text-white px-2 rounded" onClick={delSelected}>Del</button>
                    <div>
                        <input type="color" onChange={e => updateElementColor(e.target.value)} />
                    </div>

                </div>
            </div>
            {/* canvas */}
            <div className="flex justify-center items-center h-screen ">
                <canvas ref={canvasRef} className="border-2" width={"900px"} height={"600px"} />
            </div>
        </div>
    </>)
}

export default Paint;
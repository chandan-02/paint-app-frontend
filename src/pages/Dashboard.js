import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import fetcher from '../utils/axios';
import Canvas from "../components/Canvas";


const Dashboard = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paintData, setPaintData] = useState([]);
    // const canvasRef = useRef(null);
    // const fabricRef = useRef(null);

    const loadAllPaintings = async () => {
        setLoading(true)
        try {
            const reg = await fetcher.get('/paint/all/public');
            if (reg?.data?.success) {
                setPaintData(reg?.data?.data)
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

    useEffect(() => {
        loadAllPaintings()
    }, [])

    const handleLike = async (id) => {
        try {
            const reg = await fetcher.put(`/paint/like/${id}`);
            if (reg?.data?.success) {
                // setPaintData(reg?.data?.data)
            }
        } catch (err) {
            if (err.response?.data) {
                alert(`${err.response?.data.message}`)
            } else {
                alert(err)
            }
        }
    }

    return (<div className="mt-2 flex justify-center items-center flex-col">
        <div className="flex gap-2 items-center">
            <button className="border-1 bg-blue-500 text-white px-5 py-2 rounded w-56" onClick={() => navigate('/home')}>Goto Home</button>
        </div>
        {loading ?
            <h1>Loading...</h1> :
            <div className="flex flex-col gap-2 mt-5">
                {
                    paintData?.map(item => {
                        return (
                            <div key={item?._id} className="border-4 rounded border-blue-200 px-5 py-4" style={{ width: '750px' }}>
                                <h1 className="text-xl"><span className="font-bold">{item?.name}</span></h1>
                                <h1 className="text-xl"><span className="">@{item?.user?.name}</span></h1>
                                <br />
                                <Canvas json={item?.json} />
                                <div className="flex flex-row gap-2 mt-4">
                                    <button className="border-1 bg-red-500 text-white px-2 py-2 rounded w-56" onClick={() => handleLike(item?._id)}>Like : {item?.likecount?.length}</button>
                                </div>
                            </div>)
                    })
                }
            </div>
        }
    </div>)
}

export default Dashboard;
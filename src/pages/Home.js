import React, { useEffect, useState, } from "react";
import { useNavigate } from 'react-router-dom';
import fetcher from '../utils/axios';

const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paintData, setPaintData] = useState([]);

    const loadAllPaintings = async () => {
        setLoading(true)
        try {
            const reg = await fetcher.get('/paint/all');
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

    const deletePaint = async (id) => {
        try {
            const reg = await fetcher.delete(`/paint/${id}`);
            if (reg?.data?.success) {
                window.location.reload()
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
        loadAllPaintings()
    }, [])

    return (<div className="mt-2 flex justify-center items-center flex-col">
        <h1 className="text-2xl m-5">Welcome, {localStorage.getItem('user')}</h1>
        <div className="flex gap-2 items-center">
            <button className="border-1 bg-blue-500 text-white px-5 py-2 rounded w-56" onClick={() => navigate('/paint/new')}>New Drawing</button>
            <button className="border-1 bg-blue-500 text-white px-5 py-2 rounded w-56" onClick={() => navigate('/dashboard')}>Goto Dashboard</button>

            <button className="border-1 bg-red-500 text-white px-5 py-2 rounded w-56" onClick={() => {
                localStorage.removeItem('logged');
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
            }}>Logout </button>

        </div>
        {loading ?
            <h1>Loading...</h1> :
            <div className="flex flex-col gap-2 mt-5">
                {
                    paintData?.map(item => {
                        return (
                            <div key={item?.key} className="border-4 rounded border-blue-200 px-5 py-4">
                                <h1 className="text-xl">Name: <span className="font-bold">{item?.name}</span></h1>
                                <div className="flex flex-row gap-2 mt-4">
                                    <button className="border-1 bg-green-500 text-white px-2 py-2 rounded w-56" onClick={() => navigate(`/paint/${item?._id}`)}>Open</button>
                                    <button className="border-1  text-red-500 font-bold px-2 py-2 rounded w-56" onClick={() => deletePaint(item?._id)}>Delete</button>
                                </div>

                            </div>)
                    })
                }
            </div>
        }
    </div >)
}

export default Home;
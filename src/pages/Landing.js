import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Landing = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('logged')) {
            navigate('/home')
        } else {
            navigate('/login')
        }
    }, [])
    return (<div></div>)
}

export default Landing;
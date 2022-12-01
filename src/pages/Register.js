import { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import fetcher from '../utils/axios';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const handleLogin = async () => {
        navigate('/login')
    }


    useEffect(() => {
        localStorage.getItem('logged') && navigate('/home')
    })

    const handleRegister = async () => {
        setLoading(true)

        try {
            const reg = await fetcher.post('/user/register', user);
            if (reg?.data?.success) {
                alert('User Registered! Please login');
                navigate('/login')
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

    return (
        <div className="min-h-screen bg-no-repeat bg-cover bg-center"
            style={{ "background-image": "url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')" }}>
            <div className="flex justify-end">
                <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
                    <div className="w-[23rem]">
                        <h1 className="text-2xl font-bold">Register your account</h1>
                        {/* Register */}
                        <div className="my-3">
                            <label className="block text-md mb-2" for="email">Name</label>
                            <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="password" placeholder="email"
                                value={user.name}
                                onChange={e => setUser({ ...user, name: e.target.value })}
                            />
                        </div>
                        {/* email */}
                        <div className="my-3">
                            <label className="block text-md mb-2" for="email">Email</label>
                            <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="password" placeholder="email"
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value })}
                            />
                        </div>
                        {/* password */}
                        <div className="mt-5">
                            <label className="block text-md mb-2" for="password">Password</label>
                            <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="password"
                                value={user.password}
                                onChange={e => setUser({ ...user, password: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-between mt-4">
                            <span onClick={handleLogin} className="text-sm text-blue-500 hover:underline cursor-pointer">Already have and account? Login</span>
                        </div>
                        {/* Login Button */}
                        <button onClick={handleRegister} class="mt-4 mb-3 w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md transition duration-100">
                            {loading ? "Please wait" : "Register"}</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Register;
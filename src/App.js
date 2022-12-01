import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  redirect

} from "react-router-dom";

//pages
import Login from "./pages/Login";
import Register from './pages/Register'
import Home from './pages/Home'
import Paint from './pages/Paint'
import FourOFour from './pages/404'
import Landing from './pages/Landing'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="home" element={localStorage.getItem('logged') ? <Home /> : <FourOFour />} />
      <Route path="paint/:id" element={localStorage.getItem('logged') ? <Paint /> : <FourOFour />} />
    </Route >
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

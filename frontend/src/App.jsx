import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import {router} from "./router/index.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App

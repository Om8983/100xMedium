import { Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Blogs } from './pages/Blogs'

export const AppRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Blogs></Blogs>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
    </>
  )
}

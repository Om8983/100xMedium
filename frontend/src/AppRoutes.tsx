import { Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Blogs } from './pages/Blogs'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}>
          <Route index element={<Home></Home>}></Route>
          <Route path='/blog' element={<Blogs />}></Route>
        </Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </>
  )
}

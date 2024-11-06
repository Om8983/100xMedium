import { Route, Routes } from 'react-router-dom'
import { Signup } from './pages/NavAuthLinks/Signup'
import { Login } from './pages/NavAuthLinks/Login'
import { Blogs } from './pages/Blogs'
import { Home } from './pages/Home'
import { Protected } from './pages/Protected'
import { Post } from './pages/Post'

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/blog' element={<Blogs />}></Route>
        <Route path='/blog/id/:id' element={<Post />}></Route>
        <Route path='/protectedRoute' element={<Protected />}></Route>
        <Route path='/blog' element={<Blogs />}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>

      </Routes>
    </>
  )
}

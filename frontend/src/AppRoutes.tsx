import { Route, Routes } from 'react-router-dom'
import { Signup } from './pages/NavAuthLinks/Signup'
import { Login } from './pages/NavAuthLinks/Login'
import { Blogs } from './pages/Blogs'
import { Home } from './pages/Home'
import { Protected } from './pages/Protected'
import { Post } from './pages/Post'
import { UserProfile } from './pages/UserProfile'
import { MyBlogs } from './pages/MyBlogs'
import { WriteBlog } from './pages/WriteBlog'

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        {/* protected Routes */}
        <Route path='/protected' element={<Protected />}></Route>
        {/* blog routes */}
        <Route path='/blog' element={<Blogs />}></Route>
        <Route path='/blog/id/:id' element={<Post />}></Route>
        <Route path='/myblogs' element={<MyBlogs />}></Route>
        {/* user profile */}
        <Route path='/userProfile' element={<UserProfile />}></Route>
        <Route path='/editor' element={<WriteBlog/>}></Route>
      </Routes>
    </>
  )
}

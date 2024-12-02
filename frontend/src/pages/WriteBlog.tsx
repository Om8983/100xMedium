
import { NavLinks } from '../components/NavBar/NavLinks'
import Tiptap from '../components/Tiptap/Tiptap'

export const WriteBlog = () => {

    return (
        <div className='flex flex-col items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  '>
            <NavLinks ></NavLinks>
            <Tiptap />
        </div>
    )
}

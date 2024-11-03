import { Outlet } from "react-router-dom"
import { NavLinks } from "../components/NavLinks"

export const Landing = () => {
  return (
    <>
        <NavLinks></NavLinks>
        <Outlet></Outlet>
    </>
  )
}

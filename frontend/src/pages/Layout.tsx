import { Outlet } from "react-router-dom"
import { Protected } from "./Protected"

export const Layout = () => {
    return (
        <>
            <Protected />
            <Outlet />
        </>
    )
}

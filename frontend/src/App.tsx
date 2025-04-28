import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./AppRoutes"
import { RecoilRoot } from "recoil"
import { Toaster } from "sonner"

function App() {

  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Toaster></Toaster>
          <AppRoutes></AppRoutes>
        </RecoilRoot>
      </BrowserRouter>

    </>
  )
}

export default App

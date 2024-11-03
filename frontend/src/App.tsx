import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./AppRoutes"
import { RecoilRoot } from "recoil"

function App() {

  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <AppRoutes></AppRoutes>
        </RecoilRoot>
      </BrowserRouter>

    </>
  )
}

export default App

import { useEffect, useState } from "react"
type Prop = {
    url : string
    method : string
    type ?: Object | Number | String

}
export const useBkndReq = ({url, method, type = {}} : Prop) => {
  const [response, setResponse] = useState(`${type}`)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
        const res = `await axios.${method}(${url}, ${type}, {withCredentials : true})`
        setResponse(res)
        setLoading(false)
    })()
    return () => {}
  }, [url, method, type])
  return {response, loading};
}

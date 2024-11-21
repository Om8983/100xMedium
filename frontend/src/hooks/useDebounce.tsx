
import { useEffect, useState } from "react"


export const useDebounce = (val: string) => {
    const [queryStr, setqueryStr] = useState<string>("");
    useEffect(() => {
        const timeout = setTimeout(async () => {
            setqueryStr(val.split(" ").join("+"))
        }, 500);
        return () => clearTimeout(timeout)
    }, [val])
    return { queryStr };
}

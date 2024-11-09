import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  className: string
}
export const Testimonial = ({ className }: Partial<Props>) => {
  const navigate = useNavigate()
  const [quote, setQuote] = useState({
    title: "",
    author: "",
    designation: ""
  })
  useEffect(() => {
    const quotes = [
      {
        title: "Balance suggests a perfect equilibrium. There is no such thing. That is a false expectation. There are going to be priorities and dimensions of your life, how you integrate them is how you find true happiness.",
        author: "Pete Cashmore", designation: "CEO | Mashable"
      },
      { title: "We are really competing against ourselves, we have no control over how other people perform", author: "Mark Zuckerberg", designation: "CEO | Twitter" },
    ]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote({
      title: randomQuote.title,
      author: randomQuote.author,
      designation: randomQuote.designation
    })
    return () => { }
  }, [navigate])
  return (
    <div className={`${className}  lg:flex justify-center items-center h-screen  bg-[#0f4c68] font-[myfont] `}>
      <div className="m-20 text-start">
        <h1 className="text-[1rem] md:text-[1.3rem] lg:text-[1.9rem] font-semibold text-white "> {quote.title} </h1>
        <p className="  font-semibold self-start mt-2 text-sm md:text-base lg:text-lg lg:mt-4 text-white"> {quote.author} </p>

        <p className=" text-xs md:text-sm text-gray-500"> {quote.designation} </p>
      </div>
    </div>
  )
}
